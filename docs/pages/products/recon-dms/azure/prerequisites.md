---
layout: default
title: Prerequisites & .env Setup
description: Install required tools, confirm Azure permissions, collect vendor credentials, populate .env, and log in to Azure before running the Recon DMS Azure deployment scripts.
great_grand_parent: Products
grand_parent: Recon DMS
parent: Azure Deployment Overview
nav_order: 1
has_toc: true
nav_scope: recon-dms
nav_scope_title: Recon DMS
---

# Prerequisites & .env Setup

This module prepares your workstation and Azure subscription so the rest of the deployment can run unattended.

> **Audience**  
> Azure administrators and DevOps engineers performing the initial Recon DMS deployment on Azure.

## 1. Install Required Workstation Tools

Install these five tools before doing anything else:

| Tool | Minimum | Check |
|---|---|---|
| Azure CLI | 2.50 | `az --version` |
| Terraform | 1.9 | `terraform -version` |
| jq | any | `jq --version` |
| openssl | any | `openssl version` |
| bash | 4+ (for associative arrays) | `bash --version` |

Docker is **not** required. Images are copied server-to-server inside Azure via `az acr import`.

> **Note**  
> macOS ships with `/bin/bash` 3.2, which is too old. Install modern bash with `brew install bash` and make sure `/opt/homebrew/bin` (Apple Silicon) or `/usr/local/bin` (Intel) is first on your PATH.

**Windows users:** use Git Bash or WSL. PowerShell / Command Prompt are not supported. If you use Git Bash, two quirks apply:

- Terraform `import` commands on Azure resource IDs need `MSYS_NO_PATHCONV=1` to stop Git Bash from rewriting `/subscriptions/…` paths.
- Make sure your `.env` and `param.json` are saved with **LF** line endings, not CRLF. In VS Code, click the `LF` / `CRLF` indicator in the bottom-right status bar to change it.

### Verification

- `az --version`, `terraform -version`, `jq --version`, `openssl version`, and `bash --version` all succeed and meet the minimums above.
- `which az terraform jq openssl bash` returns paths to the correct (modern) binaries.

## 2. Confirm Azure Permissions

You need **Owner** on the target subscription, or **Contributor + User Access Administrator**. The deployment creates role assignments, which plain Contributor cannot do.

### Verification

```bash
az role assignment list \
  --assignee $(az account show --query user.name -o tsv) \
  --scope "/subscriptions/$(az account show --query id -o tsv)" \
  --query "[].roleDefinitionName" -o tsv
```

Confirm the output includes `Owner`, or both `Contributor` and `User Access Administrator`.

## 3. Receive Credentials from the Vendor

The vendor delivers five values out-of-band (encrypted message, password manager, or secure portal — **never** cleartext email):

| Variable | Purpose |
|---|---|
| `VENDOR_ACR_LOGIN_SERVER` | The vendor's ACR (e.g., `crreconvendor.azurecr.io`) |
| `VENDOR_IMAGE_TAG` | Release version to deploy (usually `latest`) |
| `VENDOR_ACR_TOKEN_NAME` | Scope-bound pull token name |
| `VENDOR_ACR_TOKEN_PASSWORD` | Token password (bearer credential) |
| `ACCESS_KEY` | Admin-bootstrap key consumed in Module 5 |

The vendor ACR token is **scope-bound**: it can only `content/read` the eight Recon DMS image repositories. It cannot push, list other repos, or reach anything outside those images.

> **Tip**  
> Rotate the vendor token by asking the vendor to regenerate the password — there is no other rotation path.

## 4. Populate `.env`

From the extracted setup package, copy the template and edit it:

```bash
cp azure-setup/.env.example .env
```

Fill in the values:

