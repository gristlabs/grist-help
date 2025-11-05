"use strict";
/* global window, document */

// When loading a page with #hash in the URL, if #hash refers to a <detail> element, expand the
// detail, and collapse other details.
function expandSelected() {
  var hash = window.location.hash.split('/').slice(-1)[0];
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
    const trigger = event.target.closest('[data-toggle="modal"][data-theVideo]');
    if (!trigger) return;
    const theModal = trigger.dataset.target;
    const videoSRC = trigger.dataset.theVideo;
    const iframe = document.querySelector(`${theModal} iframe`);
    if (!iframe) return;
    iframe.src = videoSRC + "?rel=0&autoplay=1";
    iframe.addEventListener('hidden.bs.modal', function(e) {
      iframe.src = '';
    });
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

window.onload = function() {
  addHeaderLink();
  expandSelected();
  autoPlayYouTubeModal();
  maybeSetUpYouTubeAPI();
  enableHomeSearchButton();
};
window.addEventListener('popstate', expandSelected);
