---
layout: default
title: Search Index & Application Env Vars
description: Create the Azure AI Search index from the supplied schema and apply non-secret environment variables to every Container App and Job. Secrets stay in Key Vault.
great_grand_parent: Products
grand_parent: Recon DMS
parent: Azure Deployment Overview
nav_order: 4
has_toc: true
nav_scope: recon-dms
nav_scope_title: Recon DMS
---

# Search Index & Application Env Vars

This module covers Steps 7–8 of the setup package: creating the AI Search index inside the AI Search service you just provisioned, then applying environment variables to every Container App and Job.

> **Audience**  
> Azure administrators continuing from the Terraform deploy.

## 1. Create the AI Search Index (`create_search_index.sh`)

```bash
./azure-setup/create_search_index.sh .env
```

Terraform created the AI Search **service**; this script creates the **index** that documents are indexed into. It reads the schema from `index-definition.json`, picks an index name (`${PROJECT_NAME}-${ENVIRONMENT}-documents` by default, or override with `SEARCH_INDEX_NAME` in `.env`), and `PUT`s the rendered schema to the AI Search REST API.

The script is idempotent — safe to re-run.

**Time:** a few seconds.

### Verification

```bash
SEARCH_KEY=$(az search admin-key show -g rg-<project>-<env> --service-name srch-<project>-<env> --query primaryKey -o tsv)
curl -sS "https://srch-<project>-<env>.search.windows.net/indexes?api-version=2024-07-01" \
     -H "api-key: $SEARCH_KEY" | jq -r '.value[].name'
```

Expected output: `<project>-<env>-documents`.

### Troubleshooting

| Issue | Resolution |
|---|---|
| `invalid SEARCH_INDEX_NAME` | Index name has uppercase, underscore, or leading/trailing dash. Edit `SEARCH_INDEX_NAME` in `.env` or remove it entirely to use the default. |
| HTTP 403 / 401 | Admin key just rotated or managed identity propagation still pending. Wait 1–2 minutes, re-run. |

## 2. Apply Environment Variables (`set_aca_envs.sh`)

```bash
cp azure-setup/param.json.example azure-setup/param.json
./azure-setup/set_aca_envs.sh .env azure-setup/param.json
```

Applies **plain environment variables only** to every Container App and Job. Reads `param.json`, fills in `${VAR}` placeholders from `.env` + `.env.derived`, and pushes the result to each workload via `az containerapp update --set-env-vars`.

**Time:** ~3 minutes.

### Expected summary

```
[OK]   ca-api-<env> updated           (17 env vars)
[OK]   ca-express-<env> updated       (11 env vars)
[OK]   job-textract-<env> updated     (13 env vars)
[OK]   job-search-index-<env> updated (11 env vars)
[OK]   job-sync-batch-<env> updated   (14 env vars)
[OK]   job-delete-batch-<env> updated (14 env vars)
[OK]   job-result-sweeper-<env> updated (13 env vars)
[OK]   job-status-sync-<env> updated  (9 env vars)
```

### Why no secrets appear in `param.json`

Each container image contains a `keyvault-bootstrap` module that runs before the server listens. At startup it reads every secret from Key Vault via the managed identity and writes it into `process.env`. The container therefore needs only two Key-Vault-related env vars from this script:

- `AZURE_KEY_VAULT_URL` — where Key Vault is.
- `AZURE_CLIENT_ID` — which managed identity to use.

Every real secret (JWT, encryption key, Cosmos/Storage/Search/Doc-Intelligence/Service-Bus keys, SharePoint and Salesforce OAuth credentials) stays inside Key Vault and never appears in the Azure Portal's env-vars surface.

### Secrets provisioned in Key Vault by Terraform

You never create these by hand — Terraform writes them at apply time:

| Key Vault secret name | Env var at runtime | Source |
|---|---|---|
| `jwt-secret` | `JWT_SECRET` | `.env` |
| `encryption-secret-key` | `ENCRYPTION_SECRET_KEY` | `.env` |
| `cosmos-connection-string` | `MONGO_URI` | Cosmos resource |
| `storage-account-key` | `AZURE_STORAGE_ACCOUNT_KEY` | Storage account |
| `storage-connection-string` | `AZURE_STORAGE_CONNECTION_STRING` | Storage account |
| `search-endpoint` | `AZURE_SEARCH_ENDPOINT` | AI Search |
| `search-admin-key` | `AZURE_SEARCH_API_KEY` | AI Search |
| `docint-endpoint` | `AZURE_DOCINT_ENDPOINT` | Document Intelligence |
| `docint-key` | `AZURE_DOCINT_KEY` | Document Intelligence |
| `servicebus-namespace-connection-string` | `AZURE_SERVICEBUS_CONNECTION_STRING` | Service Bus |
| `sharepoint-client-id` | `CLIENT_ID` | `.env` |
| `sharepoint-client-secret` | `CLIENT_SECRET` | `.env` |
| `sf-client-id` | `SF_CLIENT_ID` | `.env` (reuses SharePoint if blank) |
| `sf-client-secret` | `SF_CLIENT_SECRET` | `.env` (reuses SharePoint if blank) |

### Rotating a secret

One command — no redeploy:

```bash
az keyvault secret set --vault-name kv-<project>-<env> --name jwt-secret --value "<new>"
az containerapp revision restart -g rg-<project>-<env> -n ca-api-<env>
```

### Verification

```bash
az keyvault secret list --vault-name kv-<project>-<env> --query "[].name" -o tsv | sort | wc -l
```

Should report **14**.

### Troubleshooting

| Issue | Resolution |
|---|---|
| `[SKIP] unknown logical name` for multiple apps | `param.json` saved with CRLF line endings. Run `sed -i 's/\r$//' azure-setup/param.json` (or open in VS Code and switch to LF). |
| `KEY_VAULT_URI: unbound variable` | `.env.derived` was clobbered or Terraform never completed. Re-run `deploy_terraform.sh .env` to repopulate `.env.derived`. |
| Container Apps update succeeds but app crash-loops on startup | Managed identity is missing Get/List on Key Vault, or `AZURE_CLIENT_ID` env var is missing/mismatched. See the [Troubleshooting](troubleshooting) page for the verification and re-grant commands. |

## Next Steps

Proceed to [Authentication & Job Scaling](auth-and-scaling) to create the root admin user that Salesforce will use to call the API, and to refresh the KEDA scaler secrets on the event-triggered jobs.
