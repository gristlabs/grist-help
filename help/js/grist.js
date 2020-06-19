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

window.onload = function() {
  expandSelected();
  autoPlayYouTubeModal();
};
window.addEventListener('popstate', expandSelected);
