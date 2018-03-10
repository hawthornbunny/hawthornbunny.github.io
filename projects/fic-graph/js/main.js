/***********************************************************************************************************************
 * Force-directed graph
 * by hawthornbunny
 **********************************************************************************************************************/
window.onload = initialize;

var global = {
    'elements': [],
    'elementIds': [
        'beginButton',
        'errorMessage',
        'errorPanel',
        'main',
        'settingsButton',
        'settingsPanel',
        'text',
    ],
    'graph': undefined,
    'parameters': {
        // Increases the strength of the spring bond if the connection is stronger.
        'connectionStrengthExponent': 2,
        'fontSizeCoefficient': 0.4,
        'minFontSize': 12,
        'minNodeRadius': 4,
        'minHoverCircleRadius': 10,
        // Determines the attenuation of the repulsion force with distance.
        'nodeRepulsionExponent': 1,
        // Determines the strength of the repulsion force.
        'nodeRepulsionCoefficient': 200,
        'restLengthExponent': 2,
        'restLengthCoefficient': 4000,
        // This dampens the spring force. Needs to be very small, or the graph just goes insane.
        'springForceCoefficient': 0.0001,
        'svgDimensions': {
            'width': 4000,
            'height': 4000,
        },
    },
    'presets': {
        'gp300': {
            'text': 'data/presets/gp300-text.txt',
            'characters': 'data/presets/gp300-chars.json',
        },
    },
    'svg': undefined,
};


function initialize() {
    // The body is hidden by default in the template, so that we can skip the UI here if needed.
    var urlParameters = Util.getUrlParameters();
    var text = undefined;
    if (urlParameters !== null) {
        if (urlParameters['preset'] != undefined) {
            var preset = urlParameters['preset'];
            var textFilePath = global.presets[preset].text;
            var charsFilePath = global.presets[preset].characters;

            Util.loadFile(textFilePath)
            .then(
                function(response) {
                    text = response;
                    return Util.loadFile(charsFilePath);
                }
            )
            .then(
                function(response) {
                    var characters = JSON.parse(response);
                    document.body.style.display = 'block';
                    begin(text, characters);
                }
            );
        }
    } else {
        document.body.style.display = 'block';
        for (var i = 0; i < global.elementIds.length; i++) {
            global.elements[global.elementIds[i]] = document.querySelector('#'+global.elementIds[i]);
        }

        // Begin the simulation when the user clicks the "Begin" button.
        global.elements.beginButton.onclick = function (e) {
            Util.loadFile('data/presets/gp300-chars.json')
            .then(
                function(response) {
                    var text = global.elements.text.value;
                    begin(text, JSON.parse(response));
                }
            );
        };

        // Show the settings panel if the user clicks the "Settings" button.
        global.elements.settingsButton.onclick = function (e) {
            global.elements.settingsPanel.style.display
                = global.elements.settingsPanel.style.display == 'none' ? 'block' : 'none';
        };
    }
}

/**
 * Examine a piece of text (ie. a Fimfiction story) and return an analysis of chapters, characters, and mentions.
 *
 * @param string text
 * @param object characterNames
 * @return object
 */
