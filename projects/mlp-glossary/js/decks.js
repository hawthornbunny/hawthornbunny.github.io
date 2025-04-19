/**
 * mlp-glossary decks: Randomized deck creator and list application
 * by hawthornbunny
 *
 * This is a single-page application with 3 modes:
 *
 * - Deck constructor mode: The default starting mode. Shows a deck construction
 *   interface which allows the user to construct a deck of virtual "cards",
 *   where each card corresponds to a glossary record. The typical use for this
 *   is to make decks of My Little Pony characters for use in games, but it can
 *   also be useful when you want randomized lists of MLP terms. There are 2
 *   sections to the deck constructor interface:
 *
 *   - Pre-made decks: Allows the user to select any number of pre-made, curated
 *     decks.
 *   - Deck generator: Generates decks from the glossary, allowing the user to
 *     select any combinations of media and category to include.
 *
 *   A counter at the bottom keeps track of how many cards will be in the
 *   resulting deck.
 *
 *   Once the user has selected their construction options, they may press one
 *   of the buttons at the bottom:
 *
 *   - Start a new deal: Begins a new card deal and switches the application to
 *     Deck mode.
 *   - Continue previous deal: If a card deal was already started, this resumes
 *     that deal and switches the application to Deck mode.
 *   - Generate list: Switches the application to List mode.
 *
 * - Deck mode: Provides controls to control a virtual deck of cards, where each
 *   card corresponds to a glossary record. The exact cards in the deck depend
 *   on the deck construction options chosen by the user. The user can deal
 *   single cards, discard dealt cards, and reshuffle the deck. The user can
 *   return to Deck constructor mode via the "Change deck options" button. The
 *   application saves the Deck mode state, allowing the user to return to it
 *   if they wish.
 *
 * - List mode: Provides controls to generate textual lists of glossary entries,
 *   with a number of formatting options to match the formats of different games
 *   that use lists (eg. Codenames, skribbl.io).
 *
 * Each mode has entry requirements that must be met in order to transition to
 * that mode:
 *
 * - Deck constructor mode:
 *   - Object specifying which pre-made deck checkboxes are selected/unselected
 *   - Object specifying which property value checkboxes are selected/unselected
 * - Deck mode:
 *   - List of glossary keys representing the cards in-deck
 *   - List of glossary keys representing the dealt cards
 *   - List of glossary keys representing the discarded cards
 * - List mode:
 *   - List of glossary item names
 *   - Object specifying which list format options are selected/unselected
 *
 * TODO:
 * - Add image capability to proxies
 * - Add number of words filter (needed for skribblio)
 * - Add character filter (eg. to remove apostrophes/hyphens/numbers)
 */

// Global namespace for holding decks application state
DECKS = {
    'mappings': {
        'dataToId': undefined,
        'idToData': undefined,
    },
};

/*******************************************************************************
 * Initialization and general functions
 ******************************************************************************/

/**
 * Start the application (performs all the necessary data fetches for the
 * glossary information), set up the controllers for the application modes,
 * and start in deck constructor mode.
 */
const initialize = async function initialize()
{
    // Start the glossary application to provide the data source for the deck
    // builder.
    await startApplication();

    // Build a set of mappings from glossary indices to checkbox ids. This will
    // allow us to associate each checkbox with its glossary property.
    DECKS.mappings = buildIdMappings();

    // Create global objects to represent each mode of operation. This makes it
    // easier to provide a consistent way of switching between modes in our
    // single-page app.
    DECKS.modes = {
        'construct': new Mode(),
        'deck': new Mode(),
        'list': new Mode(),
    };

    // Define draw functions for each mode.
    DECKS.modes.construct.drawFunc = drawConstructInterface;
    DECKS.modes.deck.drawFunc = drawDeckInterface;
    DECKS.modes.list.drawFunc = drawListInterface;

    // Define update functions for each mode.
    DECKS.modes.construct.updateFunc = updateConstructInterface;
    DECKS.modes.deck.updateFunc = updateDeckInterface;
    DECKS.modes.list.updateFunc = updateListInterface;

    // Begin by switching into deck constructor mode.
    switchMode('construct');
};

/**
 * Build a set of mappings from data to input ids, and vice-versa. This makes it
 * easier to map the user's selections to the data they're selecting, and to
 * restore the selections after changing mode. It's also necessary because some
 * characters (eg. spaces) aren't allowed in ids, so we can't map some names
 * directly to ids.
 */
const buildIdMappings = function buildIdMappings()
{
    const mappings = {
        'dataToId': {
            'decks': {},
            'props': {},
        },
        'idToData': {
            'decks': {},
            'props': {},
        }
    };

    const toId = string => string.replace(/\W/g, '-');

    for (const deckName in global.premadeDecks) {
        const id = toId(deckName);
        mappings.dataToId.decks[deckName] = id;
        mappings.idToData.decks[id] = deckName;
    }

    for (const propName in global.validatedProperties) {
        const propValues = global.validatedProperties[propName];

        mappings.dataToId.props[propName] = {};

        for (let i = 0; i < propValues.length; i++) {
            const propValue = propValues[i];
            const id = toId(`${propName}-${propValue}`);
            mappings.dataToId.props[propName][propValue] = id;
            mappings.idToData.props[id] = [propName, propValue];
        }
    }

    return mappings;
};

