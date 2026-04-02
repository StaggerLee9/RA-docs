---
layout: default
title: Matter Type
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 44
---

# Matter Type (Matter_Type__c)

## Overview

The Matter Type object defines type classifications that can be associated with a Matter. This allows organizations to categorize matters by type in a flexible, data-driven way rather than relying solely on picklist values.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | Matter_Type__c |
| Label | Matter Type |
| Plural Label | Matter Types |
| Sharing Model | Controlled by Parent |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Name | Name | Text | Primary identifier for the matter type |
| Matter | Matter__c | Lookup | Link to the associated Matter |

## Relationships

### Parent Objects
- Matter (via Matter__c lookup)

## Common Use Cases

1. **Matter Classification**
   - Assigning multiple type classifications to a single matter
   - Supporting type hierarchies or multi-select categorization
   - Enabling type-based reporting and filtering

2. **Configuration**
   - Driving automation or routing based on matter type
   - Supporting implementation-specific type taxonomies

## Best Practices

1. **Type Management**
   - Define a consistent type taxonomy during implementation
   - Use matter types for reporting and dashboard filtering
   - Review and consolidate types periodically
