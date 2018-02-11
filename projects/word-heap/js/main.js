/***********************************************************************************************************************
 * Word frequency heap visualizer
 * by hawthornbunny
 *
 **********************************************************************************************************************/
window.onload = initialize;

var global = {
    'lists': {
        'words': {
            'blacklisted': [],
        },
    },
    'canvas': {
        'width': undefined,
        'height': undefined,
        'context': undefined,
    },
    'currentWordBodyIndex': 0,
    'defaultSettings': {
        'minTextSize': 14,
        'maxWordsToDisplay': 300,
        'dropChance': 10,
        'dropOrderAlphabetical': true,
        'dropOrderByFrequency': false,
        'dropOrderChronological': false,
        'dropOrderRandom': false,
        'ignoreCommonWords': true,
        'horizontalDispersion': 0,
        'sortDirectionAscending': true,
        'sortDirectionDescending': false,
    },
    'elements': [],
    'elementIds': [
        'beginButton',
        'minFrequencyThreshold',
        'minTextSize',
        'maxWordsToDisplay',
        'dropChance',
        'dropOrderAlphabetical',
        'dropOrderByFrequency',
        'dropOrderChronological',
        'dropOrderRandom',
        'horizontalDispersion',
        'ignoreCommonWords',
        'sortDirectionAscending',
        'sortDirectionDescending',
        'errorMessage',
        'errorPanel',
        'settingsButton',
        'settingsPanel',
        'text',
    ],
    'engine': undefined,
    'frames': 0,
    'parameters': {
        'dropChance': 0.1,
        'fontFamily': 'serif',
        'fontScaleCoefficient': 128,
        'horizontalDispersionCoefficient': 0,
        'maxWords': 500,
        'minFontSize': 14,
        'minFrequency': 10,
        'minFrequencyCoefficient': 0.01,
        'wallThickness': 64,
    },
    'wordBodies': {},
    'wordsToDrop': [],
};


function initialize() {
    for (var i=0; i < global.elementIds.length; i++) {
        global.elements[global.elementIds[i]] = document.querySelector('#'+global.elementIds[i]);
    }

    // Load a blacklist file so that we can filter out common words.
    loadFile('data/blacklists/common_words.txt')
    .then(
        function(response) {
            global.lists.words.blacklisted = response.split('\n').map(
                function(word) {
                    return word.toLowerCase();
                }
            );
        }
    );

    // Begin the simulation when the user clicks the "Begin" button.
    global.elements.beginButton.onclick = function (e) {
        begin();
    };

    // Show the settings panel if the user clicks the "Settings" button.
    global.elements.settingsButton.onclick = function (e) {
        global.elements.settingsPanel.style.display
            = global.elements.settingsPanel.style.display == 'none' ? 'block' : 'none';
    };
}