function analyze(text, characterNames) {
    var analysis = {
        'chapters': [],
        'characters': Object.keys(characterNames),
    };

    // Split the text into lines.
    var lines = text.split(/\n/g);

    // Discard the first 4 lines (these are the fic title and author)
    lines = lines.slice(4);

    // Scan through line-by-line looking for any lines containing only a `>` character, followed by a space, followed
    // by one or more consecutive `-` characters.
    //
    // Example:
    //     > --------------------------------------------------------------------------
    //
    // These always appear immediately below a chapter title, and therefore provide a way to delimit by chapter.
    var chapterTitleLineIndices = [];
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (/^> -+/.test(line)) {
            chapterTitleLineIndices.push(i - 1);
        }
    }

    // Group the text lines by chapters.
    var chapterLines = [];

    for (var i = 0; i < chapterTitleLineIndices.length; i++) {
        var chapterTitleLineIndex = chapterTitleLineIndices[i];
        var nextChapterTitleLineIndex = chapterTitleLineIndices[i+1];
        var linesInChapter = lines.slice(chapterTitleLineIndex, nextChapterTitleLineIndex);
        chapterLines.push(linesInChapter);
    }
    
    // From the lines obtained for each chapter, extract the title, the author(s), and the actual text content of the
    // chapter.
    var chapters = [];

    for (var i = 0; i < chapterLines.length; i++) {
        var linesInChapter = chapterLines[i];

        var chapterData = {
            'title': '',
            'authors': '',
            'text': '',
            'mentions': {},
        };

        // Parse the chapter title line. This has the form:
        //     CHAPTER_NAME, by AUTHORS
        // where CHAPTER_NAME can be any string, and AUTHORS can be a list of names seperated by commas (and the word
        // "and").

        // Begin by splitting the line on the string ", by ". This pretty consistently breaks chapter titles into a
        // title half and an authors half.
        var chapterTitleAndAuthorsLine = linesInChapter[0];
        var chapterTitleAndAuthors = chapterTitleAndAuthorsLine.split(', by ');

        // For now we'll ignore the authors and just record the title.
        chapterData.title = chapterTitleAndAuthors[0];

        // Extract the chapter's text content. This should be everything after the 3rd line.
        chapterData.text = linesInChapter.slice(3).join('\n');

        chapters.push(chapterData);
    }

    // Go through chapter-by-chapter and record occurrences of each character name.
    for (var i = 0; i < chapters.length; i++) {
        var chapterData = chapters[i];
        var chapterText = chapterData.text;

        var characterMentions = {};

        // We start with a "naive" pass over the text. This doesn't modify anything, but just naively checks for
        // occurrences of character names in the text and records which names are found.
        //
        // The purpose of the naive pass is to obtain a list of character names that appear in the text. We'll then
        // perform a further refinement pass once we have that list.
        var naiveMentions = [];
        for (var j = 0; j < analysis.characters.length; j++) {
            var character = analysis.characters[j];
            // Characters can have multiple variants of their name, so we'll check for all of them.
            var nameVariants = characterNames[character];

            for (var k = 0; k < nameVariants.length; k++) {
                var nameVariant = nameVariants[k];
                var regexp = new RegExp('\\b' + nameVariant + '\\b', 'g');
                if (regexp.test(chapterText)) {
                    naiveMentions.push(
                        {
                            'nameVariant': nameVariant,
                            'character': character,
                        }
                    );
                }
            }
        }

        // Sort the naive mentions so that characters with longer names are first. This will allow us to search in more
        // of a logical order; for example, we should search for "Twilight Velvet" before we search for "Twilight".
        naiveMentions.sort(
            function(naiveMentionA, naiveMentionB) {
                return naiveMentionA.nameVariant.length - naiveMentionB.nameVariant.length;
            }
        ).reverse();

        // Go through the naive mentions (which are now sorted longest-first), and this time, remove the found mentions
        // from the text so that they can't be found more than once. This solves the problem of counting "Twilight
        // Velvet" as a mention of both "Twilight" and "Twilight Velvet".
        for (var j = 0; j < naiveMentions.length; j++) {
            var naiveMention = naiveMentions[j];
            var nameVariant = naiveMention.nameVariant;
            var character = naiveMention.character;

            var regexp = new RegExp('\\b' + nameVariant + '\\b', 'g');

            var result = regexp.exec(chapterText);
            if (result !== null) {
                var matchedString = result[0];
                var matchIndex = result.index;
                chapterText = chapterText.slice(0, matchIndex) + chapterText.slice(matchIndex + matchedString.length);
                if (characterMentions[character] === undefined) {
                    characterMentions[character] = 0;
                }
                characterMentions[character]++;
            }

            
        }
        chapterData.mentions = characterMentions;
    }

    // Count the total number of chapters each character appears in. We can use this information later to filter out
    // characters who don't appear often enough to be significant.
    var chapterAppearances = {};
    for (var character in characterNames) {
        chapterAppearances[character] = 0;
        for (var i = 0; i < chapters.length; i++) {
            var chapterData = chapters[i];
            if (chapterData.mentions[character] !== undefined) {
                chapterAppearances[character]++;
            }
        }
    }

    analysis.chapterAppearances = chapterAppearances;
    analysis.chapters = chapters;

    return analysis;
}

