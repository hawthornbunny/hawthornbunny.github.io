var global = {
    'dimensions': {
        'svg':  {
            'px': {
                'width': 1280 * 1.5,
                'height': 720 * 1.5,
            },
        },
        'desiredHeaviestStringWidth': 640,
    },
    'elements': [],
    'elementIds': [
        'container',
    ],
    'maxStrings': 300,
    'parameters': {
        'cloudAlgorithm': {
            'searchRadius': {
                'initial': 16,
                'increment': 16,
                'max': 1280,
            },
            'circumferenceSpacing': 16,
            'minAngularSeparation': (2 * Math.PI) / 1024,
        },
    },
    'svgNamespace': 'http://www.w3.org/2000/svg',
    'textScaleFactor': 0.5,
};

initialize();

function initialize() {
    for (var i=0; i < global.elementIds.length; i++) {
        var elementId = global.elementIds[i];
        global.elements[elementId] = document.querySelector('#'+elementId);
    }

    global.parameters.cloudAlgorithm.searchRadius.max = global.dimensions.svg.px.width;
}

function produceStringCloud(containingElement, weightedStrings, minWeight) {
    if (minWeight === undefined) {
        minWeight = 0;
    }

    var svgWidth = global.dimensions.svg.px.width;
    var svgHeight = global.dimensions.svg.px.height;
    var svgAspectRatio = svgWidth/svgHeight;

    // Sort the strings by weight, heaviest first.
    weightedStrings = sortByProperties(weightedStrings, ['weight']).reverse();

    // Add the SVG to the DOM. Note that due to the trick we're using to get the dimensions of elements in the SVG, the
    // SVG *must* be added to the DOM before any of its child elements are added to it.
    var svg = document.createElementNS(global.svgNamespace, 'svg');
    svg.setAttributeNS(null, 'id', 'cloud');
    svg.setAttributeNS(null, 'width', svgWidth+'px');
    svg.setAttributeNS(null, 'height',svgHeight+'px');
    containingElement.appendChild(svg);

    // Before we do anything, we need to figure out an appropriate mapping of string weight to font size. This requires
    // some calculation, because the most important thing is that the string with the most weight fits on screen (and we
    // don't know in advance how long that string is, or how much space it will take up).

    // To start with, we'll perform a pre-render of the heaviest string.
    var text = document.createElementNS(global.svgNamespace, 'text');
    text.innerHTML = weightedStrings[0].content;
    var fontSize = weightedStrings[0].weight * global.textScaleFactor;
    text.setAttributeNS(null, 'font-size', fontSize+'px');
    svg.appendChild(text);

    // Get the rendered string's bounding rect.
    var heaviestStringBoundingRect = text.getBoundingClientRect();
    console.log(global.dimensions.desiredHeaviestStringWidth);
    console.log(heaviestStringBoundingRect);

    // The config should have established a desired width for the heaviest element, so now we can determine how much we
    // need to scale all text.
    var scaleFactor = global.dimensions.desiredHeaviestStringWidth / heaviestStringBoundingRect.width;
    svg.removeChild(text);
   
    // For each string, create a text element to represent it, calculate a position for the element (based on what's
    // already been added), and add the element to the SVG.
    var cloudElements = [];

    var numberOfStrings = weightedStrings.length;
    if (global.maxStrings !== undefined) {
        numberOfStrings = global.maxStrings;
    }

    for (var i=0; i < numberOfStrings; i++) {
        var weightedString = weightedStrings[i];
        // If the string is below the min weight threshold, ignore it.
        if (weightedString.weight < minWeight) {
            //console.log('String is below minimum weight setting of '+minWeight+'. Ignoring.');
            continue;
        }
        console.log('----------------------------------------------------------------');
        console.log('"'+weightedString.content+'" (weight '+weightedString.weight+')');
        console.log('----------------------------------------------------------------');
        console.log(cloudElements.length+' elements currently in cloud.');

        var text = document.createElementNS(global.svgNamespace, 'text');
        text.innerHTML = weightedString.content;
        var fontSize = weightedString.weight * scaleFactor * global.textScaleFactor;
        // Generate a color based on a hash of the content.
        var colorHsl = md5ToHsl(md5(weightedString.content));
        // Clamp the color's lightness so that it's not unreadable.
        colorHsl.l = Math.min(50, colorHsl.l);
        var colorHslString = 'hsl('+colorHsl.h+', '+colorHsl.s+'%, '+colorHsl.l+'%)';
        text.setAttributeNS(null, 'data-weight', weightedString.weight);
        text.setAttributeNS(null, 'font-size', fontSize+'px');
        text.setAttributeNS(null, 'fill', colorHslString);

        // If no strings have yet been added, place this string in the center of the SVG.
        if (cloudElements.length === 0) {
            console.log('No strings placed yet. Placing "'+weightedString.content+'" at ('+svgWidth/2+', '+svgHeight/2+')');
            placeSvgElementByCenter(text, svgWidth/2, svgHeight/2, svg);
            var center = getCenter(text.getBoundingClientRect());
            cloudElements.push(text);
            continue;
        }

        // Otherwise, calculate a new position for this element such that it doesn't overlap with previously-added
        // elements.
        //
        // Our position calculation algorithm is as follows:
        // 1. Define a circle with its center, c, at the average center position of the cloud, and a radius r.
        // 2. Starting at the top of that circle, define N positions that are spaced evenly around the circumference of
        //    the circle, a circumference-distance s apart.
        // 3. Check to see if the element could be placed with its center at any of those N positions, without
        //    overlapping any other element that has been placed previously.
        //    3a. If any of the N positions are viable, select the one that puts the element closest to the edge of
        //        another element.
        //    3b. If none of the N positions are viable, then repeat step 1, with a larger r, until r exceeds a
        //        threshold R. At that point, return the first available position, even if it's overlapping.

        //var cloudCenter = getAverageCenterOfElements(cloudElements);
        var cloudCenter = getCenter(cloudElements[0].getBoundingClientRect());
        var params = global.parameters.cloudAlgorithm;
        var stringWasPlaced = false;
        var fallbackPosition = undefined;

        for (var r = params.searchRadius.initial; r < params.searchRadius.max; r += params.searchRadius.increment) {
            //console.log('Searching out from ('+cloudCenter.x+', '+cloudCenter.y+') at radius '+r);
            // Determine the circumference of the circle at the current search radius.
            var circumference = 2 * Math.PI * r;

            // Determine the angular separation a of two points on the circle that are a radial distance s apart. In
            // radians, this is simply s / r.
            var angularSeparation = params.circumferenceSpacing / r;

            // Clamp the angular separation to a lower limit (ie. don't let the angles between points become too small).
            // We do expect the angles to get smaller as the circle gets larger (this is inevitable if you keep the
            // spacing between points the same), but that has the effect of introducing more points... which is good for
            // a while, and then becomes increasingly inefficient when the circle is large. Clamping the angular
            // separation will mean limiting the number of points on large circles, which reduces placement accuracy,
            // but speeds up the cloud generation.
            angularSeparation = Math.max(angularSeparation, global.parameters.cloudAlgorithm.minAngularSeparation);
            
            // Now that we know the angular separation, we can use trigonometry to calculate a number of evenly-spaced
            // positions around the circle.
            var positions = [];
            for (var angle = 0; angle < 2 * Math.PI; angle += angularSeparation) {
                positions.push(
                    {
                        'x': cloudCenter.x + (r * Math.cos(angle)),
                        'y': cloudCenter.y + (r * Math.sin(angle)),
                    }
                );
            }

            console.log('Determined '+positions.length+' candidate positions at radius '+r+' from the cloud center.');

            // Define a "fallback position". This is a position that may or may not be viable, but at the very least, if
            // we can't find anywhere to put this element, we'll place it here.
            fallbackPosition = positions[positions.length-1];

            // Test each of the positions to see if it's viable (ie. the element wouldn't overlap anything if it was
            // placed here).
            var viablePositions = [];
            for (var j=0; j < positions.length; j++) {
                var position = positions[j];

                // Place the element with its center at this position, so that we can capture its bounding rectangle
                // here.
                placeSvgElementByCenter(text, position.x, position.y, svg);

                // Check to see if this bounding rect is overlapping the bounding rect of any other element.
                var isOverlappingAnotherElement = false;
                for (var k=0; k < cloudElements.length; k++) {
                    var cloudElement = cloudElements[k];
                    if (isBoundingRectOverlapping(
                        text.getBoundingClientRect(),
                        cloudElement.getBoundingClientRect(),
                            {
                                'top': 0.8,
                                'bottom': 0.8
                            }
                        )
                    ) {
                        isOverlappingAnotherElement = true;
                        break;
                    }
                }

                // If the bounding rect is not overlapping anything, then this position is viable.
                if (!isOverlappingAnotherElement) {
                    viablePositions.push(position);
                }
            }

            //console.log('Found '+viablePositions.length+' viable positions.');
            // If we found any viable positions, we now try to select the best one of those positions, by finding which
            // of them is closest to another element.

            var bestViablePosition = undefined;
            var shortestDistanceToNearestElement = undefined;
            for (var j=0; j < viablePositions.length; j++) {
                var viablePosition = viablePositions[j];

                // Place the text element at the viable position, so that we can check its distance to already-placed
                // elements.
                svg.removeChild(text);
                placeSvgElementByCenter(text, viablePosition.x, viablePosition.y, svg);
                var distanceToNearestElement = getDistanceToNearestElement(text, cloudElements);

                if (distanceToNearestElement < shortestDistanceToNearestElement
                    || shortestDistanceToNearestElement === undefined) {
                    shortestDistanceToNearestElement = distanceToNearestElement;
                    bestViablePosition = viablePosition;
                }
            }

            // If we have a best viable position, place the text element there, record it in the list of placed
            // elements, and move onto the next string.
            if (bestViablePosition !== undefined) {
                console.log('The best viable position is at ('+bestViablePosition.x+', '+bestViablePosition.y+'), a distance of '+shortestDistanceToNearestElement+' from the nearest element.)');
                svg.removeChild(text);
                placeSvgElementByCenter(text, bestViablePosition.x, bestViablePosition.y, svg);
                cloudElements.push(text);
                stringWasPlaced = true;
                break;
            }
        }

        // If we've gotten here without being able to place the string, we have one final option; place it in the
        // fallback position. This may not be viable, but at least it's somewhere.
        if (!stringWasPlaced) {
            console.log('Could not find a viable position for string. Placing at fallback position.');
            placeSvgElementByCenter(text, fallbackPosition.x, fallbackPosition.y, svg);
            cloudElements.push(text);
        }

    }
}