function begin() {
    global.parameters.minFrequencyCoefficient = parseInt(global.elements.minFrequencyThreshold.value) / 100;
    global.parameters.maxWords = parseInt(global.elements.maxWordsToDisplay.value);
    global.parameters.minFontSize = parseInt(global.elements.minTextSize.value);
    global.parameters.dropChance = parseInt(global.elements.dropChance.value) / 100;
    global.parameters.horizontalDispersionCoefficient = parseInt(global.elements.horizontalDispersion.value) / 100;

    var dropOrderSettings = {
        'dropOrderAlphabetical': 'alphabetical',
        'dropOrderChronological': 'natural',
        'dropOrderByFrequency': 'byFrequency',
        'dropOrderRandom': 'natural',
    };

    
    var dropOrder = 'alphabetical';
    for (var elementId in dropOrderSettings) {
        if (global.elements[elementId].checked) {
            dropOrder = dropOrderSettings[elementId];
            break;
        }
    }

    var reverseDropOrder = false;
    if (global.elements.sortDirectionDescending.checked) {
        reverseDropOrder = true;
    }

    var randomizeDropOrder = false;
    if (global.elements.dropOrderRandom.checked) {
        randomizeDropOrder = true;
    }

    // Obtain a word frequency analysis of the entered text. This will give us a table of frequencies, and a selection
    // of word lists ordered by different criteria to allow us to control the ordering of the words.
    var text = global.elements.text.value;
    if (text.trim() == '') {
        displayErrorMessage('No text entered.');
        return false;
    }

    var analysis = getFrequencyAnalysis(
        text,
        global.parameters.minFrequency
    );
    //console.log(analysis);

    if (analysis.wordLists.natural.length == 0) {
        displayErrorMessage('Couldn\'t find any words in the text.');
        return false;
    }

    var wordFrequencies = analysis.frequencyTable;
    var wordList = analysis.wordLists[dropOrder];

    // Determine the word with the highest frequency, so that we can filter out low-frequency words.
    // nicely.
    var wordWithHighestFrequency = analysis.wordLists.natural.reduce(
        function(accumulator, value) {
            if (wordFrequencies[accumulator] > wordFrequencies[value]) {
                return accumulator;
            }
            return value;
        }
    );

    var highestWordFrequency = analysis.frequencyTable[wordWithHighestFrequency];

    // Compile a list of words to drop, applying some sensible limits so that it doesn't try to drop a ridiculous
    // amount.
    global.wordsToDrop = wordList;
    global.wordsToDrop = global.wordsToDrop.filter(
        function (word) {
            return wordFrequencies[word] / highestWordFrequency > global.parameters.minFrequencyCoefficient;
        }
    );

    // Filter out blacklisted words if requested.
    if (global.elements.ignoreCommonWords.checked) {
        global.wordsToDrop = global.wordsToDrop.filter(
            function (word) {
                return global.lists.words.blacklisted.indexOf(word.toLowerCase()) === -1;
            }
        );
    }

    // Filter out words that don't contain at least one alphabet letter or numeral.
    global.wordsToDrop = global.wordsToDrop.filter(
        function (word) {
            return /[a-z0-9]/.test(word);
        }
    );

    // If the number of words to drop is greater than the maximum limit, we need to remove some words. However, we need
    // to do this sensibly; we should remove the lowest-frequency words and leave the higher ones (as they're the ones
    // that are more interesting), while retaining the order of the drop list.
    if (global.parameters.maxWords !== undefined && global.wordsToDrop.length > global.parameters.maxWords) {
        // Use the `byFrequency` word list to find the least common words.
        var i = 0;
        while (global.wordsToDrop.length > global.parameters.maxWords) {
            var wordToRemove = analysis.wordLists.byFrequency[i];
            var indexOfWordToRemove = global.wordsToDrop.indexOf(wordToRemove);
            if (indexOfWordToRemove !== -1) {
                global.wordsToDrop.splice(indexOfWordToRemove, 1);
            }
            i++;
        }
    }

    if (global.wordsToDrop.length == 0) {
        displayErrorMessage('Couldn\'t obtain enough frequency data. Try a longer text, or relaxing the frequency constraints.');
        return false;
    }

    if (randomizeDropOrder) {
        global.wordsToDrop = shuffle(global.wordsToDrop);
    }

    if (reverseDropOrder) {
        global.wordsToDrop = global.wordsToDrop.reverse();
    }

    // Wipe all body content.
    while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
    }

    // Create and add a canvas to the DOM, the size of the browser window.
    global.elements.canvas = document.createElement('canvas');
    global.elements.canvas.id = 'canvas';
    global.elements.canvas.width = window.innerWidth - 16;
    global.elements.canvas.height = window.innerHeight - 16;
    document.body.appendChild(global.elements.canvas);

    global.canvas.width = global.elements.canvas.width;
    global.canvas.height = global.elements.canvas.height;
    global.canvas.context = global.elements.canvas.getContext('2d');

    var w = global.canvas.width;
    var h = global.canvas.height;

    // Create the physics simulation engine.
    global.engine = Matter.Engine.create();

    // Determine the word with the highest frequency in the set that's going to be dropped, so that we can scale the
    // whole set appropriately.
    var wordToDropWithHighestFrequency = global.wordsToDrop.reduce(
        function(accumulator, value) {
            if (wordFrequencies[accumulator] > wordFrequencies[value]) {
                return accumulator;
            }
            return value;
        }
    );

    var fontScaleNormalizationCoefficient = 1 / analysis.frequencyTable[wordToDropWithHighestFrequency];

    // Create physical bodies to represent each unique word in the text, sized by its frequency of occurrence.
    for (var i=0; i < global.wordsToDrop.length; i++) {
        var word = global.wordsToDrop[i];
        var frequency = wordFrequencies[word];

        // The font size calculation incorporates several scaling factors:
        // - The word frequency (higher frequency = larger size)
        // - A normalization coefficient (scales so that the highest frequency has a magnitude of 1)
        // - A scale coefficient (for making the font large enough to be visible)
        // - A canvas width-dependent scaling factor (so that the font looks the same size regardless of resolution)
        var fontSize =
            frequency
            * fontScaleNormalizationCoefficient
            * global.parameters.fontScaleCoefficient
            * (global.canvas.width / 1600);
        // Clamp the font size to a reasonable minimum, so that words don't get too tiny to see.
        fontSize = Math.max(global.parameters.minFontSize, fontSize);

        var wordBody = createTextBody(word, fontSize, global.canvas.context);
        global.wordBodies[word] = wordBody;
    }

    // Create physical bodies to represent each word in the text.
    //for (var i=0; i < words.length; i++) {
        //var word = words[i];

        //global.bodies.words.push(createTextBody(word, 16, global.canvas.context));
    //}

    // Define some static walls to contain the scene.
    // Walls seem to need a good thickness in matter.js; too thin and objects seem to pass through them.
    var wallThickness = global.parameters.wallThickness;

    // Our four walls will contain an area twice the height of the visible canvas (such that we'll be looking into the
    // bottom half of a tall box). This is so that we can drop things in from above the screen.
    var walls = [
        // North wall
        Matter.Bodies.rectangle(w / 2, 0 - h, w, wallThickness, { 'isStatic': true, 'label': 'wall'}),
        // East wall
        Matter.Bodies.rectangle(w, 0, wallThickness, h * 2, { 'isStatic': true, 'label': 'wall' }),
        // South wall
        Matter.Bodies.rectangle(w / 2, h, w, wallThickness, { 'isStatic': true, 'label': 'wall' }),
        // Bottom wall
        Matter.Bodies.rectangle(0, 0, wallThickness, h * 2, { 'isStatic': true, 'label': 'wall' }),
    ];

    // Add the walls to the world.
    Matter.World.add(global.engine.world, walls);

    // run the engine
    Matter.Engine.run(global.engine);

    //console.log(global.wordsToDrop);
    //console.log(global.wordBodies);
    render();
}

