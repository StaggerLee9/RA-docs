---
layout: default
title: Matter
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 2
---

# Matter (Matter__c)

## Overview

The Matter object is used to track legal matters (also known as Cases) and their related data. This object serves as a central point for managing legal cases, their progress, and associated relationships.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | Matter__c |
| Label | Matter |
| Plural Label | Matters |
| Sharing Model | Private |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Matter Name | Name | Text | Primary identifier for each matter record |
| Closed | Closed__c | Date | Date when the matter was closed |
| Description | Description__c | Long Text Area | Detailed matter descriptions (131,072 chars) |
| Investigation | Investigation__c | Lookup | Link to Investigation record |
| Opened | Opened__c | Date | Date when the matter was opened |
| Practice Area | Practice_Area__c | Picklist | Area of legal practice |
| Request | Request__c | Lookup | Link to Request record |
| Stage | Stage__c | Picklist | Current stage of the matter |
| Status | Status__c | Picklist | Open/Closed status |
| Team / Unit | Team__c | Picklist | Responsible team or unit |
| Type | Type__c | Picklist | Type of matter |

## Record Types

### Litigation
- Active record type for litigation-related matters
- All picklist values enabled for Practice Area, Stage, Status, Team, and Type fields

### Transactions
- Active record type for transaction-related matters
- All picklist values enabled for Practice Area, Stage, Status, Team, and Type fields

## Key Features

- Activities Enabled: Supports activity tracking
- Reporting: Supports report generation and analytics
- Bulk API: Enables bulk data operations
- Streaming API: Supports real-time notifications
- Search: Records are searchable with custom search layouts
- Visibility: Public
- Custom Record Page: Uses "Matter_Record_Page" for desktop and mobile

## Relationships

### Parent Objects
- Investigation (via Investigation__c lookup)
- Request (via Request__c lookup)

### Child Objects
- Matter Account (Matter_Account__c)
- Matter Contact (Matter_Contact__c)
- Matter Note (Matter_Note__c)
- Related Matter (Related_Matter__c)
- Stage Activity (Stage_Activity__c)
- Work Group (Work_Group__c)

## Common Use Cases

1. **Case Management**
   - Tracking legal matters from initiation to closure
   - Managing matter relationships and participants
   - Monitoring case progress and deadlines

2. **Team Collaboration**
   - Assigning matters to teams/units
   - Tracking matter participants
   - Sharing matter information across teams

3. **Reporting and Analytics**
   - Matter status reporting
   - Team workload analysis
   - Practice area metrics

## Best Practices

1. **Matter Creation**
   - Use consistent naming conventions
   - Properly categorize matters by type and practice area
   - Set appropriate stage and status values

2. **Relationship Management**
   - Link all relevant contacts and accounts
   - Maintain accurate participant records
   - Document relationship changes

3. **Record Maintenance**
   - Keep status and stage fields current
   - Update closure dates promptly
   - Maintain accurate team assignments