/**
 * Mode switcher, to provide a consistent interface for switching between
 * application modes. This performs several basic preparations required by all
 * modes (clearing the screen, drawing the new mode interface, etc.).
 *
 * @param {string} mode
 */
const switchMode = function switchMode(mode)
{
    const modeObject = DECKS.modes[mode];
    if (modeObject === undefined) {
        throw new Error(`Cannot switch mode; invalid mode "${mode}"`);
    }

    // Clear screen
    emptyMain();

    // Draw mode interface
    modeObject.drawFunc();

    // Restore checkbox states if needed
    const checkboxStates = modeObject.checkboxStates;
    for (checkboxId in checkboxStates) {
        const checkbox = query(`#${checkboxId}`);
        checkbox.checked = checkboxStates[checkboxId];
    }

    // Force an update of the interface (note: this is not the same as a redraw,
    // as it doesn't clear the screen - however, it's needed here in case
    // restoring the checkbox states introduced new information that wasn't
    // present when the screen was drawn).
    modeObject.updateFunc();
};

/*******************************************************************************
 * Deck constructor mode
 ******************************************************************************/

/**
 * Draw the deck constructor interface.
 */
function drawConstructInterface()
{
    const main = query('#main');
    const constructPanel = create('div');
    const header = create('header');
    const title = create('div')
//    const infoP = create('p');
//    const premadeDecksTitle = create('h2');
//    const premadeSelector = createPremadeDeckSelector();
//    const deckGeneratorTitle = create('h2');
    const deckGenerator = createGlossaryDeckGenerator();
    const cardCountDisplay = createCardCountDisplay();
    const buttonsPanel = createConstructButtons();

    constructPanel.id = 'deckConstructor';
    setProps(title, {'id': 'logoSmall', 'innerHTML': '<a href="index.html">MLP Glossary</a><div class="subtitle">Decks</div>'});
//    infoP.innerHTML = 'Use the deck constructor interface below to create a custom deck. You can select any number of pre-made decks, and/or use the deck generator to build a deck from selected glossary categories. The final deck will be composed of all your selections, with duplicates removed.';
//    premadeDecksTitle.innerHTML = 'Pre-made decks';
//    deckGeneratorTitle.innerHTML = 'Deck generator';

    append(header, title); //, infoP);
//    append(constructPanel, header, premadeDecksTitle, premadeSelector, deckGeneratorTitle, deckGenerator, cardCountDisplay, buttonsPanel);
    append(constructPanel, header, deckGenerator, cardCountDisplay, buttonsPanel);

    // Add toggle event handlers to all of the deck selector and deck generator
    // checkboxes to update the card count display when toggled.
//    const deckSelectorCheckboxes = premadeSelector.querySelectorAll('input[type=checkbox]');
//    for (let i=0; i < deckSelectorCheckboxes.length; i++) {
//        const checkbox = deckSelectorCheckboxes[i];
//        checkbox.addEventListener('change', updateConstructInterface);
//    }

    const deckGeneratorCheckboxes = deckGenerator.querySelectorAll('input[type=checkbox]');
    for (let i=0; i < deckGeneratorCheckboxes.length; i++) {
        const checkbox = deckGeneratorCheckboxes[i];
        checkbox.addEventListener('change', updateConstructInterface);
    }

    append(main, constructPanel);
}

/**
 * Create the pre-made deck selector panel.
 *
 * @return {Element}
 */
//const createPremadeDeckSelector = function createPremadeDeckSelector()
//{
//    const optionRecords = [];
//    const dataToId = DECKS.mappings.dataToId.decks;
//
//    for (const deckName in dataToId) {
//        const deck = global.premadeDecks[deckName];
//        const optionRecord = {
//            'id': dataToId[deckName],
//            'title': `${deck.name} (${deck.items.length} items)`,
//            'description': deck.description,
//        };
//
//        optionRecords.push(optionRecord);
//    }
//
//    const deckSelector = createOptionListSelector(optionRecords);
//    deckSelector.id = 'deckSelector';
//
//    return deckSelector;
//};

/**
 * Create the glossary deck generator interface.
 *
 * @return {Element}
 */
