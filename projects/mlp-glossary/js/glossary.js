/**
 * mlp-glossary: Glossary application
 * by hawthornbunny
 */

const initialize = async function initialize()
{
    await startApplication();
    const search = query('#search');
    search.addEventListener('search', handleSearch);
    search.addEventListener('change', handleChange);
    search.addEventListener('keyup', handleKey);

    // If search field retained value after a refresh, repeat the search
    if (search.value) {
        searchRecords(search.value);
    }
};

const handleSearch = function handleSearch(evt)
{
    console.log(evt);
};

const handleChange = function handleChange(evt)
{
    console.log(evt);
};

const handleKey = function handleKey(evt)
{
    if (evt.ctrlKey || evt.shiftKey) {
        return;
    }

    clearSearchResults();

    const searchTerm = evt.target.value;
    if (searchTerm.length >= 3) {
        searchRecords(evt.target.value);
    }
};

/**
 * Empty the search results box.
 *
 */
const clearSearchResults = function clearSearchResults()
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
const searchRecords = function searchRecords(string)
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
};

/**
 * Create and return a search result element for the given data record.
 *
 * @param {SearchResult} searchResult
 * @return {Element}
 */
const createResultEntry = function createResultEntry(searchResult)
{
    const resultEntry = create('div', 'result-entry');
    let resultHtml = '';
    resultHtml += `<p class="result-item"><span class="result-item-title">${searchResult.item}</span></p>`;
    if (searchResult.aliases.length > 0) {
        const aliasesText = searchResult.aliases.join(', ');
        resultHtml += `<p class="result-aliases">AKA: ${aliasesText}</p>`;
    }
    resultHtml += `<p class="result-media-category">${searchResult.media} &mdash; ${searchResult.category}</p>`;
    resultHtml += `<p class="result-description">${searchResult.description}</p>`;
    resultEntry.innerHTML = resultHtml;

    return resultEntry;
};

window.onload = initialize;
