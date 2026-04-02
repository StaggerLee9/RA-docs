---
layout: default
title: DMS Migration
parent: Recon DMS
grand_parent: Products
has_toc: true
nav_order: 7
---

# DMS Migration

## Overview

DMS Migration is an enterprise-grade file migration system that imports large volumes of documents from legacy document management systems (iManage, Documentum, network file shares) into ReconDMS. AWS Lambda handles the heavy lifting while Salesforce provides the operator interface via a guided six-step wizard.

The system is **fully object-agnostic** — migrated documents can attach to any Salesforce object (Matters, Accounts, Cases, or custom objects) without code changes.

## Architecture

```
Salesforce                                    AWS
+-----------------------+                     +----------------------------------+
| migrationConsole LWC  |--Apex Controller-->| API Gateway (21 routes)          |
| (6-step wizard)       |                    |   +- Upload API (JWT auth)       |
|                       |<-Platform Events---+   +- Migration API (API key)     |
|                       |                    |                                  |
| Migration_Batch__c    |                    | Lambda Functions (14)            |
| Migration_Audit_Log__c|                    |   +- Orchestrator                |
+-----------------------+                    |   +- File Processor (50+ conc.) |
                                             |   +- Bulk Accumulator            |
                                             |   +- Status Sync                 |
                                             |   +- DLQ Handler                 |
                                             |   +- Validators (CSV, S3, SF)    |
                                             |   +- Rollback (Step Functions)   |
                                             |                                  |
                                             | Storage                          |
                                             |   +- DynamoDB (batch/file state) |
                                             |   +- SQS + DLQ (fan-out)         |
                                             |   +- S3 Staging Bucket           |
                                             +----------------------------------+
                                                        |
                                             +----------v----------+
                                             | Existing ReconDMS   |
                                             | +- Production S3    |
                                             | +- MongoDB          |
                                             | +- Textract/OCR     |
                                             | +- OpenSearch        |
                                             +---------------------+
```

## Key Capabilities

### Migration Processing
- **Bulk File Import** — Tens of thousands of documents per batch with automatic S3 storage, metadata registration, and Salesforce record creation.
- **Object-Agnostic Design** — Attach migrated documents to any Salesforce object via the `objectName` manifest column.
- **Custom Field Passthrough** — Map additional CSV columns directly to Document Profile fields, preserving legacy metadata during migration.
- **Duplicate Detection** — SHA-256 hash comparison identifies duplicate files before import.

### Operator Experience
- **Six-Step Guided Wizard** — Visual step-by-step interface in Salesforce covering manifest upload through completion.
- **Two-Tier Validation** — Structural validation (CSV format, S3 file existence) plus optional live Salesforce validation (parent records, access, picklist values).
- **Real-Time Progress** — Platform Events push status updates to the wizard with live file counts, success rates, and error details.

### Safety and Recovery
- **Full Rollback** — Reverse any migration completely via AWS Step Functions: removes Salesforce records, MongoDB entries, search index data, OCR results, and S3 files in the correct dependency order.
- **Automatic Retry** — Failed files retry with exponential backoff before moving to a dead letter queue.
- **Auto-Fail Threshold** — Configurable failure percentage that halts migrations with excessive error rates.

### Post-Migration
- **OCR and Indexing** — Migrated files automatically trigger Textract OCR processing and OpenSearch full-text indexing.
- **Preview URL Generation** — Documents receive properly formatted preview URLs compatible with the ReconDMS managed package viewer.
- **Verification** — Post-migration verification confirms record counts match between AWS and Salesforce.

---

## The Six-Step Wizard

