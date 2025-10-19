---
layout: default
title: Troubleshooting Guide
grand_parent: Products
parent: Recon Data Visualizer
nav_order: 3
has_toc: true
nav_scope: recon-data-visualizer
nav_scope_title: Recon Data Visualizer
nav_scope_root: /pages/products/recon-data-visualizer/
---

# Troubleshooting Guide

Use this checklist to diagnose common Recon Data Visualizer issues.

## Component Appears Blank

- Confirm the component’s **groupName** property matches the `Group_Name__c` value from a Base Config.
- Verify the running user has read access to every object and field referenced in the Base/Detail/Click configurations.
- Check browser console logs for Apex errors (missing CRUD/FLS permissions will appear here).

## “Configuration Not Available for This Node”

- Ensure a `Visualizer_Click_Config__c` record exists for the node’s setting group.
- Confirm comma-separated field lists (e.g., `Target_Field_API_Name_List__c`) end with a comma—the Apex controller trims trailing commas before building SOQL.
- Refresh metadata (or re-generate configs) if the event object API name recently changed.

## Metadata Deletes Failing

- Re-run the Named Credential authorization flow:
  1. Navigate to **Setup → Named Credentials**.
  2. Edit `Recon_Visualizer_Metadata_API`.
  3. Click **Save** and complete the login flow.
- Verify the connected app is configured with the correct OAuth scopes (`full refresh_token offline_access`).

## Detail Panel Shows Wrong Fields

- Edit the relevant Detail Config and adjust the **Field To Show On UI** list.
- Toggle the **Show on UI** flag only for the fields that should appear in the detail pane.
- If values appear blank, confirm the detail object stores data for those fields (and that the user has visibility).

## Performance & Scalability

- Limit each configuration group to the attributes necessary for the business process.
- Avoid auto-generating configurations for rarely used relationships—manual configs keep the UI focused.
- Use reporting/dashboards for bulk analysis; visualizer graphs are intended for interactive exploration.

## Need More Help?

- Review the [Admin & End-User Guide](../recon-data-visualizer-user-guide) for step-by-step walkthroughs.
- Capture platform event `Metadata_Event__e` logs when reporting issues to the Recon support team.
