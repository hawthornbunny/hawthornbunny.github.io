////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// PonyMTG (it's a working title) by hawthornbunny                                                                    //
//                                                                                                                    //
// Email: hawthornrabbit@gmail.com                                                                                    //
// Fimfiction: http://www.fimfiction.net/user/hawthornbunny                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
window.onload = initialize;

/**
 * Global object that can be used by all functions. Configuration and common definitions are stored here.
 */
var global = {
    'paths': {
        /** Path to the directory containing all the card sets. */
        'sets': 'data/sets'
    },
    /** Various useful and commonly-used mappings. */
    'mappings': {
        /** Maps the set name to the directory path where it can be located. Path is relative to the sets path. */
        'setsToPaths': {
            'A Warm Welcome': 'A Warm Welcome/cards',
            'Shards of Equestria': 'Shards of Equestria/Shards of Equestria pack/cards',
            'Nightfall': 'Nightfall 1.15/cards',
            'Ponylude': 'Ponylude/cards',
            'Friendship is Magic the Gathering': 'Friendship is Magic the Gathering/cards',
            'CRISIS EQUESTRIA': 'rowcla/CRISIS EQUESTRIA/cards',
            'New Lunar Republic': 'rowcla/New Lunar Republic/cards',
            'The Solar Empire': 'rowcla/The Solar Empire/cards',
            'Legends are Magic': 'jrk08004/Legends are Magic set/cards',
            'Unponied': 'jrk08004/Unponied/cards',
            'Friendship is Magic the Gathering (IPU)': 'Sorden/cards',
            'Derpibooru 7220': 'Derpibooru 7220/cards',
            'alternatepony': 'alternatepony/cards',
            'Equestria Disturbed': 'aurais/Equestria Disturbed/cards',
            'MLP:FiM Season 1 MTG Set': 'AznDemonLord/MLP:FiM Season 1 MTG Set/cards',
            'MLP:FiM Season 2 MTG Set': 'AznDemonLord/MLP:FiM Season 2 MTG Set/cards',
            'MTG mlp': 'Modernwater/MTG mlp/cards',
            'Elements of Harmony': 'Shadic-X-Hedgehog/Elements of Harmony/cards',
            'MLP-MTG': 'Shirlendra/MLP-MTG/cards',
            'My Little Multiverse: Knowledge is Magic': 'ManaSparks/My Little Multiverse: Knowledge is Magic/cards',
        },
        /** Maps the various properties of a card to a more human-readable display name.*/
        'cardPropertiesToDisplayNames': {
            'name': 'Name',
            'set': 'Set',
            'creator': 'Creator',
            'cost': 'Cost',
            'supertype': 'Supertype',
            'subtype': 'Subtype',
            'text': 'Text',
            'flavorText': 'Flavor text',
            'pt': 'Power/Toughness',
            'loyalty': 'Loyalty',
            'transformsInto': 'Transforms into',
            'transformsFrom': 'Transforms from'
        },
        /**
         * Maps mana symbols (in the standard WUBRG form) to the names of the color scheme that would represent that
         * color of mana.
         */
        'manaSymbolsToCardColorSchemes': {
            'W': 'white',
            'U': 'blue',
            'B': 'black',
            'R': 'red',
            'G': 'green'
        },
        /**
         * Maps regular expressions representing parts of a mana cost, to the color scheme that the card would have if
         * that mana cost was the only source of the card's color.
         * color of mana.
         */
        'manaSymbolRegexesToCardColorSchemes': {
            'W': 'white',
            'U': 'blue',
            'B': 'black',
            'R': 'red',
            'G': 'green',
            '\\(wu\\)': 'whiteBlue',
            '\\(wb\\)': 'whiteBlack',
            '\\(wr\\)': 'whiteRed',
            '\\(wg\\)': 'whiteGreen',
            '\\(ub\\)': 'blueBlack',
            '\\(ur\\)': 'blueRed',
            '\\(ug\\)': 'blueGreen',
            '\\(br\\)': 'blackRed',
            '\\(bg\\)': 'blackGreen',
            '\\(rg\\)': 'redGreen',
        },
        /**
         * Maps a regular expression representing a mana symbol (in standard WUBRG form) to a CSS style emulates the
         * look-and-feel of that symbol as it would appear on a Magic card.
         */
        'manaSymbolsToStyles': {
            'W': 'manaDecorationWhite',
            'U': 'manaDecorationBlue',
            'B': 'manaDecorationBlack',
            'R': 'manaDecorationRed',
            'G': 'manaDecorationGreen',
            'X': 'manaDecorationGeneric',
            '\\d+': 'manaDecorationGeneric',
        },
        /**
         * Maps the name of a card color scheme to the CSS style that defines that color scheme for the browser.
         */
        'cardColorSchemesToCssClasses': {
            'black': 'cardColorBlack',
            'blue': 'cardColorBlue',
            'colorless': 'cardColorColorless',
            'green': 'cardColorGreen',
            'multicolored': 'cardColorMulticolored',
            'red': 'cardColorRed',
            'white': 'cardColorWhite',
            'whiteBlue': 'cardColorHybridWhiteBlue',
            'whiteBlack': 'cardColorHybridWhiteBlack',
            'whiteRed': 'cardColorHybridWhiteRed',
            'whiteGreen': 'cardColorHybridWhiteGreen',
            'blueBlack': 'cardColorHybridBlueBlack',
            'blueRed': 'cardColorHybridBlueRed',
            'blueGreen': 'cardColorHybridBlueGreen',
            'blackRed': 'cardColorHybridBlackRed',
            'blackGreen': 'cardColorHybridBlackGreen',
            'redGreen': 'cardColorHybridRedGreen',
            'undefined': 'cardColorUndefined',
        }
    },
    /** DOM elements that can be cached globally, and used in any function. */
    'elements': {
        'results': undefined,
        'search': undefined,
        'title': undefined,
        'tagline': undefined,
        'titleReference': undefined
    },
    /** A list of card properties that the application will attempt to find matches in when a search is made. */
    'cardPropertiesToSearch':[
        'name',
    ],
    /** A list of card properties that the application will display in search results (if the card has them).*/
    'cardPropertiesToDisplay':[
        'name',
        'set',
        'creator',
        'cost',
        'supertype',
        'subtype',
        'text',
        'flavorText',
        'pt',
        'loyalty',
        'transformsInto',
        'transformsFrom',
    ],
    /** A list of metacharacters used in regular expressions. We need to escape these when searching. */
    'regexMetacharacters': ['\\', '.','^','$','*','+','?','(',')','[',']','{','}','|'],
    'dimensions': {
        /** Dimensions for a standard Magic card as produced by Magic Set Editor. */
        'standardCard': {
            'width': 375,
            'height': 523,
            'borderThickness': 17
        },
        /** The desired width for card images in search results. */
        'displayCard': {
          'width': 265  
        },
        'proxy': {
            /**
             * The amount of padding between the border and the interior of a proxy card. We're defining it here rather
             * than in the stylesheet, because we need to know the value in order to correctly calculate dimensions when
             * rendering a proxy card.
             */
            'padding': 4
        }
    },
    /** Various pieces of predefined text. */
    'text': {
        'tagline': {
            'dynamic': 'Browse a database of {NUMBER_OF_CARDS} fan-made <i>Magic: the Gathering</i> cards based on <i>My Little Pony: Friendship is Magic</i>.',
            'static': 'Browse a database of fan-made <i>Magic: the Gathering</i> cards based on <i>My Little Pony: Friendship is Magic</i>.'
        },
        'references': {
            'title': 'It\'s a working title.'
        },
        'search': {
            'placeholder': 'Search for something',
            /**
             * A list of search terms that the search field will randomly offer as suggestions in its placeholder text.
             */
            'suggestions': [
                'Applejack',
                'Cadance',
                'Canterlot',
                'Celestia',
                'Chrysalis',
                'Derpy',
                'Discord',
                'Fluttershy',
                'Luna',
                'Octavia',
                'Pinkie',
                'Ponyville',
                'Princess',
                'Rainbow',
                'Rarity',
                'Spike',
                'Trixie',
                'Twilight',
                'Vinyl',
                'Zecora'
            ],
            'foundResults': 'Found {NUMBER_OF_RESULTS} cards',
            'noResults': 'No cards found',
        },
    },
    'values': {
        'textMasses': {
            'character': 1,
            'newline': 35
        },
        'textMassThreshold': 450
    },
    'pagination': {
        'currentPage': 0,
        'cardsPerPage': 10,
        'numberOfPages': 1
    },
    'search': {
        'results': []
    },
    'statistics': {
        'counts': {
            'numberOfCards': undefined,
            'cardsPerSet': {},
            'cardsPerCreator': {}
        }
    }
            
};

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
    global.elements.results = document.querySelector('#results');

    //global.elements.titleReference = document.querySelector('#titleReference');
    //global.elements.titleReference.onclick = function() {
        //global.elements.titleReference.innerHTML = '* '+global.text.references.title;
    //};

    var statistics = getStatistics(CARDS);
    global.statistics.counts.numberOfCards = statistics.counts.numberOfCards;
    global.statistics.counts.cardsPerSet = statistics.counts.cardsPerSet;
    global.statistics.counts.cardsPerCreator = statistics.counts.cardsPerCreator;

    global.elements.title = document.querySelector('#title');

    // The title screen has a dynamic tagline which depends on the number of cards, so set that now.
    global.elements.tagline = document.querySelector('#tagline');
    var tagline = global.text.tagline.dynamic;
    tagline = tagline.replace('{NUMBER_OF_CARDS}', '<strong>'+CARDS.length+'</strong>');
    global.elements.tagline.innerHTML = tagline;

    // Set up the search field to perform searches of the card database when Enter is pressed.
    global.elements.search = document.querySelector('#search');
    global.elements.search.onkeypress = function(event) {
        if (event.keyCode == 13) {
            var searchString = global.elements.search.value;
            // We do actually want to do a string search and not a regex search, so we need to escape any regex
            // characters that the user may have entered.
            searchString = escapeRegex(searchString);
            var searchRegex = new RegExp(searchString, 'i');
            global.search.results = getSearchResults(searchRegex, CARDS);
            global.pagination.currentPage = 0;
            global.pagination.numberOfPages = Math.ceil(global.search.results.length/global.pagination.cardsPerPage);
            displayResults(global.search.results);
        }
    };

    // Set a placeholder message inside the search field to prompt the user to search for something (with a helpful
    // randomly-selected suggestion).
    var suggestedSearchTerm = global.text.search.suggestions[rnd(global.text.search.suggestions.length)];
    var searchPlaceholderMessage = global.text.search.placeholder+' (eg. "'+suggestedSearchTerm+'")';
    global.elements.search.placeholder = searchPlaceholderMessage;

    // Focus on the search box.
    global.elements.search.focus();

}

