---
layout: default
title: Workflow System
---

# Recon Workflow System Documentation

## Executive Summary

The **Recon Workflow System** is a core component of Recon Matter Management, enabling streamlined management and automation of workflows within Salesforce. This system leverages `Workflow__c`, `Workflow_Template__c`, and `Workflow_RecordType__c` objects, along with specialized flows, to handle various stages of workflow approvals, record updates, and compliance management. 

This system provides users with seamless options for initiating, tracking, and completing workflow actions based on Matter updates or approvals. With a focus on compliance, efficiency, and ease of use, the Recon Workflow System automates key actions to ensure users have up-to-date, accurate, and actionable information.

---

## Sample Use Cases

### Use Case 1: Automatic Stage Advancement Upon Matter Approval

**Scenario:** A legal team member needs a Matter’s stage to advance automatically upon approval.

**Workflow System in Action:**
1. **Workflow - After Save** flow verifies the updated status and automatically adjusts the Matter stage to "Preliminary Inquiry" or "Research and Writing" based on defined parameters.
2. **Workflow Selection Screen** flow filters relevant Workflow Templates for the user based on the Matter’s record type, guiding users through selecting and submitting the appropriate approval.

**Outcome:** Automation of stage advancement reduces manual updates, ensuring the Matter reflects the latest approved stage without manual intervention.

### Use Case 2: Streamlined Record-Type Specific Workflow Selection

**Scenario:** An administrator configures workflows for specific Matter record types to guide users toward the correct templates.

**Workflow System in Action:**
1. **Workflow Selection Screen** flow dynamically filters Workflow Templates based on the record type of the Matter, presenting only the relevant workflow options.
2. **Get_Workflow_Record_Type** action filters templates to include only those associated with the selected Matter type.

**Outcome:** Users see only the workflows applicable to their Matter’s record type, reducing complexity and guiding them toward the correct workflow for their cases.

### Use Case 3: Automated Handling of Criminal Matter Approvals

**Scenario:** Certain Matters categorized as criminal require additional verification steps and limited workflow options.

**Workflow System in Action:**
1. **Workflow - After Save** flow evaluates Matter parameters and directs records to a criminal-specific workflow if `Section__c` is "CRM".
2. Decision nodes like **Check_if_Criminal_Matter** and **Check_if_Matter_is_Criminal_and_not_a_Record_Modification** ensure appropriate workflows are triggered and prevent non-compliant modifications.

**Outcome:** Automated validation and selection for criminal matters guide users through approved paths, maintaining workflow integrity and compliance.

---

## Flow Summaries

### Workflow - After Save

**Purpose:** Automates updates and stage transitions upon saving a `Workflow__c` record.
**Functionality:** This flow uses decision logic to evaluate updates (e.g., status changes, parameter updates), directing actions like advancing the Matter stage to "Preliminary Inquiry" or "Research and Writing" as conditions are met.

### Workflow Selection Screen

**Purpose:** Presents users with the Workflow Template options filtered by the Matter’s record type.
**Functionality:** This flow dynamically filters templates based on the record type and checks if a workflow template is active, streamlining the selection process. It also handles submission of new workflow records for approval, manages error handling, and updates Matters where applicable.

---

## Key Decisions and Actions

1. **Check for Next Action:** Determines appropriate stage progression (e.g., "Preliminary Inquiry," "Research and Writing") based on Matter parameters.
2. **Status Check:** Triggers workflows when Matter status is approved.
3. **Assign Workflow Values:** Sets values (e.g., `Workflow_Template__c`, `Initial_Approver__c`) to new workflow records, supporting approval actions.
4. **Error Handling:** Redirects to error screens and deletes orphan workflow records if submission fails, ensuring data integrity.
5. **Get Workflow Record Type:** Filters workflow templates by record type to guide users to relevant workflows.

---

## Objects Overview

- **Workflow__c:** Core workflow object managing status, approvers, and parameters for tracking workflow progress.
- **Workflow_Template__c:** Template library for available workflows, filtered by record type to control user selection and guide approval actions.
- **Workflow_RecordType__c:** Categorizes workflows by Matter record type, enabling workflow customization for each Matter type and ensuring workflows are relevant to the user’s case.

---

## System Components

- **Approval Submissions:** The **Workflow Selection Screen** flow submits workflows for approval, handling both Matter updates and tracking associated approvals.
- **Dynamic Filtering:** Workflow Templates are filtered by record type to ensure that users only see workflows relevant to their Matter type.
- **Error Management:** Integrated error screens in the **Workflow Selection Screen** flow notify users of any issues and ensure that incomplete records are cleaned up.

This documentation provides a cohesive overview of the Recon Workflow System, detailing its purpose, structure, and use cases to support legal workflow management within Recon Matter Management.
