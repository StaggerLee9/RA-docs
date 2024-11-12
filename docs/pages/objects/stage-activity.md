---
layout: default
title: Stage Activity
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 7
---

# Stage Activity (Stage_Activity__c)

## Overview

The Stage Activity object tracks specific activities or milestones within the lifecycle of a legal matter. Configured as a master-detail relationship with the Matter object, it allows for the aggregation of activities under a single matter, aiding in structured case tracking and workflow management.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | Stage_Activity__c |
| Label | Stage Activity |
| Plural Label | Stage Activities |
| Sharing Model | ControlledByParent |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Stage Activity Name | Name | Auto-number | Unique identifier (e.g., "SA-0001") |
| Matter | Matter__c | Master-Detail | Link to Matter record |
| [Additional fields based on your implementation] |

## Key Features

- Reports Enabled: Yes
- Search Enabled: Yes
- Sharing Model: ControlledByParent
- Supports both Large and Small form factors
- Full action support (Accept, Edit, Delete, etc.)

## Relationships

### Parent Objects
- Matter (via Matter__c master-detail)

## Common Use Cases

1. **Milestone Tracking**
   - Recording key matter stages
   - Tracking progress points
   - Managing deadlines

2. **Activity Management**
   - Documenting stage-specific activities
   - Tracking completion status
   - Managing activity sequences

3. **Workflow Support**
   - Supporting stage transitions
   - Managing activity dependencies
   - Tracking process compliance

## Best Practices

1. **Activity Documentation**
   - Clear activity descriptions
   - Accurate timeline recording
   - Proper stage categorization

2. **Progress Tracking**
   - Regular status updates
   - Milestone documentation
   - Timeline maintenance