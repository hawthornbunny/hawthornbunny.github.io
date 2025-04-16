/**
 * Represents an indexable table, similar to those in a relational database.
 * Tables store a set of records, and protect their integrity by defining a list
 * of permitted fields and requiring a unique index for each record.
 *
 * Each record's index is a unique key derived from one or more of its fields.
 * This allows tables to reference other tables which contain the same indices.
 */
class Table
{
    constructor(name, fields, indexFields)
    {
        this.name = name;
        this.fields = fields;
        this.indexFields = indexFields;
        this.records = {};
    }

    /**
     * Add a new record to this table. An error will be thrown if the record's
     * fields don't match the table's field definition, or if a record with the
     * same index already exists in the table.
     *
     * @param {Object} record
     */
    add(record)
    {
        const keyComponents = this.indexFields.map(field => record[field]);
        const index =  keyComponents.join('-');

        // Verify that the record being added has the expected fields
        for (let i = 0; i < this.fields.length; i++) {
            const field = this.fields[i];
            if (record[field] === undefined) {
                throw new Error(`Cannot add record with index "${index}" to table "${this.name}"; record does not have required field "${field}"`);
            }
        }

        // Verify that the record being added does not have any unexpected
        // fields
        const recordFields = Object.keys(record);
        for (let i = 0; i < recordFields.length; i++) {
            const recordField = recordFields[i];
            if (!this.fields.includes(recordField)) {
                throw new Error(`Cannot add record with index "${index}" to table "${this.name}"; record contains unexpected field "${recordField}". Expected fields are: ${this.fields.join(', ')}`);
            }
        }

        // Verify that the same record isn't being added twice
        if (this.has(index)) {
            throw new Error(`Cannot add record with index "${index}" to table "${this.name}"; a record with that index already exists`);
        }

        this.records[index] = record;
    }

    /**
     * Return the record with the given index.
     *
     * @return {Object}
     */
    get(index)
    {
        return this.records[index];
    }

    /**
     * Return true if the table contains a record with the given index.
     *
     * @return {boolean}
     */
    has(index)
    {
        return this.records[index] !== undefined;
    }

    /**
     * Iterate over each index-record pair in the table and call
     * func(index, record) on each.
     *
     * @param func
     */
    forEach(func)
    {
        const indices = Object.keys(this.records);
        for (let i = 0; i < indices.length; i++) {
            const index = indices[i];
            const record = this.records[index];
            func(index, record);
        }
    }
}

/**
 * Represents a search result - ie. a glossary item as it is displayed to the
 * user.
 *
 * Sometimes, a search won't find a glossary item, but will find one or more of
 * its aliases (eg. searching for "cade" yields "Cadance", because it matches
 * the aliases "Cadence" and "Mi Amore Cadenza"). When a search matches this
 * way, we add the aliases to the search result so that the user can see why the
 * match occurred.
 */
class SearchResult
{
    constructor(media, category, item, description)
    {
        this.media = media;
        this.category = category;
        this.item = item;
        this.description = description;
        this.aliases = [];
    }

    /**
     * Add an alias to this search result.
     *
     * @param {string} alias
     */
    addAlias(alias)
    {
        this.aliases.push(alias)
    }
}

/**
 * Represents a mode of operation of the decks app.
 */
class Mode
{
    constructor()
    {
        // State information for the mode. This object should contain enough
        // information to reconstruct the mode's complete state at any time.
        this.state = undefined;

        // An object mapping checkbox ids to their checked/unchecked state (true
        // means checked). This is used to restore the mode's options after
        // redrawing the interface.
        this.checkboxStates = undefined;

        // The function used to draw the mode's interface.
        this.drawFunc = undefined;

        // The function used to update the mode's interface after it's already
        // been drawn, usually to reflect some change made by the user (eg. when
        // a checkbox is toggled).
        this.updateFunc = undefined;
    }
}

/**
 * Represents a checkable option (either checkbox or radio), along with extra
 * information such as an optional text field.
 */
class CheckableOption
{
    constructor(id, checkableType, labelText)
    {
        const allowedCheckableTypes = ['checkbox', 'radio'];

        if (!contains(allowedCheckableTypes, checkableType)) {
            throw new Error(`Cannot construct checkable option; invalid checkable type "${type}"`);
        }

        this.id = id;
        this.checkableType = checkableType;
        this.labelText = labelText;

        this.checkableGroup = undefined;
        this.fieldId = undefined;
        this.fieldDefaultValue = undefined;
    }

    setField(id, defaultValue)
    {
        this.fieldId = id;
        this.fieldDefaultValue = defaultValue;
    }

    setCheckableGroup(groupName)
    {
        this.checkableGroup = groupName;
    }

    /**
     * Create and return an element representing this option.
     */
    render()
    {
        if (this.checkableType === 'radio' && this.checkableGroup === undefined) {
            throw new Error(`Cannot render checkable option; option has type "{this.checkableType} but no group name was defined`);
        }

        const optionPanel = create('div', 'checkable-option');
        const checkable = create('input');
        const label = create('label');
        const labelText = this.labelText;

        setProps(checkable, {'id': this.id, 'type': this.checkableType});
        setProps(label, {'htmlFor': this.id, 'innerHTML': this.labelText});

        if (this.checkableGroup !== undefined) {
            checkable.name = this.checkableGroup;
        }

        append(optionPanel, checkable, label)

        if (this.fieldId !== undefined) {
            const field = create('input');
            setProps(field, {'id': this.fieldId, 'type': 'text'});

            if (this.fieldDefaultValue !== undefined) {
                field.value = this.fieldDefaultValue;
            }

            append(optionPanel, field);
        }

        return optionPanel;
    }
}
