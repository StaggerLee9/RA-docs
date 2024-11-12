---
layout: default
title: Related Matter
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 6
---

# Related Matter (Related_Matter__c)

## Overview

The Related Matter object is designed to capture relationships and dependencies between different matters, providing a structured way to track connections such as parent-child relationships, appeal status, and related matters.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | Related_Matter__c |
| Label | Related Matter |
| Plural Label | Related Matters |
| Sharing Model | ControlledByParent |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Related Matter Name | Name | Auto-number | Unique identifier (e.g., "RM-0001") |
| End Date | End_Date__c | Date | Conclusion date of the relationship |
| Note | Note__c | Text Area | Contextual comments and information |
| Parent Matter | Parent_Matter__c | Master-Detail | Link to primary Matter record |
| Related Matter | Related_Matter__c | Lookup | Link to secondary Matter record |
| Related Matter Relation | Related_Matter_Relation__c | Lookup | Additional relationship context |
| Start Date | Start_Date__c | Date | Start date of the relationship |
| Type | Type__c | Picklist | Relationship type (Assessment, Case, Related Matter, Parent, Child, Appealed To, Appealed From) |

## Key Features

- Reports Enabled: Yes
- Search Enabled: Yes
- Sharing Model: ControlledByParent
- All Standard Actions Enabled
- Mobile-Ready: Supports both Large and Small form factors

## Relationships

### Parent Objects
- Matter (via Parent_Matter__c master-detail)

### Related Objects
- Matter (via Related_Matter__c lookup)
- Related Matter (via Related_Matter_Relation__c lookup)

## Common Use Cases

1. **Appeal Management**
   - Tracking appealed matters
   - Managing appeal hierarchies
   - Documenting appeal relationships

2. **Case Relations**
   - Connecting related cases
   - Managing parent-child relationships
   - Tracking case dependencies

3. **Assessment Linkage**
   - Linking preliminary assessments
   - Connecting investigation results
   - Tracking matter progression

## Best Practices

1. **Relationship Documentation**
   - Clear relationship type definition
   - Accurate timeline recording
   - Detailed note maintenance

2. **Matter Linking**
   - Verify matter associations
   - Maintain relationship accuracy
   - Document relationship changes

3. **Timeline Management**
   - Set precise relationship dates
   - Update status promptly
   - Maintain accurate records