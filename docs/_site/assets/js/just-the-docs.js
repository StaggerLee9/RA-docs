layout: table_wrappers
---

<!DOCTYPE html>
<html lang="en-US">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">

  <link rel="stylesheet" href="/assets/css/just-the-docs-default.css">

  <link rel="stylesheet" href="/assets/css/just-the-docs-head-nav.css" id="jtd-head-nav-stylesheet">

  <style id="jtd-nav-activation">
  
.site-nav ul li a {
  background-image: none;
}

  </style>

  

  
    <script src="/assets/js/vendor/lunr.min.js"></script>
  

  <script src="/assets/js/just-the-docs.js"></script>

  <meta name="viewport" content="width=device-width, initial-scale=1">

  



  <!-- Begin Jekyll SEO tag v2.8.0 -->
<title>ReconMMS Documentation | Documentation for the Recon Matter Management System</title>
<meta name="generator" content="Jekyll v3.10.0" />
<meta property="og:title" content="ReconMMS Documentation" />
<meta property="og:locale" content="en_US" />
<meta name="description" content="Documentation for the Recon Matter Management System" />
<meta property="og:description" content="Documentation for the Recon Matter Management System" />
<link rel="canonical" href="http://localhost:4000/assets/js/just-the-docs.js" />
<meta property="og:url" content="http://localhost:4000/assets/js/just-the-docs.js" />
<meta property="og:site_name" content="ReconMMS Documentation" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary" />
<meta property="twitter:title" content="ReconMMS Documentation" />
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"WebPage","description":"Documentation for the Recon Matter Management System","headline":"ReconMMS Documentation","url":"http://localhost:4000/assets/js/just-the-docs.js"}</script>
<!-- End Jekyll SEO tag -->


  

</head>

<body>
  <a class="skip-to-main" href="#main-content">Skip to main content</a>
  <svg xmlns="http://www.w3.org/2000/svg" class="d-none">
  <symbol id="svg-link" viewBox="0 0 24 24">
  <title>Link</title>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-link">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
  </svg>
</symbol>

  <symbol id="svg-menu" viewBox="0 0 24 24">
  <title>Menu</title>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu">
    <line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
</symbol>

  <symbol id="svg-arrow-right" viewBox="0 0 24 24">
  <title>Expand</title>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
</symbol>

  <!-- Feather. MIT License: https://github.com/feathericons/feather/blob/master/LICENSE -->
<symbol id="svg-external-link" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link">
  <title id="svg-external-link-title">(external link)</title>
  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
</symbol>

  
    <symbol id="svg-doc" viewBox="0 0 24 24">
  <title>Document</title>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file">
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline>
  </svg>
</symbol>

    <symbol id="svg-search" viewBox="0 0 24 24">
  <title>Search</title>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search">
    <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
</symbol>

  
  
    <!-- Bootstrap Icons. MIT License: https://github.com/twbs/icons/blob/main/LICENSE.md -->
<symbol id="svg-copy" viewBox="0 0 16 16">
  <title>Copy</title>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
  </svg>
</symbol>
<symbol id="svg-copied" viewBox="0 0 16 16">
  <title>Copied</title>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-check-fill" viewBox="0 0 16 16">
    <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z"/>
    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708Z"/>
  </svg>
</symbol>

  
</svg>

  <div class="side-bar">
  <div class="site-header" role="banner">
    <a href="/" class="site-title lh-tight">
  ReconMMS Documentation

