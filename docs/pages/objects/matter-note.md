---
layout: default
title: Matter Note
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 5
---

# Matter Note (Matter_Note__c)

## Overview

The Matter Note object is used to store and manage notes related to Matters, with the ability to categorize notes by type and control privacy settings. The object uses a lookup relationship to Matter to enable record-level security, allowing notes to be marked as private.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | Matter_Note__c |
| Label | Matter Note |
| Plural Label | Matter Notes |
| Sharing Model | ReadWrite |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Matter Note ID | Name | Auto-number | Unique identifier (e.g., "MN-0001") |
| Matter | Matter__c | Lookup | Link to Matter record |
| Note | Note__c | HTML | Rich text note content (131,072 chars) |
| Private | Private__c | Checkbox | Indicates if note is private (Default: false) |
| Type | Type__c | Picklist | Categorizes the type of note |

## Key Features

- Activities Enabled: Yes
- Reporting: Supported
- Bulk API: Enabled
- Streaming API: Enabled
- Search: Custom search layout includes note content
- Record-Level Security: Enabled through lookup relationship
- Rich Text Support: HTML formatting for notes
- Privacy Controls: Individual note privacy settings

## Relationships

### Parent Objects
- Matter (via Matter__c lookup)

### Security Model
- Independent sharing model (ReadWrite)
- Privacy controls at record level
- Support for record-level security

## Common Use Cases

1. **Case Documentation**
   - Recording matter updates
   - Documenting key decisions
   - Tracking important communications

2. **Private Notes**
   - Maintaining confidential information
   - Recording sensitive details
   - Managing restricted access notes

3. **Team Communication**
   - Sharing matter updates
   - Recording meeting notes
   - Documenting action items

## Best Practices

1. **Note Management**
   - Use clear, descriptive titles
   - Properly categorize notes by type
   - Set appropriate privacy settings

2. **Content Organization**
   - Use consistent formatting
   - Include relevant dates
   - Reference related records

3. **Privacy Control**
   - Review privacy settings regularly
   - Document privacy requirements
   - Monitor access patterns