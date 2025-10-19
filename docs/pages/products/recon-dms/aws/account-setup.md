---
layout: default
title: Account & IAM Foundations
description: Create the AWS account structure, IAM roles, and workstation prerequisites required for Recon DMS.
grand_parent: Recon DMS
parent: AWS Deployment Overview
nav_order: 0
has_toc: true
nav_scope: recon-dms
nav_scope_title: Recon DMS
nav_scope_root: /pages/products/recon-dms/
---

# Account & IAM Foundations

This module prepares the AWS environment for Recon DMS by creating the baseline account, IAM identities, and workstation tools needed for later modules.

> **Audience**  
> Cloud administrators who manage AWS accounts, IAM policies, and workstation tooling.

## 1. Gather Prerequisites

- **AWS account** – Commercial or GovCloud. Ensure billing is activated and you have either root credentials or an administrative IAM role.  
- **CLI workstation** – Install the [AWS CLI](https://aws.amazon.com/cli/) and configure it with the target account.  
- **Docker Desktop** – Required to push Recon DMS container images into Amazon ECR.  
- **Domain (optional)** – If you plan to secure MongoDB with TLS, obtain or register the domain now.

### Verification

- Run `aws sts get-caller-identity` to confirm the CLI is pointed at the correct account.  
- Run `docker info` to ensure Docker Desktop is running and able to connect to Docker Hub/ECR.

## 2. Create the AWS Account (if needed)

Follow standard AWS onboarding:  
1. Visit the [AWS signup page](https://aws.amazon.com/).  
2. Provide billing information and choose the support plan (the default Basic plan is sufficient).  
3. Log in to the [AWS Management Console](https://aws.amazon.com/console/) with the new credentials.

### Verification

- Confirm you can access the console and switch to the region you will use for Recon DMS (US East/West recommended).  
- Attach the account to your organization or control tower if required by corporate policy.

## 3. Provision Administrative IAM Users

1. In the AWS console, open **IAM → Users → Add users**.  
2. Create a user such as `recon-admin` with console and programmatic access.  
3. Attach appropriate policies (AdministratorAccess or a custom policy that includes S3, Textract, Lambda, OpenSearch, EC2, EventBridge, SNS, CloudWatch, CloudFront, ECR, and Backup).  
4. Generate and download access keys for the user—store them securely (e.g., in a password vault).  
5. Repeat as needed for break-glass or automation users.

> **Security Tip**  
> Require MFA on administrative users and rotate access keys after handover to the operations team.

### Verification

- Use the new IAM user with the AWS CLI (`aws configure`) and run `aws iam list-roles` to confirm permissions.  
- Attempt to create a test S3 bucket or Lambda function and then delete it to validate access.

## 4. Share Account ID for ECR Access

Recon DMS container images are published to a source AWS account. Provide your AWS account ID to Recon so they can grant cross-account access to the ECR repositories. Once notified the share is complete:

1. Run `aws ecr describe-repositories --region us-east-1` to confirm you can list the shared repositories.  
2. Note the repository ARNs—they will be used in the *Storage & Processing Services* module.

### Troubleshooting

| Issue | Resolution |
|-------|------------|
| CLI returns `AccessDenied` when listing services | Confirm you used the new IAM user credentials. Verify the policy grants the necessary permissions. |
| Docker login to ECR fails | Ensure the account ID has been shared by Recon. Re-run `aws ecr get-login-password` with the correct profile and region. |
| MFA prompts during automation | Create a separate IAM role for automation with controlled permissions and assume-role flow instead of a user credential. |

## Next Steps

Proceed to [Storage & Processing Services](storage-processing) to create S3 buckets, Textract roles, Lambda functions, and ECR repositories.
