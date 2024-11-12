---
layout: default
title: Investigation Contact
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 13
---

# Investigation Contact (Investigation_Contact__c)

## Overview

The Investigation Contact object manages relationships between Contacts and Investigations, tracking contacts that are related to investigations with specific roles. This object enables the tracking and management of individuals involved in investigative cases.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | Investigation_Contact__c |
| Label | Investigation Contact |
| Plural Label | Investigation Contacts |
| Sharing Model | ControlledByParent |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Name | Name | Auto-number | Unique identifier (e.g., "IC-0001") |
| Contact | Contact__c | Lookup | Link to Contact record |
| Start Date | Start_Date__c | Date | When contact's involvement began |
| End Date | End_Date__c | Date | When contact's involvement ended |
| Investigation | Investigation__c | Master-Detail | Link to Investigation record |
| Note | Note__c | Text Area | Additional comments about involvement |
| Role | Role__c | Picklist | Role of contact in investigation |

## Key Features

- History Tracking: Enabled
- Reporting: Supported
- Bulk API: Enabled
- Streaming API: Enabled
- Search: Records are searchable
- Activities: Disabled
- Chatter Feed: Disabled

## Relationships

### Parent Objects
- Investigation (via Investigation__c master-detail)
- Contact (via Contact__c lookup)

## Common Use Cases

1. **Individual Tracking**
   - Managing witness information
   - Tracking investigator assignments
   - Recording person of interest details

2. **Role Management**
   - Defining contact roles
   - Tracking role changes
   - Managing involvement periods

3. **Timeline Documentation**
   - Recording involvement dates
   - Tracking contact history
   - Managing contact interactions

## Best Practices

1. **Contact Management**
   - Clear role assignments
   - Accurate timeline recording
   - Complete documentation

2. **Relationship Documentation**
   - Detailed notes
   - Regular status updates
   - Proper role management

3. **Data Quality**
   - Regular record reviews
   - Accurate date tracking
   - Proper relationship maintenance