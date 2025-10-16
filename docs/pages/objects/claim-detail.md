---
layout: default
title: Claim Detail
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 33
---

# Claim Detail (Claim_Detail__c)

## Overview

The Claim Detail object stores supporting information tied to a claim, such as itemized damages, claim justifications, or references to evidence. Use it to maintain structured context that complements the high-level claim record.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | Claim_Detail__c |
| Label | Claim Detail |
| Plural Label | Claim Details |
| Sharing Model | ControlledByParent |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Claim Detail Number | Name | Auto-number | Unique identifier for the detail entry (format `CD-0000`) |
| Claim | Claim__c | Master-Detail | Parent claim that this supporting detail belongs to |

> Add custom fields (e.g., amount, category, notes) to tailor claim details to your organization’s workflows.

## Key Features

- Controlled Sharing: Visibility governed by the parent claim
- Bulk API Enabled: Import or update supporting details at scale
- Search Enabled: Detail records appear in global search
- Reports Disabled: Report through claim-centric datasets
- Activities Disabled: Track tasks on the parent claim

## Relationships

### Parent Objects
- Claim (via Claim__c master-detail)

### Child Objects
- None

## Common Use Cases

1. **Damage Breakdown**
   - Itemize financial impacts or loss categories
   - Track adjustments, settlements, or reserves
   - Provide transparency for finance and audit teams
2. **Evidence Catalog**
   - Reference documents, exhibits, or notes supporting the claim
   - Record review outcomes from investigators
   - Link back to repositories via external IDs
3. **Process Documentation**
   - Log negotiation steps or communication summaries
   - Capture compliance checkpoints for regulated claims
   - Provide narrative context for downstream matter work

## Best Practices

1. **Consistent Taxonomy**
   - Establish picklists for detail categories and statuses
   - Align fields with reporting requirements
   - Train users on naming conventions for clarity
2. **Lifecycle Hygiene**
   - Archive or close detail records when claims resolve
   - Validate required fields before moving claims to the next stage
   - Automate reminders for stale detail entries
3. **Security Alignment**
   - Ensure FLS matches the sensitivity of stored information
   - Restrict edit access to claim owners or designated coordinators
   - Monitor sharing inheritance to protect confidential data
