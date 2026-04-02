---
layout: default
title: Matter Team
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 43
---

# Matter Team (Matter_Team__c)

## Overview

The Matter Team object manages team membership for a Matter, defining which users or groups have access to and responsibility for a specific matter. This object supports sharing and collaboration across matter participants.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | Matter_Team__c |
| Label | Matter Team |
| Plural Label | Matter Teams |
| Sharing Model | Private |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Name | Name | Text | Primary identifier for the team member record |

## Key Features

- Team-based matter access control
- Supports Salesforce sharing rules for matter visibility

## Relationships

### Related Objects
- Matter (Matter__c) — the matter this team membership applies to

## Common Use Cases

1. **Access Control**
   - Granting matter access to specific users or teams
   - Managing matter visibility across organizational units
   - Supporting private sharing models with explicit team membership

2. **Collaboration**
   - Identifying team members working on a matter
   - Supporting workload distribution and reporting

## Best Practices

1. **Team Management**
   - Add team members when a matter is created or reassigned
   - Remove team members when they are no longer involved
   - Review team membership during matter lifecycle transitions
