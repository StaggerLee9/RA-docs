---
layout: default
title: FOIA
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 27
---

# FOIA (FOIA__c)

## Overview

The FOIA object tracks Freedom of Information Act requests from intake through resolution. It captures the critical dates, status, and classification details needed to manage disclosures and coordinate review activities across the organization.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | FOIA__c |
| Label | FOIA |
| Plural Label | FOIA |
| Sharing Model | ReadWrite (external sharing: Private) |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| FOIA Number | Name | Auto-number | System-generated request identifier (format `F-0000`) |
| Description | Description__c | Long Text Area | Summary of the request scope or documents sought |
| Received Date | Received_Date__c | Date | Original date the request was received |
| Due Date | Due_Date__c | Date | Target response date based on statutory deadlines |
| Stage | Stage__c | Picklist | Internal processing stage (default `Stage 1`) |
| Status | Status__c | Picklist | Operational status (`Open`, `Closed`) |
| Type | Type__c | Picklist | Classification of request (admin-defined values) |

## Key Features

- Activities Enabled: Supports task and event tracking
- Reports Enabled: Available for analytics and dashboards
- Search Enabled: Records indexed for global search
- Streaming API: Emits change events for integrations
- Mobile Ready: Standard Lightning record pages for all form factors

## Relationships

### Parent Objects
- None

### Child Objects
- FOIA Authority (via FOIA_Authorities master-detail)
- FOIA Exemption (via FOIA_Exemptions master-detail)
- FOIA Matter (via FOIA_Matters master-detail)

## Common Use Cases

1. **Request Intake**
   - Log new FOIA submissions
   - Capture key dates and request descriptions
   - Assign ownership for processing
2. **Fulfillment Tracking**
   - Monitor progress through review stages
   - Flag approaching deadlines
   - Coordinate exemptions and releases
3. **Reporting & Compliance**
   - Report on backlog and closure rates
   - Track exemption usage trends
   - Support statutory compliance reviews

## Best Practices

1. **Consistent Naming**
   - Use the auto-number as the primary identifier
   - Reference the FOIA number in related correspondence
   - Avoid manual edits to the Name field
2. **Stage & Status Management**
   - Keep Stage aligned with internal workflow checkpoints
   - Update Status promptly when closing requests
   - Monitor overdue requests via reports
3. **Related Records**
   - Link relevant FOIA Authorities and Exemptions
   - Connect associated Matters through FOIA Matters
   - Use activities to document communication history
