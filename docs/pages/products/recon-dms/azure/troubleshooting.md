---
layout: default
title: Troubleshooting & Support
description: Common symptoms, causes, and fixes for Recon DMS deployments on Azure. Plus live-log commands and vendor support guidance.
great_grand_parent: Products
grand_parent: Recon DMS
parent: Azure Deployment Overview
nav_order: 8
has_toc: true
nav_scope: recon-dms
nav_scope_title: Recon DMS
---

# Troubleshooting & Support

This page consolidates every documented failure mode for the Azure deployment scripts, along with the live-log commands you will need when things go sideways.

> **Audience**  
> Anyone debugging a Recon DMS Azure deployment that is not behaving as expected.

> **Tip**  
> Every script is safe to re-run. If one fails partway, fix the underlying issue and run it again — it picks up where it left off.

## 1. Preflight & Identity

| Symptom | Likely cause | Fix |
|---|---|---|
| `preflight.sh`: `[ERROR] missing tool` | A CLI is not installed or is not on PATH. | Install the named tool; re-open the terminal so PATH is refreshed. |
| `preflight.sh`: `[ERROR] AZURE_SUBSCRIPTION_ID is empty` | A required `.env` value is blank. | Edit `.env` and re-run. |
| `bootstrap_acr.sh`: `name is not available` | Container Registry names are globally unique across Azure. | Add a few characters to `PROJECT_NAME` in `.env` and re-run. |

## 2. Vendor ACR & Image Import

