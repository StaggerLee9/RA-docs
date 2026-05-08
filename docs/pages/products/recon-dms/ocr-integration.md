---
layout: default
title: Cloud OCR Inbound Integration
description: Configure the Recon DMS Cloud OCR inbound REST integration so OCR job status updates flow back into Salesforce.
grand_parent: Products
parent: Recon DMS
nav_order: 5
has_toc: true
nav_scope: recon-dms
nav_scope_title: Recon DMS
---

> **Audience**
> Salesforce administrators and integration engineers responsible for connecting the Cloud OCR pipeline to Recon DMS.

# Cloud OCR Inbound Integration

## 1. Overview

This guide describes the complete setup for integrating Cloud OCR job status updates into Salesforce for the Recon DMS application. The APIs documented here are part of the Recon DMS integration framework and update Recon DMS records based on Cloud OCR processing results. Once configured, the integration updates the **OCR Job Status** and **OCR Status Message** fields on both the Document Profile and Version objects after a file is uploaded and processed by Cloud OCR.

The implementation includes:

- An **External Client Application (ECA)** using OAuth 2.0 (Client Credentials flow)
- A dedicated **Integration User**
- A **Permission Set** scoped specifically to this integration
- Two Apex classes deployed to the org:
  - `OCRInboundRestService`
  - `OCRInboundRestServiceTest`

Recon DMS objects updated by this integration:

- `Version__c`
- `Document_Profile__c`
- `Error_Log__c`

## 2. High-Level Architecture

**Cloud OCR → Salesforce (Recon DMS API Layer)**

- **Salesforce Endpoint:** `/services/apexrest/cloud/ocr/v1`
- **Authentication:** OAuth 2.0 (Client Credentials flow)

The endpoint receives OCR processing results and updates the corresponding Recon DMS records with the new status values.

[SCREENSHOT: Figure 1.1 — Sequence diagram showing Cloud OCR posting status to the Salesforce Apex REST endpoint]

## 3. Integration User Setup

Create or verify a dedicated Integration User for the Recon DMS application.

**Best practices:**
- Use a dedicated licensed user specifically for integration purposes.
- Restrict access by granting only the required permissions through a Permission Set.

Ensure the following:
- The user is **Active**.
- API access is enabled (this is granted via the permission set in a later step).
- The required permission set is assigned (covered in §6).

If your org already has an integration user, you can reuse it and assign the Recon DMS integration permission set to it once you've configured the permission set in §6.

### 3.1 Create the Integration User (if one doesn't already exist)

#### Step 1: Navigate to Users

Go to **Setup → Users → Users** and click **New User**.

#### Step 2: Enter user information

Fill in the required fields:

| Field | Example |
|---|---|
| First Name | ReconDMS |
| Last Name | Integration |
| Alias | `rdmint` (8 characters or fewer) |
| Email | A valid email address that can receive the activation email — e.g., `support@recon-apps.com` |
| Username | Must be unique across all Salesforce orgs — e.g., `recon.dms.integration@yourcompany.com` |
| Nickname | Auto-populates; leave default |

#### Step 3: Assign user license and profile

- **User License:** Salesforce Integration
- **Profile:** Minimum Access — API Only Integrations

[SCREENSHOT: Figure 3.1 — New User form with Salesforce Integration license and Minimum Access — API Only Integrations profile selected]

#### Step 4: Save and activate

Click **Save**. Salesforce sends an activation email to the address you provided. Open the email and complete the password setup to activate the user.

> **Note:** Permissions required for the Recon DMS integration are granted through the dedicated Permission Set configured in §6 — not via the profile.

## 4. External Client Application (ECA) Setup

### 4.1 Create the External Client Application

Go to **Setup → App Manager → New External Client App**.

[SCREENSHOT: Figure 4.1 — App Manager with the New External Client App button highlighted]

#### Step 1: Complete the Basic Information section

