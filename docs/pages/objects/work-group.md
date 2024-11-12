---
layout: default
title: Work Group
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 8
---

# Work Group (Work_Group__c)

## Overview

The Work Group object represents groups assigned to a Matter or other detail records. It is often used to implement sharing rules, enabling associations between the name of a work group and a public group to manage access and permissions effectively.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | Work_Group__c |
| Label | Work Group |
| Plural Label | Work Groups |
| Sharing Model | ReadWrite |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Work Group Name | Name | Auto-number | Unique identifier (e.g., "WG-0001") |
| Matter | Matter__c | Lookup | Link to Matter record |
| Permission | Permission__c | Picklist | Access level (Read, Edit, No Access) |
| [Additional fields based on your implementation] |

## Key Features

- Reports Enabled: Yes
- Search Disabled: Yes
- Sharing Model: ReadWrite
- Mobile Support: Both Large and Small form factors
- Full action support

## Relationships

### Related Objects
- Matter (via Matter__c lookup)

## Common Use Cases

1. **Access Management**
   - Managing team access
   - Controlling record visibility
   - Implementing sharing rules

2. **Team Organization**
   - Grouping team members
   - Managing work assignments
   - Organizing matter access

3. **Permission Control**
   - Setting access levels
   - Managing group permissions
   - Controlling data visibility

## Best Practices

1. **Group Management**
   - Clear group naming conventions
   - Regular permission reviews
   - Accurate group maintenance

2. **Access Control**
   - Regular permission audits
   - Clear documentation
   - Consistent application

3. **Team Structure**
   - Logical group organization
   - Clear hierarchy
   - Regular updates