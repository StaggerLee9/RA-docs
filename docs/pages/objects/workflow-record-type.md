---
layout: default
title: Workflow Record Type
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 24
---

# Workflow Record Type (Workflow_Record_Type__c)

## Overview

The Workflow Record Type object defines record types available for workflows, specifying the conditions and templates associated with each workflow type. It helps manage the relationship between record types and workflow templates.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | Workflow_Record_Type__c |
| Label | Workflow Record Type |
| Plural Label | Workflow Record Types |
| Sharing Model | [Your sharing model] |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Record Type Developer Name | Record_Type_Developer_Name__c | Text | Developer name reference |
| Workflow Name | Workflow_Name__c | Formula | Template name reference |
| Workflow Template | Workflow_Template__c | Master-Detail | Link to workflow template |

## Key Features

- Record Type Management
- Template Association
- Developer Name Reference
- Formula Field Support

## Relationships

### Parent Objects
- Workflow Template (via Workflow_Template__c)

## Common Use Cases

1. **Record Type Configuration**
   - Template assignment
   - Type-specific workflows
   - Process configuration

2. **Workflow Management**
   - Type-based routing
   - Process configuration
   - Template association

3. **Process Control**
   - Access management
   - Process limitation
   - Type-specific behavior

## Best Practices

1. **Record Type Setup**
   - Clear naming conventions
   - Proper template association
   - Complete documentation

2. **Template Management**
   - Accurate associations
   - Regular verification
   - Proper configuration

3. **Maintenance**
   - Regular reviews
   - Update documentation
   - Verify associations