| Field | Value |
|---|---|
| External Client App Name | `ReconDMS Authentication Demo` (or any preferred display name) |
| API Name | `ReconDMS_Authentication_Demo` (auto-populates from the app name; ensure no spaces) |
| Contact Email | Your support or IT contact — e.g., `support@recon-apps.com` |
| Distribution State | Local |
| Contact Phone | Optional — leave blank or populate with a support number |
| Info URL / Logo Image URL / Icon URL | Optional — not required for this integration |
| Description | Optional but recommended — e.g., "OAuth client application used for Recon DMS Cloud OCR inbound integration." |

#### Step 2: Configure OAuth settings

Scroll to the **API (Enable OAuth Settings)** section.

- Check **Enable OAuth**.
- **Callback URL:**
  - `https://login.salesforce.com` (production)
  - `https://test.salesforce.com` (sandbox)
- **OAuth Scopes:** Move the following from Available to Selected:
  - **Manage user data via APIs (`api`)** — required for Apex REST endpoint access.
- Check **Enable Client Credentials Flow** and confirm enablement when prompted.
- Leave the remaining sections at their defaults and click **Create**.

[SCREENSHOT: Figure 4.2 — Enable OAuth Settings section with the api scope selected and Client Credentials Flow enabled]

#### Step 3: Configure OAuth policies

After creating the External Client App, you'll be redirected to its detail page.

1. Click **Edit Policies**.
2. Under **Permitted Users**, select **Admin approved users are pre-authorized**. This restricts the app to users explicitly approved via profile or permission set assignment.
3. In **App Policies**, select the profile **Minimum Access — API Only Integrations**.
4. In the **OAuth Flows and External Client App Enhancements** section:
   - Enable **Client Credentials Flow**.
   - In the **Run As** field, enter the username of the Integration User you created in §3. All API calls made through the Client Credentials flow will execute in the context of this user.
5. Click **Save**.

[SCREENSHOT: Figure 4.3 — OAuth Policies page with Run As populated with the integration user]

### 4.2 Note Down and Store Credentials

After completing the External Client App configuration, capture and securely store the authentication details. The External Client App uses OAuth 2.0; the Client ID and Client Secret are confidential and must be shared only through approved secure channels.

You will need to capture:
- **Consumer Key (Client ID)**
- **Consumer Secret (Client Secret)**
- **Token URL**
- **API Endpoint URL**

#### Step 1: Retrieve Consumer Key and Consumer Secret

1. Go to **App Manager** and open your newly created External Client App.
2. Open the **Settings** tab.
3. Click **Consumer Key and Secret**.

For security, Salesforce will prompt you to verify your identity. An OTP will be sent to the admin email — enter it to complete verification. After successful verification, you'll see the Consumer Key and Consumer Secret displayed. Copy and securely store both.

[SCREENSHOT: Figure 4.4 — External Client App Settings tab with the Consumer Key and Consumer Secret modal visible]

#### Step 2: Capture Token URL and API Endpoint URL

To construct these URLs, first obtain your base My Domain URL:

1. Go to **Setup → My Domain**.
2. Copy the **Current My Domain URL** (e.g., `https://yourcompany.my.salesforce.com`).

Construct the integration URLs:

- **Token URL:** `https://yourcompany.my.salesforce.com/services/oauth2/token`
- **API Endpoint URL:** `https://yourcompany.my.salesforce.com/services/apexrest/cloud/ocr/v1`

Replace `yourcompany.my.salesforce.com` with your actual My Domain. Document and securely share all four values with the Cloud team that will be invoking the Recon DMS OCR inbound API.

## 5. Apex Classes

Deploy the following classes to the org. They are provided via the Recon DMS integration repository for subscribers.

- `OCRInboundRestService`
- `OCRInboundRestServiceTest`

## 6. Permission Set Management

This section covers creating and configuring the permission set that the Recon DMS integration user will use to call the OCR inbound REST API and update Recon DMS records.

**Important constraints to be aware of:**
- `Document_Profile__c` has a Private OWD.
- `Version__c` is the detail object in a Master-Detail relationship to `Document_Profile__c`.
- The Apex class runs `with sharing` and enforces `WITH SECURITY_ENFORCED` plus `Security.stripInaccessible(UPDATABLE, …)`.

