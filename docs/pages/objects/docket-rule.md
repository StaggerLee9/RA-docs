---
layout: default
title: Docket Rule
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 18
---

# Docket Rule (Docket_Rule__c)

## Overview

The Docket Rule object is used to define workflow rules and configurations that are automatically triggered when specific events or updates occur in the Docket object. This object is key to managing and automating docket-related activities, including filings, response deadlines, and the approval process.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | Docket_Rule__c |
| Label | Docket Rule |
| Plural Label | Docket Rules |
| Sharing Model | [Your sharing model] |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Docket Rule Name | Name | Auto-number | Unique identifier (e.g., "DR-0001") |
| Activity Rule | Activity_Rule__c | Lookup | Link to associated activity rule |
| Approval Process | Approval_Process__c | Text | Description of approval process |
| Date Type | Date_Type__c | Picklist | Business days or calendar days |
| Description | Description__c | Long Text Area | Detailed rule description |
| Filing Type | Filing_Type__c | Text | Type of filing (motion, order, hearing) |
| Response Date Days | Response_Date_Days__c | Number | Days allowed for response |
| Type | Type__c | Picklist | Order, Motion, Hearing, or Docket |

## Key Features

- Activity Rule Integration
- Approval Process Management
- Date Calculation Support
- Filing Type Management
- Response Deadline Tracking

## Relationships

### Related Objects
- Activity Rule (via Activity_Rule__c lookup)

## Common Use Cases

1. **Filing Management**
   - Automated deadline calculation
   - Response time tracking
   - Filing type organization

2. **Approval Workflows**
   - Process automation
   - Approval routing
   - Status tracking

3. **Timeline Management**
   - Deadline calculations
   - Response period tracking
   - Date management

## Best Practices

1. **Rule Configuration**
   - Clear rule definition
   - Proper activity rule association
   - Accurate date type selection

2. **Approval Process**
   - Well-defined workflows
   - Clear process documentation
   - Regular process review

3. **Date Management**
   - Accurate response periods
   - Proper date type selection
   - Regular timeline verification