---
layout: default
title: Product Overview
grand_parent: Products
parent: Recon Search
nav_order: 1
has_toc: true
nav_scope: recon-search
nav_scope_title: Recon Search
nav_scope_root: /pages/products/recon-search/
---

# Product Overview

Recon Search transforms standard Salesforce page layouts into intuitive, high-powered search workspaces. Users can run sophisticated searches without leaving the record context, while admins retain the ability to tailor the experience with metadata-driven controls.

## Why Recon Search

- **Sophisticated Search Capabilities** – Run advanced queries against the fields and related lists defined on any Lightning record page.
- **Unified View** – Present native Salesforce data and external results in one consolidated interface.
- **SWARM Monitoring** – Save criteria, schedule alerts, and receive automatic notifications when new records match saved searches.
- **Security Compliance** – Honors Salesforce’s sharing model and CRUD/FLS while delivering real-time, dynamic search results.

## Business Benefits

- **Increased Productivity** – Teams retrieve data faster and stay within their familiar workspace.
- **Enhanced Data Management** – Strategic, metadata-driven configuration helps users explore data with confidence.
- **Real-Time Awareness** – SWARM notifications keep stakeholders informed as new matches appear.

Recon Search achieves these outcomes through a blend of Lightning web components, Apex services, and scheduled jobs. The managed package ships with the following building blocks:

## Core Lightning Components

| Component | Purpose |
|-----------|---------|
| `reconSearch` | Main console used to configure layouts, run searches, and review results. Supports saving criteria and launching SWARM alerts. |
| `reconDynamicSearch`, `reconSearchField`, `reconSearchRelatedListField`, `reconSearchRelatedListLabel` | Dynamic inputs that mirror fields and related lists from the selected Lightning record page. |
| `reconSearchTabCmp` / `reconSearchHeader` | Provide the shell UI for the Recon Search workspace and tab layout. |
| `createConfigurationScreen` | Admin wizard for defining API connections and mapping response structures. |

## Apex Services

| Apex Class | Responsibility |
|------------|---------------|
| `PageLayoutHandler` | Uses the Metadata API to fetch Lightning page layouts, generate configuration JSON, publish updates, and determine where dynamic sections appear. |
| `OrgSearchHandler` | Runs SOQL searches, validates child relationships, and prepares records for the UI. |
| `APIRequestHandler` | Orchestrates external REST calls based on `API_Configuration__mdt`, including token generation and response mapping. |
| `ReconStoreCriteriaHandler` | Saves and retrieves search templates (`Recon_Saved_Criteria__c`) and SWARM definitions. |
| `APIConfigurationHandler` & helpers (`MetadataAPI`, `ToolingAPI`, `ZipUtil`, etc.) | Persist configuration metadata and interact with Salesforce APIs on behalf of the admin console. |
| `SwarmThresholdCountBatch` & Scheduler | Monitor SWARM alerts and queue `Send_Swarm_Notification` flow runs when thresholds are met. |

## Data Model Highlights

- **API_Configuration__mdt** – Custom metadata records that describe each external data provider (endpoint URL, authentication method, headers, query params, and response mapping).
- **Recon_Search_Configuration__c** – Stores page-level configuration JSON, selected node objects, and placement of dynamic sections within Lightning record pages.
- **Recon_Saved_Criteria__c** – Template records that capture saved filters/criteria for users to re-run searches quickly.
- **SWARM__c / SWARM_Instance_Record__c** – Track alert thresholds, frequencies, and last-run state for automated monitoring.
- **Notification Type** `Swarm_Threshold` – Enables Salesforce Notifications when SWARM criteria are met.

## End-User Experience

1. Users open a Lightning record page that contains the Recon Search component.
2. The component renders a configurable search form, optional dynamic sections (fields or related lists), and buttons to execute internal or external searches.
3. Results show as cards grouped by object type, with quick links to open records or launch SWARM alerts.
4. Saved templates and SWARM definitions allow repeatable monitoring without rebuilding criteria.

## Admin Console Journey

1. Select a Salesforce object and Lightning record page.
2. Import the layout metadata and choose which sections/fields appear in the search UI.
3. Map external API requests and responses to Salesforce fields.
4. Publish the configuration so runtime components use the latest layout + integration settings.

## Related Assets

- [Implementation Checklist](./implementation)
- [Troubleshooting Guide](./troubleshooting)
- [Admin & End-User Guide](../recon-search-user-guide)