const createGlossaryDeckGenerator = function createGlossaryDeckGenerator()
{
    const generatorPanel = create('div');
    const dataToId = DECKS.mappings.dataToId.props;
    const filterListWidths = {
        "media": "narrow",
        "category": "wide",
    };

    generatorPanel.id = 'deckGenerator';

    for (const propName in dataToId) {
        const propValues = Object.keys(dataToId[propName]);
        optionRecords = propValues.map(
            propValue => {
                return {
                    'id': dataToId[propName][propValue],
                    'title': propValue
                }
            }
        );
        const width = filterListWidths[propName];

        const filterList = createFilterList(propName, optionRecords, width);
        append(generatorPanel, filterList);
    }

    return generatorPanel;
};

/**
 * Create the card count display, which gives a running total for the size of
 * the constructed deck.
 *
 * @return {Element}
 */
const createCardCountDisplay = function createCardCountDisplay()
{
    const panel = create('div');
    const label = create('p');
    const display = create('p');

    panel.id = 'cardCountPanel';
    label.innerHTML = 'Total cards in deck:'
    display.id = 'cardCountDisplay';
    display.innerHTML = '0';

    append(panel, label, display)

    return panel;
};

/**
 * Create and return the buttons panel. The exact nature of this panel depends
 * on the deck mode state.
 *
 * @return {Element}
 */
const createConstructButtons = function createConstructButtons()
{
    const buttonsPanel = create('div');
    const startDealButton = create('button');
    const resumeDealButton = create('button');
    const createListButton = create('button');
    const deckModeState = DECKS.modes.deck.state;

    setProps(
        startDealButton,
        {'id': 'startDealButton', 'innerHTML': 'Start a new deal', 'disabled': true}
    ); // with new options
    setProps(
        resumeDealButton,
        {'id': 'resumeDealButton', 'innerHTML': 'Resume previous deal'}
    ); // with previous options
    setProps(
        createListButton,
        {'id': 'createListButton', 'innerHTML': 'Create list', 'disabled': true}
    );

    if (deckModeState === undefined) {
        resumeDealButton.style.display = 'none'; 
    }

    startDealButton.addEventListener('click', handleStartDeal);
    resumeDealButton.addEventListener('click', handleContinueDeal);
    createListButton.addEventListener('click', handleCreateList);
    append(buttonsPanel, startDealButton, resumeDealButton, createListButton);

    return buttonsPanel;
};

/**
 * Read the current state of the deck constructor and use the selected options
 * to construct and return a deck. The deck is returned as an array of glossary
 * keys.
 *
 * @return {string[]}
 */
const constructDeck = function constructDeck()
{
    // Create a collection to hold the glossary items that will be used to
    // create the deck and/or list. The collection is indexed by key to avoid
    // duplicates.
    const indexedItems = {};

    // Get the current selections from the deck constructor interface.
    const selections = {
        'premadeDecks': {},
        'deckGenerator': {},
    };

    // Pre-made deck selector
//    let premadeCheckboxes = document.querySelectorAll('#deckSelector .option-panel input[type=checkbox]');
//    premadeCheckboxes = [...premadeCheckboxes];
//    for (let i=0; i < premadeCheckboxes.length; i++) {
//        const checkbox = premadeCheckboxes[i];
//        selections.premadeDecks[checkbox.id] = checkbox.checked;
//    }

    // Glossary deck generator
    let generatorCheckboxes = document.querySelectorAll('#deckGenerator .filter-list input[type=checkbox]');
    generatorCheckboxes = [...generatorCheckboxes];
    for (let i=0; i < generatorCheckboxes.length; i++) {
        const checkbox = generatorCheckboxes[i];
        selections.deckGenerator[checkbox.id] = checkbox.checked;
    }

    // Pre-made deck selector
//    let selectedPremade = Object.keys(selections.premadeDecks);
//    selectedPremade = selectedPremade.filter(k => selections.premadeDecks[k] === true);
//    const premadeDecks = selectedPremade.map(k => global.premadeDecks[DECKS.mappings.idToData.decks[k]]);

    // Glossary deck generator
    let selectedGenerator = Object.keys(selections.deckGenerator);
    selectedGenerator = selectedGenerator.filter(k => selections.deckGenerator[k] === true && !k.includes('selectAllNone'));

    // Get all glossary items for the pre-made decks.
//    for (let i=0; i < premadeDecks.length; i++) {
//        const premadeDeck = premadeDecks[i];
//        const items = premadeDeck.items;
//        for (let j=0; j < items.length; j++) {
//            const item = items[j];
//
//            const itemKey = makeCompositeKey(...item);
//            indexedItems[itemKey] = global.indexedGlossary[itemKey];
//        }
//    }

    // Get all glossary items that match the selected deck generator properties.
    // The deck generator allows the selection of any number of possible values
    // for 2 properties, media and category. The resulting items will be those
    // that match any of the possible values for BOTH properties.
    //
    // For example, if the selected property values are as follows:
    //
    // media: EqG, FiM
    // category: character, artifact
    //
    // then the resulting items will be all EqG characters, all EqG artifacts,
    // all FiM characters, and all FiM artifacts. It won't include FiM locations
    // (location isn't a selected category) and it won't include G5 characters
    // (G5 isn't a selected media).

    // A relatively easy way to get the desired set of glossary items is to get
    // a list of all property values that _weren't_ selected, and filter those
    // out. What remains must then be the desired set.

    // First, get the ids of all checkboxes that weren't selected.
    const idToData = DECKS.mappings.idToData.props;
    const nonSelectedIds = Object.keys(idToData).filter(k => !contains(selectedGenerator, k));

    // For each non-selected property value, filter out all glossary items that
    // have it.
    let glossaryItems = Object.keys(global.indexedGlossary);
    for (let i = 0; i < nonSelectedIds.length; i++) {
        const nonSelectedId = nonSelectedIds[i];
        const propNameValuePair = idToData[nonSelectedId];
        const propName = propNameValuePair[0];
        const propValue = propNameValuePair[1];
        glossaryItems = glossaryItems.filter(key => global.indexedGlossary[key][propName] !== propValue)
    }

    // Add the glossary items to the deck.
    for (let i = 0; i < glossaryItems.length; i++) {
        const glossaryKey = glossaryItems[i];
        indexedItems[glossaryKey] = global.indexedGlossary[glossaryKey];
    }

    return Object.keys(indexedItems);
};

