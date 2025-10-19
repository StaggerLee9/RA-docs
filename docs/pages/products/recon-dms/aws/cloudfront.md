---
layout: default
title: CloudFront Distribution (Optional)
description: Configure Amazon CloudFront for Recon DMS deployments that require CDN delivery in commercial AWS regions.
grand_parent: Recon DMS
parent: AWS Deployment Overview
nav_order: 4
has_toc: true
nav_scope: recon-dms
nav_scope_title: Recon DMS
nav_scope_root: /pages/products/recon-dms/
---

# CloudFront Distribution (Optional)

> **Use this module only if you are deploying Recon DMS in a commercial AWS region.** CloudFront is not available in GovCloud.

> **Audience**  
> AWS administrators who manage CDN and edge security services.

## 1. Create the Distribution

1. Open **CloudFront → Distributions → Create distribution**.  
2. Choose **Web (Application or website)**.  
3. Select the Recon DMS S3 bucket as the origin.  
4. Configure cache behavior: HTTPS-only viewer protocol, `GET/HEAD/OPTIONS` methods, CORS-S3Origin request policy, SimpleCORS response header policy, CacheOptimized cache policy.  
5. Enable AWS WAF (recommended) without monitor mode.  
6. Review and create the distribution. Record the distribution ID and domain name.

## 2. Configure Trusted Key Groups

1. In **CloudFront → Public keys**, upload your RSA 2048 public key.  
2. Create a **Key group** that references the public key.  
3. Edit the distribution behavior and enable **Restricted viewer access** using the trusted key group.  
4. Securely store the private key—you will use it to sign URLs.  
5. Note the public key ID for Salesforce configuration.

## 3. Attach WAF Rules

1. Navigate to **WAF & Shield → Web ACLs → Create web ACL**.  
2. Add managed rules (AWS Common, SQL Injection, XSS) and optional custom rules.  
3. Associate the ACL with the CloudFront distribution.  
4. Monitor WAF metrics to verify requests are allowed or blocked as expected.

## Verification Checklist

- Access the CloudFront domain URL and confirm files download successfully.  
- Attempt to access the S3 bucket URL directly; it should be blocked if public access is disabled.  
- Review CloudFront access logs (if enabled) to ensure traffic flows through the CDN.  
- Confirm signed URLs work using the generated private key.

## Troubleshooting

| Issue | Resolution |
|-------|------------|
| Viewer receives `403` from CloudFront | Ensure the origin access is configured correctly and that signed URLs include the trusted key group ID. |
| WAF blocks legitimate traffic | Adjust rule priorities or add an allow list for trusted IP ranges. |
| Files accessible directly from S3 | Double-check bucket policies and block public access settings. |

## Next Steps

Proceed to [Resilience & Validation](resilience) to configure AWS Backup and perform end-to-end smoke tests.
