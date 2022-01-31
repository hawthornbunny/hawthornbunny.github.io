var global = {
    'dataSources': {
        'fimfarchive': {
            'name': 'Fimfarchive',
            'url': 'https://www.fimfiction.net/user/116950/Fimfarchive',
            'file': 'data/compact-index.json',
        }
    },
    'elements': {
    },
    'elementIds': [
        'main',
        'treemaps',
    ],
    'svgNamespace': 'http://www.w3.org/2000/svg',
    'treemapRectTiers': undefined
};

/**
 * Initialize the app, load fic data, set up event handlers. This function is
 * called first after the window has loaded.
 */
function initialize() {
    for (let i=0; i < global.elementIds.length; i++) {
        let elementId = global.elementIds[i];
        global.elements[elementId] = document.querySelector('#' + elementId);
    }

    const tags = undefined;
    fetch('data/time-action-glory-2020-08.json')
      .then(response => response.json())
      .then(data => start(data));
}

/**
 * Analyze and process the fic data. The data should be in the form of a object
 * mapping tag names to their number of occurrences.
 *
 * @param {Object} data
 */
const start = function start(data) {
    // Remove tags with zero frequency - these can't be represented as areas on
    // a treemap.
    for (let tag in data) {
        if (data[tag] == 0) {
            delete data[tag];
        }
    }

    // Divide the tags table into a set of subtables, in which each table
    // contains only frequencies of the same magnitude. Dividing the table into
    // tiers this way means we don't end up with a single bloated treemap that's
    // too dense to read.
    const tagFreqTiers = getItemTiers(data);
    console.log(tagFreqTiers)

    const treemapTiers = {};

    // Create a treemap for each tier. In this context, a treemap is the tree
    // that describes how the treemap rectangle is divided up for each of its
    // items.
    for (let tier in tagFreqTiers) {
        treemapTiers[tier] = createTreemap(tagFreqTiers[tier]);
    }

    console.log(treemapTiers);

    const treemapRectTiers = {};

    // For each tier, create the set of rectangles which comprise the
    // representation of its treemap. These are defined within a unit square,
    // with the intention that it be scaled up later to the desired size.
    for (let tier in treemapTiers) {
        treemapRectTiers[tier] = createTreemapRects(
            treemapTiers[tier],
            0,
            0,
            1,
            1
        );
    }

    console.log(treemapRectTiers);

    // Store all the treemap rectangles globally - this is needed because we may
    // want to resize the window, which potentially means redrawing the treemaps
    // to fit the new size.
    global.treemapRectTiers = treemapRectTiers;

    drawTreemaps();
};

/**
 * An alternate start function for fics/tags in the compact Fimfarchive format
 * used by the Fimfiction tag trends chart.
 *
 * @param {Object[]} fics
 * @param {Object[]} tags
 */
const startFimfarchive = function startFimfarchive(fics, tags) {
    console.log(fics);
    console.log(tags);
    const tagFreqs = {};

    for (ficId in fics) {
        fics[ficId].tags.forEach(
            tagId => {
                const tag = tags[tagId];

                if (tag.type !== 'character') {
                    return;
                }

                if (tagFreqs[tag.name] === undefined) {
                    tagFreqs[tag.name] = 0;
                }
                tagFreqs[tag.name]++;
            }
        );
    }

    const tagFreqTiers = getItemTiers(tagFreqs);
    console.log(tagFreqTiers)

    const treemapTiers = {};

    for (let tier in tagFreqTiers) {
        treemapTiers[tier] = createTreemap(tagFreqTiers[tier]);
    }

    console.log(treemapTiers);

    const treemapRectTiers = {};

    for (let tier in treemapTiers) {
        treemapRectTiers[tier] = createTreemapRects(treemapTiers[tier], 0, 0, 1, 1);
    }

    console.log(treemapRectTiers);

    global.treemapRectTiers = treemapRectTiers;

    drawTreemaps();
};


