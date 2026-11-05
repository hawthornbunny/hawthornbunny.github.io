function test()
{
    testIndexRecords();
    testDecomposeHexColor();
    testTable();
    testTableWhere();
    testGetSearchResults();
}

function testIndexRecords()
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
}

function testDecomposeHexColor()
{
    let rgbColor = decomposeHexColor("#000000");
    assert(rgbColor[0] === 0);
    assert(rgbColor[1] === 0);
    assert(rgbColor[2] === 0);

    rgbColor = decomposeHexColor("#4080c0");
    assert(rgbColor[0] === 64);
    assert(rgbColor[1] === 128);
    assert(rgbColor[2] === 192);
}

function testTable()
{
    const glossary = new Table(
        ["media", "category", "item", "description"],
        ["media", "category", "item"],
    );

    const categories = new Table(
        ["category", "description"],
        ["category"],
    );

    categories.add({
        category: "character",
        description: "character description"
    });

    glossary.addRelation("cat", categories, ["category"]);

    glossary.add({
        media: "FiM",
        category: "character",
        item: "Applejack",
        description: "Applejack description"
    });

    glossary.add({
        media: "FiM",
        category: "character",
        item: "Fluttershy",
        description: "Fluttershy description"
    });

    glossary.add({
        media: "FiM",
        category: "character",
        item: "Pinkie Pie",
        description: "Pinkie Pie description"
    });

    glossary.add({
        media: "FiM",
        category: "character",
        item: "Rainbow Dash",
        description: "Rainbow Dash description"
    });

    glossary.add({
        media: "FiM",
        category: "character",
        item: "Rarity",
        description: "Rarity description"
    });

    glossary.add({
        media: "FiM",
        category: "character",
        item: "Twilight Sparkle",
        description: "Twilight Sparkle description"
    });

    const pinkie = glossary.get(["FiM", "character", "Pinkie Pie"]);

    assert(pinkie.media === "FiM");
    assert(pinkie.category === "character");
    assert(pinkie.item === "Pinkie Pie");
    assert(pinkie.description === "Pinkie Pie description");
    assert(pinkie._rel.cat.category === "character");
    assert(pinkie._rel.cat.description === "character description");
}

function testTableWhere()
{
    const table = new Table(
        ["first_name", "second_name"],
        ["first_name", "second_name"],
    );

    table.add({first_name: "Applejack", second_name: "-"});
    table.add({first_name: "Fluttershy", second_name: "-"});
    table.add({first_name: "Pinkie", second_name: "Pie"});
    table.add({first_name: "Rainbow", second_name: "Dash"});
    table.add({first_name: "Rarity", second_name: "-"});
    table.add({first_name: "Twilight", second_name: "Sparkle"});

    let results = table.where("first_name", "Ra");
    assert(results.length == 2);
    assert(results[0].first_name == "Rainbow")
    assert(results[1].first_name == "Rarity")
}

function testGetSearchResults()
{
    const glossary = new Table(
        ["media", "category", "item", "description"],
        ["media", "category", "item"],
    );

    const glossaryAliases = new Table(
        ["media", "category", "item", "alias"],
        ["media", "category", "item", "alias"],
    );

    glossaryAliases.addRelation(
        "glossary", glossary, ["media", "category", "item"]
    );

    glossary.add({
        media: "FiM",
        category: "character",
        item: "Applejack",
        description: "Applejack description"
    });

    glossary.add({
        media: "FiM",
        category: "character",
        item: "Rarity",
        description: "Rarity description"
    });

    glossaryAliases.add({
        media: "FiM",
        category: "character",
        item: "Rarity",
        alias: "Rares"
    });

    const results = getSearchResults("rar", glossary, glossaryAliases);

    assert(results.length === 1);
    assert(results[0].media === "FiM");
    assert(results[0].category === "character");
    assert(results[0].item === "Rarity");
    assert(results[0].aliases.length === 1);
    assert(results[0].aliases[0] === "Rares");
}
