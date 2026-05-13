---
layout: default
title: Verification
description: Run the seven post-deploy sanity checks to confirm Recon DMS is fully provisioned on Azure before handing off to the Salesforce team.
great_grand_parent: Products
grand_parent: Recon DMS
parent: Azure Deployment Overview
nav_order: 6
has_toc: true
nav_scope: recon-dms
nav_scope_title: Recon DMS
---

# Verification

After completing all setup scripts, run these seven sanity checks from your terminal. Replace `<project>` and `<env>` with your `.env` values throughout.

> **Audience**  
> Azure administrators performing acceptance testing immediately before Salesforce-side configuration.

## 1. Both Container Apps Are Running

```bash
for app in ca-api-<env> ca-express-<env>; do
  az containerapp show -g rg-<project>-<env> -n "$app" \
    --query "{name:name, state:properties.provisioningState, running:properties.runningStatus}" -o table
done
```

**Expected:** Both apps show `state: Succeeded` and `running: Running`.

## 2. The API Responds

```bash
curl -sS "$(az containerapp show -g rg-<project>-<env> -n ca-api-<env> \
  --query properties.configuration.ingress.fqdn -o tsv | xargs -I {} echo https://{})"
```

**Expected output:** `This is ReconDMS APIs`

## 3. All Six Container App Jobs Are Provisioned

```bash
for j in job-textract-<env> job-search-index-<env> job-sync-batch-<env> \
         job-delete-batch-<env> job-result-sweeper-<env> job-status-sync-<env>; do
  echo "$j: $(az containerapp job show -g rg-<project>-<env> -n "$j" --query properties.provisioningState -o tsv)"
done
```

**Expected:** All six print `Succeeded`.

## 4. Key Vault Has 14 Secrets

```bash
az keyvault secret list --vault-name kv-<project>-<env> --query "[].name" -o tsv | sort
```

**Expected:** 14 secret names, matching the table in [Search Index & App Env Vars](search-and-app-config#secrets-provisioned-in-key-vault-by-terraform).

## 5. AI Search Index Exists

```bash
SEARCH_KEY=$(az search admin-key show -g rg-<project>-<env> --service-name srch-<project>-<env> --query primaryKey -o tsv)
curl -sS "https://srch-<project>-<env>.search.windows.net/indexes?api-version=2024-07-01" \
     -H "api-key: $SEARCH_KEY" | jq -r '.value[].name'
```

**Expected output:** `<project>-<env>-documents`

## 6. Service Bus Queues Exist

```bash
az servicebus queue list --namespace-name sb-<project>-<env> -g rg-<project>-<env> \
  --query "[].name" -o tsv
```

**Expected:** `ocr-processing`, `ocr-indexing`, `sb-recondms-result` (one per line).

## 7. Blob Containers Exist

```bash
az storage container list --account-name st<project><env> --auth-mode login \
  --query "[].name" -o tsv
```

**Expected:** `documents`, `ocr-results`, `profile-data`, `temp` (one per line).

## End-to-End Smoke Test

After all seven structural checks pass, run a real end-to-end smoke test:

1. Upload a small PDF or image to the `documents` blob container (Azure Portal → Storage Account → Containers → `documents` → Upload).
2. Within 90 seconds, run the KEDA verification command from [Authentication & Job Scaling](auth-and-scaling#verification) — `job-textract` should show a recent execution.
3. Within another ~60 seconds, `job-search-index` should also show an execution.
4. Query the AI Search index for content from your test document:

   ```bash
   curl -sS "https://srch-<project>-<env>.search.windows.net/indexes/<project>-<env>-documents/docs?api-version=2024-07-01&search=*" \
        -H "api-key: $SEARCH_KEY" | jq '.value | length'
   ```

   Should return at least `1`.

## Handoff to the Salesforce Team

Before considering the Azure side complete, confirm you have all four values from [Authentication & Job Scaling](auth-and-scaling#capture-the-four-salesforce-handoff-values) saved in your team's password manager:

- `UserId`
- `Token`
- API URL (`API_LAMBDA_URL` from `.env.derived`)
- Storage URL (derived from `STORAGE_ACCOUNT_NAME`)

Hand all four to whoever configures the Salesforce DMS package, then continue with [Salesforce Installation](../salesforce-installation).

## Troubleshooting

If any verification step fails, jump to the [Troubleshooting](troubleshooting) page — every symptom is mapped to a cause and a fix.

## Next Steps

If you operate more than one Salesforce sandbox, continue to [Multiple Environments](multi-environment) to deploy parallel isolated stacks per sandbox. Otherwise, this completes the Azure deployment — proceed to [Salesforce Installation](../salesforce-installation).
