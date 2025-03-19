function initialize()
{
    startApplication();
    const search = query('#search');
    search.addEventListener('search', handleSearch);
    search.addEventListener('change', handleChange);
    search.addEventListener('keyup', handleKey);

    // If search field retained value after a refresh, repeat the search
    if (search.value) {
        searchRecords(search.value);
    }
}

function handleSearch(evt)
{
}

function handleChange(evt)
{
}

function handleKey(evt)
{
    if (evt.ctrlKey || evt.shiftKey) {
        return;
    }

    clearSearchResults();

    const searchTerm = evt.target.value;
    if (searchTerm.length >= 3) {
        searchRecords(evt.target.value);
    }
}

/**
 * Empty the search results box.
 *
 */
function clearSearchResults()
{
    const searchResultsPanel = query('#searchResults');
    empty(searchResultsPanel);
}

/**
 * Search the glossary data for the given string, and display the results in the
 * search results box.
 *
 * @param {string} string
 */
function searchRecords(string)
{
    const searchResultsPanel = query('#searchResults');
    const resultEntries = [];
    
    const searchResults = getSearchResults(string, global.indexedGlossary, global.aliasesToGlossary);

    let searchResultKeys = Object.keys(searchResults);

    searchResultKeys = searchResultKeys.sort(
        (keyA, keyB) => {
            const resultA = searchResults[keyA];
            const resultB = searchResults[keyB];
            if (resultA.item < resultB.item) {
                return -1;
            } else if (resultA.item > resultB.item) {
                return 1;
            }
            return 0;
        }
    );

    for (let i = 0; i < searchResultKeys.length; i++) {
        const key = searchResultKeys[i];
        const searchResult = searchResults[key];
        const resultEntry = createResultEntry(searchResult);
        append(searchResultsPanel, resultEntry);
    }
}

/**
 * Create and return a search result element for the given data record.
 *
 * @param {SearchResult} searchResult
 * @return {Element}
 */
function createResultEntry(searchResult)
{
    const resultEntry = create('div', 'result-entry');
    let resultHtml = '';

    // Try to load the image for this search result. Image names are determined
    // automatically from the glossary item's key - if there exists an image
    // with that name, we can use that in the search result. If it doesn't
    // exist, display the result without an image.
    const image = new Image();
    
    const imageName = `${searchResult.media}-${searchResult.category}- ${searchResult.item}`;
    const extensions = ["gif", "jpeg", "jpg", "png"];

    const fileNames = [];
    for (let i = 0; i < extensions.length; i++) {
        fileNames.push(`${imageName}.${extensions[i]}`);
    }

    resultHtml += `<p class="result-item"><span class="result-item-title">${searchResult.item}</span></p>`;
    if (searchResult.aliases.length > 0) {
        const aliasesText = searchResult.aliases.join(', ');
        resultHtml += `<p class="result-aliases">AKA: ${aliasesText}</p>`;
    }
    resultHtml += `<p class="result-media-category">${searchResult.media} &mdash; ${searchResult.category}</p>`;
    resultHtml += `<p class="result-description">${searchResult.description}</p>`;
    resultEntry.innerHTML = resultHtml;

    return resultEntry;
}

window.onload = initialize;
