---
layout: default
title: Investigation Account
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 12
---

# Investigation Account (Investigation_Account__c)

## Overview

The Investigation Account object manages relationships between Accounts and Investigations, tracking accounts that are related to investigations with specific roles. This object enables the tracking and management of organizations involved in investigative cases.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | Investigation_Account__c |
| Label | Investigation Account |
| Plural Label | Investigation Accounts |
| Sharing Model | ControlledByParent |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Investigation Account Name | Name | Auto-number | Unique identifier (e.g., "IA-0001") |
| Account | Account__c | Lookup | Link to Account record |
| Start Date | Start_Date__c | Date | When account's involvement began |
| End Date | End_Date__c | Date | When account's involvement ended |
| Investigation | Investigation__c | Master-Detail | Link to Investigation record |
| Note | Note__c | Text Area | Additional comments about involvement |
| Role | Role__c | Picklist | Role of account in investigation |

## Key Features

- Activities Enabled: Yes
- History Tracking: Enabled
- Reporting: Supported
- Bulk API: Enabled
- Streaming API: Enabled
- Search: Records are searchable
- Activities: Supported

## Relationships

### Parent Objects
- Investigation (via Investigation__c master-detail)

### Related Objects
- Account (via Account__c lookup)

## Common Use Cases

1. **Organization Tracking**
   - Recording involved companies
   - Tracking organizational roles
   - Managing corporate relationships

2. **Timeline Management**
   - Documenting involvement periods
   - Tracking role changes
   - Managing relationship history

3. **Investigation Support**
   - Linking corporate entities
   - Managing organizational involvement
   - Documenting business relationships

## Best Practices

1. **Account Association**
   - Clear role definition
   - Accurate timeline recording
   - Complete documentation

2. **Relationship Management**
   - Regular status updates
   - Proper role assignment
   - Detailed note maintenance

3. **Data Integrity**
   - Accurate date tracking
   - Proper relationship documentation
   - Regular record review