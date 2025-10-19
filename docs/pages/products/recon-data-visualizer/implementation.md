---
layout: default
title: Implementation Checklist
grand_parent: Products
parent: Recon Data Visualizer
nav_order: 2
has_toc: true
nav_scope: recon-data-visualizer
nav_scope_title: Recon Data Visualizer
nav_scope_root: /pages/products/recon-data-visualizer/
---

# Implementation Checklist

Follow these steps to roll out Recon Data Visualizer in a new environment.

## 1. Install & Assign Access

1. Deploy the managed package (`ReconDV`) into the target org.
2. Assign the Visualizer Admin permission set (or equivalent) to admins who will configure graphs.
3. Ensure runtime users have read access to every object and field referenced in planned configurations.

## 2. Configure Base Graphs

1. Launch the **Visualizer Admin** tab.
2. Click **+ Add Config** and complete the wizard:
   - Select the base object (the record page hosting the visualizer).
   - Choose the junction object that links the base record to related nodes.
   - Select one or two node objects and assign attribute fields and colors.
3. Save the configuration and optionally enable **Auto-generate Configs** to scaffold matching detail and click configurations.

## 3. Define Detail & Click Configurations

1. For each node, add a **Detail Config** to control which related records appear in the detail pane.
2. Configure **Click Configs** (or use the auto-generated versions) so **Show in Visualizer** pivots the graph to additional relationship contexts.
3. Update list custom settings (`Visualizer_Click_Config__c`) with the labels and field API names you want surfaced on the detail panel.

## 4. Deploy the Runtime Component

1. Open Lightning App Builder for the base object’s record page.
2. Drag the **Recon Data Visualizer** component (`contactVisualizerV1Polished`) onto the layout.
3. Set the component properties:
   - **groupName** = `Group_Name__c` value from the base configuration.
   - **mainHeaderLabel** (optional) = custom title.
4. Activate the page and test with sample records.

## 5. Validate End-to-End

- Hover, click, and pivot nodes to confirm data loads as expected.
- Review platform event `Metadata_Event__e` entries for any in-flight metadata jobs.
- Iterate on metadata configuration until admin and business requirements are met.

## Promotion & Change Management

- **Source control** – Commit custom metadata and custom settings (included in `force-app`) so changes can be promoted through environments.
- **Automated deployments** – Run the supplied Apex tests (`VisualizerControllerTest`, `VisualizerAdminControllerTest`, `VisualizerMetadataServiceTest`, etc.) during CI/CD.
- **Named credentials** – Configure the connected app, auth provider, and named credential (see the [User Guide](../recon-data-visualizer-user-guide#9-enabling-metadata-operations-connected-app--named-credentials)). Re-authorize if metadata deletes begin to fail.
- **Event monitoring** – Subscribe to `/event/ReconDV__Metadata_Event__e` when processing bulk configuration changes to track progress and errors.

## Next Steps

- [Troubleshooting Guide](troubleshooting)
- [Admin & End-User Guide](../recon-data-visualizer-user-guide)
