---
layout: default
title: Storage & Processing Services
description: Configure S3, Textract, Lambda, and ECR resources for Recon DMS document processing.
grand_parent: Recon DMS
parent: AWS Deployment Overview
nav_order: 1
has_toc: true
nav_scope: recon-dms
nav_scope_title: Recon DMS
nav_scope_root: /pages/products/recon-dms/
---

# Storage & Processing Services

This module provisions the buckets, execution roles, container images, and Lambda functions that drive Recon DMS ingestion and OCR processing.

> **Audience**  
> AWS administrators responsible for storage services and serverless compute.

## 1. Create Versioned S3 Buckets

Recon DMS requires at least two S3 buckets:

1. **Primary file bucket** – receives uploads from Salesforce.  
2. **Processed output bucket** – stores Textract JSON results and intermediate artifacts.

Recommended settings for each bucket:

- Region: US East (N. Virginia) or US West (Oregon).  
- Block all public access.  
- Enable versioning.  
- Apply default encryption (SSE-S3 or KMS).  
- Add the CORS rules provided in the Recon DMS implementation document.

### Verification

- Upload a test object via the console and confirm it appears in the bucket and version history.  
- Run `aws s3api get-bucket-cors --bucket <bucket-name>` to confirm the CORS rules are in place.

### Troubleshooting

| Issue | Resolution |
|-------|------------|
| Uploads fail with `AccessDenied` from Salesforce | Confirm the IAM role used by the upload component has `s3:PutObject` permission for the bucket ARN. |
| CORS errors during browser upload | Reapply the CORS configuration and verify the allowed headers include `Authorization`. |

## 2. Populate Amazon ECR Repositories

Recon DMS ships container images for each Lambda function. Create the repositories and push the images provided by Recon support.

1. In **ECR → Repositories**, create the following (case sensitive): `batch-job`, `delete-batch-job`, `express-server`, `production-api`, `search`, `textract`.  
2. Retrieve the push commands for each repository (`View push commands`).  
3. Use `aws ecr get-login-password` to authenticate Docker.  
4. Tag the provided images and push them to the matching repository.

### Verification

- Run `aws ecr list-images --repository-name textract` (replace with each repo) and confirm the expected tags show `AVAILABLE`.  
- Optional: pull the image back from ECR to ensure authentication works.

### Troubleshooting

| Issue | Resolution |
|-------|------------|
| Docker push fails with permission error | Verify the CLI profile has `ecr:BatchCheckLayerAvailability` and `ecr:PutImage` permissions and that cross-account sharing is in place. |
| Incorrect image tag deployed | Delete the tag via the ECR console and push again with the correct tag (e.g., `latest`). |

## 3. Deploy Lambda Functions

Deploy the six Lambda functions using the container images you pushed to ECR:

1. In **Lambda → Create function → Container image**, specify the function name and the corresponding ECR image URI.  
2. Choose an execution role with permissions to access S3, Textract, OpenSearch, SNS, and other required services (see IAM policy reference).  
3. Set the timeout to at least 15 minutes for long-running jobs (Textract batch).  
4. For the API Lambda, ensure the handler listens on port `3000` (matching the container configuration).

### Required Environment Variables

Populate environment variables in each Lambda after deployment. Examples include:

**Batch Job Lambda**

- `MONGO_URI`, `CLIENT_ID`, `CLIENT_SECRET`, `LOGIN_URI`  
- `BUCKET_NAME`, `OS_NODE`, `OS_USERNAME`, `OS_PASSWORD`, `INDEX`  
- `IS_GOV_CLOUD`, `BATCH_SIZE`

**Textract Lambda**

- `SNS_TOPIC_ARN_*` values for tracking, confirmation, chunk handling, and results  
- `SNS_ROLE_ARN`

**API Lambda**

- `PORT` (3000), `AWS_REGION`, `MONGO_URI`, `BUCKET_NAME`  
- SharePoint variables (`CLIENT_ID`, `CLIENT_SECRET`, `LOGIN_URI`, etc.) if the connector is in use

> **Checklist**  
> Maintain a secure document (e.g., AWS Secrets Manager or password vault) with all environment variable values for future maintenance.

### Verification

- Invoke the API Lambda via the test console and confirm it returns a health message (e.g., `200 OK`).  
- Trigger the Textract Lambda with a sample payload to confirm it publishes events to SNS.  
- Review CloudWatch logs for each function to ensure they initialize without errors.

### Troubleshooting

| Issue | Resolution |
|-------|------------|
| Lambda cannot access S3 or Textract | Update the execution role to include `s3:*` (bucket scoped) and `textract:StartDocumentTextDetection` permissions. |
| API Lambda returns `Timeout` | Increase the function timeout or investigate network access to MongoDB/OpenSearch. |
| Environment variable typo causes runtime error | Use CloudWatch logs to identify the missing variable and update via the console or CLI (`aws lambda update-function-configuration`). |

## Next Steps

Proceed to [Search & Metadata Services](search-metadata) to configure OpenSearch and the MongoDB database that power Recon DMS search capabilities.
