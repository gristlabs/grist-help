// Get search worker URL and create the worker.
const config = JSON.parse(document.getElementById("__config").textContent);
const workerUrl = new URL(config.search, document.baseURI);
const searchWorker = new Worker(workerUrl, { type: "module" });
const elemSearchInProgress = document.getElementById('search-in-progress');
const elemSearchEmptyResults = document.getElementById('search-empty-results');

let workerReady = false;
let queuedQueryMessage = null;

// Message types to communicate with the worker. From https://github.com/squidfunk/mkdocs-material/blob/673d8ca986c37ddeabe25c7e7b7299ec644910ed/src/templates/assets/javascripts/integrations/search/worker/message/index.ts#L33
const SearchMessageType = {
  SETUP: 0,
  READY: 1,
  QUERY: 2,
  RESULT: 3,
};

// Build and send the setup message expected by Material's worker
async function initialize() {
  elemSearchInProgress.style.display = 'block';
  const response = await fetch("search_index.json");
  if (!response.ok) { throw new Error("Cannot load search_index.json"); }
  const data = await response.json();
  data.options = {};
  searchWorker.postMessage({ type: SearchMessageType.SETUP, data });
}

// Handle messages from Material's search work.
searchWorker.addEventListener("message", (ev) => {
  const msg = ev.data;
  switch (msg.type) {
    case SearchMessageType.READY: {
      const url = new URL(window.location.href);
      const query = url.searchParams.get("q") || "";
      searchWorker.postMessage({ type: SearchMessageType.QUERY, data: query });
      break;
    }
    case SearchMessageType.RESULT: {
      renderSearchResults(msg.data.items);
      break;
    }
  }
});

/**
 * Once we get results from the search worker, render them.
 */
function renderSearchResults(results) {
  elemSearchInProgress.style.display = '';
  if (!results?.length) {
    elemSearchEmptyResults.style.display = 'block';
  } else {
    const resultTemplate = document.querySelector('#search-result');
    let flat = results.flat();

    // Filter out results with 0 score.
    flat = flat.filter(result => result.score > 0);

    const termsSet = new Set(Object.keys(flat[0].terms || {}));
    for (const result of flat) {
      // mkdocs-material's scoring (really, lunr's scoring) is so-so. Adjust scores manually:
      // - When a term is found exactly, that should count for more, esp. if in title.
      // - When multiple search terms are found, that should count for more.
      const numExactInTitle = countUniqueTerms(parseWordsFromHtml(result.title), termsSet);
      const numExactInText = result.text ? countUniqueTerms(parseWordsFromHtml(result.text), termsSet) : 0;
      const numDistinctTerms = Object.values(result.terms).filter(v => v).length;
      const origScore = result.score;
      result.score *= (1 + numExactInTitle * 5 + numExactInText * 4 + numDistinctTerms * 3);
      result.debug = {numExactInTitle, numExactInText, numDistinctTerms, origScore};
    }
    flat.sort((a, b) => b.score - a.score);

    const baseUrl = new URL(config.base, location.href);
    for (const result of flat) {
      const resultElem = document.importNode(resultTemplate.content, true);
      // Fill in the template for a search result, and insert it into the page.
      let title = result.title;
      let parent = result.parent;
      while (parent) {
        title = parent.title + " &gt; " + title;
        parent = parent.parent;
      }
      resultElem.querySelector('a.search-page-result').href = new URL(result.location, baseUrl);
      resultElem.querySelector('.search-title').innerHTML = title;
      resultElem.querySelector('.search-content').innerHTML = result.text;
      resultTemplate.before(resultElem);
    }
  }
}

// Parse an HTML string into words.
function parseWordsFromHtml(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const text = doc.body?.innerText || '';
  return text.toLowerCase().match(/[\p{L}\p{N}_]+/gu) || [];
}

// Count how many of terms in the Set termSet are present among words.
function countUniqueTerms(words, termsSet) {
  const seen = new Set();
  for (const w of words) {
    if (termsSet.has(w)) { seen.add(w); }
  }
  return seen.size;
}

/**
 * When q= is in the URL, mkdocs-material automatically fills-in, focuses, and opens the search
 * box. On the search page, we don't want it.
 */
function suppressSearchBox() {
  const url = new URL(window.location.href);
  const input = document.querySelector('input[data-md-component="search-query"]');
  const toggle = document.querySelector('input[data-md-toggle="search"]');
  if (!input || !toggle) { return; }
  if (url.searchParams.get("q")) {
    // No great to suppress the auto-search behavior; but we can interfere with it just enough.
    toggle.checked = false;
    input.value = "";
    input.blur();
  } else {
    // On the search page, let's open the search box when there is NO query (opposite behavior to
    // normal pages).
    toggle.checked = true;
    input.focus();
  }
}

suppressSearchBox();
initialize().catch((err) => console.warn("ERROR", err));
