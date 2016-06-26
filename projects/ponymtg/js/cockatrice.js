window.onload = initialize;

/**
 * Application setup.
 */
function initialize() {
    CARDS = CARDS.concat(FICG_CARDS);
    CARDS = CARDS.concat(IPU_CARDS);

    var cockatricePageTitleElement = document.querySelector('#cockatricePageTitle');
    var xmlTextareaElement = document.querySelector('#xmlTextarea');
    var copyToClipboardButton = document.querySelector('#copyToClipboard');
    var cockatriceGuideExpandLinkElement = document.querySelector('#cockatriceGuideExpandLink');
    var cockatriceGuideElement = document.querySelector('#cockatriceGuide');
    var setName = undefined;

    cockatriceGuideExpandLinkElement.onclick = function() {
        cockatriceGuideElement.style.display = 'block';
    }

    global.urlParameters = getUrlParameters();
    if (Object.keys(global.urlParameters).length > 0) {
        if (global.urlParameters.set !== undefined) {
            if (global.sets[global.urlParameters.set] !== undefined) {
                setName = global.urlParameters.set; 
            }
        }
    }

    if (setName !== undefined) {
        cockatricePageTitleElement.innerHTML = 'Cockatrice data for <i>'+setName+'</i>';
        var cockatriceXml = getCockatriceXml(global.urlParameters.set);
        var cockatriceXmlHtml = escapeXml(cockatriceXml)
        xmlTextareaElement.innerHTML = cockatriceXmlHtml;
        xmlTextareaElement.disabled = '';
        copyToClipboardButton.disabled = '';

        copyToClipboardButton.onclick = function(event) {
            xmlTextareaElement.select();

            var copySuccess = document.execCommand('copy');
            if (copySuccess) {
                copyToClipboardButton.value = "Copied!";
            }
        }
    }
    else {
        var body = document.querySelector('body');
        emptyElement(body);
        var errorMessageElement = document.createElement('p');
        errorMessageElement.innerHTML = 'ERROR: Couldn\'t find a set for which to generate Cockatrice data. The URL might be incorrect.';
        body.appendChild(errorMessageElement);
    }
}

/**
 *
 *
 */
