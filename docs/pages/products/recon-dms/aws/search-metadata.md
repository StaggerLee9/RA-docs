---
layout: default
title: Search & Metadata Services
description: Configure OpenSearch and MongoDB to store Recon DMS OCR results and metadata.
grand_parent: Recon DMS
parent: AWS Deployment Overview
nav_order: 2
has_toc: true
nav_scope: recon-dms
nav_scope_title: Recon DMS
nav_scope_root: /pages/products/recon-dms/
---

# Search & Metadata Services

This module provisions the AWS services that index Textract output and store document metadata—OpenSearch for search queries and MongoDB on EC2 for structured data.

> **Audience**  
> AWS administrators and database engineers who manage OpenSearch clusters and MongoDB instances.

## 1. Create the OpenSearch Domain

1. Open **Amazon OpenSearch Service → Create domain**.  
2. Choose **Standard create** and select the latest OpenSearch version (2.19 or later).  
3. Configure compute: r7g.large.search (or equivalent), Multi-AZ with Standby for production.  
4. Use public access only if required; otherwise prefer VPC access.  
5. Enable **Fine-grained access control** and set a dedicated master user.  
6. Configure EBS gp3 volumes sized for anticipated index growth.  
7. Review and create the domain.

### Post-Creation Tasks

1. Log in to the OpenSearch Dashboards URL using the master credentials.  
2. Create the Recon DMS index using the provided mapping JSON (see internal reference).  
3. Update index settings to increase nested object and result window limits:  
   ```json
   {
     "index.mapping.nested_objects.limit": "80000",
     "index.max_inner_result_window": "100000",
     "index.max_result_window": "100000"
   }
   ```  
4. Record the base domain URL and credentials—they are required for Lambda environment variables.

### Verification

- Run a sample query via Dev Tools (`GET recon-dms-index/_search`) to ensure the index exists.  
- Confirm the index settings reflect the updated thresholds.  
- Check CloudWatch metrics (CPU, FreeStorageSpace) to establish a baseline.

### Troubleshooting

| Issue | Resolution |
|-------|------------|
| OpenSearch dashboard not reachable | Ensure the security group allows access from your IP or VPC. Verify fine-grained access credentials. |
| Index creation returns `unauthorized` | Use the master user defined during domain creation or create an IAM policy allowing `es:ESHttpPut`. |
| Lambda queries fail with SSL errors | Add the domain certificate to the Lambda container trust store or disable certificate verification temporarily for testing. |

## 2. Provision MongoDB on EC2

Recon DMS uses MongoDB to store metadata and job status. The reference deployment hosts MongoDB on an EC2 instance.

1. Launch an EC2 instance (Amazon Linux 2 or Ubuntu) sized at least `t3.xlarge`, 20 GB storage.  
2. Assign a security group that allows SSH (22) and MongoDB (27017) from trusted addresses (e.g., the VPC or specific Lambda security groups).  
3. Connect via SSH and install MongoDB using the [official instructions](https://www.mongodb.com/docs/manual/installation/).  
4. Enable and start the service (`sudo systemctl enable mongod && sudo systemctl start mongod`).

### Configure Authentication

1. Connect with `mongosh`.  
2. Create an admin user:  
   ```javascript
   use admin
   db.createUser({ user: "admin", pwd: "<StrongPassword>", roles: [{ role: "root", db: "admin" }] })
   ```  
3. Create the application database and user:  
   ```javascript
   use ReconDMSMongoDB
   db.createUser({ user: "reconUser", pwd: "<StrongPassword>", roles: [{ role: "readWrite", db: "ReconDMSMongoDB" }] })
   ```  
4. Edit `/etc/mongod.conf` to enable authentication (`authorization: enabled`) and bind to trusted IPs.  
5. Restart MongoDB.

### Security Group Updates

- In the EC2 console, add inbound rules for port 27017 from the Lambda security groups and admin IP addresses.  
- Restrict access to specific CIDR ranges; avoid `0.0.0.0/0` unless required for testing.

### Verification

- Connect from the Lambda VPC (or bastion host) using the Mongo URI with credentials.  
- Insert and retrieve a test document to ensure read/write access works.  
- Monitor CloudWatch metrics for CPU, memory, and storage utilization.

### Troubleshooting

| Issue | Resolution |
|-------|------------|
| `Authentication failed` connecting from Lambda | Verify the connection string uses the admin/application user credentials and that passwords are URI-encoded. |
| Cannot reach MongoDB | Confirm security group rules and network ACLs. If using TLS, verify certificates match the domain. |
| MongoDB stops after reboot | Ensure `systemctl enable mongod` was executed. Check `/var/log/mongodb/mongod.log` for startup errors. |

## Next Steps

Continue to [API & Automation Services](integration-automation) to configure API Gateway, EventBridge schedules, and SNS topics that orchestrate Recon DMS workflows.
