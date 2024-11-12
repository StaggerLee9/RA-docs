---
layout: default
title: Activity Rule
parent: Objects
has_toc: true
nav_order: 1
grand_parent: Object Reference
---

# Activity Rule (Activity_Rule__c)

## Overview

The Activity Rule object defines rules related to legal activities or tasks within a matter, automating task creation and assignment for different types of activities. This component is essential for ensuring that all tasks, events, and related records are systematically generated, updated, and maintained.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | Activity_Rule__c |
| Label | Activity Rule |
| Plural Label | Activity Rules |
| Sharing Model | ReadWrite |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Activity Rule Name | Activity_Rule__c | Auto-number | Auto-number field (e.g., "AR-0001") |
| Activity | Activity__c | Text | Corresponds to event/task type used to trigger the rule or populate event fields for child records |
| Activity Type | Activity_Type__c | Picklist | Event, task, reminder, email, or flow |
| Assign All | Assign_All__c | Checkbox | Indicates if all associated players are assigned to the activity |
| Assigned To | Assigned_To__c | Text | Person or entity assigned to the activity |
| Assignment Type | Assignment_Type__c | Picklist | Player role or user based |
| Child Activities Count | Child_Activities_Count__c | Summary | Count of child activities linked to parent activity |
| Default Description | Default_Description__c | Text Area | Default descriptions used when generating tasks |
| Default Status | Default_Status__c | Text | Default status of task/event when triggered |
| Default Subject | Default_Subject__c | Text | Default subject line for tasks |
| Use Task Type | Use_Task_Type__c | Checkbox | Indicates if rule should match based on task type instead of subject |

## Key Features

- Activities Enabled: Supports activity tracking
- History Tracking: Enabled
- Sharing Model: ReadWrite
- Search: Enabled
- Bulk API: Supported
- Streaming API: Supported

## Relationships

### Child Objects
- Activity Rule Assignment (Activity_Rule_Assignment__c)
- Activity Rule Job (Activity_Rule_Job__c)
- Child Activity (Child_Activity__c)

## Common Use Cases

1. **Automating Task Creation**
   - Automatically generating tasks when new matters are created
   - Creating follow-up tasks based on matter stage changes
   - Setting up recurring activities for compliance monitoring

2. **Assignment Management**
   - Automatically assigning tasks to specific roles or users
   - Managing team-wide task distribution
   - Setting up approval workflows

3. **Workflow Automation**
   - Triggering email notifications
   - Creating reminder tasks
   - Managing deadline-based activities

## Best Practices

1. **Rule Naming**
   - Use clear, descriptive names for Activity Rules
   - Include the purpose or trigger in the name
   - Follow consistent naming conventions

2. **Assignment Configuration**
   - Clearly define assignment types
   - Use role-based assignments for flexibility
   - Document assignment logic

3. **Default Values**
   - Set meaningful default descriptions
   - Use standardized status values
   - Keep subject lines clear and consistent