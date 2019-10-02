"use strict";
/* global window, document */

// When loading a page with #hash in the URL, if #hash refers to a <detail> element, expand the
// detail, and collapse other details.
function expandSelected() {
  var hash = window.location.hash.split('/').slice(-1)[0];
  var elem = hash ? document.querySelector(hash) : null;
  if (elem && elem.tagName === 'DETAILS') {
    for (var el of document.querySelectorAll('details')) {
      el.open = (el === elem);
    }
    // After collapsing other details, the scroll position may be off, so fix it now.
    elem.scrollIntoView();
  }
}

window.onload = expandSelected;
window.addEventListener('popstate', expandSelected);
