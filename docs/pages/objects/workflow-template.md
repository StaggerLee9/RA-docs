---
layout: default
title: Workflow Template
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 23
---

# Workflow Template (Workflow_Template__c)

## Overview

The Workflow Template object establishes a framework for creating workflows with predefined conditions, statuses, and required actions. It serves as a blueprint for workflow creation and management.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | Workflow_Template__c |
| Label | Workflow Template |
| Plural Label | Workflow Templates |
| Sharing Model | [Your sharing model] |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Active | Active__c | Checkbox | Template availability status |
| Approval Process Developer Name | Approval_Process_Developer_Name__c | Text | Developer name reference |
| Approval Process Filter | Approval_Process_Filter__c | Text | Filter for approval processes |
| Description | Description__c | Text Area | Template description |
| Help Text | Help_Text__c | Text | User guidance content |
| Limited to Record Type | Limited_to_Record_Type__c | Summary | Count of associated record types |
| Require Document | Require_Document__c | Checkbox | Document requirement flag |
| Workflow Type | Workflow_Type__c | Picklist | Template category/purpose |

## Key Features

- Template Management
- Process Configuration
- Document Requirements
- Record Type Limitations
- Help Text Support

## Relationships

### Child Objects
- Workflow (Workflow__c)
- Workflow Record Type (Workflow_Record_Type__c)

## Common Use Cases

1. **Process Definition**
   - Workflow standardization
   - Process templating
   - Configuration management

2. **Approval Process Management**
   - Process definition
   - Approval routing
   - Document requirements

3. **Record Type Control**
   - Access control
   - Process limitation
   - Type-specific workflows

## Best Practices

1. **Template Configuration**
   - Clear descriptions
   - Comprehensive help text
   - Proper type classification

2. **Process Definition**
   - Clear requirements
   - Proper documentation
   - Regular review

3. **Maintenance**
   - Regular updates
   - Active status management
   - Documentation updates