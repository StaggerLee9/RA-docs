---
layout: default
title: Home
nav_order: 1
landing: true
---

# Recon Product Suite Documentation
{: .fs-9 }

<p align="center">
  <img src="assets/images/recon-logo.png" alt="Recon logo" style="max-width: 320px;">
</p>

Implementation partners and Salesforce administrators can use this site to plan, deploy, and operate every Recon solution built on the Salesforce platform.
{: .fs-6 .fw-300 }

> This documentation is proprietary and confidential and may not be shared without prior written consent. Sharing without consent shall be considered an explicit breach of applicable non-disclosure or similar agreements.

Use the navigation below to explore platform architecture, individual product hubs, and shared resources that accelerate deployments across the Recon ecosystem.

---

## Product Portfolio

Use the cards below to jump into the documentation hubs for each Recon product. Duplicate a card when you add another product so the landing page always reflects the full portfolio.

<div class="product-grid">
  <section class="product-card">
    <h2><a class="product-card-link" href="pages/products/architecture">Recon Platform Architecture</a></h2>
    <p>See how ReconMMS, Recon DMS, Recon Search, and Recon Data Visualizer interact across intake, document management, analytics, and visualization.</p>
    <ul>
      <li><a href="pages/products/architecture#overall-flow">High-Level Diagram</a></li>
      <li><a href="pages/products/architecture#module-interactions">Module Interactions</a></li>
      <li><a href="pages/products/architecture#key-data-contracts">Key Data Contracts</a></li>
    </ul>
  </section>

  <section class="product-card">
    <h2><a class="product-card-link" href="pages/getting-started">ReconMMS Core</a></h2>
    <p>The managed package that powers the Recon Matter Management System for legal operations teams.</p>
    <ul>
      <li><a href="pages/getting-started">Implementation Checklist</a></li>
      <li><a href="pages/configuration/">Configuration Guides</a></li>
      <li><a href="pages/objects/activity-rule">Data Model Reference</a></li>
      <li><a href="pages/activity-rules">Automation Playbook</a></li>
      <li><a href="pages/workflow-engine">Workflow Engine Docs</a></li>
    </ul>
  </section>

  <section class="product-card">
    <h2><a class="product-card-link" href="pages/products/recon-data-visualizer">Recon Data Visualizer</a></h2>
    <p>Interactive relationship maps that transform complex Salesforce data into clickable D3 graphs with admin-driven configuration.</p>
    <ul>
      <li><a href="pages/products/recon-data-visualizer">Product Overview &amp; Architecture</a></li>
      <li><a href="pages/products/recon-data-visualizer-user-guide#visualizer-admin">Admin Console Walkthrough</a></li>
      <li><a href="pages/products/recon-data-visualizer-user-guide#component-placement">Deploy the Lightning Component</a></li>
      <li><a href="pages/products/recon-data-visualizer-user-guide#connected-app-and-named-credentials-setup">Connected App &amp; Named Credential Setup</a></li>
    </ul>
  </section>

  <section class="product-card">
    <h2><a class="product-card-link" href="pages/products/recon-search">Recon Search</a></h2>
    <p>Turn any Salesforce page layout into a powerful search workspace with saved criteria, SWARM alerts, and optional external data integrations.</p>
    <ul>
      <li><a href="pages/products/recon-search">Product Overview &amp; Architecture</a></li>
      <li><a href="pages/products/recon-search/implementation">Implementation Checklist</a></li>
      <li><a href="pages/products/recon-search/troubleshooting">Troubleshooting Guide</a></li>
      <li><a href="pages/products/recon-search-user-guide">Admin &amp; User Guide</a></li>
    </ul>
  </section>

  <section class="product-card">
    <h2><a class="product-card-link" href="pages/products/recon-dms">Recon DMS</a></h2>
    <p>Capture, classify, and search enterprise documents with a Salesforce-first experience powered by AWS Textract and optional SharePoint integration.</p>
    <ul>
      <li><a href="pages/products/recon-dms">Deployment Overview</a></li>
      <li><a href="pages/products/recon-dms/aws/">AWS Deployment Overview</a></li>
      <li><a href="pages/products/recon-dms/azure-sharepoint">Azure &amp; SharePoint Setup</a></li>
      <li><a href="pages/products/recon-dms/salesforce-installation">Salesforce Configuration</a></li>
    </ul>
  </section>

  <section class="product-card product-placeholder">
    <h2>Product Slot 6</h2>
    <p>Use consistent formatting to make navigation predictable.</p>
    <ul>
      <li><em>Add documentation hub link</em></li>
      <li><em>Add key architecture notes</em></li>
      <li><em>Add support process</em></li>
    </ul>
  </section>
</div>

---

## Cross-Product Resources

### Environment & Deployment
- [Getting Started](pages/getting-started) for prerequisites, install sequence, and first-login tasks
- [Configuration Guides](pages/configuration/) for environment setup across matters, security, and automations
- [Activity Rules Automation](pages/activity-rules) for understanding the managed flows and schedule jobs

### Data Model & Relationships
- [Platform Architecture](pages/products/architecture) for a high-level diagram of Recon products working together
- [Object Reference](pages/objects/activity-rule) to browse Salesforce custom objects
- [Relationship Diagrams](pages/relationships/matter-relationships) for ERDs and integration points

### Operations & Support
- [Workflow Engine](pages/workflow-engine) for orchestration patterns and maintenance
- [Contact & User Setup](pages/contact-user-setup) for provisioning administrators and end users

---

## Stewardship Checklist

- Confirm each product card links to a live documentation hub before release
- Keep installation and configuration instructions aligned with the latest managed package version
- Update relationship diagrams whenever metadata changes are deployed
- Record support escalation paths in every product section for partner reference