/**
 * Return the coordinates of the center of a bounding rectangle (such as that returned by `getBoundingClientRect`).
 */
function getCenter(boundingRect) {
    return {
        'x': boundingRect.x + ((boundingRect.right - boundingRect.left) / 2),
        'y': boundingRect.y + ((boundingRect.bottom - boundingRect.top) / 2),
    };
}

/**
 * Add an element `element` to the SVG `svg`, such that the element is positioned with its center at
 * (`positionX`, `positionY`). Doing this requires knowing how wide and tall `element` is; therefore, this function uses
 * the trick of adding `element` to `svg`, requesting its rendered dimensions from the browser, calculating its center,
 * then repositioning it with its center at the desired location.
 *
 * NOTE: In order for this to work, `svg` *must* already be in the DOM (otherwise, the browser can't render `element`
 * and will return 0 for all its dimensions).
 */
function placeSvgElementByCenter(element, positionX, positionY, svg) {
    element.setAttributeNS(null, 'x', 0);
    element.setAttributeNS(null, 'y', 0);
    svg.appendChild(element);

    var elementBoundingRect = element.getBoundingClientRect();
    
    var elementCenter = getCenter(elementBoundingRect);
    var offset = {
        'x': elementCenter.x,
        'y': elementCenter.y,
    };

    element.setAttributeNS(null, 'x', positionX - offset.x);
    element.setAttributeNS(null, 'y', positionY - offset.y);
}

