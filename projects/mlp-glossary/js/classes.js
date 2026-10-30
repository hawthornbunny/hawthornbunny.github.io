/**
 * Represents an indexable table, similar to those in a relational database.
 * A Table stores a set of record objects and enforces the following
 * restrictions on them:
 *
 * - Each record must have the same set of field names (defined at table
 *   creation).
 * - Each record must have a unique index (derived from the record's field
 *   values). The fields used to derive a record's index are defined at table
 *   creation.
 *
 * These two restrictions provide the following benefits:
 *
 * - Every record in the table is guaranteed to be unique.
 * - Any record in the table can be located by its unique index: if you know the
 *   index, you can obtain the entire record.
 * - If it is possible to derive the index for another table from a record in
 *   this table, a relationship can be formed between the two tables.
 */
class Table
{
    /**
     * Create a new table.
     *
     * @param fields {string[]} A list of all fields that records must contain.
     * @param indexFields {string[]} Fields used to derive a unique index.
     */
    constructor(fields, indexFields)
    {
        this.fields = fields;
        this.indexFields = indexFields;
        this.records = {};
        this.relations = [];
    }

    /**
     * Add a new record to this table. The record's index will be automatically
     * generated using the defined index fields.
     *
     * An error will be thrown if the record's fields don't match the table's
     * field definition, or if a record with the same index already exists in
     * the table.
     *
     * @param {Object} record
     */
    add(record)
    {
        // Derive a unique index from the record's fields, as a list of field
        // values.
        const index = this.deriveRecordIndex(record);

        // Turn the index into an index string, so that we can use it as a
        // dictionary key.
        const indexString = Table.createIndexString(index);

        // Verify that the record being added has the expected fields
        for (let i = 0; i < this.fields.length; i++) {
            const field = this.fields[i];
            if (record[field] === undefined) {
                throw new Error(`Cannot add record with index string "${indexString}" to table - record does not have required field "${field}"`);
            }
        }

        // Verify that the record being added does not have any unexpected
        // fields
        const recordFields = Object.keys(record);
        for (let i = 0; i < recordFields.length; i++) {
            const recordField = recordFields[i];
            if (!this.fields.includes(recordField)) {
                throw new Error(`Cannot add record with index string "${indexString}" to table - record contains unexpected field "${recordField}". Expected fields are: ${this.fields.join(', ')}`);
            }
        }

        // Verify that the same record isn't being added twice
        if (this.records[indexString] !== undefined) {
            throw new Error(`Cannot add record with index string "${indexString}" to table - a record with that index already exists`);
        }

        // Add relationships as additional properties on the record.
        record._rel = {};
        for (let i = 0; i < this.relations.length; i++) {
            const relation = this.relations[i];
            // Look up the related record in the other table, if one exists.
            const relatedIndex = relation.indexFields.map(field => record[field]);
            const relatedRecord = relation.table.get(relatedIndex);
            if (relatedRecord !== undefined) {
                record._rel[relation.name] = relatedRecord;
            }
        }

        // Add a reference to the table itself.
        record._parent = this;

        // Add the record.
        this.records[indexString] = record;
    }

    /**
     * Return the record with the given index. The index must be specified as a
     * list of index fields, even if there's only one field.
     *
     * @param {string[]} indexFields
     * @return {Object}
     */
    get(fieldValues)
    {
        const index = Table.createIndexString(fieldValues);

        return this.records[index];
    }

    /**
     * Return true if the table contains a record with the given index
     * (specified as a list of index fields).
     *
     * @param {string[]} indexFields
     * @return {boolean}
     */
    has(indexFields)
    {
        return this.get(indexFields) !== undefined;
    }

    /**
     * Iterate over each record in the table and call func(record) on each.
     *
     * @param func
     */
    forEach(func)
    {
        const indexStrs = Object.keys(this.records);
        for (let i = 0; i < indexStrs.length; i++) {
            const indexStr = indexStrs[i];
            const record = this.records[indexStr];
            func(record);
        }
    }

    /**
     * Return a list of all record objects in the table.
     *
     * @param func
     */
    all()
    {
        const values = Object.values(this.records);

        return values.sort();
    }

    /**
     * Return a list containing the value of func(record) for each record in the
     * table.
     *
     * @param func
     */
    map(func)
    {
        const values = Object.values(this.records).sort();

        return values.map(func);
    }

    /**
     * Return a list of all records which return true for the given function.
     *
     * @param func
     * @return {Object[]}
     */
    filter(func)
    {
        return Object.values(this.records).filter(func);
    }

    /**
     * Return a list of all records for which the given field partially or fully
     * matches the given term.
     *
     * @param {string} fieldName
     * @param {string} term
     * @return {Object[]}
     */
    where(fieldName, term)
    {
        const records = this.filter(record => 
            Table.isPartialStringMatch(term, record[fieldName])
        );

        // Sort the records to ensure the output is predictable (otherwise it
        // depends on JavaScript's object iteration order).
        return records.sort();
    }

    /**
     * Derive an index for the given record, represented as a list of field
     * values.
     *
     * @return {string[]}
     */
    deriveRecordIndex(record)
    {
        return this.indexFields.map(field => record[field]);
    }

    /**
     * Add a relationship. A relationship maps each record in this table to a
     * single record in another table, by deriving an index from each record
     * and looking up the record with that index in the other table.
     *
     * For example, every glossary entry has a category field, and each entry in
     * the categories table is indexed by a unique category field - therefore,
     * we can form a relationship between the glossary and category tables by
     * using the category field as an index.
     *
     * @param name {string}
     * @param table {Table}
     * @param indexFields {string[]}
     */
    addRelation(name, table, indexFields)
    {
        this.relations.push({
            name: name,
            table: table,
            indexFields: indexFields,
        });
    }

    /**
     * Create a unique index string from the given list of field values.
     *
     * @param record {string[]}
     * @return {string}
     */
    static createIndexString(values)
    {
        return values.join('-');
    }

    /**
     * Return true if stringA is a partial match for stringB. A string is a
     * partial match if it occurs as a substring of another string. Casing is
     * not considered.
     *
     * @param {string} stringA
     * @param {string} stringB
     * @return {boolean}
     */
    static isPartialStringMatch(stringA, stringB)
    {
        return stringB.toLowerCase().includes(stringA.toLowerCase());
    }
}

/**
 * Represents a collection of pairs of things, such that one can always
 *
 * Represents a 2-way mapping between two things, for example a checkbox id and
 * the data associated with that checkbox.
 *
 *     const mapping = new Mapping("id", "data");
 *     mapping.add("media-EqG", eqgData)
 *
 */
class PairSet
{
    constructor(fieldNameA, fieldNameB)
    {
        
    }

    add(itemA, itemB)
    {
        this.pairs.push([itemA, itemB]);
    }

    getOther(item)
    {
        
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
