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
 * TODO: Add option to decks mode to append the media abbreviation after the
 * item (eg. "Pinkie Pie (G3)"). This could allow for games which allow the
 * same character from different media.
 ******************************************************************************/

var tables = {};

var global = {
    // A collection of glossary records, indexed by a unique key. Using an index
    // enables us to cross-reference glossary entries with other tables, and it
    // also allows us to detect and prevent duplicate entries.
    "indexedGlossary": {},

    // A mapping from alias keys to glossary keys. This allows a glossary record
    // to have multiple alternate names.
    "aliasesToGlossary": {},

    // A collection of data tables. I aim to replace all the "indexed" objects
    // with tables, but for now I'm just using this for the media records as a
    // proof of concept.
    "tables": {},
    
    // A collection of premade "deck" objects. Each deck contains a number of
    // pre-selected glossary items. A check is performed on load to ensure the
    // glossary contains those items.
    "premadeDecks": {},

    // A collection of glossary record properties that have been validated by
    // the application, and their permitted values. The properties that require
    // validation are "media" and "category", whose permitted values are listed
    // in `data/media.json` and `data/categories.json` respectively. Glossary
    // entries that use non-permitted values will cause a validation failure.
    //
    // These properties are also used to populate the filters for the glossary
    // deck generator.
    "validatedProperties": {},

    // Patterns which will cause aliases to be auto-generated for matching
    // glossary items. For example, one of these patterns will detect the "Mr. "
    // part of "Mr. Cake", and automatically generate the aliases "Mr Cake" and
    // "Mister Cake", if they aren't already specified in the aliases file.
    "autoAliases": {
        " & ": [" and "],
        " 'n' ": [" and "],
        "^Dr\\. ": ["Dr ", "Doctor "],
        " Jr\\.": [" Jr", " Junior"],
        " Mc": [" Mac"],
        "^Mount ": ["Mt. ", "Mt "],
        "^Mr\\. ": ["Mr ", "Mister "],
        "^Mrs\\. ": ["Mrs "],
        "^Ms\\. ": ["Ms "],
    },
    // Various URLs for the data files.
    "urls": {
        "aliases": "data/aliases.jsonl",
        "categories": "data/categories.jsonl",
        "glossary": "data/glossary.jsonl",
        "media": "data/media.jsonl",
        "decks": "data/decks.json",
    },
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
    const loadedRecords = {
        glossary: await fetchJsonl(global.urls.glossary),
        aliases: await fetchJsonl(global.urls.aliases),
        media: await fetchJsonl(global.urls.media),
        categories: await fetchJsonl(global.urls.categories),
    };

    // Check if any glossary entries are missing any fields, and raise an error
    // if any are. This helps to catch oversights in the glossary.
    const incompleteRecords = getRecordsWithEmptyFields(
        loadedRecords.glossary, 'media', 'category', 'item', 'description'
    );

    if (incompleteRecords.length > 0) {
        const recordsWithEmptyFieldsLabels = incompleteRecords.map(record => `${record.item} (${record.media})`);
        throw new Error(`Cannot load glossary; some records are missing field values: ${recordsWithEmptyFieldsLabels.join(', ')}`);
    }

    // Create all tables.
    tables.glossary = new Table(
        ["media", "category", "item", "description"],
        ["media", "category", "item"]
    );

    tables.media = new Table(
        ["abbreviation", "name", "color", "description"],
        ["abbreviation"]
    );

    tables.categories = new Table(
        ["category", "description"],
        ["category"]
    );

    // Create a table that maps glossary items to aliases.
    tables.glossaryAliases = new Table(
        ["media", "category", "item", "alias"],
        ["media", "category", "item", "alias"]
    )

    // Add the glossary's relationships to other tables.
    tables.glossary.addRelation("category", tables.categories, ["category"]);
    tables.glossary.addRelation("media", tables.media, ["media"]);

    // Add a relationship mapping the glossaryAliases table to the glossary.
    tables.glossaryAliases.addRelation(
        "glossary", tables.glossary, ["media", "category", "item"]
    );

    // Add the loaded records to each table. The order matters here: categories
    // and media must be populated first, so that the glossary can fetch related
    // records from those tables when it gets populated.
    const addRecords = tableName => {
        const table = tables[tableName];
        const records = loadedRecords[tableName];
        for (let i=0; i < records.length; i++) {
            table.add(records[i]);
        }
    };
    addRecords("categories");
    addRecords("media");
    addRecords("glossary");

    // Populate the glossary aliases mapping table. It stores one record for
    // each alias (unlike the aliases.json data, which stores all the aliases for a given
    // glossary item in the same array for compactness). 
    for (let i=0; i < loadedRecords.aliases.length; i++) {
        const loadedAliasRecord = loadedRecords.aliases[i];

        // Throw an error if the glossary table does not contain a record
        // corresponding to this alias.
        if (!tables.glossary.has([loadedAliasRecord.media, loadedAliasRecord.category, loadedAliasRecord.item])) {
            throw new Error(`Cannot load aliases - alias record "${loadedAliasRecord.item} (${loadedAliasRecord.media})" does not have a corresponding glossary record`);
        }

        const aliases = loadedAliasRecord.aliases;
        // Check if aliases is an array (which does have typeof "object", for
        // some reason). This picks up on the common mistake of forgetting to
        // use an array in aliases.json.
        if (typeof(aliases) !== "object") {
            throw new Error(`Cannot load aliases - alias record "${loadedAliasRecord.item} (${loadedAliasRecord.media})" does not specify a list of aliases`);
        }

        for (let j=0; j < aliases.length; j++) {
            const alias = aliases[j];
            tables.glossaryAliases.add({
                media: loadedAliasRecord.media,
                category: loadedAliasRecord.category,
                item: loadedAliasRecord.item,
                alias: alias
            });
        }
    }

    // Auto-generate alias records for glossary items that match any of the
    // auto-alias patterns.
    for (const pattern in global.autoAliases) {
        const regexp = new RegExp(pattern);
        const aliasReplacements = global.autoAliases[pattern];
        for (let i = 0; i < loadedRecords.glossary.length; i++) {
            const record = loadedRecords.glossary[i];

            if (!regexp.test(record.item)) {
                continue;
            }

            // If this glossary item matched an auto-alias regexp, generate
            // aliases by replacing the pattern with the corresponding
            // replacements.
            const autoAliases = aliasReplacements.map(
                a => record.item.replace(regexp, a)
            );
            
            // Add an alias record for each auto-generated alias.
            for (let i=0; i < autoAliases.length; i++) {
                const autoAlias = autoAliases[i];

                // Raise a warning if the auto-generated alias has already been
                // added - this suggests it's been redundantly defined in the
                // aliases file.
                if (tables.glossaryAliases.has([record.media, record.category, record.item, autoAlias])) {
                    console.warn(`Auto-generated alias "${autoAlias}" already defined in aliases file`);
                }

                tables.glossaryAliases.add({
                    media: record.media,
                    category: record.category,
                    item: record.item,
                    alias: autoAlias
                });
            }
        }
    }

    // Validate each glossary record. Throw an error if the record references
    // an unknown media or category. Also count how many times each media or
    // category is referenced.
    const validations = {
        media: {
            table: tables.media,
            relationName: "media",
            propertyCounts: {},
        },
        category: {
            table: tables.categories,
            relationName: "category",
            propertyCounts: {},
        },
    };
            
    tables.glossary.forEach(record => {
        for (fieldName in validations) {
            // The glossary has relationships with the media and category
            // tables, so we should be able to find every referenced media and
            // category via those relations. Throw an error if not.
            const validation = validations[fieldName];
            const relationName = validation.relationName;
            const relatedRecord = record._rel[relationName];
            const fieldValue = record[fieldName];
            if (relatedRecord === undefined) {
                throw new Error(`Validation failure - unknown ${fieldName} "${fieldValue}" for glossary record "${record.item} (${record.media})"`);
            }

            const propertyCounts = validation.propertyCounts;

            if (propertyCounts[fieldValue] === undefined) {
                propertyCounts[fieldValue] = 0;
            }
            propertyCounts[fieldValue]++;
        }
    });

    // Check if there are any media or category property values which were not
    // referenced by any glossary entry.
    for (fieldName in validations) {
        const validation = validations[fieldName];
        const propertyCounts = validation.propertyCounts;
        const usedValues = Object.keys(propertyCounts);
        validation.table.forEach(record => {
            const recordIndex = validation.table.deriveRecordIndex(record);
            const fieldValue = recordIndex[0];
            if (!contains(usedValues, fieldValue)) {
                throw new Error(`Validation error: ${fieldName} value "${fieldValue}" is defined but not used in the glossary`);
            }
        });
    }
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
            if (!tables.glossary.has(item)) {
                throw new Error(`Cannot load deck "${deck.name}"; item "${item[0]}, ${item[1]}, ${item[2]}" was not found in glossary`);
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
 * Parse a JSON Lines (jsonl) string as a list of record objects. The header
 * line must contain the field names. All subsequent lines are the field values
 * for each record.
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
 * Search the provided glossary table, and glossary aliases table, for the given
 * term. Create search results from any matching records. If a record was found
 * via an alias, include any such aliases in that result.
 *
 * @param {string} term
 * @param {Table} glossary
 * @param {Table} glossaryAliases
 * @return {Object[]}
 */
const getSearchResults = function getSearchResults(term, glossary, glossaryAliases)
{
    // Search the glossary for all matching records, and the alias mappings for
    // all matching aliases.
    const glossaryMatches = glossary.where("item", term);
    const aliasMatches = glossaryAliases.where("alias", term);

    // Create a temporary table for the search results.
    const searchResults = new Table(
        ["media", "category", "item", "description", "aliases"],
        ["media", "category", "item"]
    );

    // Add search results for the matching glossary records first.
    for (let i = 0; i < glossaryMatches.length; i++) {
        const glossaryRecord = glossaryMatches[i];
        searchResults.add({
            media: glossaryRecord.media,
            category: glossaryRecord.category,
            item: glossaryRecord.item,
            description: glossaryRecord.description,
            aliases: []
        });
    }

    // Add results for any aliased records that were found.
    for (let i = 0; i < aliasMatches.length; i++) {
        const alias = aliasMatches[i];
        const aliasedRecord = alias._rel.glossary;

        // Search the already-found results to see if we already have a match
        // for this alias. If we do, add this alias to that result, otherwise
        // create a new search result and add this alias.
        const index = glossary.deriveRecordIndex(aliasedRecord);
        let searchResult = searchResults.get(index);
        if (searchResult === undefined) {
            searchResult = {
                media: aliasedRecord.media,
                category: aliasedRecord.category,
                item: aliasedRecord.item,
                description: aliasedRecord.description,
                aliases: []
            };
            searchResults.add(searchResult);
        };

        searchResult.aliases.push(alias.alias);
    }

    // Return a list of the records from the search result table.

    return searchResults.all();
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
 * Search the aliasToGlossary table for aliases that match the given string
 *
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
function hasMatchingField(record, field, value)
{
    if (record[field]) {
        return isPartialStringMatch(value, record[field]);
    }

    return false;
}

/**
 * Return true if stringA is a partial match for stringB. A string is a partial
 * match if it occurs as a substring of another string. Casing is not
 * considered.
 *
 * @param {string} stringA
 * @param {string} stringB
 * @return {boolean}
 */
function isPartialStringMatch(stringA, stringB)
{
    return stringB.toLowerCase().includes(stringA.toLowerCase());
}
