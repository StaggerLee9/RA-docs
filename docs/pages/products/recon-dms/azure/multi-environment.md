---
layout: default
title: Multiple Environments
description: Deploy parallel isolated Recon DMS stacks on Azure — one per Salesforce sandbox (Dev, QA, UAT, Prod) — using the ENVIRONMENT suffix.
great_grand_parent: Products
grand_parent: Recon DMS
parent: Azure Deployment Overview
nav_order: 7
has_toc: true
nav_scope: recon-dms
nav_scope_title: Recon DMS
---

# Multiple Environments

Most teams run more than one Salesforce sandbox (Dev, QA, UAT, Prod) and want a matching Recon DMS deployment behind each. Each sandbox should point at its **own isolated stack** — its own Cosmos DB, blob storage, Key Vault, and search index — so data and credentials never bleed between environments.

> **Audience**  
> Azure administrators and DevOps engineers managing more than one Recon DMS environment.

The setup package is designed for this. The mechanism is the `ENVIRONMENT` value in `.env`: every Azure resource name created by Terraform is suffixed with it (`rg-recondms-dev`, `kv-recondms-dev`, `cosmos-recondms-dev`, …), so multiple environments coexist without name collisions.

## 1. Same Region, Same Subscription Is Fine

Region selection should be driven by latency, data residency, or compliance — **not** by environment separation. All your environments can live in the same region (and the same Azure subscription). If you tied environment to region you would run out of regions the moment a partner needs more than two sandboxes.

## 2. Recipe: One Folder per Sandbox

The simplest mental model: extract the setup zip into a separate folder for each Salesforce sandbox you want to mirror. Each folder is self-contained — its own `.env`, its own Terraform state, its own deployed resources.

```
~/recondms-azure-dev/    ← extract here, ENVIRONMENT=dev,  run all modules
~/recondms-azure-qa/     ← extract here, ENVIRONMENT=qa,   run all modules
~/recondms-azure-uat/    ← extract here, ENVIRONMENT=uat,  run all modules
~/recondms-azure-prod/   ← extract here, ENVIRONMENT=prod, run all modules
```

For each sandbox:

1. Extract the zip into a fresh folder.
2. Open `.env` and set `ENVIRONMENT` to that sandbox's name. Allowed values: `dev`, `qa`, `uat`, `prod`.
3. Use a different `JWT_SECRET` and `ENCRYPTION_SECRET_KEY` per environment — never reuse production secrets in lower environments.
4. Run the modules in order, exactly as documented for a single environment.

Each run produces a parallel, isolated stack named `rg-<project>-<env>` with its own resources.

## 3. What to Keep Separate per Environment

| Per-env value (set in each folder's `.env`) | Should differ? |
|---|---|
| `ENVIRONMENT` | **Yes** — drives every resource name suffix |
| `JWT_SECRET`, `ENCRYPTION_SECRET_KEY` | **Yes** — never share secrets across environments |
| `SF_LOGIN_URI` | **Yes** — points at the matching Salesforce sandbox URL |
| `SF_CLIENT_ID`, `SF_CLIENT_SECRET` | **Yes** — each Salesforce sandbox has its own Connected App |
| `OWNER_EMAIL`, `MONTHLY_BUDGET_USD` | Optional — usually different budget per env (lower in dev, higher in prod) |
| `AZURE_SUBSCRIPTION_ID`, `AZURE_TENANT_ID` | Same is fine — multiple envs in one subscription is the normal pattern |
| `LOCATION` | Same is fine |
| `PROJECT_NAME` | Same — the env suffix is what makes resources unique |
| `VENDOR_*` (image registry credentials) | Same — one vendor token pulls images for every env |

## 4. Things to Be Careful About

> **Warning**  
> The five practices below have all bitten teams managing multiple Recon DMS environments.

- **Don't delete `terraform.tfstate`** in any folder. It's the only record of what Terraform deployed for that environment. Losing it leaves resources orphaned in Azure that Terraform can no longer manage — recovery means manual cleanup or `terraform import`. Back the state file up alongside your team's password manager, or configure a remote backend (Azure Storage account) once you're past dev.
- **Don't share `.env` between folders.** Copy and edit, never symlink. If you change a value in one folder thinking you're editing only that env, you don't want it accidentally affecting prod.
- **Updating the setup later means re-extracting in every folder.** When the vendor ships an updated zip (bug fix, new resource), extract it on top of *each* env folder and re-run the relevant scripts. It's easy to forget one — keep a checklist.
- **Be careful with destructive commands.** Without folder prefixes in your shell prompt, the only thing distinguishing folders is the path. Always check `cat .env | grep ENVIRONMENT` before running `terraform destroy` or `az containerapp delete`.
- **Resource quotas are per-subscription.** A single subscription has caps on Container Apps environments, Cosmos accounts, AI Search services, and so on. If you spin up four environments and hit a quota error during the [Core Infrastructure](infrastructure) module, request an increase via the Azure Portal — usually approved within hours.

## 5. Quick Checklist for Adding a New Environment

```bash
# 1. Make a fresh folder and extract
mkdir ~/recondms-azure-uat && cd ~/recondms-azure-uat
unzip /path/to/recondms-azure-setup.zip

# 2. Configure .env (copy values from an existing env, then edit)
cp ~/recondms-azure-dev/.env .env
# edit .env:
#   ENVIRONMENT=uat
#   JWT_SECRET=<new openssl rand -hex 32>
#   ENCRYPTION_SECRET_KEY=<new openssl rand -hex 32>
#   SF_LOGIN_URI=https://<your-uat-sandbox>.my.salesforce.com/services/oauth2/token
#   SF_CLIENT_ID / SF_CLIENT_SECRET=<from the UAT Connected App>

# 3. Run all setup modules in order
chmod +x azure-setup/*.sh
./azure-setup/preflight.sh .env
./azure-setup/bootstrap_identity.sh .env
# … through the full module sequence …

# 4. Save the new UserId, Token, API URL, and Storage URL into your password
#    manager, tagged with the environment name (e.g., "recondms-uat").
```

The new stack lives at `rg-<project>-uat`, fully isolated from `dev` / `qa` / `prod`. Hand the new four-tuple to whoever configures that Salesforce sandbox.

## Teardown of a Single Environment

```bash
cd infrastructure/terraform
terraform destroy
```

Terraform destroys everything in that environment in about 10–20 minutes. A few caveats:

- **Key Vault purge protection** is on by default in production. Destroy soft-deletes the vault for 90 days; you cannot reuse the same name within that window. To remove the protection and allow immediate re-deploy, activate the smoke-test overlay (`test.tfvars.example` → `test.auto.tfvars`) before the first apply — it sets `keyvault_purge_protection = false` — or pick a new `PROJECT_NAME` / `ENVIRONMENT`.
- **Cosmos DB** with continuous backup retains its PITR window for a short time after destroy; this does not block re-deploy.
- **Log Analytics** destroys quickly. If you want the audit trail, export it to storage before destroying.

For a targeted teardown of one workload without destroying the whole stack:

```bash
terraform destroy -target=azurerm_container_app.api_lambda
```

## Next Steps

If you hit a snag during a per-environment deployment, the [Troubleshooting](troubleshooting) page maps every common symptom to a fix. If everything is green, you are done with the Azure side — continue with [Salesforce Installation](../salesforce-installation).
