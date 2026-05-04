---
layout: default
title: Claim
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 31
---

# Claim (Claim__c)

## Overview

The Claim object stores high-level information about legal or administrative claims being managed in Recon solutions. It anchors related contacts, documentation, and supporting details so teams can coordinate investigation and resolution activities.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | Claim__c |
| Label | Claim |
| Plural Label | Claims |
| Sharing Model | ReadWrite (external sharing: Private) |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Claim Number | Name | Auto-number | System-generated identifier for each claim record (format `C-0000`) |

> Additional claim metadata (status, amounts, dates, etc.) is delivered through managed package fields. Review your org’s field list for the complete configuration.

## Key Features

- Search Enabled: Claims are indexed for global search
- Streaming API: Publishes change events for integrations
- Bulk API Enabled: Supports data import/export jobs
- Reports Disabled: Use related reporting objects or enable as needed
- Activities Disabled: Track tasks and events through related records

## Relationships

### Parent Objects
- None

### Child Objects
- Claim Contact (via Claim_Contacts master-detail)
- Claim Detail (via Claim_Details master-detail)
- Claim Note (via Claim_Notes master-detail)

## Common Use Cases

1. **Intake & Registration**
   - Record new claims as they are reported
   - Assign unique claim numbers automatically
   - Capture initial context for downstream teams
2. **Collaboration Hub**
   - Link participants through Claim Contacts
   - Store supporting documentation via Claim Details
   - Provide a centralized record for cross-team updates
3. **Lifecycle Tracking**
   - Coordinate claim status through related automation
   - Surface claims in dashboards and queueing tools
   - Feed downstream matter or case management workflows

## Best Practices

1. **Reference Integrity**
   - Ensure every supporting record (contacts, notes, details) references the correct claim
   - Use reports to detect orphaned child records
2. **Field Governance**
   - Periodically review managed package fields to align with operational needs
   - Hide unused fields from layouts to keep forms streamlined
3. **Security & Sharing**
   - Confirm org-wide defaults and sharing rules protect sensitive claim data
   - Use field-level security to restrict financial or personally identifiable information
