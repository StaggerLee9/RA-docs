(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var navScope = document.body.dataset.navScope || '';
    if (!navScope) {
      return;
    }

    var navTitle = document.body.dataset.navTitle || '';
    var navRootPath = document.body.dataset.navRoot || '';
    if (!navRootPath && navScope) {
      navRootPath = '/pages/products/' + navScope + '.html';
    }

    var siteTitle = document.querySelector('.site-title');
    if (siteTitle && navTitle) {
      siteTitle.textContent = navTitle;
    }

    var navRoot = document.querySelector('.site-nav > ul.nav-list');
    if (!navRoot) {
      return;
    }

    var selector = 'a[href$="' + navRootPath + '"]';
    var productLink = navRoot.querySelector(selector);
    if (!productLink) {
      return;
    }

    var productItem = productLink.closest('li');
    if (!productItem) {
      return;
    }

    var cloned = productItem.cloneNode(true);
    var expander = cloned.querySelector('button.nav-list-expander');
    var nested = cloned.querySelector('ul.nav-list');
    if (expander) {
      expander.setAttribute('aria-pressed', 'true');
    }
    if (nested) {
      nested.style.display = 'block';
    }

    navRoot.innerHTML = '';
    navRoot.appendChild(cloned);
  });
})();
