"use strict";
/* global window, document */

/* Note: as there is no build system, make sure every vendor has a unique name
to prevent caching issues. */
import A11yDialog from './vendor/a11y-dialog.8.1.4.esm.min.js';

// When loading a page with #hash in the URL, if #hash refers to a <detail> element, expand the
// detail, and collapse other details.
// Note: the "expand the detail" part doesn't seem necessary to code at first (I guess the browser
// or the material theme does it?), but we keep it mostly to correctly scroll into view.
function expandSelected() {
  let hash = window.location.hash;

  // We use a dummy header for the sake of search snippets in the Function Reference. If we get an
  // anchor for that header, replace with the one we actually want, to get the normal scrolling
  // and expansion.
  const m = hash.match(/^#(.+)--search$/);
  if (m) {
    const realId = m[1];
    if (document.getElementById(realId)) {
      requestAnimationFrame(() => { location.replace('#' + realId); });
      return;
    }
  }

  var elem = hash ? document.querySelector(hash) : null;
  if (!elem) { return; }
  var closestExpandableElem = elem.closest('details');

  if (!closestExpandableElem) {
    return;
  }

  for (var el of document.querySelectorAll('details')) {
    el.open = (el === closestExpandableElem);
  }

  // After collapsing other details, the scroll position may be off, so fix it now.
  elem.scrollIntoView();
}

// Function to get and auto play YouTube video from data tag.
// From https://stackoverflow.com/a/23629470/328565
function autoPlayYouTubeModal(){
  document.body.addEventListener('click', function(event) {
    const trigger = event.target.closest('[data-dialog-open][data-theVideo]');
    if (!trigger) return;
    const theModal = `#${trigger.getAttribute('data-dialog-open')}`;
    const videoSRC = trigger.getAttribute('data-theVideo');
    const container = document.querySelector(theModal);
    const iframe = container?.querySelector('iframe');
    if (!iframe) return;
    iframe.src = videoSRC + "?rel=0&autoplay=1";
    container.addEventListener("hide", () => { console.log("AAAAAAAAAAAA"); iframe.src = ''; });
  });
}

function getYouTubeIframes() {
  return Array.from(document.querySelectorAll('iframe[src*="youtube.com"]'));
}

// Automatically include YouTube Iframe API script if the page contains multiple YouTube videos.
// This is then used to ensure that at most one video at a time is playing.
function maybeSetUpYouTubeAPI() {
  // Check if there are multiple YouTube videos.
  const youtubeIframes = getYouTubeIframes();
  if (youtubeIframes.length > 1) {
    // If so, update YouTube links to enable JS API.
    youtubeIframes.forEach(iframe => {
      if (!iframe.src.includes('enablejsapi=')) {
        iframe.src += '&enablejsapi=1&origin=' + location.origin;
      }
    });

    // If there isn't yet a YouTube script tag, add one.
    if (!document.querySelector('script[href^="https://www.youtube.com/iframe_api"]')) {
      const elem = document.createElement('script');
      elem.setAttribute('src', "https://www.youtube.com/iframe_api");
      document.head.appendChild(elem);
    }
  }
}

// When the are multiple YouTube videos on a page, we can ensure at most one at a time is playing.
// The setup in maybeSetUpYouTubeApi adds youtube API to the page, which calls this
// specially-named setup method.
function onYouTubeIframeAPIReady() {
  let playing = null;

  function onStateChange(player, event) {
    if (event.data == 1) {
      if (playing && playing !== player) {
        playing.pauseVideo();
      }
      playing = player;
    } else if (playing === player) {
      playing = null;
    }
  }

  getYouTubeIframes().forEach(iframe => {
    const player = new YT.Player(iframe, {
      events: {
        onStateChange: (ev) => onStateChange(player, ev),
      }
    });
  });
}

/**
 * This adds an anchor tag on the header title text.
 * This is done in JS to avoid overriding the whole mkdocs-material header partial just for this.
 */
function addHeaderLink() {
  const headerLink = document.querySelector('.md-header__button.md-logo')?.href;
  if (!headerLink) {
    return;
  }
  const headerTitleWrapper = document.querySelector('.md-header__topic');
  if (!headerTitleWrapper) {
    return;
  }
  // Hide this anchor from assistive tools: we already have an anchor on the logo.
  // This trick is done mostly to have a better "mouse UX" so that the whole heading is clickable,
  // but we don't need this with keyboard/assistive tools UX.
  // And it's easier to use a <a> tag and hide it from assistive tools, than adding click handlers on a div
  // (as this automatically handles ctrl+click, middle mouse click, etc.).
  headerTitleWrapper.outerHTML = `<a aria-hidden="true" tabindex="-1" class="md-header__topic" href="${headerLink}">${headerTitleWrapper.innerHTML}</a>`;
}

/* we currently don't have an actual search page. But the home page shows a search button.
 As a middleground for now, this button just opens the functional search input shown in the header. */
function enableHomeSearchButton() {
  const searchButton = document.querySelector('.g-home-hero button');
  if (!searchButton) {
    return;
  }
  // simulate click on .md-search__input
  searchButton.addEventListener('click', function() {
    const searchInput = document.querySelector('.md-search__input');
    if (!searchInput) {
      return;
    }
    searchInput.focus();
  });
}

/**
 * When user searches and presses enter, go to /search page.
 */
window.document$.subscribe(function () {
  const form  = document.querySelector('.md-search__form');
  const input = form && form.querySelector('.md-search__input');
  if (!form || !input) return;

  function search() {
    const q = input.value.trim();
    if (!q) { return; }
    const rootUrl = document.querySelector('.md-header__button.md-logo').getAttribute('href');
    window.location.href = rootUrl.replace(/\/$/, '') + '/search/?q=' + encodeURIComponent(q);
  }

  input.addEventListener('keydown', function (ev) {
    if (ev.key !== 'Enter') { return; }
    ev.preventDefault();
    ev.stopPropagation();
    search();
  });

  const result = document.querySelector('.md-search-result__meta')
  if (result) {
    const searchButton = document.createElement('button');
    searchButton.textContent = window.extraTranslations['g.search.view_all'];
    searchButton.className = 'search-all-button';
    searchButton.addEventListener('click', search);
    result.after(searchButton);
  }
});



/* Our API reference is generated with redoc and has its own styles.
Remove the material theme classes that interfere. */
function cleanApiContentStyles() {
  const apiContent = document.querySelector('#api-content');
  if (!apiContent) {
    return;
  }
  document.querySelector('.api-header')?.classList.add('md-typeset');
  document.querySelector('.md-content__inner.md-typeset')?.classList.remove('md-typeset');
}

function initDialog(id, { onOpen } = {}) {
  const dialog = new A11yDialog(document.getElementById(id));
  const body = document.querySelector("body");
  dialog.on("show", function () {
    body.setAttribute("data-dialog-open", "true");
    if (dialog.$el.querySelector("[data-default-dialog-focus]")) {
      setTimeout(() => {
        dialog.$el.querySelector("[data-default-dialog-focus]").focus();
      }, 0);
    }
  });

  dialog.on("hide", function () {
    body.removeAttribute("data-dialog-open");
  });

  document.querySelectorAll(`[data-dialog-open="${id}"]`).forEach((button) => {
    button.addEventListener("click", () => {
      dialog.show();
      onOpen?.(button, dialog);
    });
  });

  document.getElementById(id).querySelectorAll(".g-dialog-close").forEach((button) => {
    button.setAttribute("aria-label", window.extraTranslations["g.dialog.close"]);
  });

  return dialog;
}

function initDialogs() {
  const dialogTriggers = document.querySelectorAll("[data-dialog-open]");
  dialogTriggers.forEach((trigger) => {
    initDialog(trigger.getAttribute("data-dialog-open"));
  });
}

window.onload = function() {
  initDialogs();
  addHeaderLink();
  expandSelected();
  autoPlayYouTubeModal();
  maybeSetUpYouTubeAPI();
  enableHomeSearchButton();
  cleanApiContentStyles();
};
window.addEventListener('popstate', expandSelected);