const updateConstructInterface = function updateConstructInterface()
{
    const cardCountDisplay = query('#cardCountDisplay');
    const startDealButton = query('#startDealButton');
    const createListButton = query('#createListButton');
    const deck = constructDeck();

    cardCountDisplay.innerHTML = deck.length;
    startDealButton.disabled = deck.length === 0;
    createListButton.disabled = deck.length === 0;
};

const saveConstructSelections = function saveConstructSelections()
{
    // Save deck constructor checkbox states
    let premadeCheckboxes = document.querySelectorAll('#deckSelector .option-panel input[type=checkbox]');
    let generatorCheckboxes = document.querySelectorAll('#deckGenerator .filter-list input[type=checkbox]');
    premadeCheckboxes = [...premadeCheckboxes];
    generatorCheckboxes = [...generatorCheckboxes];

    const checkboxes = premadeCheckboxes.concat(generatorCheckboxes);

    DECKS.modes.construct.checkboxStates = {}
    for (let i=0; i < checkboxes.length; i++) {
        const checkbox = checkboxes[i];
        DECKS.modes.construct.checkboxStates[checkbox.id] = checkbox.checked;
    }
};

const handleStartDeal = function handleStartDeal()
{
    saveConstructSelections();

    // Set up deck mode
    DECKS.modes.deck.state = {
        'cards': {
            'inDeck': constructDeck(),
            'onScreen': [],
            'discarded': [],
        }
    }

    // Shuffle deck before starting deal
    shuffleDeck();

    switchMode('deck');
};

const handleContinueDeal = function handleContinueDeal()
{
    // TODO: Finish
    saveConstructSelections();
    switchMode('deck');
};

const handleCreateList = function handleCreateList()
{
    saveConstructSelections();

    // Set up list mode
    DECKS.modes.list.state = {
        'items': constructDeck(),
    }

    switchMode('list');
};

/*******************************************************************************
 * Deck mode
 ******************************************************************************/

const drawDeckInterface = function drawDeckInterface()
{
    const main = query('#main');
    const layoutTable = create('table');
    const buttonsRow = create('tr');
    const drawnCardsRow = create('tr');
    const buttonsCell = create('td');
    const drawnCardsCell = create('td');
    const buttonsPanel = create('div');
    const deckInfoPanel = create('div', 'decks-deck-info-panel');
    const drawnCardsPanel = create('div', 'decks-drawn-cards-panel');
    const drawCardButton = create('button');
    const reshuffleButton = create('button');
    const changeDeckOptionsButton = create('button');

    buttonsPanel.id = 'deckButtonsPanel';
    deckInfoPanel.id = 'deckInfoPanel';
    drawnCardsPanel.id = 'drawnCardsPanel';

    setProps(
        drawCardButton,
        {'id': 'drawCardButton', 'innerHTML': '🂠 Draw card'}
    );
    setProps(
        reshuffleButton,
        {'id': 'reshuffleButton', 'innerHTML': '↺ Reshuffle'}
    );
    setProps(
        changeDeckOptionsButton,
        {'id': 'changeDeckOptionsButton', 'innerHTML': '← Change deck options'}
    );

    drawCardButton.addEventListener('click', handleDrawCard);
    reshuffleButton.addEventListener('click', handleReshuffle);
    changeDeckOptionsButton.addEventListener('click', handleChangeDeckOptions);

    append(buttonsPanel, drawCardButton, reshuffleButton, changeDeckOptionsButton);
    append(buttonsCell, buttonsPanel, deckInfoPanel);
    append(buttonsRow, buttonsCell);
    append(drawnCardsCell, drawnCardsPanel);
    append(drawnCardsRow, drawnCardsCell);
    append(layoutTable, buttonsRow, drawnCardsRow);
    append(main, layoutTable);

    updateDeckInterface();
};