The permission set therefore needs:
- API + Apex Class access
- Object permissions (CRUD)
- Field-level security (Read/Edit)
- One of two strategies for data access on `Document_Profile__c` — see §6.3.1 for the choice between **Modify All Records** and a **sharing rule** approach.

### 6.1 Create the Permission Set

Go to **Setup → Permission Sets → New** and enter:

| Field | Value |
|---|---|
| Label | ReconDMS – Cloud OCR Inbound Integration |
| API Name | `ReconDMS_Cloud_OCR_Inbound` |
| License | --None-- |
| Description | Grants required access for Recon DMS Cloud OCR inbound REST integration to update records. |

Click **Save**.

[SCREENSHOT: Figure 6.1 — New Permission Set form with the values above]

### 6.2 Add Apex Class Access

1. Open the permission set.
2. Click **Apex Class Access → Edit**.
3. Move the following to **Enabled**:
   - `OCRInboundRestService`
4. Click **Save**.

### 6.3 Add Object Permissions (Recon DMS Managed Objects)

#### 6.3.1 Document Profile (Master) — REQUIRED

Go to **Permission Set → Object Settings → Document Profile → Edit**.

There are **two equally valid approaches** to granting the integration user access to update Document Profile records. Choose the one that fits your security policy:

##### Option A: Modify All Records (simpler)

Grant:
- Read
- Edit
- View All Records
- Modify All Records

**Why this works:** The OWD on `Document_Profile__c` is Private and the Apex class runs `with sharing`. The integration must update records that may have been created by any user. Granting Modify All gives the integration user the necessary access without depending on sharing rules. Because this permission set is assigned to an integration user with **no UI access**, the practical exposure is limited to the Apex REST endpoint.

##### Option B: Sharing rule strategy (least privilege)

Grant:
- Read
- Edit

Then create a **criteria-based sharing rule** (or use **Apex Managed Sharing**) that grants the integration user **Read/Write** access to all `Document_Profile__c` records that need OCR updates. Use this approach if your security review team does not allow Modify All on objects with file metadata.

> **Recommendation:** Both options satisfy the integration's functional requirement. Choose Option A for simpler operations, Option B if your security policy mandates least privilege on Modify All. Document the choice in your security review artifacts.

Click **Save**.

#### 6.3.2 Version (Detail) — REQUIRED

Go to **Permission Set → Object Settings → Version → Edit**.

Object permissions:
- Read
- Edit

Click **Save**.

#### 6.3.3 Error Log — REQUIRED (for diagnostics)

Go to **Permission Set → Object Settings → Error Log → Edit**.

Object permissions:
- Create
- Read

Click **Save**.

### 6.4 Add Field-Level Security (FLS)

#### 6.4.1 Version field permissions

Go to **Permission Set → Object Settings → Version → Field Permissions**.

**Read access (required for `WITH SECURITY_ENFORCED` queries):**
- `Storage_Key__c`
- `job_Status__c`
- `OCR_Status_Message__c`

**Edit access (required for the inbound update):**
- `job_Status__c`
- `OCR_Status_Message__c`

#### 6.4.2 Document Profile field permissions

Go to **Permission Set → Object Settings → Document Profile → Field Permissions**.

**Read access:**
- `Storage_Key__c`

**Edit access:**
- `OCR_Job_Status__c`
- `OCR_Status_Message__c`

#### 6.4.3 Error Log field permissions

Go to **Permission Set → Object Settings → Error Log → Field Permissions**.

**Edit access** (the integration writes these on failure):
- `Status__c`
- `Method_Name__c`
- `Source_Class__c`
- `Error_Message__c`
- `Timestamp__c`
- `Stack_Trace__c`

[SCREENSHOT: Figure 6.2 — Field permissions tab on Version showing the Read and Edit columns checked for the listed fields]

### 6.5 Assign the Permission Set to the Integration User