```bash
# --- Your Azure identity ---
AZURE_SUBSCRIPTION_ID=<subscription GUID>
AZURE_TENANT_ID=<tenant GUID>

# --- Project identifiers ---
PROJECT_NAME=recondms          # keep short (<=11 chars) to stay under Azure's 24-char limits
ENVIRONMENT=dev                # dev | qa | uat | prod
LOCATION=eastus                # any region that supports Document Intelligence, AI Search, Container Apps

# --- Derived resource names (leave as-is) ---
RESOURCE_GROUP=rg-${PROJECT_NAME}-${ENVIRONMENT}
ACR_NAME=cr${PROJECT_NAME}${ENVIRONMENT}
KEYVAULT_NAME=kv-${PROJECT_NAME}-${ENVIRONMENT}
STORAGE_ACCOUNT_NAME=st${PROJECT_NAME}${ENVIRONMENT}

# --- Vendor image registry (from out-of-band delivery) ---
VENDOR_ACR_LOGIN_SERVER=
VENDOR_IMAGE_TAG=latest
VENDOR_ACR_TOKEN_NAME=
VENDOR_ACR_TOKEN_PASSWORD=

# --- Secrets you generate (paste output of openssl rand below) ---
JWT_SECRET=
ENCRYPTION_SECRET_KEY=

# --- SharePoint integration (OPTIONAL — leave blank to disable) ---
SHAREPOINT_CLIENT_ID=
SHAREPOINT_CLIENT_SECRET=
SHAREPOINT_LOGIN_URI=
TEXTRACT_UPDATE_ENDPOINT=      # Salesforce callback URL for OCR status

# --- Salesforce Connected App ---
# SF_LOGIN_URI is REQUIRED for the OCR status callback used by api-lambda,
# textract-status-sync, and textract-result-sweeper:
#   https://login.salesforce.com/services/oauth2/token             (prod)
#   https://test.salesforce.com/services/oauth2/token              (sandbox)
#   https://<your-org>.my.salesforce.com/services/oauth2/token     (custom domain)
SF_CLIENT_ID=
SF_CLIENT_SECRET=
SF_LOGIN_URI=

# --- Admin bootstrap (used only by Module 5) ---
ACCESS_KEY=                    # vendor-supplied bootstrap key

# --- Alerts and budget (recommended for prod; blank to skip) ---
OWNER_EMAIL=                   # email for Azure Monitor alerts + budget notifications
MONTHLY_BUDGET_USD=3000        # 0 to skip the budget resource
```

Generate the two self-signed secrets and paste the output into `.env`:

```bash
openssl rand -hex 32    # → JWT_SECRET
openssl rand -hex 32    # → ENCRYPTION_SECRET_KEY
```

> **Warning**  
> Never reuse production `JWT_SECRET` or `ENCRYPTION_SECRET_KEY` in lower environments. Generate fresh values per environment.

### SharePoint is optional

If you do not use SharePoint, leave all three `SHAREPOINT_*` values blank. Terraform writes placeholder values into Key Vault so `keyvault-bootstrap` does not throw at startup, and `IS_SHAREPOINT` is set to `false` on the batch / delete-batch jobs so they skip SharePoint calls entirely. `api-lambda` and the other workloads boot cleanly regardless.

### Salesforce credentials

`SF_CLIENT_ID` and `SF_CLIENT_SECRET` are optional — blank values reuse the SharePoint credentials. `SF_LOGIN_URI` is **required** because it is the OAuth token endpoint used by the OCR status callback path (not the SharePoint / AAD URL).

### Verification

```bash
source .env && echo "SUB=$AZURE_SUBSCRIPTION_ID | ENV=$ENVIRONMENT | REGION=$LOCATION"
```

The values should print without `unbound variable` errors.

## 5. Make the Scripts Executable

```bash
chmod +x azure-setup/*.sh
```

### Verification

```bash
ls -l azure-setup/*.sh | head -3
```

The mode column should show `-rwxr-xr-x` (or similar) for each script.

## 6. Log In to Azure

```bash
az login
az account set --subscription "$AZURE_SUBSCRIPTION_ID"
az account show --query "{sub:id, tenant:tenantId, name:name}" -o table
```

### Verification

The `az account show` output should match the subscription and tenant in your `.env`.

## Troubleshooting

| Issue | Resolution |
|---|---|
| `bash: associative array support required` | Your bash is too old (likely macOS 3.2). Install `brew install bash` and put `/opt/homebrew/bin` first on PATH. |
| `terraform -version` returns 1.5 or lower | Upgrade to 1.9+. On macOS: `brew upgrade terraform`. On Windows: download from terraform.io. |
| `az login` opens browser but no session | Try `az login --use-device-code` to get a code you paste into a browser on another device. |
| `.env` values include unexpected `\r` characters | File was saved with CRLF line endings. In VS Code, switch to LF via the status bar indicator, then re-save. |

## Next Steps

Proceed to [Identity & Container Images](identity-and-images) to run the preflight check, create your Resource Group and managed identity, and import the Recon DMS container images from the vendor ACR.
