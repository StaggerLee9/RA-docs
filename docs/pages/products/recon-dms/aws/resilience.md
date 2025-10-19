---
layout: default
title: Resilience & Validation
description: Configure AWS Backup, create authentication users, and run smoke tests before handing off to Salesforce.
grand_parent: Recon DMS
parent: AWS Deployment Overview
nav_order: 5
has_toc: true
nav_scope: recon-dms
nav_scope_title: Recon DMS
nav_scope_root: /pages/products/recon-dms/
---

# Resilience & Validation

This final module hardens the deployment with backup policies and confirms that the Recon DMS API is operational before moving to the SharePoint or Salesforce stages.

> **Audience**  
> AWS administrators and Recon DMS technical leads responsible for operational readiness.

## 1. Configure AWS Backup

Create separate backup vaults and plans for S3 and EC2 (MongoDB) resources:

1. **Backup vaults** – Create `s3-backup-vault` and `ec2-backup-vault` with default AWS-managed keys (or custom KMS keys if required).  
2. **Backup plans** – Build a plan (e.g., Daily-Monthly-1yr) with retention and lifecycle rules.  
3. **Assign resources** – Attach the primary/processed S3 buckets and the MongoDB EC2 instance to the plan.  
4. **Permissions** – Ensure the AWS Backup service role includes the managed policy `AWSBackupServiceRolePolicyForBackup`.

### Verification

- Check **AWS Backup → Backup jobs** to confirm successful backup runs.  
- Perform a periodic restore test (e.g., restore an EC2 snapshot to a temporary instance).  
- Configure SNS notifications or CloudWatch alarms for backup failures.

### Troubleshooting

| Issue | Resolution |
|-------|------------|
| Backups fail with `AccessDenied` | Confirm the backup role has permissions to the S3 bucket and EC2 instance, including KMS keys if used. |
| Restores unavailable for S3 | Ensure the plan includes S3 resources and that versioning is enabled on the bucket. |

## 2. Verify API & Create Authentication User

1. Open the API Gateway invoke URL (without `{proxy+}`) in a browser, append `/_v2`, and confirm the welcome message appears.  
2. Use Postman or curl to call `POST /api/user/create` with the payload:
   ```json
   {
     "accesskey": "<AWS_ACCESS_KEY>",
     "region": "<aws-region>",
     "mongoUri": "mongodb://reconUser:password@host:27017/ReconDMSMongoDB",
     "baseUrl": "https://<api-id>.execute-api.<region>.amazonaws.com/prod/_v2"
   }
   ```  
   Save the returned user ID and token securely—they will be required in the Salesforce configuration.

### Verification

- Confirm CloudWatch logs show the API Lambda handling the request without error.  
- Use the credentials to authenticate against the `/api/auth/login` endpoint to ensure they are valid.

### Troubleshooting

| Issue | Resolution |
|-------|------------|
| API returns `401` | Ensure the request body matches the expected schema and that the access key/secret correspond to an IAM user with S3/Textract permissions. |
| Request times out | Verify the API Lambda can reach MongoDB and that security groups permit traffic. |

## 3. Smoke Test the End-to-End Flow

Run a quick integration test to ensure all services communicate correctly:

1. Upload a sample document through the API Lambda (or Salesforce if available).  
2. Confirm the file lands in the primary S3 bucket and that Textract jobs start automatically.  
3. Monitor SNS topics to verify job status updates.  
4. After processing, query OpenSearch for the document text and check MongoDB for the metadata record.  
5. Review CloudWatch dashboards for errors or throttling.

Document the results and share them with the Salesforce admin before moving on.

## Next Steps

- If SharePoint integration is in scope, proceed to the [Azure & SharePoint Setup](../azure-sharepoint).  
- Otherwise, hand off to the Salesforce team to continue with the [Salesforce Installation](../salesforce-installation) guide.
