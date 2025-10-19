---
layout: default
title: Troubleshooting Guide
description: Quick reference for diagnosing Recon DMS issues across AWS, SharePoint, and Salesforce.
grand_parent: Products
parent: Recon DMS
nav_order: 7
has_toc: true
nav_scope: recon-dms
nav_scope_title: Recon DMS
nav_scope_root: /pages/products/recon-dms/
---

# Troubleshooting Guide

> **Audience**  
> Support engineers and administrators triaging Recon DMS incidents.

Use the checklist below to diagnose the most common Recon DMS issues. Reference the supporting guides for deeper context.

## AWS Processing Issues

- **Textract jobs never complete** – Validate Lambda execution roles, Textract service limits, and EventBridge schedules. Check the Textract job IDs in CloudWatch logs.
- **OpenSearch returns no results** – Confirm the indexing Lambda has access to the OpenSearch domain and that the index exists. Re-run the job manually using the AWS Deployment script.
- **MongoDB connection failures** – Ensure the EC2 security group allows inbound traffic from Lambda or API Gateway. Verify TLS certificates if using a custom domain.

## SharePoint Integration Problems

- **Authentication errors** – Reconfirm Azure app registration secrets, redirect URIs, and API scopes. Refresh expired secrets and update corresponding Salesforce custom settings.
- **Missing Document Libraries** – Confirm the SharePoint site ID and drive ID are correct. Use Microsoft Graph Explorer to validate access with the configured credentials.

## Salesforce Upload & Notification Issues

- **Uploads fail or stall** – Check the S3 bucket name and IAM credentials stored in `DMS_Config__c`. Review Apex debug logs for the upload component.
- **Notifications fire for every file** – Adjust the `Notification_Threshold_Size_MB__c` setting (see [Salesforce Post-Installation](salesforce-post-install)). Ensure the threshold is greater than zero to limit alerts to large files.
- **Lightning components missing** – Confirm the Recon DMS app builder components are added to the Lightning record pages and that users have the Recon DMS permission set.

## Search Experience Problems

- **No Textract results** – Verify the Textract output files exist in the processed S3 bucket and that the indexing Lambda successfully published to OpenSearch.
- **SharePoint content invisible** – Ensure SharePoint configuration values are populated and that the Apex integration user has access to the target site/drive.

## Support Checklist

Gather the following details before escalating to engineering:

- Salesforce org ID and affected record IDs
- AWS account ID, relevant Lambda logs, and Textract job IDs
- SharePoint tenant and application IDs (if applicable)
- Package version and timestamp of the last successful processing cycle

## Next Steps

Return to the [Implementation Checklist](implementation) to confirm all deployment milestones are complete.
