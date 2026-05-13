---
layout: default
title: Authentication & Job Scaling
description: Create the root admin user that Salesforce uses to call the Recon DMS API, then ensure KEDA scaler secrets on event-triggered jobs are populated correctly.
great_grand_parent: Products
grand_parent: Recon DMS
parent: Azure Deployment Overview
nav_order: 5
has_toc: true
nav_scope: recon-dms
nav_scope_title: Recon DMS
---

# Authentication & Job Scaling

This module covers Steps 9–10: creating the root administrator user that the Salesforce DMS package uses to authenticate against the API, then refreshing KEDA scaler secrets on the event-triggered jobs.

> **Audience**  
> Azure administrators finishing the Recon DMS deployment before handing off to the Salesforce team.

## 1. Create the Admin Bootstrap User (`create_auth_user.sh`)

```bash
./azure-setup/create_auth_user.sh .env
```

Creates the root administrator user that your Salesforce DMS package uses to call the API. Requires `ACCESS_KEY` in `.env` (the value the vendor sent out-of-band).

The script:

1. Reads `cosmos-connection-string` from Key Vault.
2. `POST`s `{accesskey, region, mongoUri, baseUrl}` to `${API_LAMBDA_URL}/_v2/api/user/create`.
3. Prints back `UserId` and `Token`.
4. Saves the response to a `chmod 600` marker file at `azure-setup/.auth_user.<PROJECT_NAME>.<ENVIRONMENT>.json`.

**Time:** a few seconds.

### Idempotent behavior

- Re-running with the same `ACCESS_KEY` detects the marker and prints the stored `UserId` + `Token` without creating a duplicate admin.
- If `ACCESS_KEY` changes, the stale marker is removed and a fresh create is attempted.
- A `--force` flag exists for recovery (`./azure-setup/create_auth_user.sh .env --force`) — creates a new admin; only use if the first was lost.

### Capture the Four Salesforce Handoff Values

> **Warning**  
> The Salesforce DMS package requires **four** values to configure the integration. The script outputs `UserId` and `Token`; the remaining two come from `.env.derived` produced in the [Core Infrastructure](infrastructure) module. Capture all four before moving on — the marker file is an idempotency guard, not your system of record.

Save these four values together in your team's password manager, tagged with the environment name (`dev` / `qa` / `uat` / `prod`):

| Value | Where it comes from | Example shape |
|---|---|---|
| `UserId` | Output of `create_auth_user.sh` | UUID string |
| `Token` | Output of `create_auth_user.sh` | Long opaque bearer token |
| **API URL** | `API_LAMBDA_URL` in `.env.derived` (written by Terraform deploy) | `https://ca-api-<env>.<random>.<region>.azurecontainerapps.io` |
| **Storage URL** | Derived from `STORAGE_ACCOUNT_NAME` in `.env` | `https://st<project><env>.blob.core.windows.net` |

You can retrieve all four after the fact with:

```bash
# UserId + Token (from the marker file)
cat azure-setup/.auth_user.<PROJECT_NAME>.<ENVIRONMENT>.json | jq '{UserId, Token}'

# API URL
grep "^API_LAMBDA_URL=" .env.derived

# Storage URL
echo "https://$(grep '^STORAGE_ACCOUNT_NAME=' .env | cut -d= -f2).blob.core.windows.net"
```

Hand all four values to whoever configures the Salesforce DMS package.

### Verification

The script prints `UserId` and `Token` in its final output, and writes them to the marker file. Both should be non-empty strings.

### Troubleshooting

| Issue | Resolution |
|---|---|
| `"stream timeout"` or `jq: parse error` | `api-lambda` is still starting. Wait 60 seconds, re-run. |
| `ACCESS_KEY` rejected | The vendor-supplied bootstrap key is wrong or expired. Re-confirm with the vendor and update `.env`. |
| Marker file shows wrong `UserId` after re-running | Use `--force` only if the original was genuinely lost; this creates a *new* admin and does not invalidate the old one. |

## 2. Configure KEDA Scalers (`configure_keda.sh`)

```bash
./azure-setup/configure_keda.sh .env
```

Belt-and-suspenders step: ensures the KEDA scaler secrets on the event-triggered jobs (`job-textract`, `job-search-index`) are populated with the **namespace-level** Service Bus connection string, and that KEDA has re-registered them.

**Time:** ~30 seconds.

### Why this step exists

KEDA's `azure-servicebus` scaler silently rejects queue-scoped connection strings (anything containing `EntityPath=`). Terraform uses the correct namespace-level auth rule (`keda-listen`), but initial applies occasionally leave the secret empty or stale.

**Symptom of the bug this fixes:** messages pile up in `ocr-processing` / `ocr-indexing` with zero job executions.

This script re-reads the `keda-listen` auth rule from Azure (the source of truth), overwrites the secret on each event-triggered job, and forces a revision refresh so KEDA re-registers the scaler. Idempotent — safe to run anytime.

### What you see

```
[INFO]  fetching KEDA namespace listen connection string from Azure...
[OK]    source: Endpoint=sb://sb-<project>-<env>.servicebus.windows.net/;SharedAccessKeyName=keda-listen;SharedAccessKey=<redacted>...

[INFO] job-textract-<env>  (secret: servicebus-connection-string)
[INFO] setting servicebus-connection-string to the current keda-listen connection string
[INFO] forcing revision refresh so KEDA re-registers the scaler...
[OK]   job-textract-<env> configured

[INFO] job-search-index-<env>  (secret: servicebus-indexing-connection-string)
[INFO] setting servicebus-indexing-connection-string to the current keda-listen connection string
[INFO] forcing revision refresh so KEDA re-registers the scaler...
[OK]   job-search-index-<env> configured

[DONE] KEDA scaler secrets refreshed on all event-triggered jobs.
```

### Verification

Give KEDA ~60 seconds to poll, then upload a test document to the `documents` blob container and check:

```bash
az containerapp job execution list \
  -g rg-<project>-<env> -n job-textract-<env> \
  --query "[].{name:name, status:properties.status, start:properties.startTime}" -o table
```

An execution should appear within 90 seconds of the upload. If you still see zero executions after 2 minutes, check that the queue is actually receiving messages (Event Grid wiring):

```bash
az servicebus queue show \
  -g rg-<project>-<env> --namespace-name sb-<project>-<env> \
  --name ocr-processing \
  --query "countDetails" -o table
```

### Troubleshooting

| Issue | Resolution |
|---|---|
| Queue has messages but `job-textract` never runs | KEDA scaler secret stale / empty. Run `./azure-setup/configure_keda.sh .env`. |
| Same symptom for `job-search-index` on `ocr-indexing` | Same cause; `configure_keda.sh` handles both jobs in one run. |
| KEDA jobs never auto-trigger; manual `az containerapp job start` succeeds; `configure_keda.sh` runs without error but scaler still doesn't fire | The `keda-listen` namespace auth rule is missing the `Manage` permission. KEDA queries queue depth via the Service Bus management API, which requires Manage rights — Listen-only is silently treated as "0 messages." See the [Troubleshooting](troubleshooting) page for the verification command and fix. |

## Next Steps

Proceed to [Verification](verification) to run the final post-deploy sanity checks before handing the environment off to the Salesforce team.
