---
layout: default
title: Recon Data Visualizer User Guide
grand_parent: Products
parent: Recon Data Visualizer
nav_order: 4
has_toc: true
nav_scope: recon-data-visualizer
nav_scope_title: Recon Data Visualizer
nav_scope_root: /pages/products/recon-data-visualizer/
---

# Recon Data Visualizer

Salesforce User Guide

## Version 2.0

![Image 3](../../assets/images/recon-data-visualizer/image1.png)


# About Recon Visualizer

The Recon Visualizer application enables users to display and explore relationships between Salesforce records through advanced data visualization. This application provides comprehensive tools for viewing connections between parent and child records, with the ability to display additional record attributes through interactive node exploration.

The application features streamlined record navigation, allowing users to traverse relationships with minimal clicks. This eliminates the need to manually access individual records and review related lists, providing instant visualization of parent-child relationships based on customized configuration settings.

# Component Overview

## Visualizer Admin

![Image 4](../../assets/images/recon-data-visualizer/image2.jpeg)
This administrative component enables configuration management for new objects, providing both basic and detailed views for comprehensive setup control.

### Detail View

![Image 5](../../assets/images/recon-data-visualizer/image3.png)

## Data Visualizer

This component renders relationship visualizations according to established configurations. The example below demonstrates the relationship mapping between Contact and Matter objects.

![Image 6](../../assets/images/recon-data-visualizer/image4.jpeg)

# Configuration Types

The system supports three distinct configuration levels for visualizer setup:

## Basic Configuration (Required)
The foundational configuration establishes the initial parameters for object visualization and defines the relationship structure between nodes.

## Detail Configuration (Optional)
This configuration level enables detailed information display for selected nodes. Upon node selection, the system retrieves and displays related details in the dedicated detail panel.

## Click Configuration (Optional)
This advanced configuration requires prior Detail Configuration setup. It enables the "Show in Visualizer" functionality, which dynamically updates the visualization when activated to display new record relationships.

For accessing object details, utilize the action button associated with each record and select "Show Details" from the menu to display comprehensive object information.

# Setup Instructions

This section demonstrates the configuration process for visualizing Matter-Contact relationships, where a single contact may be associated with multiple matters.

## Initial Setup

![Image 7](../../assets/images/recon-data-visualizer/image5.jpeg)
1. Navigate to the App Launcher and search for "Visualizer Admin"

![Image 8](../../assets/images/recon-data-visualizer/image6.png)
2. Select the "+ Add Config" button in the top-right corner to initiate a new configuration

## Configuration Parameters

The configuration interface dynamically displays relevant fields based on your selections. Key parameters include:

### Configuration Label
A descriptive identifier that appears in the list view for easy reference.

### Select Base Object
Choose the primary object for visualization configuration. For example, selecting "Contact" enables matter relationship visualization for contacts.

![Image 9](../../assets/images/recon-data-visualizer/image7.jpeg)

### Additional Fields

- **Config Name**: A unique identifier without spaces or special characters (underscores permitted)
- **Config Type**: Auto-populated field indicating the current configuration type
- **Select Junction Object**: Displays all objects with lookup or master-detail relationships to the base object
- **Select Node Objects**: Select one or more options to define which nodes appear with details in the visualization

## Advanced Configuration

![Image 10](../../assets/images/recon-data-visualizer/image8.png)

After completing initial setup, proceed to the advanced configuration screen containing three sections:

![Image 11](../../assets/images/recon-data-visualizer/image9.jpeg)

### Primary Object Configuration
Define parameters for the primary object or child nodes. Configure up to three attributes from either junction or current objects.

### Secondary Object Configuration
Configure the secondary or base object with field selections from junction or current objects.

### Visualizer Preview
Displays a configuration preview with field names that will be replaced with actual record values in production.

## Field Selection Process

1. Select node colors for visual differentiation
2. Configure empty attributes using the "Find" button adjacent to each field
3. In the dialog, select the appropriate object and corresponding field

![Image 12](../../assets/images/recon-data-visualizer/image10.jpeg)
![Image 13](../../assets/images/recon-data-visualizer/image11.jpeg)
![Image 14](../../assets/images/recon-data-visualizer/image12.jpeg)

## Auto-Generation Option

![Image 15](../../assets/images/recon-data-visualizer/image13.jpeg)

Enable "Auto Generate Click and Detail Configs" to automatically create Click and Detail configurations without manual setup.

![Image 16](../../assets/images/recon-data-visualizer/image14.jpeg)

Complete the additional fields and save the configuration. The system will display status messages confirming successful setup.

# Record Detail Page Setup

