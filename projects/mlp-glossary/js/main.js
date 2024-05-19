/*******************************************************************************
 * mlp-glossary: Searchable My Little Pony glossary and wordlist generator
 * by hawthornbunny
 *
 * ## Indexing
 * The raw glossary data is unindexed; it's simply a flat list of records. To
 * make it possible to reference specific records, the application creates a
 * simple index by generating a unique key for each record using the media,
 * category, and item fields. This also ensures that those fields must be
 * unique.
 *
 * Once indexed, it's possible to connect glossary records to records in other
 * tables, such as the aliases table which holds lists of aliases for certain
 * records.
 *
 * ## Aliases
 * The application builds a mapping from search term aliases to glossary
 * records (or more precisely, to glossary keys).
 *
 * ## To-do
 * - Consider a global "tables" collection for all jsonl tables.
 ******************************************************************************/

var global = {
    // A collection of glossary records, indexed by a unique key. Using an index
    // enables us to cross-reference glossary entries with other tables, and it
    // also allows us to detect and prevent duplicate entries.
    'indexedGlossary': {},

    // A mapping from alias keys to glossary keys. This allows a glossary record
    // to have multiple alternate names.
    'aliasesToGlossary': {},

    // A collection of premade "deck" objects. Each deck contains a number of
    // pre-selected glossary items. A check is performed on load to ensure the
    // glossary contains those items.
    'premadeDecks': {},

    // A collection of property values, indexed by property name. For the
    // glossary, the possible properties are media, category, item, and
    // description. These property sets are used to populate the glossary deck
    // generator. In practice, we only care about
    //
    // A collection of glossary record properties that have been validated by
    // the application, and their permitted values. The properties that require
    // validation are "media" and "category", whose permitted values are listed
    // in `data/media.json` and `data/categories.json` respectively. Glossary
    // entries that use non-permitted values will cause a validation failure.
    //
    // These properties are also used to populate the filters for the glossary
    // deck generator.
    'validatedProperties': {},
    'urls': {
        'aliases': 'data/aliases.jsonl',
        'categories': 'data/categories.jsonl',
        'glossary': 'data/glossary.jsonl',
        'media': 'data/media.jsonl',
        'decks': 'data/decks.json',
    }
}
/**
 * Entry function. Load the glossary data files and start the application.
 */
const startApplication = async function startApplication()
{
    test();

    await loadGlossary();
    await loadPremadeDecks();
};

/**
 * Load the glossary data and associated table files into global storage.
 * Perform validation checks to ensure the glossary data is valid.
 */
