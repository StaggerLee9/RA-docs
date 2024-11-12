---
layout: default
title: Activity Rules System
---

# Recon Matter Management System - Activity Rules System

{: .fs-9 }
Activity Rules System Documentation
{: .fs-6 .fw-300 }

[View on GitHub](https://github.com/StaggerLee9/RA-docs){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }

---

## Table of Contents
{: .no_toc }

1. TOC
{:toc}

---

## Executive Summary

The Recon Matter Management System (ReconMMS) is a Salesforce-based platform designed to support legal professionals in managing legal matters efficiently and effectively. The system includes the Activity Rules System, a set of flows specifically structured to automate, organize, and streamline the handling of activity records within ReconMMS.

This component ensures that all tasks, events, and related records are systematically generated, updated, and maintained, providing users with a seamless and compliant workflow experience.

## Sample Use Cases

### Use Case 1: Automating Task Creation Upon New Matter Intake
{: .text-delta }

**Scenario:** A legal team member in a government agency creates a new Matter in ReconMMS. As part of the matter intake process, specific tasks and timelines must be established for initial document reviews and case preparation.

**Activity Rules System in Action:**
1. Activity Rule - Before Save flow verifies that required fields, such as Assignment Type, are populated and meet entry criteria
2. Activity Rules - Create Activity Rule Jobs flow triggers automatically based on the newly created Matter
3. Activity Rules - Create Child Activity Records flow creates child tasks under the Matter record

**Outcome:** The legal team member no longer needs to manually create and assign initial tasks, as the Activity Rules System automates this setup based on the new Matter. This saves time, ensures compliance, and enables immediate progress tracking within the system.

### Use Case 2: Scheduling Follow-Up Dates Based on Regulatory Deadlines
{: .text-delta }

**Scenario:** A case manager must track upcoming deadlines for submitting filings associated with a particular Matter. To ensure timely submissions, follow-up events must be scheduled in accordance with business days.

**Activity Rules System in Action:**
1. Activity Rules - Calculate Child Date flow calculates the required follow-up date based on a regulatory deadline
2. Activity Rules - Create Child Events flow automatically generates follow-up events linked to the Matter
3. Activity Rules - Event After Save flow checks if these events meet conditions for additional subflows

**Outcome:** The automated scheduling of follow-up events aligned with regulatory deadlines reduces the risk of missed deadlines and helps maintain compliance.

### Use Case 3: Clean-Up and Compliance Tracking for Deleted Events
{: .text-delta }

**Scenario:** A Matter progresses, and some associated tasks or events are no longer needed.

**Activity Rules System in Action:**
1. Activity Rules - Event On Delete flow is triggered when an event associated with a closed Matter is deleted
2. Activity Rules - Run Activity Rule Jobs ensures that any jobs associated with the deleted event are halted or updated
3. Activity Rules - Compliance Check and Notification could notify the team or log the cleanup for compliance tracking

**Outcome:** Automating the deletion process ensures that outdated records are cleaned up systematically, reducing data clutter and maintaining a compliant, up-to-date Matter record.

## Flow Reference

### Core Flows
{: .text-delta }

#### Activity Rule - Before Save - V1
Purpose
: Ensures that required fields are populated and conditions are met before an activity rule record is saved.

Functionality
: Executes conditional formulas and updates assignments, establishing initial data accuracy and preventing incomplete records from being saved.

#### Activity Rules - Event After Save
Purpose
: Triggers actions after an event record is saved, checking whether the event is new or updated.

Functionality
: Uses decision elements to conditionally execute subflows or tasks based on event status.

[View all Core Flows →](#){: .btn .btn-outline }

### Subflows
{: .text-delta }

#### Activity Rules - Event and Task After Save Subflow
Purpose
: Manages tasks and events after they are saved, checking specific conditions.

#### Activity Rules - Start
Purpose
: Initializes the Activity Rules System, setting up required parameters.

[View all Subflows →](#){: .btn .btn-outline }

## Technical Specifications

### System Requirements
- Salesforce org with appropriate edition
- System Administrator profile or equivalent permissions
- [Other requirements]

### Dependencies
- Custom Objects
- Permission Sets
- [Other dependencies]

[View Technical Details →](#){: .btn .btn-outline }

## Complete Flow Reference

### Core Flows
{: .text-delta }

#### Activity Rule - Before Save - V1
**Purpose**: Ensures that required fields are populated and conditions are met before an activity rule record is saved. This flow includes entry criteria for checking if the record is new and if certain fields are populated.

**Functionality**: Executes conditional formulas and updates assignments, establishing initial data accuracy and preventing incomplete records from being saved.

#### Activity Rules - Event After Save
**Purpose**: Triggers actions after an event record is saved, checking whether the event is new or updated to determine next steps.

**Functionality**: Uses decision elements to conditionally execute subflows or tasks based on whether the saved event is a new record or an update, allowing for appropriate follow-up actions or notifications.

#### Activity Rules - Event and Task After Save Subflow
**Purpose**: Supports the main "Event After Save" flow by executing additional tasks associated with saved events, particularly for complex workflows where additional follow-ups are required.

**Functionality**: The subflow checks specific conditions related to the event's status and executes relevant tasks or updates, providing layered task management within event-related workflows.

#### Activity Rules - Start
**Purpose**: Serves as an initialization flow that prepares the system for executing subsequent activity rule jobs or processes.

**Functionality**: Initiates the sequence of rule-based tasks, ensuring that the conditions and triggers are set for executing the Activity Rules System as designed.

#### Activity Rules - Create Child Activity Records
**Purpose**: Generates child activity records based on certain criteria within the parent record, automating the creation of related tasks.

**Functionality**: Checks entry criteria and conditionally creates child records, which helps to automate task generation and ensures that necessary follow-up actions are systematically added.

#### Activity Rules - Create Activity Rule Jobs
**Purpose**: Sets up activity rule jobs based on triggers or predefined conditions, allowing structured management of jobs related to activity rules.

**Functionality**: Ensures that tasks are created and queued within the system when certain conditions are met, organizing workflow steps based on specified rules.

#### Activity Rules - Run Activity Rule Jobs
**Purpose**: Executes the jobs created by the "Create Activity Rule Jobs" flow, effectively carrying out scheduled or triggered tasks within the activity rules system.

**Functionality**: Manages the execution of job tasks, ensuring that rules are applied to carry out necessary actions in a structured and timely manner.

#### Activity Rules - Event On Delete
**Purpose**: Handles the deletion of events by triggering necessary actions or updates when an event is removed from the system.

**Functionality**: Checks conditions related to the deleted event and performs clean-up actions or related updates, maintaining data integrity and ensuring that dependent records are updated accordingly.

### Subflow Reference
{: .text-delta }

#### Activity Rules - Event and Task After Save Subflow
**Purpose**: Manages tasks and events after they are saved, checking specific conditions to determine further actions based on event or task status.

#### Activity Rules - Start
**Purpose**: Initializes the Activity Rules System, setting up the required parameters and starting conditions for subsequent processes.

#### Activity Rules - Get Matter Contacts
**Purpose**: Retrieves contacts associated with a specific Matter, allowing subsequent actions to include relevant contact information.

#### Activity Rules - Set Primary Assignment
**Purpose**: Determines and assigns the primary contact or responsible party for a task or event within a Matter.

#### Activity Rules - Get Non-Primary Assignments
**Purpose**: Collects any additional contacts or responsible parties not designated as primary, allowing these to be included in activity management.

#### Activity Rules - EventRelations
**Purpose**: Manages relationships between events, linking related events together within a Matter for organized tracking.

#### Activity Rules - Create Child Activity Records
**Purpose**: Automatically generates child activity records based on specific conditions, supporting structured task and event hierarchies.

#### Activity Rules - Create Child Tasks-No SharedActivities
**Purpose**: Creates child tasks without using Salesforce's Shared Activities feature, ensuring each task remains individually tracked.

#### Activity Rules - Create Activity Rule Jobs
**Purpose**: Sets up specific jobs or tasks under activity rules, automating task generation based on conditions in the Matter.

#### Activity Rules - Calculate Child Date
**Purpose**: Calculates dates for child activities, adjusting for business days or other parameters, ensuring tasks align with required timelines.

#### Activity Rules - Get Assignment IDs
**Purpose**: Retrieves assignment IDs for associated contacts or resources, allowing assignments to be correctly linked to tasks or events.

#### Activity Rules - Error Log - V5
**Purpose**: Logs errors encountered within the Activity Rules System, aiding in troubleshooting and maintaining system integrity.

#### Activity Rules - Updated Parent Record - V8
**Purpose**: Updates the parent record when related child records or tasks change, keeping the Matter information synchronized and accurate.