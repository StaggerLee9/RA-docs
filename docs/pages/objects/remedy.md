---
layout: default
title: Remedy
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 25
---

# Remedy (Remedy__c)

## Overview

The Remedy object tracks remedies related to legal matters, such as injunctive and monetary relief. It is configured with a master-detail relationship to the Matter object, allowing roll-ups and summarization of remedies at the matter level.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | Remedy__c |
| Label | Remedy |
| Plural Label | Remedies |
| Sharing Model | ControlledByParent |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Remedy Name | Name | Auto-number | Unique identifier (e.g., "R-0001") |
| Matter | Matter__c | Master-Detail | Link to Matter record |
| [Additional fields based on your implementation] |

## Key Features

- Reports Enabled: Yes
- Search Enabled: Yes
- Sharing Model: ControlledByParent
- Mobile Support: Both Large and Small form factors
- Standard Actions: All enabled

## Relationships

### Parent Objects
- Matter (via Matter__c master-detail)

## Common Use Cases

1. **Relief Tracking**
   - Monetary relief recording
   - Injunctive relief documentation
   - Remedy management

2. **Matter Resolution**
   - Outcome documentation
   - Settlement tracking
   - Resolution recording

3. **Reporting**
   - Relief summaries
   - Matter outcomes
   - Resolution tracking

## Best Practices

1. **Remedy Documentation**
   - Clear description
   - Accurate categorization
   - Complete details

2. **Matter Association**
   - Proper linking
   - Accurate relationship
   - Complete documentation

3. **Data Management**
   - Regular updates
   - Accurate tracking
   - Proper classification