| HTTP / symptom | Likely cause | Fix |
|---|---|---|
| `import_images.sh`: HTTP 401 / 403 | Vendor token wrong or revoked. | Confirm values with the vendor; run the curl test in [Identity & Container Images](identity-and-images#3-vendor-acr-credentials-check). |
| `import_images.sh`: HTTP 404 | Tag missing in vendor ACR. | Confirm `VENDOR_IMAGE_TAG` with the vendor. |
| `import_images.sh`: timeout | Vendor ACR throttling. | Re-run — the script is idempotent. |

## 3. Terraform Deploy

| Symptom | Likely cause | Fix |
|---|---|---|
| `already exists — needs to be imported` for Resource Group or managed identity | Step 2 created them via `az` and Terraform wants to manage them. | Import them into state (Git Bash users: prefix with `MSYS_NO_PATHCONV=1`): <br/>`terraform -chdir=infrastructure/terraform import azurerm_resource_group.main "/subscriptions/<sub>/resourceGroups/rg-<project>-<env>"` <br/>`terraform -chdir=infrastructure/terraform import azurerm_user_assigned_identity.aca "/subscriptions/<sub>/resourceGroups/rg-<project>-<env>/providers/Microsoft.ManagedIdentity/userAssignedIdentities/id-<project>-aca-<env>"` <br/>Then re-run `bootstrap_acr.sh .env`. |
| Container App stuck in `ProvisioningState: Failed` | Image pull or probe failure on first creation. | Delete the failed shell and re-apply: <br/>`az containerapp delete -g rg-<project>-<env> -n ca-api-<env> --yes` <br/>`./azure-setup/deploy_terraform.sh .env` |
| `quota exceeded` during apply | Per-subscription cap on Container Apps environments, Cosmos accounts, AI Search services, etc. | Request a quota increase via the Azure Portal — usually approved within hours. |

## 4. Search Index Creation

| Symptom | Likely cause | Fix |
|---|---|---|
| `invalid SEARCH_INDEX_NAME` | Name has uppercase, underscore, or leading/trailing dash. | Edit `SEARCH_INDEX_NAME` in `.env` or remove it entirely to use the default. |
| HTTP 403 / 401 | Admin key just rotated or managed identity propagation still pending. | Wait 1–2 minutes, re-run. |

## 5. Container App Environment Variables

| Symptom | Likely cause | Fix |
|---|---|---|
| `set_aca_envs.sh`: `[SKIP] unknown logical name` for multiple apps | `param.json` saved with CRLF line endings. | `sed -i 's/\r$//' azure-setup/param.json` |
| `set_aca_envs.sh`: `KEY_VAULT_URI: unbound variable` | `.env.derived` was clobbered or Terraform never completed. | Re-run `deploy_terraform.sh .env` to repopulate `.env.derived`. |

## 6. Container App Runtime Failures

| Symptom | Likely cause | Fix |
|---|---|---|
| Container App revision stuck in `Activating`, probes keep failing | Image crash-looping before binding its port. | Tail logs: <br/>`WORKSPACE_ID=$(az monitor log-analytics workspace show -g rg-<project>-<env> -n log-<project>-<env> --query customerId -o tsv)` <br/>`az monitor log-analytics query -w "$WORKSPACE_ID" --analytics-query "ContainerAppConsoleLogs_CL \| where ContainerAppName_s == 'ca-api-<env>' \| order by TimeGenerated desc \| take 40"` |
| api-lambda logs show `RestError` hitting `kv-….vault.azure.net/secrets/…` | Managed identity missing `Get`/`List` on Key Vault, or `AZURE_CLIENT_ID` env var missing/mismatched. | Verify `AZURE_CLIENT_ID` matches the MI clientId: <br/>`az containerapp show -g rg-<project>-<env> -n ca-api-<env> --query "properties.template.containers[0].env[?name=='AZURE_CLIENT_ID'].value" -o tsv` <br/>Re-grant if needed: <br/>`az keyvault set-policy -n kv-<project>-<env> --spn <mi-client-id> --secret-permissions get list` |
| `create_auth_user.sh`: `"stream timeout"` or `jq: parse error` | `api-lambda` is still starting. | Wait 60 seconds, re-run. |

## 7. KEDA Scaler Failures

| Symptom | Likely cause | Fix |
|---|---|---|
| OCR queue has messages but `job-textract` never runs (zero executions) | KEDA scaler secret stale / empty from initial Terraform apply. | Run `./azure-setup/configure_keda.sh .env` — re-reads the `keda-listen` namespace auth rule and overwrites the secret on the job, then forces KEDA to re-register. |
| Same symptom for `job-search-index` on `ocr-indexing` queue | Same cause. | Same fix — `configure_keda.sh` handles both jobs in one run. |
| Both KEDA jobs never auto-trigger; manual `az containerapp job start` succeeds; `configure_keda.sh` runs without error but scaler still doesn't fire | The `keda-listen` namespace auth rule is missing the `Manage` permission. KEDA queries queue depth via the Service Bus management API, which requires Manage rights — Listen-only is silently treated as "0 messages" so the scaler never fires. | Verify with `az servicebus namespace authorization-rule show -g <rg> --namespace-name <ns> --name keda-listen --query rights`. If it does not include `"Manage"`, set `manage = true` (and `send = true`, since Manage requires it) on `keda_listen` in `servicebus.tf` and `terraform apply -target='azurerm_servicebus_namespace_authorization_rule.keda_listen'`. Then re-run `configure_keda.sh`. The script's preflight catches this automatically. |

## 8. Live-Log Commands

```bash
# Follow live logs from a Container App
az containerapp logs show -g rg-<project>-<env> -n ca-api-<env> --follow

# Query Log Analytics for the last 40 entries from a specific app
WORKSPACE_ID=$(az monitor log-analytics workspace show \
  -g rg-<project>-<env> -n log-<project>-<env> --query customerId -o tsv)
az monitor log-analytics query -w "$WORKSPACE_ID" --analytics-query \
  "ContainerAppConsoleLogs_CL | where ContainerAppName_s == 'ca-api-<env>' | order by TimeGenerated desc | take 40"

# List recent executions of a job
az containerapp job execution list -g rg-<project>-<env> -n job-textract-<env> \
  --query "[].{name:name, status:properties.status, start:properties.startTime}" -o table
```

## 9. Where to Look in the Portal

- **Resource inventory:** Azure Portal → your Resource Group (`rg-<project>-<env>`).
- **Alerts (if `OWNER_EMAIL` is set):** Azure Portal → Monitor → Alerts.
- **Application Insights traces:** Azure Portal → `appi-<project>-<env>` → Transaction Search.
- **Key Vault audit:** Azure Portal → `kv-<project>-<env>` → Diagnostic Settings (verify Log Analytics streaming is on).

## 10. Contacting Recon Apps Support

When opening a support ticket, share:

- The `[ERROR]` / `[FAIL]` line from the terminal (full stack if available).
- A screenshot of the affected resource in the Azure Portal.
- The output of `az account show` (subscription, tenant, region).
- Your `PROJECT_NAME` and `ENVIRONMENT` values.

> **Warning**  
> Never share `.env`, `terraform.tfstate`, the contents of `azure-setup/.auth_user.*.json`, or any Key Vault secret values when contacting support. These contain credentials that grant administrative access to your stack.

## Next Steps

Once you have resolved the issue, re-run the affected script — every script in the package is idempotent. If the problem persists after the documented fix, contact Recon Apps support with the artifacts listed in §10.