function begin(text, characters) {
    var analysis = analyze(text, characters);
    //analysis.chapters = analysis.chapters.slice(0, 50);
    console.log(analysis);
    // Wipe out all elements from the body.
    Util.emptyElement(document.body);

    global.graph = new Graph();

    // Place all nodes and connections.
    var nodes = {};
    for (var i = 0; i < analysis.chapters.length; i++) {
        var chapterData = analysis.chapters[i];
        var characterMentions = chapterData.mentions;

        // For all characters in this chapter, add a node for them. If they already have a node, increase the node's
        // radius instead.
        for (var character in characterMentions) {
            // Don't create nodes for characters that only appeared in one chapter.
            //if (analysis.chapterAppearances[character] <= 1) {
                //continue;
            //}

            if (nodes[character] === undefined) {
                var node = new Node(new Vector(0, 0));
                node.label = character;
                nodes[character] = node;
            } else {
                nodes[character].radius++;
            }
        }

        // For all nodes representing characters in this chapter, form connections between each. If nodes are already
        // connected from a previous chapter, strengthen the connection instead.
        var alreadyFullyConnectedCharacterIndices = [];
        for (var characterA in characterMentions) {
            var nodeA = nodes[characterA];
            if (nodeA === undefined) {
                continue;
            }
            for (var characterB in characterMentions) {
                // Don't connect a character to itself.
                if (characterA === characterB) {
                    continue;
                }
                // If characterB has already had all its connections made in a previous iteration, skip it
                // (otherwise, the connection will be doubled and we don't want that).
                if (alreadyFullyConnectedCharacterIndices.indexOf(characterB) !== -1) {
                    continue;
                }

                var nodeB = nodes[characterB];
                if (nodeB === undefined) {
                    continue;
                }

                var connection = undefined;
                if (nodeA.isConnectedTo(nodeB)) {
                    connection = nodeA.getConnectionTo(nodeB);
                    connection.strength++;
                    var restLength
                        = global.parameters.restLengthCoefficient
                        / Math.pow(connection.strength, global.parameters.restLengthExponent);
                    connection.restLength = Math.max((nodeA.radius + nodeB.radius) * 1, restLength);
                } else {
                    connection = new Connection(nodeA, nodeB, 256, 1);
                }
            }
            alreadyFullyConnectedCharacterIndices.push(characterA);
        }
    }

    var nodesArray = [];
    for (var character in nodes) {
        nodesArray.push(nodes[character]);
    }
    console.log(nodesArray);

	document.querySelector('html').style.height = '100%';
	var body = document.querySelector('body');
	body.style.height = '100%';

    var svgContainer = document.createElement('div');
	svgContainer.style.width = '100%';
	svgContainer.style.height = '100%';
	svgContainer.style.overflow = 'scroll';
	svgContainer.id = 'svgContainer';

    var ns = 'http://www.w3.org/2000/svg';
	global.svg = document.createElementNS(ns, 'svg');

    var svgWidth = global.parameters.svgDimensions.width;
    var svgHeight = global.parameters.svgDimensions.width;
    var viewBoxLeft = 0 - (svgWidth / 2);
    var viewBoxTop = 0 - (svgHeight / 2);
	global.svg.setAttributeNS(null, 'id', 'graph');
	global.svg.setAttributeNS(null, 'width', svgWidth);
	global.svg.setAttributeNS(null, 'height', svgHeight);
	global.svg.setAttributeNS(null, 'viewBox', viewBoxLeft + ' ' + viewBoxTop + ' ' + svgWidth + ' ' + svgHeight);
	
	svgContainer.appendChild(global.svg);
	body.appendChild(svgContainer);

    svgContainer.scrollLeft = (svgContainer.scrollWidth / 2) - (svgContainer.clientWidth / 2);
    svgContainer.scrollTop = (svgContainer.scrollHeight / 2) - (svgContainer.clientHeight / 2);
	
    // Iterate the force algorithm repeatedly.
    applyForceDirection(nodesArray);
}

/**
 * Apply all of the force-direction algorithms to the given set of nodes. By iterating this function, the graph should
 * eventually reach an equilibrium state where all nodes are nicely laid out.
 *
 * @param Node[] nodes;
 */
function applyForceDirection(nodes) {
    renderGraphSvg(nodes, global.svg);

    // Make all nodes repel each other.
    applyNodeRepulsionForces(nodes);

    // Make connected nodes attract/repel each other with a spring-like tension force.
    applyConnectionSpringForces(nodes);

    // Make all nodes attract toward the origin (to prevent disconnected nodes escaping).
    applyCentralAttractionForce(nodes);

    // Move all nodes such that their mean position is at the origin.
    shiftNodesToCenter(nodes);

    setTimeout(function() { applyForceDirection(nodes); }, 100);
}

/**
 * For a given set of nodes, apply instantaneous repulsion forces between all of them.
 *
 * @param Node[] nodes
 */
