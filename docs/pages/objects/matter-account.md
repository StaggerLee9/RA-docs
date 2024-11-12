---
layout: default
title: Matter Account
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 4
---

# Matter Account (Matter_Account__c)

## Overview

The Matter Account object serves as a junction between Matters and Accounts (Organizations), tracking the relationships and roles of organizations involved in legal matters. This object enables the management of complex relationships between legal matters and the organizations involved in them.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | Matter_Account__c |
| Label | Matter Account |
| Plural Label | Matter Accounts |
| Sharing Model | Controlled by Parent |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Matter Account | Name | Auto-number | Unique identifier (e.g., "MA-0001") |
| Account | Account__c | Lookup | Link to Account record |
| End Date | End_Date__c | Date | When organization's involvement ended |
| Matter | Matter__c | Master-Detail | Link to Matter record |
| Note | Note__c | Text (255) | Additional comments about involvement |
| Role | Role__c | Picklist | Organization's role in matter |
| Start Date | Start_Date__c | Date | When organization's involvement began |

## Key Features

- Activities Enabled: Yes
- Reporting: Supported
- Bulk API: Enabled
- Streaming API: Enabled
- Search: Custom search layout enabled
- Visibility: Public
- Chatter Feed: Disabled
- History Tracking: Disabled

## Relationships

### Parent Objects
- Matter (via Matter__c master-detail)
- Account (via Account__c lookup)

### Search Layout
- Role
- Matter
- Account
- Start Date
- End Date
- Note

## Common Use Cases

1. **Organization Relationship Management**
   - Tracking involved organizations
   - Managing organizational roles
   - Recording relationship timelines

2. **Role-based Access**
   - Managing organization permissions
   - Controlling information access
   - Tracking organizational involvement

3. **Timeline Management**
   - Recording involvement periods
   - Managing relationship history
   - Tracking role changes

## Best Practices

1. **Relationship Documentation**
   - Clear role definition
   - Accurate timeline recording
   - Detailed note maintenance

2. **Account Linking**
   - Verify account associations
   - Maintain relationship accuracy
   - Document organization changes

3. **Timeline Tracking**
   - Set precise start dates
   - Update end dates promptly
   - Maintain accurate involvement periods