const updateDeckInterface = function updateDeckInterface()
{
    const deckInfoPanel = query('#deckInfoPanel');
    const drawnCardsPanel = query('#drawnCardsPanel');
    const drawCardButton = query('#drawCardButton');
    const deckModeCards = DECKS.modes.deck.state.cards;
    const numDrawnCards = deckModeCards.onScreen.length + deckModeCards.discarded.length;
    const drawnCards = deckModeCards.onScreen;

    empty(deckInfoPanel);
    empty(drawnCardsPanel);

    // Update card info panel
    let html = '';
    html += `<div><strong>Cards drawn:</strong> ${numDrawnCards}</div>`;
    html += `<div><strong>Cards left in deck:</strong> ${deckModeCards.inDeck.length}</div>`;
    deckInfoPanel.innerHTML = html;

    // Update cards display
    for (let i = 0; i < drawnCards.length; i++) {
        const drawnCard = drawnCards[i];
        const glossaryRecord = global.indexedGlossary[drawnCard];
        const cardProxy = createCardProxy(glossaryRecord, i);

        append(drawnCardsPanel, cardProxy);
    }    

    // Disable draw card button if no cards left in deck
    drawCardButton.disabled = deckModeCards.inDeck.length === 0;
};

/**
 * Given a glossary record, create an DOM element representing that record as
 * a card ("proxy" here is used in the Magic: the Gathering sense of "something
 * that represents a card").
 *
 * `drawnCardIndex` represents the index of that card in the list of drawn
 * cards; this is needed so that we can target the card with an event when the
 * user chooses to discard it.
 *
 * @param {Object} glossaryRecord
 * @param {number} drawnCardIndex
 * @return {Element}
 */
const createCardProxy = function createCardProxy(glossaryRecord, drawnCardIndex)
{
    const cardProxy = create('div', 'proxy');

    // Look up the media this proxy is for, and generate a color palette for the
    // proxy based on that media's tag color.
    const media = global.tables.media.get(glossaryRecord.media);
    const mediumRgb = decomposeHexColor(media.color);

    // Get the RGB components as floats from 0 to 1.
    const mediumRgbF = mediumRgb.map(component => component / 255)

    // Convert the RGB components to HSL.
    const mediumHslF = rgbToHsl(...mediumRgbF);
    let mediumHsl = [mediumHslF[0] * 360, mediumHslF[1] * 100, mediumHslF[2] * 100];

    // Generate light and dark color variants.
    let lightHsl = [mediumHsl[0], mediumHsl[1], mediumHsl[2] * 1.5];
    let darkHsl = [mediumHsl[0], mediumHsl[1], mediumHsl[2] * 0.75];

    // Round and clamp the HSL values.
    mediumHsl = mediumHsl.map(component => Math.floor(component));
    lightHsl = lightHsl.map(component => Math.floor(component));
    darkHsl = darkHsl.map(component => Math.floor(component));
    lightHsl = [lightHsl[0], lightHsl[1], Math.min(lightHsl[2], 255)];

    //let lightRgb = mediumRgb.map(component => component * 2);
    //lightRgb = lightRgb.map(component => Math.floor(Math.min(component, 255)));
    //let darkRgb = mediumRgb.map(component => component * 0.5);
    //darkRgb = darkRgb.map(component => Math.floor(component));

    //const mediumColor = `rgb(${mediumRgb[0]}, ${mediumgb[1]}, ${mediumRgb[2]})`;
    //const lightColor = `rgb(${lightRgb[0]}, ${lightRgb[1]}, ${lightRgb[2]})`;
    //const darkColor = `rgb(${darkRgb[0]}, ${darkRgb[1]}, ${darkRgb[2]})`;
    const mediumColor = `hsl(${mediumHsl[0]}, ${mediumHsl[1]}%, ${mediumHsl[2]}%)`;
    const lightColor = `hsl(${lightHsl[0]}, ${lightHsl[1]}%, ${lightHsl[2]}%)`;
    const darkColor = `hsl(${darkHsl[0]}, ${darkHsl[1]}%, ${darkHsl[2]}%)`;

    // Construct the proxy's HTML.
    let html = "";
    html += `<p class="proxy-item"><span class="proxy-item-title" style="background-color: ${darkColor}"}>${glossaryRecord.item}</span></p>`;
    html += `<p class="proxy-media-category"><span class="proxy-media" style="background-color: ${mediumColor};">${glossaryRecord.media}</span> &mdash; ${glossaryRecord.category}</p>`;
    html += `<p class="proxy-description">${glossaryRecord.description}</p>`;
    cardProxy.innerHTML = html;

    cardProxy.style.backgroundColor = lightColor;
    cardProxy.style.borderColor = darkColor;

    // Some cards have long titles which tend to push the description out of the
    // bottom of the card. Switch to a smaller title font if the title is too
    // long.
    const maxTitleLen = 35;
    if (glossaryRecord.item.length > maxTitleLen) {
        cardProxy.querySelector(".proxy-item-title").classList.add("small-title");
    }

    const maxDescLen = 100;
    if (glossaryRecord.description.length > maxDescLen) {
        cardProxy.querySelector(".proxy-description").classList.add("small-description");
    }

    cardProxy.dataset.index = drawnCardIndex;
    cardProxy.addEventListener('click', handleDiscardCard);

    return cardProxy;
};