| Step | Name | What Happens |
|------|------|-------------|
| 1 | **Upload Manifest** | Select a source system (iManage, Documentum, File Share, Other) and upload a CSV manifest mapping files to target parent records. |
| 2 | **Upload Files** | Generate a time-limited JWT upload link. Open the standalone web uploader to drag-and-drop files to the S3 staging bucket. |
| 3 | **Validate** | Structural validation runs first. Optionally run live Salesforce validation to confirm parent records, access, and picklist values. |
| 4 | **Review** | Summary of file count, target records, validation status, and warnings. Confirm to proceed. |
| 5 | **Monitor** | Real-time progress via Platform Events (~1 min updates) with 10-second polling fallback. Cancel mid-flight if needed. |
| 6 | **Complete** | Final report with options to retry failed files, download a failed-files CSV, run verification, or initiate rollback. |

---

## Manifest CSV Format

### Required Columns

| Column | Description |
|--------|-------------|
| `file_name` | Exact filename matching the file in the staging bucket |
| `target_parent_id` | 18-character Salesforce parent record ID |
| `objectName` | Parent object API name (e.g., `Account`, `Matter__c`, `Custom_Object__c`) |

### Optional Columns

| Column | Description |
|--------|-------------|
| `target_folder_id` | ReconDMS folder ID for file organization |
| `document_type` | Document classification |
| `original_author` | Author from the source system |
| `created_date` | Original creation date |
| `source_system_id` | ID from the legacy system |
| `file_path` | Original file path in the source system |
| `folderPath` | Auto-create folder hierarchies from path |

Any additional columns using Document_Profile__c API names as headers are passed through as custom field values.

---

## Deployment

### Prerequisites

| Requirement | Details |
|-------------|---------|
| AWS Account | Lambda, DynamoDB, S3, SQS, API Gateway, Step Functions, CloudFront, IAM |
| AWS CLI + SAM CLI | v2+ and v1.100+ respectively |
| Node.js | 18+ |
| Salesforce Org | With ReconDMS managed package installed |
| Existing ReconDMS Infra | Production S3 bucket, MongoDB database |

### Component Map

| Component | Deploys To | Contents |
|-----------|-----------|----------|
| `aws/` | AWS (SAM CLI) | 14 Lambda functions, API Gateway (21 routes), DynamoDB, SQS, S3 staging, Step Functions rollback |
| `force-app/` | Salesforce (SF CLI) | LWC wizard (6 components), Apex controller, custom objects, Platform Event |
| `uploader/` | S3/CloudFront | Standalone drag-drop file uploader web app |

### Step 1 — Deploy AWS Stack

```bash
cd aws
sam build
sam deploy --guided    # First time — configures parameters
```

#### Required SAM Parameters

| Parameter | Description |
|-----------|-------------|
| `Environment` | `dev`, `staging`, or `prod` — controls resource naming |
| `JwtSecret` | Generate with `openssl rand -hex 32` |
| `ApiKey` | Generate with `openssl rand -hex 32` — must match Salesforce Named Credential |
| `MongoDbUri` | ReconDMS MongoDB connection string |
| `MongoDbDatabase` | MongoDB database name |
| `SfClientId` | Salesforce Connected App consumer key |
| `SfClientSecret` | Salesforce Connected App consumer secret |
| `SfLoginUrl` | Salesforce My Domain URL (e.g., `https://myorg.my.salesforce.com`) |
| `ProductionBucket` | Existing ReconDMS S3 bucket name |

#### Optional SAM Parameters

| Parameter | Feature | When Empty |
|-----------|---------|------------|
| `FileAccessBaseUrl` + `ReconClientSecret` | Document preview URLs | `AWS_Url__c` left null |
| `TextractLambdaArn` | OCR processing | Files migrate without OCR |
| `OpenSearchNode` + credentials | Full-text search rollback | Rollback skips OpenSearch |
| `TextractBucket` | Textract rollback cleanup | Rollback skips Textract cleanup |
| `ProductionBucketRegion` | Cross-region S3 copy | Uses stack region |

Save the stack outputs after deployment: **`MigrationApiUrl`** (for Named Credential) and **`UploaderDistributionUrl`** (CloudFront URL for the file uploader).

