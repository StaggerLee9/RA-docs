---
layout: default
title: Troubleshooting Guide
grand_parent: Products
parent: Recon Search
nav_order: 3
has_toc: true
nav_scope: recon-search
nav_scope_title: Recon Search
nav_scope_root: /pages/products/recon-search/
---

# Troubleshooting Guide

Use these tips to diagnose Recon Search issues.

## Component Does Not Render or Shows Blank Sections

- Confirm a `Recon_Search_Configuration__c` record exists for the object + record page combination.
- Verify the component properties (`objectApiName`, `recordPageName`) match the published configuration.
- Ensure the running user has field-level access to every field referenced in the configuration JSON.

## API Requests Failing

- Check the corresponding `API_Configuration__mdt` record:
  - Validate endpoint URL, request type, and authentication details.
  - Verify headers and query parameters are formatted as JSON key/value maps.
  - Confirm response mapping matches the shape of the payload returned by the provider.
- Use debug logs to inspect `APIRequestHandler.handleExternalCallout` for HTTP status codes and error messages.
- If OAuth credentials expire, reissue tokens or update the password/client secret.

## Layout Metadata Import Errors

- The admin console relies on the Metadata API. Make sure the admin running the process has **Modify All Data** or equivalent metadata access.
- If a layout was recently renamed, republish the configuration to update references.
- Clear the cached configuration using the **Reset** option in the console and re-import the layout.

## SWARM Alerts Not Triggering

- Confirm the SWARM record is **Active** and the frequency/start/end dates encompass the current date.
- Verify the scheduled job `SwarmThresholdCountBatchScheduler` is running (Setup → Scheduled Jobs).
- Check `SWARM_Instance_Record__c` entries for last-run timestamps and error messages.
- Inspect the **Send_Swarm_Notification** flow for paused or failed interviews.

## Search Results Missing Data

- For internal searches, ensure the users have read access to the related objects.
- For external results, confirm the response mapping populates `relatedObjectName`, `recordLink`, and other required fields expected by the Lightning datatable.
- Review validation logic in `OrgSearchHandler.validateChildRelations`—missing child relationships may prevent related list data from rendering.

## Need More Help?

- Review the [Admin & End-User Guide](../recon-search-user-guide) for screenshots and field-by-field descriptions.
- Capture debug logs for `PageLayoutHandler`, `APIRequestHandler`, and `SwarmThresholdCountBatch` when opening a support ticket.
