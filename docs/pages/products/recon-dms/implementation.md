---
layout: default
title: Implementation Checklist
description: High-level deployment sequence for Recon DMS across AWS, SharePoint, and Salesforce.
grand_parent: Products
parent: Recon DMS
nav_order: 6
has_toc: true
nav_scope: recon-dms
nav_scope_title: Recon DMS
nav_scope_root: /pages/products/recon-dms/
---

# Implementation Checklist

> **Audience**  
> Program managers and lead administrators coordinating the Recon DMS rollout.

Follow these stages to deploy Recon DMS across AWS, SharePoint, and Salesforce. Each stage references a dedicated guide with detailed steps and screenshots.

## 1. Provision AWS Infrastructure

- Complete the tasks in the [AWS Deployment Overview](aws/) to build the foundational services (S3, Textract, Lambda, OpenSearch, EC2/MongoDB, EventBridge, SNS, and optional CloudFront/Backup).
- Capture output values such as bucket names, API Gateway URLs, Lambda ARNs, OpenSearch endpoints, and MongoDB connection details for later Salesforce configuration.

## 2. Configure Azure & SharePoint (Optional but Recommended)

- Follow the [Azure & SharePoint Setup](azure-sharepoint) instructions to register applications, grant API permissions, and expose the endpoints Recon DMS uses for SharePoint document access.
- Record client IDs, tenant IDs, secrets, and callback URLs.

## 3. Install and Configure Salesforce

- Install the managed package using the [Salesforce Installation](salesforce-installation) guide.
- Apply the post-install settings, custom metadata, permission sets, and notification thresholds from the [Salesforce Post-Installation](salesforce-post-install) guide.
- Update custom settings with the AWS and SharePoint values collected in steps 1 and 2.

## 4. Validate End-to-End

- Use the [User Navigation Guide](user-guide) to walk through upload, processing, and search workflows.
- Confirm Textract jobs complete and results appear in OpenSearch-driven search panels.
- Test SharePoint document retrieval if enabled.

## 5. Operational Readiness

- Establish monitoring dashboards (S3, Lambda, OpenSearch, Salesforce error logs).
- Schedule backup jobs (AWS Backup, MongoDB snapshots, Salesforce data exports).
- Document incident response contacts for each environment.
