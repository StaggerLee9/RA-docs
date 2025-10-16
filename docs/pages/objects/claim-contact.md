---
layout: default
title: Claim Contact
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 32
---

# Claim Contact (Claim_Contact__c)

## Overview

The Claim Contact object is a junction between claims and people involved in the claim process. It captures each participant’s role so teams can track claimants, beneficiaries, adjusters, and representatives from a single roster.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | Claim_Contact__c |
| Label | Claim Contact |
| Plural Label | Claim Contacts |
| Sharing Model | ControlledByParent |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Claim Contact Number | Name | Auto-number | Unique identifier for the junction record (format `CC-0000`) |
| Claim | Claim__c | Master-Detail | Parent claim record that the contact participates in |
| Contact | Contact__c | Lookup | Standard Contact associated to the claim |
| Role | Role__c | Picklist | Claim role classification (e.g., `Claimant`, `Beneficiary`) |

## Key Features

- Controlled Sharing: Inherits visibility from the parent claim
- Bulk API Enabled: Supports mass updates to participant rosters
- Search Enabled: Appears in global search results
- Reports Disabled: Surface participants via claim-level reports
- Activities Disabled: Leverage the parent claim for activity tracking

## Relationships

### Parent Objects
- Claim (via Claim__c master-detail)
- Contact (via Contact__c lookup)

### Child Objects
- None

## Common Use Cases

1. **Participant Tracking**
   - Maintain a complete list of stakeholders on each claim
   - Identify primary and secondary contacts
   - Support mail merges or notifications based on role
2. **Role-Based Workflows**
   - Trigger automation when specific roles are added
   - Drive assignment or approval routing from contact roles
   - Enforce data requirements for mandatory participants
3. **Reporting & Compliance**
   - Audit participant roles across claims
   - Monitor workloads for adjusters or representatives
   - Provide contact rosters for regulatory reviews

## Best Practices

1. **Role Governance**
   - Keep the Role picklist aligned with operational terminology
   - Use validation to require roles during claim intake
   - Archive deprecated roles to prevent data drift
2. **Data Hygiene**
   - Merge duplicate contacts before linking to claims
   - Periodically review inactive participants
   - Use automation to clean up records when claims close
3. **Security Considerations**
   - Leverage claim-level sharing for confidentiality
   - Review field-level security on sensitive contact data
   - Limit edit access to users responsible for claim coordination
