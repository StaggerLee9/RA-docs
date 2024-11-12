---
layout: default
title: County
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 15
---

# County (County__c)

## Overview

The County object manages county or county-state combinations, supporting specific use cases where county-level information is critical, such as certain reporting and jurisdictional data.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | County__c |
| Label | County |
| Plural Label | Counties |
| Sharing Model | ReadWrite |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Name | Name | Text | County name |
| State | State__c | Lookup | Link to State record |
| Type | Type__c | Picklist | County, Parish, Borough, Census Area |

## Key Features

- Reports Enabled: Yes
- Search Disabled
- Sharing Model: ReadWrite
- Mobile Support: Large and Small form factors
- Standard Actions: Accept, CancelEdit, Clone, Delete, Edit, List, New, SaveEdit, Tab, View

## Relationships

### Parent Objects
- State (via State__c lookup)

## Common Use Cases

1. **Jurisdictional Management**
   - Legal jurisdiction tracking
   - Administrative boundaries
   - Regional classification

2. **Geographic Organization**
   - County-level reporting
   - Regional data organization
   - Territory management

3. **Data Management**
   - Location standardization
   - Geographic hierarchy
   - Regional classification

## Best Practices

1. **Data Standardization**
   - Consistent naming conventions
   - Proper type classification
   - Regular data validation

2. **State Association**
   - Accurate state relationships
   - Proper hierarchy maintenance
   - Regular verification

3. **Type Management**
   - Appropriate type selection
   - Consistent classification
   - Regular review