</a>
    <button id="menu-button" class="site-button btn-reset" aria-label="Toggle menu" aria-pressed="false">
      <svg viewBox="0 0 24 24" class="icon" aria-hidden="true"><use xlink:href="#svg-menu"></use></svg>
    </button>
  </div>

  <nav aria-label="Main" id="site-nav" class="site-nav">
  
  
    <ul class="nav-list"><li class="nav-list-item"><a href="/" class="nav-list-link">Home</a></li><li class="nav-list-item"><button class="nav-list-expander btn-reset" aria-label="toggle items in Object Reference category" aria-pressed="false">
      <svg viewBox="0 0 24 24" aria-hidden="true"><use xlink:href="#svg-arrow-right"></use></svg>
    </button><a href="/pages/object-reference.html" class="nav-list-link">Object Reference</a><ul class="nav-list"><li class="nav-list-item"><button class="nav-list-expander btn-reset" aria-label="toggle items in Objects category" aria-pressed="false">
            <svg viewBox="0 0 24 24" aria-hidden="true"><use xlink:href="#svg-arrow-right"></use></svg>
          </button><a href="/pages/objects/" class="nav-list-link">Objects</a><ul class="nav-list"><li class="nav-list-item">
                <a href="/pages/objects/activity-rule.html" class="nav-list-link">Activity Rule</a>
              </li><li class="nav-list-item">
                <a href="/pages/objects/matter.html" class="nav-list-link">Matter</a>
              </li><li class="nav-list-item">
                <a href="/pages/objects/matter-contact.html" class="nav-list-link">Matter Contact</a>
              </li><li class="nav-list-item">
                <a href="/pages/objects/matter-account.html" class="nav-list-link">Matter Account</a>
              </li><li class="nav-list-item">
                <a href="/pages/objects/matter-note.html" class="nav-list-link">Matter Note</a>
              </li><li class="nav-list-item">
                <a href="/pages/objects/related-matter.html" class="nav-list-link">Related Matter</a>
              </li><li class="nav-list-item">
                <a href="/pages/objects/stage-activity.html" class="nav-list-link">Stage Activity</a>
              </li><li class="nav-list-item">
                <a href="/pages/objects/work-group.html" class="nav-list-link">Work Group</a>
              </li><li class="nav-list-item">
                <a href="/pages/objects/evidence.html" class="nav-list-link">Evidence</a>
              </li><li class="nav-list-item">
                <a href="/pages/objects/evidence-contact.html" class="nav-list-link">Evidence Contact</a>
              </li><li class="nav-list-item">
                <a href="/pages/objects/investigation.html" class="nav-list-link">Investigation</a>
              </li><li class="nav-list-item">
                <a href="/pages/objects/investigation-account.html" class="nav-list-link">Investigation Account</a>
              </li><li class="nav-list-item">
                <a href="/pages/objects/investigation-contact.html" class="nav-list-link">Investigation Contact</a>
              </li><li class="nav-list-item">
                <a href="/pages/objects/city.html" class="nav-list-link">City</a>
              </li><li class="nav-list-item">
                <a href="/pages/objects/county.html" class="nav-list-link">County</a>
              </li><li class="nav-list-item">
                <a href="/pages/objects/district.html" class="nav-list-link">District</a>
              </li><li class="nav-list-item">
                <a href="/pages/objects/state.html" class="nav-list-link">State</a>
              </li><li class="nav-list-item">
                <a href="/pages/objects/docket-rule.html" class="nav-list-link">Docket Rule</a>
              </li><li class="nav-list-item">
                <a href="/pages/objects/request.html" class="nav-list-link">Request</a>
              </li><li class="nav-list-item">
                <a href="/pages/objects/statute.html" class="nav-list-link">Statute</a>
              </li><li class="nav-list-item">
                <a href="/pages/objects/workflow.html" class="nav-list-link">Workflow</a>
              </li><li class="nav-list-item">
                <a href="/pages/objects/workflow-template.html" class="nav-list-link">Workflow Template</a>
              </li><li class="nav-list-item">
                <a href="/pages/objects/workflow-record-type.html" class="nav-list-link">Workflow Record Type</a>
              </li><li class="nav-list-item">
                <a href="/pages/objects/remedy.html" class="nav-list-link">Remedy</a>
              </li><li class="nav-list-item">
                <a href="/pages/objects/recon-user.html" class="nav-list-link">Recon User (Contact)</a>
              </li></ul></li></ul></li><li class="nav-list-item"><button class="nav-list-expander btn-reset" aria-label="toggle items in Object Relationships category" aria-pressed="false">
      <svg viewBox="0 0 24 24" aria-hidden="true"><use xlink:href="#svg-arrow-right"></use></svg>
    </button><a href="/pages/relationships/" class="nav-list-link">Object Relationships</a><ul class="nav-list"><li class="nav-list-item"><a href="/pages/relationships/matter-relationships.html" class="nav-list-link">Matter Relationships</a></li><li class="nav-list-item"><a href="/pages/relationships/invesigation-relationships.html" class="nav-list-link">Investigation Relationships</a></li></ul></li><li class="nav-list-item"><button class="nav-list-expander btn-reset" aria-label="toggle items in Configuration Guide category" aria-pressed="false">
      <svg viewBox="0 0 24 24" aria-hidden="true"><use xlink:href="#svg-arrow-right"></use></svg>
    </button><a href="/pages/configuration/" class="nav-list-link">Configuration Guide</a><ul class="nav-list"><li class="nav-list-item"><a href="/pages/configuration/salesforce-basics.html" class="nav-list-link">Salesforce Basics</a></li><li class="nav-list-item"><a href="/pages/configuration/matter-management.html" class="nav-list-link">Legal Matter Management</a></li><li class="nav-list-item"><a href="/pages/configuration/recon-setup.html" class="nav-list-link">ReconMMS Setup</a></li></ul></li><li class="nav-list-item"><a href="/pages/activity-rules.html" class="nav-list-link">Activity Rules System</a></li><li class="nav-list-item"><a href="/pages/getting-started.html" class="nav-list-link">Getting Started</a></li><li class="nav-list-item"><a href="/pages/workflow-engine.html" class="nav-list-link">Workflow System</a></li></ul>

  