### Step 2 — Configure Salesforce

#### External Client App (Connected App)

1. **Setup > External Client App Manager > New**
2. Enable OAuth with scopes: `api`, `refresh_token`
3. Edit Policies:
   - Permitted Users: "Admin approved users are pre-authorized"
   - IP Relaxation: "Relax IP restrictions"
   - Enable Client Credentials Flow: checked
   - Run-As User: System Administrator or dedicated integration user

#### Org-Level OAuth Settings

- **Setup > OAuth and OpenID Connect Settings** — Enable "Allow OAuth Username-Password Flows"
- **Setup > User Interface** — Enable "Enable SOAP API login()"

#### Named Credential

| Field | Value |
|-------|-------|
| Label | `Migration_API` |
| URL | `MigrationApiUrl` from stack outputs |
| Identity Type | Named Principal |
| Authentication Protocol | Custom Header |
| Header Name | `x-api-key` |
| Header Value | The `ApiKey` value you generated |

#### Remote Site Settings

Add the API Gateway domain from `MigrationApiUrl`.

### Step 3 — Deploy Salesforce Metadata

```bash
sf project deploy start -d force-app -o YourOrgAlias
```

### Step 4 — Deploy Web Uploader (Optional)

```bash
cd uploader
npm install
VITE_API_BASE=<MigrationApiUrl> npm run build
aws s3 sync dist/ s3://<UploaderBucketName>/ --profile your-profile
```

### Step 5 — Tune via Custom Metadata (Optional)

**Setup > Custom Metadata Types > Migration Config > Manage Records** — create a record with Developer Name `Default`:

| Field | Description | Default |
|-------|-------------|---------|
| `Auto_Fail_Threshold__c` | Failure % that triggers batch auto-fail | 10 |
| `Bulk_API_Batch_Size__c` | Records per Bulk API 2.0 job (max 10,000) | 5000 |

---

## Salesforce Custom Objects

| Object | Purpose |
|--------|---------|
| Migration_Batch__c | Tracks each migration job: status, file counts, timestamps, error summary |
| Migration_Audit_Log__c | Records every action taken during a migration for compliance |
| Migration_Status_Event__e | Platform Event for real-time progress updates to the wizard |

---

## Rollback Process

Rollback is orchestrated by AWS Step Functions and reverses a completed migration in dependency order:

1. Delete Salesforce `Document_Profile__c` records (Bulk API)
2. Delete MongoDB document entries
3. Remove OpenSearch index entries (if configured)
4. Delete S3 production files
5. Clean up Textract data (if configured)
6. Update DynamoDB batch and file status

A rollback preview shows affected counts before execution.

---

## Verification Checklist

1. Open the Migration Console in Salesforce (App Launcher > DMS Migration)
2. Create a test batch with 2-3 small files
3. Upload files via the web uploader link
4. Upload a CSV manifest with required columns
5. Run validation, then start the migration
6. Verify files appear in the production S3 bucket and `Document_Profile__c` records are created
7. Confirm preview URLs work (if configured)
8. Test rollback on the test batch

---

## Glossary

| Term | Definition |
|------|-----------|
| **Orchestrator** | Lambda that parses the manifest and fans out one SQS message per file |
| **File Processor** | Lambda (50+ concurrent) that handles a single file: S3 copy, MongoDB registration, metadata assembly |
| **Bulk Accumulator** | Lambda that collects processed records and submits them to Salesforce in bulk |
| **Status Sync** | Lambda that aggregates progress from DynamoDB and publishes Platform Events |
| **DLQ** | Dead Letter Queue — captures messages after 3 failed processing attempts |
| **Staging Bucket** | Temporary S3 bucket where files are uploaded before processing |
| **Production Bucket** | Existing ReconDMS S3 bucket — files are copied here after successful processing |
| **JWT Upload Link** | Time-limited token that authenticates the standalone web uploader |
