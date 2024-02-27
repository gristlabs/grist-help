/* global window, document, $, hljs, elasticlunr, base_url, is_top_frame */
/* exported getParam */
/* COPY OF js/base.js FROM mkdocs_windmill; changes marked with "CHANGED" comments */
"use strict";

var rootUrl = qualifyUrl(base_url);
var searchIndex = null;
var showPageToc = true;
var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var Keys = {
  ENTER:  13,
  ESCAPE: 27,
  UP:     38,
  DOWN:   40,
};

function startsWith(str, prefix) { return str.lastIndexOf(prefix, 0) === 0; }
function endsWith(str, suffix) { return str.indexOf(suffix, str.length - suffix.length) !== -1; }

/**
 * Returns whether to use small-screen mode. Note that the same size is used in css @media block.
 */
function isSmallScreen() {
  return window.matchMedia("(max-width: 600px)").matches;
}

/**
 * Given a relative URL, returns the absolute one, relying on the browser to convert it.
 */
function qualifyUrl(url) {
  var a = document.createElement('a');
  a.href = url;
  return a.href;
}

/**
 * Turns an absolute path to relative, stripping out rootUrl + separator.
 */
function getRelPath(separator, absUrl) {
  var prefix = rootUrl + (endsWith(rootUrl, separator) ? '' : separator);
  return startsWith(absUrl, prefix) ? absUrl.slice(prefix.length) : null;
}

function getUrl(relPath) {
  return new URL(relPath, rootUrl).href;
}

/**
 * Returns the value of the given parameter in the URL's query portion.
 */
function getParam(key) {
  var params = window.location.search.substring(1).split('&');
  for (var i = 0; i < params.length; i++) {
    var param = params[i].split('=');
    if (param[0] === key) {
      return decodeURIComponent(param[1].replace(/\+/g, '%20'));
    }
  }
}

/**
 * Update the state of the button toggling table-of-contents. TOC has different behavior
 * depending on screen size, so the button's behavior depends on that too.
 */
function updateTocButtonState() {
  var shown;
  if (isSmallScreen()) {
    shown = $('.wm-toc-pane').hasClass('wm-toc-dropdown');
  } else {
    shown = !$('#main-content').hasClass('wm-toc-hidden');
  }
  $('#wm-toc-button').toggleClass('active', shown);
}

/**
 * When TOC is a dropdown (on small screens), close it.
 */
function closeTempItems() {
  $('.wm-toc-dropdown').removeClass('wm-toc-dropdown');
  $('#mkdocs-search-query').closest('.wm-top-tool').removeClass('wm-top-tool-expanded');
  updateTocButtonState();
}

/**
 * Initialize the main window.
 */
function initMainWindow() {
  // wm-toc-button either opens the table of contents in the side-pane, or (on smaller screens)
  // shows the side-pane as a drop-down.
  $('#wm-toc-button').on('click', function(e) {
    if (isSmallScreen()) {
      $('.wm-toc-pane').toggleClass('wm-toc-dropdown');
      $('#wm-main-content').removeClass('wm-toc-hidden');
    } else {
      $('#main-content').toggleClass('wm-toc-hidden');
      closeTempItems();
    }
    updateTocButtonState();
  });

  // Update the state of the wm-toc-button
  updateTocButtonState();
  $(window).on('resize', function() {
    updateTocButtonState();
  });

  // Connect up the Back and Forward buttons (if present).
  $('#hist-back').on('click', function(e) { window.history.back(); });
  $('#hist-fwd').on('click', function(e) { window.history.forward(); });

  // When the side-pane is a dropdown, hide it on click-away.
  $(window).on('blur', closeTempItems);

  // When we click on an opener in the table of contents, open it.
  $('.wm-toc-pane').on('click', '.wm-toc-opener', function(e) {
    $(this).toggleClass('wm-toc-open');
    $(this).next('.wm-toc-li-nested').collapse('toggle');
  });
  $('.wm-toc-pane').on('click', '.wm-page-toc-opener', function(e) {
    // Ignore clicks while transitioning.
    if ($(this).next('.wm-page-toc').hasClass('collapsing')) { return; }
    showPageToc = !showPageToc;
    $(this).toggleClass('wm-page-toc-open', showPageToc);
    $(this).next('.wm-page-toc').collapse(showPageToc ? 'show' : 'hide');
    return false;
  });
  $('.wm-page-toc').on('click', closeTempItems);

  // Initialize search functionality.
  initSearch();

  $('#wm-language-select').on('change', function() {
    // Hint the user if they're using in live mode (which doesn't support language switching).
    // This should not happen in production, so an alert is fine.
    if (this.dataset.unavailable) {
      alert(
        'The website is run using "./docs.py live [lang]", which is meant for a single language.\n\n'
        + 'Please run it using "./docs.py build-all" and then "./docs.py serve" to test the language selector.'
      );
      return false;
    }
    var currentLang = document.documentElement.lang || 'en';

    var matchLangInPath = new RegExp('^/' + (currentLang === 'en' ? '' : currentLang + '/'));
    location.pathname = location.pathname.replace(matchLangInPath, $(this).val());
  });
}

