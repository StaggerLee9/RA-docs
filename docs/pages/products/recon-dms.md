---
layout: default
title: Recon DMS
description: Landing page for Recon Document Management System deployment guides covering AWS, SharePoint, and Salesforce.
parent: Products
has_children: true
nav_order: 4
nav_scope: recon-dms
nav_scope_title: Recon DMS
nav_scope_root: /pages/products/recon-dms/
---

# Recon DMS

Recon DMS unifies document capture, intelligent search, and compliant storage across Salesforce and external repositories. Administrators can orchestrate AWS Textract processing, manage SharePoint ingestion, and configure Salesforce experiences that keep knowledge workers inside the platform they already use.

> **Who should read this?**  
> - Cloud infrastructure engineers responsible for AWS resources  
> - Microsoft 365 / SharePoint administrators  
> - Salesforce administrators and technical architects  

## Explore the Documentation

- [Product Overview](recon-dms/overview)
- [AWS Deployment Overview](recon-dms/aws/)
- [Azure & SharePoint Setup](recon-dms/azure-sharepoint)
- [Salesforce Installation](recon-dms/salesforce-installation)
- [Salesforce Post-Installation](recon-dms/salesforce-post-install)
- [User Navigation Guide](recon-dms/user-guide)

## Deployment Order

1. **Provision AWS infrastructure** – buckets, Textract, Lambda, APIs, OpenSearch, MongoDB, and supporting services.
2. **Connect Azure/SharePoint** – register applications, configure permissions, and capture the endpoints needed by Salesforce.
3. **Configure Salesforce** – install the managed package, enable DMS custom settings, and publish the Lightning components.

## Success Criteria

- AWS Textract jobs complete successfully and index results in OpenSearch.
- SharePoint connector authenticates and retrieves document libraries (if enabled).
- Salesforce upload and search components render on target record pages with correct metadata.
- Notification thresholds control bell alerts for large file uploads.

## Need This Package?

- Confirm licensing for Recon DMS and any optional AI extensions.
- Align with your security team to provision AWS resources (GovCloud available if required).
- Coordinate with SharePoint administrators for tenant-level permissions.
- Plan a pilot object/page rollout before scaling to additional business units.

## Next Steps

Start with the [AWS Deployment Overview](recon-dms/aws/) and work through each guide in the sequence shown above.
