window.onload = initialize;

/**
 * Application setup.
 */
function initialize() {
    // Prepare the cards database, which should have been loaded into a variable already in a separate script.
    // For the moment, we're keeping the Friendship is Card Games set in a separate variable for ease of updating, and
    // appending it to the main database.
    CARDS = CARDS.concat(FICG_CARDS);

    // We're also keeping Sorden's IPU set separate for now.
    CARDS = CARDS.concat(IPU_CARDS);

    global.urlParameters = getUrlParameters();

    if (!global.urlParameters.noSort) {
        // Sort the entire database alphabetically by set, then name.
        CARDS = sortByProperties(CARDS, ['name', 'set'], true);
    }

    // For every card, there may be certain additional properties that we can derive from the information supplied, such
    // as the card's colors. These are useful for refining searches.
    for (var i=0; i < CARDS.length; i++) {
        CARDS[i].derivedProperties = getDerivedCardProperties(CARDS[i]);

        // For the card's hash, we'll also put this directly on the card itself, as the filtering function only looks at
        // the card's static properties, and we do sometimes want to filter by hash.
        CARDS[i].hash = CARDS[i].derivedProperties.hash;
    }

    // Obtain the list of print sheet cards from local storage. This is a persistent object that associates a set of
    // card hashes (each hash of which uniquely identifies a single card) to a quantity value, representing numbers of
    // cards selected by the user to be put onto a print sheet, which they can generate from another page.

    global.elements.results = document.querySelector('#results');

    //global.elements.titleReference = document.querySelector('#titleReference');
    //global.elements.titleReference.onclick = function() {
        //global.elements.titleReference.innerHTML = '* '+global.text.references.title;
    //};

    // Similarly, collect some information about the database as a whole (eg. a list of all sets that are in it).
    global.information = getInformation(CARDS);

    global.elements.title = document.querySelector('#title');

    // The title screen has a dynamic tagline which depends on the number of cards, so set that now.
    global.elements.tagline = document.querySelector('#tagline');
    var tagline = global.text.tagline.dynamic;
    tagline = tagline.replace('{NUMBER_OF_CARDS}', '<strong>'+global.information.overall.numberOfCards+'</strong>');
    global.elements.tagline.innerHTML = tagline;

    // The "random card" link selects a random set, then a random card from that set, then gets the card hash, and opens
    // PonyMTG in a new tab with the hash passed in the URL. Although we could simply pick a random card from anywhere
    // in the database, we select by set first to give every set an equal chance of being picked (otherwise, the largest
    // sets would dominate the random card selection).
    var randomCardElement = document.querySelector('#randomCard');
    randomCardElement.onclick = function () {
        var randomSet = global.information.sets[rnd(global.information.sets.length)];
        var randomSetCards = getCardsFilteredBySet(CARDS, [randomSet]);
        var randomCard = randomSetCards[rnd(randomSetCards.length)];
        var randomCardUrl = '?hash='+randomCard.hash;
        window.open(randomCardUrl, '_blank');
    }

    // Set up the search field to perform searches of the card database when Enter is pressed.
    global.elements.searchField = document.querySelector('#searchField');
    global.elements.searchField.onkeypress = function(event) {
        if (event.keyCode == 13) {
            initiateSearch();
        }
    };

    // Also set up the search button to perform searches when clicked.
    global.elements.searchButton = document.querySelector('#searchButton');
    global.elements.searchButton.onclick = function(event) {
        initiateSearch();
    };
    
    // Set a placeholder message inside the search field to prompt the user to search for something (with a helpful
    // randomly-selected suggestion).
    var suggestedSearchTerm = global.text.search.suggestions[rnd(global.text.search.suggestions.length)];
    var searchPlaceholderMessage = global.text.search.placeholder+' (example: "'+suggestedSearchTerm+'")';
    global.elements.searchField.placeholder = searchPlaceholderMessage;

    // Focus on the search box.
    global.elements.searchField.focus();

    // Add a control to expand the advanced search box.
    var advancedSearchExpander = document.querySelector('#advancedSearchLink');
    advancedSearchExpander.onclick = function(e) {
        var table = document.querySelector('#'+global.advancedSearchIdPrefix+'_table');
        if (table.style.display === 'none') {
            table.style.display = 'block';
        }
        else {
            table.style.display = 'none';
        }
    }

    global.elements.advancedSearch = document.querySelector('#advancedSearch');

    // Generate and add the advanced search control box.
    global.elements.advancedSearch.appendChild(generateAdvancedSearchElement());

    // Default to search by name only.
    var searchByNameCheckbox = document.querySelector('#'+global.advancedSearchIdPrefix+'_searchByCardProperty_name');
    searchByNameCheckbox.checked = true;

    // Default to displaying cards from all available sets.
    var filterBySetCheckbox = document.querySelector('#'+global.advancedSearchIdPrefix+'_filterBySet_selectAll');
    filterBySetCheckbox.click();

    // Default to searching all mana types.
    var manaTypes = Object.keys(global.mappings.manaTypesToRepresentativeSymbols);
    for (var i=0; i < manaTypes.length; i++) {
        var manaType = manaTypes[i];
        var filterByManaTypeCheckbox = document.querySelector('#'+global.advancedSearchIdPrefix+'_filterByManaType_'+manaType);
        filterByManaTypeCheckbox.checked = true;
    }

    // Maintain a global reference to the print sheet link in the navbar. This contains a dynamic count of how many
    // cards are currently on the print sheet, which we would like to update as cards are added.
    global.elements.printSheetLink = document.querySelector('#printSheetLink');

    // Initialize the badge on the print sheet button to the appropriate number.
    global.elements.printSheetLink.innerHTML += ' <span id="printSheetCountBadge" class="badge">'+getNumberOfCardsInPrintSheet()+'</span>';

    // If a `hash` parameter is passed in the URL, auto-search for a card that matches that hash.
    if (Object.keys(global.urlParameters).length > 0) {
        if (global.urlParameters.hash !== undefined) {
            global.search.results = getCardsFilteredByProperties(CARDS, { 'hash': global.urlParameters.hash } );
            global.pagination.currentPage = 0;
            global.pagination.numberOfPages = Math.ceil(global.search.results.length/global.pagination.cardsPerPage);
            displayResults(global.search.results);
            // Since this is an auto-search from which we only ever expect to get one result, don't show the "found X
            // cards" message.
            var foundCardsMessageElement = document.querySelector('#foundCardsMessagePanel');
            foundCardsMessageElement.parentNode.removeChild(foundCardsMessageElement);
        }
    }
}

