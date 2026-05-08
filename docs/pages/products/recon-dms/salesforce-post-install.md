---
layout: default
title: Salesforce Post-Installation
description: Configure Recon DMS settings, thresholds, and page assignments after package installation.
grand_parent: Products
parent: Recon DMS
nav_order: 4
has_toc: true
nav_scope: recon-dms
nav_scope_title: Recon DMS
---

> **Audience**
> Salesforce administrators who manage Recon DMS configuration settings and Lightning page assignments.

# ReconDMS Post-Installation Setup Guide

Before starting the post-installation configuration, ensure you have the Cloud user credentials and — if you plan to enable inline editing — the Azure OAuth credentials for the Microsoft Graph APIs (Tenant ID, Client ID, Client Secret) and the SharePoint Site ID. Refer to the [Azure & SharePoint Setup](azure-sharepoint) guide if you need to gather those values first.

## A note on "Cloud" in this guide

Throughout this guide, **"Cloud"** refers to your primary file-storage provider — either **AWS S3** or **Azure Blob Storage**. Where steps differ between the two, both are noted (e.g., the batch class `CreateAwsBatchForFileSync` / `CreateAzureBatchForFileSync` and the corresponding storage URL `s3Bucket` / `blob`). Substitute the appropriate one based on your deployment.

