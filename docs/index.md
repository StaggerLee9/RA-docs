---
layout: default
title: Home
nav_order: 1
landing: true
---

<div class="rc-hero">
  <div class="rc-hero-inner">
    <img src="assets/images/recon-logo.png" alt="Recon Apps" class="rc-hero-logo">
    <h1 class="rc-hero-title">Recon Product Suite <span class="rc-accent">Documentation</span></h1>
    <p class="rc-hero-subtitle">Plan, deploy, and operate every Recon solution built on the Salesforce platform. Built for implementation partners and Salesforce administrators.</p>
    <div class="rc-hero-actions">
      <a href="pages/getting-started" class="rc-btn rc-btn-primary">Get Started</a>
      <a href="pages/products/architecture" class="rc-btn rc-btn-ghost">View Architecture</a>
    </div>
  </div>
  <div class="rc-notice">
    <p><strong>Confidential</strong> This documentation is proprietary and may not be shared without prior written consent. "Sharing" includes screenshots, printing, and exporting in whole or in part. Any such disclosure shall be considered a breach of applicable non-disclosure agreements.</p>
  </div>
</div>

<h2 class="rc-section-title">Product Portfolio</h2>

<div class="rc-product-grid">
  <div class="rc-product-card" data-product="platform">
    <h3><a href="pages/products/architecture">Recon Platform Architecture</a></h3>
    <p>How ReconMMS, DMS, Search, Data Visualizer, Audit Trail, and Form Builder interact across the platform.</p>
    <ul>
      <li><a href="pages/products/architecture#overall-flow">High-Level Diagram</a></li>
      <li><a href="pages/products/architecture#module-interactions">Module Interactions</a></li>
      <li><a href="pages/products/architecture#key-data-contracts">Key Data Contracts</a></li>
    </ul>
  </div>

  <div class="rc-product-card" data-product="mms">
    <h3><a href="pages/getting-started">ReconMMS Core</a></h3>
    <p>Managed package powering the Recon Matter Management System for legal operations teams.</p>
    <ul>
      <li><a href="pages/getting-started">Implementation Checklist</a></li>
      <li><a href="pages/configuration/">Configuration Guides</a></li>
      <li><a href="pages/objects/activity-rule">Data Model Reference</a></li>
      <li><a href="pages/activity-rules">Automation Playbook</a></li>
      <li><a href="pages/workflow-engine">Workflow Engine</a></li>
    </ul>
  </div>

  <div class="rc-product-card" data-product="visualizer">
    <h3><a href="pages/products/recon-data-visualizer">Recon Data Visualizer</a></h3>
    <p>Interactive relationship maps transforming Salesforce data into clickable D3 graphs with admin-driven configuration.</p>
    <ul>
      <li><a href="pages/products/recon-data-visualizer">Product Overview</a></li>
      <li><a href="pages/products/recon-data-visualizer-user-guide#visualizer-admin">Admin Console</a></li>
      <li><a href="pages/products/recon-data-visualizer-user-guide#component-placement">Lightning Component</a></li>
      <li><a href="pages/products/recon-data-visualizer-user-guide#connected-app-and-named-credentials-setup">Connected App Setup</a></li>
    </ul>
  </div>

  <div class="rc-product-card" data-product="search">
    <h3><a href="pages/products/recon-search">Recon Search</a></h3>
    <p>Turn any Salesforce page layout into a search workspace with saved criteria, SWARM alerts, and external data integrations.</p>
    <ul>
      <li><a href="pages/products/recon-search">Product Overview</a></li>
      <li><a href="pages/products/recon-search/implementation">Implementation Checklist</a></li>
      <li><a href="pages/products/recon-search/troubleshooting">Troubleshooting Guide</a></li>
      <li><a href="pages/products/recon-search-user-guide">Admin &amp; User Guide</a></li>
    </ul>
  </div>

  <div class="rc-product-card" data-product="dms">
    <h3><a href="pages/products/recon-dms">Recon DMS</a></h3>
    <p>Capture, classify, and search enterprise documents with Salesforce-first experience powered by AWS Textract.</p>
    <ul>
      <li><a href="pages/products/recon-dms">Deployment Overview</a></li>
      <li><a href="pages/products/recon-dms/aws/">AWS Deployment</a></li>
      <li><a href="pages/products/recon-dms/azure-sharepoint">Azure &amp; SharePoint</a></li>
      <li><a href="pages/products/recon-dms/salesforce-installation">Salesforce Configuration</a></li>
    </ul>
  </div>

  <div class="rc-product-card" data-product="audit">
    <h3><a href="pages/products/recon-audit-trail">Recon Audit Trail</a></h3>
    <p>Native Salesforce solution capturing high-volume field history with automated backups and searchable audit records.</p>
    <ul>
      <li><a href="pages/products/recon-audit-trail/overview">Product Overview</a></li>
      <li><a href="pages/products/recon-audit-trail/implementation">Implementation Checklist</a></li>
      <li><a href="pages/products/recon-audit-trail/troubleshooting">Operations &amp; Troubleshooting</a></li>
    </ul>
  </div>

  <div class="rc-product-card" data-product="forms">
    <h3><a href="pages/products/recon-form-builder">Recon Form Builder</a></h3>
    <p>Configurable intake builder for interactive forms on Experience Cloud or internal pages with Salesforce routing.</p>
    <ul>
      <li><a href="pages/products/recon-form-builder/overview">Product Overview</a></li>
      <li><a href="pages/products/recon-form-builder/implementation">Implementation Checklist</a></li>
      <li><a href="pages/products/recon-form-builder/troubleshooting">Operations &amp; Troubleshooting</a></li>
    </ul>
  </div>

  <div class="rc-product-card rc-upcoming" data-product="ai">
    <h3><a href="pages/products/recon-ai">ReconAI</a></h3>
    <p>Schema-aware conversational AI delivering secure, natural language answers over Salesforce and connected Recon data.</p>
    <ul>
      <li><a href="pages/products/recon-ai/overview">Product Overview</a></li>
    </ul>
  </div>
</div>

---

<h2 class="rc-section-title">Cross-Product Resources</h2>

<div class="rc-resources">
  <div class="rc-resource-group">
    <h3>Environment &amp; Deployment</h3>
    <ul>
      <li><a href="pages/getting-started">Getting Started</a></li>
      <li><a href="pages/configuration/">Configuration Guides</a></li>
      <li><a href="pages/activity-rules">Activity Rules Automation</a></li>
    </ul>
  </div>

  <div class="rc-resource-group">
    <h3>Data Model &amp; Relationships</h3>
    <ul>
      <li><a href="pages/products/architecture">Platform Architecture</a></li>
      <li><a href="pages/objects/activity-rule">Object Reference</a></li>
      <li><a href="pages/relationships/matter-relationships">Relationship Diagrams</a></li>
    </ul>
  </div>

  <div class="rc-resource-group">
    <h3>Operations &amp; Support</h3>
    <ul>
      <li><a href="pages/workflow-engine">Workflow Engine</a></li>
      <li><a href="pages/contact-user-setup">Contact &amp; User Setup</a></li>
      <li><a href="pages/external-intake/">External Intake</a></li>
    </ul>
  </div>
</div>
