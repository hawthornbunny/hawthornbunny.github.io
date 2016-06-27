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

    // Sort the entire database alphabetically by card name.
    CARDS.sort(
        function(cardA, cardB) {
            cardNameA = cardA.name.toLowerCase();
            cardNameB = cardB.name.toLowerCase();
            if (cardNameA < cardNameB) {
                return -1;
            }
            else if (cardNameA > cardNameB) {
                return 1;
            }
            return 0;
        }
    );

    // For every card, there may be certain additional properties that we can derive from the information supplied, such
    // as the card's colors. These are useful for refining searches.
    for (var i=0; i < CARDS.length; i++) {
        CARDS[i].derivedProperties = getDerivedCardProperties(CARDS[i]);
    }

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

    // The "random card" link should select a random set, then select a random card from that set, and open PonyMTG in a
    // new tab with the set and card name passed in the URL.
    var randomCardElement = document.querySelector('#randomCard');
    randomCardElement.onclick = function () {
        var randomSet = global.information.sets[rnd(global.information.sets.length)];
        var randomSetCards = getCardsFilteredBySet(CARDS, [randomSet]);
        var randomCard = randomSetCards[rnd(randomSetCards.length)];
        var randomCardUrl = '?name='+randomCard.name+'&set='+randomCard.set;
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

    // There are certain parameters that the user can pass in the URL to make the app perform special actions.
    // If a `name` and `set` are passed, the app will automatically display all cards that match that name and set.
    // Unlike in a regular search, it will be an exact match, not a partial match.
    global.urlParameters = getUrlParameters();
    if (Object.keys(global.urlParameters).length > 0) {
        if (global.urlParameters.name !== undefined && global.urlParameters.set !== undefined) {
            var searchString = '^'+escapeRegex(global.urlParameters.name)+'$';
            var searchRegex = new RegExp(searchString, 'i');
            global.search.results = getMatchingCards(searchRegex, getCardsFilteredBySet(CARDS, global.urlParameters.set));
            global.pagination.currentPage = 0;
            global.pagination.numberOfPages = Math.ceil(global.search.results.length/global.pagination.cardsPerPage);
            displayResults(global.search.results);
        }
    }
}