function applyNodeRepulsionForces(nodes) {
    // Apply a repulsion force between all nodes.
    // We do this by considering every node a force "emitter", calculating the force that it would exert on every other
    // node, and applying that force.
    for (var j = 0; j < nodes.length; j++) {

        /** @var Node emitter
         *
         * A node that is emitting a repulsion force.
         */
        var emitter = nodes[j];

        for (var i = 0; i < nodes.length; i++) {
            /**
             * @var Node receiver
             *
             * A node that is receiving a repulsion force (ie. being pushed).
             */
            var receiver = nodes[i];

            // Nodes cannot push themselves with their own repulsion force.
            if (receiver === emitter) {
                continue;
            }

            /**
             * @var Vector distanceVector
             *
             * The distance over which the repulsion force will act; ie. the distance between emitter and receiver.
             */
            var distanceVector = receiver.position.subtract(emitter.position);

            // If the distance is exactly zero (ie. the two nodes are on top of each other), cheat a bit by displacing
            // one of them a tiny distance. This prevents problems with infinite force at zero distance.
            if (distanceVector.x === 0 && distanceVector.y === 0) {
                distanceVector = new Vector(Util.randomFloat(0.5, 1), Util.randomFloat(0.5, 1));
            }

            /**
             * @var float distance
             *
             * The magnitude of the distance, precalculated.
             */
            var distance = distanceVector.magnitude();

            /**
             * @var Vector normalizedDistanceVector
             */
            var normalizedDistanceVector = distanceVector.normalize();

            /**
             * @var Vector force
             *
             * The repulsion force exerted by the emitter on the reciever.
             *
             * This force drops off linearly with distance, except for cases where the distance is so small that the
             * nodes might be overlapping; in that case, the force is just enough to push the node outside of the
             * emitter's radius.
             */
            var force;
            force = normalizedDistanceVector.multiply(
                global.parameters.nodeRepulsionCoefficient / Math.pow(distance, global.parameters.nodeRepulsionExponent)
            );

            receiver.applyForce(force);
        }
    }
}

/**
 * For a given set of nodes, apply instantaneous linear spring forces on all connected pairs of nodes, such that their
 * connections are forced toward a natural resting length.
 *
 * @param Node[] nodes
 */
function applyConnectionSpringForces(nodes) {
    for (var j = 0; j < nodes.length; j++) {
        var node = nodes[j];
    
        // For each connection that the node shares with another node, apply a linear spring force to the connection to
        // push/pull it toward its resting length.
        for (var i = 0; i < node.connections.length; i++) {
            var connection = node.connections[i];

            var connectionVector = connection.getAsVector();

            // The resting length is typically defined to be the length between the centers of two nodes, which is fine
            // if the nodes are small and far apart; however, if nodes are large and/or close together, it is possible
            // for the nodes to be larger than the connection between them, which looks odd. Therefore, we adjust the
            // resting length so that it is always longer than the combined radii of the connected nodes.
            var adjustedRestingLength = connection.restLength + connection.nodeA.radius + connection.nodeB.radius;

            // Calculate how much the connection has been stretched/squashed from its resting length.
            var displacement = connectionVector.magnitude() - adjustedRestingLength;

            // On each node at the two ends of the connection, apply a force proportional to the displacement, such that
            // the spring attempts to return to its rest length.
            var normalizedConnectionVector = connectionVector.normalize();
            var forceAB = normalizedConnectionVector.multiply(
                displacement
                * Math.pow(connection.strength, global.parameters.connectionStrengthExponent)
                * global.parameters.springForceCoefficient
            );
            connection.nodeA.applyForce(forceAB);
            connection.nodeB.applyForce(forceAB.negate());
        }
    }
}

/**
 * For the given set of nodes, apply an instantaneous attraction force such that nodes are attracted toward the origin.
 * This prevents unconnected nodes from drifting away due to the repulsion force.
 *
 * @param Node[] nodes
 */
function applyCentralAttractionForce(nodes) {
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];

        var displacementFromOrigin = node.position.subtract(new Vector(0, 0));

        if (displacementFromOrigin.x === 0 && displacementFromOrigin.y === 0) {
            displacementFromOrigin = new Vector(Util.randomFloat(0.005, 0.01), Util.randomFloat(0.005, 0.01));
        }

        var force = displacementFromOrigin.normalize().multiply(displacementFromOrigin.magnitude() / 100);

        node.applyForce(force.negate());
    }
}

