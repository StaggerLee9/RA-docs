---
layout: default
title: Product Overview
grand_parent: Products
parent: Recon Data Visualizer
nav_order: 1
has_toc: true
nav_scope: recon-data-visualizer
nav_scope_title: Recon Data Visualizer
nav_scope_root: /pages/products/recon-data-visualizer/
---

# Product Overview

Recon Data Visualizer connects people, matters, and other records through D3-powered relationship graphs. Use this page to understand what ships with the managed package and how the metadata layer drives runtime behavior.

## Key Capabilities

- **Record-centric graphing** – Launch the `contactVisualizerV1Polished` Lightning web component from any Lightning page to render a relationship graph around the current record.
- **Metadata-driven nodes** – Configure which objects, fields, colors, and labels appear in the graph by updating custom metadata (`Visualizer_Object_Config__mdt`) and list custom settings (`Visualizer_Click_Config__c`).
- **Drill-through details** – Define click actions that expand node detail panels or pivot the graph without exposing raw SOQL to the client.
- **Admin console** – Use the `Visualizer Admin` Lightning tab to build, clone, or delete graph configurations with guided forms.
- **Security-aware runtime** – Apex controllers (`VisualizerController`, `VisualizerAdminController`) enforce CRUD/FLS via helper classes and `WITH SECURITY_ENFORCED` queries.
- **Event-driven metadata jobs** – Platform event `Metadata_Event__e` logs background operations (auto-generated configs, metadata updates) so admins can monitor long-running jobs.

## Solution Architecture

### Lightning Web Components
- `contactVisualizerV1Polished` – Runtime component that renders nodes, breadcrumbs, and hover cards after loading the `D3Zip` static resource.
- `visualizerAdmin` – Admin console that orchestrates configuration CRUD, metadata writes, and live previews.
- `visualizerConfigList` / `visualizerDetailConfigEditor` – Child components that drive the admin console table, accordions, and detail editors.

### Apex Services
- `VisualizerController` – Supplies graph data, click actions, and node detail payloads based on the metadata layer.
- `VisualizerAdminController` – Discovers objects/fields, auto-generates configurations, and persists updates through the Metadata API.
- `VisualizerMetadataService` & `VisualizerMetadataCallback` – Wrapper classes used during asynchronous metadata operations.
- `CRUDPermissionChecker` – Shared helper that validates CRUD/FLS before executing admin requests.

### Metadata & Data Stores
- **Custom metadata** `Visualizer_Object_Config__mdt` – Stores base, detail, and click configuration records. Critical fields include `Group_Name__c`, `Parent_Object_API_Names__c`, and the `First/Second_Object_*` attribute mappings.
- **List custom setting** `Visualizer_Click_Config__c` – Drives detail panel labels and fields when users launch **Show in Visualizer**.
- **Platform event** `Metadata_Event__e` – Emits status updates (`Job_Status__c`, `Job_Description__c`, `Job_Id__c`) for long-running metadata operations.
- **Static resource** `D3Zip` – Bundled D3 library used by both the admin and runtime components.
- **Custom tab** `Visualizer_Admin` – Surfaces the admin console inside Salesforce.

## Related Resources

- [Implementation Checklist](implementation)
- [Troubleshooting Guide](troubleshooting)
- [Admin & End-User Guide](../recon-data-visualizer-user-guide)