/**
 * Given a set of card data entries, return some statistics about that set.
 */
function getStatistics(cards) {
    var statistics = {};
    statistics.counts = {};

    // Count the total number of cards.
    statistics.counts.numberOfCards = cards.length;

    // Count the number of cards in each card set (we mean "set" in the "fan-made set" sense).
    statistics.counts.cardsPerSet = {};
    for (var i=0; i < cards.length; i++) {
        var set = cards[i].set;
        if (statistics.counts.cardsPerSet[set] === undefined) {
            statistics.counts.cardsPerSet[set] = 0;
        }
        statistics.counts.cardsPerSet[set]++;
    }

    // Similarly, count the number of cards per creator.
    statistics.counts.cardsPerCreator = {};
    for (var i=0; i < cards.length; i++) {
        var creator = cards[i].creator;
        if (statistics.counts.cardsPerCreator[creator] === undefined) {
            statistics.counts.cardsPerCreator[creator] = 0;
        }
        statistics.counts.cardsPerCreator[creator]++;
    }

    return statistics;
}

/**
 * From the set of card data objects in `cards`, return an array containing only those card data objects which have a
 * property that matches the regular expression `regex`.
 */
function getSearchResults(regex, cards) {
    var matchingCards = [];
    for (var i=0; i < cards.length; i++) {
        var card = cards[i];
        var cardPropertyNames = Object.keys(card);
        for (var j=0; j < cardPropertyNames.length; j++) {
            var cardPropertyName = cardPropertyNames[j];

            if (global.cardPropertiesToSearch.indexOf(cardPropertyName) === -1) {
                continue;
            }

            var cardPropertyValue = card[cardPropertyName];

            if (regex.test(cardPropertyValue)) {
                matchingCards.push(card);
                break;
            }
        }
    }

    return matchingCards; 
}