const loadGlossary = async function loadGlossary()
{
    // Load all data tables.
    const glossaryRecords = await fetchJsonl(global.urls.glossary);
    const aliasRecords = await fetchJsonl(global.urls.aliases);
    const mediaRecords = await fetchJsonl(global.urls.media);
    const categoryRecords = await fetchJsonl(global.urls.categories);

    // Check if any glossary entries are missing any fields. Every glossary
    // entry is required to have all fields filled.
    const glossaryRecordsWithEmptyFields = getRecordsWithEmptyFields(
        glossaryRecords, 'media', 'category', 'item', 'description'
    );

    if (glossaryRecordsWithEmptyFields.length > 0) {
        const recordsWithEmptyFieldsLabels = recordsWithEmptyFields.map(record => `${record.item} (${record.media})`);
        throw new Error(`Cannot load glossary; some records are missing field values: ${recordsWithEmptyFieldsLabels.join(', ')}`);
    }

    // Build the glossary and alias indices.
    const indexedGlossary = indexRecords(glossaryRecords, 'media', 'category', 'item');
    const indexedAliases = indexRecords(aliasRecords, 'media', 'category', 'item');

    // Create a mapping from alias entries to the keys of the glossary records
    // they are aliases for.
    const aliasesToGlossary = {};
    for (const key in indexedAliases) {
        const aliasRecord = indexedAliases[key];

        // Any key in the aliases table must also be in the glossary; if it
        // isn't, then we could end up trying to look up a nonexistent glossary
        // key, which we don't want. Throw an error if a nonexistent key is
        // detected.
        if (indexedGlossary[key] === undefined) {
            throw new Error(`Cannot load aliases; alias "${aliasRecord.item} (${aliasRecord.media})" does not have a corresponding glossary record`);
        }

        for (let i = 0; i < aliasRecord.aliases.length; i++) {
            const alias = aliasRecord.aliases[i];
            aliasesToGlossary[alias] = key;
        }
    }

    // Validate the media and category properties on each glossary entry. Throw
    // an error if any unknown media values are found. Also keep a count of how
    // many times each property is used in the glossary, so that we can identify
    // unused ones.
    const permittedPropertyValues = {
        'media': mediaRecords.map(record => record.abbreviation),
        'category': categoryRecords.map(record => record.category),
    };
    const propertyCounts = {
        'media': {},
        'category': {},
    };
     
    for (const propertyName in permittedPropertyValues) {
        const permittedValues = permittedPropertyValues[propertyName];
        for (const key in indexedGlossary) {
            const glossaryRecord = indexedGlossary[key];
            const glossaryValue = glossaryRecord[propertyName];
            if (!contains(permittedValues, glossaryValue)) {
                throw new Error(`Validation failure; invalid ${propertyName} value "${glossaryValue}" for glossary record ${key}`);
            }

            if (propertyCounts[propertyName][glossaryValue] === undefined) {
                propertyCounts[propertyName][glossaryValue] = 0;
            }

            propertyCounts[propertyName][glossaryValue]++;
        }
    }

    // Check if there are any media or category property values that aren't
    // being used, or which contain characters that are reserved for delimiters.
    const validatedProperties = {};

    for (const propertyName in permittedPropertyValues) {
        if (propertyName.includes('_')) {
            throw new Error(`Validation error: ${propertyName} contains the character "_", which is a reserved delimiter`);
        }
        const permittedValues = permittedPropertyValues[propertyName];
        const propertyCount = propertyCounts[propertyName];
        const usedValues = Object.keys(propertyCount);
        
        validatedProperties[propertyName] = usedValues;
        for (let i = 0; i < permittedValues.length; i++) {
            const permittedValue = permittedValues[i];
            if (!contains(usedValues, permittedValue)) {
                throw new Error(`Validation error: ${propertyName} value "${permittedValue}" is defined but not used in the glossary`);
            }
            if (permittedValue.includes('_')) {
                throw new Error(`Validation error: ${propertyName} value "${permittedValue}" contains the character "_", which is a reserved delimiter`);
            }
        }
    }

    // Check that the property names aren't using any invalid characters. We
    // reserve some characters for use as delimiters.
    for (const propertyName in validatedProperties) {
    }

    global.indexedGlossary = indexedGlossary;
    global.aliasesToGlossary = aliasesToGlossary;
    global.validatedProperties = validatedProperties;
};

/**
 * Load all decks from the curated decks file and store them in global storage.
 * A check is run on the deck's items to ensure that they correspond to items in
 * the glossary; this helps to catch when changes are made to the glossary
 * without updating the decks file.
 */
const loadPremadeDecks = async function loadPremadeDecks()
{
    const decks = await fetchJson(global.urls.decks);
    const premadeDecks = {};

    for (let i = 0; i < decks.length; i++) {
        const deck = decks[i];
        for (let j = 0; j < deck.items.length; j++) {
            const item = deck.items[j];
            const itemKey = makeCompositeKey(...item);
            if (global.indexedGlossary[itemKey] === undefined) {
                throw new Error(`Cannot load deck "${deck.name}"; key ${itemKey} was not found in glossary`);
            }
        }
        premadeDecks[deck.name] = deck;
    }

    global.premadeDecks = premadeDecks;
}

/**
 * Fetch a JSON file and return the object parsed from it.
 *
 * @param {string} url
 * @return {Object[]}
 */
const fetchJson = async function fetchJson(url)
{
    return await fetch(url).then(response => response.json());
};

/**
 * Fetch a JSON Lines (jsonl) file and return the data array parsed from it.
 *
 * @param {string} url
 * @return {Object[]}
 */
const fetchJsonl = async function fetchJsonl(url)
{
    const jsonl = await fetch(url).then(response => response.text());
    return parseJsonl(jsonl);
};

/**
 * Parse a string in JSON Lines (jsonl) format and return the data array parsed
 * from it.
 *
 * @param {string} jsonl
 * @return {Object[]}
 */
const parseJsonl = function parseJsonl(jsonl)
{
    const lineSeparator = '\n';
    const lines = jsonl.split(lineSeparator)
    const headerLine = lines[0];
    const parsedHeaderLine = JSON.parse(headerLine);

    // Remove header line
    let dataLines = lines.slice(1);
    dataLines = dataLines.map(line => line.trim());
    dataLines = dataLines.filter(line => line.length > 0);

    const records = [];
    for (let i = 0; i < dataLines.length; i++) {
        const dataLine = dataLines[i];

        let parsedDataLine = undefined;
        try {
            parsedDataLine = JSON.parse(dataLine);
        } catch (e) {
            e.message += `. JSON line: ${dataLine}`;
            throw e;
        }

        const record = {};
        for (let j = 0; j < parsedDataLine.length; j++) {
            if (j >= headerLine.length) {
                continue;
            }
            const fieldName = parsedHeaderLine[j];
            const fieldValue = parsedDataLine[j];

            record[fieldName] = fieldValue;
        }

        records.push(record);
    }

    return records;
};

