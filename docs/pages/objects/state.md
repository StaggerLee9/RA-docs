---
layout: default
title: State
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 17
---

# State (State__c)

## Overview

The State object captures state-level information that supports hierarchical geographic data across cities, counties, and districts. It serves as a foundational element in the geographic data model.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | State__c |
| Label | State |
| Plural Label | States |
| Sharing Model | ReadWrite |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Name | Name | Text | State name |
| [Additional fields based on your implementation] |

## Key Features

- Reports Enabled: Yes
- Search Enabled: Yes
- Sharing Model: ReadWrite
- Mobile Support: Large and Small form factors
- Standard Actions: All enabled

## Relationships

### Child Objects
- Cities (via State__c)
- Counties (via State__c)
- Districts (via State__c)

## Common Use Cases

1. **Geographic Hierarchy**
   - Central state record
   - Geographic organization
   - Location management

2. **Jurisdictional Management**
   - State-level jurisdiction
   - Administrative boundaries
   - Legal territory management

3. **Data Organization**
   - Location standardization
   - Address management
   - Regional classification

## Best Practices

1. **State Management**
   - Standard naming conventions
   - Complete record maintenance
   - Regular verification

2. **Relationship Management**
   - Proper child object linkage
   - Hierarchy maintenance
   - Regular validation

3. **Data Quality**
   - Standardized formats
   - Regular updates
   - Accurate relationships