## Component Placement

![Image 17](../../assets/images/recon-data-visualizer/image15.jpeg)

1. Navigate to a Contact record with existing junction records
2. Access Edit Page through the gear icon
3. Search for "Data Visualizer" in the component library

![Image 18](../../assets/images/recon-data-visualizer/image16.jpeg)
![Image 19](../../assets/images/recon-data-visualizer/image17.jpeg)

4. Drag the Data Visualizer component from the Managed section to your desired page location

## Component Configuration

Configure the following parameters in the component properties panel:

- **Setting Group Name**: Enter the unique configuration name (e.g., "ContactWithMatter")
- **Header**: Customize the display header (default value can be modified)

![Image 20](../../assets/images/recon-data-visualizer/image18.jpeg)

The component renders immediately upon configuration. Save changes and activate the page to complete setup.

![Image 21](../../assets/images/recon-data-visualizer/image19.jpeg)

# Node Navigation

![Image 24](../../assets/images/recon-data-visualizer/image22.jpeg)

The Data Visualizer enables seamless navigation between related records without leaving the current page. Click any node to display its relationships and access additional details through hover interactions.

## Available Actions

### Show in Visualizer
Refreshes the component to display relationships for the selected record.

![Image 25](../../assets/images/recon-data-visualizer/image23.jpeg)

### More Configs
Displays alternative configurations applicable to the current node type.

![Image 26](../../assets/images/recon-data-visualizer/image24.jpeg)
![Image 27](../../assets/images/recon-data-visualizer/image25.jpeg)

# Configuration Management

## Viewing Configurations

![Image 28](../../assets/images/recon-data-visualizer/image26.png)

Access the Visualizer Admin tab to view all defined configurations. Use the action button to display detailed configuration information in an expandable accordion layout.

![Image 29](../../assets/images/recon-data-visualizer/image27.jpeg)

### Field Notation
- **[PR]**: Primary object field
- **[SE]**: Secondary object field
- **[JN]**: Junction/Reference object field

# Configuration Type Details

## Base Configuration

The Base Configuration is mandatory for component rendering and includes:

- **Config Type**: Always displays "Base Configuration"
- **Label**: User-friendly configuration name
- **Junction Object**: Name of the junction object
- **Primary Object**: Primary object name with color coding
- **Object Config**: Detailed attributes for each object type

![Image 37](../../assets/images/recon-data-visualizer/image32.png)

## Detail Configuration

Activated when nodes are clicked, the Detail Configuration manages the display of related information with the following parameters:

- **Event Object**: Triggers detail loading upon node selection
- **Search EventId In**: Object where the node is searched
- **Search Object Key Field**: Comparison field for node matching
- **Collect Detail Field**: Node name collection for detail generation
- **Prepare Details From**: Source object for detail provision
- **Detail Key Field**: Filtering field for detail collection
- **Field To Show On UI**: Display fields in the detail panel
- **Name Field**: Label display for list items

## Click Configuration

![Image 45](../../assets/images/recon-data-visualizer/image37.jpeg)

Similar to Base Configuration with the addition of a "Triggering Node" attribute, this configuration manages the "Show in Visualizer" action functionality.

# Connected App and Named Credentials Setup

The delete functionality requires Metadata API Callout configuration. Ensure "Allow creation of connected apps" is enabled in External Client App Settings before proceeding.

![Image 46](../../assets/images/recon-data-visualizer/image38.jpeg)

**Note**: Replace [instance] placeholders with your actual instance name in all URLs.

## Connected App Configuration

1. Navigate to Setup
2. Search for "External Client Apps"
3. Select "Settings"
4. Click "New Connected App"

![Image 47](../../assets/images/recon-data-visualizer/image39.jpeg)

### Required Settings

![Image 48](../../assets/images/recon-data-visualizer/image40.jpeg)
![Image 49](../../assets/images/recon-data-visualizer/image41.jpeg)

- **Connected App Name**: Recon Visualizer Metadata API
- **API Name**: Recon_Visualizer_Metadata_API (do not modify)
- **Contact Email**: Your administrator email
- **Enable OAuth Settings**: Enabled
- **Callback URL**: `https://[InstanceName].my.salesforce.com/services/authcallback/Recon_Visualizer_Metadata_API`
- **Selected OAuth Scopes**: Full access, Perform requests at any time
- **Require PKCE Extension**: Enabled
- **Require Secret for Web Server Flow**: Enabled
- **Require Secret for Refresh Token Flow**: Enabled

Save the configuration and retrieve client credentials through "Manage Consumer Details".