</nav>


  
  
    <footer class="site-footer">
      This site uses <a href="https://github.com/just-the-docs/just-the-docs">Just the Docs</a>, a documentation theme for Jekyll.
    </footer>
  
</div>

  <div class="main" id="top">
    <div id="main-header" class="main-header">
  
    

<div class="search" role="search">
  <div class="search-input-wrap">
    <input type="text" id="search-input" class="search-input" tabindex="0" placeholder="Search ReconMMS Documentation" aria-label="Search ReconMMS Documentation" autocomplete="off">
    <label for="search-input" class="search-label"><svg viewBox="0 0 24 24" class="search-icon"><use xlink:href="#svg-search"></use></svg></label>
  </div>
  <div id="search-results" class="search-results"></div>
</div>

  
  
  
    <nav aria-label="Auxiliary" class="aux-nav">
  <ul class="aux-nav-list">
    
      <li class="aux-nav-list-item">
        <a href="https://github.com/StaggerLee9/RA-docs" class="site-button"
          
        >
          View on GitHub
        </a>
      </li>
    
  </ul>
</nav>

  
</div>

    <div class="main-content-wrap">
      
      <div id="main-content" class="main-content">
        <main>
          (function (jtd, undefined) {

// Event handling

jtd.addEvent = function(el, type, handler) {
  if (el.attachEvent) el.attachEvent('on'+type, handler); else el.addEventListener(type, handler);
}
jtd.removeEvent = function(el, type, handler) {
  if (el.detachEvent) el.detachEvent('on'+type, handler); else el.removeEventListener(type, handler);
}
jtd.onReady = function(ready) {
  // in case the document is already rendered
  if (document.readyState!='loading') ready();
  // modern browsers
  else if (document.addEventListener) document.addEventListener('DOMContentLoaded', ready);
  // IE <= 8
  else document.attachEvent('onreadystatechange', function(){
      if (document.readyState=='complete') ready();
  });
}

// Show/hide mobile menu

function initNav() {
  jtd.addEvent(document, 'click', function(e){
    var target = e.target;
    while (target && !(target.classList && target.classList.contains('nav-list-expander'))) {
      target = target.parentNode;
    }
    if (target) {
      e.preventDefault();
      target.ariaPressed = target.parentNode.classList.toggle('active');
    }
  });

  const siteNav = document.getElementById('site-nav');
  const mainHeader = document.getElementById('main-header');
  const menuButton = document.getElementById('menu-button');

  disableHeadStyleSheets();

  jtd.addEvent(menuButton, 'click', function(e){
    e.preventDefault();

    if (menuButton.classList.toggle('nav-open')) {
      siteNav.classList.add('nav-open');
      mainHeader.classList.add('nav-open');
      menuButton.ariaPressed = true;
    } else {
      siteNav.classList.remove('nav-open');
      mainHeader.classList.remove('nav-open');
      menuButton.ariaPressed = false;
    }
  });
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');

  jtd.addEvent(searchButton, 'click', function(e){
    e.preventDefault();

    mainHeader.classList.add('nav-open');
    searchInput.focus();
  });
}

// The <head> element is assumed to include the following stylesheets:
// - a <link> to /assets/css/just-the-docs-head-nav.css,
//             with id 'jtd-head-nav-stylesheet'
// - a <style> containing the result of _includes/css/activation.scss.liquid.
// To avoid relying on the order of stylesheets (which can change with HTML
// compression, user-added JavaScript, and other side effects), stylesheets
// are only interacted with via ID

function disableHeadStyleSheets() {
  const headNav = document.getElementById('jtd-head-nav-stylesheet');
  if (headNav) {
    headNav.disabled = true;
  }

  const activation = document.getElementById('jtd-nav-activation');
  if (activation) {
    activation.disabled = true;
  }
}
// Site search

function initSearch() {
  var request = new XMLHttpRequest();
  request.open('GET', '/assets/js/search-data.json', true);

  request.onload = function(){
    if (request.status >= 200 && request.status < 400) {
      var docs = JSON.parse(request.responseText);

      lunr.tokenizer.separator = /[\s/]+/

      var index = lunr(function(){
        this.ref('id');
        this.field('title', { boost: 200 });
        this.field('content', { boost: 2 });
        this.field('relUrl');
        this.metadataWhitelist = ['position']

        for (var i in docs) {
          
          this.add({
            id: i,
            title: docs[i].title,
            content: docs[i].content,
            relUrl: docs[i].relUrl
          });
        }
      });

      searchLoaded(index, docs);
    } else {
      console.log('Error loading ajax request. Request status:' + request.status);
    }
  };

  request.onerror = function(){
    console.log('There was a connection error');
  };

  request.send();
}

function searchLoaded(index, docs) {
  var index = index;
  var docs = docs;
  var searchInput = document.getElementById('search-input');
  var searchResults = document.getElementById('search-results');
  var mainHeader = document.getElementById('main-header');
  var currentInput;
  var currentSearchIndex = 0;

  function showSearch() {
    document.documentElement.classList.add('search-active');
  }

  function hideSearch() {
    document.documentElement.classList.remove('search-active');
  }

  function update() {
    currentSearchIndex++;

    var input = searchInput.value;
    if (input === '') {
      hideSearch();
    } else {
      showSearch();
      // scroll search input into view, workaround for iOS Safari
      window.scroll(0, -1);
      setTimeout(function(){ window.scroll(0, 0); }, 0);
    }
    if (input === currentInput) {
      return;
    }
    currentInput = input;
    searchResults.innerHTML = '';
    if (input === '') {
      return;
    }

    var results = index.query(function (query) {
      var tokens = lunr.tokenizer(input)
      query.term(tokens, {
        boost: 10
      });
      query.term(tokens, {
        wildcard: lunr.Query.wildcard.TRAILING
      });
    });

    if ((results.length == 0) && (input.length > 2)) {
      var tokens = lunr.tokenizer(input).filter(function(token, i) {
        return token.str.length < 20;
      })
      if (tokens.length > 0) {
        results = index.query(function (query) {
          query.term(tokens, {
            editDistance: Math.round(Math.sqrt(input.length / 2 - 1))
          });
        });
      }
    }

    if (results.length == 0) {
      var noResultsDiv = document.createElement('div');
      noResultsDiv.classList.add('search-no-result');
      noResultsDiv.innerText = 'No results found';
      searchResults.appendChild(noResultsDiv);

    } else {
      var resultsList = document.createElement('ul');
      resultsList.classList.add('search-results-list');
      searchResults.appendChild(resultsList);

      addResults(resultsList, results, 0, 10, 100, currentSearchIndex);
    }

    function addResults(resultsList, results, start, batchSize, batchMillis, searchIndex) {
      if (searchIndex != currentSearchIndex) {
        return;
      }
      for (var i = start; i < (start + batchSize); i++) {
        if (i == results.length) {
          return;
        }
        addResult(resultsList, results[i]);
      }
      setTimeout(function() {
        addResults(resultsList, results, start + batchSize, batchSize, batchMillis, searchIndex);
      }, batchMillis);
    }

    function addResult(resultsList, result) {
      var doc = docs[result.ref];

      var resultsListItem = document.createElement('li');
      resultsListItem.classList.add('search-results-list-item');
      resultsList.appendChild(resultsListItem);

      var resultLink = document.createElement('a');
      resultLink.classList.add('search-result');
      resultLink.setAttribute('href', doc.url);
      resultsListItem.appendChild(resultLink);

      var resultTitle = document.createElement('div');
      resultTitle.classList.add('search-result-title');
      resultLink.appendChild(resultTitle);

      // note: the SVG svg-doc is only loaded as a Jekyll include if site.search_enabled is true; see _includes/icons/icons.html
      var resultDoc = document.createElement('div');
      resultDoc.classList.add('search-result-doc');
      resultDoc.innerHTML = '<svg viewBox="0 0 24 24" class="search-result-icon"><use xlink:href="#svg-doc"></use></svg>';
      resultTitle.appendChild(resultDoc);

      var resultDocTitle = document.createElement('div');
      resultDocTitle.classList.add('search-result-doc-title');
      resultDocTitle.innerHTML = doc.doc;
      resultDoc.appendChild(resultDocTitle);
      var resultDocOrSection = resultDocTitle;

      if (doc.doc != doc.title) {
        resultDoc.classList.add('search-result-doc-parent');
        var resultSection = document.createElement('div');
        resultSection.classList.add('search-result-section');
        resultSection.innerHTML = doc.title;
        resultTitle.appendChild(resultSection);
        resultDocOrSection = resultSection;
      }

      var metadata = result.matchData.metadata;
      var titlePositions = [];
      var contentPositions = [];
      for (var j in metadata) {
        var meta = metadata[j];
        if (meta.title) {
          var positions = meta.title.position;
          for (var k in positions) {
            titlePositions.push(positions[k]);
          }
        }
        if (meta.content) {
          var positions = meta.content.position;
          for (var k in positions) {
            var position = positions[k];
            var previewStart = position[0];
            var previewEnd = position[0] + position[1];
            var ellipsesBefore = true;
            var ellipsesAfter = true;
            for (var k = 0; k < 5; k++) {
              var nextSpace = doc.content.lastIndexOf(' ', previewStart - 2);
              var nextDot = doc.content.lastIndexOf('. ', previewStart - 2);
              if ((nextDot >= 0) && (nextDot > nextSpace)) {
                previewStart = nextDot + 1;
                ellipsesBefore = false;
                break;
              }
              if (nextSpace < 0) {
                previewStart = 0;
                ellipsesBefore = false;
                break;
              }
              previewStart = nextSpace + 1;
            }
            for (var k = 0; k < 10; k++) {
              var nextSpace = doc.content.indexOf(' ', previewEnd + 1);
              var nextDot = doc.content.indexOf('. ', previewEnd + 1);
              if ((nextDot >= 0) && (nextDot < nextSpace)) {
                previewEnd = nextDot;
                ellipsesAfter = false;
                break;
              }
              if (nextSpace < 0) {
                previewEnd = doc.content.length;
                ellipsesAfter = false;
                break;
              }
              previewEnd = nextSpace;
            }
            contentPositions.push({
              highlight: position,
              previewStart: previewStart, previewEnd: previewEnd,
              ellipsesBefore: ellipsesBefore, ellipsesAfter: ellipsesAfter
            });
          }
        }
      }

      if (titlePositions.length > 0) {
        titlePositions.sort(function(p1, p2){ return p1[0] - p2[0] });
        resultDocOrSection.innerHTML = '';
        addHighlightedText(resultDocOrSection, doc.title, 0, doc.title.length, titlePositions);
      }

      if (contentPositions.length > 0) {
        contentPositions.sort(function(p1, p2){ return p1.highlight[0] - p2.highlight[0] });
        var contentPosition = contentPositions[0];
        var previewPosition = {
          highlight: [contentPosition.highlight],
          previewStart: contentPosition.previewStart, previewEnd: contentPosition.previewEnd,
          ellipsesBefore: contentPosition.ellipsesBefore, ellipsesAfter: contentPosition.ellipsesAfter
        };
        var previewPositions = [previewPosition];
        for (var j = 1; j < contentPositions.length; j++) {
          contentPosition = contentPositions[j];
          if (previewPosition.previewEnd < contentPosition.previewStart) {
            previewPosition = {
              highlight: [contentPosition.highlight],
              previewStart: contentPosition.previewStart, previewEnd: contentPosition.previewEnd,
              ellipsesBefore: contentPosition.ellipsesBefore, ellipsesAfter: contentPosition.ellipsesAfter
            }
            previewPositions.push(previewPosition);
          } else {
            previewPosition.highlight.push(contentPosition.highlight);
            previewPosition.previewEnd = contentPosition.previewEnd;
            previewPosition.ellipsesAfter = contentPosition.ellipsesAfter;
          }
        }

        var resultPreviews = document.createElement('div');
        resultPreviews.classList.add('search-result-previews');
        resultLink.appendChild(resultPreviews);

        var content = doc.content;
        for (var j = 0; j < Math.min(previewPositions.length, 3); j++) {
          var position = previewPositions[j];

          var resultPreview = document.createElement('div');
          resultPreview.classList.add('search-result-preview');
          resultPreviews.appendChild(resultPreview);

          if (position.ellipsesBefore) {
            resultPreview.appendChild(document.createTextNode('... '));
          }
          addHighlightedText(resultPreview, content, position.previewStart, position.previewEnd, position.highlight);
          if (position.ellipsesAfter) {
            resultPreview.appendChild(document.createTextNode(' ...'));
          }
        }
      }
      var resultRelUrl = document.createElement('span');
      resultRelUrl.classList.add('search-result-rel-url');
      resultRelUrl.innerText = doc.relUrl;
      resultTitle.appendChild(resultRelUrl);
    }

    function addHighlightedText(parent, text, start, end, positions) {
      var index = start;
      for (var i in positions) {
        var position = positions[i];
        var span = document.createElement('span');
        span.innerHTML = text.substring(index, position[0]);
        parent.appendChild(span);
        index = position[0] + position[1];
        var highlight = document.createElement('span');
        highlight.classList.add('search-result-highlight');
        highlight.innerHTML = text.substring(position[0], index);
        parent.appendChild(highlight);
      }
      var span = document.createElement('span');
      span.innerHTML = text.substring(index, end);
      parent.appendChild(span);
    }
  }

  jtd.addEvent(searchInput, 'focus', function(){
    setTimeout(update, 0);
  });

  jtd.addEvent(searchInput, 'keyup', function(e){
    switch (e.keyCode) {
      case 27: // When esc key is pressed, hide the results and clear the field
        searchInput.value = '';
        break;
      case 38: // arrow up
      case 40: // arrow down
      case 13: // enter
        e.preventDefault();
        return;
    }
    update();
  });

  jtd.addEvent(searchInput, 'keydown', function(e){
    switch (e.keyCode) {
      case 38: // arrow up
        e.preventDefault();
        var active = document.querySelector('.search-result.active');
        if (active) {
          active.classList.remove('active');
          if (active.parentElement.previousSibling) {
            var previous = active.parentElement.previousSibling.querySelector('.search-result');
            previous.classList.add('active');
          }
        }
        return;
      case 40: // arrow down
        e.preventDefault();
        var active = document.querySelector('.search-result.active');
        if (active) {
          if (active.parentElement.nextSibling) {
            var next = active.parentElement.nextSibling.querySelector('.search-result');
            active.classList.remove('active');
            next.classList.add('active');
          }
        } else {
          var next = document.querySelector('.search-result');
          if (next) {
            next.classList.add('active');
          }
        }
        return;
      case 13: // enter
        e.preventDefault();
        var active = document.querySelector('.search-result.active');
        if (active) {
          active.click();
        } else {
          var first = document.querySelector('.search-result');
          if (first) {
            first.click();
          }
        }
        return;
    }
  });

  jtd.addEvent(document, 'click', function(e){
    if (e.target != searchInput) {
      hideSearch();
    }
  });
}

// Switch theme

jtd.getTheme = function() {
  var cssFileHref = document.querySelector('[rel="stylesheet"]').getAttribute('href');
  return cssFileHref.substring(cssFileHref.lastIndexOf('-') + 1, cssFileHref.length - 4);
}

jtd.setTheme = function(theme) {
  var cssFile = document.querySelector('[rel="stylesheet"]');
  cssFile.setAttribute('href', '/assets/css/just-the-docs-' + theme + '.css');
}

// Note: pathname can have a trailing slash on a local jekyll server
// and not have the slash on GitHub Pages

function navLink() {
  var href = document.location.pathname;
  if (href.endsWith('/') && href != '/') {
    href = href.slice(0, -1);
  }
  return document.getElementById('site-nav').querySelector('a[href="' + href + '"], a[href="' + href + '/"]');
}

// Scroll site-nav to ensure the link to the current page is visible

function scrollNav() {
  const targetLink = navLink();
  if (targetLink) {
    const rect = targetLink.getBoundingClientRect();
    document.getElementById('site-nav').scrollBy(0, rect.top - 3*rect.height);
    targetLink.removeAttribute('href');
  }
}

// Find the nav-list-link that refers to the current page
// then make it and all enclosing nav-list-item elements active.

function activateNav() {
  var target = navLink();
  if (target) {
    target.classList.toggle('active', true);
  }
  while (target) {
    while (target && !(target.classList && target.classList.contains('nav-list-item'))) {
      target = target.parentNode;
    }
    if (target) {
      target.classList.toggle('active', true);
      target = target.parentNode;
    }
  }
}

// Document ready

jtd.onReady(function(){
  initNav();
  initSearch();
  activateNav();
  scrollNav();
});

// Copy button on code

jtd.onReady(function(){

  if (!window.isSecureContext) {
    console.log('Window does not have a secure context, therefore code clipboard copy functionality will not be available. For more details see https://web.dev/async-clipboard/#security-and-permissions');
    return;
  }

  var codeBlocks = document.querySelectorAll('div.highlighter-rouge, div.listingblock > div.content, figure.highlight');

  // note: the SVG svg-copied and svg-copy is only loaded as a Jekyll include if site.enable_copy_code_button is true; see _includes/icons/icons.html
  var svgCopied =  '<svg viewBox="0 0 24 24" class="copy-icon"><use xlink:href="#svg-copied"></use></svg>';
  var svgCopy =  '<svg viewBox="0 0 24 24" class="copy-icon"><use xlink:href="#svg-copy"></use></svg>';

  codeBlocks.forEach(codeBlock => {
    var copyButton = document.createElement('button');
    var timeout = null;
    copyButton.type = 'button';
    copyButton.ariaLabel = 'Copy code to clipboard';
    copyButton.innerHTML = svgCopy;
    codeBlock.append(copyButton);

    copyButton.addEventListener('click', function () {
      if(timeout === null) {
        var code = (codeBlock.querySelector('pre:not(.lineno, .highlight)') || codeBlock.querySelector('code')).innerText;
        window.navigator.clipboard.writeText(code);

        copyButton.innerHTML = svgCopied;

        var timeoutSetting = 4000;

        timeout = setTimeout(function () {
          copyButton.innerHTML = svgCopy;
          timeout = null;
        }, timeoutSetting);
      }
    });
  });

});

})(window.jtd = window.jtd || {});



        </main>
      </div>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', function () {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'forest',
        securityLevel: 'loose'
      });
    });
  </script>
</body>
</html>