/**
 * Return an object containing a frequency analysis on the given text.
 *
 * @param string text
 * @param int minFrequency
 * @param string sortOrder
 * @return object
 */
function getFrequencyAnalysis(text, minFrequency, sortOrder) {
    var analysis = {
        'frequencyTable': {},
        'wordLists': {
            'alphabetical': undefined,
            'byFrequency': undefined,
            'natural': undefined,
        },
    };

    // Cultivate the text a bit by replacing fancy punctuation.
    text = text.replace(/’/g, "'");

    // Analyze the entered text and derive a frequency table of word occurrences.
    var words = text.split(/(\s|[^a-z0-9-'])+/i)
    var filteredWords = [];
    for (var i=0; i < words.length; i++) {
        if (i % 2 === 0) {
            var word = words[i].trim();
            if (word != '') {
                filteredWords.push(words[i]);
            }
        }
    }
    words = filteredWords;

    for (var i=0; i < words.length; i++) {
        var word = words[i];
        if (analysis.frequencyTable[word] === undefined) {
            analysis.frequencyTable[word] = 0;
        }

        analysis.frequencyTable[word]++;
    }

    // Construct lists of words in the text sorted in various different orderings.

    // `natural`: taken in key order (ie. the order the words appeared in the text)
    analysis.wordLists.natural = Object.keys(analysis.frequencyTable);

    // `alphabetical`
    analysis.wordLists.alphabetical = analysis.wordLists.natural.slice(0).sort(
        function (wordA, wordB) {
            return wordA.toLowerCase().localeCompare(wordB.toLowerCase());
        }
    );
        
    // `byFrequency`: in ascending order of frequency of occurrence
    analysis.wordLists.byFrequency = analysis.wordLists.natural.slice(0).sort(
        function (wordA, wordB) {
            return analysis.frequencyTable[wordA] - analysis.frequencyTable[wordB];
        }
    );
        
    return analysis;
}

/**
 * Create a physics object to represent a given text string at a given font size.
 *
 * In the simulation, the actual physical body of a text string (ie. a word) is modelled as a simple rectangle. The
 * rectangle is carefully sized so that it is more or less the same size as the text that will be overlaid on top of it.
 *
 * @param string text
 * @param int fontSize The font size, in px.
 * @param CanvasRenderingContext2D context The rendering context.
 * @return Body
 */
function createTextBody(text, fontSize, context) {
    // Calculate the width the text would have if rendered at the given font size in the given context.
    context.font = fontSize + 'px ' + global.parameters.fontFamily;
    var textWidth = context.measureText(text).width;

    // Estimate the dimensions of a rectangle that should be able to encompass the text. We have to guess a bit here and
    // assume that the rectangles's height is more or less equal to the font size (in pixels).
    var rectDimensions = {
        'w': textWidth,
        'h': fontSize,
    };

    // Create the rectangular body. We'll keep it at (0, 0) for now.
    var rect = Matter.Bodies.rectangle(0, 0, rectDimensions.w, rectDimensions.h);

    // Add some custom properties to the rectangular body to use when rendering it later.
    rect.custom = {
        'text': text,
        'fontSize': fontSize,
        'color': md5ToHsl(md5(text)),
    }

    return rect;
}

/**
 * The rendering loop. Once started, this will draw the simulation frame-by-frame.
 *
 * This method also contains the logic for dropping in new words, one at a time.
 */
function render() {
    
    // At random intervals, spawn a word body from the body list into the world.

    if (rnd(0, 1 / global.parameters.dropChance) === 0 && global.wordsToDrop.length > 0) {
        // Shift the next word off the list of words to drop, and determine the corresponding body.
        var wordToDrop = global.wordsToDrop.shift();
        var wordBody = global.wordBodies[wordToDrop];

        var dropPosition = {
            'x': global.canvas.width / 2,
            'y': 0 - global.canvas.height / 2,
        }

        // If there's any horizontal dispersion, randomly shift the x-position accordingly.
        if (global.parameters.horizontalDispersionCoefficient) {
            dropPosition.x += (rnd(0, global.canvas.width) - (global.canvas.width / 2))
                * global.parameters.horizontalDispersionCoefficient;
        }

        // Introduce an additional _tiny_ bias to the x-position. This prevents the words from piling up in one big
        // vertical stack when the horizonal dispersion is zero, which looks weird.
        var xBias = ((global.wordsToDrop.length % 3) - 1) * 0.000001;
        dropPosition.x += xBias;

        // Spawn the word body above the screen.
        Matter.Body.setPosition(wordBody, dropPosition);

        Matter.World.add(global.engine.world, [wordBody]);
    }

    renderWordBodies();
    window.requestAnimationFrame(render);
    global.frames++;
}

function renderWordBodies() {
    var context = global.canvas.context;
    var bodies = Matter.Composite.allBodies(global.engine.world);
    var w = global.canvas.width;
    var h = global.canvas.height;

    // Clear the canvas before drawing each frame.
    context.fillStyle = 'hsla(0, 100%, 100%, 1)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.textBaseLine = 'top';
    context.textAlign = 'center';

    for (var i = 0; i < bodies.length; i++) {
        var body = bodies[i];
        if (body.label === 'wall') {
            continue;
        }
        var fontSize = body.custom.fontSize;
        var text = body.custom.text;
        var textYOffset = fontSize / 4;

/*
        context.fillStyle = 'hsla(0, 100%, 100%, 1)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.lineWidth = 4;
        context.strokeStyle = 'hsla(60, 0%, 0%, 1)';

        var vertices = bodies[i].vertices;

        context.beginPath();
        context.moveTo(vertices[0].x, vertices[0].y);

        for (var j = 1; j < vertices.length; j++) {
            context.lineTo(vertices[j].x, vertices[j].y);
        }

        context.lineTo(vertices[0].x, vertices[0].y);

        context.fill();
        context.stroke();
*/
        context.font = fontSize + 'px ' + global.parameters.fontFamily;
        context.translate(bodies[i].position.x, bodies[i].position.y);
        context.rotate(bodies[i].angle);
        context.fillStyle = 'hsla('
            + body.custom.color.h + ', '
            + body.custom.color.s + '%, '
            + (body.custom.color.l * 0.75) +
        '%, 1)';
        context.fillText(text, 0, textYOffset);
        context.setTransform(1, 0, 0, 1, 0, 0);
    }


}

function rnd(min, max) {
    return min + Math.floor(Math.random() * (max - min));
}

/**
 * Randomize the ordering of an array.
 *
 * @param array array
 * @return array The shuffled array
 */
function shuffle(array) {
    var shuffledArray = [];
    for (var i=0; i < array.length; i++) {
        var element = array[i];
        var insertIndex = rnd(0, shuffledArray.length+1);
        shuffledArray.splice(insertIndex, 0, element);
    }
    return shuffledArray;
}

function md5ToHsl(hash) {
    var hslHex = {
        'h': '0x'+hash.substr(0, 2),
        's': '0x'+hash.substr(2, 2),
        'l': '0x'+hash.substr(4, 2),
    };

    var hslDec = {
        'h': parseInt(hslHex.h, 16),
        's': parseInt(hslHex.s, 16),
        'l': parseInt(hslHex.l, 16),
    };

    var hsl = {
        'h': 360 * (hslDec.h / 255),
        's': 100 * (hslDec.s / 255),
        'l': 100 * (hslDec.l / 255),
    };

    return hsl;
}

/**
 * Given an object `object` containing key-value pairs, return a new object containing only those key-value pairs for
 * values for which `filterFunction` returns true.
 *
 * @param object object
 * @param function filterFunction
 * @return object
 */
function filterObjectByValue(object, filterFunction) {
    var filteredObject = {};
    for (var key in object) {
        var value = object[key];
        if (filterFunction(value)) {
            filteredObject[key] = value;
        }
    }
    return filteredObject;
}

function loadFile(url) {
    return new Promise(
        function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);

            xhr.onload = function() {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.statusText);
                }
            }
            
            xhr.onerror = function() {
                reject(Error('Could not load URL "'+ url + '"'));
            }
            
            xhr.send();
        }
    );
}

function resetSettingsToDefaults(ifUnset) {
    for (var elementId in global.defaultSettings) {
        var element = global.elements[elementId];
        var defaultSetting = global.defaultSettings[elementId];

        if (element.type == 'text') {
            if (element.value == '' && ifUnset) {
                continue;
            }
            element.value = defaultSetting;
        } else if (element.type == 'radio') {
            element.checked = defaultSetting;
        }
    }
}

function displayErrorMessage(errorMessage) {
    global.elements.errorMessage.innerHTML = errorMessage;
    global.elements.errorPanel.style.display = 'block';
}
