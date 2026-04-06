---
layout: default
title: Subpoena Note
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 48
---

# Subpoena Note (Subpoena_Note__c)

## Overview

The Subpoena Note object stores notes and annotations related to a subpoena record. Each note can be categorized by type for filtering and reporting purposes.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | Subpoena_Note__c |
| Label | Subpoena Note |
| Plural Label | Subpoena Notes |
| Name Field | AutoNumber (SN-{0000}) |
| Sharing Model | Controlled by Parent |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Subpoena Note | Name | AutoNumber | Auto-generated unique identifier (SN-0000 format) |
| Subpoena | Subpoena__c | Master-Detail | Link to the parent Subpoena record |
| Note | Note__c | Long Text Area (32768) | Free-text content of the note or annotation related to the subpoena |
| Type | Type__c | Picklist (Restricted) | Categorizes the note for filtering and reporting purposes |

### Type Picklist Values

| Value | Description |
|-------|-------------|
| Sample Type | Default sample value; additional values can be added by administrators |

## Relationships

### Parent Objects
- Subpoena (via Subpoena__c master-detail)

## Common Use Cases

1. **Note Tracking**
   - Recording observations and updates related to a subpoena
   - Documenting communications and decisions
   - Maintaining a chronological record of subpoena activity

2. **Categorization**
   - Classifying notes by type for organized record-keeping
   - Filtering and reporting on specific note categories

## Best Practices

1. **Record Management**
   - Use the Type field to categorize notes for easier filtering
   - Keep notes concise and focused on a single topic per record
   - Notes are accessed via the Subpoena Notes related list on the parent Subpoena record