/**
 * Generate and display a table of the card data objects in `cards`, in the "results" section of the application.
 */
function displayResults(cards) {
    // Clear existing results.
    emptyElement(global.elements.results);
    
    // Remove the title and tagline, they're only needed on the home screen.
    //global.elements.title.parentNode.removeChild(global.elements.title);
    //global.elements.tagline.parentNode.removeChild(global.elements.tagline);

    // Display the new results.
    // Before the results table, add a quick message to say how many results were found.
    var foundCardsMessageElement = document.createElement('div');
    var foundCardsMessage = global.text.search.noResults+'.';
    if (cards.length > 0) {
        foundCardsMessage = global.text.search.foundResults.replace('{NUMBER_OF_RESULTS}', '<strong>'+cards.length+'</strong>') + '.';
        if (cards.length === 1) {
            foundCardsMessage = foundCardsMessage.replace('cards.', 'card.');
        }
    }

    foundCardsMessageElement.innerHTML = foundCardsMessage;
    foundCardsMessageElement.style.marginBottom = '32px';

    // We only want to display a page of results, not all of them. The application is keeping track of which page the
    // user is on, so we just need to figure out what subset of the results should be on the current page, generate a
    // table for those only, and display it.
    var indexOfFirstCardOnPage = global.pagination.currentPage * global.pagination.cardsPerPage;
    var indexOfLastCardOnPage = indexOfFirstCardOnPage + global.pagination.cardsPerPage;
    var currentPageOfCards = cards.slice(indexOfFirstCardOnPage, indexOfLastCardOnPage);

    global.elements.results.appendChild(foundCardsMessageElement);
    if (cards.length > 0) {
        if (global.pagination.numberOfPages > 1) {
            global.elements.results.appendChild(generatePaginationControlElement());
        }
        global.elements.results.appendChild(generateCardTableElement(currentPageOfCards));
    }
}