// Other initialization of iframe contents.
hljs.initHighlightingOnLoad();

// Main window.
$(document).ready(function() {
  initMainWindow();
  $('table').addClass('table table-striped table-hover table-bordered table-condensed');
});


var searchIndexReady = false;

/**
 * Initialize search functionality.
 */
function initSearch() {
  // Create elasticlunr index.
  searchIndex = elasticlunr(function() {
    this.setRef('location');
    this.addField('title');
    this.addField('text');
  });

  var searchBox = $('#mkdocs-search-query');
  var searchResults = $('#mkdocs-search-results');

  // Fetch the prebuilt index data, and add to the index.
  var lang = document.documentElement.lang || 'en';
  var searchPath = '/search/search_index.json';
  if (lang !== 'en') {
    searchPath = '/' + lang + searchPath;
  }
  $.getJSON(getUrl(searchPath))
  .done(function(data) {
    data.docs.forEach(function(doc) {
      searchIndex.addDoc(doc);
    });
    searchIndexReady = true;
    $(document).trigger('searchIndexReady');
  });

  function showSearchResults(optShow) {
    var show = (optShow === false ? false : Boolean(searchBox.val()));
    if (show) {
      doSearch({
        resultsElem: searchResults,
        query: searchBox.val(),
        snippetLen: 100,
        limit: 10
      });
    }
    searchResults.parent().toggleClass('open', show);
    return show;
  }

  searchBox.on('click', function(e) {
    if (!searchResults.parent().hasClass('open')) {
      if (showSearchResults()) {
        e.stopPropagation();
      }
    }
  });

  // Search automatically and show results on keyup event.
  searchBox.on('keyup', function(e) {
    var show = (e.which !== Keys.ESCAPE && e.which !== Keys.ENTER);
    showSearchResults(show);
  });

  // Open the search box (and run the search) on up/down arrow keys.
  searchBox.on('keydown', function(e) {
    if (e.which === Keys.UP || e.which === Keys.DOWN) {
      if (showSearchResults()) {
        e.stopPropagation();
        e.preventDefault();
        setTimeout(function() {
          searchResults.find('a').eq(e.which === Keys.UP ? -1 : 0).focus();
        }, 0);
      }
    }
  });

  searchResults.on('keydown', function(e) {
    if (e.which === Keys.UP || e.which === Keys.DOWN) {
      if (searchResults.find('a').eq(e.which === Keys.UP ? 0 : -1)[0] === e.target) {
        searchBox.focus();
        e.stopPropagation();
        e.preventDefault();
      }
    }
  });

  $(searchResults).on('click', '.search-all', function(e) {
    e.stopPropagation();
    e.preventDefault();
    $('#wm-search-form').trigger('submit');
  });

  $('#wm-search-show,#wm-search-go').on('click', function(e) {
    if (isSmallScreen()) {
      e.preventDefault();
      var el = $('#mkdocs-search-query').closest('.wm-top-tool');
      el.toggleClass('wm-top-tool-expanded');
      if (el.hasClass('wm-top-tool-expanded')) {
        setTimeout(function() {
          $('#mkdocs-search-query').focus();
          showSearchResults();
        }, 0);
        $('#mkdocs-search-query').focus();
      }
    }
  });
}