> **GovCloud deployments:** Recon DMS partners running on **AWS GovCloud** should follow the AWS-side instructions throughout. CloudFront is **not** available on GovCloud — see [Appendix: CloudFront (Optional, Commercial AWS Only)](#appendix-cloudfront-optional-commercial-aws-only) for the supplementary configuration that applies to commercial-AWS deployments only.

# Scheduling Batch Processes

Recon DMS depends on a small set of Apex batch jobs to keep storage URLs fresh, sync edits, refresh integration tokens, and clean up deleted files. All four are scheduled daily.

### Batches to Schedule

#### SecuredUrlBatch (Apex Class)

- **Description:** Refreshes Storage URLs associated with files so they remain accessible. URLs are refreshed every 6 days, just before they expire on the 7th day.
- **Schedule Time:** 11:00 PM (EST), Daily

#### CreateAwsBatchForFileSync / CreateAzureBatchForFileSync (Apex Class) — only if SharePoint is enabled

Choose the batch that matches your primary storage cloud — AWS or Azure.

- **Description:** Initiates a job on Cloud (AWS/Azure) to sync changes for files edited in SharePoint. After synchronization, the file is removed from SharePoint and the corresponding DMS Batch, Job, Document Profile, and Version records are updated. This batch automatically chains a follow-up batch (`GetBatchJobDataFromAwsBatch` / `GetBatchJobDataFromAzureBatch`) one hour later to retrieve the sync results.
- **Schedule Time:** 12:00 AM (EST), Daily

#### RefreshJwtTokenBatch (Apex Class)

- **Description:** Refreshes the Cloud token, which expires every 15 days, to ensure continuous access.
- **Schedule Time:** 1:00 AM (EST), Daily

#### FileDeleteJobCreatorBatch (Apex Class)

- **Description:** Creates the file delete job on Cloud (AWS/Azure) for any deletion jobs that are pending and have passed the retention period.
- **Schedule Time:** 2:00 AM (EST), Daily

### How to schedule a batch class

1. Go to **Setup** in Salesforce.
2. In the Quick Find box, type **Apex Classes** and select it.
3. Locate the desired batch class and click **Schedule Apex**.
4. In the **Job Name** field, enter a name for the scheduled job (for example, `SecuredUrlBatchScheduler`).
5. Set **Frequency** to Daily and choose the start time listed above.
6. Leave the **End Date** blank for indefinite scheduling, or set one if your operational policy requires it.
7. Click **Save** to schedule the batch.

Repeat this for each of the four batch classes above.

[SCREENSHOT: Figure 1.1 — Apex Classes setup page with the Schedule Apex action highlighted]

# Setting Up Integration

Recon DMS integrates with two external platforms: Cloud (AWS/Azure, for file storage) and Microsoft (Azure + SharePoint, used optionally for inline editing). Several Salesforce-side configurations enable secure communication with these platforms: Named Credentials for authentication, Remote Site Settings for outbound API access, CORS for cross-origin requests, and Trusted URLs for content security policy.

## Set up Named Credentials

1. **Navigate to Setup.** Click the gear icon in the top-right corner of Salesforce.
2. **Search for Named Credentials.** In the Quick Find box, type "Named Credentials" and select **Named Credentials** under the Security section.
3. **Click New Legacy.** From the drop-down menu, click **New Legacy** to create a new Named Credential with legacy authentication.

   ![](../../../assets/images/recon-dms/salesforce-post/image2.jpg)

4. **Fill in the required information:**
   - **Label:** Recon Microsoft
   - **Name:** Recon_Microsoft
   - **URL:** `https://login.microsoftonline.com`
5. **Save the Named Credential.** Once you've filled in the required fields, click **Save**. Make sure to check all of the checkboxes shown below.

   ![](../../../assets/images/recon-dms/salesforce-post/image4.jpg)

## Set up Remote Site Settings

Add a Remote Site entry for each of the following endpoints. The Cloud entries are required for every deployment; the SharePoint entries are required only if you are enabling SharePoint inline editing.

**Cloud (required):**
- **CloudBaseUrl** — Base URL for the Cloud (AWS/Azure) API, used for all callouts.
- **s3Bucket / blob** — Cloud (AWS/Azure) server URL where files are stored.

**SharePoint (only if enabled):**
- **sharepointSite** — your configured SharePoint site (e.g., `https://yourdomainname.sharepoint.com`).
- **GraphAPI** — `https://graph.microsoft.com`
- **Microsoft** — `https://login.microsoftonline.com`

> **Commercial AWS only:** if your deployment uses CloudFront, also add a `CloudFront` Remote Site Setting. See [Appendix: CloudFront](#appendix-cloudfront-optional-commercial-aws-only).

### Steps

1. Go to **Setup** in Salesforce.
2. In the Quick Find box, type **Remote Site Settings** and select it.
3. Click **New Remote Site**.
4. Enter the details:
   - **Remote Site Name:** A unique name (e.g., `CloudBaseUrl`, `s3Bucket` / `blob`, or `sharepointSite`).
   - **Remote Site URL:** The corresponding URL.
   - **Description:** Optional — clarifies the purpose of the entry.
5. Make sure **Active** is checked, then click **Save**.
6. Repeat for each remaining Remote Site.

Once complete, verify that each Remote Site is active in the list.

![](../../../assets/images/recon-dms/salesforce-post/image11.jpg)

## Set up CORS

CORS entries allow specific external origins to access Salesforce resources from the browser. Configure the same set of URLs as Remote Site Settings:

**Cloud (required):** `CloudBaseUrl`, `s3Bucket` / `blob`
**SharePoint (only if enabled):** `sharepointSite`

> **Commercial AWS only:** add a `CloudFront` CORS entry if applicable. See [Appendix: CloudFront](#appendix-cloudfront-optional-commercial-aws-only).

### Steps

1. Go to **Setup** in Salesforce.
2. In the Quick Find box, type **CORS** and select it.
3. Click **New** to add a new CORS setting.
4. In the **Origin URL** field, enter the URL that needs access to your Salesforce data (your Cloud API URL or SharePoint site).
5. Optionally, add a description.
6. Click **Save**.

Repeat for each external URL that requires CORS configuration.

![](../../../assets/images/recon-dms/salesforce-post/image8.jpg)

## Set up Trusted URLs (CSP)

Trusted URLs control which external resources Salesforce's Content Security Policy will allow to load. Configure the following:

- **CloudBaseUrl** — Base URL for the Cloud (AWS/Azure) API, used for all callouts.
- **s3Bucket / blob** — Cloud (AWS/Azure) server URL where files are stored.
- **Office Apps** — `https://view.officeapps.live.com` (used for Office file rendering)
- **sharepointSite** — your configured SharePoint site (only if SharePoint is enabled).
- **GraphAPI** — `https://graph.microsoft.com` (only if SharePoint is enabled).
- **Microsoft** — `https://login.microsoftonline.com` (only if SharePoint is enabled).

> **Commercial AWS only:** add a `CloudFront` Trusted URL if applicable. See [Appendix: CloudFront](#appendix-cloudfront-optional-commercial-aws-only).

### Steps

1. Go to **Setup** in Salesforce.
2. In the Quick Find box, type **Trusted URLs** and select it.
3. Click **New Trusted URL**.
4. Enter the details:
   - **API Name:** A name such as `CloudBaseUrl`, `s3Bucket`, or `SharePoint_Site`.
   - **URL:** The URL of the site you want to trust.
   - **Context:** Select **All**.
   - Optionally, add a description.
5. Make sure **Active** is checked, then click **Save**.

> **Note:** When creating Trusted URLs, check **all** of the CSP directive permissions shown below.

![](../../../assets/images/recon-dms/salesforce-post/image1.jpg)

Repeat for each entry. This setup ensures that only authorized external resources can load in Salesforce.

# DMS Configuration

This section guides admins through the integration setup, file configuration, and lookup configuration that the DMS Configuration tab exposes.

## Create a Relationship Between the Document Profile and the Parent Object

To store files against a specific object (such as Account), you must establish a relationship field on the **Document Profile** object. This field links each Document Profile record to the parent record it belongs to.

### Steps

1. Navigate to **Setup** in Salesforce.
2. Open **Object Manager** and select **Document Profile**.
3. Click **Fields & Relationships**.
4. Click **New** and choose **Lookup Relationship**.
5. Follow the prompts to create a lookup field that links Document Profile to the parent object (e.g., Account).

[SCREENSHOT: Figure 2.1 — Document Profile Fields & Relationships page showing the New Lookup Relationship action]

## Set up Cloud Integration

Setting up the Cloud integration is critical — it enables DMS to store files securely on the server.

### Steps

1. Open the **DMS Configuration** tab via the App Launcher.
2. Click **Configure** to enter the Cloud credentials.
3. Provide the following:
   - **Base URL:** Your Cloud (AWS/Azure) endpoint.
   - **User ID:** The User ID provided to you.
   - **User Token:** The User Token provided to you.
4. Click **Test and Setup Integration** to validate the inputs and establish the connection with Cloud.

> **Note:** Confirm that the Cloud credentials you've been given are accurate before proceeding.

[SCREENSHOT: Figure 2.2 — DMS Configuration tab with the Cloud configuration form populated and Test and Setup Integration button visible]

## Azure and SharePoint Configuration (Optional)

Recon DMS uses SharePoint to power inline editing for Office file types. Enable this integration only if your organization wants users to edit Word, Excel, and PowerPoint files directly inside Salesforce. To access SharePoint data, DMS uses an Azure-registered OAuth app.

### Steps

1. Open the **SharePoint Integration** tab on the DMS Configuration page.
2. Choose whether to enable SharePoint:
   - **Disabled:** Move on to the next configuration tab.
   - **Enabled:** Continue with the steps below.
3. Click **Configure** and enter the following:
   - **Azure Client ID:** Your Azure application's Client ID.
   - **Azure Client Secret:** The client secret value (use the **Value**, not the Secret ID).
   - **Azure Tenant ID:** Your Azure tenant's ID.
   - **Azure Scope:** `https://graph.microsoft.com/.default`
   - **Azure Base Token URL:** Pre-populated by default — verify it matches your environment.
4. Click **Test and Setup Integration**.

> **Note:** All four Azure values must come from the same registered app. See the [Azure & SharePoint Setup](azure-sharepoint) guide for how to obtain them.

Once Microsoft Graph authentication is set up, the **SharePoint Integration** tab will activate. Click **Configure**, enter the SharePoint Site ID you retrieved during Azure & SharePoint setup, click **Next**, choose your SharePoint drive and folder, and click **Save**.

[SCREENSHOT: Figure 2.3 — SharePoint Integration configuration with Site ID, drive, and folder fields populated]

### Configure Editable File Types

Once SharePoint storage is set up, you can configure which file types are editable inside DMS.

1. Open the **Editable File Types** tab.
2. From the multi-select picklist, choose the file types that should be editable.
3. Save the configuration.

The selected file types will become editable directly from the preview modal. File types that aren't selected will not show the **Edit** option.

## General Configuration

The **General Configuration** tab controls upload behavior, notifications, retention, and visibility of the standard Salesforce Files button.

| Setting | Purpose |
|---|---|
| **Chunk Size** | Maximum file size per upload chunk to Cloud (AWS/Azure). Defines how large each single chunk of a file can be. |
| **Notification Threshold (MB)** | Minimum file size that triggers a bell notification when an upload completes. |
| **File Retention Period (days)** | Number of days after a file is deleted from Salesforce before it is removed from Cloud storage. |
| **Hide Existing Salesforce File Button** | When checked, hides the standard "Existing Salesforce Files" button in the upload modal. |
| **Log Errors** | When checked, DMS operations write error details to `Error_Log__c` for diagnostics. |

[SCREENSHOT: Figure 2.4 — General Configuration tab showing all five settings]

## Related List Configuration

The Related List configuration links files to the correct parent object so that the Document Profile related list displays correctly.

### Steps

1. From the configuration settings, select the appropriate **parent object** (e.g., Account) from the dropdown.
2. Select the **lookup field** you created earlier to link Document Profile to the parent object.
3. Save the configuration.

The Document Profile related list will now display all associated documents on the parent object's record page.

## Search Configuration

The Search configuration controls how DMS sends parameters to Cloud (AWS/Azure) when users search for files.

| Parameter | Purpose | Recommended Value |
|---|---|---|
| **Files Per Page** (`_r`) | Number of files returned per page of search results. | 20 |
| **Sort Order** (`_o`) | Sort order based on `createdDate`. | `desc` |
| **Include Org ID** | If checked, the Org ID is included in the search request to Cloud (AWS/Azure) for tighter result filtering. | Checked (recommended) |

[SCREENSHOT: Figure 2.5 — Search Configuration tab with all three parameters highlighted]

# Buttons

This section configures the user interface elements — the action buttons users will click to upload, search, and preview files.

## Create Parent Buttons

After completing the DMS configuration, navigate to your parent object (e.g., Account) and create three quick actions: **Add Files**, **Search Files**, and **Preview All Files**.

### Steps (repeated for each of the three buttons)

1. Navigate to **Setup**.
2. Open **Object Manager** and select your parent object (e.g., Account).
3. Click **Buttons, Links, and Actions**.
4. Click **New Action**.
5. Configure the action with the appropriate details (one for upload, one for search, one for preview-all).

### Add Files button — invokes the file upload modal

[SCREENSHOT: Figure 3.1 — New Action form configured for Add Files (Add Account Files)]

### Search Files button — invokes the file search modal

[SCREENSHOT: Figure 3.2 — New Action form configured for Search Files]

### Preview All Files button — opens a multi-file preview for the parent record

[SCREENSHOT: Figure 3.3 — New Action form configured for Preview All Files]

> **Tip:** Include the parent object name in each button label to avoid ambiguity. For Account, use "Add Account Files," "Search Account Files," and "Preview All Account Files."

## Create Document Profile Buttons

Create matching detail-page buttons on the **Document Profile** object so users can launch the same actions from the Document Profile related list.

### Steps (repeated for each of the three buttons)

1. Navigate to **Setup**.
2. Open **Object Manager** and select **Document Profile**.
3. Click **Buttons, Links, and Actions**.
4. Click **New Button or Link**.
5. Configure the button using the URL template below, substituting your parent object's API name.

### Add Files — example URL

```
/lightning/action/quick/Account.Add_files_button_api_name?objectApiName&context=RECORD_DETAIL&recordId={!CASESAFEID(Account.Id)}&backgroundContext=%2Flightning%2Fr%2FAccount%2F{!CASESAFEID(Account.Id)}%2Fview
```

[SCREENSHOT: Figure 3.4 — New Button or Link form configured for Add Files on Document Profile]

### Search Files — example URL

```
/lightning/action/quick/Account.Search_Files_api_name?objectApiName&context=RECORD_DETAIL&recordId={!CASESAFEID(Account.Id)}&backgroundContext=%2Flightning%2Fr%2FAccount%2F{!CASESAFEID(Account.Id)}%2Fview
```

[SCREENSHOT: Figure 3.5 — New Button or Link form configured for Search Files on Document Profile]

### Preview All Files — example URL

```
/lightning/action/quick/Account.Preview_All_Files?objectApiName&context=RECORD_DETAIL&recordId={!CASESAFEID(Account.Id)}&backgroundContext=%2Flightning%2Fr%2FAccount%2F{!CASESAFEID(Account.Id)}%2Fview
```

[SCREENSHOT: Figure 3.6 — New Button or Link form configured for Preview All Files on Document Profile]

> **Notes:**
> - Replace `Account` with your parent object's API name throughout the URL.
> - Replace the embedded action name (e.g., `Add_files_button_api_name`) with the actual API name of the parent button you created.
> - Ensure there are no extra spaces in the URL.

## Related List on Page Layout

Add the Document Profile related list to the parent object's page layout, then configure which columns and buttons appear.

### Steps

1. Navigate to **Setup**.
2. Open **Object Manager** and select your parent object (e.g., Account).
3. Click **Page Layouts**.
4. Open the desired layout.
5. Drag the **Document Profile** related list from the palette onto the layout.
6. Click the wrench icon on the related list to configure it.

   ![](../../../assets/images/recon-dms/salesforce-post/image3.jpg)

7. Select the columns you want displayed. To enable inline preview from the related list, include the **Preview** field shown below.

   ![](../../../assets/images/recon-dms/salesforce-post/image6.jpg)

8. From the **Buttons** section, select the Document Profile buttons you created (Add Files, Search Files, Preview All Files).

   ![](../../../assets/images/recon-dms/salesforce-post/image7.jpg)

9. Click **OK**, then **Save**.

# File Upload Progress Tracker

The **File Upload Progress Tracker** is a Lightning Web Component that gives end users real-time visibility into the upload process on any parent record page (Account, Opportunity, Matter, or any custom object where Recon DMS uploads are used). It shows a live progress card for the duration of the upload — from file transfer through record creation — and disappears automatically when the upload finishes.

The tracker is **opt-in**: it will not appear on any record page until an admin adds it via Lightning App Builder.

## Activation Steps

### Step 1: Open the record page in Lightning App Builder

1. Go to **Setup**.
2. In the Quick Find box, search for **Lightning App Builder**.
3. Locate the record page where you want to enable the tracker (Account Record Page, Opportunity Record Page, or a custom record page).
4. Click **Edit**.

### Step 2: Add the component to the page

1. In the left-hand components panel, scroll to the **Custom** section (or **Custom — Managed** for the managed-package deployment).
2. Locate the component named **File Upload Progress Tracker**.
3. Drag it onto the page. Place it near the top of the page or in a sidebar region so users see progress immediately during uploads.

> **Note:** The component is hidden when no upload is in progress, so it does not consume visible space during normal use. It only appears during active uploads.

[SCREENSHOT: Figure 4.1 — Lightning App Builder showing the File Upload Progress Tracker component dragged onto a record page]

### Step 3: Save and activate

1. Click **Save** in the top-right corner.
2. If prompted, click **Activate** and assign the page to the appropriate app, record types, and profiles.
3. Click **Save** again to finalize.

### Step 4: Verify

1. Open a record page where the component was added.
2. Initiate a file upload through Recon DMS.
3. Confirm the progress tracker appears, shows live progress, and disappears automatically after the upload succeeds.
4. Confirm the Document Profile related list refreshes on completion to show the newly uploaded files.

# Document Folder Functionality Setup

To enable **Document Folder** functionality for a parent object, additional configuration is required beyond the standard Document Profile setup. This lets users upload and manage files inside folders associated with a parent record.

The configuration follows the same four-step pattern as the standard file setup.

## Step 1: Create a Lookup Relationship on Document Folder

Each Document Folder record needs a lookup to its parent record.

1. Navigate to **Setup**.
2. Open **Object Manager** and select **Document Folder**.
3. Click **Fields & Relationships**.
4. Click **New** and choose **Lookup Relationship**.
5. Choose the parent object (e.g., Account).
6. Complete the remaining field setup and save.

[SCREENSHOT: Figure 5.1 — New Lookup Relationship form on Document Folder, parent set to Account]

## Step 2: Create a Parent LWC Action (Add Document Folder Files)

Create a Lightning Web Component quick action on the Document Folder object. This is the action users will invoke to upload files into a folder.

1. Navigate to **Setup**.
2. Open **Object Manager** and select **Document Folder**.
3. Click **Buttons, Links, and Actions**.
4. Click **New Action**.
5. Configure the action:
   - **Action Type:** Lightning Web Component
   - **Label:** Add Document Folder Files
   - **Name:** auto-populated
   - **Lightning Component:** select the `fileUploadModal` component
6. Click **Save**.

> **Note:** This step mirrors the parent **Add Files** quick action you created earlier.

[SCREENSHOT: Figure 5.2 — New Action form configured as Lightning Web Component on Document Folder]

## Step 3: Create a Button on the Document Profile Object

Create a Document Profile button that invokes the parent action you just defined.

1. Navigate to **Setup**.
2. Open **Object Manager** and select **Document Profile**.
3. Click **Buttons, Links, and Actions**.
4. Click **New Button or Link**.
5. Configure the button:
   - **Display Type:** Detail Page Button
   - **Behavior:** Display in existing window without sidebar or header
   - **Content Source:** URL
   - **URL:**
     ```
     /lightning/action/quick/Document_Folder__c.Add_Document_Folder_Files?objectApiName&context=RECORD_DETAIL&recordId={!CASESAFEID(Document_Folder__c.Id)}&backgroundContext=%2Flightning%2Fr%2FDocument_Folder__c%2F{!CASESAFEID(Document_Folder__c.Id)}%2Fview
     ```

> **Notes:**
> - Replace `Document_Folder__c` with your namespaced API name if different.
> - Replace `Add_Document_Folder_Files` with the actual API name of the action you created in Step 2.
> - Ensure there are no extra spaces in the URL.

[SCREENSHOT: Figure 5.3 — New Button or Link form on Document Profile pointing at the Document Folder action]

## Step 4: Update the Document Folder Page Layout

Expose the new functionality on the Document Folder page layout.

1. Navigate to **Setup**.
2. Open **Object Manager** and select **Document Folder**.
3. Click **Page Layouts** and open the desired layout.
4. Scroll to the **Related Lists** section and ensure the **Document Profile** related list is added.
5. Click the wrench icon on the related list:
   - Add the columns you want users to see.
   - Under **Buttons**, add **Add Document Folder Files**.
6. Click **OK**, then **Save**.

[SCREENSHOT: Figure 5.4 — Document Folder page layout with Document Profile related list and Add Document Folder Files button configured]

# Appendix: CloudFront (Optional, Commercial AWS Only)

CloudFront is Amazon's content delivery network. Some Recon DMS partners running on **commercial AWS** front their S3 storage with a CloudFront distribution to secure file URLs and reduce egress latency.

> **GovCloud:** CloudFront is **not** available on AWS GovCloud. If your deployment is on GovCloud, skip this appendix entirely — direct S3 URLs are used.

If your deployment uses CloudFront, add the CloudFront URL to the same three Salesforce-side configurations referenced earlier in this guide:

| Configuration | Entry to add |
|---|---|
| **Remote Site Settings** | `CloudFront` — your CloudFront distribution URL |
| **CORS** | `CloudFront` origin URL |
| **Trusted URLs (CSP)** | `CloudFront` URL with Context = All |

Follow the same step-by-step procedures documented in [Set up Remote Site Settings](#set-up-remote-site-settings), [Set up CORS](#set-up-cors), and [Set up Trusted URLs (CSP)](#set-up-trusted-urls-csp). The only difference is the additional `CloudFront` entry in each list.

[SCREENSHOT: Figure A.1 — Remote Site Settings list with CloudFront entry visible alongside CloudBaseUrl and s3Bucket]

# Next Steps

Configuration is complete. Introduce end users to the new experience using the [User Navigation Guide](user-guide), and continue to the [Cloud OCR Inbound Integration](ocr-integration) guide if your deployment includes OCR processing of uploaded files.