/**
 * Generates and returns a DOM element that the user can use to move between pages of the current result set.
 */
function generatePaginationControlElement() {
    var paginationControlTableElement = document.createElement('table');
    var paginationControlTableRowElement = document.createElement('tr');
    var previousPageTableCellElement = document.createElement('td');
    var pageNumberTableCellElement = document.createElement('td');
    var nextPageTableCellElement = document.createElement('td');

    paginationControlTableElement.className = 'paginationControl';

    previousPageTableCellElement.className = 'paginationPreviousPage';
    previousPageTableCellElement.innerHTML = '< Previous page';
    previousPageTableCellElement.onclick = function() {
        global.pagination.currentPage--;
        if (global.pagination.currentPage < 0) {
            global.pagination.currentPage = 0;
        }
            
        displayResults(global.search.results);
    };

    pageNumberTableCellElement.className = 'paginationPageNumber';
    pageNumberTableCellElement.innerHTML = 'Page '+(global.pagination.currentPage+1)+' of '+global.pagination.numberOfPages;

    nextPageTableCellElement.className = 'paginationNextPage';
    nextPageTableCellElement.innerHTML = 'Next page >';
    nextPageTableCellElement.onclick = function() {
        global.pagination.currentPage++;
        if (global.pagination.currentPage >= global.pagination.numberOfPages) {
            global.pagination.currentPage = global.pagination.numberOfPages - 1;
        }
        displayResults(global.search.results);
    };

    paginationControlTableRowElement.appendChild(previousPageTableCellElement);
    paginationControlTableRowElement.appendChild(pageNumberTableCellElement);
    paginationControlTableRowElement.appendChild(nextPageTableCellElement);
    paginationControlTableElement.appendChild(paginationControlTableRowElement);
    return paginationControlTableElement;
}

/**
 * Given a set of card data objects `cards`, generate a table of those cards, which displays an image (if available) and
 * known, relevant properties of the card.
 */
function generateCardTableElement(cards) {
    // Create a table to hold the results.
    var cardTable = document.createElement('table');
    cardTable.className = 'cardTable';

    // Preset the height of the table to the expected height of the displayed card. This makes it a bit less jarring
    // when the image is in a half-loaded state, as the table will usually try to resize itself to fit its contents.
    // (This currently doesn't work).
    cardTable.style.height = getCardHeightFromCardWidth(global.dimensions.displayCard.width)+'px';

    for (var i=0; i < cards.length; i++) {
        var card = cards[i];

        // Create a table row for this card result. Card image on the left, card information on the right.
        var cardTableRow = document.createElement('tr');
        var cardTableCellImage = document.createElement('td');
        var cardTableCellInfo = document.createElement('td');
        cardTableCellInfo.className = 'cardInfo';

        // Check to see if we have an image for this card.
        var cardImageElement = undefined;
        if (card.image !== undefined) {
            // If a card image is available, create the card image element and set its source to the appropriate image
            // URL.
            var cardImageElement = document.createElement('img');
            var cardImageUrl = global.paths.sets+'/'+global.mappings.setsToPaths[card.set]+'/'+card.image;
            cardImageElement.src = cardImageUrl;

            // Make all card images the same width (it looks better in results).
            cardImageElement.style.width = global.dimensions.displayCard.width+'px';
        }
        else {
            // If a card image is not available, generate a "proxy" image from the available card information. This will
            // be a div, but should have the same dimensions as a card image.

            cardImageElement = generateProxyElement(card, global.dimensions.displayCard.width);
        }

        // Assemble relevant properties of the card into an information table.
        var cardInfoElement = document.createElement('p');
        var cardInfoHtml = '';

        var cardInfoTable = document.createElement('table');

        for (var j=0; j < global.cardPropertiesToDisplay.length; j++) {
            var cardPropertyName = global.cardPropertiesToDisplay[j];
            var cardPropertyValue = card[cardPropertyName];

            // If the card doesn't have a value defined for this property, skip this property.
            if (cardPropertyValue === undefined) {
                continue;
            }

            // Attempt to get a more human-readable display name for this property, if one is available.
            var cardPropertyDisplayName = cardPropertyName;
            if (global.mappings.cardPropertiesToDisplayNames[cardPropertyName] !== undefined) {
                cardPropertyDisplayName = global.mappings.cardPropertiesToDisplayNames[cardPropertyName];
            }

            // Check to see if this card property is one that we want to display. If it isn't, skip this property.
            if (global.cardPropertiesToDisplay.indexOf(cardPropertyName) === -1) {
                continue;
            }

            // Create a table row for the card property. Property name on the left, property value on the right.
            var cardInfoTableRow = document.createElement('tr');

            var cardInfoTableCellPropertyName = document.createElement('td');
            cardInfoTableCellPropertyName.className = 'cardPropertyName';

            var cardInfoTableCellPropertyValue = document.createElement('td');
            cardInfoTableCellPropertyValue.className = 'cardPropertyValue';

            cardInfoTableCellPropertyName.innerHTML = cardPropertyDisplayName+':';
            cardInfoTableCellPropertyValue.innerHTML = cardPropertyValue;
            // Special case for "flavorText" property: We'd like that to be italicized.
            if (cardPropertyName === 'flavorText') {
                cardInfoTableCellPropertyValue.style.fontStyle = 'italic';
            }

            cardInfoTableRow.appendChild(cardInfoTableCellPropertyName);
            cardInfoTableRow.appendChild(cardInfoTableCellPropertyValue);
            cardInfoTable.appendChild(cardInfoTableRow);
        }

        cardTableCellImage.appendChild(cardImageElement);
        cardTableCellInfo.appendChild(cardInfoTable);
        cardTableRow.appendChild(cardTableCellImage);
        cardTableRow.appendChild(cardTableCellInfo);
        cardTable.appendChild(cardTableRow);
    }

    return cardTable;
}

