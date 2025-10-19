---
layout: default
title: API & Automation Services
description: Configure API Gateway, EventBridge schedules, SNS topics, and IAM roles that orchestrate Recon DMS processing.
grand_parent: Recon DMS
parent: AWS Deployment Overview
nav_order: 3
has_toc: true
nav_scope: recon-dms
nav_scope_title: Recon DMS
nav_scope_root: /pages/products/recon-dms/
---

# API & Automation Services

This module wires together the serverless components that coordinate Recon DMS batch processing, Textract notifications, and back-end APIs.

> **Audience**  
> AWS administrators familiar with API Gateway, EventBridge, SNS, and Lambda integrations.

## 1. Configure API Gateway

1. In **API Gateway → APIs → Create API**, create a REST API (Regional endpoint).  
2. Add two resources: `/` and `/{proxy+}`.  
3. For each resource, create an **ANY** method that uses **Lambda proxy integration** pointing to the Recon DMS API Lambda.  
4. Deploy the API (initial deployment), create a stage (e.g., `prod`), then redeploy to that stage.  
5. Record the invoke URL—it will be used in SNS subscriptions and Salesforce configuration.

### Verification

- Invoke the API endpoint (e.g., `GET https://<rest-api-id>.execute-api.../prod/health`) and ensure the Lambda responds.  
- Review CloudWatch logs for the API Lambda to confirm requests are received.

### Troubleshooting

| Issue | Resolution |
|-------|------------|
| API returns `403` or `404` | Confirm the `/` and `/{proxy+}` resources exist and methods are configured. Verify the stage deployment. |
| Lambda not triggered | Check the Lambda execution permissions; ensure the API Gateway role has `lambda:InvokeFunction`. |

## 2. Schedule Batch Jobs with EventBridge

Recon DMS uses two EventBridge Scheduler jobs: one to run batch processing and one to clean up completed jobs.

1. Open **EventBridge → Scheduler → Create schedule**.  
2. Name the schedule (e.g., `recon-batch-job`), choose **Recurring**, and set the cron expression `cron(30 0 * * ? *)` for 12:30 AM UTC (adjust as needed).  
3. Select **AWS Lambda Invoke** as the target and choose the Batch Job Lambda.  
4. Repeat for the delete job using a rate expression (e.g., `rate(2 hours)`) targeting the Delete Batch Job Lambda.

### Verification

- Run each schedule manually (`Actions → Run now`) and confirm the Lambda logs show execution.  
- Check the EventBridge schedule dashboard to ensure the state is `Enabled` and no failures are recorded.

### Troubleshooting

| Issue | Resolution |
|-------|------------|
| Schedule remains in `Disabled` state | Ensure you have the EventBridge Scheduler service-linked role created. Recreate the schedule if necessary. |
| Lambda invoked with stale environment variables | Verify the Lambda configuration after updating environment variables; redeploy if required. |

## 3. Configure SNS Topics & Roles

Create four SNS topics: `file-status-tracking`, `textract-chunk`, `textract-confirm`, `textract-result` (naming can be adjusted to match your conventions).

1. In **SNS → Topics**, create each topic as **Standard** type.  
2. Update the delivery policy to set the `contentType` to `application/json`.  
3. Record the topic ARNs.  
4. For each topic, create a subscription of type **HTTPS** pointing to the API Gateway invoke URL with the appropriate path:
   - `_v2/webhook/sns/tracking`
   - `_v2/webhook/sns/create-chunk`
   - `_v2/webhook/sns/confirm`
   - `_v2/webhook/sns/result`
5. Verify each subscription by locating the confirmation URL in the API Lambda CloudWatch logs and calling it.

### Textract Notification Role

Textract requires a role that can publish to the result topic:

1. **IAM → Roles → Create role**, choose **Textract** as the use case.  
2. Attach the default Textract policy, then add an inline policy allowing `sns:Publish` to the result topic ARN.  
3. Record the role ARN and use it in the Textract Lambda environment variables.

### Verification

- Publish a test message to each topic (`aws sns publish --topic-arn ... --message '{"test":true}'`) and confirm the API Lambda logs the event.  
- Use the Textract console to start a dummy job and ensure the confirmation topic receives the notification.

### Troubleshooting

| Issue | Resolution |
|-------|------------|
| SNS subscription stuck in `PendingConfirmation` | Confirm the API Lambda logs contain the confirmation URL and that the API endpoint is reachable. |
| Textract job fails to publish results | Verify the Textract role inline policy includes the exact SNS topic ARN. |

## 4. Set Environment Variables for Lambdas

Populate the environment variables captured during earlier modules:

- **Batch Job Lambda** – Mongo URI, SharePoint credentials (if applicable), S3 bucket names, OpenSearch connection info, index name, `IS_GOV_CLOUD`, etc.  
- **Textract Lambda** – SNS topic ARNs and role ARN.  
- **API Lambda** – API secrets, SharePoint app credentials, `PORT`, `AWS_REGION`, `BUCKET_NAME`, `MONGO_URI`, OpenSearch connection info.

Store sensitive values in AWS Secrets Manager or Parameter Store if your security policy requires it. Update the Lambda code to retrieve secrets as needed.

### Verification

- Re-run the API and Textract Lambda tests to confirm environment changes are recognized.  
- Check CloudWatch metrics for Lambda errors after setting new variables.

### Troubleshooting

| Issue | Resolution |
|-------|------------|
| Lambda fails with `KeyError` or missing environment variable | Double-check the variable names. Remember that Linux environment variable names are case sensitive. |
| Secrets Manager retrieval fails | Ensure the Lambda execution role has permission to `secretsmanager:GetSecretValue` or `ssm:GetParameter`. |

## Next Steps

If you operate in a commercial AWS region and require CDN delivery, continue to [CloudFront Distribution](cloudfront). Otherwise, skip ahead to [Resilience & Validation](resilience) to configure backups and end-to-end tests.
