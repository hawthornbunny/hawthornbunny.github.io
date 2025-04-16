/*******************************************************************************
 * Reusable interface elements.
 ******************************************************************************/

/**
 * Given a list of option records, create a panel with a list of labelled
 * checkbox options.
 *
 * @param {Object[]}
 * @param {function} nameFunc
 * @return {Element}
 */
const createOptionListSelector = function createOptionListSelector(optionRecords)
{
    const selectorPanel = create('div', 'option-list-selector');

    const options = [];

    for (let i = 0; i < optionRecords.length; i++) {
        const optionRecord = optionRecords[i];
        const option = createOption(optionRecord);
        append(selectorPanel, option);
    }

    return selectorPanel;
};

/**
 * Given an option record, create a panel with a checkbox, a label, and a
 * description of the option beneath the label.
 *
 * @param {Object[]} name
 * @param {boolean} checked
 * @return {Element}
 */
const createOption = function createOption(optionRecord, checked)
{
    if (checked === undefined) {
        checked = false;
    }

    const optionPanel = create('div', 'option-panel');
    const descPanelLabel = create('label');
    const descPanel = create('div', 'desc-panel');
    const checkbox = create('input');
    
    setProps(descPanelLabel, {'htmlFor': optionRecord.id});
    setProps(checkbox, {'id': optionRecord.id, 'type': 'checkbox'});
    if (checked) {
        checkbox.checked = true;
    }

    const titleP = create('p', 'option-title');
    titleP.innerHTML = `<strong>${optionRecord.title}</strong>`;
    const descP = create('p', 'option-desc');
    descP.innerHTML = `${optionRecord.description}`;

    append(descPanel, titleP, descP);
    append(descPanelLabel, descPanel);
    append(optionPanel, checkbox, descPanelLabel);

    return optionPanel;
};

/**
 * Create a vertical filter list for the given set of values, with a "Select
 * all/none" checkbox at the top.
 *
 * @param {string} filterTitle
 * @param {Object[]} optionRecords
 */
function createFilterList(filterTitle, optionRecords)
{
    const listPanel = create('div', 'filter-list-panel');

    // Anonymous function to create a labeled checkbox, with optional toggle
    // handler.
    const createLabeledCheckbox = (id, title, toggleHandler) => {
        const labeledCheckbox = create("div", "filter-labeled-checkbox");
        const checkbox = create("input");
        const label = create("label");
        setProps(checkbox, {"id": id, "type": "checkbox"});                          
        setProps(label, {"htmlFor": id, "innerHTML": title}); 

        if (toggleHandler !== undefined) {
            checkbox.addEventListener("change", toggleHandler);
        }

        append(labeledCheckbox, checkbox, label)

        return labeledCheckbox;
    };

    // Anonymous toggle handler for the "Select all/none" checkbox.
    const handleSelectAllNone = evt => {
        const selectAllNoneCheckbox = evt.currentTarget;

        optionRecords.forEach(record => {
            const checkbox = query(`#${record.id}`);
            checkbox.checked = selectAllNoneCheckbox.checked;
        });
    };

    const filterTitleElement = create('div', 'filter-title');
    const filterList = create('div', 'filter-list');
    filterTitleElement.innerHTML = filterTitle;

    // Create the "Select all/none" checkbox and attach a toggle handler that
    // sets/unsets all of the checkboxes in the filter list.
    const selectAllNone = createLabeledCheckbox(
        `${filterTitle}-selectAllNone`,
        "<strong>Select all/none</strong>",
        handleSelectAllNone
    );

    append(filterList, selectAllNone);

    // Create the filter list.
    for (let i=0; i < optionRecords.length; i++) {
        const optionRecord = optionRecords[i];
        const filterOption = createLabeledCheckbox(optionRecord.id, optionRecord.title) 

        append(filterList, filterOption);
    }

    append(listPanel, filterTitleElement, filterList);

    return listPanel;
}

function createCheckableOptionsList(checkableOptions)
{
    const optionsPanel = create('div', 'checkable-options-panel');

    for (let i=0; i < checkableOptions.length; i++) {
        const checkableOption = checkableOptions[i];
        const renderedCheckableOption = checkableOption.render();
        append(optionsPanel, renderedCheckableOption);
    }

    return optionsPanel;
}