function escapeRegex(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

/**
 * This helps construct useful snippets to show in search results, and highlight matches.
 */
function SnippetBuilder(query) {
  var termsPattern = elasticlunr.tokenizer(query).map(escapeRegex).join("|");
  this._termsRegex = termsPattern ? new RegExp(termsPattern, "gi") : null;
}

SnippetBuilder.prototype.getSnippet = function(text, len) {
  if (!this._termsRegex) {
    return text.slice(0, len);
  }

  // Find a position that includes something we searched for.
  var pos = text.search(this._termsRegex);
  if (pos < 0) { pos = 0; }

  // Find a period before that position (a good starting point).
  var start = text.lastIndexOf('.', pos) + 1;
  if (pos - start > 30) {
    // If too long to previous period, give it 30 characters, and find a space before that.
    start = text.lastIndexOf(' ', pos - 30) + 1;
  }
  var rawSnippet = text.slice(start, start + len);
  return rawSnippet.replace(this._termsRegex, '<b>$&</b>');
};

/**
 * Search the elasticlunr index for the given query, and populate the dropdown with results.
 */
function doSearch(options) {
  var resultsElem = options.resultsElem;
  resultsElem.empty();

  // If the index isn't ready, wait for it, and search again when ready.
  if (!searchIndexReady) {
    resultsElem.append($('<li class="disabled"><a class="search-link">SEARCHING...</a></li>'));
    $(document).one('searchIndexReady', function() { doSearch(options); });
    return;
  }

  var query = options.query;
  var snippetLen = options.snippetLen;
  var limit = options.limit;

  if (query === '') { return; }

  var results = searchIndex.search(query, {
    fields: { title: {boost: 10}, text: { boost: 1 } },
    expand: true,
    bool: "AND"
  });

  var snippetBuilder = new SnippetBuilder(query);
  if (results.length > 0){
    var len = Math.min(results.length, limit || Infinity);
    var seen = new Set();     // Set of "path|snippet"
    for (var i = 0; i < results.length && seen.size < len; i++) {
      var ref = results[i].ref;
      var doc = searchIndex.documentStore.getDoc(ref);
      var title = doc.title;

      // Skip empty titles: these are forced to empty for TOC purposes intentionally when they
      // serve a purely stylistic purpose. They are unhelpful in search results.
      if (!title) { continue; }

      var snippet = snippetBuilder.getSnippet(doc.text, snippetLen);
      var path = ref.replace(/#.*/, '');

      var key = path + '|' + snippet;
      if (seen.has(key)) { continue; }
      seen.add(key);

      if (path !== ref) {
        var mainDoc = searchIndex.documentStore.getDoc(path);
        if (mainDoc && mainDoc.title) {
          title = mainDoc.title + " > " + title;
        }
      }

      resultsElem.append(
        $('<li>').append($('<a class="search-link">').attr('href', getUrl(doc.location))
          .append($('<div class="search-title">').text(title))
          .append($('<div class="search-text">').html(snippet)))
      );
    }

    if (limit) {
      resultsElem.append($('<li role="separator" class="divider"></li>'));
      resultsElem.append($(
        '<li><a class="search-link search-all" href="' + getUrl('/search.html') + '">' +
        '<div class="search-title">SEE ALL RESULTS</div></a></li>'));
    }
  } else {
    resultsElem.append($('<li class="disabled"><a class="search-link">NO RESULTS FOUND</a></li>'));
  }
}