function getCockatriceXml(setName) {
    var xml = '';
    var cards = getCardsFilteredBySet(CARDS, [setName]);
    var setCode = generateSetCode(setName);

    // Add the Cockatrice XML set information header.
    xml += '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<cockatrice_carddatabase version="3">\n';
    xml += '    <sets>\n';
    xml += '        <set>\n';
    xml += '            <name>'+setCode+'</name>\n';
    xml += '            <longname>'+setName+'</longname>\n';
    xml += '        </set>\n';
    xml += '    </sets>\n';
    xml += '    <cards>\n';

    // Add card data for each card in the set.
    for (var i=0; i < cards.length; i++) {
        var card = cards[i];

        var picURL = undefined;
        if (card.image !== undefined) {
            var baseUrl = window.location.origin;
            baseUrl += window.location.pathname.split('/').slice(0, -1).join('/');
            var picURL = baseUrl+'/'+global.paths.sets+'/'+global.mappings.setsToPaths[card.set]+'/'+card.image;
        }
        var name = card.name;

        var manacost = '';
        if (card.cost !== undefined) {
            manacost = card.cost;
            if (card.cost2 !== undefined) {
                manacost += ' // '+card.cost2;
            }
        }
        
        var type = '';
        if (card.supertype !== undefined) {
            type = card.supertype;
            if (card.subtype !== undefined) {
                type += ' - '+card.subtype;
            }
        }
        if (card.supertype2 !== undefined) {
            type += ' // '+card.supertype2;
            if (card.subtype2 !== undefined) {
                type += ' - '+card.subtype2;
            }
        }
            
        var pt = undefined;
        if (card.pt !== undefined) {
            pt = card.pt;
        }
        
        var loyalty = undefined;
        if (card.loyalty !== undefined) {
            loyalty = card.loyalty;
        }
        
        // Cockatrice has a special `tablerow` parameter which it uses internally to decide where cards should be placed
        // on the board. This generally depends on the card's type.
        var tablerow = 1;
        if (/Land/i.test(type)) {
           tablerow = 0; 
        }
        else if (/Creature/i.test(type)) {
           tablerow = 2; 
        }
        else if (
            /Instant/i.test(type)
            || /Sorcery/i.test(type)
        ) {
           tablerow = 3; 
        }

        var text = '';
        if (card.text !== undefined) {
            text = card.text;
        }

        // Get a list of colors present in this card.
        var colors = [];
        var manaTypes = getCardManaTypes(card);
        var cmc = getCardConvertedManaCost(card);
        for (var j=0; j < manaTypes.length; j++) {
            if (global.mappings.manaTypesToRepresentativeSymbols[manaTypes[j]] !== undefined) {
                var color = global.mappings.manaTypesToRepresentativeSymbols[manaTypes[j]];
                if (['W','U','B','R','G'].indexOf(color) === -1) {
                    // If it's not a WUBRG color, ignore it.
                    continue;
                }
                colors.push(color);
            }
        }

        // If the card transforms to or from something, add that to the `<related>` tag.
        var related = undefined;
        if (card.transformsInto !== undefined) {
            related = card.transformsInto;
        }
        if (card.transformsFrom !== undefined) {
            related = card.transformsFrom;
        }
        
        // Assemble the XML for this `<card>` element.
        xml += '        <card>\n'
        for (var j=0; j < colors.length; j++) {
            xml += '            '+createXmlElementString('color', colors[j]);
        }
        if (related !== undefined) {
            xml += '            '+createXmlElementString('related', related);
        }
        xml += '            '+createXmlElementString('name', name);
        if (picURL !== undefined) {
            xml += '            '+createXmlElementString('set', setCode, {'picURL': picURL});
        }
        else {
            xml += '            '+createXmlElementString('set', setCode);
        }
        xml += '            '+createXmlElementString('manacost', manacost);
        xml += '            '+createXmlElementString('cmc', cmc);
        xml += '            '+createXmlElementString('type', type);
        xml += '            '+createXmlElementString('text', text);
        if (pt !== undefined) {
            xml += '            '+createXmlElementString('pt', pt);
        }
        if (loyalty !== undefined) {
            xml += '            '+createXmlElementString('loyalty', loyalty);
        }
        xml += '            '+createXmlElementString('tablerow', tablerow);
        xml += '        </card>\n'
    }

    xml += '    </cards>\n';
    xml += '</cockatrice_carddatabase>\n';

    return xml;
}

function createXmlElementString(tagName, content, tagAttributes) {
    var xmlElementString = '';

    var openingTag = '<'+tagName;

    if (tagAttributes !== undefined) {
        var tagAttributeNames = Object.keys(tagAttributes);
        for (var i=0; i < tagAttributeNames.length; i++) {
            var tagAttributeName = tagAttributeNames[i]; 
            var tagAttributeValue = tagAttributes[tagAttributeName]; 
            openingTag += ' '+tagAttributeName+'="'+tagAttributeValue+'"';
        }
    }
    openingTag += '>';

    var xmlElementContent = content;
    var closingTag = '</'+tagName+'>';

    xmlElementString += openingTag;
    xmlElementString += xmlElementContent;
    xmlElementString += closingTag;
    xmlElementString += '\n';

    return xmlElementString;
}

function escapeXml(string) {
    var escapedString = string;
    var xmlEntityMappings = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&apos;',
    }

    var charactersToBeEscaped = Object.keys(xmlEntityMappings);

    for (var i=0; i < charactersToBeEscaped.length; i++) {
        var characterToBeEscaped = charactersToBeEscaped[i];
        var entityToReplaceWith = xmlEntityMappings[characterToBeEscaped];
        var xmlEntityEscapeRegex = new RegExp(characterToBeEscaped, 'g');
        escapedString = escapedString.replace(xmlEntityEscapeRegex, entityToReplaceWith);
    }

    return escapedString;
}
