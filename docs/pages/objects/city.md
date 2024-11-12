---
layout: default
title: City
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 14
---

# City (City__c)

## Overview

The City object stores information about city or city-state combinations independently of standard address fields, supporting use cases requiring detailed geographic data.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | City__c |
| Label | City |
| Plural Label | Cities |
| Sharing Model | ReadWrite |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Name | Name | Text | City name |
| State | State__c | Lookup | Link to State record |
| [Additional fields based on your implementation] |

## Key Features

- Reports Enabled: Yes
- Search Enabled: Yes
- Sharing Model: ReadWrite
- Mobile Support: Both Large and Small form factors
- All Standard Actions Enabled

## Relationships

### Parent Objects
- State (via State__c lookup)

## Common Use Cases

1. **Geographic Data Management**
   - City-state relationship tracking
   - Address standardization
   - Location management

2. **Jurisdiction Management**
   - Legal jurisdiction tracking
   - Geographic scope definition
   - Territory management

3. **Reporting**
   - Geographic analysis
   - Regional reporting
   - Location-based metrics

## Best Practices

1. **Data Quality**
   - Consistent naming conventions
   - Proper state associations
   - Regular data validation

2. **Data Management**
   - Regular updates
   - Duplicate prevention
   - Standardized formats

3. **Relationship Maintenance**
   - Accurate state linkage
   - Regular verification
   - Proper documentation