/**
 * Calculate the mean position of the given nodes, and directly move them to the origin. This isn't an applied force;
 * it's a direct translation of all node positions. This ensures that the graph remains centered.
 *
 * @param Node[] nodes
 */
function shiftNodesToCenter(nodes) {
    // Calculate the mean position of all nodes.
    var totalPosition = {
        'x': 0,
        'y': 0,
    };

    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        totalPosition.x += node.position.x;
        totalPosition.y += node.position.y;
    }

    var meanPosition = {
        'x': totalPosition.x / nodes.length,
        'y': totalPosition.y / nodes.length,
    };

    // Shift all nodes so that the mean position is at the origin.
    var translateVector = (new Vector(meanPosition.x, meanPosition.y)).negate();

    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        node.position = node.position.add(translateVector);
    }
}


/**
 * Render all nodes and connections to an SVG. This function adds all the drawn elements (circles, lines, text labels)
 * to the SVG if they don't exist; otherwise, it moves the existing drawn elements to their new positions.
 *
 * @param Node[] nodes
 * @param SVGElement svg
 */
function renderGraphSvg(nodes, svg) {
    var ns = 'http://www.w3.org/2000/svg';

    // All of the elements inside the SVG are contained within a single group, for ease of manipulation.
    var group = document.getElementById('group');
    if (group === null) {
        var group = document.createElementNS(ns, 'g');
        group.id = 'group';
        global.svg.appendChild(group);
    }

    // Determine the largest node, so that we can normalize hue assignments.
    var largestNode = nodes.reduce(
        function(accumulator, node) {
            return accumulator.radius > node.radius ? accumulator : node;
        }
    );

    // Determine the highest connection strength between any two nodes, so that we can normalize the drawn
    // representation of the connections.
    var highestConnectionStrength = 0;
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];

        for (var j = 0; j < node.connections.length; j++) {
            var connection = node.connections[j];
            if (connection.strength > highestConnectionStrength) {
                highestConnectionStrength = connection.strength;
            }
        }
    }

    // Create a collection of node information, keyed by label. This makes it easier for other drawn elements to refer
    // to nodes if they know what label they're looking for.
    var nodeData = {};
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var nodeDatum = {};
        nodeDatum.node = node;
        nodeDatum.hsl = {
            'h': (node.radius / largestNode.radius) * 300,
            's': 50,
            'l': 50,
            'hovered': false,
            'activated': false,
        };

        nodeData[node.label] = nodeDatum;
    }

    // Before drawing the connections, iterate through all nodes to find out which one (if any) has been hovered over.
    // (This is determined by a custom `hovered` property on the node, which is set elsewhere by a mouse event). Add
    // this information to the `nodeData` collection so that it can be used to make drawing decisions.
    var anyNodesActivated = false;
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var nodeDatum = nodeData[node.label];
        var nodeCircle = document.getElementById('node--' + node.label);
        if (nodeCircle !== null) {
            if (nodeCircle.custom.hovered) {
                nodeDatum.hovered = nodeCircle.custom.hovered;
            }
            if (nodeCircle.custom.activated) {
                nodeDatum.activated = nodeCircle.custom.activated;
                anyNodesActivated = true;
            }
        }
    }

    // Draw the connections between each node.
    var connections = [];
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];

        for (var j = 0; j < node.connections.length; j++) {
            var connection = node.connections[j];
            connections.push(connection);
        }
    }

    connections.sort(
        function(connectionA, connectionB) {
            return connectionA.length - connectionB.length;
        }
    ).reverse();

    for (var i = 0; i < connections.length; i++) {
        var connection = connections[i];
        var nodeA = connection.nodeA;
        var nodeB = connection.nodeB;
        var connectionLineId = 'connection--' + nodeA.label + '-' + nodeB.label;

        var connectionLine = document.getElementById(connectionLineId);
        if (connectionLine === null) {
            connectionLine = document.createElementNS(ns, 'line');
            connectionLine.setAttributeNS(null, 'id', connectionLineId);
            group.appendChild(connectionLine);
        }

        var value = connection.strength / highestConnectionStrength;
        var hue = Math.floor(value * 300);
        if (anyNodesActivated) {
            if (nodeData[nodeA.label].activated || nodeData[nodeB.label].activated) {
                connectionLine.setAttributeNS(null, 'stroke', 'hsla(' + hue + ', 75%, 50%, 1)');
            } else {
                connectionLine.setAttributeNS(null, 'stroke', 'hsla(' + hue + ', 75%, 50%, 0.1)');
            }
        } else {
            connectionLine.setAttributeNS(null, 'stroke', 'hsla(' + hue + ', 75%, 50%, 0.75)');
        }
        connectionLine.setAttributeNS(null, 'stroke-width', Math.max(1, connection.strength));
        connectionLine.setAttributeNS(null, 'x1', nodeA.position.x);
        connectionLine.setAttributeNS(null, 'y1', nodeA.position.y);
        connectionLine.setAttributeNS(null, 'x2', nodeB.position.x);
        connectionLine.setAttributeNS(null, 'y2', nodeB.position.y);
    }

    // Precalculate all the node positions and dimensions for what we want to draw. (These aren't necessarily the same
    // as the node dimensions; we might want to tweak certain things, like setting a lower limit on node size).
    var nodeDimensions = [];
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var nodeDimension = {};

        nodeDimension.x = node.position.x;
        nodeDimension.y = node.position.y;
        nodeDimension.radius = Math.max(global.parameters.minNodeRadius, node.radius);
        nodeDimensions.push(nodeDimension);
    }

    // Draw each node.
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var nodeDimension = nodeDimensions[i];
        var nodeCircleId = 'node--' + node.label;
        var nodeDatum = nodeData[node.label];
        var hsl = nodeDatum.hsl;

        var nodeCircle = document.getElementById(nodeCircleId);
        if (nodeCircle === null) {
            nodeCircle = document.createElementNS(ns, 'circle');

            nodeCircle.custom = {
                'hovered': false,
            };

            nodeCircle.setAttributeNS(null, 'fill', 'hsla(' + hsl.h +', 50%, 75%, 1)');
            nodeCircle.setAttributeNS(null, 'stroke', 'hsla(' + hsl.h +', 25%, 25%, 1)');
            nodeCircle.setAttributeNS(null, 'stroke-width', 1);
            nodeCircle.setAttributeNS(null, 'id', nodeCircleId);

            group.appendChild(nodeCircle);
        }

        // If the node has the `hovered` property (set elsewhere by a mouse event), draw it slightly brighter.
        if (nodeDatum.hovered) {
            nodeCircle.setAttributeNS(null, 'fill', 'hsla(' + hsl.h +', 90%, 90%, 1)');
        } else {
            nodeCircle.setAttributeNS(null, 'fill', 'hsla(' + hsl.h +', 50%, 75%, 1)');
        }
        nodeCircle.setAttributeNS(null, 'cx', nodeDimension.x);
        nodeCircle.setAttributeNS(null, 'cy', nodeDimension.y);
        nodeCircle.setAttributeNS(null, 'r', nodeDimension.radius);
    }

    // Add text labels on each node.
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var nodeDatum = nodeData[node.label];
        var nodeDimension = nodeDimensions[i];

        var nodeTextId = 'node-label--' + node.label;
        var nodeText = document.getElementById(nodeTextId);
        if (nodeText === null) {
            nodeText = document.createElementNS(ns, 'text');
            nodeText.id = nodeTextId;
            group.appendChild(nodeText);
        }

        var fontSize = Math.max(global.parameters.minFontSize, node.radius * global.parameters.fontSizeCoefficient);
        var hsl = nodeDatum.hsl;

        nodeText.innerHTML = node.label;
        nodeText.setAttributeNS(null, 'dominant-baseline', 'central');
        nodeText.setAttributeNS(null, 'text-anchor', 'middle');
        nodeText.setAttributeNS(null, 'fill', 'hsla(' + hsl.h + ', 10%, 10%, 1)');
        nodeText.setAttributeNS(null, 'x', node.position.x);
        // Bias the text upward for smaller nodes, so that it appears above the node rather than obscuring it.
        var textYBias = 0;
        if (nodeDimension.radius <= 6) {
            var textYBias = 0 - (nodeDimension.radius * 2);
        }
        nodeText.setAttributeNS(null, 'y', node.position.y + textYBias);
        nodeText.setAttributeNS(null, 'font-size', fontSize + 'px');
        nodeText.setAttributeNS(null, 'font-weight', 'bold');
        nodeText.setAttributeNS(null, 'font-family', 'sans-serif');
    }

    // Draw a transparent circle over each node, the same size as the node. By attaching mouse events to this, we can
    // add some interactive behavior when the user hovers their mouse over the node. It's easier to use a transparent
    // element for this than the node itself, as then we run into problems when other elements (eg. text labels) are
    // obscuring the node.
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var nodeDimension = nodeDimensions[i];
        var nodeDatum = nodeData[node.label];
        var nodeHoverCircleId = 'node-clickable--' + node.label;

        var nodeHoverCircle = document.getElementById(nodeHoverCircleId);
        if (nodeHoverCircle === null) {
            nodeHoverCircle = document.createElementNS(ns, 'circle');
            nodeHoverCircle.setAttributeNS(null, 'opacity', '0');
            nodeHoverCircle.setAttributeNS(null, 'id', nodeHoverCircleId);

            // Add some mouseenter and leave events to detect when the user has hovered over this circle. We then figure
            // out the associated node circle, and set a custom `hovered` property on it, which allows the other drawing
            // algorithms to decide how to render that node and its connections.
            nodeHoverCircle.onmouseenter = function(e) {
                var target = e.currentTarget;
                var targetNodeLabel = target.id.split('--')[1];
                var targetNodeCircleId = 'node--' + targetNodeLabel;
                var targetNodeCircle = document.getElementById(targetNodeCircleId);
                var targetNodeDatum = nodeData[targetNodeLabel];
                targetNodeCircle.custom.hovered = true;
            }
            nodeHoverCircle.onmouseleave = function(e) {
                var target = e.currentTarget;
                var targetNodeLabel = target.id.split('--')[1];
                var targetNodeCircleId = 'node--' + targetNodeLabel;
                var targetNodeCircle = document.getElementById(targetNodeCircleId);
                targetNodeCircle.custom.hovered = false;
            }
            nodeHoverCircle.onclick = function(e) {
                var target = e.currentTarget;
                var targetNodeLabel = target.id.split('--')[1];
                var targetNodeCircleId = 'node--' + targetNodeLabel;
                var targetNodeCircle = document.getElementById(targetNodeCircleId);
                for (var j = 0; j < nodes.length; j++) {
                    if (nodes[j].label == targetNodeLabel) {
                        continue;
                    }
                    document.getElementById('node--' + nodes[j].label).custom.activated = false;
                }

                targetNodeCircle.custom.activated = !targetNodeCircle.custom.activated;
                
            }
            group.appendChild(nodeHoverCircle);
        }

        nodeHoverCircle.setAttributeNS(null, 'cx', nodeDimension.x);
        nodeHoverCircle.setAttributeNS(null, 'cy', nodeDimension.y);
        var nodeHoverCircleRadius = Math.max(global.parameters.minHoverCircleRadius, nodeDimension.radius);
        nodeHoverCircle.setAttributeNS(null, 'r', nodeHoverCircleRadius);
    }

}

