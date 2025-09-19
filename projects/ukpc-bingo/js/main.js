var loadedItems = [];
var items = [];
var checked = [];

async function initialize(...dataUrls)
{
    const sheetDiv = document.querySelector("#sheet");
    const genButton = document.querySelector("#generateButton");
    if (dataUrls === undefined) {
        throw new Error("Cannot initialize application - the initialize function must be called with one or more data urls");
    }

    for (let i = 0; i < dataUrls.length; i++) {
        const fileItems = await loadBingoItems(dataUrls[i]);
        loadedItems = loadedItems.concat(fileItems);
    }
            
    //loadedItems = await loadBingoItems("data/bingo-items.txt");

    // Load bingo sheet state from local storage if present.
    // Object destructuring syntax requires parentheses
    ({items, checked} = loadState());

    // Generate randomized bingo sheet if none saved
    if (items === null) {
        initItems();
    }
    if (checked === null) {
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

    saveState();
}

function handleGenerate(evt)
{
    const sheetDiv = document.querySelector("#sheet");

    localStorage.clear();
    initItems();
    initChecked();
    drawBingoSheet(sheetDiv);
}

/**
 * Load bingo sheet state from local storage if present
 */
function loadState()
{
    function getJson(key) {
        const json = localStorage.getItem(key);
        if (json !== null) {
            return JSON.parse(json);
        }
        return null;
    }

    return {
        "items": getJson("items"),
        "checked": getJson("checked"),
    }
}

function saveState()
{
    localStorage.setItem("items", JSON.stringify(items));
    localStorage.setItem("checked", JSON.stringify(checked));
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
