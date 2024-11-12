---
layout: default
title: Evidence
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 9
---

# Evidence (Evidence__c)

## Overview

The Evidence object is used to store and manage evidence related to investigations. This object tracks various types of evidence, including physical items and electronic data, and links the evidence to specific investigations.

## Object Details

| Aspect | Description |
|--------|-------------|
| API Name | Evidence__c |
| Label | Evidence |
| Plural Label | Evidence |
| Sharing Model | [Your sharing model] |

## Fields

| Field Name | API Name | Type | Description |
|------------|----------|------|-------------|
| Title | Title | Text | Primary identifier for evidence record |
| Category | Category__c | Picklist | Type of evidence (Drugs, Clothing, Weapon, Vehicle) |
| Description | Description__c | Text Area | Detailed description of the evidence |
| Investigation | Investigation__c | Lookup | Link to specific investigation |
| Quantity | Quantity__c | Number | Amount or quantity of evidence collected |
| Recovery Date | Recovery_Date__c | Date | When the evidence was recovered |
| Type | Type__c | Picklist | Classification (Physical Evidence, Electronic Data, Other) |

## Key Features

- Evidence tracking capabilities
- Investigation linkage
- Categorization support
- Quantity management
- Recovery date tracking

## Relationships

### Parent Objects
- Investigation (via Investigation__c lookup)

### Child Objects
- Evidence Contact (Evidence_Contact__c)

## Common Use Cases

1. **Evidence Management**
   - Tracking physical evidence
   - Managing electronic data
   - Recording evidence details

2. **Investigation Support**
   - Linking evidence to investigations
   - Managing evidence categories
   - Tracking recovery timeline

3. **Chain of Custody**
   - Recording evidence handling
   - Tracking evidence movement
   - Managing evidence access

## Best Practices

1. **Evidence Recording**
   - Detailed descriptions
   - Accurate categorization
   - Complete documentation

2. **Data Management**
   - Regular updates
   - Proper categorization
   - Accurate quantity tracking

3. **Investigation Linkage**
   - Proper association
   - Clear relationships
   - Complete documentation