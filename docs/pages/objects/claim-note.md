---
layout: default
title: Claim Note
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 51
---

# Claim Note (Claim_Note__c)

## Overview

The Claim Note object captures free-text notes and annotations attached to a claim record. Notes are stored as a Master-Detail child of Claim, so visibility, ownership, and lifecycle inherit from the parent claim. Use Claim Notes for working narrative — adjuster commentary, status updates, internal observations, or reviewer feedback — that does not warrant its own structured object.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | Claim_Note__c |
| Label | Claim Note |
| Plural Label | Claim Notes |
| Name Field | Auto-number (`CN-{0000}`, label "Claim Note ID") |
| Sharing Model | ControlledByParent |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Claim Note ID | Name | Auto-number | Unique identifier for the note (format `CN-0000`) |
| Claim | Claim__c | Master-Detail | Parent claim that this note belongs to. Determines record-level access. |
| Type | Type__c | Picklist (restricted) | Categorizes the note for filtering and reporting purposes. Ships with the value `Claim Note`; subscriber admins may extend the picklist. |
| Note | Note__c | Long Text Area (32,768) | Free-text content of the note related to the claim. |

## Key Features

- Controlled Sharing: Visibility governed by the parent claim
- Activities Enabled: Track follow-up tasks and events on the note itself
- Reports Enabled: Surface notes in claim-centric reporting
- Search Enabled: Note content is searchable from global search
- Bulk API Enabled: Import or update notes at scale
- Streaming API Enabled: Subscribe to note changes via Platform Events / CDC
- History Tracking Disabled: Enable per-org if change-history retention is required

## Relationships

### Parent Objects
- Claim (via Claim__c master-detail)

### Child Objects
- None

## Common Use Cases

1. **Adjuster Commentary**
   - Capture working notes during claim review
   - Record decisions, follow-ups, and rationale
   - Provide an audit trail of judgment calls
2. **Status Updates**
   - Log timeline events as the claim progresses
   - Communicate context to teammates picking up the claim
   - Surface recent activity in dashboards and list views
3. **Reviewer Feedback**
   - Document supervisor or QA observations
   - Flag claims needing escalation or rework
   - Tie internal commentary back to the originating claim record

## Best Practices

1. **Categorize Through Type**
   - Extend the `Type__c` picklist to match your organization's note taxonomy (e.g., Adjuster, Supervisor, Legal, External)
   - Use restricted picklist values to keep reporting clean
   - Train users to select the correct type before saving
2. **Keep Notes Concise**
   - The 32,768-character limit is generous; longer narrative belongs in a structured object or document
   - Use one note per discrete observation rather than appending to a single long entry
   - Reserve formal correspondence for activity records or document attachments
3. **Inherit, Don't Redefine, Security**
   - Trust Master-Detail inheritance for record-level access
   - Adjust Field-Level Security on `Note__c` if certain note types contain sensitive content
   - Avoid building parallel sharing rules that could diverge from the parent claim
