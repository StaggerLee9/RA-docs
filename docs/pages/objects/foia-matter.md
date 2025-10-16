---
layout: default
title: FOIA Matter
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 30
---

# FOIA Matter (FOIA_Matter__c)

## Overview

The FOIA Matter object links FOIA requests to Recon Matter records, providing a junction that associates disclosure work with broader legal case management. It supports tracking of how requests intersect with active matters and enables reporting across both domains.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | FOIA_Matter__c |
| Label | FOIA Matter |
| Plural Label | FOIA Matters |
| Sharing Model | ControlledByParent |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| FOIA Matter Number | Name | Auto-number | Junction identifier (format `FM-0000`) |
| FOIA | FOIA__c | Master-Detail | Parent FOIA request associated to the matter |
| Matter | Matter__c | Lookup | Related Matter (Set Null on delete) |
| Type | Type__c | Picklist | Relationship classification (admin-defined values) |
| Note | Note__c | Long Text Area | Free-form notes about the request–matter linkage |

## Key Features

- Activities Enabled: Track collaborative tasks on the junction record
- Reports Enabled: Included in analytics for cross-object reporting
- Search Enabled: Records are discoverable in global search
- Controlled Sharing: Inherits visibility from the parent FOIA request
- Bulk API Enabled: Supports high-volume data operations

## Relationships

### Parent Objects
- FOIA (via FOIA__c master-detail)
- Matter (via Matter__c lookup)

### Child Objects
- None

## Common Use Cases

1. **Cross-Record Visibility**
   - Identify which matters triggered FOIA activity
   - Provide investigators with request context
   - Coordinate disclosures alongside matter actions
2. **Operational Reporting**
   - Analyze FOIA workload by matter type
   - Track outstanding requests per matter
   - Assess resource needs across teams
3. **Documentation Management**
   - Capture notes linking FOIA content to matter facts
   - Record collaboration details between teams
   - Maintain a unified timeline of disclosure and matter events

## Best Practices

1. **Relationship Accuracy**
   - Validate that each junction connects the correct FOIA and Matter records
   - Clean up unused junctions when matters close
   - Use reports to catch records missing a matter link
2. **Workflow Integration**
   - Leverage activities to assign follow-up work
   - Align Type values with internal tracking needs
   - Monitor deletions of related matters to avoid orphaned context
3. **Documentation Quality**
   - Use the Note field for succinct collaboration updates
   - Reference supporting documents stored on parent records
   - Review junction records during closeout to ensure completeness
