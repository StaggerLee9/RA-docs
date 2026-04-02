---
layout: default
title: Related Contact
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 45
---

# Related Contact (Related_Contact__c)

## Overview

The Related Contact object captures relationships between two Contact records, such as parent-child, spouse, or other familial or professional associations. This enables tracking of inter-contact relationships within the matter management system.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | Related_Contact__c |
| Label | Related Contact |
| Plural Label | Related Contacts |
| Sharing Model | Private |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Name | Name | Text | Primary identifier for the relationship record |
| Contact | Contact__c | Lookup (Contact) | The primary contact in the relationship |
| Related Contact | Related_Contact__c | Lookup (Contact) | The related contact |
| Type | Type__c | Picklist | Relationship type: Parent, Child |

## Relationships

### Related Objects
- Contact (via Contact__c lookup) — the primary contact
- Contact (via Related_Contact__c lookup) — the related contact

## Common Use Cases

1. **Relationship Mapping**
   - Documenting family relationships between contacts
   - Tracking professional associations (e.g., attorney-client)
   - Building relationship networks for investigation purposes

2. **Investigation Support**
   - Identifying connections between persons of interest
   - Mapping organizational hierarchies

## Best Practices

1. **Relationship Records**
   - Create reciprocal records when appropriate (e.g., if A is parent of B, B is child of A)
   - Use consistent Type values for accurate reporting
   - Review relationships when contact records are merged or deactivated