1. Go to **Setup → Users**.
2. Open the Recon DMS Integration User.
3. Scroll to **Permission Set Assignments → Edit Assignments**.
4. Assign **ReconDMS – Cloud OCR Inbound Integration**.
5. Click **Save**.

### 6.6 Validate Permissions (Post-Setup)

Confirm:
- The integration user can obtain an OAuth access token (no auth failures).
- The integration user can call the REST endpoint (no 401 / 403).
- No `WITH SECURITY_ENFORCED` query failures appear in debug logs.
- Updates are not stripped by FLS — values persist in the target fields.

## 7. Functional Test (Postman)

This section validates that Salesforce can authenticate using OAuth 2.0 Client Credentials flow and successfully invoke the Cloud OCR inbound REST API.

### 7.1 Generate an Access Token (OAuth 2.0 — Client Credentials)

**Postman request:**

- **Method:** `POST`
- **URL:** Your Token URL (e.g., `https://yourcompany.my.salesforce.com/services/oauth2/token`)

**Headers:**

| Key | Value |
|---|---|
| Content-Type | `application/x-www-form-urlencoded` |

**Body (`x-www-form-urlencoded`):**

| Key | Value |
|---|---|
| `grant_type` | `client_credentials` |
| `client_id` | Your Client ID |
| `client_secret` | Your Client Secret |

**Expected response:**

```json
{
  "access_token": "<token_value>",
  "instance_url": "https://yourcompany.my.salesforce.com",
  "token_type": "Bearer"
}
```

Copy `access_token` for the next step.

### 7.2 Send a Sample API Request (OCR Status Update)

**Postman request:**

- **Method:** `POST`
- **URL:** Your API Endpoint URL (e.g., `https://yourcompany.my.salesforce.com/services/apexrest/cloud/ocr/v1`)

**Headers:**

| Key | Value |
|---|---|
| Authorization | `Bearer <access_token>` |
| Content-Type | `application/json` |

**Body (raw JSON):**

```json
{
  "updates": [
    {
      "storageKey": "<STORAGE_KEY_VALUE>",
      "OCRJobStatus": "SUCCEEDED",
      "OCRStatusMessage": "Completed successfully"
    }
  ]
}
```

**Expected outcome:**

- The API returns HTTP 200 (or a success response payload).
- The following fields are updated:

  **Version**
  - `job_Status__c` = `SUCCEEDED`
  - `OCR_Status_Message__c` = `Completed successfully`

  **Document Profile**
  - `OCR_Job_Status__c` = `SUCCEEDED`
  - `OCR_Status_Message__c` = `Completed successfully`

[SCREENSHOT: Figure 7.1 — Postman showing a successful 200 response from the OCR inbound endpoint]

## 8. Security Notes / Decisions

The choice between Modify All Records (Option A) and a sharing-rule strategy (Option B) on `Document_Profile__c` is the most security-relevant decision in this setup. See §6.3.1 for the side-by-side rationale. Document the chosen approach in your security review artifacts.

All other elements of this integration follow Salesforce best practices:
- The Apex class runs `with sharing`.
- Queries use `WITH SECURITY_ENFORCED`.
- Updates use `Security.stripInaccessible(UPDATABLE, …)` to prevent FLS bypass.
- The integration user has no UI access — practical exposure is limited to the Apex REST endpoint.

## 9. Credentials Summary

Securely store the following values used exclusively for the Recon DMS Cloud OCR inbound integration:

| Item | Source |
|---|---|
| Client ID | External Client App → Settings → Consumer Key |
| Client Secret | External Client App → Settings → Consumer Secret |
| Token URL | `https://<my-domain>/services/oauth2/token` |
| API Base URL | `https://<my-domain>` |
| Endpoint Path | `/services/apexrest/cloud/ocr/v1` |

# Next Steps

With the OCR inbound integration configured, partners can begin uploading files into Recon DMS and rely on the Cloud OCR pipeline to populate `OCR_Job_Status__c` and `OCR_Status_Message__c` automatically. For the end-user upload and search experience, see the [User Navigation Guide](user-guide).
