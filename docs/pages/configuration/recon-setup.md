---
layout: default
title: ReconMMS Setup
parent: Configuration Guide
nav_order: 3
---

# ReconMMS Setup Guide

# Recon Configuration Overview

## Introduction
Recon Matter Management is a native Salesforce package tailored for legal departments in government agencies. It provides a flexible and scalable solution for tracking and managing legal cases, referred to as "matters." This guide outlines best practices for configuring the package, focusing on aligning the setup with different legal practice areas, using Salesforce Flow for automation, and creating effective reports and dashboards.

## Configuring Fields and Screens for Practice Areas
The configuration of fields and page layouts should reflect the specific legal practice areas encountered in the implementation. Different legal departments may handle a variety of case types, such as litigation, compliance, contracts, or investigations. Customizing the Matter object and related records to meet these needs ensures a user-friendly experience and maximizes system adoption.

### Practice Area-Specific Field Configuration
1. **Litigation Fields**:
   - Create custom fields like **"Case Type"**, **"Jurisdiction"**, and **"Court Date"** to capture relevant litigation details.
   - Add picklist options for **"Stage"** (e.g., "Discovery," "Pre-Trial," "Trial") and **"Outcome"** (e.g., "Settled," "Dismissed," "Judgment").

2. **Compliance Fields**:
   - Add fields such as **"Regulation Type"**, **"Audit Date"**, and **"Compliance Status"** to track compliance-related matters.
   - Use a picklist for **"Compliance Category"** (e.g., "Financial," "Environmental," "Data Privacy") to standardize reporting.

3. **Contract Management Fields**:
   - Include fields like **"Contract Type"**, **"Effective Date"**, and **"Renewal Date"** to manage contract details.
   - Add a checkbox field for **"Requires Legal Review"** to indicate contracts that need additional scrutiny.

4. **Investigation Fields**:
   - Create fields such as **"Investigation Type"**, **"Lead Investigator"**, and **"Evidence Status"**.
   - Utilize a multi-select picklist for **"Investigation Focus"** (e.g., "Internal Misconduct," "Fraud," "Regulatory Breach").

### Customizing Page Layouts and Record Types
- **Record Types**: Create distinct record types for different practice areas (e.g., "Litigation," "Compliance," "Contracts," "Investigations"). This allows for tailored page layouts and field visibility.
- **Page Layouts**: Customize the page layout for each record type to display only the fields relevant to that practice area. For instance, the "Litigation" layout could prioritize court details and hearing dates, while the "Compliance" layout could focus on audit and regulatory information.
- **Dynamic Forms**: Leverage Salesforce Dynamic Forms to display specific fields based on the user’s role or the status of the Matter. This improves usability by reducing clutter and ensuring that users see only relevant information.

**Best Practice**: Regularly review and update custom fields and page layouts as the organization’s needs evolve. Engage with end-users to gather feedback on what fields are most useful for their specific workflows.

## Automating Workflows with Salesforce Flow
Salesforce Flow is the preferred tool for automating processes within Recon Matter Management. It enables the creation of complex, no-code workflows that reduce manual effort and streamline case management.

### Automating Task Creation
**Objective**: Generate standard tasks based on the Matter Type when a new Matter record is created.

**Configuration Steps**:
1. Create a **Record-Triggered Flow** on the Matter object, set to run when a new record is created.
2. Add a **Decision Element** to branch the flow based on the Matter Type (e.g., Litigation, Compliance).
3. Use the **Create Records** element to generate tasks such as "Document Review" or "Initial Client Meeting," setting default due dates based on the case timeline.
4. Assign tasks using the Matter Contact roles (e.g., "Lead Attorney," "Paralegal").

**Tip**: Use custom labels for task subjects to maintain consistency across practice areas and improve task tracking.

### Automating Status Updates
**Objective**: Automatically update related Matter Contacts when the Matter status changes.

**Configuration Steps**:
1. Set up a **Record-Triggered Flow** on the Matter object, triggered when the Status field is updated (e.g., "Closed").
2. Use the **Get Records** element to fetch all related Matter Contacts.
3. Update each Matter Contact’s status to "Inactive" using the **Update Records** element.

**Recommendation**: Use the "Last Modified By" field on the Matter Contact record to track who made the update, providing an audit trail for compliance purposes.

### Approval Processes for Key Decisions
**Objective**: Implement an approval process for critical Matter stages, such as when a document needs legal review.

**Configuration Steps**:
1. Create an **Approval Process** on the Matter object with entry criteria based on the Matter Type and Status (e.g., "Pending Review").
2. Use a **Record-Triggered Flow** to launch the approval process when the criteria are met.
3. Configure email notifications and reminders within the Flow to keep approvers informed.

**Best Practice**: Regularly review approval processes to ensure they align with current legal procedures and policies.

## Building Reports and Dashboards
Effective reporting is crucial for providing insights into matter status, task completion, and overall case management performance. Recon Matter Management leverages standard Salesforce reporting features, enabling admins to build powerful reports and dashboards.

### Creating Standard Reports
1. **Matter Status Report**:
   - Use the Matter object to create a summary report that shows the number of open, closed, and pending Matters, grouped by Matter Type.
   - Include filters for practice area, stage, and assigned attorney to provide actionable insights.

2. **Task Completion Report**:
   - Create a report on the Task object to track task completion rates for each Matter Type.
   - Group tasks by status (e.g., "Completed," "In Progress," "Overdue") and display the results in a bar chart.

3. **Compliance Audit Report**:
   - Build a matrix report using the Compliance-related fields on the Matter object.
   - Highlight upcoming audits and their compliance status, using conditional formatting to flag overdue items.

### Designing Dashboards
1. **Matter Overview Dashboard**:
   - Include components like "Matters by Type," "Open Matters by Practice Area," and "Upcoming Court Dates."
   - Use charts and tables to provide a quick visual summary of the legal department’s workload.

2. **Task Management Dashboard**:
   - Display key metrics such as "Tasks Due This Week," "Overdue Tasks," and "Task Completion by User."
   - Include filters for Matter Type and user role to allow for more detailed analysis.

3. **Compliance Monitoring Dashboard**:
   - Include components showing "Compliance Audits by Status" and "Regulatory Issues by Practice Area."
   - Use dynamic filters to allow legal managers to drill down into specific issues.

**Best Practice**: Schedule reports and dashboards for regular distribution to key stakeholders, ensuring that the legal team stays informed and proactive.

## Summary
Configuring Recon Matter Management effectively involves tailoring the system to reflect different legal practice areas, automating key workflows with Salesforce Flow, and building insightful reports and dashboards. This approach enhances the efficiency of legal teams, reduces manual work, and provides a comprehensive view of matter management activities.

### Key Takeaways:
- Customize fields and layouts based on legal practice areas for improved user experience.
- Use Salesforce Flow for all automation needs, replacing manual processes and deprecated tools like Process Builder.
- Design reports and dashboards to offer real-time insights, supporting informed decision-making.

By following these best practices, the Recon Matter Management package can be configured to meet the specific needs of any legal department in a government agency.

