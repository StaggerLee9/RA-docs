---
layout: default
title: AWS Deployment Overview
description: Orientation page for Recon DMS AWS modules, including required skills, artifacts, and links to detailed setup guides.
grand_parent: Products
parent: Recon DMS
has_children: true
nav_order: 1
has_toc: true
nav_scope: recon-dms
nav_scope_title: Recon DMS
nav_scope_root: /pages/products/recon-dms/
---

# AWS Deployment Overview

Recon DMS relies on a collection of AWS services to process documents, run Textract jobs, and expose search results. This section breaks the setup into focused modules so each specialist can work independently and verify progress before handing off to the next team.

> **Audience**  
> AWS administrators, DevOps engineers, and solution architects who provision cloud infrastructure for Recon DMS.

## Before You Begin

- Confirm you have access to an AWS account (commercial or GovCloud) with permission to create IAM roles, S3 buckets, Textract jobs, Lambda functions, OpenSearch domains, and supporting services.
- Install the [AWS CLI](https://aws.amazon.com/cli/) and [Docker Desktop](https://www.docker.com/products/docker-desktop) on the workstation that will push container images to ECR.
- Collect any TLS certificates or domain names required for secure MongoDB access.

## Module Sequence

1. **[Account & IAM Foundations](account-setup)**  
   Create the AWS account structure, IAM roles, and access keys that underpin all subsequent modules.
2. **[Storage & Processing Services](storage-processing)**  
   Provision S3, Textract, Lambda, and ECR resources responsible for document ingestion and OCR processing.
3. **[Search & Metadata Services](search-metadata)**  
   Deploy OpenSearch, MongoDB on EC2, and related configuration that powers Recon DMS search experiences.
4. **[API & Automation Services](integration-automation)**  
   Configure API Gateway, EventBridge schedules, SNS topics, and environment variables used by the Lambda functions.
5. **[CloudFront Distribution (Optional)](cloudfront)**  
   Only for non-GovCloud deployments that require CDN delivery of document content.
6. **[Resilience & Validation](resilience)**  
   Enable AWS Backup, create Textract notification roles, and perform end-to-end smoke tests before handing off to the Salesforce team.

Each module includes:

- **Setup Steps** – Condensed instructions aligned with the Recon DMS AWS Setup V2 guide.
- **Verification Checklist** – Quick tests to confirm the infrastructure behaves as expected.
- **Troubleshooting Tips** – Common configuration issues and where to look for diagnostic logs.

## Deliverables Checklist

| Module | Key Outputs |
|--------|-------------|
| Account & IAM Foundations | IAM roles for Recon DMS, CLI workstation configured, ECR access established |
| Storage & Processing | Versioned S3 buckets, Textract execution roles, Lambda functions deployed with container images |
| Search & Metadata | OpenSearch domain with Recon index, MongoDB instance with admin and application users |
| API & Automation | API Gateway endpoints, EventBridge schedules, SNS topics wired to API Lambda |
| CloudFront (optional) | Distribution ID, trusted key group, WAF rules, signed URL workflow |
| Resilience & Validation | AWS Backup plan, Textract notification role, smoke-test results documented |

## Next Steps

Start with [Account & IAM Foundations](account-setup) and work through each module in order. After finishing the final module, continue with the [Azure & SharePoint Setup](../azure-sharepoint) or proceed directly to the Salesforce installation if SharePoint is not in scope.