function displayErrorMessage(errorMessage) {
    global.elements.errorMessage.innerHTML = errorMessage;
    global.elements.errorPanel.style.display = 'block';
}

/**
 * A simple 2D vector class.
 */
function Vector(x, y) {
    this.x = x;
    this.y = y;

    this.add = function(v) {
        return new Vector(this.x + v.x, this.y + v.y);
    };

    this.negate = function() {
        return new Vector(0 - this.x, 0 - this.y);
    };

    this.subtract = function(v) {
        return this.add(v.negate());
    };

    this.multiply = function(s) {
        return new Vector(this.x * s, this.y * s);
    };

    this.divide = function(s) {
        return new Vector(this.x / s, this.y / s);
    };

    this.magnitudeSquared = function() {
        return Math.pow(this.x, 2) + Math.pow(this.y, 2);
    };

    this.magnitude = function() {
        return Math.sqrt(this.magnitudeSquared());
    };

    this.normalize = function() {
        return this.multiply(1 / this.magnitude());
    };

    this.random = function() {
        var angle = 2 * Math.PI * Math.random();
        return new Vector(
            Math.cos(angle),
            Math.sin(angle)
        );
    };
}

/**
 * A rectangular area representing the portion of world space that should be drawn on screen. The contents of the
 * viewport should map directly to the canvas. (If the canvas has different dimensions to the viewport, scaling should
 * be applied accordingly. This may distort the aspect ratio of objects).
 */