function getAverageCenterOfElements(elements) {
    var centerTotal = {
        'x': 0,
        'y': 0,
    };

    for (var i=0; i < elements.length; i++) {
        var element = elements[i];
        var elementBoundingRect = element.getBoundingClientRect();
        var elementCenter = getCenter(elementBoundingRect);
        centerTotal.x +=  elementCenter.x;
        centerTotal.y +=  elementCenter.y;
    }

    return {
        'x': centerTotal.x / elements.length,
        'y': centerTotal.y / elements.length,
    };
}

/**
 * Return true if bounding rect `rect1` is determined to be overlapping `rect2`. This is determined with simple edge
 * comparisons.
 *
 * If an `edgeScales` object is supplied containing attributes named `top`, `right`, `left`, `bottom`, then both rects
 * will be treated as if their corresponding edges are scaled in or out by that amount.
 *
 * This allows one to pretend that the rects are smaller or larger than they really are, which can help obtain tighter
 * fits for elements that you know contain padding, for example.
 *
 * Example:
 *
 * Check for overlaps between two rects and pretend that their top edges are twice as far away from the center than they
 * actually are:
 *
 *     isBoundingRectOverlapping(rect1, rect2, {'top': 2});
 *
 */
function isBoundingRectOverlapping(rect1, rect2, edgeScales) {
    if (edgeScales === undefined) {
        edgeScales = {};
    }
    var defaultEdgeScales = {
        'top': 1,
        'right': 1,
        'bottom': 1,
        'left': 1,
    }

    var edgeNames = Object.keys(defaultEdgeScales);
    for (var i=0; i < edgeNames.length; i++) {
        var edgeName = edgeNames[i];
        if (edgeScales[edgeName] === undefined) {
            edgeScales[edgeName] = defaultEdgeScales[edgeName];
        }
    }

    var rect1Center = getCenter(rect1);
    var rect2Center = getCenter(rect2);

    var r1 = {
        'top': rect1Center.y - ((rect1.height / 2) * edgeScales.top),
        'right': rect1Center.x + ((rect1.width / 2) * edgeScales.right),
        'bottom': rect1Center.y + ((rect1.height / 2) * edgeScales.bottom),
        'left': rect1Center.x - ((rect1.width / 2) * edgeScales.left),
    };
    var r2 = {
        'top': rect2Center.y - ((rect2.height / 2) * edgeScales.top),
        'right': rect2Center.x + ((rect2.width / 2) * edgeScales.right),
        'bottom': rect2Center.y + ((rect2.height / 2) * edgeScales.bottom),
        'left': rect2Center.x - ((rect2.width / 2) * edgeScales.left),
    };

    return !(r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top || r1.top > r2.bottom);
}