/**
 * Using the global standard card dimensions defined in the config, determine the aspect ratio of a standard Magic card,
 * and use it to calculate the height of a card of width `cardWidth`
 */
function getCardHeightFromCardWidth(cardWidth) {
    // Use the global standard card dimensions to determine the card's aspect ratio, and thus the height of the proxy.
    var cardAspectRatio = global.dimensions.standardCard.height/global.dimensions.standardCard.width;
    return cardWidth*cardAspectRatio;

}

/**
 * Using the properties listed in `cardProperties`, generate a "proxy card": a DOM object representing a Magic card. The
 * resulting element will be `cardWidth` pixels in width.
 */
function generateProxyElement(
    cardProperties,
    cardWidth
) {
    var proxyElement = document.createElement('div');
    proxyElement.className = 'proxy';

    // Determine the card's height.
    var cardHeight = getCardHeightFromCardWidth(cardWidth);

    // Although we now have the width and height of the proxy, (ie. the desired dimensions of the fully-assembled,
    // displayed proxy card), this is not the width and height of the proxy _element_ which we're about to create (ie.
    // the container of the card text, details, etc). That will be slightly smaller. The reason for this is that we have
    // to add a border, padding, etc., and in HTML, these are not considered part of a div's width and height.
    // Therefore, we have to account for those separately, and ensure that the total combined dimensions of all those
    // things adds up to the desired card width and height.

    // We'll account for the border first. Borders on Magic cards are usually black, and of uniform thickness. We know
    // the border thickness of the global standard card, so we can work out how big the border needs to be for our
    // proxy.

    var relativeBorderThickness = global.dimensions.standardCard.borderThickness/global.dimensions.standardCard.width;
    var proxyBorderThickness = cardWidth * relativeBorderThickness;

    // We also need to take into account padding. This is simply a small gap between the contents of the proxy container
    // (ie. the card name, text, etc.) and the border. There is no Magic standard for this; we're just adding it to make
    // the proxy look a little better. The padding is uniform thickness all the way round.

    var proxyPadding = global.dimensions.proxy.padding;

    // Now we can determine the width and height of the proxy element, by subtracting the border and padding from the
    // desired card width and height. We have to subtract two lots of border and padding, as the card is bordered and
    // padded on all four sides.

    var proxyElementWidth = (cardWidth - (2 * proxyBorderThickness)) - (2 * proxyPadding);
    var proxyElementHeight = (cardHeight - (2 * proxyBorderThickness)) - (2 * proxyPadding);

    proxyElement.style.width = proxyElementWidth+'px';
    proxyElement.style.height = proxyElementHeight+'px';
    proxyElement.style.borderWidth = proxyBorderThickness+'px';
    proxyElement.style.padding = proxyPadding+'px';

    // Determine the proxy's color scheme. This will depend on its mana cost.
    var proxyColorScheme = getCardColorSchemeFromManaCost(cardProperties.cost);

    // Apply an appropriate color scheme class to the proxy element, in accordance with its color scheme. (This will
    // change the proxy's background color).
    proxyElement.className += ' '+global.mappings.cardColorSchemesToCssClasses[proxyColorScheme];
    
    var proxyNameElement = document.createElement('p');
    var proxyNameAndCostLineElement = document.createElement('div');
    var proxyNameElement = document.createElement('div');
    var proxyCostElement = document.createElement('div');
    var proxyTypeLineElement = document.createElement('div');
    var proxyTextElement = document.createElement('div');

    var typeLineHtml = cardProperties.supertype;

    if (cardProperties.subtype !== undefined) {
        typeLineHtml += ' &mdash; '+cardProperties.subtype;
    }

    proxyNameAndCostLineElement.className = 'card-name-cost-line';

    proxyNameElement.className = 'card-name';
    proxyNameElement.innerHTML = cardProperties.name;

    // Get the card text.
    var cardText = cardProperties.text;

    // If we've got flavor text as well, add it in, italicizing it appropriately.
    if (cardProperties.flavorText !== undefined) {
        cardText += '\n\n<i>' + cardProperties.flavorText + '</i>';
    }

    // Since this is HTML, we need to replace line break characters with HTML breaks.
    cardText = cardText.replace(/\n/g, '<br />');

    proxyTextElement.className = 'card-text';
    // If this is a planeswalker card, add a secondary style to the card text box to make it look more interesting.
    if (cardProperties.supertype.toLowerCase().indexOf('planeswalker') !== -1) {
        proxyTextElement.className += ' card-text-planeswalker';
    }
    proxyTextElement.innerHTML = cardText;

    // Check to see how massive the text is. If it's above a certain threshold, shrink it a bit.
    var cardTextMass = calculateHtmlMass(cardText);
    if (cardTextMass > global.values.textMassThreshold) {
        proxyTextElement.style.fontSize = '0.8em';
    }

    proxyTypeLineElement.className = 'card-type-line';
    proxyTypeLineElement.innerHTML = typeLineHtml;

    proxyNameAndCostLineElement.appendChild(proxyNameElement);
    if (cardProperties.cost !== undefined) {
        proxyCostElement.className = 'card-cost';
        proxyCostElement.innerHTML = applyManaStyling(cardProperties.cost);
        proxyNameAndCostLineElement.appendChild(proxyCostElement);
    }
    // Add a `<div style="clear:both">` inside the name-and-cost line, so that it expands to fit its contents even when
    // those contents are floated. I hate this fix, but that's just how things go with CSS floats.
    var clearDiv = document.createElement('div');
    clearDiv.style.clear = "both";

    proxyNameAndCostLineElement.appendChild(clearDiv);
    proxyElement.appendChild(proxyNameAndCostLineElement);
    proxyElement.appendChild(proxyTypeLineElement);
    proxyElement.appendChild(proxyTextElement);

    if (cardProperties.pt !== undefined) {
        var proxyPowerAndToughnessElement = document.createElement('div');
        var powerAndToughnessHtml = cardProperties.pt;
        proxyPowerAndToughnessElement.className = 'card-power-toughness';
        proxyPowerAndToughnessElement.innerHTML = powerAndToughnessHtml;
        proxyElement.appendChild(proxyPowerAndToughnessElement);
    }

    if (cardProperties.loyalty !== undefined) {
        var proxyLoyaltyElement = document.createElement('div');
        var loyaltyHtml = cardProperties.loyalty;
        proxyLoyaltyElement.className = 'card-loyalty';
        proxyLoyaltyElement.innerHTML = loyaltyHtml;
        proxyElement.appendChild(proxyLoyaltyElement);
    }

    return proxyElement;
}

