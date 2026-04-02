---
layout: default
title: Subpoena Contact
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 47
---

# Subpoena Contact (Subpoena_Contact__c)

## Overview

The Subpoena Contact object links contacts to a specific subpoena, identifying the individuals involved in or served by the subpoena.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | Subpoena_Contact__c |
| Label | Subpoena Contact |
| Plural Label | Subpoena Contacts |
| Sharing Model | Controlled by Parent |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Name | Name | Text | Primary identifier for the subpoena contact record |
| Subpoena | Subpoena__c | Lookup | Link to the parent Subpoena |

## Relationships

### Parent Objects
- Subpoena (via Subpoena__c lookup)

## Common Use Cases

1. **Contact Tracking**
   - Recording individuals served by a subpoena
   - Identifying witnesses or parties compelled to testify
   - Managing contact lists for subpoena service

2. **Service Management**
   - Tracking which contacts have been served
   - Managing contact information for legal proceedings

## Best Practices

1. **Record Management**
   - Create a Subpoena Contact record for each individual associated with the subpoena
   - Keep contact associations current as subpoena scope changes
