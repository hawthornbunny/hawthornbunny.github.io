window.onload = initialize;

/**
 * Application setup.
 */
function initialize() {
    CARDS = CARDS.concat(FICG_CARDS);
    CARDS = CARDS.concat(IPU_CARDS);

    var xmlContainer = document.querySelector('#xmlContainer');

    global.urlParameters = getUrlParameters();
    if (Object.keys(global.urlParameters).length > 0) {
        if (global.urlParameters.set !== undefined) {
            xmlContainer.innerHTML = getCockatriceXml(global.urlParameters.set);
        }
    }
}

/**
 *
 *
 */
function getCockatriceXml(setName) {
    var xml = '';
    var cards = getCardsFilteredBySet(CARDS, [setName]);
    for (var i=0; i < cards.length; i++) {
        var card = cards[i];
        xml += createXmlElementString('name', card.name);
    }

    return xml;
}

function createXmlElementString(tagName, content) {
    var xmlElementString = '';
    var openingTag = '<'+tagName+'>;
    var xmlElementContent = content;
    var closingTag = '</'+tagName+'>;

    var xmlElementString += openingTag;
    var xmlElementString += xmlElementContent;
    var xmlElementString += closingTag;

    return xmlElement;
}

