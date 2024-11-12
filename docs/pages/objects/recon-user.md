---
layout: default
title: Recon User (Contact)
parent: Objects
grand_parent: Object Reference
has_toc: true
nav_order: 26
---

# Recon User (Recon_User__c) -- Standard Contact Object

## Overview

The Recon User field is a lookup field added to the standard Contact object in Salesforce. It creates a direct link between a Contact record and a User record within ReconMMS, enabling a more unified view of user-related information for end-users.

## Field Details

| Aspect | Description |
|--------|-------------|
| API Name | Recon_User__c |
| Field Label | Recon User |
| Field Type | Lookup (User) |
| Parent Object | Contact (Standard) |

## Field Properties

| Property | Value |
|----------|--------|
| Data Type | Lookup |
| Referenced Object | User |
| Required | No |
| Inline Help Text | Link between this Contact and a User Record |

## Purpose

The Recon User field serves to:
- Link Contact records to User records
- Provide a unified view of Contact and User data
- Streamline access to information
- Prevent confusion between Contact and User records

## Common Use Cases

1. **User Association**
   - Linking Contacts to System Users
   - Managing user relationships
   - Contact-User synchronization

2. **Access Management**
   - User identification
   - Permission management
   - System access control

3. **Data Integration**
   - Contact-User data alignment
   - Information synchronization
   - Record association

## Best Practices

1. **Field Population**
   - Verify User associations
   - Maintain accurate links
   - Regular verification

2. **Data Management**
   - Keep associations current
   - Regular audits
   - Clean data maintenance

3. **System Integration**
   - Proper relationship setup
   - Clear documentation
   - Regular validation

## Relationships

### Parent Object
- Contact (Standard Salesforce Object)

### Referenced Object
- User (Standard Salesforce Object)

## Implementation Notes

1. **Setup**
   - Added to standard Contact object
   - Configured for User lookup
   - Help text configured

2. **Maintenance**
   - Regular relationship verification
   - User association updates
   - Data quality checks

3. **Usage**
   - Clear association guidelines
   - Regular user validation
   - Relationship management