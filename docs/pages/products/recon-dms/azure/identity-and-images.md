---
layout: default
title: Identity & Container Images
description: Run preflight, create the Resource Group and managed identity, verify vendor ACR credentials, create your customer ACR, and import the eight Recon DMS container images.
great_grand_parent: Products
grand_parent: Recon DMS
parent: Azure Deployment Overview
nav_order: 2
has_toc: true
nav_scope: recon-dms
nav_scope_title: Recon DMS
---

# Identity & Container Images

This module covers Steps 1–5 of the Azure setup package: the preflight check, identity bootstrap, vendor ACR credential verification, customer ACR creation, and container image import.

> **Audience**  
> Azure administrators executing the setup scripts after `.env` is populated.

## 1. Preflight Check (`preflight.sh`)

```bash
./azure-setup/preflight.sh .env
```

Read-only check. Confirms every tool is installed, you are logged in to the right subscription, every required `.env` value is filled in, resource names satisfy Azure's constraints, and registers the 12 Azure resource providers the deployment needs.

**Expected final line:** `[DONE] preflight passed`.

**Time:** ~1 minute.

### Verification

The script's final line should be `[DONE] preflight passed`. If you see `[ERROR]`, read the line — usually a missing tool or a blank `.env` value. Fix and re-run.

### Troubleshooting

| Issue | Resolution |
|---|---|
| `[ERROR] missing tool` | Install the named tool; re-open the terminal so PATH is refreshed. |
| `[ERROR] AZURE_SUBSCRIPTION_ID is empty` | A required `.env` value is blank. Edit `.env` and re-run. |
| `[ERROR] resource provider Microsoft.X not registered` | Should not happen — preflight registers providers automatically. If it fails, run `az provider register --namespace <Namespace>` manually and re-run preflight. |

## 2. Identity Bootstrap (`bootstrap_identity.sh`)

```bash
./azure-setup/bootstrap_identity.sh .env
```

Creates your Resource Group and one user-assigned managed identity (`id-<project>-aca-<env>`). This identity is what every Container App and Job will use at runtime to pull images from your ACR, read secrets from your Key Vault, and talk to Cosmos / Storage / Service Bus / Search / Document Intelligence — with no passwords anywhere.

Writes the identity's `MI_NAME`, `MI_PRINCIPAL_ID`, `MI_CLIENT_ID`, `MI_RESOURCE_ID`, and `CUSTOMER_TENANT` into `.env.derived`, where the next scripts read them.

**Time:** under 1 minute.

### Verification

```bash
az group show -n rg-<project>-<env> --query "{name:name, location:location, state:properties.provisioningState}" -o table
az identity show -g rg-<project>-<env> -n id-<project>-aca-<env> --query "{name:name, clientId:clientId}" -o table
cat .env.derived | grep -E "MI_NAME|MI_CLIENT_ID"
```

Resource Group should show `Succeeded`. Identity should show its `clientId`. `.env.derived` should contain populated `MI_*` values.

## 3. Vendor ACR Credentials Check

Confirm with the vendor, out-of-band, that the four `VENDOR_*` values in your `.env` are correct.

Optional sanity check against the vendor registry from your workstation:

```bash
set -a; source .env; set +a
curl -s -o /dev/null -w "HTTP %{http_code}\n" \
  -u "${VENDOR_ACR_TOKEN_NAME}:${VENDOR_ACR_TOKEN_PASSWORD}" \
  "https://${VENDOR_ACR_LOGIN_SERVER}/oauth2/token?service=${VENDOR_ACR_LOGIN_SERVER}"
```

### Verification

- `HTTP 200` → credentials work.
- `HTTP 401` → token name, password, or scope-map is wrong. Contact the vendor before proceeding to the next step.

## 4. Customer ACR Bootstrap (`bootstrap_acr.sh`)

```bash
./azure-setup/bootstrap_acr.sh .env
```

Generates `infrastructure/terraform/terraform.tfvars` from your `.env`, runs `terraform init`, and does a targeted apply that creates the Azure Container Registry and grants `AcrPull` on it to your managed identity.

**Expected final output:**

```
[DONE]  Stage 1 complete
  customer ACR : cr<project><env>
  login server : cr<project><env>.azurecr.io
  RG           : rg-<project>-<env>
```

**Time:** ~3 minutes.

### Verification

```bash
az acr show -n cr<project><env> --query "{name:name, loginServer:loginServer, sku:sku.name}" -o table
```

The registry should exist and report SKU `Standard`.

### Troubleshooting

| Issue | Resolution |
|---|---|
| `name is not available` | Container Registry names are globally unique across Azure. Add a few characters to `PROJECT_NAME` in `.env` and re-run. |
| Terraform reports identity `already exists` | Step 2 created it via `az`, but Terraform now wants to manage it. Import it into state — see the Azure Deployment [Troubleshooting](troubleshooting) page for the exact command. |

## 5. Import Container Images (`import_images.sh`)

```bash
./azure-setup/import_images.sh .env
```

Copies eight prebuilt images from the vendor ACR to your ACR using `az acr import`. The copy happens server-to-server inside Azure — nothing is downloaded to your workstation.

**Expected final line:** `[SUMMARY] imported 8   failed 0`.

**Time:** ~5 minutes.

### Verification

```bash
az acr repository list -n cr<project><env> -o tsv | sort
```

Should list all eight Recon DMS image repositories.

### Troubleshooting

| HTTP | Meaning | Fix |
|---|---|---|
| 401 | Vendor token rejected | Re-check token name + password; re-run the curl test from Step 3; contact the vendor. |
| 404 | Repo or tag missing at the vendor | Confirm `VENDOR_IMAGE_TAG` with the vendor. |
| timeout | Vendor ACR throttling | Re-run — the script is idempotent. |

## Next Steps

Proceed to [Core Infrastructure (Terraform)](infrastructure) to deploy the full Azure resource stack with one Terraform apply.
