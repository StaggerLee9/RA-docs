---
layout: default
title: Child Activity
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 37
---

# Child Activity (Child_Activity__c)

## Overview

The Child Activity object defines subordinate activities that are automatically created in response to a parent activity rule event. Child activities support cascading scheduling, where dates and cancellations can propagate from the parent activity.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | Child_Activity__c |
| Label | Child Activity |
| Plural Label | Child Activities |
| Sharing Model | Controlled by Parent |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Name | Name | Text | Primary identifier for the child activity |
| Parent Activity Rule | Parent_Activity_Rule__c | Lookup | The parent Activity Rule that triggers this child |
| Activity Rule Definition | Activity_Rule_Definition__c | Lookup | The Activity Rule that defines the child activity behavior |
| Change Date with Parent | Change_Date_with_Parent__c | Checkbox | If true, child date adjusts when parent date changes |
| Direction | Direction__c | Picklist | Whether the child is scheduled Before or After the parent |
| Parent Cancels Child | Parent_Cancels_Child__c | Checkbox | If true, cancelling the parent also cancels this child |
| Trigger | Trigger__c | Picklist | Event that creates the child: Parent Add, Parent Complete, Parent Cancel, Parent Overdue |
| Unit Type | Unit_Type__c | Picklist | Time unit for offset: Business Days, Calendar Days, Months, Weeks, Years |
| Units | Units__c | Number | Number of time units offset from the parent activity |
| Use Task Type | Use_Task_Type__c | Checkbox | Whether the child uses a task record type |
| Activity Type | Activity_Type__c | Text | Type classification for the child activity |
| Activity | Activity__c | Text | Activity description or identifier |
| Assigned To | Assigned_To__c | Text | Default assignee for the child activity |
| Assignment Type | Assignment_Type__c | Text | Method of assignment |

## Relationships

### Parent Objects
- Activity Rule (via Parent_Activity_Rule__c lookup)
- Activity Rule (via Activity_Rule_Definition__c lookup)

## Common Use Cases

1. **Cascading Workflows**
   - Automatically creating follow-up tasks when a parent activity is added
   - Scheduling reminder activities before a parent deadline
   - Triggering cleanup tasks when a parent activity is completed

2. **Date Management**
   - Offsetting child activity dates relative to the parent
   - Automatically adjusting dates when parent dates shift
   - Managing business day vs. calendar day calculations

3. **Cancellation Cascading**
   - Automatically cancelling dependent activities when a parent is cancelled
   - Preserving independent child activities that should survive parent cancellation

## Best Practices

1. **Configuration**
   - Choose the appropriate trigger event for each child
   - Set direction and offset units carefully to avoid scheduling conflicts
   - Use "Change Date with Parent" for tightly coupled activities

2. **Assignment**
   - Define clear assignment types for automated routing
   - Review child activity assignments when team structure changes