/**
 * Given an table mapping items to weights, split the table into multiple
 * tables, each of which has it at a different "tier" depending on the magnitude
 * of the weights it contains. The magnitude is determined by the log10 of the
 * weight (rounded down). For example, an item with weight 14500 has magnitude
 * 4, because log10(14500) = 4.16, so it will be assigned to the tier 4 table.
 *
 * For each tier other than the lowest, an additional entry is added to the
 * table representing the cumulative total of all tiers beneath it. This allows
 * a comparison to be made between the items in that tier and everything beneath
 * that tier.
 *
 * @param {Object} table
 * @return {Object}
 */
const getItemTiers = function getItemTiers(table) {
    const tierTables = {};

    for (let key in table) {    
        const tier = Math.floor(Math.log10(table[key]));
        if (tierTables[tier] === undefined) {
            tierTables[tier] = {};
        }
        tierTables[tier][key] = table[key];
    }

    const tiers = Object.keys(tierTables).sort();

    let cumulativeTotal = 0;

    for (let i = 1; i < tiers.length; i++) {
        const prevTierTable = tierTables[i - 1];

        const prevTierTableTotal = sum(Object.values(prevTierTable));
        cumulativeTotal += prevTierTableTotal;

        const tierTable = tierTables[i];
        const tierBoundary = Math.pow(10, i);
        tierTable[`<${tierBoundary}`] = cumulativeTotal;
    }

    return tierTables;
};

/**
 * Tree-balancing algorithm based on [this lecture][1] from Williams College.
 *
 * The function accepts as input an object containing a set of strings mapped to
 * weights. It then assembles the weights into a binary tree in which each node
 * represents the sum of the weights of its two child nodes.
 *
 * It does this by initially representing the weights as a list of single-node
 * trees (ie. roots), then merging the two trees in the list with the smallest
 * root values into one binary tree whose root represents the sum of those
 * values. By repeated iterations of merging and sorting (to ensure that the
 * smallest roots are always merged into larger ones), the end result is a tree
 * whose root represents the sum of the values of all of its leaf nodes.
 *
 * Each node of the tree is represented by a tuple
 * `(label, weight, childA, childB)` where
 * `label` is the string represented by the node, `weight` is a number
 * representing the weight of the node, and `childA` and `childB` are its two
 * child nodes.
 * 
 * [1]: http://www.cs.williams.edu/~cs135/f16/lectures/lecture.15.pdf
 */
const createTreemap = function createTreemap(items) {
    // Create an initial set of tree roots from the items. Each tree node has a
    // label and a weight.
    const trees = Object.keys(items).map(
        name => {
            return {
                "label": name,
                "weight": items[name],
                "childA": null,
                "childB": null
            };
        }
    );

    while (trees.length > 1) {
        trees.sort(
            (treeA, treeB) => treeA.weight - treeB.weight
        ).reverse();

        const smallestTreeB = trees.pop();
        const smallestTreeA = trees.pop();

        const weightA = smallestTreeA.weight;
        const weightB = smallestTreeB.weight;

        // Merge the two trees together by their roots. Note that merged trees
        // (ie. non-leaf-nodes) don't have labels.
        const mergedSmallestTree = {
            "label": null,
            "weight": weightA + weightB,
            "childA": smallestTreeA,
            "childB": smallestTreeB,
        };

        trees.push(mergedSmallestTree);
    }

    return trees[0];
};

/**
 * Given a tree representing a treemap, return a set of labelled rectangles that
 * subdivide an initial given rectangle according to the weightings specified by
 * the treemap.
 *
 * The returned rectangles all have the following properties:
 * - label
 * - weight
 * - x
 * - y
 * - w
 * - h
 *
 * @param {Object} treemap
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @return {Object[]}
 */