/**
 * Given an array of data record objects, return those records indexed by one or
 * more of the records' fields. If multiple keys are given, the records will be
 * indexed by a composite key generated by concatenating the record's fields
 * together, separated by hyphens.
 *
 * Indexing the records requires that it be possible to generate unique keys for
 * each record. If any records would have the same key, an error is thrown.
 *
 * @param {Object[]} records
 * @param {...string} keys
 * @return {Object}
 * @throws {Error}
 */
const indexRecords = function indexRecords(records, ...keys)
{
    if (keys.length === 0) {
        throw new Error('Cannot index records; no keys given to index by')
    }

    const indexedRecords = {};
    for (let i = 0; i < records.length; i++) {
        const record = records[i];
        const keyComponents = keys.map(key => record[key]);
        const compositeKey = makeCompositeKey(...keyComponents);

        if (indexedRecords[compositeKey] !== undefined) {
            throw new Error(`Cannot index records; two records would have the same composite key (${compositeKey})`)
        }

        indexedRecords[compositeKey] = record; 
    }

    return indexedRecords;
};

/**
 * Given a list of string parameters, transform them into a composite key
 * consisting of a single string.
 *
 * @param {...string} keyComponents
 * @return {string}
 */
const makeCompositeKey = function makeCompositeKey(...keyComponents)
{
    return keyComponents.join('-');
};

/**
 * Given an array of data record objects, return those records whose values
 * appear more than once in the array. The `keys` parameter specifies which
 * fields to consider when checking for duplicates.
 *
 * @param {Object[]} records
 * @param {...string} keys
 * @return {Object[]}
 */
const getDuplicateRecords = function getDuplicateRecords(records, ...keys)
{
    const ledger = {};
    const duplicateRecords = [];
    for (let i = 0; i < records.length; i++) {
        const record = records[i];
        const keyComponents = keys.map(key => record[key]);
        const ledgerKey = keyComponents.join('-');

        if (ledger[ledgerKey] !== undefined) {
            duplicateRecords.push(record);
        }
        ledger[ledgerKey] = record;
    }

    return duplicateRecords;
};

/**
 * Given an array of data record objects, return those records which have empty
 * values for the given fields.
 *
 * @param {Object[]} records
 * @param {...string} fields
 * @return {Object[]}
 */
const getRecordsWithEmptyFields = function getRecordsWithEmptyFields(records, ...fields)
{
    const recordsWithEmptyFields = [];
    for (let i = 0; i < records.length; i++) {
        const record = records[i];
        const emptyFields = fields.filter(field => record[field].trim() == '');

        if (emptyFields.length > 0) {
            recordsWithEmptyFields.push(record);
        }
    }

    return recordsWithEmptyFields;
};

/**
 * Search the given indexed glossary for the given string, and return an array
 * of search result objects. Also search the given alias-to-glossary mapping and
 * include any additional results obtained from that, along with the specific
 * aliases that were matched for each.
 *
 * @param {string} string
 * @param {Object} indexedGlossary
 * @param {Object} aliasesToGlossary
 * @return {SearchResult[]}
 */
const getSearchResults = function getSearchResults(string, indexedGlossary, aliasesToGlossary)
{
    // Create an object to hold the search results, indexed by glossary key.
    // Indexing it ensures the search results are unique, and allows us to add
    // alias information to results if any of them are the result of an alias.
    const indexedSearchResults = {}; 
    const aliasedSearchResults = {}; 

    // Search the glossary for all matching records, and the alias mappings for
    // all matching aliases.
    const matchingGlossaryKeys = getKeysForMatchingRecords(string, 'item', indexedGlossary);
    const matchingAliases = getMatchingAliases(string, aliasesToGlossary);

    // Add the matching glossary records first, as these require no processing.
    for (let i = 0; i < matchingGlossaryKeys.length; i++) {
        const key = matchingGlossaryKeys[i];
        const record = indexedGlossary[key];
        const searchResult = new SearchResult(record.media, record.category, record.item, record.description);
        indexedSearchResults[key] = searchResult;
    }

    // Add the aliased records. If the aliased record was already found in the
    // glossary, ignore it. If the aliased record was already found under a
    // different alias, add this new alias to its list.  Otherwise, add the
    // aliased record and add this alias to its list.
    for (const alias in matchingAliases) {
        const glossaryKey = matchingAliases[alias];
        assert(glossaryKey !== undefined, alias);

        if (indexedSearchResults[glossaryKey] !== undefined) {
            continue;
        }

        let searchResult = aliasedSearchResults[glossaryKey];
        if (searchResult === undefined) {
            const record = indexedGlossary[glossaryKey];
            searchResult = new SearchResult(record.media, record.category, record.item, record.description);
        }

        searchResult.addAlias(alias);
        aliasedSearchResults[glossaryKey] = searchResult;
    }

    for (const key in aliasedSearchResults) {
        indexedSearchResults[key] = aliasedSearchResults[key];
    }

    return indexedSearchResults;

};