/**
 * Return all cards that have currently been dealt or discarded in deck mode
 * back to the deck, and shuffle it.
 */
const shuffleDeck = function shuffleDeck()
{
    const deckModeCards = DECKS.modes.deck.state.cards;

    deckModeCards.inDeck = deckModeCards.inDeck.concat(deckModeCards.onScreen);
    deckModeCards.inDeck = deckModeCards.inDeck.concat(deckModeCards.discarded);
    deckModeCards.inDeck = shuffle(deckModeCards.inDeck);
    deckModeCards.onScreen = [];
    deckModeCards.discarded = [];
};

/**
 * Handle the "Draw card" button.
 */
const handleDrawCard = function handleDrawCard()
{
    const deckModeCards = DECKS.modes.deck.state.cards;

    let drawnCard = null;
    if (deckModeCards.inDeck.length > 0) {
        drawnCard = deckModeCards.inDeck.pop();
    }

    deckModeCards.onScreen.push(drawnCard);

    updateDeckInterface();
};

/**
 * Handle the "Reshuffle" button.
 */
const handleReshuffle = function handleReshuffle()
{
    shuffleDeck();
    updateDeckInterface();
};

/**
 * Handle the "Change deck options" button (used in both deck mode and list
 * mode).
 */
const handleChangeDeckOptions = function handleChangeDeckOptions()
{
    // TODO: Deck state doesn't need to be saved as it's all in global storage.
    // However, list mode inputs do need to be saved when switching back to the
    // deck constructor.
    switchMode('construct');
};

const handleDiscardCard = function handleDiscardCard(evt)
{
    const deckModeCards = DECKS.modes.deck.state.cards;
    const cardIndex = evt.currentTarget.dataset.index;

    // Push the selected card to the discards and remove it from the cards on
    // screen, then update the display.
    deckModeCards.discarded.push(deckModeCards.onScreen[cardIndex]);
    deckModeCards.onScreen.splice(cardIndex, 1);
    updateDeckInterface();
};

/*******************************************************************************
 * List mode
 ******************************************************************************/

const drawListInterface = function drawListInterface()
{
    const main = query('#main');
    const buttonsPanel = create('div');
    const listAndOptionsPanel = create('div');
    const listArea = create('textarea');
    const optionsPanel = createListOptionsPanel();
    const changeDeckOptionsButton = create('button');
    const optionsPanelInputs = optionsPanel.querySelectorAll('input');

    for (let i=0; i < optionsPanelInputs.length; i++) {
        const input = optionsPanelInputs[i];
        input.addEventListener('change', evt => updateListInterface());
    }

    listAndOptionsPanel.id = 'listAndOptionsPanel';
    optionsPanel.id = 'listOptions';

    setProps(
        listArea,
        {'id': 'listArea', 'cols': 80, 'rows': 32}
    );

    setProps(
        changeDeckOptionsButton,
        {'id': 'changeDeckOptionsButton', 'innerHTML': '← Change deck options'}
    );

    changeDeckOptionsButton.addEventListener('click', handleChangeDeckOptions);

    append(buttonsPanel, changeDeckOptionsButton);
    append(listAndOptionsPanel, listArea, optionsPanel);
    append(main, buttonsPanel, listAndOptionsPanel);

    updateListInterface();
};

/**
 * Create the list mode options panel.
 *
 * @return {Element}
 */
const createListOptionsPanel = function createListOptionsPanel()
{
    const optionsPanel = create("div");
    const listWarning = create("p");
    listWarning.id = "listWarning";

    const newlineDelimited = new CheckableOption(
        "newlineDelimited", "radio", "Newline-delimited (Codenames)"
    );
    const commaDelimited = new CheckableOption(
        "commaDelimited", "radio", "Comma-delimited (skribbl.io)"
    );
    const customDelimiter = new CheckableOption(
        "customDelimiter", "radio", "Custom delimiter:"
    );
    const maxChars = new CheckableOption(
        "maxChars", "checkbox", "Max number of characters:"
    );
    const maxWords = new CheckableOption(
        "maxWords", "checkbox", "Max number of words:"
    );
    const disallowedChars = new CheckableOption(
        "disallowedChars", "checkbox", "Disallowed characters:"
    );
    const disambiguateNonUnique = new CheckableOption(
        "disambiguateNonUnique", "checkbox", "Disambiguate non-unique items"
    );

    newlineDelimited.setCheckableGroup("delimiter");
    commaDelimited.setCheckableGroup("delimiter");
    customDelimiter.setCheckableGroup("delimiter");
    customDelimiter.setField("customDelimiterField", "/");
    maxChars.setField("maxCharsField", "20");
    maxWords.setField("maxWordsField", "5");
    disallowedChars.setField("disallowedCharsField", "'-.,%");

    const delimiterOptionsList = createCheckableOptionsList(
        [
            newlineDelimited,
            commaDelimited,
            customDelimiter,
            maxChars,
            maxWords,
            disallowedChars,
            disambiguateNonUnique,
        ]
    );

    append(optionsPanel, delimiterOptionsList, listWarning);

    const newlineDelimitedRadio = optionsPanel.querySelector('#newlineDelimited');
    newlineDelimitedRadio.checked = true;
    disambiguateNonUnique.checked = false;

    return optionsPanel;
}

