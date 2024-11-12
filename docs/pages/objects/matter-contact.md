---
layout: default
title: Matter Contact
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 3
---

# Matter Contact (Matter_Contact__c)

## Overview

The Matter Contact object serves as a junction between Matters and Contacts, tracking the relationships between individuals and legal matters. This object enables the management of individual involvement in legal matters, including their roles and duration of involvement.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | Matter_Contact__c |
| Label | Matter Contact |
| Plural Label | Matter Contacts |
| Sharing Model | Controlled by Parent |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Matter Contact | Name | Auto-number | Unique identifier (e.g., "MC-0001") |
| Active | Active__c | Formula (Checkbox) | Auto-calculates if contact's involvement is current |
| Contact | Contact__c | Lookup | Link to Contact record |
| End Date | End_Date__c | Date | When contact's involvement ended |
| Matter | Matter__c | Master-Detail | Link to Matter record |
| Note | Note__c | Text Area | Additional comments about involvement |
| Role | Role__c | Picklist | Contact's role in the matter |
| Start Date | Start_Date__c | Date | When contact's involvement began |
| UserId | UserId__c | Formula | Pulls Recon_User__c from Contact record |

## Key Features

- History Tracking: Enabled
- Reporting: Supported
- Bulk API: Enabled
- Streaming API: Enabled
- Search: Enabled
- Activities: Disabled
- Chatter Feed: Disabled

## Relationships

### Parent Objects
- Matter (via Matter__c master-detail)
- Contact (via Contact__c lookup)

### Formula Fields
- Active: Based on Start/End Dates
- UserId: Referenced from Contact's Recon_User__c

## Common Use Cases

1. **Contact Role Management**
   - Tracking matter participants
   - Managing active participants
   - Recording role changes

2. **Timeline Tracking**
   - Recording involvement periods
   - Managing participant history
   - Tracking role duration

3. **User Integration**
   - Linking contacts to users
   - Managing permissions
   - Tracking system access

## Best Practices

1. **Role Assignment**
   - Clearly define roles
   - Keep role assignments current
   - Document role changes

2. **Date Management**
   - Set accurate start dates
   - Update end dates promptly
   - Maintain timeline accuracy

3. **Contact Linking**
   - Verify contact associations
   - Maintain user linkage
   - Document relationship changes