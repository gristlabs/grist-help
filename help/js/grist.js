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

// Function to get and auto play YouTube video from data tag.
// From https://stackoverflow.com/a/23629470/328565
function autoPlayYouTubeModal(){
  $('body').on('click', '[data-toggle="modal"][data-theVideo]', function() {
    var theModal = $(this).data("target");
    var videoSRC = $(this).attr("data-theVideo");
    $(theModal).find('iframe').attr('src', videoSRC + "?rel=0&autoplay=1");
    $(theModal).on('hidden.bs.modal', function(e) {
      $(theModal).find('iframe').attr('src', '');
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

window.onload = function() {
  expandSelected();
  autoPlayYouTubeModal();
  maybeSetUpYouTubeAPI();
};
window.addEventListener('popstate', expandSelected);
