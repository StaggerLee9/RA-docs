---
layout: default
title: Subpoena
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 46
---

# Subpoena (Subpoena__c)

## Overview

The Subpoena object tracks subpoena records within the matter management system. Subpoenas are legal documents that compel testimony or the production of evidence, and this object provides a centralized place to manage their lifecycle.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | Subpoena__c |
| Label | Subpoena |
| Plural Label | Subpoenas |
| Sharing Model | Private |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Name | Name | Text | Primary identifier for the subpoena record |

## Key Features

- Centralized subpoena tracking
- Related contact and request information management via child objects

## Relationships

### Child Objects
- Subpoena Contact (Subpoena_Contact__c)
- Subpoena Request Information (Subpoena_Request_Information__c)

## Common Use Cases

1. **Subpoena Management**
   - Recording and tracking issued subpoenas
   - Managing subpoena timelines and deadlines
   - Linking subpoenas to matters and investigations

2. **Compliance**
   - Ensuring timely responses to subpoenas
   - Tracking subpoena contacts and requested information
   - Maintaining an audit trail of subpoena activity

## Best Practices

1. **Subpoena Records**
   - Create a record for each subpoena received or issued
   - Link all associated contacts via Subpoena Contact records
   - Document requested information via Subpoena Request Information records