/**
 * Given an indexed collection of data records, return the keys of all records
 * for which the given field matches the given string.
 *
 * @param {string} string
 * @param {string} field
 * @param {Object} indexedRecords
 * @return {Object[]}
 */
const getKeysForMatchingRecords = function getKeysForMatchingRecords(string, field, indexedRecords)
{
    const recordKeys = Object.keys(indexedRecords);

    return recordKeys.filter(key => hasMatchingField(indexedRecords[key], field, string));
};

/**
 * Search the alias-to-glossary mapping for the given string, and return an
 * alias-to-glossary mapping for only those aliases that match the string.
 *
 * @param {Object} aliasesToGlossary
 * @param {Object} indexedGlossary
 * @return {Object}
 */
const getMatchingAliases = function getMatchingAliases(string, aliasesToGlossary)
{
    const aliasKeys = Object.keys(aliasesToGlossary);
    const matchingAliasKeys = aliasKeys.filter(key => isPartialStringMatch(string, key));
    
    const matchingAliases = {};
    for (let i = 0; i < matchingAliasKeys.length; i++) {
        const alias = matchingAliasKeys[i];
        const glossaryKey = aliasesToGlossary[alias];
        matchingAliases[alias] = glossaryKey;
    }

    return matchingAliases;
};

/**
 * Return true if the given record has a field with the given name that matches
 * the given value.
 *
 * @param {Object} record
 * @param {string} field
 * @param {string} value
 * @return {boolean}
 */
const hasMatchingField = function hasMatchingField(record, field, value)
{
    if (record[field]) {
        return isPartialStringMatch(value, record[field]);
    }

    return false;
};

/**
 * Return true if stringA is a partial match for stringB. A string is a partial
 * match if it occurs as a substring of another string. Casing is not
 * considered.
 *
 * @param {string} stringA
 * @param {string} stringB
 * @return {boolean}
 */
const isPartialStringMatch = function isPartialStringMatch(stringA, stringB)
{
    return stringB.toLowerCase().includes(stringA.toLowerCase());
};

/*******************************************************************************
 * Tests
 ******************************************************************************/
const test = function test()
{
    testIndexRecords();
};

const testIndexRecords = function testIndexRecords()
{
    let records = [
        {'media': 'FiM', 'category': 'character', 'item': 'Angel Bunny'},
        {'media': 'FiM', 'category': 'character', 'item': 'Fluttershy'},
        {'media': 'FiM', 'category': 'group', 'item': 'Power Ponies'},
        {'media': 'EqG', 'category': 'group', 'item': 'Shadowbolts'},
        {'media': 'EqG', 'category': 'character', 'item': 'Fluttershy'},
        {'media': 'G5', 'category': 'species', 'item': 'bunnicorn'},
    ];


    let indexedRecords = indexRecords(records, 'media', 'category', 'item');

    assert(indexedRecords['FiM-character-Angel Bunny'] !== undefined);
    assert(indexedRecords['FiM-character-Fluttershy'] !== undefined);
    assert(indexedRecords['FiM-group-Power Ponies'] !== undefined);
    assert(indexedRecords['EqG-group-Shadowbolts'] !== undefined);
    assert(indexedRecords['EqG-character-Fluttershy'] !== undefined);
    assert(indexedRecords['G5-species-bunnicorn'] !== undefined);

    assert(indexedRecords['FiM-character-Angel Bunny'].media === 'FiM');
    assert(indexedRecords['FiM-character-Angel Bunny'].category === 'character');
    assert(indexedRecords['FiM-character-Angel Bunny'].item === 'Angel Bunny');
    assert(indexedRecords['FiM-character-Fluttershy'].item === 'Fluttershy');
    assert(indexedRecords['FiM-group-Power Ponies'].item === 'Power Ponies');
    assert(indexedRecords['EqG-group-Shadowbolts'].item === 'Shadowbolts');
    assert(indexedRecords['EqG-character-Fluttershy'].item === 'Fluttershy');
    assert(indexedRecords['G5-species-bunnicorn'].item === 'bunnicorn');
};
