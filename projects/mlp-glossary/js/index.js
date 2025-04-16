/*******************************************************************************
 * Functions and handlers for the main glossary page.
 ******************************************************************************/

/**
 * Initialize the application by setting up search field handlers and creating
 * the media description popup.
 */
async function initialize()
{
    await startApplication();
    const searchField = query('#searchField');
    const aboutLink = query('#about');
    const mediaLink = query('#media');
    const mediaBox = query('#mediaBox');

    // Add search field key handler
    searchField.addEventListener('keyup', handleKey);
    //searchField.addEventListener('search', handleSearch);
    //searchField.addEventListener('change', handleChange);

    // Add About and Media box handlers
    aboutLink.addEventListener("click", handleAbout);
    mediaLink.addEventListener("click", handleMedia);

    // Populate the Media box with the glossary's media list.
    let html = "";
    html += '<span class="toggle-box-heading">Media list</span>';
    global.tables.media.forEach((index, record) => {
        html += `<p><span class="media-box-tag" style="background-color: ${record.color}">${record.abbreviation}</span>: `;
        html += `<strong>${record.name}</strong><br />${record.description}</p>`;
    });
    mediaBox.innerHTML = html;


    // If search field retained value after a refresh, repeat the search
    // TODO: Currently not working
    if (searchField.value) {
        searchRecords(searchField.value);
    }
}

/**
 * Handle keypresses when focused on the search field.
 */
function handleKey(evt)
{
    // Ignore Ctrl or Shift presses
    if (evt.ctrlKey || evt.shiftKey) {
        return;
    }
    initSearch(evt.target.value);

}

/**
 * Toggle the About box when clicked.
 */
function handleAbout(evt)
{
    const aboutLink = evt.target;
    const aboutBox = query("#aboutBox")
    toggleBox(aboutLink, aboutBox);
}

/**
 * Toggle the Media box when clicked.
 */
function handleMedia(evt)
{
    const mediaLink = evt.target;
    const mediaBox = query("#mediaBox")
    toggleBox(mediaLink, mediaBox);
}

/**
 * Toggle the display of the given box element.
 */
function toggleBox(toggleLink, boxElement)
{
    if (toggleLink.classList.toggle("invert-toggle-link")) {
        boxElement.style.display = "block";
    } else {
        boxElement.style.display = "none";
    }
}

/**
 * Toggle the given media tag between abbreviation and full name when clicked.
 */
function handleExpandMediaTag(evt)
{
    const mediaTag = evt.target;
    if (mediaTag.innerHTML === mediaTag.dataset.abbrev) {
        mediaTag.innerHTML = mediaTag.dataset.fullName;
    } else {
        mediaTag.innerHTML = mediaTag.dataset.abbrev;
    }
        
}

/**
 * Clear the search results (if any) and, if enough characters were entered,
 * search the glossary for the given term.
 */
function initSearch(searchTerm)
{
    clearSearchResults();

    if (searchTerm.length >= 3) {
        searchRecords(searchTerm);
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
    resultHtml += '<p class="result-media-category">'
    resultHtml += `<span class="result-media" data-abbrev="${searchResult.media}">${searchResult.media}</span>`;
    resultHtml += ` &mdash; ${searchResult.category}</p>`;
    resultHtml += `<p class="result-description">${searchResult.description}</p>`;
    resultEntry.innerHTML = resultHtml;

    // For each added media tag, color it in that media's color, add mouseover
    // text, and a click handler to allow the tag to expand to its full
    // definition.
    const mediaTag = resultEntry.querySelector(".result-media");
    const media = global.tables.media.get(searchResult.media);
    mediaTag.dataset.fullName = media.name;
    mediaTag.style.backgroundColor = media.color;
    mediaTag.addEventListener("click", handleExpandMediaTag);

    return resultEntry;
}

window.onload = initialize;