function getDistanceToNearestElement(element, otherElements) {
    var nearestDistance = undefined;
    var elementCenter = getCenter(element.getBoundingClientRect());
    var otherElementCenters = [];
    for (var i=0; i < otherElements.length; i++) {
        var otherElement = otherElements[i];
        otherElementCenters.push(getCenter(otherElement.getBoundingClientRect()));
    }

    for (var i=0; i < otherElementCenters.length; i++) {
        var otherElementCenter = otherElementCenters[i];
        var distance = Math.sqrt(
            Math.pow(otherElementCenter.x - elementCenter.x, 2)
            + Math.pow(otherElementCenter.y - elementCenter.y, 2)
        );

        if (nearestDistance === undefined) {
            nearestDistance = distance;
        }

        if (distance < nearestDistance) {
            nearestDistance = distance;
        }
    }

    return nearestDistance;
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
 * Given a collection of objects `objects`, returns the collection sorted alphabetically by the values of the specified
 * object properties.
 *
 * Example: Suppose we have a collection of objects `cards`, in which each object is known to have a `name` property and
 * a * `set` property. We could sort the collection by name and secondarily by set by calling:
 *
 *    sortByProperties(cards, ['name', 'set']);
 *
 * If `ignoreCase` is true, the function will treat all property values as if they were lowercase.
 */
function sortByProperties(objects, properties, ignoreCase) {
    return objects.sort(
        function(objectA, objectB) {
            for (var i=0; i < properties.length; i++) {
                var property = properties[i];
                var comparisonResult = undefined;
                var objectPropertyA = '';
                var objectPropertyB = '';

                if (objectA[property] !== undefined) {
                    objectPropertyA = objectA[property];
                }
                if (objectB[property] !== undefined) {
                    objectPropertyB = objectB[property];
                }

                if (ignoreCase) {
                    objectPropertyA = objectPropertyA.toLowerCase();
                    objectPropertyB = objectPropertyB.toLowerCase();
                }

                if (objectPropertyA < objectPropertyB) {
                    comparisonResult = -1;
                }
                else if (objectPropertyA > objectPropertyB) {
                    comparisonResult = 1;
                }
                
                if (comparisonResult !== undefined) {
                    return comparisonResult;
                }
            }
            return 0;
        }
    );
}
