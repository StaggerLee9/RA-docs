---
layout: default
title: Product Overview
description: Architectural summary and capability highlights for Recon DMS.
grand_parent: Products
parent: Recon DMS
nav_order: 0
has_toc: true
nav_scope: recon-dms
nav_scope_title: Recon DMS
nav_scope_root: /pages/products/recon-dms/
---

# Product Overview

Recon DMS bridges Salesforce with enterprise content repositories so teams can capture, classify, and search documents without leaving their daily workspace. The solution blends Salesforce metadata, AWS Textract services, and (optionally) SharePoint to deliver compliant document processing at scale.

> **Tip**  
> Share this page with stakeholders and project sponsors for a concise summary of Recon DMS benefits, architecture, and responsibilities across teams.

## Core Capabilities

- **Document Capture & Metadata** – Upload single or multi-part files, enrich them with business metadata, and control retention/replace operations.
- **Intelligent Extraction** – Invoke AWS Textract to OCR PDFs and images, normalize DOCX uploads, and index results for downstream search.
- **Unified Search Experience** – Surface Textract results, record metadata, and optional SharePoint content inside Lightning record pages.
- **Notifications & Monitoring** – Use configurable thresholds to determine which uploads trigger bell notifications and capture detailed audit logs.
- **Extensible Connectors** – Optional SharePoint/Azure integration and AI Text Search extension for natural-language queries.

## Application Architecture

| Layer | Responsibilities |
|-------|------------------|
| **Salesforce Managed Package** | Apex services for upload orchestration, metadata storage (`DMS_Configs__c`), notification delivery, and Lightning Web Components for capture/search experiences. |
| **AWS Services** | S3 for storage, Textract for OCR, Lambda for job orchestration, EventBridge for scheduling, SNS for alerts, OpenSearch for indexed search, EC2-hosted MongoDB for metadata, ECR for Docker images, CloudFront for secured distribution, and AWS Backup for resilience. |
| **Optional SharePoint Connector** | Azure AD application registrations, Microsoft Graph permissions, and endpoints used by Apex services to ingest or reference SharePoint documents. |

The [AWS Deployment Overview](aws/) and [Azure & SharePoint Setup](azure-sharepoint) pages detail the infrastructure behind these layers.

## Key Salesforce Components

- **Objects** – `Recon_Document__c`, `DMS_Config__c`, auxiliary objects for tracking Textract jobs and SharePoint references.
- **Lightning Web Components** – Upload workspace, search console, configuration UI, and administrative panels.
- **Apex Services** – Upload controllers, Textract job handlers, notification utilities, SharePoint REST clients, and orchestration helpers.

Refer to the code overview documents for a class-by-class breakdown when debugging or extending the managed package.

## Deployment Roles

- **AWS Administrator** – Provisions infrastructure, manages credentials, and monitors S3/Textract/OpenSearch workloads.
- **SharePoint/Azure Administrator** – Configures tenant permissions, application registrations, and API scopes for document synchronization.
- **Salesforce Administrator** – Installs the managed package, assigns permissions, configures settings, and publishes Lightning experiences.

The remaining pages provide step-by-step instructions for each role to complete a successful rollout.

## Next Steps

- Build infrastructure: [AWS Deployment Overview](aws/)
- Configure repository integration: [Azure & SharePoint Setup](azure-sharepoint)
- Enable end-user experiences: [Salesforce Installation](salesforce-installation) and [Post-Installation](salesforce-post-install)