const createTreemapRects = function createTreemapRects(treemap, x, y, w, h) {
    if (treemap.childA === null && treemap.childB === null) {
        // Base case: if the treemap does not specify any further subdivisions,
        // simply return the rectangle.
        return [
            {
                "label": treemap.label,
                "weight": treemap.weight,
                "x": x,
                "y": y,
                "w": w,
                "h": h,
            }
        ];
    }

    // For the two children of this rectangle, calculate the proportion of the
    // area that each child must take up.
    const proportionA = treemap.childA.weight / treemap.weight;
    const proportionB = treemap.childB.weight / treemap.weight;

    // Calculate the aspect ratio of this rectangle. This determines the
    // direction of the subdivision; if the rectangle is taller than wide, the
    // subdivision should be a horizontal slice, otherwise it should be a
    // vertical slice.
    const aspectRatio = h/w;

    let subRectA = undefined;
    let subRectB = undefined;
    
    if (aspectRatio <= 1) {
        // Vertical slice
        subRectA = {
            "x": x,
            "y": y,
            "w": w * proportionA,
            "h": h,
        };
        subRectB = {
            "x": x + subRectA.w,
            "y": y,
            "w": w * proportionB,
            "h": h,
        };
    } else {
        // Horizontal slice
        subRectA = {
            "x": x,
            "y": y,
            "w": w,
            "h": h * proportionA,
        };
        subRectB = {
            "x": x,
            "y": y + subRectA.h,
            "w": w,
            "h": h * proportionB,
        };
    }

    // Repeat the subdivision process for any children of this rectangle.
    const rectsA = createTreemapRects(
        treemap.childA,
        subRectA.x,
        subRectA.y,
        subRectA.w,
        subRectA.h
    );
    const rectsB = createTreemapRects(
        treemap.childB,
        subRectB.x,
        subRectB.y,
        subRectB.w,
        subRectB.h
    );

    return rectsA.concat(rectsB);
}

/**
 * For all sets of treemap rectangles stored in the global treemaps object,
 * render the rectangles onto the page.
 *
 * Since we know which tier each treemap is from, we can also add a heading
 * above each one to describe the scope of the treemap.
 */
const drawTreemaps = function drawTreemaps() {
    const treemapsDiv = global.elements.treemaps;
    UTIL.emptyElement(treemapsDiv);

    const tiers = Object.keys(global.treemapRectTiers).reverse();
    for (let i = 0; i < tiers.length; i++) {
        const tier = tiers[i];
        const treemapSvg = createTreemapSvg(
            global.treemapRectTiers[tier],
            800,
            800
        );

        const tierBoundary = Math.pow(10, parseInt(tier)+1);
        const heading = document.createElement('h2');
        heading.innerHTML = `Tags with fewer than ${tierBoundary} fics`
        treemapsDiv.appendChild(heading);
        treemapsDiv.appendChild(treemapSvg);
    }
}

/**
 * Given a list of labelled treemap rectangles, assemble them into an SVG of the
 * given dimensions.
 *
 * This method assumes that the treemap rectangles are defined on a unit square,
 * and uses a linear scale function to scale them up to the given display
 * dimensions.
 *
 * @param {Object[]} rects
 * @param {number} displayWidth
 * @param {number} displayHeight
 * @return {SvgElement}
 */