function ViewportMapper(viewportBounds, canvasBounds) {
    this.bounds = {
        'viewport': viewportBounds,
        'canvas': canvasBounds,
    };

    // Given a vector representing coordinates in world space, transform it into a vector representing coordinates in
    // canvas space.
    this.transform = function(vector) {
        // Get the vector relative to the top-left corner of the viewport.
        var v = vector.subtract(this.bounds.viewport.min);

        // For both the viewport and the canvas, obtain the vector that runs from min to max (ie. top-left to
        // bottom-right). This is a convenient way to represent the width and height of each.
        var viewportVector = this.bounds.viewport.max.subtract(this.bounds.viewport.min);
        var canvasVector = this.bounds.canvas.max.subtract(this.bounds.canvas.min);

        // Scale the vector so that it will fit the canvas correctly.
        v = new Vector(
            v.x * (canvasVector.x / viewportVector.x),
            v.y * (canvasVector.y / viewportVector.y),
        );

        // Translate the vector to wherever the canvas is positioned, and return it.
        return this.bounds.canvas.min.add(v);
    }

    // Transform canvas space coordinates back into world space coordinates. This is needed when calculating how to drag
    // the screen, for example; the dragging takes place in canvas space but needs to affect the viewport in world
    // space.
    this.reverseTransform = function(vector) {
        var v = vector.subtract(this.bounds.canvas.min);

        var viewportVector = this.bounds.viewport.max.subtract(this.bounds.viewport.min);
        var canvasVector = this.bounds.canvas.max.subtract(this.bounds.canvas.min);

        // Scale the vector so that it will fit the canvas correctly.
        v = new Vector(
            v.x * (viewportVector.x / canvasVector.x),
            v.y * (viewportVector.y / canvasVector.y),
        );

        // Translate the vector to wherever the canvas is positioned, and return it.
        return this.bounds.viewport.min.add(v);
    }
}

