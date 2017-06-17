var global = {
    'dimensions': {
        'svg':  {
            'px': {
                'width': 1280,
                'height': 720,
            },
        },
        'desiredHeaviestStringWidth': 640,
    },
    'normalizedFontSize': 128,
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
        },
    },
    'svgNamespace': 'http://www.w3.org/2000/svg',
};

initialize();

function initialize() {
    for (var i=0; i < global.elementIds.length; i++) {
        var elementId = global.elementIds[i];
        global.elements[elementId] = document.querySelector('#'+elementId);
    }

    global.parameters.cloudAlgorithm.searchRadius.max = global.dimensions.svg.px.width;
}

/**
 * Generates an SVG "word cloud" from an array of strings mapped to weights and inserts it into the specified containing
 * element.
 *
 * `containingElement`: A DOM element into which the SVG will be inserted.
 * `weightedStrings`: An array of objects each with attributes `content` and `weight`.
 * `minWeight`: If given, strings with a weight below this value will be disregarded.
 */
function produceStringCloud(containingElement, weightedStrings, minWeight, maxStrings) {
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

    // Create a group for all the cloud elements, so that we can transform the cloud as a whole later on.
    var cloudGroup = document.createElementNS(global.svgNamespace, 'g');
    svg.appendChild(cloudGroup);

    // Determine a "normalization coefficient" for the font size, so that the base size of the text is reasonable. (It
    // doesn't matter too much because the group gets resized at the end anyway).
    var fontSizeNormalizationCoefficient = global.normalizedFontSize / weightedStrings[0].weight;
   
    // For each string, create a text element to represent it, calculate a position for the element (based on what's
    // already been added), and add the element to the SVG.
    var cloudElements = [];

    var numberOfStrings = weightedStrings.length;

    // If the user specified a maximum number of strings, use that. Otherwise, check to see if there's a globally-set
    // maximum number of strings. If there isn't, then we can't set an upper limit on the number of strings.
    if (maxStrings === undefined) {
        if (global.maxStrings !== undefined) {
            maxStrings = global.maxStrings;
        }
    }
    if (maxStrings !== undefined && numberOfStrings > maxStrings) {
        numberOfStrings = maxStrings;
    }

    var cachedPositions = [];
    for (var i=0; i < numberOfStrings; i++) {
        var weightedString = weightedStrings[i];
        // If the string is below the min weight threshold, ignore it.
        if (weightedString.weight < minWeight) {
            //console.log('String is below minimum weight setting of '+minWeight+'. Ignoring.');
            continue;
        }
        console.log((i+1)+'/'+numberOfStrings+': Adding "'+weightedString.content+'" (weight '+weightedString.weight+')');
        //console.log(cloudElements.length+' elements currently in cloud.');

        var text = document.createElementNS(global.svgNamespace, 'text');

        var fontSize = weightedString.weight * fontSizeNormalizationCoefficient;

        // Generate a color based on a hash of the content.
        var colorHsl = md5ToHsl(md5(weightedString.content));

        // Clamp the color's lightness so that it's not unreadable.
        colorHsl.l = Math.min(50, colorHsl.l);
        var colorHslString = 'hsl('+colorHsl.h+', '+colorHsl.s+'%, '+colorHsl.l+'%)';

        text.innerHTML = weightedString.content;
        text.setAttributeNS(null, 'data-weight', weightedString.weight);
        text.setAttributeNS(null, 'font-size', fontSize+'px');
        text.setAttributeNS(null, 'fill', colorHslString);

        // If no strings have yet been added, place this string with its position at (0, 0). (This may seem like a
        // strange placement, since it will clearly be mostly outside the SVG bounds; however, we will be performing a
        // transformation after the cloud is generated to bring it to the center again. Starting at the origin makes
        // the calculations easier).
        if (cloudElements.length === 0) {
            //console.log('No strings placed yet. Placing "'+weightedString.content+'" at ('+svgWidth/2+', '+svgHeight/2+')');
            //placeSvgElementByCenter(text, svgWidth/2, svgHeight/2, cloudGroup);
            placeSvgElementByCenter(text, 0, 0, cloudGroup);
            var center = getCenter(text.getBoundingClientRect());
            cloudElements.push(text);
            continue;
        }

        // Otherwise, calculate a new position for this element such that it doesn't overlap with previously-added
        // elements.
        //
        // Our position calculation algorithm is as follows:
        // 1. Define a circle with its center, c, at the center position of the cloud, and with a radius r.
        // 2. Starting at the top of that circle, define N positions that are spaced evenly around the circumference of
        //    the circle, a circumference-distance s apart.
        // 3. Check to see if the element could be placed with its center at any of those N positions, without
        //    overlapping any other element that has been placed previously.
        //    3a. If any of the N positions are viable, select the one that puts the element closest to the edge of
        //        another element.
        //    3b. If none of the N positions are viable, then repeat step 1, with a larger r, until r exceeds a
        //        threshold R. At that point, return the first available position, even if it's overlapping.

        var cloudCenter = getCenter(cloudElements[0].getBoundingClientRect());
        var params = global.parameters.cloudAlgorithm;
        var stringWasPlaced = false;
        var fallbackPosition = undefined;

        for (var r = params.searchRadius.initial; r < params.searchRadius.max; r += params.searchRadius.increment) {
            var positions = undefined;
            if (cachedPositions[r] !== undefined) {
                // If we've cached positions at this radius, it means we've been here before and don't need to calcuate
                // them again. Instead, we check the cache to see what positions are available, and if anything was
                // placed here before.
                positions = cachedPositions[r];
                //console.log('Found '+positions.length+' positions in cache for radius '+r);
            }
            else {
                // This is the first time we've visited this radius, so we calculate and cache positions here.
                //
                // Determine the circumference of the circle at the current search radius.
                var circumference = 2 * Math.PI * r;

                // Determine the angular separation a of two points on the circle that are a radial distance s apart.
                // In radians, this is simply s / r.
                var angularSeparation = params.circumferenceSpacing / r;

                // Now that we know the angular separation, we can use trigonometry to calculate a number of
                // evenly-spaced positions around the circle.

                // For the purposes of caching, we'll precompute how many points would be around the circle at this
                // radius, and index them.
                var positions = [];
                for (var angle = 0; angle < 2 * Math.PI; angle += angularSeparation) {
                    positions.push(
                        {
                            'x': cloudCenter.x + (r * Math.cos(angle)),
                            'y': cloudCenter.y + (r * Math.sin(angle)),
                            'a': undefined,
                        }
                    );
                }

                //console.log('Determined '+positions.length+' candidate positions at radius '+r+' from the cloud center.');

                // Define a "fallback position". This is a position that may or may not be viable, but at the very
                // least, if we can't find anywhere to put this element, we'll place it here.
                fallbackPosition = positions[positions.length-1];
                cachedPositions[r] = positions;
            }

            // Test each of the positions to see if it's viable (ie. the element wouldn't overlap anything if it was
            // placed here).
            var viablePositions = [];
            for (var j=0; j < positions.length; j++) {
                var position = positions[j];

                // Place the element with its center at this position, so that we can capture its bounding rectangle
                // here.
                placeSvgElementByCenter(text, position.x, position.y, cloudGroup);

                var textBoundingRect = text.getBoundingClientRect();

                // Check the position's `a` value. This value, if present, is the area of the last element that was
                // blocked at this position (ie. couldn't be placed here). If the element we're trying to add is of a
                // similar size, then we won't bother trying to place it here at all.
                if (position.a !== undefined) {
                    var textArea = textBoundingRect.width * textBoundingRect.height;
                    if (textArea > position.a * 0.9) {
                    //console.log('This element is of a similar size ('+textArea+' to an element that previously failed to be placed here ('+position.a+'). Skipping...');
                    continue;
                    }
                }

                // Check to see if this bounding rect is overlapping the bounding rect of any other element.
                var isOverlappingAnotherElement = false;
                for (var k=0; k < cloudElements.length; k++) {
                    var cloudElement = cloudElements[k];
                    if (isBoundingRectOverlapping(
                        textBoundingRect,
                        cloudElement.getBoundingClientRect(),
                            {
                                'top': 0.8,
                                'bottom': 0.8
                            }
                        )
                    ) {
                        isOverlappingAnotherElement = true;
                        // Record the area of the element against this position; that is, record the fact that an
                        // element with this area could not be placed at this position. The algorithm will use this
                        // information to help it decide whether or not to bother checking this position.
                        position.a = textBoundingRect.width * textBoundingRect.height;
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
                cloudGroup.removeChild(text);
                placeSvgElementByCenter(text, viablePosition.x, viablePosition.y, cloudGroup);
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
                //console.log('The best viable position is at ('+bestViablePosition.x+', '+bestViablePosition.y+'), a distance of '+shortestDistanceToNearestElement+' from the nearest element.)');
                cloudGroup.removeChild(text);
                placeSvgElementByCenter(text, bestViablePosition.x, bestViablePosition.y, cloudGroup);
                cloudElements.push(text);
                stringWasPlaced = true;
                break;
            }
        }

        // If we've gotten here without being able to place the string, we have one final option; place it in the
        // fallback position. This may not be viable, but at least it's somewhere.
        if (!stringWasPlaced) {
            console.log('Could not find a viable position for string. Placing at fallback position.');
            placeSvgElementByCenter(text, fallbackPosition.x, fallbackPosition.y, cloudGroup);
            cloudElements.push(text);
        }
    }

    // At this point the cloud has been generated and added to the DOM, but it's possible that some of the text elements
    // may have been placed partially or completely outside the bounds of the SVG (since the algorithm doesn't check
    // boundaries). To fix this, we now transform the entire cloud group so that it fits within the SVG.

    // Get the bounding rect for the cloud group (which completely encloses all elements in the cloud).
    var cloudGroupRect = cloudGroup.getBoundingClientRect();
    console.log(cloudGroupRect);

    // Calculate the coefficient required to scale the cloud group so that it is the same height as the SVG.
    var scaleCoefficient = svgHeight / cloudGroupRect.height;

    // Make the scale a teensy bit smaller. At present the group still ends up slightly too large for some reason.
    scaleCoefficient *= 0.9;

    // Apply the scale transformation to the cloud group. At this point, it's still centered on the origin, but that's
    // okay. We'll move it in a moment.
    cloudGroup.setAttributeNS(null, 'transform',  'scale('+scaleCoefficient+')');

    // Obtain the new, scaled dimensions of the cloud group.
    var scaledCloudGroupRect = cloudGroup.getBoundingClientRect();
    console.log(scaledCloudGroupRect);

    // Since we know the dimensions of the cloud group, we can now resize the SVG so that the cloud group fits snugly
    // inside it. We'll make the SVG a tiny bit larger than the cloud group.
    svg.setAttributeNS(null, 'width', (scaledCloudGroupRect.width * 1.1)+'px');
    svg.setAttributeNS(null, 'height', (scaledCloudGroupRect.height * 1.1)+'px');

    // Obtain the new, scaled dimensions of the SVG.
    var resizedSvgRect = svg.getBoundingClientRect();
    console.log(resizedSvgRect);

    // Apply a translation to move the cloud group to the center of the now-resized SVG. (Don't forget that we still
    // need the scale transformation, too. The only reason we did one earlier was so that we could obtain the bounding
    // rect).
    cloudGroup.setAttributeNS(
        null,
        'transform',
        'translate('+(resizedSvgRect.width/2)+', '+(resizedSvgRect.height/2)+')'
        + ' scale('+scaleCoefficient+')');

    // To get an SVG string out, we can use the XMLSerializer class. This works on Firefox, but might not work on
    // Chrome. We'll write this into a textarea so that the user can copy/paste it.
    var xmlSerializer = new XMLSerializer();
    var serializedSvg = xmlSerializer.serializeToString(svg);
    var svgTextarea = document.createElement('textarea');
    svgTextarea.innerHTML = serializedSvg;
    containingElement.appendChild(svgTextarea);
    
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
 * Add an SVG element `element` (such as `<text>`, `<rect>`, etc.) to the containing element `container`, offsetting it
 * such that the element is positioned with its center at (`positionX`, `positionY`). Doing this requires knowing how
 * wide and tall `element` is; therefore, this function uses the trick of adding `element` to `container`, requesting
 * its rendered dimensions from the browser, calculating its center, then repositioning it with its center at the
 * desired location.
 *
 * `container` is typically an `<svg>` element, but it could also be a `<g>` for example.
 *
 * NOTE: In order for this to work, `container` *must* already have been added to the DOM (otherwise, the browser can't
 * render `element` and will return 0 for all its dimensions).
 */
function placeSvgElementByCenter(element, positionX, positionY, container) {
    element.setAttributeNS(null, 'x', 0);
    element.setAttributeNS(null, 'y', 0);
    container.appendChild(element);

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
