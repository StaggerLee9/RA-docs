---
layout: default
title: Time Entry
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 49
---

# Time Entry (Time_Entry__c)

## Overview

The Time Entry object captures time worked against a Matter, supporting legal time tracking, billing, and workload analysis. Each entry records who performed the work, how long it took, and whether it is billable.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | Time_Entry__c |
| Label | Time Entry |
| Plural Label | Time Entries |
| Sharing Model | Private |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Name | Name | Text | Primary identifier for the time entry |
| Billable | Billable__c | Checkbox | Whether this time entry is billable |
| Contact | Contact__c | Lookup (Contact) | The person who performed the work |
| Date | Date__c | Date | Date the work was performed |
| Legal Issue | Legal_Issue__c | Picklist | Legal issue or category associated with the work |
| Matter | Matter__c | Lookup | Link to the associated Matter |
| Narrative | Narrative__c | Text Area | Description of the work performed |
| Rate | Rate__c | Number | Billing rate for the time entry |
| Task | Task__c | Picklist | Task category for the work performed |
| Time | Time__c | Number | Hours or units of time recorded |

## Relationships

### Parent Objects
- Matter (via Matter__c lookup)
- Contact (via Contact__c lookup)

## Common Use Cases

1. **Time Tracking**
   - Recording hours worked on matters
   - Capturing work narratives for billing and reporting
   - Tracking billable vs. non-billable time

2. **Billing**
   - Calculating matter costs based on rate and time
   - Generating billing reports per matter or contact
   - Supporting invoice preparation

3. **Workload Analysis**
   - Analyzing time spent by matter, team member, or task type
   - Identifying resource utilization patterns
   - Supporting capacity planning

## Best Practices

1. **Time Entry**
   - Enter time entries promptly to ensure accuracy
   - Include clear narratives describing the work performed
   - Set the Billable flag correctly for each entry

2. **Rate Management**
   - Use consistent rates aligned with billing agreements
   - Review and update rates when billing terms change

3. **Reporting**
   - Use the Legal Issue and Task fields for detailed breakdowns
   - Build reports on time entries for matter cost analysis