/**
 * Shortcut function to clear out a container element.
 */
function emptyElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

/**
 * Given a string `string`, add styling to mana characters in that string, such that the mana characters will be
 * appropriately decorated when rendered on the page.
 *
 * The mana characters are W, U, B, R, and G.
 */
function applyManaStyling(string) {
    // Get a list of mana symbols (strings) for which we know how to apply styling.
    var manaSymbols = Object.keys(global.mappings.manaSymbolsToStyles);

    // For each mana symbol that we know about, produce a regex that will match that symbol. (For single colors of mana,
    // this is generally straightforward: the mana symbol string will be a single letter (eg. "W"), and the regex will
    // be the same (eg. /W/).
    var manaSymbolRegexes = []
    for (var i=0; i < manaSymbols.length; i++) {
        var manaSymbolRegex = new RegExp(manaSymbols[i]);
        manaSymbolRegexes.push(manaSymbolRegex);
    }

    // Use the collection of regexes that we have to tokenize the string, breaking it down into an alternating sequence
    // of non-tokens and tokens. The token parts should all be mana symbol strings, for which we know how to apply
    // stylings.
    var tokenizedString = tokenizeString(string, manaSymbolRegexes);

    // Go through the tokenized string pieces, and figure out how to style each piece. If it's a non-token piece, we can
    // safely ignore it. If it's a token piece, we need to figure out which token it is, and apply the appropriate
    // styling to it.
    for (var i=0; i < tokenizedString.length; i++) {

        for (var j=0; j < manaSymbols.length; j++) {
            // If this string piece is a token (ie. something that we identified to be a mana symbol), we now need to
            // figure out which mana symbol it is. To do this, we just run through our list of mana symbol regexes until
            // we find the one that matches.
            var manaSymbol = manaSymbols[j];
            var manaSymbolRegex = manaSymbolRegexes[j];
            if (manaSymbolRegex.test(tokenizedString[i])) {
                // We've found the mana symbol that corresponds to this string piece, which means we now know how to
                // style it. Apply the styling, by replacing this string piece with a marked-up version.
                tokenizedString[i] = tokenizedString[i].replace(
                    manaSymbolRegex,
                    '<span class="manaDecoration '+global.mappings.manaSymbolsToStyles[manaSymbol]+'">$&</span>'
                );

                // Having applied the styling, the string piece has now been altered, so we cannot perform any further
                // modifications to it (it's no longer a pure mana symbol string). Skip to the next string piece.
                break;
            }
        }
    }

    // After the above processing has completed, we should have an alternating sequence of non-tokens, and tokens which
    // now have appropriate styling applied to them. We can join them back together into a string again, and this will
    // be the final result.
    return tokenizedString.join('');
}

