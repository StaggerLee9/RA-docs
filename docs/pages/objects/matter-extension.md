---
layout: default
title: Extension
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 42
---

# Extension (Matter_Extension__c)

## Overview

The Extension object records extensions granted on a Matter, such as deadline extensions, filing extensions, or response period modifications. Each extension is linked to a specific Matter record.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | Matter_Extension__c |
| Label | Extension |
| Plural Label | Extensions |
| Sharing Model | Controlled by Parent |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Name | Name | Text | Primary identifier for the extension record |
| Matter | Matter__c | Lookup | Link to the associated Matter |

## Relationships

### Parent Objects
- Matter (via Matter__c lookup)

## Common Use Cases

1. **Deadline Management**
   - Recording extensions granted for filing deadlines
   - Tracking response period modifications
   - Maintaining an audit trail of timeline changes

2. **Compliance Tracking**
   - Documenting extension requests and approvals
   - Ensuring deadlines reflect current extensions

## Best Practices

1. **Extension Records**
   - Create extension records whenever a matter deadline is modified
   - Link all extensions to the correct parent Matter
   - Document the reason and duration of each extension
