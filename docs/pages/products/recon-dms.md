---
layout: default
title: Recon DMS
description: Landing page for Recon Document Management System deployment guides covering AWS, SharePoint, and Salesforce.
parent: Products
has_children: true
nav_order: 4
nav_scope: recon-dms
nav_scope_title: Recon DMS
---

# Recon DMS

Recon DMS unifies document capture, intelligent search, and compliant storage across Salesforce and external repositories. Administrators can orchestrate AWS or Azure cloud processing, manage optional SharePoint ingestion, and configure Salesforce experiences that keep knowledge workers inside the platform they already use.

> **Who should read this?**  
> - Cloud infrastructure engineers responsible for AWS or Azure resources  
> - Microsoft 365 / SharePoint administrators  
> - Salesforce administrators and technical architects  

## Explore the Documentation

- [Product Overview](recon-dms/overview)
- [User Navigation Guide](recon-dms/user-guide)
- [AWS Deployment Overview](recon-dms/aws/) — Host Recon DMS on AWS
- [Azure Deployment Overview](recon-dms/azure/) — Host Recon DMS on Azure
- [Azure AD & SharePoint Integration](recon-dms/azure-sharepoint) — Optional inline editing for Office files
- [Salesforce Installation](recon-dms/salesforce-installation)
- [Salesforce Post-Installation](recon-dms/salesforce-post-install)
- [Cloud OCR Inbound Integration](recon-dms/ocr-integration) — Wire Cloud OCR job results back into Recon DMS
- [DMS Migration](recon-dms/migration) — Bulk file migration from legacy systems

## Deployment Order

1. **Provision cloud infrastructure** – choose [AWS](recon-dms/aws/) or [Azure](recon-dms/azure/) as the host for Recon DMS, then run the deployment scripts for the chosen platform.
2. **(Optional) Connect Azure AD/SharePoint** – register applications, configure permissions, and capture the endpoints needed by Salesforce. Required only if you want inline editing for Office files.
3. **Configure Salesforce** – install the managed package, enable DMS custom settings, and publish the Lightning components.
4. **Wire up Cloud OCR** – configure the External Client Application, integration user, and permission set so OCR job results post back into Recon DMS.

## Success Criteria

- Cloud OCR jobs complete successfully and index results in the chosen platform's search service (OpenSearch on AWS, Azure AI Search on Azure).
- SharePoint connector authenticates and retrieves document libraries (if enabled).
- Salesforce upload and search components render on target record pages with correct metadata.
- Notification thresholds control bell alerts for large file uploads.

## Need This Package?

- Confirm licensing for Recon DMS and any optional AI extensions.
- Align with your security team to provision AWS or Azure resources (AWS GovCloud available if required).
- Coordinate with SharePoint administrators for tenant-level permissions.
- Plan a pilot object/page rollout before scaling to additional business units.

## Next Steps

Pick the cloud platform for your deployment — [AWS Deployment Overview](recon-dms/aws/) or [Azure Deployment Overview](recon-dms/azure/) — and work through each guide in the sequence shown above.
