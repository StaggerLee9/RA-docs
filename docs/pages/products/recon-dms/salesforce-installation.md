---
layout: default
title: Salesforce Installation
description: Install the Recon DMS managed package and prepare the Salesforce org for configuration.
grand_parent: Products
parent: Recon DMS
nav_order: 3
has_toc: true
nav_scope: recon-dms
nav_scope_title: Recon DMS
nav_scope_root: /pages/products/recon-dms/
---

> **Audience**  
> Salesforce administrators and release engineers responsible for installing the Recon DMS managed package.

![image6.jpg](../../../assets/images/recon-dms/salesforce-install/image6.jpg)

Table of Contents

# ReconDMS installation guide

Choose Access Level:

- Go to your package installation link.

- Select the “Install for Admins Only” option to restrict access to administrators initially. This option should be chosen to ensure that the configuration section is

accessible only to admins, while the necessary permissions for end users are managed through permission sets.

Proceed with Installation:

- Click on the Install button and proceed.

![image4.jpg](../../../assets/images/recon-dms/salesforce-install/image4.jpg)

These permission sets are designed to give non-admin profile users access to the DMS features.

# Assign Permission Sets:

## Base Permissions :

- Go to Setup > Permission Sets in Salesforce.

- Locate the permission set named ReconDMS.

![image2.jpg](../../../assets/images/recon-dms/salesforce-install/image2.jpg)

### Manage Assignments:

- Open the ReconDMS permission set and click on Manage Assignments.

![image3.jpg](../../../assets/images/recon-dms/salesforce-install/image3.jpg)

- Select the users who need access to ReconDMS features, then click Save.

![image5.jpg](../../../assets/images/recon-dms/salesforce-install/image5.jpg)

This permission set would allow the end user to use the DMS features.

## Additional Permissions :

These additional permissions include access to the AWS batch job and AWS sync object so that users can see when the file was last synced with SharePoint and AWS.

To give access to the additional permissions sets, locate the permissions set named Recon DMS Additional Permissions and follow the same steps to assign permissions to the desired users.

![image1.jpg](../../../assets/images/recon-dms/salesforce-install/image1.jpg)

## Next Steps

After installation, follow the [Salesforce Post-Installation](salesforce-post-install) checklist to configure settings and permissions.
