---
layout: default
title: FOIA Exemption
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 29
---

# FOIA Exemption (FOIA_Exemption__c)

## Overview

The FOIA Exemption object records the statutory exemptions invoked when withholding information from release. Linking exemptions directly to a request provides transparency into redaction decisions and supports compliance reviews.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | FOIA_Exemption__c |
| Label | FOIA Exemption |
| Plural Label | FOIA Exemptions |
| Sharing Model | ControlledByParent |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| FOIA Exemption Number | Name | Auto-number | System-generated identifier (format `FE-0000`) |
| FOIA | FOIA__c | Master-Detail | Parent FOIA request where the exemption is applied |

## Key Features

- Controlled Sharing: Visibility follows the parent FOIA record
- Streaming API: Emits events for integrations
- Bulk API Enabled: Included in import/export jobs
- Search Enabled: Discover exemptions through global search
- Reports Disabled: Utilize FOIA-level reporting for exemption analysis

## Relationships

### Parent Objects
- FOIA (via FOIA__c master-detail)

### Child Objects
- None

## Common Use Cases

1. **Redaction Documentation**
   - Capture the legal basis for withheld content
   - Describe exemptions used during review
   - Prepare decision logs for future reference
2. **Appeal Support**
   - Provide details during administrative appeals
   - Share exemption rationale with legal stakeholders
   - Trace exemption history across related matters
3. **Compliance Monitoring**
   - Track frequency of exemption usage
   - Identify patterns that require policy updates
   - Inform training or process refinement

## Best Practices

1. **Accurate Classification**
   - Align exemption naming with statutory language
   - Include supporting notes or evidence in related records
   - Periodically review exemptions for accuracy
2. **Parent Integrity**
   - Ensure every exemption is tied to the correct FOIA request
   - Review dependent exemptions before deleting FOIA records
   - Use reports to surface orphaned or incomplete entries
3. **Audit Readiness**
   - Maintain clear documentation for each exemption decision
   - Coordinate with legal teams to validate exemption usage
   - Schedule regular audits to confirm compliance
