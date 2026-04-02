---
layout: default
title: Docket Filing
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 39
---

# Docket Filing (Docket_Filing__c)

## Overview

The Docket Filing object represents an individual filing event within the docket management system. Filings track court documents, motions, orders, and other procedural entries that are recorded against a matter's docket.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | Docket_Filing__c |
| Label | Docket Filing |
| Plural Label | Docket Filings |
| Sharing Model | Controlled by Parent |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Name | Name | Text | Primary identifier for the filing record |

## Key Features

- Tracks individual filing events in the docket system
- Supports integration with Docket Rules for automated deadline calculation

## Relationships

### Related Objects
- Docket Rule (Docket_Rule__c) — rules that may generate or respond to filings

## Common Use Cases

1. **Court Docket Tracking**
   - Recording motions, orders, and hearing notices
   - Maintaining a chronological filing history
   - Linking filings to automated docket rules

2. **Deadline Management**
   - Triggering response deadlines based on filing type
   - Calculating due dates via associated Docket Rules

## Best Practices

1. **Filing Records**
   - Create a filing record for each docket event
   - Associate filings with the correct Docket Rules for deadline automation
