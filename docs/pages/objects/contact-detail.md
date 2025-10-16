---
layout: default
title: Contact Detail
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 34
---

# Contact Detail (Contact_Detail__c)

## Overview

The Contact Detail object extends the standard Contact with legal-specific metadata that may vary by organization—such as priority, identifiers, or relationship history. It allows administrators to capture repeatable detail without cluttering the core Contact layout.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | Contact_Detail__c |
| Label | Contact Detail |
| Plural Label | Contact Details |
| Sharing Model | ControlledByParent |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Contact Detail Number | Name | Auto-number | Unique identifier for the detail entry (format `CD-0000`) |
| Contact | Contact__c | Master-Detail | Parent Contact whose extended details are stored on this record |

> Add custom fields to capture the supplemental data points (e.g., relationship notes, alternate contact methods, legal identifiers) your teams require.

## Key Features

- Controlled Sharing: Inherits visibility from the parent Contact
- Bulk API Enabled: Manage detail records through data imports
- Search Enabled: Contact details show in global search results
- Reports Disabled: Use Contact-based reports or enable as needed
- Activities Disabled: Track follow-ups on the parent Contact

## Relationships

### Parent Objects
- Contact (via Contact__c master-detail)

### Child Objects
- None

## Common Use Cases

1. **Extended Profiles**
   - Store legal or compliance metadata that should not reside on the Contact record
   - Track history for contacts who appear across multiple matters or claims
   - Maintain alternate addresses or IDs without overcrowding the Contact layout
2. **Operational Tagging**
   - Flag contacts for priority handling or special routing
   - Record consent statuses or communication preferences
   - Capture relationships unique to legal operations
3. **Integration Support**
   - Map external system identifiers or sync status flags
   - Provide additional attributes for data warehouse feeds
   - Preserve logs of updates coming from automation

## Best Practices

1. **Model Governance**
   - Define which data belongs on Contact versus Contact Detail
   - Use page layouts to surface only the fields relevant to each team
   - Retire obsolete fields to keep detail records concise
2. **Lifecycle Management**
   - Review detail records when contacts are merged or inactivated
   - Automate clean-up when upstream records change ownership
   - Schedule periodic audits for outdated or duplicate entries
3. **Security Controls**
   - Align field-level access with the sensitivity of stored data
   - Leverage parent sharing to maintain confidentiality
   - Monitor reports and list views for exposure of restricted information