![Image 50](../../assets/images/recon-data-visualizer/image42.jpeg)
![Image 51](../../assets/images/recon-data-visualizer/image43.jpeg)

## Auth Provider Setup

1. Navigate to Setup > Auth Providers
2. Create new provider with the following specifications:

![Image 52](../../assets/images/recon-data-visualizer/image44.jpeg)
![Image 53](../../assets/images/recon-data-visualizer/image45.jpeg)

- **Provider Type**: Salesforce
- **Name**: Recon Visualizer Metadata API
- **URL Suffix**: Recon_Visualizer_Metadata_API
- **Consumer Key/Secret**: From previous step
- **Authorize Endpoint URL**: `https://[Instance].my.salesforce.com/services/oauth2/authorize`
- **Token Endpoint URL**: `https://[Instance].my.salesforce.com/services/oauth2/token`
- **Use PKCE Extension**: Enabled
- **Default Scopes**: full refresh_token offline_access
- **Include Consumer Secret in SOAP API Responses**: Enabled

## Named Credentials Setup

1. Navigate to Setup > Named Credentials
2. Select "New Legacy"
3. Configure with the following parameters:

![Image 54](../../assets/images/recon-data-visualizer/image46.jpeg)
![Image 55](../../assets/images/recon-data-visualizer/image47.jpeg)

- **Label/Name**: Recon Visualizer Metadata API / Recon_Visualizer_Metadata_API
- **URL**: `https://[instance].my.salesforce.com/`
- **Identity Type**: Named Principal
- **Authentication Protocol**: OAuth 2.0
- **Authentication Provider**: Select previously created provider
- **Scope**: full refresh_token offline_access
- **Start Authentication Flow on Save**: Enabled
- **Generate Authorization Header**: Enabled
- **Allow Merge Fields**: Enabled for both HTTP Header and Body

Complete the authentication flow with administrator credentials.

![Image 56](../../assets/images/recon-data-visualizer/image48.jpeg)

# Advanced Configuration Options

![Image 57](../../assets/images/recon-data-visualizer/image49.jpeg)

If auto-generation was not selected during initial setup, manual configuration remains available for custom requirements.

## Manual Detail Configuration

1. Navigate to Visualizer Configuration tab
2. Select the target object
3. Expand the section and click "Add Detail Config"

![Image 58](../../assets/images/recon-data-visualizer/image50.jpeg)
![Image 59](../../assets/images/recon-data-visualizer/image51.jpeg)

### Configuration Parameters

- **Base Object**: Target object for configuration
- **Event Object**: Node triggering the event
- **Compare EventId With Object**: Primary or junction object for node ID comparison
- **Select Key field for Event Object**: Field related to the event object
- **Prepare details from the Field**: Field for detail preparation
- **Prepare Details From Object**: Object containing related data
- **Compare collection with field**: Field containing related values
- **Select Name Field**: Display field for detail card titles
- **Description**: Configuration documentation

![Image 60](../../assets/images/recon-data-visualizer/image52.jpeg)
![Image 61](../../assets/images/recon-data-visualizer/image53.jpeg)

Add fields using "Select field to display" and the "Add" button. Control field visibility through the "Show on UI" settings.

![Image 62](../../assets/images/recon-data-visualizer/image54.jpeg)
![Image 63](../../assets/images/recon-data-visualizer/image55.png)

## Click Configuration Setup

Prerequisites: Detail Configuration must be established prior to Click Configuration.

1. Navigate to Visualizer Configuration tab
2. Select target object
3. Access Detail Config tab
4. Click "Show in visualizer config"

![Image 64](../../assets/images/recon-data-visualizer/image56.jpeg)
![Image 65](../../assets/images/recon-data-visualizer/image57.png)

Configure junction objects and node relationships as required.

![Image 66](../../assets/images/recon-data-visualizer/image58.jpeg)
![Image 67](../../assets/images/recon-data-visualizer/image59.jpeg)

The configuration activates through the "Show in visualizer" link in the detail panel.

![Image 68](../../assets/images/recon-data-visualizer/image60.jpeg)
![Image 69](../../assets/images/recon-data-visualizer/image61.jpeg)

## Additional Configuration Management

![Image 72](../../assets/images/recon-data-visualizer/image64.jpeg)

Active "Add..." buttons indicate available configuration options for selected nodes.

### Multiple Configuration Support

![Image 73](../../assets/images/recon-data-visualizer/image65.jpeg)

The "More Configs" feature enables switching between applicable configurations for the current node type.

![Image 74](../../assets/images/recon-data-visualizer/image66.jpeg)

Select the eye icon to activate alternative visualizations based on different configurations.