/**
 * Given a string `string`, and an array of token regexes `tokens`, break up the string into an array of substrings,
 * where each substring is either a match for a token, or a non-token.
 */
function tokenizeString(string, tokens) {
    var decomposableString = string;
    var stringPieces = [];

    // The tokenization algorithm works like this:
    // 
    // 1. Find the index of the first appearance of a token in the string.
    // 2. By definition, everything up to that index must be a non-token. (It could be the empty string, if the string
    //   happens to start with a token).
    // 3. Slice off the non-token, and the found token, and store them.
    // 4. Repeat steps 1-3 on the resulting shorter string, until no more tokens can be found.
    // 5. Store the remainder of the string (which, by definition, must also be a non-token, and may be the empty
    // string).

    while (decomposableString.length > 0) {
        // Go through all tokens to find out which one has the earliest match in the string.
        var earliestTokenMatch = undefined;
        var earliestMatchIndex = undefined;
        for (var i=0; i < tokens.length; i++) {
            var token = tokens[i];
            var result = token.exec(decomposableString);
            if (result === null) {
                // If the token has no match in the string at all, try the next one.
                continue;
            }
            var matchedString = result[0];
            var tokenMatchIndex = result.index;

            if (earliestMatchIndex === undefined || tokenMatchIndex < earliestMatchIndex) {
                earliestMatchIndex = tokenMatchIndex;
                earliestTokenMatch = matchedString;
            }
        }

        if (earliestTokenMatch === undefined) {
            // If no token was found at all, at any position, then the entire string must be non-token (and it must also
            // be the last piece of string that we'll need to deal with, as there can be no more tokens after this).
            // We just need to add this final piece of string to our collection of string pieces, and we're done.
            stringPieces.push(decomposableString);

            // Slice the entire string down to nothing (empty string).
            decomposableString = decomposableString.slice(decomposableString.length);
        }
        else {
            // We've found which token matches earliest in the string. Everything prior to this match must be a
            // non-token, so we'll collect that first.
            var nonToken = decomposableString.slice(0, earliestMatchIndex);

            // Now collect the bit that matched the token.
            var tokenMatch = earliestTokenMatch;


            // Add them to our collection of string pieces.
            stringPieces.push(nonToken);
            stringPieces.push(tokenMatch);

            // With these pieces now accounted for, we can slice them off the string, and repeat the process if needed.
            decomposableString = decomposableString.slice(nonToken.length+tokenMatch.length);
        }
    }

    // The entire string has been consumed, so we should now have an array of non-tokens and tokens which, when joined
    // together, will recreate the string.
    return stringPieces;
}

/**
 * Given a string representing a mana cost, determine the most appropriate background color for a card that has that
 * cost.
 *
 * Examples:
 *
 * - `getCardColorSchemeFromManaCost("2UU")` should return "blue", because the only colored mana in that cost is blue.
 *
 * - `getCardColorSchemeFromManaCost("1BG")` should return "multicolored", because the mana cost contains two colors:
 * "B" (black) and "G" (green). In Magic, cards with more than one color of mana in their cost have a gold background.
 *
 * Note that a card's color scheme is _not_ the same as the card's color, which is a game mechanic. For example, it is
 * possible for a card to have colored mana in its cost, but to be colorless (this is the case for "Devoid" cards, which
 * define themselves as having no color). Although the two do usually coincide, it's important to maintain the
 * distinction.
 */
