---
layout: default
title: Subpoena Request Information
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 48
---

# Subpoena Request Information (Subpoena_Request_Information__c)

## Overview

The Subpoena Request Information object captures the specific information or documents being requested by a subpoena. Each record represents a distinct request item linked to a parent Subpoena.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | Subpoena_Request_Information__c |
| Label | Subpoena Request Information |
| Plural Label | Subpoena Request Information |
| Sharing Model | Controlled by Parent |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Name | Name | Text | Primary identifier for the request information record |
| Subpoena | Subpoena__c | Lookup | Link to the parent Subpoena |

## Relationships

### Parent Objects
- Subpoena (via Subpoena__c lookup)

## Common Use Cases

1. **Request Tracking**
   - Itemizing documents or testimony requested in a subpoena
   - Tracking fulfillment status per request item
   - Managing the scope of subpoena responses

2. **Compliance**
   - Documenting what information has been provided
   - Ensuring all requested items are addressed

## Best Practices

1. **Record Management**
   - Create a separate record for each distinct request item
   - Track fulfillment status for each request
   - Link all request records to the correct parent Subpoena