const createTreemapSvg = function createTreemapSvg(
    rects,
    displayWidth,
    displayHeight
) {
    // Define scale functions to scale the unit square up to the display
    // dimensions.
    const scaleX = x => x * displayWidth;
    const scaleY = y => y * displayHeight;

    const ns = global.svgNamespace;
    const svg = document.createElementNS(ns, 'svg');

    //svg.setAttribute('viewBox', '0 0 1000 10000');
    svg.style.width = `${displayWidth}px`;
    svg.style.height = `${displayHeight}px`;
    svg.style.margin = '0 0 2.5% 0';

    const highestWeight = rects.sort(
        (rectA, rectB) => rectA.weight - rectB.weight
    ).reverse()[0].weight;

    rects.forEach(
        rect => {
            // Scale up the rectangle's coordinates (currently defined on a unit
            // square) to the dimensions of the SVG.
            const x = scaleX(rect.x);
            const y = scaleY(rect.y);
            const w = scaleX(rect.w);
            const h = scaleY(rect.h);

            // Create the text to go into the rectangle, scaled according to the
            // rectangle's width. This scaling isn't perfect, but close enough.
            const text = document.createElementNS(ns, 'text');
            const fontSize = Math.max(w / 8, 10);
            const textString = `${rect.label}`;

            text.setAttribute('x', x + 2);
            text.setAttribute('y', y + fontSize);
            text.setAttribute('font-size', `${fontSize}px`);
            text.setAttribute('fill',  'hsl(0, 0%, 5%)');

            let tspanStrings = textString.split(' ');
            if (rect.label.charAt(0) === '<') {
                tspanStrings = [textString];
            } 

            const tspans = tspanStrings.map(
                string => {
                    const tspan = document.createElementNS(ns, 'tspan');
                    tspan.setAttribute('font-weight', 'bold');
                    tspan.innerHTML = string;
                    return tspan;
                }
            );

            for (let i = 0; i < tspans.length; i++) {
                tspans[i].setAttribute('x', x + 2);
                if (i > 0) {
                    tspans[i].setAttribute('dy', fontSize);
                }
            }

            const weightTspan = document.createElementNS(ns, 'tspan');
            const weightTspanFontSize = Math.max(fontSize / 2, 8);
            weightTspan.setAttribute('x',  x + 2);
            weightTspan.setAttribute('dy', fontSize * 0.75);
            weightTspan.setAttribute('font-size', `${weightTspanFontSize}px`);
            weightTspan.innerHTML = `(${rect.weight} fics)`;

            tspans.forEach(tspan => text.appendChild(tspan));
            text.appendChild(weightTspan);

            // Create the rectangle itself. The rectangle is colored using a
            // color derived from the rectangle's label.
            const svgRect = document.createElementNS(ns, 'rect');

            //const weightCoefficient = rect.weight / highestWeight;
            const color = md5ToHsl(md5(rect.label));
            color.s = Math.min(Math.max(75, color.s), 90);
            color.l = Math.min(Math.max(75, color.l), 90);

            svgRect.setAttribute('x', x);
            svgRect.setAttribute('y', y);
            svgRect.setAttribute('width', w);
            svgRect.setAttribute('height', h);
            svgRect.setAttribute('title', rect.label + ` (${rect.weight})`);
            svgRect.setAttribute(
                'fill',
                `hsl(${color.h}, ${color.s}%, ${color.l}%)`
            );
            svgRect.setAttribute(
                'stroke',
                `hsl(${color.h}, ${color.s/2}%, ${color.l/2}%`
            );
            svgRect.setAttribute('stroke-width', '2');

            const g = document.createElementNS(ns, 'g');

            g.appendChild(svgRect);
            g.appendChild(text);

            svg.appendChild(g);
        }
    );

    return svg;
};

/**
 * Return the sum of all elements in the given array.
 *
 * @param {number[]} array
 * @return {number}
 */
const sum = function sum(array)  {
    return array.reduce((accumulator, current) => accumulator + current, 0);
};

/**
 * Given an MD5 hash, convert it into an HSL color string.
 *
 * @param {string} hash
 * @return {string}
 */
const md5ToHsl = function md5ToHsl(hash) {
    const hslHex = {
        "h": `0x${hash.substr(0, 2)}`,
        "s": `0x${hash.substr(2, 2)}`,
        "l": `0x${hash.substr(4, 2)}`,
    };

    const hslDec = {
        "h": parseInt(hslHex.h, 16),
        "s": parseInt(hslHex.s, 16),
        "l": parseInt(hslHex.l, 16),
    };

    const hsl = {
        "h": 360 * (hslDec.h / 255),
        "s": 100 * (hslDec.s / 255),
        "l": 100 * (hslDec.l / 255),
    };

    return hsl;
};

window.onload = initialize;
window.onresize = drawTreemaps;