function getCardColorSchemeFromManaCost(cost) {
    // If `cost` isn't even defined, just say that it's colorless.
    if (cost === undefined) {
        return 'colorless';
    }

    var manaSymbolRegexStrings = Object.keys(global.mappings.manaSymbolRegexesToCardColorSchemes);

    // For each mana symbol that we know about, produce a regex that will match that symbol. (For single colors of mana,
    // this is generally straightforward: the mana symbol string will be a single letter (eg. "W"), and the regex will
    // be the same (eg. /W/)).
    var manaSymbolRegexes = []
    for (var i=0; i < manaSymbolRegexStrings.length; i++) {
        var manaSymbolRegex = new RegExp(manaSymbolRegexStrings[i]);
        manaSymbolRegexes.push(manaSymbolRegex);
    }

    // Use the collection of regexes that we have to tokenize the cost, breaking it down into an alternating sequence
    // of non-tokens and tokens.
    var tokenizedCost = tokenizeString(cost, manaSymbolRegexes);

    // Go through the tokenized cost pieces and count up all the distinct mana symbols that are present in the cost.
    var distinctManaSymbolRegexStringsInCost = [];
    for (var i=0; i < tokenizedCost.length; i++) {
        for (var j=0; j < manaSymbolRegexStrings.length; j++) {
            // If this cost piece is a token (ie. something that we identified to be a mana symbol), we now need to
            // figure out which mana symbol it is. To do this, we just run through our list of mana symbol regexes until
            // we find the one that matches.
            var manaSymbolRegex = manaSymbolRegexes[j];
            var manaSymbolRegexString = manaSymbolRegexStrings[j];
            if (manaSymbolRegex.test(tokenizedCost[i])) {
                // We've identified the mana symbol (or at least, the regex string that corresponds to it). We'll add
                // that regex string to our collection and keep going.
                if (distinctManaSymbolRegexStringsInCost.indexOf(manaSymbolRegexString) === -1) {
                    // If we've already recorded an occurrence of this mana symbol regex string, we don't need to record
                    // it again. We're only interested in how many distinct mana symbols there are in the cost.
                    distinctManaSymbolRegexStringsInCost.push(manaSymbolRegexString);
                }
                // Having identified the mana symbol for this part of the cost, we can move on to the next.
                break;
            }
        }
    }

    // We should now have a list of all distinct mana symbols in the cost (that we know how to produce color schemes
    // for, at least). With this information, we can now make our decision about what color scheme to use for this card.

    // If there is one and only one type of mana symbol in the cost, we use the color scheme that is defined for that
    // mana symbol. (A hybrid mana symbol, for example "(wu)" (white/blue) is still just one mana symbol, and it does
    // have its own color scheme if it's the only type of colored mana present).
    if (distinctManaSymbolRegexStringsInCost.length === 1) {
        return global.mappings.manaSymbolRegexesToCardColorSchemes[distinctManaSymbolRegexStringsInCost[0]];
    }

    // If there is more than one type of mana symbol in the cost, we use the multicolored scheme.
    if (distinctManaSymbolRegexStringsInCost.length > 1) {
        return 'multicolored';
    }

    // Otherwise, the cost is colorless.
    return 'colorless';
}

/**
 * Determines the "mass" of html `html`. By "mass", we mean "how much of it there is", according to a custom metric.
 * This is relevant for proxy cards; the amount of text that can appear on them is variable, and if there's too much,
 * the text will spill off the bottom of the card. We can't resize the card to fix the text, because all cards need to
 * be the same size. Therefore, we'll use the mass of the html to figure out if there's too much of it, and shrink the
 * text if we fear that it would otherwise be too much for the card.
 */
function calculateHtmlMass(html) {
    // Count the number of characters in the html.
    var numberOfCharacters = html.length;
    // Count the number of newlines. Nice trick for this: split the string on newlines, and count the number of pieces
    // that result.

    var numberOfNewlines = html.split('<br />').length - 1;

    // Might as well be precise about what we're counting.
    var numberOfCharactersNotIncludingNewlines = numberOfCharacters - numberOfNewlines;

    // Add up the combined masses of the characters and newlines. (Newlines have greater mass. The masses are defined in
    // the global configuration).
    return (numberOfCharactersNotIncludingNewlines*global.values.textMasses.character) + (numberOfNewlines*global.values.textMasses.newline);
}

/**
 * Return a random integer from 0 to `max`-1.
 */
function rnd(max) {
    return Math.floor(Math.random() * max);
}

/**
 * Escape any regex metacharacters in `string`.
 */
function escapeRegex(string) {
    var escapedString = string;
    for (var i=0; i < global.regexMetacharacters.length; i++) {
        var metacharacter = global.regexMetacharacters[i];
        // Here's a fun bit of code: in order to replace all regex metacharacters in string with escaped versions, we
        // need to locate them - and to locate all occurrences of a character in a string, we need to use regex!
        var metacharacterRegex = new RegExp('\\'+metacharacter, 'g');
        escapedString = escapedString.replace(metacharacterRegex, '\\'+metacharacter);
    }
    return escapedString;
}