/**
 * A bounding box, encoded as a pair of vectors which give the coordinates of the two opposite corners of the box.
 *
 * @param Vector min
 * @param Vector max
 */
function BoundingBox(min, max) {
    this.min = min;
    this.max = max;
}
/**
 * A collection of Nodes.
 */
function Graph() {
    this.nodes = [];
    this.connections = [];
}

/**
 * A 2D graph node.
 *
 * Nodes are treated a little like physical bodies in the sense that they have mass, but they (intentionally) have no
 * momentum; they can only be moved instantaneously and do not preserve velocity from one moment to the next. (You can
 * think about it in terms of them having maximal air resistance; they only move when they're being pushed).
 *
 * @param Vector position
 */
function Node(position) {
    /** @var string label */
    this.label = '';

    /** @var Vector position */
    this.position = position;

    /** @var float radius */
    this.radius = 1;

    /** @var Connection[] connections */
    this.connections = [];

    /**
     * Apply an instantaneous force to the node, displacing it. The amount of displacement is affected by the node's
     * radius; larger nodes are more difficult to move.
     *
     * @param Vector force
     */
    this.applyForce = function (force) {
        //this.position = this.position.add(force.divide(this.radius));
        this.position = this.position.add(force);
    }

    /**
     * Return the connection that this node shares with a given node, or null if the two nodes are not connected.
     *
     * @param Node node
     * @return Connection|null
     */
    this.getConnectionTo = function (node) {
        for (var i = 0; i < this.connections.length; i++) {
            var connection = this.connections[i];
            if (connection.nodeA === node || connection.nodeB === node) {
                return connection;
            }
        }
        return null;
    }

    /**
     * Return true if this node is connected to the given node.
     *
     * @param Node node
     * @return bool
     */
    this.isConnectedTo = function (node) {
        return this.getConnectionTo(node) !== null;
    }
}

/**
 * A connection between two Nodes.
 *
 * @param Node nodeA
 * @param Node nodeB
 * @param float restLength
 * @param float strength
 */
function Connection(nodeA, nodeB, restLength, strength) {
    this.restLength = restLength;
    this.strength = strength;

    /**
     * Return a Vector representing the length and direction of this connection as measured from node A to node B.
     *
     * @return Vector
     */
    this.getAsVector = function() {
        return this.nodeB.position.subtract(this.nodeA.position);
    }

    this.length = function() {
        return this.getAsVector().magnitude();
    }

    /**
     * Form this connection between two given nodes. This also makes the nodes aware of the connection, so that they can
     * later be queried to find out what other nodes they are connected to.
     *
     * @param Node nodeA
     * @param Node nodeB
     */
    this.form = function(nodeA, nodeB) {
        this.nodeA = nodeA;
        this.nodeB = nodeB;
        this.nodeA.connections.push(this);
        this.nodeB.connections.push(this);
    }

    this.form(nodeA, nodeB);
}
