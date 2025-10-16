---
layout: default
title: FOIA Authority
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 28
---

# FOIA Authority (FOIA_Authority__c)

## Overview

The FOIA Authority object catalogs the statutes, regulations, policies, or court orders that justify how a FOIA request is processed. Each record documents the legal basis applied to a specific request so reviewers can reference the governing authority throughout the disclosure workflow.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | FOIA_Authority__c |
| Label | FOIA Authority |
| Plural Label | FOIA Authorities |
| Sharing Model | ControlledByParent |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| FOIA Authority Number | Name | Auto-number | Unique identifier (format `FA-0000`) |
| FOIA | FOIA__c | Master-Detail | Parent FOIA request that the authority applies to |

## Key Features

- Controlled Sharing: Visibility inherits from the parent FOIA record
- Streaming API: Supports change notifications
- Bulk API Enabled: Included in bulk data operations
- Search Enabled: Records appear in global search results
- Activities Disabled: Authority records rely on parent FOIA activities

## Relationships

### Parent Objects
- FOIA (via FOIA__c master-detail)

### Child Objects
- None

## Common Use Cases

1. **Legal Basis Tracking**
   - Document statutes or regulations cited during review
   - Provide quick reference for disclosure decisions
   - Maintain an audit trail for compliance reviews
2. **Case Preparation**
   - Supply legal teams with governing authorities
   - Support appeals or litigation responses
   - Share authority references with stakeholders
3. **Operational Reporting**
   - Analyze frequently used authorities
   - Identify trends in exemption rationale
   - Support training and policy updates

## Best Practices

1. **Authority Documentation**
   - Use clear naming conventions when capturing citations
   - Include references to specific sections or clauses in supporting materials
   - Keep authority entries aligned with organizational policy
2. **Parent Link Integrity**
   - Always associate authorities to the correct FOIA request
   - Avoid deleting parent requests without reviewing dependent authorities
   - Leverage report filters to surface unlinked records
3. **Review Collaboration**
   - Reference authority records in team discussions
   - Update supporting documentation as regulations evolve
   - Periodically audit authorities for accuracy and completeness
