---
layout: default
title: Request
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 19
---

# Request (Request__c)

## Overview

The Request object manages new requests to the legal department. It serves as an intake system for various types of legal requests including contract requests, legal issue reviews, or complaints created through external portals. After review, requests can be promoted into Investigations or Matters.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | Request__c |
| Label | Request |
| Plural Label | Requests |
| Sharing Model | Private |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Request | Name | Text | Primary identifier for request |
| Description | Description__c | Text (255) | Details about the request |
| Received | Received__c | Date | When request was received |
| Stage | Stage__c | Picklist | Current stage of request |
| Status | Status__c | Picklist | Open (default) or Closed |
| Type | Type__c | Picklist | Request categorization |

## Key Features

- Activities Enabled: Yes
- Reporting: Supported
- Bulk API: Enabled
- Streaming API: Enabled
- Search: Custom search layout
- Chatter Feed: Disabled
- History Tracking: Disabled

## Relationships

### Child Objects
- Matter (Matter__c)
- Investigation (Investigation__c)

## Common Use Cases

1. **Legal Request Intake**
   - Initial request processing
   - Request categorization
   - Initial assessment

2. **Matter Creation**
   - Request to matter conversion
   - Investigation initiation
   - Case tracking

3. **Request Management**
   - Status tracking
   - Stage progression
   - Request routing

## Best Practices

1. **Request Processing**
   - Prompt initial review
   - Accurate categorization
   - Complete documentation

2. **Status Management**
   - Regular status updates
   - Clear stage progression
   - Timely closure

3. **Data Quality**
   - Detailed descriptions
   - Accurate received dates
   - Proper type classification