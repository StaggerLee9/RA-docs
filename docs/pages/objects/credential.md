---
layout: default
title: Credential
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 50
---

# Credential (Credential__c)

## Overview

The Credential object stores structured credential records for a Contact — certifications, licenses, bar admissions, security clearances, and any other formal qualification an organization needs to track against a person. Credential is a master-detail child of Contact, so credentials inherit the parent Contact's sharing and are owned by the Contact's lifecycle.

The object is built to be configurable. Credential schemas vary widely across legal, government, investigative, and regulated-industry use cases, so the package provides the relationship, sharing model, and reporting plumbing and lets each customer add the specific fields, picklists, validation rules, and record types their compliance regime requires.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | Credential__c |
| Label | Credential |
| Plural Label | Credentials |
| Name Field | AutoNumber (CRED-{0000}) |
| Sharing Model | Controlled by Parent |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Credential ID | Name | AutoNumber | Auto-generated unique identifier (CRED-0000 format) |
| Contact | Contact__c | Master-Detail (Contact) | Parent Contact this credential belongs to. Master-detail so credentials inherit parent sharing and are deleted with the Contact. |

## Key Features

- History tracking enabled — every change to a credential is auditable
- Reporting supported — credentials can be reported on alongside their parent Contact
- Search enabled — credentials are findable from global search
- Bulk API and Streaming API enabled — supports mass loads and event-driven integrations
- Sharing controlled by parent Contact — no separate sharing rules required

## Relationships

### Parent Objects
- Contact (via Contact__c master-detail) — relationship name `Credentials`

### Child Objects
None.

## Configurability

Because credential schemas differ significantly between organizations and matter types, the package intentionally does not impose a fixed shape. Customers and partners are expected to extend the object with the fields appropriate to their domain. Common extension fields include:

- **Type / Category** (picklist) — e.g., Bar Admission, License, Certification, Clearance, Training
- **Issuing Authority** (text or lookup) — the body that issued the credential
- **Credential Number** (text) — license, badge, or registration number
- **Issue Date** (date) — when the credential was granted
- **Expiration Date** (date) — when it lapses; pair with a flow or reminder
- **Status** (picklist) — Active, Expired, Suspended, Revoked
- **Verification Date / Verified By** (date / lookup) — for organizations that periodically re-verify
- **Jurisdiction / State** (picklist or lookup to State) — for licenses tied to geography
- **Attachments / Document Profile** (lookup to ReconDMS Document Profile) — to attach the credential's source document

Adding fields, record types, and validation rules in the subscriber org is fully supported and does not affect package upgrades.

## Common Use Cases

1. **Attorney Bar Admissions**
   - Tracking which state and federal bars an attorney is admitted to
   - Recording admission dates and bar numbers
   - Flagging credentials approaching expiration or annual renewal

2. **Investigator Certifications**
   - Storing professional certifications (CFE, CPP, PI license, polygraph examiner)
   - Capturing continuing-education credits required to maintain certification
   - Auditing investigator qualifications when staffing a sensitive matter

3. **Security Clearances**
   - Recording clearance level (Public Trust, Secret, Top Secret, SCI)
   - Tracking sponsoring agency, grant date, and periodic re-investigation date
   - Restricting matter assignment based on the assignee's current clearance

4. **Professional Licenses**
   - Tracking medical, engineering, accounting, or notary licenses for expert witnesses
   - Recording jurisdiction and license number for subpoena and disclosure purposes
   - Flagging when a license must be re-verified before relying on the expert

5. **Training and Compliance Credentials**
   - Capturing required training (HIPAA, FERPA, CJIS, ethics, anti-harassment)
   - Reporting on team-wide compliance posture for audits and accreditation
   - Driving a workflow that blocks matter assignment when required training is overdue

6. **Vendor and Partner Qualification**
   - Recording credentials of outside counsel, expert witnesses, and contracted investigators
   - Capturing insurance, bonding, or background-check status against a vendor Contact
   - Surfacing vendor qualification data on a matter-team or investigation-staffing screen

7. **Claims Round-Robin Auto-Assignment**
   - Feeding a claims auto-assignment engine that routes incoming claims to the right adjuster based on specialty, certification, or jurisdiction credentials
   - Filtering candidate assignees by required credentials (e.g., licensed in the claim's state, certified for a specific claim type) before applying urgency and capacity rules
   - Excluding adjusters whose required credential is expired, suspended, or pending re-verification, so claims never route to someone unqualified to work them

## Best Practices

1. **Define a Type taxonomy early**
   - Decide your credential categories before bulk-loading data
   - Use a restricted picklist for Type to keep reporting clean
   - Add record types if different credential categories need different fields or layouts

2. **Plan for expiration**
   - If you add an Expiration Date, build a flow or scheduled report that surfaces upcoming lapses
   - Consider a Status picklist with an Expired value driven by a formula or scheduled flow
   - Pair credentials with notification rules so matter teams are warned before a credential lapses

3. **Use master-detail behavior intentionally**
   - Credentials inherit Contact sharing — confirm Contact access policies before deciding whether sensitive credentials (e.g., clearances) should live here or in a more restricted custom object
   - Deleting a Contact deletes all its credentials; archive Contacts rather than deleting if you need to retain credential history

4. **Attach source documents via ReconDMS**
   - For organizations using ReconDMS, add a lookup to `ReconDMS__Document_Profile__c` so the scanned license, certificate, or clearance letter is one click away
   - Keeps the credential record lightweight while preserving the underlying evidence

5. **Avoid storing free-text where a lookup belongs**
   - For Issuing Authority, prefer a lookup to Account or a custom Authority object over free text
   - Improves reporting, reduces duplicates, and supports authority-level analytics
