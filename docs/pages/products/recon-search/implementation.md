---
layout: default
title: Implementation Checklist
grand_parent: Products
parent: Recon Search
nav_order: 2
has_toc: true
nav_scope: recon-search
nav_scope_title: Recon Search
nav_scope_root: /pages/products/recon-search/
---

# Implementation Checklist

Follow the steps below to deploy Recon Search in a new environment.

## 1. Install & Provision Access

1. Install the managed package (`Recon Search`, namespace `RSearch`).
2. Assign the **Recon Search Admin** permission set to administrators who will manage configurations.
3. Grant runtime users access to the Recon Search Lightning components and to the objects that will appear in search results.

## 2. Configure External APIs

1. Navigate to **Custom Metadata Types → API Configurations**.
2. Create a record for each external data provider and populate:
   - **Endpoint URL / Token URL / Request Type / Response Type**
   - **Authentication credentials** (username/password, client ID/secret, API key)
   - **Request Params Mapping** and **Response Structure Mapping** to align external fields with Salesforce fields.
3. Optional: specify **Headers**, **Query Params**, and **Fields to Query** for the remote system.
4. Mark **Is Metadata Available** when the provider supports schema discovery through the Recon console.

## 3. Build a Recon Search Configuration

1. Open the Recon Search console (Lightning App → Recon Search).
2. Choose the Salesforce object and Lightning record page you want to extend.
3. Import the page layout metadata and select:
   - Field sections to expose in the search form
   - Related list sections to display alongside search results
   - Placement of dynamic sections (top or bottom of the related list area)
4. Save the configuration. Records are stored in `Recon_Search_Configuration__c`.
5. Publish the configuration once satisfied so runtime components read the latest layout.

## 4. Save Search Templates & SWARM Alerts

1. Run a sample search and use **Save Criteria** to create `Recon_Saved_Criteria__c` templates.
2. Launch the SWARM modal to configure alert thresholds (`SWARM__c` records):
   - Select the saved criteria to monitor
   - Define frequency, start/end date, and alert thresholds
   - Choose notification mode (Salesforce notification, email, etc.)
3. Activate the scheduled batch (`SwarmThresholdCountBatchScheduler`) if it is not already running. The scheduler invokes `SwarmThresholdCountBatch`, which triggers the **Send_Swarm_Notification** flow when thresholds are met.

## 5. Place the Component on Record Pages

1. Open Lightning App Builder for the target object’s record page.
2. Add the **Recon Search** component (`reconSearch`) wherever you want the console to appear.
3. Set component properties:
   - **Object API Name** – Salesforce object being searched.
   - **Record Page Name** – Lightning record page API name (aligns with the configuration you published).
   - Optional saved criteria preload settings.
4. Save and activate the Lightning page.

## 6. Validate the Experience

- Run searches against internal Salesforce data to confirm fields/related lists render correctly.
- Test external search by executing and reviewing the mapped results.
- Verify SWARM notifications after the batch job runs.
- Adjust API configuration or layout selection as needed.

## Promotion & Change Management

- Store custom metadata (API configurations) and custom object records (Recon Search Configurations, Saved Criteria, SWARMs) in source control or deployment scripts.
- Include Apex tests (PageLayoutHandlerTest, OrgSearchHandlerTest, APIRequestHandlerTest, SwarmThresholdCountBatchTest, etc.) in CI/CD pipelines.
- Document any Named Credential or integration secrets separately; these values are typically org-specific and should be injected during deployment.

## Related Assets

- [Product Overview](./overview)
- [Troubleshooting Guide](./troubleshooting)
- [Admin & End-User Guide](../recon-search-user-guide)