/**
 * Update the list mode textarea based on the selections in the list options
 * panel.
 */
function updateListInterface()
{
    const listArea = query("#listArea");
    const listOptions = query("#listOptions");
    const listWarning = query("#listWarning");
    const customDelimiterString = query("#customDelimiterField").value;
    const selectedDelimiterRadio = listOptions.querySelector("input[type=radio]:checked");

    // Set up the delimiter options.
    const delimiters = {
        "newlineDelimited": "\n",
        "commaDelimited": ",",
    };

    // Default to the newline delimiter.
    let delimiter = delimiters["newlineDelimited"];

    // Set the delimiter based on the user's selected option.
    if (selectedDelimiterRadio !== null) {
        if (selectedDelimiterRadio.id === "customDelimiter") {
            delimiter = customDelimiterString;
        } else if (delimiters[selectedDelimiterRadio.id] !== undefined) {
            delimiter = delimiters[selectedDelimiterRadio.id];
        }
    }

    // Clear the warning message.
    listWarning.innerHTML = "";

    // Fetch the list of selected glossary items, based on the selections the
    // user made in constuct mode. This is a list of glossary keys which was
    // placed in the list mode state when "Create list" was clicked.
    const items = DECKS.modes.list.state.items;

    // In list mode, we only display the glossary item's name (e.g.
    // "Applejack"). However, in some cases, the same name could refer to
    // multiple glossary items (eg. "FiM-character-Applejack",
    // "EqG-character-Applejack"). For these cases, disambiguate the item.
    // (Note that it isn't always just different incarnations of the same
    // character - for example, in FiM, "Somnambula" is the both the name
    // of a character and of a location).
    const disambiguatedItems = disambiguateItems(items, global.indexedGlossary);

    // The disambiguated item list provides us with a unique list of item names.
    // We now need to filter that list depending on the user's selections.
    let itemNames = Object.keys(disambiguatedItems);

    // If the user selected the max chars checkbox, filter out any item names
    // that are too long.
    const maxCharsCheckbox = query('#maxChars');
    if (maxCharsCheckbox.checked) {
        const maxCharsField = query('#maxCharsField');
        const maxChars = maxCharsField.value;
        itemNames = itemNames.filter(itemName => itemName.length <= maxChars);
    }

    // If the user selected the max words checkbox, filter out any item names
    // that have too many words.
    const maxWordsCheckbox = query('#maxWords');
    if (maxWordsCheckbox.checked) {
        const maxWordsField = query('#maxWordsField');
        const maxWords = maxWordsField.value;
        itemNames = itemNames.filter(itemName => itemName.split(/\s+/).length <= maxWords);
    }

    // If the user selected the disallowed words checkbox, filter out any item
    // names that contain disallowed characters.
    const disallowedCharsCheckbox = query('#disallowedChars');
    if (disallowedCharsCheckbox.checked) {
        const disallowedCharsField = query('#disallowedCharsField');
        const disallowedCharsString = disallowedCharsField.value;
        const disallowedChars = disallowedCharsString.split('');
        
        itemNames = itemNames.filter(itemName => {
            for (let i = 0; i < disallowedChars.length; i++) {
                const disallowedChar = disallowedChars[i];
                if (itemName.includes(disallowedChar)) {
                    return false;
                }
            }
            return true;
        });
    }

    // Filter out any items that contain the delimiter itself (these would get
    // broken into multiple incorrect items). Warn the user that they were
    // removed.
    const containsDelimiter = string => string.includes(delimiter);
    const itemsContainingDelimiter = itemNames.filter(containsDelimiter);
    itemNames = itemNames.filter(i => !containsDelimiter(i));

    if (itemsContainingDelimiter.length > 0) {
        const removedItems = itemsContainingDelimiter.map(i => `"${i}"`).join(', ');
        listWarning.innerHTML = `Some items were removed as they contain the
        delimiter: ${removedItems}`;
    }

    // With filtering of the item names complete, we can now add back in any
    // items that had multiple disambiguated versions if the user requested that
    // they be included.
    const disambiguateCheckbox = query('#disambiguateNonUnique');
    if (disambiguateCheckbox.checked) {
        let i = 0;
        while (i < itemNames.length) {
            const itemName = itemNames[i];
            const disambiguatedNames = disambiguatedItems[itemName];
            if (disambiguatedNames.length === 1) {
                // No need to disambiguate if there's only one possible version.
                i++;
                continue;
            }
            // Remove the ambiguous name and add the disambiguated ones.
            itemNames.splice(i, 1, ...disambiguatedNames);

            // Move the index forward to account for the added names.
            i += disambiguatedNames.length - 1;
            i++;
        }
    }

    // Sort the list alphabetically for presentation.
    itemNames.sort();

    // Display the completed list in the textarea.
    const itemList = itemNames.join(delimiter);
    listArea.value = itemList;
}

