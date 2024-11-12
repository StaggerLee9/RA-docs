---
layout: default
title: Workflow
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 22
---

# Workflow (Workflow__c)

## Overview

The Workflow object manages individual workflows, including their status, associated approvers, and other workflow-related details. It provides a framework for tracking and managing approval processes and workflow states.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | Workflow__c |
| Label | Workflow |
| Plural Label | Workflows |
| Sharing Model | [Your sharing model] |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Date | Date__c | Date | Workflow initiation/action date |
| Description | Description__c | Text Area | Internal workflow description |
| Initial Approver | Initial_Approver__c | Lookup (User) | First approver in workflow |
| Investigation | Investigation__c | Lookup | Related investigation record |
| Matter | Matter__c | Lookup | Related matter record |
| Parameter 1 | Parameter_1__c | Text | System-specific workflow parameter |
| Request | Request__c | Lookup | Related request record |
| Status | Status__c | Picklist | Current state (Not Submitted, Submitted, Approved, Rejected) |
| Workflow Template | Workflow_Template__c | Lookup | Link to base template |
| Workflow Type | Workflow_Type__c | Text | Template-derived type |

## Key Features

- Approval Process Management
- Status Tracking
- Multiple Object Integration
- Template-based Configuration
- Parameter Support

## Relationships

### Related Objects
- User (via Initial_Approver__c)
- Investigation (via Investigation__c)
- Matter (via Matter__c)
- Request (via Request__c)
- Workflow Template (via Workflow_Template__c)

## Common Use Cases

1. **Approval Process Management**
   - Managing approval workflows
   - Tracking approval status
   - Routing approvals

2. **Process Automation**
   - Workflow execution
   - Status updates
   - Automated routing

3. **Record Processing**
   - Matter workflows
   - Investigation processes
   - Request handling

## Best Practices

1. **Workflow Configuration**
   - Clear process definition
   - Proper template selection
   - Accurate parameter setting

2. **Status Management**
   - Regular status updates
   - Clear state transitions
   - Proper documentation

3. **Approver Management**
   - Clear approver designation
   - Proper routing setup
   - Backup approver configuration