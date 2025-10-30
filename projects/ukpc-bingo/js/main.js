var bingoNamespace = undefined;
var loadedItems = [];
var items = [];
var checked = [];

async function initialize(namespace, ...dataUrls)
{
    const sheetDiv = document.querySelector("#sheet");
    const genButton = document.querySelector("#generateButton");
    if (dataUrls === undefined) {
        throw new Error("Cannot initialize application - the initialize function must be called with one or more data urls");
    }

    if (namespace === undefined) {
        throw new Error("Cannot initialize application - the initialize function must be called with a bingo namespace to identify the variant");
    }

    bingoNamespace = namespace;

    for (let i = 0; i < dataUrls.length; i++) {
        const fileItems = await loadBingoItems(dataUrls[i]);
        loadedItems = loadedItems.concat(fileItems);
    }
            
    // Load bingo sheet state from local storage if present.
    // Object destructuring syntax requires parentheses
    const state = loadState(bingoNamespace);
    console.log(state);
    console.log(items);
    if (state !== null) {
        ({items, checked} = state);
    }

    // Generate randomized bingo sheet if none saved
    if (items.length === 0) {
        initItems();
    }
    if (checked.length === 0) {
        initChecked();
    }

    // Add click handler for generate button
    genButton.addEventListener("click", handleGenerate);

    // Draw bingo sheet
    drawBingoSheet(sheetDiv);
}

function initItems()
{
    items = sample(loadedItems, 25);
}

function initChecked()
{
    checked = [];
    for (let i = 0; i < 25; i++) {
        checked.push(false);
    }
}

/**
 * Load bingo items from text file, ignore empty lines and lines starting with #
 */
async function loadBingoItems(url)
{
    const response = await fetch(url);
    const data = await response.text();

    lines = data.split("\n");
    lines = lines.map(line => line.trim());
    lines = lines.filter(line => line !== "");
    const items = lines.filter(line => !line.startsWith("#"));

    return items;
}

/**
 * Draw bingo sheet to given container, emptying it first
 */
function drawBingoSheet(container)
{
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    if (items.length !== 25) {
        throw new Error(`Can't draw bingo sheet - exactly 25 items are required but ${items.length} provided`);
    }

    if (items.length !== checked.length) {
        throw new Error(`Can't draw bingo sheet - list of item checked statuses must be same length as list of items`);
    }

    const sheetTable = document.createElement('table');
    sheetTable.className = "sheet";

    let itemIdx = 0;
    for (let j = 0; j < 5; j++) {
        const sheetRow = document.createElement('tr');
        for (let i = 0; i < 5; i++) {
            const sheetCell = document.createElement('td');
            sheetCell.innerHTML = items[itemIdx];
            //if (itemIdx === 12) {
                //sheetCell.innerHTML = "<strong>FREE</strong>";
            //}

            if (checked[itemIdx]) {
                sheetCell.className = "checked";
            }
            sheetCell.dataset.idx = itemIdx;
            sheetCell.addEventListener("click", handleCheck);

            sheetRow.appendChild(sheetCell);
            itemIdx++;
        }
        sheetTable.appendChild(sheetRow);
    }

   container.append(sheetTable); 
}

/**
 * Handle checking of bingo square
 */
function handleCheck(evt)
{
    const square = evt.target;
    const squareIdx = square.dataset.idx

    // Toggle square, save state
    if (square.className === "checked") {
        square.className = "";
        checked[squareIdx] = false;
    } else {
        square.className = "checked";
        checked[squareIdx] = true;
    }

    saveState(bingoNamespace);
}

function handleGenerate(evt)
{
    const sheetDiv = document.querySelector("#sheet");

    localStorage.removeItem(bingoNamespace);
    initItems();
    initChecked();
    drawBingoSheet(sheetDiv);
}

/**
 * Load bingo sheet state from local storage if present.
 *
 */
function loadState(namespace)
{
    const json = localStorage.getItem(namespace);
    if (json === null) {
        return null;
    }

    return JSON.parse(json);
}

/**
 * Save the current bingo sheet items (including which ones are checked) to
 * local storage, so that the sheet can be recreated if the page is refreshed.
 *
 * localStorage is specific to the document's web domain - this means that
 * different pages will still use the same local storage. That caused a problem
 * before when I had multiple different bingo variants on the same domain. To
 * fix this, a namespace must be supplied to identify the variant.
 */
function saveState(namespace)
{
    const state = {
        "items": items,
        "checked": checked,
    };

    localStorage.setItem(namespace, JSON.stringify(state));
}

function sample(items, amount)
{
    const remainingItems = items.map(item => item);
    const sampledItems = [];

    for (let i = 0; i < amount; i++) {
        const randomIdx = rnd(remainingItems.length);
        sampledItems.push(remainingItems.splice(randomIdx, 1)[0]);
    }

    return sampledItems;
}

function rnd(max)
{
    return Math.floor(Math.random() * max);
}