/**
 * Given a list of glossary keys which refer to a set of glossary records,
 * return an object which maps each name in the glossary to a list of its
 * possible disambiguations.
 *
 * For example, if the glossary records referred to are as follows:
 *
 *     {
 *         "EqG-character-Applejack": {
 *             media: "EqG",
 *             category: "character",
 *             item: "Applejack"
 *         },
 *         "FiM-character-Applejack": {
 *             media: "FiM",
 *             category: "character",
 *             item: "Applejack"
 *         },
 *         "FiM-character-Somnambula": {
 *             media: "FiM",
 *             category: "character",
 *             item: "Somnambula"
 *         },
 *         "FiM-location-Somnambula": {
 *             media: "FiM",
 *             category: "location",
 *             item: "Somnambula"
 *         }
 *     }
 *
 * then the disambiguated object is:
 *
 *     {
 *         "Applejack": ["Applejack (EqG)", "Applejack (FiM)"],
 *         "Somnambula": ["Somnambula (character)", "Somnambula (location)"],
 *     }
 */
function disambiguateItems(glossaryKeys, indexedGlossary)
{
    // Create an object mapping glossary item names to lists of records with
    // those names (ie. group together records that have the same `item` value).
    const namesToRecords = {};
    glossaryKeys.forEach(key => {
        const record = indexedGlossary[key];
        const name = record.item;

        if (namesToRecords[name] === undefined) {
            namesToRecords[name] = [];
        }

        namesToRecords[name].push(record);
    });

    // Names which map to more than one record are those which need to be
    // disambiguated. However, in order to do so, we need to find which property
    // the names differ by. For most, they will differ by media (e.g. different
    // incarnations of the same character), but there are rare cases where
    // names differ by category (e.g. Somnambula, which is both a character and
    // a location in FiM).
    const disambiguatedItems = {};
    for (const name in namesToRecords) {
        const records = namesToRecords[name];
        disambiguatedItems[name] = [];

        // If there's only one record with this name, no disambiguation is
        // needed.
        if (records.length === 1) {
            disambiguatedItems[name].push(records[0].item);
            continue;
        }

        // If there are multiple records with this name, find out which property
        // those records differ by. We're only interested in the media and
        // category properties.
        const props = ["media", "category"];

        // First, get all values for each property.
        const propValues = {};
        props.forEach(prop => {
            propValues[prop] = records.map(record => record[prop]);
        });

        // For each property, check if all the values we have for it are unique
        // (i.e. no record has the same value for that property as another).
        // Take the first one that has all unique values. We'll use this as the
        // distinguishing property for the purpose of disambiguation.
        let differingProp = null;
        for (const prop in propValues) {
            const propValuesList = propValues[prop];
            const dedupPropValuesList = dedupList(propValuesList);
            // Compare list to deduplicated list to confirm uniqueness
            if (propValuesList.length === dedupPropValuesList.length) {
                differingProp = prop;
                break;
            }
        }

        // If we couldn't find a differing property, throw an error.
        if (differingProp === null) {
            throw new Error(`Could not disambiguate glossary records with item "${name}"; unable to find a property with unique values which could be used to disambiguate the records`);
        }

        // Use the differing property to disambiguate the records.
        propValues[differingProp].forEach(value => {
            disambiguatedItems[name].push(`${name} (${value})`);
        });
    }

    return disambiguatedItems;
}

/*******************************************************************************
 * Other functions
 ******************************************************************************/
function emptyMain()
{
    const main = query('#main');
    empty(main);
}

function rndi(max) {
    return Math.floor(Math.random() * max);
}

function shuffle(array)
{
    const shuffledArray = [];
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        const insertIndex = rndi(shuffledArray.length+1);
        shuffledArray.splice(insertIndex, 0, element);
    }
    return shuffledArray;
}

function dedupList(list)
{
    const dedupedList = [];
    list.forEach(item => {
        if (!dedupedList.includes(item)) {
            dedupedList.push(item);
        }
    });

    return dedupedList;
}

window.onload = initialize;
