---
layout: default
title: Evidence Contact
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 10
---

# Evidence Contact (Evidence_Contact__c)

## Overview

The Evidence Contact object tracks the relationships between Contacts and Evidence in investigations. It ensures that key individuals related to evidence (e.g., custodians, owners, or sources) are accurately associated with each piece of evidence.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | Evidence_Contact__c |
| Label | Evidence Contact |
| Plural Label | Evidence Contacts |
| Sharing Model | ControlledByParent |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Evidence Contact Name | Name | Auto-number | Unique identifier (e.g., "EC-0001") |
| Contact | Contact__c | Lookup | Link to Contact record |
| Start Date | Start_Date__c | Date | When contact's involvement with evidence began |
| End Date | End_Date__c | Date | When contact's involvement with evidence ended |
| Evidence | Evidence__c | Master-Detail | Link to specific evidence record |
| Role | Role__c | Picklist | Contact's role (Custodian, Owner, Source, Recovered By) |
| Note | Note__c | Text | Additional comments about the contact's relationship |

## Key Features

- Chain of custody tracking
- Role-based relationship management
- Timeline tracking
- Note-taking capability
- Relationship history maintenance

## Relationships

### Parent Objects
- Evidence (via Evidence__c master-detail)

### Related Objects
- Contact (via Contact__c lookup)

## Common Use Cases

1. **Chain of Custody**
   - Tracking evidence handlers
   - Managing custodian changes
   - Recording custody timeline

2. **Evidence Ownership**
   - Recording original owners
   - Tracking temporary custodians
   - Managing evidence sources

3. **Evidence Recovery**
   - Documenting recovery personnel
   - Recording witness information
   - Tracking evidence handlers

## Best Practices

1. **Role Management**
   - Clear role definition
   - Accurate timeline recording
   - Complete documentation

2. **Contact Association**
   - Proper role assignment
   - Accurate date tracking
   - Detailed notes maintenance

3. **Timeline Tracking**
   - Precise date recording
   - Regular updates
   - Complete history maintenance