/**
 * The master list of cards. The majority of cards should be kept in this list. There are a couple of exceptions,
 * notably Friendship is Card Games, which we prefer to keep in a separate list for ease of updating.
 *
 * This list must be a flat (non-nested) array of card data objects. Each card data object may have the following
 * properties:
 *
 * - name:       The name of the card, as usually printed at the top. Example: "Applejack, Element of Honesty".
 * - image:      The name of the image file which represents this card, if known. All images for a particular set are
 *               stored in the same directory. The location of that directory is defined in the global configuration for
 *               this app.
 * - set:        The name of the set to which this card belongs. Being fan-made sets, there is generally no "official"
 *               name for them; in cases where the set didn't have a well-defined name, we have attempted to give it an
 *               appropriate one.
 * - creator:    The creator of the card. Since each set was mostly created by a single person, this is generally the
 *               same for all cards in the same set.
 * - cost:       The mana cost of the card in standard Magic format. Example: "4GG".
 * - supertype:  The supertype of this card. Example: "Legendary Creature".
 * - subtype:    The subtype of this card. Example: "Earth Pony".
 * - text:       The card text. Generally, this does not include flavor text. The card text may contain escaped newlines
 *               (\n). Example: "Reach,hexproof\n\nSpells you cast cannot be countered.".
 * - flavorText: The card's flavor text. Example: "I didn't learn anything."
 * - pt:         The card's power and toughness. Generally, only creature cards will have this defined. Example: "3/3".
 * - loyalty:    The card's loyalty. Generally, only Planeswalkers will have this defined.
 *
 * Most of these properties are optional; the application will attempt to do the best it can with the data that is
 * available. At the very least, "name" should be set, as this is what the application looks for when a search is made.
 */
var CARDS = [
    {
        'name': 'Appleloosan Juncture',
        'image': 'Appleloosan Juncture.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Carousel Boutique',
        'image': 'Carousel Boutique.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Fluttershy\'s Cottage',
        'image': 'Fluttershys Cottage.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Gemstone Quarry',
        'image': 'Gemstone Quarry.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Golden Oaks Library',
        'image': 'Golden Oaks Library.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Ponyville Schoolhouse',
        'image': 'Ponyville Schoolhouse.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Rock Fields',
        'image': 'Rock Fields.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Stream Crossing',
        'image': 'Stream Crossing.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Thawing Pond',
        'image': 'Thawing Pond.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Thrashing Rapids',
        'image': 'Thrashing Rapids.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Celestia, Solar Princess',
        'image': 'tumblr_mt6mgmgKRh1s4m8geo10_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Angel Bunny',
        'image': 'tumblr_mt6mgmgKRh1s4m8geo1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Appleloosan Express',
        'image': 'tumblr_mt6mgmgKRh1s4m8geo2_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Beauty Brass',
        'image': 'tumblr_mt6mgmgKRh1s4m8geo3_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Bed of Butterflies',
        'image': 'tumblr_mt6mgmgKRh1s4m8geo4_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Canterlot Elite Guard',
        'image': 'tumblr_mt6mgmgKRh1s4m8geo5_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Chariot Escorts',
        'image': 'tumblr_mt6mgmgKRh1s4m8geo6_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Cheer On',
        'image': 'tumblr_mt6mgmgKRh1s4m8geo7_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Cleanse of Evil',
        'image': 'tumblr_mt6mgmgKRh1s4m8geo8_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Clear the Frost',
        'image': 'tumblr_mt6mgmgKRh1s4m8geo9_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Nurse Redheart',
        'image': 'tumblr_mt6myei4dh1s4m8geo10_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Crusaders\' Caravan',
        'image': 'tumblr_mt6myei4dh1s4m8geo1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Cut Off',
        'image': 'tumblr_mt6myei4dh1s4m8geo2_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Dazzle',
        'image': 'tumblr_mt6myei4dh1s4m8geo3_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Demystify',
        'image': 'tumblr_mt6myei4dh1s4m8geo4_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Element of Kindness',
        'image': 'tumblr_mt6myei4dh1s4m8geo5_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Gala Coach',
        'image': 'tumblr_mt6myei4dh1s4m8geo6_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Horsedrawn Carriage',
        'image': 'tumblr_mt6myei4dh1s4m8geo7_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Hummingway',
        'image': 'tumblr_mt6myei4dh1s4m8geo8_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Mayor Mare',
        'image': 'tumblr_mt6myei4dh1s4m8geo9_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Silver Spoon',
        'image': 'tumblr_mt6nqnwU5A1s4m8geo10_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Pacify',
        'image': 'tumblr_mt6nqnwU5A1s4m8geo1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Pamper',
        'image': 'tumblr_mt6nqnwU5A1s4m8geo2_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Peppermint Twist',
        'image': 'tumblr_mt6nqnwU5A1s4m8geo3_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Ponyville Animal Team',
        'image': 'tumblr_mt6nqnwU5A1s4m8geo4_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Prince Blueblood',
        'image': 'tumblr_mt6nqnwU5A1s4m8geo5_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Prophecize',
        'image': 'tumblr_mt6nqnwU5A1s4m8geo6_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Royal Guards',
        'image': 'tumblr_mt6nqnwU5A1s4m8geo7_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Royal Heralds',
        'image': 'tumblr_mt6nqnwU5A1s4m8geo8_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Sheriff Silverstar',
        'image': 'tumblr_mt6nqnwU5A1s4m8geo9_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Sir Spike the Brave',
        'image': 'tumblr_mt6p8bsOYL1s4m8geo1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Solar Flare',
        'image': 'tumblr_mt6p8bsOYL1s4m8geo2_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Spa Ponies',
        'image': 'tumblr_mt6p8bsOYL1s4m8geo3_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Spring Migration',
        'image': 'tumblr_mt6p8bsOYL1s4m8geo4_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Strung Up',
        'image': 'tumblr_mt6p8bsOYL1s4m8geo5_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'The Stare',
        'image': 'tumblr_mt6p8bsOYL1s4m8geo6_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Winter Wrap Up',
        'image': 'tumblr_mt6p8bsOYL1s4m8geo7_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Plains',
        'image': 'tumblr_mt75ll0HOf1s4m8geo1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Plains',
        'image': 'tumblr_mt75ll0HOf1s4m8geo2_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Plains',
        'image': 'tumblr_mt75ll0HOf1s4m8geo3_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Plains',
        'image': 'tumblr_mt75ll0HOf1s4m8geo4_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Island',
        'image': 'tumblr_mt75ll0HOf1s4m8geo5_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Island',
        'image': 'tumblr_mt75ll0HOf1s4m8geo6_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Island',
        'image': 'tumblr_mt75ll0HOf1s4m8geo7_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Island',
        'image': 'tumblr_mt75ll0HOf1s4m8geo8_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Swamp',
        'image': 'tumblr_mt75od1gss1s4m8geo1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Swamp',
        'image': 'tumblr_mt75od1gss1s4m8geo2_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Swamp',
        'image': 'tumblr_mt75od1gss1s4m8geo3_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Swamp',
        'image': 'tumblr_mt75od1gss1s4m8geo4_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Mountain',
        'image': 'tumblr_mt75od1gss1s4m8geo5_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Mountain',
        'image': 'tumblr_mt75od1gss1s4m8geo6_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Mountain',
        'image': 'tumblr_mt75od1gss1s4m8geo7_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Mountain',
        'image': 'tumblr_mt75od1gss1s4m8geo8_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Forest',
        'image': 'tumblr_mt75qe1xFG1s4m8geo1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Forest',
        'image': 'tumblr_mt75qe1xFG1s4m8geo2_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Forest',
        'image': 'tumblr_mt75qe1xFG1s4m8geo3_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Forest',
        'image': 'tumblr_mt75qe1xFG1s4m8geo4_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Element of Generosity',
        'image': 'tumblr_mt8on1mozt1s4m8geo10_r2_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Ace Racket',
        'image': 'tumblr_mt8on1mozt1s4m8geo1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Art of the Dress',
        'image': 'tumblr_mt8on1mozt1s4m8geo2_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Aveomancy',
        'image': 'tumblr_mt8on1mozt1s4m8geo3_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Backfired Trap',
        'image': 'tumblr_mt8on1mozt1s4m8geo4_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Cake Block',
        'image': 'tumblr_mt8on1mozt1s4m8geo5_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Canterlot Wellwishers',
        'image': 'tumblr_mt8on1mozt1s4m8geo6_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Cauldron Spill',
        'image': 'tumblr_mt8on1mozt1s4m8geo7_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Cheerilee',
        'image': 'tumblr_mt8on1mozt1s4m8geo8_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Cloudcrash',
        'image': 'tumblr_mt8on1mozt1s4m8geo9_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Photo Finish',
        'image': 'tumblr_mt8q52gYlT1s4m8geo10_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Facsimilate',
        'image': 'tumblr_mt8q52gYlT1s4m8geo1_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Giant Squid',
        'image': 'tumblr_mt8q52gYlT1s4m8geo2_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Hoity Toity',
        'image': 'tumblr_mt8q52gYlT1s4m8geo3_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Incognito',
        'image': 'tumblr_mt8q52gYlT1s4m8geo4_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Intense Study',
        'image': 'tumblr_mt8q52gYlT1s4m8geo5_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Lyra Heartstrings',
        'image': 'tumblr_mt8q52gYlT1s4m8geo6_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Magical Overload',
        'image': 'tumblr_mt8q52gYlT1s4m8geo7_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Owlowiscious',
        'image': 'tumblr_mt8q52gYlT1s4m8geo8_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Parasprite Swarm',
        'image': 'tumblr_mt8q52gYlT1s4m8geo9_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Startling Entrance',
        'image': 'tumblr_mt8t3vFCND1s4m8geo10_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Pinkie Sense',
        'image': 'tumblr_mt8t3vFCND1s4m8geo1_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Ponyville Weather Team',
        'image': 'tumblr_mt8t3vFCND1s4m8geo2_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Rainbowlace',
        'image': 'tumblr_mt8t3vFCND1s4m8geo3_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Sapphire Shores',
        'image': 'tumblr_mt8t3vFCND1s4m8geo4_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Showmareship',
        'image': 'tumblr_mt8t3vFCND1s4m8geo5_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Soarin',
        'image': 'tumblr_mt8t3vFCND1s4m8geo6_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Spell Flop',
        'image': 'tumblr_mt8t3vFCND1s4m8geo7_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Spell Splat',
        'image': 'tumblr_mt8t3vFCND1s4m8geo8_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Spike the Dragon',
        'image': 'tumblr_mt8t3vFCND1s4m8geo9_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Steve Magnets',
        'image': 'tumblr_mt8tcdRAEc1s4m8geo1_r2_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Sweetie Belle',
        'image': 'tumblr_mt8tcdRAEc1s4m8geo2_r2_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Tailcrush',
        'image': 'tumblr_mt8tcdRAEc1s4m8geo3_r2_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Thorough Analysis',
        'image': 'tumblr_mt8tcdRAEc1s4m8geo4_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Thorough Study',
        'image': 'tumblr_mt8tcdRAEc1s4m8geo5_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Trance',
        'image': 'tumblr_mt8tcdRAEc1s4m8geo6_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Trixe Lulamoon',
        'image': 'tumblr_mt8tcdRAEc1s4m8geo7_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Gala Ticket',
        'image': 'tumblr_mt8w6n5YNd1s4m8geo10_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Assistant\'s Checklist',
        'image': 'tumblr_mt8w6n5YNd1s4m8geo1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Assistant\'s Quill',
        'image': 'tumblr_mt8w6n5YNd1s4m8geo2_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Caliente Cupcake',
        'image': 'tumblr_mt8w6n5YNd1s4m8geo3_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Candycopter',
        'image': 'tumblr_mt8w6n5YNd1s4m8geo4_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Dazzling Ensemble',
        'image': 'tumblr_mt8w6n5YNd1s4m8geo5_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Diving Gear',
        'image': 'tumblr_mt8w6n5YNd1s4m8geo6_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Expedition Map',
        'image': 'tumblr_mt8w6n5YNd1s4m8geo7_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Field Plow',
        'image': 'tumblr_mt8w6n5YNd1s4m8geo8_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Gala Dress',
        'image': 'tumblr_mt8w6n5YNd1s4m8geo9_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Hang Glider',
        'image': 'tumblr_mt8wnvqV411s4m8geo1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Pinkie\'s One-Pony Band',
        'image': 'tumblr_mt8wnvqV411s4m8geo2_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Ponypult',
        'image': 'tumblr_mt8wnvqV411s4m8geo3_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Predictions and Prophecies',
        'image': 'tumblr_mt8wnvqV411s4m8geo4_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Protective Gear',
        'image': 'tumblr_mt8wnvqV411s4m8geo5_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Razor Scale',
        'image': 'tumblr_mt8wnvqV411s4m8geo6_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Rogue Plow',
        'image': 'tumblr_mt8wnvqV411s4m8geo7_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Sneezing Powder',
        'image': 'tumblr_mt8wnvqV411s4m8geo8_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Vanishing Ink',
        'image': 'tumblr_mt8wnvqV411s4m8geo9_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Gala Dress',
        'image': 'tumblr_mt8wqjcD2V1s4m8geo1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Gala Dress',
        'image': 'tumblr_mt8wqjcD2V1s4m8geo2_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Gala Dress',
        'image': 'tumblr_mt8wqjcD2V1s4m8geo3_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Gala Dress',
        'image': 'tumblr_mt8wqjcD2V1s4m8geo4_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Gilda',
        'image': 'tumblr_mta6ktOIoo1s4m8geo10_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Baking Bads',
        'image': 'tumblr_mta6ktOIoo1s4m8geo1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Ball of Parasprites',
        'image': 'tumblr_mta6ktOIoo1s4m8geo2_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Berry Punch',
        'image': 'tumblr_mta6ktOIoo1s4m8geo3_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Best Friend',
        'image': 'tumblr_mta6ktOIoo1s4m8geo4_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Bog Hydra',
        'image': 'tumblr_mta6ktOIoo1s4m8geo5_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Cave Bats',
        'image': 'tumblr_mta6ktOIoo1s4m8geo6_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Diamond Tiara',
        'image': 'tumblr_mta6ktOIoo1s4m8geo7_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Element of Laughter',
        'image': 'tumblr_mta6ktOIoo1s4m8geo8_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Evil Enchantress',
        'image': 'tumblr_mta6ktOIoo1s4m8geo9_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Muffin Mishap',
        'image': 'tumblr_mta81940hy1s4m8geo10_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Horror of the Deep Wood',
        'image': 'tumblr_mta81940hy1s4m8geo1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Hypnotic Glow',
        'image': 'tumblr_mta81940hy1s4m8geo2_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Interrogate',
        'image': 'tumblr_mta81940hy1s4m8geo3_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Magical Backlash',
        'image': 'tumblr_mta81940hy1s4m8geo4_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Mental Breakdown',
        'image': 'tumblr_mta81940hy1s4m8geo5_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Mistcreep',
        'image': 'tumblr_mta81940hy1s4m8geo6_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Nightmare Mists',
        'image': 'tumblr_mta81940hy1s4m8geo7_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Nightmare Moon',
        'image': 'tumblr_mta81940hy1s4m8geo8_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Opalescence',
        'image': 'tumblr_mta81940hy1s4m8geo9_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Shadowbolts Squadron',
        'image': 'tumblr_mtaatrna9R1s4m8geo10_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Parasprite Progenitor',
        'image': 'tumblr_mtaatrna9R1s4m8geo1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Parasprite\'s Swath',
        'image': 'tumblr_mtaatrna9R1s4m8geo2_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Party of One',
        'image': 'tumblr_mtaatrna9R1s4m8geo3_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Pegasi Paparazzi',
        'image': 'tumblr_mtaatrna9R1s4m8geo4_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Petrify',
        'image': 'tumblr_mtaatrna9R1s4m8geo5_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Poison Joke',
        'image': 'tumblr_mtaatrna9R1s4m8geo6_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Reclusive Fashionista',
        'image': 'tumblr_mtaatrna9R1s4m8geo7_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Sabotage',
        'image': 'tumblr_mtaatrna9R1s4m8geo8_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Scroll Barrage',
        'image': 'tumblr_mtaatrna9R1s4m8geo9_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Shadowgaze',
        'image': 'tumblr_mtael5RBpw1s4m8geo1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Snake Surprise',
        'image': 'tumblr_mtael5RBpw1s4m8geo2_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Snips and Snails',
        'image': 'tumblr_mtael5RBpw1s4m8geo3_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Terrorize',
        'image': 'tumblr_mtael5RBpw1s4m8geo4_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'The Stars\' Aid',
        'image': 'tumblr_mtael5RBpw1s4m8geo5_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Veiled Horror',
        'image': 'tumblr_mtael5RBpw1s4m8geo6_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Withered Crop',
        'image': 'tumblr_mtael5RBpw1s4m8geo7_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Unite the Elements',
        'image': 'tumblr_mtaqqrdlDR1s4m8geo10_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Applejack',
        'image': 'tumblr_mtaqqrdlDR1s4m8geo1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Cutie Mark Crusaders',
        'image': 'tumblr_mtaqqrdlDR1s4m8geo2_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Element of Magic',
        'image': 'tumblr_mtaqqrdlDR1s4m8geo3_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Fluttershy',
        'image': 'tumblr_mtaqqrdlDR1s4m8geo4_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Pinkie Pie',
        'image': 'tumblr_mtaqqrdlDR1s4m8geo5_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Rainbow Dash',
        'image': 'tumblr_mtaqqrdlDR1s4m8geo6_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Rarity',
        'image': 'tumblr_mtaqqrdlDR1s4m8geo7_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Sonic Rainboom',
        'image': 'tumblr_mtaqqrdlDR1s4m8geo8_r2_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Dragon Recluse',
        'image': 'tumblr_mtcegllYUg1s4m8geo10_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Braeburn',
        'image': 'tumblr_mtcegllYUg1s4m8geo1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Buffalo Chargers',
        'image': 'tumblr_mtcegllYUg1s4m8geo2_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Burst of Rage',
        'image': 'tumblr_mtcegllYUg1s4m8geo3_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Chief Thunderhooves',
        'image': 'tumblr_mtcegllYUg1s4m8geo4_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Cloudsdale Bullies',
        'image': 'tumblr_mtcegllYUg1s4m8geo5_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Crafty Crate',
        'image': 'tumblr_mtcegllYUg1s4m8geo6_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Dash\'s Protege',
        'image': 'tumblr_mtcegllYUg1s4m8geo7_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Diamond Dog Lancer',
        'image': 'tumblr_mtcegllYUg1s4m8geo8_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Diamond Dog Taskmasters',
        'image': 'tumblr_mtcegllYUg1s4m8geo9_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Hogtie',
        'image': 'tumblr_mtcfxk58pM1s4m8geo10_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Dragon\'s Egg',
        'image': 'tumblr_mtcfxk58pM1s4m8geo1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Element of Loyalty',
        'image': 'tumblr_mtcfxk58pM1s4m8geo2_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Enraged Manticore',
        'image': 'tumblr_mtcfxk58pM1s4m8geo3_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Everfree Hoarder',
        'image': 'tumblr_mtcfxk58pM1s4m8geo4_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Firebreathing',
        'image': 'tumblr_mtcfxk58pM1s4m8geo5_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Flatten',
        'image': 'tumblr_mtcfxk58pM1s4m8geo6_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Gemfield Digger',
        'image': 'tumblr_mtcfxk58pM1s4m8geo7_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Gummy',
        'image': 'tumblr_mtcfxk58pM1s4m8geo8_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Hoedown',
        'image': 'tumblr_mtcfxk58pM1s4m8geo9_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Rainburn',
        'image': 'tumblr_mtcjhhCtsc1s4m8geo10_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Hot Sauce',
        'image': 'tumblr_mtcjhhCtsc1s4m8geo1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Ignitemare',
        'image': 'tumblr_mtcjhhCtsc1s4m8geo2_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Landslip',
        'image': 'tumblr_mtcjhhCtsc1s4m8geo3_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Little Strongheart',
        'image': 'tumblr_mtcjhhCtsc1s4m8geo4_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Mineshaft Alpha',
        'image': 'tumblr_mtcjhhCtsc1s4m8geo5_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Philomena',
        'image': 'tumblr_mtcjhhCtsc1s4m8geo6_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Pokey Pierce',
        'image': 'tumblr_mtcjhhCtsc1s4m8geo7_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Pow-Wow',
        'image': 'tumblr_mtcjhhCtsc1s4m8geo8_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Quarry Outrider',
        'image': 'tumblr_mtcjhhCtsc1s4m8geo9_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Scootaloo',
        'image': 'tumblr_mtclvm8jvu1s4m8geo1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Shock',
        'image': 'tumblr_mtclvm8jvu1s4m8geo2_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Shocking Grasp',
        'image': 'tumblr_mtclvm8jvu1s4m8geo3_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Spitfire',
        'image': 'tumblr_mtclvm8jvu1s4m8geo4_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Surprise Party',
        'image': 'tumblr_mtclvm8jvu1s4m8geo5_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'War Paint',
        'image': 'tumblr_mtclvm8jvu1s4m8geo6_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Wild Party',
        'image': 'tumblr_mtclvm8jvu1s4m8geo7_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Ability: Adept',
        'image': 'tumblr_mtctnqBHHO1s4m8geo1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Ability: Helping Hoof',
        'image': 'tumblr_mtctnqBHHO1s4m8geo2_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Ability: Spontaneous',
        'image': 'tumblr_mtctnqBHHO1s4m8geo3_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Bird',
        'image': 'tumblr_mtctnqBHHO1s4m8geo4_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Insect',
        'image': 'tumblr_mtctnqBHHO1s4m8geo5_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Nightmare',
        'image': 'tumblr_mtctnqBHHO1s4m8geo6_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Reflection',
        'image': 'tumblr_mtctnqBHHO1s4m8geo7_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Snake Construct',
        'image': 'tumblr_mtctnqBHHO1s4m8geo8_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Cupcake',
        'image': 'tumblr_mtcu5wNwAS1s4m8geo1_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Dragon',
        'image': 'tumblr_mtcu5wNwAS1s4m8geo2_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Elemental Bear',
        'image': 'tumblr_mtcu5wNwAS1s4m8geo3_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Hound',
        'image': 'tumblr_mtcu5wNwAS1s4m8geo4_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Layer Cake',
        'image': 'tumblr_mtcu5wNwAS1s4m8geo5_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Nightmare',
        'image': 'tumblr_mtcu5wNwAS1s4m8geo6_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Plant',
        'image': 'tumblr_mtcu5wNwAS1s4m8geo7_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Pony',
        'image': 'tumblr_mtcu5wNwAS1s4m8geo8_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Field Feeders',
        'image': 'tumblr_mtdzpjCSrX1s4m8geo10_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Apple Bloom',
        'image': 'tumblr_mtdzpjCSrX1s4m8geo1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Apple Orchard',
        'image': 'tumblr_mtdzpjCSrX1s4m8geo2_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Big McIntosh',
        'image': 'tumblr_mtdzpjCSrX1s4m8geo3_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Bloomberg',
        'image': 'tumblr_mtdzpjCSrX1s4m8geo4_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Bunnycrush',
        'image': 'tumblr_mtdzpjCSrX1s4m8geo5_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Cattle Stampede',
        'image': 'tumblr_mtdzpjCSrX1s4m8geo6_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Cottontail Den',
        'image': 'tumblr_mtdzpjCSrX1s4m8geo7_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Element of Honesty',
        'image': 'tumblr_mtdzpjCSrX1s4m8geo8_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Everfree Cockatrice',
        'image': 'tumblr_mtdzpjCSrX1s4m8geo9_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Mr. Cake',
        'image': 'tumblr_mte1ea2JFW1s4m8geo10_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Florify',
        'image': 'tumblr_mte1ea2JFW1s4m8geo1_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Flower Ponies',
        'image': 'tumblr_mte1ea2JFW1s4m8geo2_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Froggy Bottom Frog',
        'image': 'tumblr_mte1ea2JFW1s4m8geo3_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Giant Growth',
        'image': 'tumblr_mte1ea2JFW1s4m8geo4_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Giving Squirrel',
        'image': 'tumblr_mte1ea2JFW1s4m8geo5_r2_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Granny Smith',
        'image': 'tumblr_mte1ea2JFW1s4m8geo6_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Grizzly Bear',
        'image': 'tumblr_mte1ea2JFW1s4m8geo7_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Mass Harvest',
        'image': 'tumblr_mte1ea2JFW1s4m8geo8_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Mob of Ponies',
        'image': 'tumblr_mte1ea2JFW1s4m8geo9_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Twilight Sparkle',
        'image': 'tumblr_mte34o8f2S1s4m8geo1_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Celestia, Solar Princess',
        'image': 'tumblr_mte3alWW3X1s4m8geo1_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Nightmare Moon',
        'image': 'tumblr_mte3alWW3X1s4m8geo2_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Snoring Snakes',
        'image': 'tumblr_mte4wsb5Wv1s4m8geo10_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Mr. Greenhooves',
        'image': 'tumblr_mte4wsb5Wv1s4m8geo1_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Mrs. Cake',
        'image': 'tumblr_mte4wsb5Wv1s4m8geo2_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Musomorphic Chargers',
        'image': 'tumblr_mte4wsb5Wv1s4m8geo3_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Needleback Hedgehogs',
        'image': 'tumblr_mte4wsb5Wv1s4m8geo4_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Pie Barrage',
        'image': 'tumblr_mte4wsb5Wv1s4m8geo5_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Ponyville Plant Team',
        'image': 'tumblr_mte4wsb5Wv1s4m8geo6_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Royal Presence',
        'image': 'tumblr_mte4wsb5Wv1s4m8geo7_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Scratch the Surface',
        'image': 'tumblr_mte4wsb5Wv1s4m8geo8_r1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Shrink',
        'image': 'tumblr_mte4wsb5Wv1s4m8geo9_r2_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Strange Harvest',
        'image': 'tumblr_mte70oxDrO1s4m8geo1_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Sweet Apple Swines',
        'image': 'tumblr_mte70oxDrO1s4m8geo2_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Ursa Major',
        'image': 'tumblr_mte70oxDrO1s4m8geo3_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Ursa Minor',
        'image': 'tumblr_mte70oxDrO1s4m8geo4_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Verdant Garden',
        'image': 'tumblr_mte70oxDrO1s4m8geo5_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Wandering Polecats',
        'image': 'tumblr_mte70oxDrO1s4m8geo6_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Winona',
        'image': 'tumblr_mte70oxDrO1s4m8geo7_400.png',
        'set': 'A Warm Welcome'
    },
    {
        'name': 'Ahuizotl',
        'image': 'Ahuizotl.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'All-Team Organizer Vest',
        'image': 'All-Team-Organizer-Vest.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Amped Pegasus',
        'image': 'Amped-Pegasus.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Angel Bunny',
        'image': 'Angel-Bunny.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Animal Team Vest',
        'image': 'Animal-Team-Vest.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Annual Stampede',
        'image': 'Annual-Stampede.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Apple Ancestral Cutie Mark',
        'image': 'Apple-Ancestral-Cutie-Mark.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Apple Bloom',
        'image': 'Apple-Bloom.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Applebuck',
        'image': 'Applebuck.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Applebuck Season',
        'image': 'Applebuck-Season.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Applejack, Element of Honesty',
        'image': 'Applejack-Element-of-Honesty.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Applejack',
        'image': 'Applejack.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Applejack Uncompromised',
        'image': 'Applejack-Uncompromised.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Appleloosa',
        'image': 'Appleloosa.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Appleloosa Stampeding Grounds',
        'image': 'Appleloosa-Stampeding-Grounds.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Archives of Canterlot',
        'image': 'Archives-of-Canterlot.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Art of the Dress',
        'image': 'Art-of-the-Dress.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Baked Bads',
        'image': 'Baked-Bads.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Becoming Popular',
        'image': 'Becoming-Popular.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Best Young Flyer Competition',
        'image': 'Best-Young-Flyer-Competition.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Big Macintosh',
        'image': 'Big-Macintosh.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Big Ol\' Storm of Chaos',
        'image': 'Big-Ol-Storm-of-Chaos.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Blank Flank',
        'image': 'Blank-Flank.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Bog Hydra',
        'image': 'Bog-Hydra.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Bowbearer\'s Cutie Mark',
        'image': 'Bowbearers-Cutie-Mark.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Braeburn',
        'image': 'Braeburn.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Buffalo Charger',
        'image': 'Buffalo-Charger.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Buffalo Herd',
        'image': 'Buffalo-Herd.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Bunny Census',
        'image': 'Bunny-Census.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Bunny Stampede',
        'image': 'Bunny-Stampede.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Butterflies of Ponyville',
        'image': 'Butterflies-of-Ponyville.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Candy Cruncher\'s Cutie Mark',
        'image': 'Candy-Crunchers-Cutie-Mark.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Canterlot',
        'image': 'Canterlot.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Shards of Equestria',
        'image': 'Cardback.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Carousel Boutique',
        'image': 'Carousel-Boutique.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Castle of Royal Pony Sisters',
        'image': 'Castle-of-Royal-Pony-Sisters.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Celestial Purge',
        'image': 'Celestial-Purge.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Celestia, Princess of Equestria',
        'image': 'Celestia-Princess-of-Equestria.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Chancellor Puddinghead',
        'image': 'Chancellor-Puddinghead.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Changeling Brute',
        'image': 'Changeling-Brute.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Changeling Soldier',
        'image': 'Changeling-Soldier.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Cheerilee',
        'image': 'Cheerilee.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Cherry Jubilee',
        'image': 'Cherry-Jubilee.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Chief Thunderhooves',
        'image': 'Chief-Thunderhooves.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Chrysalis, Changeling Queen',
        'image': 'Chrysalis-Changeling-Queen.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Cider',
        'image': 'Cider.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Cloud House',
        'image': 'Cloud-House.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Cloudsdale Bully',
        'image': 'Cloudsdale-Bully.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Cloudsdale Charger',
        'image': 'Cloudsdale-Charger.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Cloudsdale Coliseum',
        'image': 'Cloudsdale-Coliseum.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Cloudsdale',
        'image': 'Cloudsdale.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Cloudsdale Weather Factory',
        'image': 'Cloudsdale-Weather-Factory.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Come-To-Life',
        'image': 'Come-To-Life.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Commander Hurricane',
        'image': 'Commander-Hurricane.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Crackle',
        'image': 'Crackle.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Cranky Doodle Donkey',
        'image': 'Cranky-Doodle-Donkey-.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Creepy Decor',
        'image': 'Creepy-Decor.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Cupcakes',
        'image': 'Cupcakes.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Cute-ceañera',
        'image': 'Cute-cea¤era.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Cutie Mark Crusade',
        'image': 'Cutie-Mark-Crusade.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Cutie Mark Crusader Carpentry',
        'image': 'Cutie-Mark-Crusader-Carpentry.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Cutie Mark Crusader Clubhouse',
        'image': 'Cutie-Mark-Crusader-Clubhouse.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Cutie Mark Crusader Signet',
        'image': 'Cutie-Mark-Crusader-Signet.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Cutie Pox',
        'image': 'Cutie-Pox.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Daring Do',
        'image': 'Daring-Do.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Deceptive Cadence',
        'image': 'Deceptive-Cadence.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Derpy',
        'image': 'Derpy.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Diamond Dog Brute',
        'image': 'Diamond-Dog-Brute.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Diamond Dog Guard',
        'image': 'Diamond-Dog-Guard.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Diamond Dog Overseer',
        'image': 'Diamond-Dog-Overseer.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Diamond Dog Scout',
        'image': 'Diamond-Dog-Scout.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Diamond Tiara',
        'image': 'Diamond-Tiara.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Dirt Pit',
        'image': 'Dirt-Pit.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Dirtville',
        'image': 'Dirtville.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Discord',
        'image': 'Discord.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'DJ Pon-3',
        'image': 'DJ-Pon-3.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Draconequus Statue',
        'image': 'Draconequus-Statue.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Dragon\'s Greed',
        'image': 'Dragons-Greed.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Dumb Fabric',
        'image': 'Dumb-Fabric.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Dumb Rock',
        'image': 'Dumb-Rock.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Everfree Cave Dragon',
        'image': 'Everfree-Cave-Dragon.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Everfree Cockatrice',
        'image': 'Everfree-Cockatrice.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Everfree Forest',
        'image': 'Everfree-Forest.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Everfree River',
        'image': 'Everfree-River.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Everfree Serpent',
        'image': 'Everfree-Serpent.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Everfree Timberwolf',
        'image': 'Everfree-Timberwolf.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Fancypants',
        'image': 'Fancypants.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Featherweight',
        'image': 'Featherweight.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Filthy Rich',
        'image': 'Filthy-Rich.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Find a Pet',
        'image': 'Find-a-Pet.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Fireball',
        'image': 'Fireball.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Firebreathing',
        'image': 'Firebreathing.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Fire Ruby',
        'image': 'Fire-Ruby.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Fleetfoot, Wonderbolt',
        'image': 'Fleetfoot-Wonderbolt.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Flimflam Brothers',
        'image': 'Flimflam-Brothers.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Fluttershy, Element of Kindness',
        'image': 'Fluttershy-Element-of-Kindness.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Fluttershy',
        'image': 'Fluttershy.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Fluttershy Unleashed',
        'image': 'Fluttershy-Unleashed.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Forest',
        'image': 'Forest.1.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Forest',
        'image': 'Forest.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Forever',
        'image': 'Forever.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Freaky Knowledge of Sewing',
        'image': 'Freaky-Knowledge-of-Sewing.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Friendship Express',
        'image': 'Friendship-Express.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Friendship is Magic',
        'image': 'Friendship-is-Magic.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Froggy Bottom Bog',
        'image': 'Froggy-Bottom-Bog.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Full Spectrum Fashion',
        'image': 'Full-Spectrum-Fashion.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Gem Hunt',
        'image': 'Gem-Hunt.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Ghastly Brambles',
        'image': 'Ghastly-Brambles.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Ghastly Gorge',
        'image': 'Ghastly-Gorge.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Ghost Story',
        'image': 'Ghost-Story.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Giant Growth',
        'image': 'Giant-Growth.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Gilda',
        'image': 'Gilda.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Glorious Anthem',
        'image': 'Glorious-Anthem.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Granny Smith',
        'image': 'Granny-Smith.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Gummy',
        'image': 'Gummy.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Harmonize',
        'image': 'Harmonize.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Harphandler\'s Cutie Mark',
        'image': 'Harphandlers-Cutie-Mark.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Hearth\'s Warming Pageant',
        'image': 'Hearths-Warming-Pageant.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Hoity Toity',
        'image': 'Hoity-Toity.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Hole in the Clouds',
        'image': 'Hole-in-the-Clouds.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Hop, Skip, Jump',
        'image': 'Hop-Skip-Jump.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Hush Now, Quiet Now',
        'image': 'Hush-Now-Quiet-Now.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'I Go',
        'image': 'I-Go.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Injured Manticore',
        'image': 'Injured-Manticore.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Iron Pony',
        'image': 'Iron-Pony.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Iron Will',
        'image': 'Iron-Will.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Iron Will, Minotaur',
        'image': 'Iron-Will-Minotaur.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Island',
        'image': 'Island.1.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Island',
        'image': 'Island.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Laughter Song',
        'image': 'Laughter-Song.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Library of Ponyville',
        'image': 'Library-of-Ponyville.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Little Strongheart',
        'image': 'Little-Strongheart.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Luna, Night Mare Moon',
        'image': 'Luna-Night-Mare-Moon.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Lure',
        'image': 'Lure.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Magical Lightning Rod',
        'image': 'Magical-Lightning-Rod.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Magic Kindergarten',
        'image': 'Magic-Kindergarten.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Mayor Mare',
        'image': 'Mayor-Mare.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'May the Best Pet Win',
        'image': 'May-the-Best-Pet-Win.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Meadow Cottage',
        'image': 'Meadow-Cottage.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Mountain',
        'image': 'Mountain.1.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Mountain',
        'image': 'Mountain.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Mountain Smoke Dragon',
        'image': 'Mountain-Smoke-Dragon.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Mr. Carrot Cake',
        'image': 'Mr.-Carrot-Cake.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Mrs. Cup Cake',
        'image': 'Mrs.-Cup-Cake.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Mysterious Mare-Do-Well',
        'image': 'Mysterious-Mare-Do-Well.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Night Mare Escort',
        'image': 'Night-Mare-Escort.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Night Mare Night',
        'image': 'Night-Mare-Night.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Nope',
        'image': 'Nope.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Number Twenty-Five',
        'image': 'Number-Twenty-Five.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Nurse Pony',
        'image': 'Nurse-Pony.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Oakenform',
        'image': 'Oakenform.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Organized Chaos',
        'image': 'Organized-Chaos.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Over-Propelled',
        'image': 'Over-Propelled.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Owloysius',
        'image': 'Owloysius.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Parasprites',
        'image': 'Parasprites.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Party Cannon',
        'image': 'Party-Cannon.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Part of One',
        'image': 'Party-of-One.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Pegassistance',
        'image': 'Pegassistance.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Pegasus Guard',
        'image': 'Pegasus-Guard.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Pegasusususes',
        'image': 'Pegasusususes.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Philomena',
        'image': 'Philomena-.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Phoenix Flare',
        'image': 'Phoenix-Flare.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Photo Finish',
        'image': 'Photo-Finish.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Pie In The Sky',
        'image': 'Pie-In-The-Sky.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Pinkamena Diane Pie',
        'image': 'Pinkamena-Diane-Pie.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Pinkiemorph',
        'image': 'Pinkiemorph.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Pinkie Pie, Element of Laughter',
        'image': 'Pinkie-Pie-Element-of-Laughter.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Pinkie Pie',
        'image': 'Pinkie-Pie.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Pinkie Promise',
        'image': 'Pinkie-Promise.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Pinkie Sense',
        'image': 'Pinkie-Sense.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Pipsqueak',
        'image': 'Pipsqueak.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Plains',
        'image': 'Plains.1.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Plains',
        'image': 'Plains.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Plant Team Vest',
        'image': 'Plant-Team-Vest.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Poison Joke',
        'image': 'Poison-Joke.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Ponyville Bear',
        'image': 'Ponyville-Bear.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Pound and Pumpkin Cake',
        'image': 'Pound-and-Pumpkin-Cake.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Prince Blueblood',
        'image': 'Prince-Blueblood.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Princess Cadance',
        'image': 'Princess-Cadance.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Princess Luna',
        'image': 'Princess-Luna.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Princess Platinum',
        'image': 'Princess-Platinum.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Put You in Trances',
        'image': 'Put-You-In-Trances.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Quarray Eel',
        'image': 'Quarray-Eel.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Rainbow Crash',
        'image': 'Rainbow-Crash.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Rainbow Dash, Element of Loyalty',
        'image': 'Rainbow-Dash-Element-of-Loyalty.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Rainbow Dash',
        'image': 'Rainbow-Dash.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Rainbow Dash, Shadowbolt',
        'image': 'Rainbow-Dash-Shadowbolt.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Rainbow Demolish',
        'image': 'Rainbow-Demolish.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Rapidfire, Wonderbolt',
        'image': 'Rapidfire-Wonderbolt.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Raritycatchme',
        'image': 'Raritycatchme.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Rarity, Element of Generosity',
        'image': 'Rarity-Element-of-Generosity.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Rarity',
        'image': 'Rarity.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Rarity, The Elite',
        'image': 'Rarity-The-Elite.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Raw Ability',
        'image': 'Raw-Ability.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Reference Guide',
        'image': 'Reference-Guide.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Rock Farm',
        'image': 'Rock-Farm.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Royal Canterlot Voice',
        'image': 'Royal-Canterlot-Voice.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Running of the Leaves',
        'image': 'Running-of-the-Leaves.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Sapphire Shores',
        'image': 'Sapphire-Shores.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Sapphire Statue',
        'image': 'Sapphire-Statue.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Scheduled Sprinkle',
        'image': 'Scheduled-Sprinkle.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Scootaloo',
        'image': 'Scootaloo.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Sever Tail',
        'image': 'Sever-Tail.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Shadowbolt Flanker',
        'image': 'Shadowbolt-Flanker.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Sheriff Silverstar',
        'image': 'Sheriff-Silverstar.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Shining Armor',
        'image': 'Shining-Armor.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Shock',
        'image': 'Shock.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Silver Spoon',
        'image': 'Silver-Spoon.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Sisterhooves',
        'image': 'Sisterhooves.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Smarty Pants',
        'image': 'Smarty-Pants.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Smashing Wings',
        'image': 'Smashing-Wings.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Smile Smile Smile',
        'image': 'Smile-Smile-Smile.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Snails',
        'image': 'Snails.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Snips',
        'image': 'Snips.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Snowflake Technician',
        'image': 'Snowflake-Technician.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Soarin\'s Hunger',
        'image': 'Soarins-Hunger.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Soarin\', Wonderbolt',
        'image': 'Soarin-Wonderbolt.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'So Awesome',
        'image': 'So-Awesome.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Sonic Rainboom',
        'image': 'Sonic-Rainboom.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Sparkleblast',
        'image': 'Sparkleblast.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Spellbook',
        'image': 'Spellbook.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Spell Research',
        'image': 'Spell-Research.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Spike',
        'image': 'Spike.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Spike Unrestrained',
        'image': 'Spike-Unrestrained.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Spill the Beans',
        'image': 'Spill-the-Beans.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Spitfire, Wonderbolt',
        'image': 'Spitfire-Wonderbolt.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Stare',
        'image': 'Stare.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Starswirl The Bearded',
        'image': 'Starswirl-The-Bearded.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Sugarcube Corner',
        'image': 'Sugarcube-Corner.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Summer Flight Camp',
        'image': 'Summer-Flight-Camp.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Summer Sun Celebration',
        'image': 'Summer-Sun-Celebration.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Super Naturals',
        'image': 'Super-Naturals.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Super Speedy Cider Squeezy 6000',
        'image': 'Super-Speedy-Cider-Squeezy-6000.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Swamp',
        'image': 'Swamp.1.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Swamp',
        'image': 'Swamp.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Sweet Apple Acres',
        'image': 'Sweet-Apple-Acres.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Sweetie Belle',
        'image': 'Sweetie-Belle.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Take a Letter',
        'image': 'Take-a-Letter.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Tank',
        'image': 'Tank.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'The Cutie Mark Crusaders',
        'image': 'The-Cutie-Mark-Crusaders.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'The Earth Pony Way',
        'image': 'The-Earth-Pony-Way.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'The Fun Has Been Doubled',
        'image': 'The-Fun-Has-Been-Doubled.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'The Last Roundup',
        'image': 'The-Last-Roundup.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'The Worst Possible Thing',
        'image': 'The-Worst-Possible-Thing.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'This Is Whining',
        'image': 'This-Is-Whining.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Thunderlane',
        'image': 'Thunderlane.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Time Turner\'s Cutie Mark',
        'image': 'Time-Turners-Cutie-Mark.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Tom',
        'image': 'Tom.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Trixie\'s Boast',
        'image': 'Trixies-Boast.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Trixie, The Great and Powerful',
        'image': 'Trixie-The-Great-and-Powerful.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Truss',
        'image': 'Truss.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Twenty Percent Cooler',
        'image': 'Twenty-Percent-Cooler.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Twilight Sparkle, Element of Magic',
        'image': 'Twilight-Sparkle-Element-of-Magic.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Twilight Sparkle',
        'image': 'Twilight-Sparkle.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Twilight Sparkle, Tardy',
        'image': 'Twilight-Sparkle-Tardy.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Twist',
        'image': 'Twist.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Unicorn Guard',
        'image': 'Unicorn-Guard.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Unrelenting Opalescence',
        'image': 'Unrelenting-Opalescence.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Ursa Major',
        'image': 'Ursa-Major.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Ursa Minor',
        'image': 'Ursa-Minor.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Victory Statue',
        'image': 'Victory-Statue.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Walk on Clouds',
        'image': 'Walk-on-Clouds.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Weather Team Vest',
        'image': 'Weather-Team-Vest.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Whitetail Wood',
        'image': 'Whitetail-Wood.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Windigoes',
        'image': 'Windigoes.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Winona',
        'image': 'Winona.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Winter Wrap-Up',
        'image': 'Winter-Wrap-Up.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Your Face',
        'image': 'Your-Face.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Zap Apple',
        'image': 'Zap-Apple.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Zecora, Evil Enchantress',
        'image': 'Zecora-Evil-Enchantress.jpg',
        'set': 'Shards of Equestria'
    },
    {
        'name': 'Zecora',
        'image': 'Zecora.jpg',
        'set': 'Shards of Equestria'
    },

    {
        'name': 'Academic Curiosity',
        'image': 'Academic Curiosity.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Act of Valor',
        'image': 'Act of Valor.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Adventurer\'s Inn',
        'image': 'Adventurers Inn.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Alchemical Flask',
        'image': 'Alchemical Flask.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Alicorn Nightmare',
        'image': 'Alicorn Nightmare.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Alicorn of Shadows',
        'image': 'Alicorn of Shadows.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Amplifying Tome',
        'image': 'Amplifying Tome.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Ancient Volume',
        'image': 'Ancient Volume.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Applebuck',
        'image': 'Applebuck.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Applejack\'s Lasso',
        'image': 'Applejacks Lasso.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Applejack, the Diligent',
        'image': 'Applejack the Diligent.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Arbore, Staff of Seasons',
        'image': 'Arbore Staff of Seasons.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Arcane Waterspout',
        'image': 'Arcane Waterspout.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Arcanim of Lauren\'s Light',
        'image': 'Arcanim of Laurens Light.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Archaic Index',
        'image': 'Archaic Index.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Archive Adjudicator',
        'image': 'Archive Adjucator.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Archive Extraction',
        'image': 'Archive Extraction.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Arcknight Ascendant',
        'image': 'Arcknight Ascendant.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Arc-Matrix Gestalt',
        'image': 'Arc-Matrix Gestalt.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Argent Battlemage',
        'image': 'Argent Battlemage.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Ascension',
        'image': 'Ascension.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Ash Mountain Hellkite',
        'image': 'Ash Mountain Hellkite.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Ashwood Ancient',
        'image': 'Ashwood Ancient.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Atmospheric Singularity',
        'image': 'Atmospheric Singularity.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Audioflood',
        'image': 'Audioflood.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Awaken the Tribe',
        'image': 'Awaken the Tribe.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Azo, the Fleet-of-Hoof',
        'image': 'Azo the Fleet-of-Hoof.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Balefire Seeker',
        'image': 'Balefire Seeker.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Balefire Totem',
        'image': 'Balefire Totem.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Barter With Oceanus',
        'image': 'Barter With Oceanus.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Basic Land',
        'image': 'Basic land.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Batpony Adventurer',
        'image': 'Batpony Adventurer.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Batpony Blackguard',
        'image': 'Batpony Blackguard.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Battle of Wills',
        'image': 'Battle of Wills.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Beacon Station Expedition',
        'image': 'Beacon Station Expedition.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Bite Mark',
        'image': 'Bite Mark.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Bladeflight Totem',
        'image': 'Bladeflight Totem.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Blasting Potion',
        'image': 'Blasting Potion.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Blaze Elemental',
        'image': 'Blaze Elemental.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Blessing of the Zvaha',
        'image': 'Blessing of the Zvaha.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Blind Terror',
        'image': 'Blind Terror.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Bloodfury Totem',
        'image': 'Bloodfury Totem.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Bondfire Animus',
        'image': 'Bondfire Animus.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Bonk',
        'image': 'Bonk.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Boop',
        'image': 'Boop.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Breath of the Dragons',
        'image': 'Breath of the Dragons.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Broad Daylight',
        'image': 'Broad Daylight.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Bubbling Brew',
        'image': 'Bubbling Brew.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Call to Arms',
        'image': 'Call to Arms.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Canterlot Archiveologist',
        'image': 'Canterlot Archiveologist.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Carrot Farmer',
        'image': 'Carrot Farmer.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Cauldron of Calamity',
        'image': 'Cauldron of Calamity.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Celestia, the Light Eternal',
        'image': 'Celestia the Light Eternal.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Cinder Ruins Expedition',
        'image': 'Cinder Ruins Expedition.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Cloak of Storms',
        'image': 'Cloak of Storms.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Cloudpuncher Cadet',
        'image': 'Cloudpuncher Cadet.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Cloudpuncher Veteran',
        'image': 'Cloudpuncher Veteran.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Cloudsdale Champion',
        'image': 'Cloudsdale Champion.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Cloudvillage',
        'image': 'Cloudvillage.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Confiscate Memory',
        'image': 'Confiscate Memory.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Conjured Armor',
        'image': 'Conjured Armor.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Contagion',
        'image': 'Contagion.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Corner of the Eye',
        'image': 'Corner of the Eye.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Counterattack',
        'image': 'Counterattack.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Covert Delivery',
        'image': 'Covert Delivery.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Crucius, Axe of Damnation',
        'image': 'Crucius Axe of Damnation.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Cryothaumic Construct',
        'image': 'Cryothaumic Construct.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Curse of the Batpony',
        'image': 'Curse of the Batpony.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Darkspire Shadowcaster',
        'image': 'Darkspire Shadowcaster.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Dark Will',
        'image': 'Dark Will.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Darrowdelf',
        'image': 'Darrowdelf.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Deresonation',
        'image': 'Deresonation.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Disciple of Oceanus',
        'image': 'Disciple of Oceanus.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Dreambound Acolyte',
        'image': 'Dreambound Acolyte.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Driven by Ambition',
        'image': 'Driven by Ambition.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Druid of the Verge',
        'image': 'Druid of the Verge.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Earthen Ramparts',
        'image': 'Earthen Ramparts.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Earthknight Errant',
        'image': 'Earthknight Errant.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Earthmage Sniper',
        'image': 'Earthmage Sniper.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Earthpony Adventurer',
        'image': 'Earthpony Adventurer.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Earthpony',
        'image': 'Earthpony .jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Earthshift',
        'image': 'Earthshift.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Edge of the Wild',
        'image': 'Edge of the Wild.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Encyclopedia Magica',
        'image': 'Encyclopedia Magica.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Everfree Forest Expedition',
        'image': 'Everfree Forest Expedition.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Everfree Hydra',
        'image': 'Everfree Hydra.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Everfree Timberwolf',
        'image': 'Everfree Timberwolf.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Exhaustion',
        'image': 'Exhaustion.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Explorer\'s Amulet',
        'image': 'Explorers Amulet.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Eye Spy',
        'image': 'Eye Spy.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Face the Gods',
        'image': 'Face the Gods.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Fancy Mathematics',
        'image': 'Fancy Mathematics.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Fatal Conversion',
        'image': 'Fatal Conversion.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Field Worker',
        'image': 'Field Worker.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Fireblood Zealot',
        'image': 'Fireblood Zealot.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Fleethoof Interceptor',
        'image': 'Fleethoof Interceptor.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Fleethoof Prodigy',
        'image': 'Fleethoof Prodigy.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Fleethoof Sensei',
        'image': 'Fleethoof Sensei.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Flight Aptitude',
        'image': 'Flight Aptitude.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Floramancy',
        'image': 'Floramancy.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Fluttershy\'s First-Aid Kit',
        'image': 'Fluttershys First-Aid Kit.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Fluttershy, the Good',
        'image': 'Fluttershy the Good.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Forest',
        'image': 'Forest.1.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Forest',
        'image': 'Forest.2.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Forest',
        'image': 'Forest.3.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Forest',
        'image': 'Forest.4.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Forest',
        'image': 'Forest.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Forgotten Cave Expedition',
        'image': 'Forgotten Cave Expedition.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Forgotten Passageway',
        'image': 'Forgotten Passageway.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Geist of the Garden',
        'image': 'Geist of the Garden.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Gift of Sunlight',
        'image': 'Gift of Sunlight.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Golem',
        'image': 'Golem.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Grimoire of the Archive',
        'image': 'Grimoire of the Archive.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Ground Charger',
        'image': 'Ground Charger.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Grove Elemental',
        'image': 'Grove Elemental.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Harborkeep',
        'image': 'Harborkeep.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Harmonic Resonance',
        'image': 'Harmonic Resonance.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Harmony, Life of the Earth',
        'image': 'Harmony Life of the Earth.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Harmony\'s Devotion',
        'image': 'Harmonys Devotion.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Harmony\'s Earthwatcher',
        'image': 'Harmonys Earthwatcher.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Harmony\'s Floramancer',
        'image': 'Harmonys Floramancer.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Hill Flip',
        'image': 'Hill Flip.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Hoofstomp',
        'image': 'Hoofstomp.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Invoke Order',
        'image': 'Invoke Order.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Invoke the Darrow',
        'image': 'Invoke the Darrow.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Island',
        'image': 'Island.1.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Island',
        'image': 'Island.2.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Island',
        'image': 'Island.3.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Island',
        'image': 'Island.4.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Island',
        'image': 'Island.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Jumpkick',
        'image': 'Jumpkick.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Keris\' Inspiration',
        'image': 'Keris Inspiration.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Keris, Mother of Invention',
        'image': 'Keris Mother of Invention.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Knight of the Wayside',
        'image': 'Knight of the Wayside.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Kylara Scout',
        'image': 'Kylara Scout.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Kylara Thoughtkeeper',
        'image': 'Kylara Thoughtkeeper.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Lashvines',
        'image': 'Lashvines.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Lasso Trick',
        'image': 'Lasso Trick.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Lauren, Author of Worlds',
        'image': 'Lauren Author of Worlds.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Lauren\'s Benediction',
        'image': 'Laurens Benediction.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Lauren\'s Lightbringer',
        'image': 'Laurens Lightbringer.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Leatherleaf Barding',
        'image': 'Leatherleaf Barding.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Lemonades',
        'image': 'Lemonades.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Leyline of Discovery',
        'image': 'Leyline of Discovery.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Librarian of the Infinite',
        'image': 'Librarian of the Infinite.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'List of Important Things',
        'image': 'List of Important Things.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Lol, Nop',
        'image': 'Lol Nop.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Look, a Distraction!',
        'image': 'Look a Distraction.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Lord of the Far Forest',
        'image': 'Lord of the Far Forest.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Lotus Seed',
        'image': 'Lotus Seed.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Luna, the Dream Warden',
        'image': 'Luna the Dream Warden.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Master Arcanomancer',
        'image': 'Master Arcanomancer.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Masterwork Brew',
        'image': 'Masterwork Brew.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Mbolo Potionkeeper',
        'image': 'Mbolo Potionkeeper.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Mbolo Warrior',
        'image': 'Mbolo Warrior.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Memory Switch',
        'image': 'Memory Switch.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Metria, Balance of Eternity',
        'image': 'Metria Balance of Eternity.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Midnight Studies',
        'image': 'Midnight Studies.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Moonlit Archive',
        'image': 'Moonlit Archive.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Moshaka Doll',
        'image': 'Moshaka Doll.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Mountain',
        'image': 'Mountain.1.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Mountain',
        'image': 'Mountain.2.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Mountain',
        'image': 'Mountain.3.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Mountain',
        'image': 'Mountain.4.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Mountain',
        'image': 'Mountain.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Nadir, the Intrepid',
        'image': 'Nadir the Intrepid.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Nightmare',
        'image': 'Nightmare.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Nightseeker',
        'image': 'Nightseeker.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Nightveil Blademaster',
        'image': 'Nightveil Blademaster.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Nightveil',
        'image': 'Nightveil.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Nightveil Raider',
        'image': 'Nightveil Raider.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Nimbus of Knowledge',
        'image': 'Nimbus of Knowledge.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Nocturnal Fragment',
        'image': 'Nocturnal Fragment.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Nurture the Earth',
        'image': 'Nurture the Earth.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Oakenshield Chevalier',
        'image': 'Oakenshield Chevalier.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Oakenshield Paladin',
        'image': 'Oakenshield Paladin.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Oceanus\' Dreamtwister',
        'image': 'Oceanus Dreamtwister.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Oceanus, Fell Guardian',
        'image': 'Oceanus Fell Guardian.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Oceanus\' Humor',
        'image': 'Oceanus Humor.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Overthink',
        'image': 'Overthink.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Paralunar Ritual',
        'image': 'Paralunar Ritual.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Partial Success Failure',
        'image': 'Partial Success Failure.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Peer Into the Future',
        'image': 'Peer Into the Future.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Pegassistance',
        'image': 'Pegassistance.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Pegasus Adventurer',
        'image': 'Pegasus Adventurer.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Pegasus',
        'image': 'Pegasus.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Pegasus Lightweaver',
        'image': 'Pegasus Lightweaver.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Pegasus Skyvillager',
        'image': 'Pegasus Skyvillager.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Pegasus Vanguard',
        'image': 'Pegasus Vanguard.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Plains',
        'image': 'Plains.1.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Plains',
        'image': 'Plains.2.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Plains',
        'image': 'Plains.3.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Plains',
        'image': 'Plains.4.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Plains',
        'image': 'Plains.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Planar Genesis',
        'image': 'Planar Genesis.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Polaris, Sword of the Word',
        'image': 'Polaris Sword of the Word.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Polychrome Prism',
        'image': 'Polychrome Prism.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Potioneer\'s Knacksack',
        'image': 'Potioneers Knacksack.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Potion of Pyrogenesis',
        'image': 'Potion of Pyrogenesis.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Potion of Strength',
        'image': 'Potion of Strength.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Purehearted Alicorn',
        'image': 'Purehearted Alicorn.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Pyroburst',
        'image': 'Pyroburst.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Quest Counter',
        'image': 'Quest Counter.1.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Quest Counter',
        'image': 'Quest Counter.2.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Quest Counter',
        'image': 'Quest Counter.3.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Quest Counter',
        'image': 'Quest Counter.4.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Quest Counter',
        'image': 'Quest Counter.5.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Quest Counter',
        'image': 'Quest Counter.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Quest for Harmony\'s Heart',
        'image': 'Quest for Harmonys Heart.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Quest for Keris\' Balefire',
        'image': 'Quest for Keris Balefire.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Quest for Lauren\'s Song',
        'image': 'Quest for Laurens Song.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Quest for Oceanus\' Last Joke',
        'image': 'Quest for Oceanus Last Joke.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Quest for Titan\'s First Law',
        'image': 'Quest for Titans First Law.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Rage Drinker',
        'image': 'Rage Drinker.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Rain Elemental',
        'image': 'Rain Elemental.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Rainshower',
        'image': 'Rainshower.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Rain Warden',
        'image': 'Rain Warden.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Raw Zap Apple',
        'image': 'Raw Zap Apple.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Recall the Relatives',
        'image': 'Recall the Relatives.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Red-Eyed Batpony',
        'image': 'Red-Eyed Batpony.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Return of the Pentarch',
        'image': 'Return of the Pentarch.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Return to Sender',
        'image': 'Return to Sender.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Royal Archive Expedition',
        'image': 'Royal Archive Expedition.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Seal of the Sun',
        'image': 'Seal of the Sun.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Search for Focus',
        'image': 'Search for Focus.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Search for Power',
        'image': 'Search for Power.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Search for Strength',
        'image': 'Search for Strength.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Search for Truth',
        'image': 'Search for Truth.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Search for Wisdom',
        'image': 'Search for Wisdom.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Seeker of Secrets',
        'image': 'Seeker of Secrets.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Shade Elemental',
        'image': 'Shade Elemental.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Shadowborn Batpony',
        'image': 'Shadowborn Batpony.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Shadowform Raider',
        'image': 'Shadowform Raider.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Shieldbreaker',
        'image': 'Shieldbreaker.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Skycouncil Elder',
        'image': 'Skycouncil Elder.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Skyguard Captain',
        'image': 'Skyguard Captain.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Skyguard Militia',
        'image': 'Skyguard Militia.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Smash Into Kindling',
        'image': 'Smash Into Kindling.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Solar Guard',
        'image': 'Solar Guard.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Sonic Blast',
        'image': 'Sonic Blast.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'South Sea Dragon',
        'image': 'South Sea Dragon.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Sowing Season',
        'image': 'Sowing Season.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Spectral Caveguard',
        'image': 'Spectral Caveguard.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Spectre of Living Shadow',
        'image': 'Spectre of Living Shadow.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Spell Wright',
        'image': 'Spell Wright.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Stargazing',
        'image': 'Stargazing.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Steadholdt Botanist',
        'image': 'Steadholdt Botanist.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Steadholdt Earthmagus',
        'image': 'Steadholdt Earthmagus.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Steadholdt',
        'image': 'Steadholdt.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Steadholdt Settler',
        'image': 'Steadholdt Settler.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Steadholdt Sharpshooter',
        'image': 'Steadholdt Sharpshooter.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Storm Wall',
        'image': 'Storm Wall.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Strike From the Skies',
        'image': 'Strike From the Skies.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Sunflight Cloudshaper',
        'image': 'Sunflight Cloudshaper.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Sunflight Corsair',
        'image': 'Sunflight Corsair.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Sunflight Crusader',
        'image': 'Sunflight Crusader.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Surge of Vitality',
        'image': 'Surge of Vitality.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Swamp',
        'image': 'Swamp.1.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Swamp',
        'image': 'Swamp.2.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Swamp',
        'image': 'Swamp.3.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Swamp',
        'image': 'Swamp.4.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Swamp',
        'image': 'Swamp.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Telekinetic Shove',
        'image': 'Telekinetic Shove.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Telekinetomancer',
        'image': 'Telekinetomancer.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Temple of Mazes',
        'image': 'Temple of Mazes.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Temporal Loophole',
        'image': 'Temporal Loophole.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Terra Arbora Animus',
        'image': 'Terra Arbora Animus.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Thundercloud Trap',
        'image': 'Thundercloud Trap.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Thunderstorm',
        'image': 'Thunderstorm.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Titan\'s Authority',
        'image': 'Titans Authority.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Titan, Scion of Order',
        'image': 'Titan Scion of Order.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Titan\'s Isomancer',
        'image': 'Titans Isomancer.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Tome Thief',
        'image': 'Tome Thief.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'To Steal From Eternity',
        'image': 'To Steal From Eternity.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Twilight Sparkle\'s Study Guide',
        'image': 'Twilight Sparkles Study Guide.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Twilight Sparkle, the Studious',
        'image': 'Twilight Sparkle the Studious.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Umbral Acolyte',
        'image': 'Umbral Acolyte.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Uncharted Leyline',
        'image': 'Uncharted Leyline.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Unicorn Adventurer',
        'image': 'Unicorn Adventurer.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Unicorn Aeromancer',
        'image': 'Unicorn Aeromancer.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Unicorn Shieldwright',
        'image': 'Unicorn Shieldwright.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Ursa Minor',
        'image': 'Ursa Minor.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Vaelek, Hammer of Genius',
        'image': 'Vaelek Hammer of Genius.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Valleypost',
        'image': 'Valleypost.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Veil of Shadows',
        'image': 'Veil of Shadows.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Vial of Balefire',
        'image': 'Vial of Balefire.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Wall of the Darrow',
        'image': 'Wail of the Darrow.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Warden of Keris',
        'image': 'Warden of Keris.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Waystone',
        'image': 'Waystone.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Weaponized Echolocation',
        'image': 'Weaponized Echolocation.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Weathered Map',
        'image': 'Weathered Map.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Weather Team Captain',
        'image': 'Weather Team Captain.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Weather Worker',
        'image': 'Weather Worker.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Wind Elemental',
        'image': 'Wind Elemental.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Windshear',
        'image': 'Windshear.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Windshear Weathermage',
        'image': 'Windshear Weathermage.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Wonderbolt Squad',
        'image': 'Wonderbolt Squad.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Xanthe, the Wanderer',
        'image': 'Xanthe the Wanderer.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Ye Olde Switcheroony',
        'image': 'Ye Olde Switcheroony.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Zebra Adventurer',
        'image': 'Zebra Adventurer.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Zebra Firekeeper',
        'image': 'Zebra Firekeeper.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Zebra War Paint',
        'image': 'Zebra War Paint.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Zvaha Infiltrator',
        'image': 'Zvaha Infiltrator.jpg',
        'set': 'Nightfall'
    },
    {
        'name': 'Ahuizotl',
        'image': 'Ahuizotl.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Ahuizotl\'s Command',
        'image': 'Ahuizotl\'s Command.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Ahuizotl\'s War Pride',
        'image': 'Ahuizotls War-Pride.png',
        'set': 'Ponylude'
    },
    {
        'name': 'A Little Dash',
        'image': 'A Little Dash.png',
        'set': 'Ponylude'
    },
    {
        'name': 'All Tied At The Moment',
        'image': 'All Tied Up At The Moment.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Aloe and Lotus',
        'image': 'Aloe and Lotus.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Angel Bunny',
        'image': 'Angel Bunny.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Applebloom',
        'image': 'Applebloom.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Applebuck',
        'image': 'Applebuck.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Applejack',
        'image': 'Applejack.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Applejack\'s Lasso',
        'image': 'Applejacks Lasso.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Appleloosa Frontier',
        'image': 'Appleloosa Frontier.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Appleloosa Stagecoach',
        'image': 'Appleoosa Stagecoach.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Arachnimate',
        'image': 'Arachnimate.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Assertiveness Training',
        'image': 'Assertiveness Training.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Baked Bads',
        'image': 'Baked Bads.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Big McIntosh',
        'image': 'Big McIntosh.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Bloomberg',
        'image': 'Bloomberg.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Bon-Bon',
        'image': 'Bon-Bon.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Braeburn',
        'image': 'Braeburn.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Buccaneer Blaze',
        'image': 'Buccaneer Blaze.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Canterlot Board of Education',
        'image': 'Canterlot Board of Education.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Canterlot Castle',
        'image': 'Canterlot Castle.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Canterlot Elite',
        'image': 'Canterlot Elite.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Canterlot Phalanx',
        'image': 'Canterlot Phalanx.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Canterlot Sky-Chariot',
        'image': 'Canterlot Sky-Chariot.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Captain Spitfire',
        'image': 'Captain Spitfire.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Celestia\'s Command',
        'image': 'Celestia\'s Command.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Cerberus',
        'image': 'Cerberus.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Chancellor Puddinghead',
        'image': 'Chancellor Puddinghead.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Chancellor\'s Map',
        'image': 'Chancellors Map.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Changeling Divebomber',
        'image': 'Changeling Divebomber.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Changeling Saboteur',
        'image': 'Changeling Saboteur.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Changeling Savant',
        'image': 'Changeling Savant.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Changeling Strikers',
        'image': 'Changeling Strikers.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Cheerilee',
        'image': 'Cheerilee.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Cherry Jubilee',
        'image': 'Cherry Jubilee.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Chief Thunderhooves',
        'image': 'Chief Thunderhooves.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Chrysalis\' Command',
        'image': 'Chrysalis\' Command.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Cloudbuck',
        'image': 'Cloudbuck.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Cloudsdale Weather Factory',
        'image': 'Cloudsdale Weather Factory.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Cloudsdale Weather Patrol',
        'image': 'Cloudsdale Weather Patrol.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Cloudshift',
        'image': 'Cloudshift.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Clover the Clever',
        'image': 'Clover the Clever.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Clovis',
        'image': 'Clovis.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Commander Hurricane',
        'image': 'Commander Hurricane.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Crackle\'s Cousin',
        'image': 'Crackles Cousin.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Cranky Doodle Donkey',
        'image': 'Cranky Doodle Donkey.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Cuteceañera',
        'image': 'Cuteceañera.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Cutie Pox',
        'image': 'Cutie Pox.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Daring-Do',
        'image': 'Daring-Do.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Death by Embarrassment',
        'image': 'Death by Embarrassment.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Derpy',
        'image': 'Derpy.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Diamond Dog Digger',
        'image': 'Diamond Dog Digger.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Diamond Dog Enforcer',
        'image': 'Diamond Dog Enforcer.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Diamond Tiara',
        'image': 'Diamond Tiara.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Discord',
        'image': 'Discord.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Discord\'s Command',
        'image': 'Discord\'s Command.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Discord\'s Labyrinth',
        'image': 'Discord\'s Labyrinth.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Doctor Hoofington',
        'image': 'Doctor Hoofington.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Doctor Whooves',
        'image': 'Doctor Whooves.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Donut Joe',
        'image': 'Donut Joe.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Draconequus Totem',
        'image': 'Draconequus Totem.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Dragon\'s Belch',
        'image': 'Dragons Belch.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Dragon\'s Greed',
        'image': 'Dragons Greed.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Eeeyup',
        'image': 'Eeeyup.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Enchantress\' Brew',
        'image': 'Enchantress Brew.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Everfree Cockatrice',
        'image': 'Everfree Cockatrice.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Everfree Forest',
        'image': 'Everfree Forest.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Everfree Ghostie',
        'image': 'Everfree Ghostie.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Everfree Hellkite',
        'image': 'Everfree Hellkite.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Everfree Manticore',
        'image': 'Everfree Manticore.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Evil Enchantress',
        'image': 'Evil Enchantress.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Explorer\'s Cunning',
        'image': 'Explorers Cunning.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Fancy Mathematics',
        'image': 'Fancy Mathematics.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Fancy Pants',
        'image': 'Fancy Pants.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Feast of the Unicorn',
        'image': 'Feast of the Unicorn.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Feather Flu',
        'image': 'Feather Flu.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Featherweight',
        'image': 'Featherweight.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Filthy Rich',
        'image': 'Filthy Rich.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Flam\'s Gambit',
        'image': 'Flams Gambit.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Fleetfoot',
        'image': 'Fleetfoot.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Flim Flam Brothers',
        'image': 'Flim Flam Brothers.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Flim\'s Gambit',
        'image': 'Flims Gambit.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Fluttershy',
        'image': 'Fluttershy.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Fluttershy\'s Frog Wagon',
        'image': 'Fluttershys Frog Wagon.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Forest',
        'image': 'Forest.1.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Forest',
        'image': 'Forest.2.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Forest',
        'image': 'Forest.3.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Forest',
        'image': 'Forest.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Froggy Bottom Bog',
        'image': 'Froggy Bottom Bog.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Froggy Bottom Hydra',
        'image': 'Froggy Bottom Hydra.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Future Twilight',
        'image': 'Future Twilight.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Gabby Gums Exposé',
        'image': 'Gabby Gums Exposé.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Garble',
        'image': 'Garble.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Gatling Unicorn',
        'image': 'Gatling Unicorn.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Gemstone Mine',
        'image': 'Gemstone Mine.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Ghastly Gorge',
        'image': 'Ghastly Gorge.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Gilda',
        'image': 'Gilda.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Grand Galloping Gala',
        'image': 'Grand Galloping Gala.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Granny Smith',
        'image': 'Granny Smith.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Gummy',
        'image': 'Gummy.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Gustave Le Grand',
        'image': 'Gustave Le Grand.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Gypsy Magic',
        'image': 'Gypsy Magic.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Haggling 101',
        'image': 'Haggling lOl .png',
        'set': 'Ponylude'
    },
    {
        'name': 'Horse Power',
        'image': 'Horse Power.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Iron Will (Not the Urza\'s Legacy One)',
        'image': 'Iron Will Not the Urzas Legacy One.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Island',
        'image': 'Island.1.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Island',
        'image': 'Island.2.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Island',
        'image': 'Island.3.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Island',
        'image': 'Island.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Letter to Celestia',
        'image': 'Letter to Celestia.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Little Strongheart',
        'image': 'Little Strongheart.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Lost in Study',
        'image': 'Lost in Study.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Lyra Heartstrings',
        'image': 'Lyra Heartstrings.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Magical Overglow',
        'image': 'Magical Overglow.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Mare-do-Well',
        'image': 'Mare-do-Well.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Marzipan Mascarpone Meringue Madness',
        'image': 'Marzipan Mascarpone Meringue Madness.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Matilda',
        'image': 'Matilda.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Mayor Mare',
        'image': 'Mayor Mare.png',
        'set': 'Ponylude'
    },
    {
        'name': 'May the Best Pet Win',
        'image': 'May the Best Pet Win.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Mister and Missus Cake',
        'image': 'Mister and Missus Cake.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Mister Greenhooves',
        'image': 'Mister Greenhooves.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Mountain',
        'image': 'Mountain.1.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Mountain',
        'image': 'Mountain.2.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Mountain',
        'image': 'Mountain.3.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Mountain',
        'image': 'Mountain.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Mulia Mild',
        'image': 'Mulia Mild.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Natural End',
        'image': 'Natural End.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Nightmare Moon',
        'image': 'Nightmare Moon.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Nightmare\'s Grip',
        'image': 'Nightmares Grip.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Nnnope',
        'image': 'Nnnope.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Nurse Redheart',
        'image': 'Nurse Redheart.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Octavia',
        'image': 'Octavia.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Ominous Will',
        'image': 'Ominous Will.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Opal',
        'image': 'Opal.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Owloysius',
        'image': 'Owloysius.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Party Cannon',
        'image': 'Party Cannon.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Pegassistance',
        'image': 'Pegassistance.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Pegasus Stampede',
        'image': 'Pegasus Stampede.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Philomeena',
        'image': 'Philomeena.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Phoenix Flame',
        'image': 'Phoenix Flame.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Photo Finish',
        'image': 'Photo Finish.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Pie Barrage',
        'image': 'Pie Barrage.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Pinkie Pie',
        'image': 'Pinkie Pie.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Pinkie Pie\'s Trombone',
        'image': 'Pinkie Pies Trombone.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Pinkie Sense',
        'image': 'Pinkie Sense.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Pipsqueak',
        'image': 'Pipsqueak.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Plains',
        'image': 'Plains.1.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Plains',
        'image': 'Plains.2.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Plains',
        'image': 'Plains.3.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Plains',
        'image': 'Plains.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Ponyville Contractors',
        'image': 'Ponyville Contractors.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Ponyville Marketplace',
        'image': 'Ponyville Marketplace.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Poultrify',
        'image': 'Poultrify.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Princess Cadance',
        'image': 'Princess Cadance.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Princess Celestia',
        'image': 'Princess Celestia.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Princess Luna',
        'image': 'Princess Luna.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Private Pansy',
        'image': 'Private Pansy.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Quadrifirmifractimancy',
        'image': 'Quadrifirmifractimancy.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Quarray Eel',
        'image': 'Quarray Eel.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Queen Chrysalis',
        'image': 'Queen Chrysalis.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Rain-Blow Dry',
        'image': 'Rain-Blow Dry.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Rainbow Dash',
        'image': 'Rainbow Dash.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Rainbow Dash\'s Shades',
        'image': 'Rainbow Dashs Shades.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Rampaging Rabbits',
        'image': 'Rampaging Rabbits.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Rapidfire',
        'image': 'Rapidfire.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Rarity',
        'image': 'Rarity.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Rarity\'s Giant Hat',
        'image': 'Raritys Giant Hat.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Rise of the Bridlemaids',
        'image': 'Rise of the Bridlemaids.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Rock Farm',
        'image': 'Rock Farm.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Royal Canterlot Guard',
        'image': 'Royal Canterlot Guard.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Royal Canterlot Voice',
        'image': 'Royal Canterlot Voice.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Royal Fanfare',
        'image': 'Royal Fanfare.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Ruckus // Fracas',
        'image': 'Ruckus.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Running of the Leaves',
        'image': 'Running of the Leaves.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Sapphire Shores',
        'image': 'Sapphire Shores.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Sapphire Statue',
        'image': 'Sapphire Statue.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Scootaloo',
        'image': 'Scootaloo.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Seeds of Truth',
        'image': 'Seeds of Truth.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Shadowbolt Squadron',
        'image': 'Shadowbolt Squadron.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Shadow of the Moon',
        'image': 'Shadow of the Moon.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Silver Spoon',
        'image': 'Silver Spoon.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Smart Cookie',
        'image': 'Smart Cookie.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Smarty Pants Doll',
        'image': 'Smarty Pants Doll.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Smash to Smithereens',
        'image': 'Smash to Smithereens.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Snips and Snails',
        'image': 'Snips and Snails.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Snowflake',
        'image': 'Snowflake.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Soaking Wet and Clueless',
        'image': 'Soaking Wet and Clueless.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Sofas and Quills',
        'image': 'Sofas and Quills.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Sonic Rainboom',
        'image': 'Sonic Rainboom.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Soothe the Beast',
        'image': 'Soothe the Beast.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Spike',
        'image': 'Spike.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Spike Unleashed',
        'image': 'Spike Unleashed.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Starswirl the Bearded',
        'image': 'Starswirl the Bearded.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Steven Magnet',
        'image': 'Steven Magnet.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Storm Herd',
        'image': 'Storm Herd.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Stupefy',
        'image': 'Stupefy.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Super Speedy Cider Squeezy 6000',
        'image': 'Super Speedy Cider Squeezy 6000.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Swamp',
        'image': 'Swamp.1.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Swamp',
        'image': 'Swamp.2.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Swamp',
        'image': 'Swamp.3.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Swamp',
        'image': 'Swamp.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Swarm of Butterflies',
        'image': 'Swarm of Butterflies.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Sweetie Belle',
        'image': 'Sweetie Belle.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Tactical Rainboom',
        'image': 'Tactical Rainboom.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Tale of the Headless Horse',
        'image': 'Tale of the Headless Horse.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Tank',
        'image': 'Tank.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Terrifying Revelation',
        'image': 'Terrifying Revelation.png',
        'set': 'Ponylude'
    },
    {
        'name': 'The Elements of Harmony',
        'image': 'The Elements of Harmony.png',
        'set': 'Ponylude'
    },
    {
        'name': 'The Great and Powerful Trixie',
        'image': 'The Great and Powerful Trixie.png',
        'set': 'Ponylude'
    },
    {
        'name': 'The Spark Ignited',
        'image': 'The Spark Ignited.png',
        'set': 'Ponylude'
    },
    {
        'name': 'The Stare',
        'image': 'The Stare.png',
        'set': 'Ponylude'
    },
    {
        'name': 'The Worst Possible Thing',
        'image': 'The Worst Possible Thing.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Thorn in the Paw',
        'image': 'Thorn in the Paw.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Thunderlane',
        'image': 'Thunderlane.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Timberwolf Pack',
        'image': 'Timberwolf Pack.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Time to Feed',
        'image': 'Time to Feed.png',
        'set': 'Ponylude'
    },
    {
        'name': 'To the Moon!',
        'image': 'To The Moon!.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Touch of Chaos',
        'image': 'Touch of Chaos.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Twilight Sparkle',
        'image': 'Twilight Sparkle.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Twilight Sparkle\'s Spellbook',
        'image': 'Twilight Sparkles Spellbook.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Twist',
        'image': 'Twist.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Unbridled Rage',
        'image': 'Unbridled Rage.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Ursa Major',
        'image': 'Ursa Major.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Ursa Minor',
        'image': 'Ursa Minor.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Ventriloquism',
        'image': 'Ventriloquism.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Vinyl Scratch',
        'image': 'Vinyl Scratch.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Weaponized Pinkie',
        'image': 'Weaponized Pinkie.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Welcome Wagon',
        'image': 'Welcome Wagon.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Windigo',
        'image': 'Windigo.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Wingcantation',
        'image': 'Wingcantation.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Winona',
        'image': 'Winona.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Winsome Falls',
        'image': 'Winsome Falls.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Zap Apple Harvest',
        'image': 'Zap Apple Harvest.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Zecora',
        'image': 'Zecora.png',
        'set': 'Ponylude'
    },
    {
        'name': 'Applebloom',
        'image': 'applebloom___fimtg_by_kitonin-d3is4hy.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Applebucking',
        'image': 'applebucking_by_kitonin-d3is4st.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Applejack',
        'image': 'applejack_by_kitonin-d3is50o.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Art of the Dress',
        'image': 'art_of_the_dress___fimtg_by_kitonin-d3is57t.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Baked Bads',
        'image': 'baked_bads___fimtg_by_kitonin-d3is5au.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Best Intentions',
        'image': 'best_intentions___fimtg_by_kitonin-d3is5e6.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Big Macintosh',
        'image': 'big_macintosh___fimig_by_kitonin-d3is5i5.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Canterlot',
        'image': 'canterlot___fimtg_by_kitonin-d3is5nb.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Celestia, Reagent of the Sun',
        'image': 'celestia__rots___fimtg_by_kitonin-d3is5vx.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Celestia\'s Guards',
        'image': 'celestia__s_guards___fimtg_by_kitonin-d3is5yk.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Cockatrice\'s Gaze',
        'image': 'cockatrice__s_gaze___fimtg_by_kitonin-d3is61m.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Cupcakes',
        'image': 'cupcakes___fimtg_by_kitonin-d3is65t.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Cutie Mark Crusading',
        'image': 'cutie_mark_crusading___fimtg_by_kitonin-d3is6a6.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Derpy Hooves',
        'image': 'derpy_hooves___fimtg_by_kitonin-d3is6ew.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Determination',
        'image': 'determination___fimtg_by_kitonin-d3is6ju.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Devour Everything',
        'image': 'devour_everything___fimtg_by_kitonin-d3is6nb.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'DJ Pon-3',
        'image': 'dj_pon_3___fimtg_by_kitonin-d3is6tw.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Doctor Whooves',
        'image': 'doctor_whooves___fimtg_by_kitonin-d3is6x8.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Doctor Whooves, My Little Time Lord',
        'image': 'docto_whooves_mltl___fimtg_by_kitonin-d3is73e.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Elements of Harmony',
        'image': 'elements_of_harmony___fimtg_by_kitonin-d3is76m.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Everfree Forest',
        'image': 'everfree_forest___fimtg_by_kitonin-d3is7bk.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Everfree Manticore',
        'image': 'everfree_manticore___fimtg_by_kitonin-d3is7es.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Froggy Bottom Bog Hydra',
        'image': 'fbb_hydra___fimtg_by_kitonin-d3ismck.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Fluttershy',
        'image': 'fluttershy___fimtg_by_kitonin-d3is7mn.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Gilda, Enraged',
        'image': 'gilda__enraged___fimtg_by_kitonin-d3isodm.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Gilda',
        'image': 'gilda___fimtg_by_kitonin-d3iso4h.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Guests at the Party of One',
        'image': 'guests_at_the_party_____fimtg_by_kitonin-d3isotj.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Hooded Zecora',
        'image': 'hooded_zecora_by_kitonin-d3isp14.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Luna\'s Abacus',
        'image': 'luna__s_abacus___fimtg_by_kitonin-d3ispbm.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Meet the Apple Clan',
        'image': 'meet_the_apple_clan___fimtg_by_kitonin-d3ispq9.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Nightmare Moon',
        'image': 'nightmare_moon___fimtg_by_kitonin-d3isq0c.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Octavia',
        'image': 'octavia___fimtg_by_kitonin-d3isqa7.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Owlowiscious',
        'image': 'owlowiscious___fimtg_by_kitonin-d3isqjj.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Parasprite',
        'image': 'parasprite___fimtg_by_kitonin-d3isqyi.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Pinkie Pie',
        'image': 'pinkie_pie___fimtg_by_kitonin-d3isrjr.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Pinkie Pie\'s Flying Machine',
        'image': 'pinkie_pie__s_fm___fimtg_by_kitonin-d3iss0j.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Pinkie Sense',
        'image': 'pinkie_sense___fimtg_by_kitonin-d3isscd.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Pinkie\'s Hypnotizing Gaze',
        'image': 'pinkie__s_hg___fimtg_by_kitonin-d3issiu.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Ponyville Medical Tent',
        'image': 'ponyville_med__tent___fimtg_by_kitonin-d3isspf.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Princess Celestia',
        'image': 'princess_celestia___fimtg_by_kitonin-d3istbo.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Princess Luna',
        'image': 'princess_luna___fimtg_by_kitonin-d3istkm.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Rainbow Battle Armor',
        'image': 'rainbow_b__armor___fimtg_by_kitonin-d3istr0.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Rainbow Dash',
        'image': 'rainbow_dash___fimtg_by_kitonin-d3isu5j.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Rarity',
        'image': 'rarity___fimtg_by_kitonin-d3isuir.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Sciaphobia',
        'image': 'sciaphobia___fimtg_by_kitonin-d3isutv.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Scootaloo',
        'image': 'scootaloo___fimtg_by_kitonin-d3isv05.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Shadowbolt',
        'image': 'shadowbolt_token___fimtg_by_kitonin-d3isv4g.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Slight Overreaction',
        'image': 'slight_overreaction___fimtg_by_kitonin-d3isvck.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Sonic Rainboom',
        'image': 'sonic_rainboom_by_kitonin-d3isvv6.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Spike, Dream Paladin',
        'image': 'spike__dream_paladin___fimtg_by_kitonin-d3iswjt.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Spike',
        'image': 'spike___fimtg_by_kitonin-d3isw9o.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Surprise Party',
        'image': 'surprise_party___fimtg_by_kitonin-d3iswwp.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Sweetie Belle',
        'image': 'sweetie_belle_by_kitonin-d3isx7b.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'The Great and Powerful Trixie',
        'image': 'tgap_trixie___fimtg_by_kitonin-d3isxk3.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'The Shadowbolts',
        'image': 'the_shadowbolts___fimtg_by_kitonin-d3isxqf.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'The Stare',
        'image': 'the_stare___fimtg_by_kitonin-d3isy4a.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'The Wonderbolts',
        'image': 'the_wonderbolts___fimtg_by_kitonin-d3isyfq.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Trixie the Deserter',
        'image': 'trixie_the_deserter___fimtg_by_kitonin-d3isypd.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Twilight Sparkle',
        'image': 'twilight_sparkle___fimtg_by_kitonin-d3isyzx.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Vinyl Scratch',
        'image': 'vinyl_scratch___fimtg_by_kitonin-d3isz8c.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Vocal Complaint',
        'image': 'vocal_complaint_by_kitonin-d3iszfp.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Wing Lock',
        'image': 'wing_lock___fimtg_by_kitonin-d3iszo6.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Winter Wrap-up Cloud Drill',
        'image': 'ww_cloud_drill___fimtg_by_kitonin-d3iszxt.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Zecora, Everfree Enchantress',
        'image': 'zecora__ee___fimtg_by_kitonin-d3it064.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Zecora\'s Cauldron',
        'image': 'zecora__s_cauldron___fimtg_by_kitonin-d3it0jh.jpg',
        'set': 'Friendship is Magic the Gathering',
        'creator': 'Kitonin'
    },
    {
        'name': 'Applejack, Geomancer',
        'image': 'crisis_equestria__applejack__geomancer_by_rowcla-d5a40in.jpg',
        'set': 'CRISIS EQUESTRIA',
        'creator': 'rowcla'
    },
    {
        'name': 'Blackburn',
        'image': 'crisis_equestria__blackburn_by_rowcla-d5fmlo0.jpg',
        'set': 'CRISIS EQUESTRIA',
        'creator': 'rowcla'
    },
    {
        'name': 'Curaçao',
        'image': 'crisis_equestria__curacao_by_rowcla-d5a40b4.jpg',
        'set': 'CRISIS EQUESTRIA',
        'creator': 'rowcla'
    },
    {
        'name': 'Desolate Caverns',
        'image': 'crisis_equestria__desolate_caverns_by_rowcla-d61wz2e.jpg',
        'set': 'CRISIS EQUESTRIA',
        'creator': 'rowcla'
    },
    {
        'name': 'Flathoof',
        'image': 'crisis_equestria__flathoof_by_rowcla-d5lz3rz.jpg',
        'set': 'CRISIS EQUESTRIA',
        'creator': 'rowcla'
    },
    {
        'name': 'Fluttershy, Zoolomancer',
        'image': 'crisis_equestria__fluttershy__zoolomancer_by_rowcla-d5a40rf.jpg',
        'set': 'CRISIS EQUESTRIA',
        'creator': 'rowcla'
    },
    {
        'name': 'Grayscale Force',
        'image': 'crisis_equestria__greyscale_force_by_rowcla-d5a412a.jpg',
        'set': 'CRISIS EQUESTRIA',
        'creator': 'rowcla'
    },
    {
        'name': 'Harmonia',
        'image': 'crisis_equestria__harmonia_by_rowcla-d63ky7r.jpg',
        'set': 'CRISIS EQUESTRIA',
        'creator': 'rowcla'
    },
    {
        'name': 'Havocwing',
        'image': 'crisis_equestria__havocwing_by_rowcla-d5a418q.jpg',
        'set': 'CRISIS EQUESTRIA',
        'creator': 'rowcla'
    },
    {
        'name': 'Insipid',
        'image': 'crisis_equestria__insipid_by_rowcla-d5a41g4.jpg',
        'set': 'CRISIS EQUESTRIA',
        'creator': 'rowcla'
    },
    {
        'name': 'Lockwood, Afflicted',
        'image': 'crisis_equestria__lockwood__afflicted_by_rowcla-d5if6b8.jpg',
        'set': 'CRISIS EQUESTRIA',
        'creator': 'rowcla'
    },
    {
        'name': 'Nihilia',
        'image': 'crisis_equestria__nihilia_by_rowcla-d5ikngo.jpg',
        'set': 'CRISIS EQUESTRIA',
        'creator': 'rowcla'
    },
    {
        'name': 'Pinkie Pie, Verisimulamancer',
        'image': 'crisis_equestria__pinkie_pie__verisimulamancer_by_rowcla-d5a41mi.jpg',
        'set': 'CRISIS EQUESTRIA',
        'creator': 'rowcla'
    },
    {
        'name': 'Rainbow Dash, Meteomancer',
        'image': 'crisis_equestria__rainbow_dash__meteomancer_by_rowcla-d5a41sh.jpg',
        'set': 'CRISIS EQUESTRIA',
        'creator': 'rowcla'
    },
    {
        'name': 'Rarity, Benefomancer',
        'image': 'crisis_equestria__rarity__benefomancer_by_rowcla-d5a425t.jpg',
        'set': 'CRISIS EQUESTRIA',
        'creator': 'rowcla'
    },
    {
        'name': 'Red Velvet',
        'image': 'crisis_equestria__red_velvet_by_rowcla-d5a42a3.jpg',
        'set': 'CRISIS EQUESTRIA',
        'creator': 'rowcla'
    },
    {
        'name': 'Rendezvous',
        'image': 'crisis_equestria__rendezvous_by_rowcla-d5qdgu5.jpg',
        'set': 'CRISIS EQUESTRIA',
        'creator': 'rowcla'
    },
    {
        'name': 'Shadowstep',
        'image': 'crisis_equestria__shadowstep_by_rowcla-d5a42is.jpg',
        'set': 'CRISIS EQUESTRIA',
        'creator': 'rowcla'
    },
    {
        'name': 'Starlight Shadow',
        'image': 'crisis_equestria__starlight_shadow_by_rowcla-d5a42rf.jpg',
        'set': 'CRISIS EQUESTRIA',
        'creator': 'rowcla'
    },
    {
        'name': 'Tick Tock',
        'image': 'crisis_equestria__tick_tock_by_rowcla-d5ikp50.jpg',
        'set': 'CRISIS EQUESTRIA',
        'creator': 'rowcla'
    },
    {
        'name': 'Twilight Sparkle, Arcanist',
        'image': 'crisis_equestria__twilight_sparkle__arcanist_by_rowcla-d5a42ze.jpg',
        'set': 'CRISIS EQUESTRIA',
        'creator': 'rowcla'
    },
    {
        'name': 'Uncontrollable Portal',
        'image': 'crisis_equestria__uncontrollable_portal_by_rowcla-d620emh.jpg',
        'set': 'CRISIS EQUESTRIA',
        'creator': 'rowcla'
    },
    {
        'name': 'Havocwing, Infernomancer Unleashed',
        'image': 'havocwing_infernomancer_unleashed_by_rowcla-d6wmx9m.jpg',
        'set': 'CRISIS EQUESTRIA',
        'creator': 'rowcla'
    },
    {
        'name': 'Red Velvet, Hemomancer Unleashed',
        'image': 'red_velvet__hemomancer_unleashed_by_rowcla-d5v8gql.jpg',
        'set': 'CRISIS EQUESTRIA',
        'creator': 'rowcla'
    },
    {
        'name': 'Relucent Dawn',
        'image': 'relucent_dawn_by_rowcla-d6dul7v.jpg',
        'set': 'CRISIS EQUESTRIA',
        'creator': 'rowcla'
    },
    {
        'name': 'Silvertongue',
        'image': 'silvertongue_by_rowcla-d5fmlcd.jpg',
        'set': 'CRISIS EQUESTRIA',
        'creator': 'rowcla'
    },
    {
        'name': 'Starlight Shadow, Voidmancer Unleashed',
        'image': 'starlight_shadow__voidmancer_unleashed_by_rowcla-d5vp3qh.jpg',
        'set': 'CRISIS EQUESTRIA',
        'creator': 'rowcla'
    },
    {
        'name': 'Volatile Terrain',
        'image': 'volatile_terrain_by_rowcla-d6dzve6.jpg',
        'set': 'CRISIS EQUESTRIA',
        'creator': 'rowcla'
    },
    {
        'name': 'Ahuizotl',
        'image': 'ahuizotl_by_rowcla-d5to9tq.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Airheart',
        'image': 'airheart_by_rowcla-d5to9t2.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Angel',
        'image': 'angel_by_rowcla-d5to9s9.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Applebloom',
        'image': 'applebloom_by_rowcla-d5to9qr.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Apple Cobbler',
        'image': 'apple_cobbler_by_rowcla-d5toavp.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Apple Fritter',
        'image': 'apple_fritter_by_rowcla-d5to9ro.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Assemble the Forces',
        'image': 'assemble_the_forces_by_rowcla-d5to9q2.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Blinkie Pie',
        'image': 'blinkie_pie_by_rowcla-d5to9p0.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Blossomforth',
        'image': 'blossomforth_by_rowcla-d5to9o7.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Bon Bon',
        'image': 'bon_bon_by_rowcla-d5to9mk.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Braeburn',
        'image': 'braeburn_by_rowcla-d5to9lh.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Bromidic Distraction',
        'image': 'bromidic_distraction_by_rowcla-d5to9hp.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Call to Fight',
        'image': 'call_to_fight_by_rowcla-d5to9km.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Canterlot',
        'image': 'canterlot_by_rowcla-d5to9jr.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Carrot Top',
        'image': 'carrot_top_by_rowcla-d5to9ir.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Cataclysmic Realms',
        'image': 'cataclysmic_realms_by_rowcla-d5to9gi.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Celestia, Princess of the sun',
        'image': 'celestia_princess_of_the_sun_by_rowcla-d5to9fr.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Chaotic Guidance',
        'image': 'chaotic_guidance_by_rowcla-d5to9ey.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Chaotic Inferno',
        'image': 'chaotic_inferno_by_rowcla-d5to9dt.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Chaotic Shadows',
        'image': 'chaotic_shadows_by_rowcla-d5to9d9.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Cheerilee',
        'image': 'cheerilee_by_rowcla-d5to9cg.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Chrysalis, Changeling Queen',
        'image': 'chrysalis_changeling_queen_by_rowcla-d5to9bt.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Cloudkicker',
        'image': 'cloudkicker_by_rowcla-d5to9b0.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Clyde',
        'image': 'clyde_by_rowcla-d5to99v.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Colgate',
        'image': 'colgate_by_rowcla-d5to997.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Consult the Advisor',
        'image': 'consult_the_advisor_by_rowcla-d5to982.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Cranky Doodle',
        'image': 'cranky_doodle_by_rowcla-d5to96z.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Crippling Darkness',
        'image': 'crippling_darkness_by_rowcla-d5to961.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Daisy',
        'image': 'daisy_by_rowcla-d5to958.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Daring Do',
        'image': 'daring_do_by_rowcla-d5to94j.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Dark Possession',
        'image': 'dark_possession_by_rowcla-d5to93l.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Deadlands',
        'image': 'deadlands_by_rowcla-d5to92r.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Demonic Carnage',
        'image': 'demonic_carnage_by_rowcla-d5to91w.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Doctor Stable',
        'image': 'doctor_stable_by_rowcla-d5to90t.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Donut Joe',
        'image': 'donut_joe_by_rowcla-d5to8zt.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Dragon Mountains',
        'image': 'dragon_mountains_by_rowcla-d5to8yu.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Dreamwalking',
        'image': 'dreamwalking_by_rowcla-d5to8xt.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Explore',
        'image': 'explore_by_rowcla-d5to8wv.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Featherweight',
        'image': 'featherweight_by_rowcla-d5to8w6.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Fertile Ground',
        'image': 'fertile_ground_by_rowcla-d5to8v3.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Flim and Flam',
        'image': 'flim_and_flam_by_rowcla-d5to8u9.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Fluttershy',
        'image': 'fluttershy_by_rowcla-d5to8tk.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Forest',
        'image': 'forest_1_by_rowcla-d5to8so.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Forest',
        'image': 'forest_by_rowcla-d5to8rx.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Gustave Le Grand',
        'image': 'gustave_le_grand_by_rowcla-d5to8qx.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Hayseed',
        'image': 'hayseed_by_rowcla-d5to8px.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Inkie Pie',
        'image': 'inkie_pie_by_rowcla-d5to8oz.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Island',
        'image': 'island_1_by_rowcla-d5to8nz.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Island',
        'image': 'island_by_rowcla-d5to8nb.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Isolation',
        'image': 'isolation_by_rowcla-d5to8m8.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Knowledge Pursuance',
        'image': 'knowledge_pursuance_by_rowcla-d5to8li.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Lemon Daze',
        'image': 'lemon_daze_by_rowcla-d5to8ku.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Lily',
        'image': 'lily_by_rowcla-d5to8jm.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Lucy Packard',
        'image': 'lucy_packard_by_rowcla-d5to8ik.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Lunar Guidance',
        'image': 'lunar_guidance_by_rowcla-d5to8hk.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Lunar Ode',
        'image': 'lunar_ode_by_rowcla-d5to8gn.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Lyra Heartstrings',
        'image': 'lyra_heartstrings_by_rowcla-d5to8fm.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Madame Le Flour',
        'image': 'madame_le_flour_by_rowcla-d5to8e7.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Madden',
        'image': 'madden_by_rowcla-d5to8db.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Magical Corruption',
        'image': 'magical_corruption_by_rowcla-d5to8ah.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Magic Barrier',
        'image': 'magic_barrier_by_rowcla-d5to8cg.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Magic Warding',
        'image': 'magic_warding_by_rowcla-d5to8bi.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Mana Spiral',
        'image': 'mana_spiral_by_rowcla-d5to89q.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Matilda',
        'image': 'matilda_by_rowcla-d5to88t.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Medley',
        'image': 'medley_by_rowcla-d5to881.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Molten Spire',
        'image': 'molten_spire_by_rowcla-d5to878.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Mountain',
        'image': 'mountain_1_by_rowcla-d5to86j.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Mountain',
        'image': 'mountain_by_rowcla-d5to85t.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Mr. and Mrs. Cake',
        'image': 'mr__and_mrs__cake_by_rowcla-d5to854.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Natural Congregation',
        'image': 'natural_congregation_by_rowcla-d5to83s.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Nature\'s Guidance',
        'image': 'natures_guidance_by_rowcla-d5to830.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Night Terrors',
        'image': 'night_terrors_by_rowcla-d5to81w.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Ninja Doodle',
        'image': 'ninja_doodle_by_rowcla-d5to80w.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Nurse Coldheart',
        'image': 'nurse_coldheart_by_rowcla-d5to804.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Nurse Coldheart',
        'image': 'nurse_coldheart_by_rowcla-d5tobhf.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Nurse Redheart',
        'image': 'nurse_redheart_by_rowcla-d5to7yy.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Nurse Sweetheart',
        'image': 'nurse_sweetheart_by_rowcla-d5to7xu.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Oceanic Guidance',
        'image': 'oceanic_guidance_by_rowcla-d5to7ws.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Owlowiscious',
        'image': 'owlowiscious_by_rowcla-d5to7uv.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Parasite Outbreak',
        'image': 'parasite_outbreak_by_rowcla-d5to7u2.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Peeking Cat',
        'image': 'peeking_cat_by_rowcla-d5to7vw.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Pegasi Jocks',
        'image': 'pegasi_jocks_by_rowcla-d5to7sy.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Plains',
        'image': 'plains_1_by_rowcla-d5to7sc.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Plains',
        'image': 'plains_by_rowcla-d5to7rg.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Pound and Pumpkin',
        'image': 'pound_and_pumpkin_by_rowcla-d5to7qk.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Pressure Surge',
        'image': 'pressure_surge_by_rowcla-d5to7pr.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Raindrops',
        'image': 'raindrops_by_rowcla-d5to7op.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Rally the Army',
        'image': 'rally_the_army_by_rowcla-d5to7nz.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Ready the Defense',
        'image': 'ready_the_defense_by_rowcla-d5to7nc.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Rose',
        'image': 'rose_by_rowcla-d5to7mg.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Screw Loose',
        'image': 'screw_loose_by_rowcla-d5to7lq.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Seek the Horizons',
        'image': 'seek_the_horizons_by_rowcla-d5to7kq.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Shadowed Paths',
        'image': 'shadowed_paths_by_rowcla-d5to7jp.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Shift the Sunset',
        'image': 'shift_the_sunset_by_rowcla-d5to7ij.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Sly Gamble',
        'image': 'sly_gamble_by_rowcla-d5to7hj.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Snowflake',
        'image': 'snowflake_by_rowcla-d5to7gm.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Soar',
        'image': 'soar_by_rowcla-d5to7g2.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Soarin',
        'image': 'soarin_by_rowcla-d5to7fb.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Solar Blessing',
        'image': 'solar_blessing_by_rowcla-d5to7ec.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Solar Guidance',
        'image': 'solar_guidance_by_rowcla-d5to7db.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Solar Ode',
        'image': 'solar_ode_by_rowcla-d5to7ca.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Soulborn Hellfire',
        'image': 'soulborn_hellfire_by_rowcla-d5to7ah.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Soul Conversion',
        'image': 'soul_conversion_by_rowcla-d5to7bd.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Spiraling Hellfire',
        'image': 'spiraling_hellfire_by_rowcla-d5to799.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Spirit Blast',
        'image': 'spirit_blast_by_rowcla-d5to78d.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Spirit Guidance',
        'image': 'spirit_guidance_by_rowcla-d5tobj1.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Spiritual Summoning',
        'image': 'spiritual_summoning_by_rowcla-d5to77h.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Spread the Seeds',
        'image': 'spread_the_seeds_by_rowcla-d5to76n.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Steamer',
        'image': 'steamer_by_rowcla-d5to75c.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Stoke the Fire',
        'image': 'stoke_the_fire_by_rowcla-d5to74n.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Strategic Declaration',
        'image': 'strategic_declaration_by_rowcla-d5to72y.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Sue',
        'image': 'sue_by_rowcla-d5to71s.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Surprise',
        'image': 'surprise_by_rowcla-d5to70s.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Swamp',
        'image': 'swamp_1_by_rowcla-d5to6zr.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Swamp',
        'image': 'swamp_by_rowcla-d5to6yf.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Tainted Hunger',
        'image': 'tainted_hunger_by_rowcla-d5to6xi.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Temple Excavation',
        'image': 'temple_excavation_by_rowcla-d5to6wc.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Through Tartarus\'s Gates',
        'image': 'through_tartaruss_gates_by_rowcla-d5to6v9.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Thunderlane',
        'image': 'thunderlane_by_rowcla-d5to6uf.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Time Turner',
        'image': 'time_turner_by_rowcla-d5to6t8.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Trek the Everfree',
        'image': 'trek_the_everfree_by_rowcla-d5to6sa.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Truffle Shuffle',
        'image': 'truffle_shuffle_by_rowcla-d5to6r7.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Twilight Sparkle',
        'image': 'twilight_sparkle_by_rowcla-d5to6qa.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Uncontrollable Magics',
        'image': 'uncontrollable_magics_by_rowcla-d5to6pg.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Unholy Feasting',
        'image': 'unholy_feasting_by_rowcla-d5to6oa.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Unrelenting Will',
        'image': 'unrelenting_will_by_rowcla-d5to6n7.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Whitetail Woods',
        'image': 'whitetail_woods_by_rowcla-d5to6lh.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Wild Fire',
        'image': 'wild_fire_by_rowcla-d5to6dt.jpg',
        'set': 'New Lunar Republic',
        'creator': 'rowcla'
    },
    {
        'name': 'Arcane Barrier',
        'image': '5fd2768022db19824aff239c4d78ab18-d6dp6mf.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Ace',
        'image': 'ace_by_rowcla-d6dp6tb.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Afflicted Terror',
        'image': 'afflicted_terror_by_rowcla-d6dp6rw.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Apple Bumpkin',
        'image': 'apple_bumpkin_by_rowcla-d6dp6qo.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Apple Strudel',
        'image': 'apple_strudel_by_rowcla-d6dp6oo.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Arcane Force',
        'image': 'arcane_force_by_rowcla-d6dp6ky.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Beast Calling',
        'image': 'beast_calling_by_rowcla-d6dp6ir.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Berry Punch',
        'image': 'berry_punch_by_rowcla-d6dp6h4.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Big Mac',
        'image': 'big_mac_by_rowcla-d6dp6ff.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Blind Charging',
        'image': 'blind_charging_by_rowcla-d6dp6dy.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Blinding Frost',
        'image': 'blinding_frost_by_rowcla-d6dp6bx.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Bon Voyage',
        'image': 'bon_voyage_by_rowcla-d6dp6af.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Brace for Fight',
        'image': 'brace_for_fight_by_rowcla-d6dp68i.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Caesar',
        'image': 'caesar_by_rowcla-d6dp66g.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Caramel',
        'image': 'caramel_by_rowcla-d6dp64t.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Celestial Charge',
        'image': 'celestial_charge_by_rowcla-d6dp62o.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Cherry Berry',
        'image': 'cherry_berry_by_rowcla-d6dp60y.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Cherry Jubilee',
        'image': 'cherry_jubilee_by_rowcla-d6dp5ze.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Cloudchaser',
        'image': 'cloudchaser_by_rowcla-d6dp5xw.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Conjure Anger',
        'image': 'conjure_anger_by_rowcla-d6dp5wl.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Crafty Crate',
        'image': 'crafty_crate_by_rowcla-d6dp5ux.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Crazed Alchemy',
        'image': 'crazed_alchemy_by_rowcla-d6dp5th.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Darkness Warp',
        'image': 'darkness_warp_by_rowcla-d6dp5rs.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Defensive Barrier',
        'image': 'defensive_barrier_by_rowcla-d6dp5pz.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Deny Death',
        'image': 'deny_death_by_rowcla-d6dp5ny.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Deny Future',
        'image': 'deny_future_by_rowcla-d6dp5lz.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Derpy Hooves',
        'image': 'derpy_hooves_by_rowcla-d6dp5jx.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Dinky Hooves',
        'image': 'dinky_hooves_by_rowcla-d6dp5iq.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Disordely Researching',
        'image': 'disordely_researching_by_rowcla-d6dp5h7.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Erase Time',
        'image': 'erase_time_by_rowcla-d6dp5ez.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Erroneus Nightmares',
        'image': 'erroneus_nightmares_by_rowcla-d6dp5cl.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Faded Memories',
        'image': 'faded_memories_by_rowcla-d6dp5b4.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Fancy Pants',
        'image': 'fancy_pants_by_rowcla-d6dp58z.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Fashionista Ponies',
        'image': 'fashionista_ponies_by_rowcla-d6dp57g.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Fleur',
        'image': 'fleur_by_rowcla-d6dp553.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Flitter',
        'image': 'flitter_by_rowcla-d6dp53i.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Forest',
        'image': 'forest_1_by_rowcla-d6dp522.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Forest',
        'image': 'forest_by_rowcla-d6dp505.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Freeze Over',
        'image': 'freeze_over_by_rowcla-d6dp4yk.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Future Ignition',
        'image': 'future_ignition_by_rowcla-d6dp4wr.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Gilda',
        'image': 'gilda_by_rowcla-d6dp4vc.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Graveborn Fashioning',
        'image': 'graveborn_fashioning_by_rowcla-d6dp4tn.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Gummy',
        'image': 'gummy_by_rowcla-d6dp4sd.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Hoity Toity',
        'image': 'hoity_toity_by_rowcla-d6dp4qu.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Honour the Ancestors',
        'image': 'honour_the_ancestors_by_rowcla-d6dp4pb.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Hugh Jelly',
        'image': 'hugh_jelly_by_rowcla-d6dp4nv.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Incessant Searching',
        'image': 'incessant_searching_by_rowcla-d6dp4ma.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Incite with Flame',
        'image': 'incite_with_flame_by_rowcla-d6dp4k1.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Intense Fear',
        'image': 'intense_fear_by_rowcla-d6dp4hz.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Island',
        'image': 'island_1_by_rowcla-d6dp4gd.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Island',
        'image': 'island_by_rowcla-d6dp4f6.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Jim Beam',
        'image': 'jim_beam_by_rowcla-d6dp4dj.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Junebug',
        'image': 'junebug_by_rowcla-d6dp4c2.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Lotus',
        'image': 'lotus_by_rowcla-d6dp4ab.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Luna, Princess of the Moon',
        'image': 'luna_princess_of_the_moon_by_rowcla-d6dp48p.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Lunar Ascension',
        'image': 'lunar_ascension_by_rowcla-d6dp470.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Lunar Contemplation',
        'image': 'lunar_contemplation_by_rowcla-d6dp45y.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Magnum',
        'image': 'magnum_by_rowcla-d6dp447.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Malicious Spellcasting',
        'image': 'malicious_spellcasting_by_rowcla-d6dp429.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Mane Goodall',
        'image': 'mane_goodall_by_rowcla-d6dp40h.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Mighty Assault',
        'image': 'mighty_assault_by_rowcla-d6dp3yp.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Moment\'s Rest',
        'image': 'moments_rest_by_rowcla-d6dp3w8.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Morbid Fate',
        'image': 'morbid_fate_by_rowcla-d6dp3um.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Morbid Hunting Ground',
        'image': 'morbid_hunting_ground_by_rowcla-d6dp3sx.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Mountain',
        'image': 'mountain_1_by_rowcla-d6dp3r6.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Mountain',
        'image': 'mountain_by_rowcla-d6dp3py.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Mr. Breezy',
        'image': 'mr__breezy_by_rowcla-d6dp3oa.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Mr. Waddle',
        'image': 'mr__waddle_by_rowcla-d6dp3mu.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Mysterious Mare Do Well',
        'image': 'mysterious_mare_do_well_by_rowcla-d6dp3l5.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Mystic Dancing',
        'image': 'mystic_dancing_by_rowcla-d6dp3jr.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Mystic Pool',
        'image': 'mystic_pool_by_rowcla-d6dp3ic.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Night Light',
        'image': 'night_light_by_rowcla-d6dp3h6.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Noteworthy',
        'image': 'noteworthy_by_rowcla-d6dp3fe.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Omnious Caverns',
        'image': 'omnious_caverns_by_rowcla-d6dp3d4.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Opal',
        'image': 'opal_by_rowcla-d6dp3bc.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Ousting Sun',
        'image': 'ousting_sun_by_rowcla-d6dp39q.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Peaceful Reunion',
        'image': 'peaceful_reunion_by_rowcla-d6dp389.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Pheonix\'s Blessing',
        'image': 'pheonixs_blessing_by_rowcla-d6dp36m.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Photo Finish',
        'image': 'photo_finish_by_rowcla-d6dp35e.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Pinkie Pie',
        'image': 'pinkie_pie_by_rowcla-d6dp33p.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Pipsqueak',
        'image': 'pipsqueak_by_rowcla-d6dp32d.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Plains',
        'image': 'plains_1_by_rowcla-d6dp314.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Plains',
        'image': 'plains_by_rowcla-d6dp2zc.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Pokey Pierce',
        'image': 'pokey_pierce_by_rowcla-d6dp2y1.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Ponies of the Train',
        'image': 'ponies_of_the_train_by_rowcla-d6dp2wm.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Pony Elders',
        'image': 'pony_elders_by_rowcla-d6dp2v4.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Provoke Distress',
        'image': 'provoke_distress_by_rowcla-d6dp2tc.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Rarity',
        'image': 'rarity_by_rowcla-d6dp2rz.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Reject Growth',
        'image': 'reject_growth_by_rowcla-d6dp2qc.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Return to Beginnings',
        'image': 'return_to_beginnings_by_rowcla-d6dp2oh.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Sapphire Shores',
        'image': 'sapphire_shores_by_rowcla-d6dp2mf.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Screwball',
        'image': 'screwball_by_rowcla-d6dp2l1.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Search the Caverns',
        'image': 'search_the_caverns_by_rowcla-d6dp2ir.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Seek the Beasts',
        'image': 'seek_the_beasts_by_rowcla-d6dp2h9.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Sheriff Silverstar',
        'image': 'sheriff_silverstar_by_rowcla-d6dp2fn.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Snips and Snails',
        'image': 'snips_and_snails_by_rowcla-d6dp2ed.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Snobbish Unicorns',
        'image': 'snobbish_unicorns_by_rowcla-d6dp2cc.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Solar Ascension',
        'image': 'solar_ascension_by_rowcla-d6dp29w.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Soulborn Nature',
        'image': 'soulborn_nature_by_rowcla-d6dp279.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Soulforged Skyline',
        'image': 'soulforged_skyline_by_rowcla-d6dp258.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Soulless Rebirth',
        'image': 'soulless_rebirth_by_rowcla-d6dp23v.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Spike',
        'image': 'spike_by_rowcla-d6dp222.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Spirit Baubles',
        'image': 'spirit_baubles_by_rowcla-d6dp20e.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Spirit Manipulation',
        'image': 'spirit_manipulation_by_rowcla-d6dp1z4.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Spirit Meditation',
        'image': 'spirit_meditation_by_rowcla-d6dp1xa.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Spirit Mists',
        'image': 'spirit_mists_by_rowcla-d6dp1th.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Spirit Predation',
        'image': 'spirit_predation_by_rowcla-d6dp1vr.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Spiritual Lightning',
        'image': 'spiritual_lightning_by_rowcla-d6dp1sj.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Spitfire',
        'image': 'spitfire_by_rowcla-d6dp1qu.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Split the Dawn',
        'image': 'split_the_dawn_by_rowcla-d6dp1pe.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Starswirl, the Bearded',
        'image': 'starswirl_the_bearded_by_rowcla-d6dp1ny.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Steven Magnet',
        'image': 'steven_magnet_by_rowcla-d6dp1mg.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Swamp',
        'image': 'swamp_1_by_rowcla-d6dp1l3.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Swamp',
        'image': 'swamp_by_rowcla-d6dp1jq.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Sweetie Belle',
        'image': 'sweetie_belle_by_rowcla-d6dp1hs.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'The Oranges',
        'image': 'the_oranges_by_rowcla-d6dp1gc.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Timberwolf',
        'image': 'timberwolf_by_rowcla-d6dp1ev.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Transcendantal Mountains',
        'image': 'transcendantal_mountains_by_rowcla-d6dp1de.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Trapping Roots',
        'image': 'trapping_roots_by_rowcla-d6dp1bw.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Travel Through Corruption',
        'image': 'travel_through_corruption_by_rowcla-d6dp19z.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Tricks of Nature',
        'image': 'tricks_of_nature_by_rowcla-d6dp189.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Trixie',
        'image': 'trixie_by_rowcla-d6dp16u.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Twilght Velvet',
        'image': 'twilight_velvet_by_rowcla-d6dp152.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Twinkleshine',
        'image': 'twinkleshine_by_rowcla-d6dp13e.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Twisted Summonings',
        'image': 'twisted_summonings_by_rowcla-d6dp11i.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Ursa Minor',
        'image': 'ursa_minor_by_rowcla-d6dp0zr.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Warped Fire',
        'image': 'warped_fire_by_rowcla-d6dp0y2.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Written Script',
        'image': 'written_script_by_rowcla-d6dp0w5.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Zebra\'s Guile',
        'image': 'zebras_guile_by_rowcla-d6dp0t9.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Zecora',
        'image': 'zecora_by_rowcla-d6dp0ly.jpg',
        'set': 'The Solar Empire',
        'creator': 'rowcla'
    },
    {
        'name': 'Acrid Shade',
        'image': 'acrid_shade_by_jrk08004-d46alie.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Angel Bunny',
        'image': 'angel_bunny_by_jrk08004-d466vxw.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Anguish',
        'image': 'anguish_by_jrk08004-d4639sb.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Pegasus Filly',
        'image': 'another_chicken_by_jrk08004-d46d4rk.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Vile Cockatrice',
        'image': 'applebloom_ain__t_laughin___now_by_jrk08004-d462moj.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Applejack, the Strong',
        'image': 'applejack_by_jrk08004-d45zbqk.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Applejack\'s Saddlebag',
        'image': 'applejack__s_saddlebag_by_jrk08004-d4618ir.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Appleloosa',
        'image': 'appleloosa_by_jrk08004-d4809ys.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Equestrian Squirrel',
        'image': 'a_squirrel_by_jrk08004-d4659re.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Assertiveness',
        'image': 'assertiveness_by_jrk08004-d462m78.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Assimilate',
        'image': 'assimilate_by_jrk08004-d46ya1e.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Balloons',
        'image': 'balloons_by_jrk08004-d4604po.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Equestrian Songbirds',
        'image': 'birds_flying_free_by_jrk08004-d46g3aw.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Black Eye',
        'image': 'black_eye_by_jrk08004-d45zyr4.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Blue Parasprite',
        'image': 'blue_by_jrk08004-d465ahl.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Bluff',
        'image': 'bluff_by_jrk08004-d4618yo.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Bog Hydra',
        'image': 'bog_hydra_by_jrk08004-d46altn.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Pony Gardener',
        'image': 'bon_bon_by_jrk08004-d4659mq.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Book Searing',
        'image': 'book_searing_by_jrk08004-d46y9tf.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Braeburn, the Settler',
        'image': 'braeburn__the_settler_by_jrk08004-d480awk.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Break Seal',
        'image': 'break_seal_by_jrk08004-d4639y5.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Brown Parasprite',
        'image': 'brown_by_jrk08004-d465acn.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Poison Bubble',
        'image': 'bubble_by_jrk08004-d46alwj.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Buck',
        'image': 'buck_by_jrk08004-d463a8m.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Buffalo Camp',
        'image': 'buffalo_camp_by_jrk08004-d480a2v.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Buffalo Stampeders',
        'image': 'buffalo_stempeders_by_jrk08004-d48095j.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Equestrian Butterfly',
        'image': 'butterfly_by_jrk08004-d4659w8.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Camouflage',
        'image': 'camouflage_by_jrk08004-d462ndk.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Canterlot',
        'image': 'canterlot_by_jrk08004-d45ztpd.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Canterlot Commoners',
        'image': 'canterlot_commoners_by_jrk08004-d464mqz.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Celestia, Princess of the Sun',
        'image': 'celestia__princess_of_the_sun_by_jrk08004-d4dpc91.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Celestia\'s Meteor',
        'image': 'celestia__s_meteor_by_jrk08004-d46eorn.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Celestia\'s Star',
        'image': 'celestia__s_star_by_jrk08004-d46eoi8.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Celestia\'s Throne',
        'image': 'celestia__s_throne_by_jrk08004-d46yolp.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Celestia\'s Throne Guards',
        'image': 'celestia__s_throne_guards_by_jrk08004-d46yoc0.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Fluttershy\'s Chicken',
        'image': 'chickens_by_jrk08004-d462nfm.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Chief Thunderhooves',
        'image': 'chief_thunderhooves_by_jrk08004-d47l3jc.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Close Call',
        'image': 'close_call_by_jrk08004-d466vic.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Cloudsdale',
        'image': 'cloudsdale_by_jrk08004-d45ztnb.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Controlling Stare',
        'image': 'controlling_stare_by_jrk08004-d462mag.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Cosmic Balance',
        'image': 'cosmic_balance_by_jrk08004-d46yac0.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Cursed',
        'image': 'cursed_by_jrk08004-d46y9zb.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Equestrian Rabbits',
        'image': 'cute_little_bunnies_by_jrk08004-d46g35x.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Dark Fog',
        'image': 'dark_fog_by_jrk08004-d46kam5.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Dark Plot',
        'image': 'dark_plot_by_jrk08004-d463abi.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Dark Tempest',
        'image': 'dark_tempest_by_jrk08004-d46eooc.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Dark Vortex',
        'image': 'dark_vortex_by_jrk08004-d46kapj.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Dawn Rising',
        'image': 'dawn_rising_by_jrk08004-d46ya7h.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Deep Fear',
        'image': 'deep_fear_by_jrk08004-d466vux.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Derpy Hooves, Bringer of Derp',
        'image': 'derpy_hooves_by_jrk08004-d464poc.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Diamond Dog Digger',
        'image': 'diamond_dog_digger_by_jrk08004-d463ah8.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Rover, Diamond Dog Boss',
        'image': 'diamond_dog_legendary__rover_by_jrk08004-d463az2.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Diamond Dog Shades',
        'image': 'diamond_dog_shades_by_jrk08004-d463ala.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Diamond Dog Soldiers',
        'image': 'diamond_dog_soldiers_by_jrk08004-d463aol.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Diamond Dog Thug',
        'image': 'diamond_dog_thug_by_jrk08004-d463aw7.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Infestational Disarray',
        'image': 'disaster_at_the_library_by_jrk08004-d465a34.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Discord, Element of Chaos',
        'image': 'discord__element_of_chaos_by_jrk08004-d4dh9se.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Discord, the Chaotic',
        'image': 'discord__the_chaotic_by_jrk08004-d4a0zky.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Discovery',
        'image': 'discovery_by_jrk08004-d462mex.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Diseased Parasprite',
        'image': 'diseased_parasprite_by_jrk08004-d46ykg3.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Dragon Cave',
        'image': 'dragon_cave_by_jrk08004-d46epho.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Unicorn Filly',
        'image': 'dumb_fabric_by_jrk08004-d46d4ws.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Ponyville Commoners',
        'image': 'earth_pony_commons_by_jrk08004-d4659dw.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Element of Harmony',
        'image': 'element_of_harmony_by_jrk08004-d463h1m.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Enflame',
        'image': 'enflame_by_jrk08004-d463b2l.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Engineer Ponies',
        'image': 'engineer_ponies_by_jrk08004-d480au2.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Enthralling Wonders',
        'image': 'enthralling_wonders_by_jrk08004-d46yo84.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Espionage',
        'image': 'espionage_by_jrk08004-d480aei.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Essence of the Nightmare',
        'image': 'essence_of_the_nightmare_by_jrk08004-d46g32t.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Excited Speech',
        'image': 'excited_speech_by_jrk08004-d46g2u6.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Froggy Bottom Bog',
        'image': 'fbb_by_jrk08004-d46aloj.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Fear of the Flame',
        'image': 'fear_of_the_flame_by_jrk08004-d46alkz.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Fiery Parasprite',
        'image': 'fiery_parasprite_by_jrk08004-d46yko6.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Fluttershy\'s Armor',
        'image': 'fluttershy__s_armor_by_jrk08004-d4618ub.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Fluttershy, the Kind',
        'image': 'fluttershy_the_gathering_by_jrk08004-d45zckz.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Foalish Maneuvers',
        'image': 'foalish_maneuvers_by_jrk08004-d46y9q9.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Forest',
        'image': 'forest_nombre_deux_by_jrk08004-d462n8d.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Fountain of Ponyville',
        'image': 'fountain_by_jrk08004-d46alrd.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Friendship',
        'image': 'friendship_by_jrk08004-d463d0e.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Equestrian Frog',
        'image': 'frog_by_jrk08004-d46ales.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'From the Shadows',
        'image': 'from_the_shadows_by_jrk08004-d462nm4.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Gem Hoard',
        'image': 'gem_hoard_by_jrk08004-d46r437.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Element of Generosity',
        'image': 'generosity_by_jrk08004-d463c41.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Giant Clam',
        'image': 'giant_clam_by_jrk08004-d47olbc.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Gilda, the Fearsome',
        'image': 'gilda__the_fearsome_by_jrk08004-d47l3sv.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Green Dragon',
        'image': 'green_dragon_by_jrk08004-d46g3qn.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Growing Fury',
        'image': 'growing_fury_by_jrk08004-d46y9kb.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Gummy Gator',
        'image': 'gummy_by_jrk08004-d4677p0.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Heroic Presence',
        'image': 'heroism_by_jrk08004-d463bds.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Hold Yer Horses',
        'image': 'hold_yer_horses_by_jrk08004-d4639dn.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Hometown Defense',
        'image': 'hometown_defense_by_jrk08004-d480aoo.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Element of Honesty',
        'image': 'honesty_by_jrk08004-d463c7n.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Horror',
        'image': 'horror_by_jrk08004-d466vfp.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Follow the Map',
        'image': 'i__m_a_map_by_jrk08004-d462nhb.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Island',
        'image': 'island_ni_ban_by_jrk08004-d462nbs.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Celestial Rising',
        'image': 'join_the_solar_empire_by_jrk08004-d464ngu.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Element of Kindness',
        'image': 'kindness_by_jrk08004-d463cbv.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Lake Turtle',
        'image': 'lake_turtle_by_jrk08004-d47ol9g.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Element of Laughter',
        'image': 'laughter_by_jrk08004-d463cgi.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Lethargic Dragon',
        'image': 'lethargic_dragon_by_jrk08004-d466w0w.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Strongheart, the Small',
        'image': 'little_strongheart_by_jrk08004-d47l3g2.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Long Way Down',
        'image': 'long_way_down_by_jrk08004-d467ehs.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Element of Loyalty',
        'image': 'loyalty_by_jrk08004-d463cl8.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Luna, Princess of the Moon',
        'image': 'luna__princess_of_the_moon_by_jrk08004-d4dpc36.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Lunar Call',
        'image': 'lunar_call_by_jrk08004-d46y95o.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Magical Feedback',
        'image': 'magical_feedback_by_jrk08004-d46alys.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Magical Fury',
        'image': 'magical_fury_by_jrk08004-d46059j.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Magic Bomb',
        'image': 'magic_bomb_by_jrk08004-d462nut.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Element of Magic',
        'image': 'magic_by_jrk08004-d463cvd.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Manehattan',
        'image': 'manehattan_by_jrk08004-d45ztk6.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Meteor Shower',
        'image': 'meteor_shower_by_jrk08004-d46g3mb.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Midnight Forgathering',
        'image': 'midnight_forgathering_by_jrk08004-d480al8.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Minor Study',
        'image': 'minor_study_by_jrk08004-d464nbp.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Swamp',
        'image': 'mlp_mtg_land_cards_by_jrk08004-d45zg9d.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Plains',
        'image': 'mlp_mtg_land_cards_by_jrk08004-d45zgbc.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Mountain',
        'image': 'mlp_mtg_land_cards_by_jrk08004-d45zgco.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Island',
        'image': 'mlp_mtg_land_cards_by_jrk08004-d45zgey.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Forest',
        'image': 'mlp_mtg_land_cards_by_jrk08004-d45zggw.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Stupidity',
        'image': 'more_derp_by_jrk08004-d46d4n6.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Pegasus Sky Clearers',
        'image': 'more_pegasi_by_jrk08004-d466vo5.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Mountain',
        'image': 'mountain_numero_dos_by_jrk08004-d462n5t.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Nightmare Moon',
        'image': 'nightmare_moon_by_jrk08004-d45zyva.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Nightmare\'s Moon',
        'image': 'nightmare__s_moon_by_jrk08004-d46eobl.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Night of the Dragon',
        'image': 'night_of_the_dragon_by_jrk08004-d46g3of.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Night Owl',
        'image': 'night_owl_by_jrk08004-d462nnx.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Owlowiscious',
        'image': 'owlowiscious_by_jrk08004-d46am7p.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Parapiper\'s Ensemble',
        'image': 'parapiper__s_ensemble_by_jrk08004-d46zrl7.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Parasprite Legion',
        'image': 'parasprite_legion_by_jrk08004-d4677h7.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Parasprite Swarm',
        'image': 'parasprite_swarm_by_jrk08004-d46ykwy.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Pegasus Racers',
        'image': 'pegasus_racers_by_jrk08004-d46r3zz.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Pegasus Statue',
        'image': 'pegasus_statue_by_jrk08004-d46v6ey.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Petrify',
        'image': 'petrify_by_jrk08004-d462ntc.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Equestrian Phoenix',
        'image': 'philomena_by_jrk08004-d467ekw.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Pinkie Pie, the Partier',
        'image': 'pinkie_pie_by_jrk08004-d45zc2g.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Pinkie Pie\'s Glasses',
        'image': 'pinkie_pie__s_glasses_by_jrk08004-d4618mw.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Pinkiethopter',
        'image': 'pinkiethopter_by_jrk08004-d46054p.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Pitfall',
        'image': 'pitfall_by_jrk08004-d46y9dc.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Plains',
        'image': 'plains_nummer_zwei_by_jrk08004-d462n3a.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Poison Joke',
        'image': 'poison_joke_by_jrk08004-d46epl4.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Pony Merchants',
        'image': 'pony_merchants_by_jrk08004-d46kaz5.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Pony of the Flame',
        'image': 'pony_of_the_flame_by_jrk08004-d46am3u.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Ponyville',
        'image': 'ponyville_by_jrk08004-d45zti2.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Ponyville Library',
        'image': 'ponyville_library_by_jrk08004-d480aqi.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Pounce',
        'image': 'pounce_by_jrk08004-d463bj5.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Princess Luna',
        'image': 'princess_luna_by_jrk08004-d45ziuu.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Princess Celestia',
        'image': 'princess_troll__er_celestia_by_jrk08004-d45zc92.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Purple Parasprite',
        'image': 'purple_by_jrk08004-d465aky.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Raging Griffin',
        'image': 'raging_griffin_by_jrk08004-d47oloe.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Rainbow Beam',
        'image': 'rainbow_beam_by_jrk08004-d46yahr.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Rainbow Dash, the Brave',
        'image': 'rainbow_dash_by_jrk08004-d45zbz6.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Rainbow Dash\'s War Paint',
        'image': 'rainbow_dash__s_war_paint_by_jrk08004-d4618f1.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Rainbow Factory',
        'image': 'rainbow_factory_by_jrk08004-d46e1tl.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Rainbow House',
        'image': 'rainbow_house_by_jrk08004-d480ayk.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Rain of Knowledge',
        'image': 'rain_of_knowledge_by_jrk08004-d47oa4w.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Rampaging Dragon',
        'image': 'rampaging_dragon_by_jrk08004-d46g3tf.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Rarity, the Glamorous',
        'image': 'rarity_by_jrk08004-d45zc4u.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Shining Vibrance',
        'image': 'rarity_is_always_showing_off_by_jrk08004-d462myy.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Rarity\'s Hat',
        'image': 'rarity__s_hat_by_jrk08004-d46185w.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Ready the Charge',
        'image': 'ready_the_charge_by_jrk08004-d4808p6.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Pink Parasprite',
        'image': 'red_by_jrk08004-d465a8y.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Red Dragon',
        'image': 'red_dragon_by_jrk08004-d466v71.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Returning Twister',
        'image': 'returning_twister_by_jrk08004-d46yklm.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Revitalizer Pony',
        'image': 'revitalizer_pony_by_jrk08004-d46kb20.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Roar of Fire',
        'image': 'roar_of_fire_by_jrk08004-d463b5o.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Roar of the Griffin',
        'image': 'roar_of_the_griffin_by_jrk08004-d480abt.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Roar of the Hydra',
        'image': 'roar_of_the_hydra_by_jrk08004-d46alcc.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Rock Pile',
        'image': 'rock_pile_by_jrk08004-d4604zp.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Rock Slide',
        'image': 'rockslide_by_jrk08004-d466vsl.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Celestia\'s Royal Guard',
        'image': 'royal_guard_by_jrk08004-d465aq8.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Ruthless Manticore',
        'image': 'ruthless_manticore_by_jrk08004-d46r3wk.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Sanctum of Harmony',
        'image': 'sanctum_of_harmony_by_jrk08004-d46y8p3.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Scroll Burning',
        'image': 'scroll_burning_by_jrk08004-d463bmp.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Seapony',
        'image': 'seapony_by_jrk08004-d47oa0r.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Seat of the Nightmare',
        'image': 'seat_of_the_nightmare_by_jrk08004-d46yoj6.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Shadowbolt Leader',
        'image': 'shadowbolt_leader_by_jrk08004-d46g3i4.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Shadowbolt Squadron',
        'image': 'shadowbolts_by_jrk08004-d46g3e1.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Shadow Dragon',
        'image': 'shadow_dragon_by_jrk08004-d47olgv.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Sheriff Pony',
        'image': 'sheriff_pony_by_jrk08004-d4809mp.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Earth Filly',
        'image': 'silly_little_filly_by_jrk08004-d46d508.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Sink Spot',
        'image': 'sink_spot_by_jrk08004-d46al8w.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Sky Barricade',
        'image': 'sky_barricade_by_jrk08004-d4809fl.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Skypeak Dragon',
        'image': 'skypeak_dragon_by_jrk08004-d4809c0.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Slimy Snail',
        'image': 'slimy_snail_by_jrk08004-d462muw.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Solar Call',
        'image': 'solar_call_by_jrk08004-d46y91e.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Solar Flare',
        'image': 'solar_flare_by_jrk08004-d467eej.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Sound Flare',
        'image': 'sound_flare_by_jrk08004-d463bqe.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Sparkle Bomb',
        'image': 'sparkle_bomb_by_jrk08004-d46v6lx.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Spike',
        'image': 'spike_by_jrk08004-d464nke.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Groomed Serpent',
        'image': 'steven_magnet_by_jrk08004-d46ep53.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Swamp',
        'image': 'swamp_numbuh_2_by_jrk08004-d462n1k.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Swarm of Bees',
        'image': 'swarm_of_bees_by_jrk08004-d46al3f.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Taste the Rainbow',
        'image': 'taste_the_rainbow_by_jrk08004-d4604vm.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'That Won\'t Work',
        'image': 'that_won__t_work_by_jrk08004-d466vbl.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Thunderhoof Clan Buffalo',
        'image': 'thunderhoof_clan_buffalo_by_jrk08004-d4808ji.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Thunderhoof Horngrinder',
        'image': 'thunderhoof_horngrinder_by_jrk08004-d4808g4.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Thunderkick',
        'image': 'thunderkick_by_jrk08004-d47ol5o.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Time Burn',
        'image': 'time_burn_by_jrk08004-d464n7s.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Fluttershy, the Kind',
        'image': 'trading_cards_are_magic_by_jrk08004-d45zbma.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Treasure Hunt',
        'image': 'treasure_by_jrk08004-d463bt4.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Tribal Ritual',
        'image': 'tribal_ritual_by_jrk08004-d46y8vi.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Trixie, the Boastful',
        'image': 'trixie__the_boastful_by_jrk08004-d47kklz.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Turtledon',
        'image': 'turtledon_by_jrk08004-d47okyd.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Twilight Empowerment',
        'image': 'twilight_empowerment_by_jrk08004-d46g2y4.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Twilight\'s Laboratory',
        'image': 'twilight__s_lab_by_jrk08004-d46am1v.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Twilight Sparkle, the Magic',
        'image': 'twilight_sparkle_by_jrk08004-d45zbvj.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Twilight Sparkle\'s Podium',
        'image': 'twilight__s_podium_by_jrk08004-d464n3q.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Unicorn Giants',
        'image': 'unicorn_giants_by_jrk08004-d464mwr.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Unicorn Travelers',
        'image': 'unicorn_travelers_by_jrk08004-d464mtp.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'University Court',
        'image': 'university_court_by_jrk08004-d462ms5.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Ursa Major',
        'image': 'ursa_major_by_jrk08004-d46yl3n.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Ursa Minor',
        'image': 'ursa_minor_by_jrk08004-d46ykzi.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Waiting Game',
        'image': 'waiting_game_by_jrk08004-d466v3m.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'War Stomp',
        'image': 'war_stomp_by_jrk08004-d46kawq.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Weary Buffalo',
        'image': 'weary_buffalo_by_jrk08004-d4808b5.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Wicked Treefolk',
        'image': 'wicked_treefolk_by_jrk08004-d46katx.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Winds of Song',
        'image': 'winds_of_song_by_jrk08004-d45zz19.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Wing Fetter',
        'image': 'wing_fetter_by_jrk08004-d466uys.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Wrap-up',
        'image': 'wrap_up_by_jrk08004-d4659z9.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Yellow Parasprite',
        'image': 'yellow_by_jrk08004-d465afb.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'You Derped',
        'image': 'you_derped_by_jrk08004-d46ama6.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Zebra Shaman',
        'image': 'zebra_shaman_by_jrk08004-d46g2rv.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Zecora\'s Hut',
        'image': 'zecora__s_hut_by_jrk08004-d46v6i6.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': 'Zecora, the Witchdoctor',
        'image': 'zecora__the_witchdoctor_by_jrk08004-d46epas.jpg',
        'set': 'Legends are Magic',
        'creator': 'jrk08004'
    },
    {
        'name': '"Encouragement"',
        'image': 'break_a_leg_by_jrk08004-d4917kw.jpg',
        'set': 'Unponied',
        'creator': 'jrk08004'
    },
    {
        'name': 'Cartoon Physics',
        'image': 'cartoon_physics_by_jrk08004-d4bzzrp.jpg',
        'set': 'Unponied',
        'creator': 'jrk08004'
    },
    {
        'name': 'Chuck Testa',
        'image': 'chuck_testa_by_jrk08004-d4c3iih.jpg',
        'set': 'Unponied',
        'creator': 'jrk08004'
    },
    {
        'name': 'Cucumber Monster',
        'image': 'cucumber_monster_by_jrk08004-d480b3r.jpg',
        'set': 'Unponied',
        'creator': 'jrk08004'
    },
    {
        'name': 'Ducklings of Doom',
        'image': 'ducklings_of_doom_by_jrk08004-d4c01jl.jpg',
        'set': 'Unponied',
        'creator': 'jrk08004'
    },
    {
        'name': 'Elements of Rage',
        'image': 'elements_of_rage_by_jrk08004-d4c843k.jpg',
        'set': 'Unponied',
        'creator': 'jrk08004'
    },
    {
        'name': 'I Got One Too!',
        'image': 'i_got_one_too_by_jrk08004-d4byvy6.jpg',
        'set': 'Unponied',
        'creator': 'jrk08004'
    },
    {
        'name': 'Friendship is Magnets',
        'image': 'magnets_by_jrk08004-d4ekhsy.jpg',
        'set': 'Unponied',
        'creator': 'jrk08004'
    },
    {
        'name': 'ON THE MOOOOOOOOOOOOOONNNNNNNNAAA!!!',
        'image': 'on_the_mooooooooooonnnnnnnnaaa_by_jrk08004-d4913q6.jpg',
        'set': 'Unponied',
        'creator': 'jrk08004'
    },
    {
        'name': 'Pinkie van der Wall IV',
        'image': 'pinkie_van_der_wall_iv_by_jrk08004-d494ix4.jpg',
        'set': 'Unponied',
        'creator': 'jrk08004'
    },
    {
        'name': 'Princess Molestia',
        'image': 'princess_molestia_by_jrk08004-d4byw15.jpg',
        'set': 'Unponied',
        'creator': 'jrk08004'
    },
    {
        'name': 'Rage of the Flutter (Wub of de Fwuttah)',
        'image': 'rage_wub_of_the_fl_wutter_by_jrk08004-d4c001x.jpg',
        'set': 'Unponied',
        'creator': 'jrk08004'
    },
    {
        'name': 'Sanity Check',
        'image': 'sanity_check_by_jrk08004-d4c0j2y.jpg',
        'set': 'Unponied',
        'creator': 'jrk08004'
    },
    {
        'name': 'Screwball, Spawn of Chaos',
        'image': 'screwball__spawn_of_chaos_by_jrk08004-d4byvuo.jpg',
        'set': 'Unponied',
        'creator': 'jrk08004'
    },
    {
        'name': 'Shutterfly',
        'image': 'shutterfly_by_jrk08004-d4968u7.jpg',
        'set': 'Unponied',
        'creator': 'jrk08004'
    },
    {
        'name': 'Sweetie Derelle',
        'image': 'sweetie_derelle_by_jrk08004-d494gp9.jpg',
        'set': 'Unponied',
        'creator': 'jrk08004'
    },
    {
        'name': 'The WTF Pony',
        'image': 'the_wtf_pony_by_jrk08004-d480bbu.jpg',
        'set': 'Unponied',
        'creator': 'jrk08004'
    },
    {
        'name': 'Tom Dan',
        'image': 'tom_dan_by_jrk08004-d4c5wdk.jpg',
        'set': 'Unponied',
        'creator': 'jrk08004'
    },
    {
        'name': 'Topsy Turvy',
        'image': 'topsy_turvy_by_jrk08004-d4c5why.jpg',
        'set': 'Unponied',
        'creator': 'jrk08004'
    },
    {
        'name': 'Trollestia, Professional Troll',
        'image': 'trololololollestia_by_jrk08004-d48zl6k.jpg',
        'set': 'Unponied',
        'creator': 'jrk08004'
    },
    {
        'name': 'Pinkamena',
        'image': 'warning___pinkamena_by_jrk08004-d4c0jkr.jpg',
        'set': 'Unponied',
        'creator': 'jrk08004'
    },
    {
        'name': 'Dances with Hooves',
        'image': 'wrestle_with_the_derpy_by_jrk08004-d4cw2zz.jpg',
        'set': 'Unponied',
        'creator': 'jrk08004'
    },
    {
        'name': 'YOUR FACE!',
        'image': 'your_face_by_jrk08004-d4byw4v.jpg',
        'set': 'Unponied',
        'creator': 'jrk08004'
    },
    {
        'name': 'Golden Harvest',
        'image': '100.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Granny Smith',
        'image': '101.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Hurricane Fluttershy',
        'image': '102.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Photo Finish',
        'image': '103.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Pipsqueak',
        'image': '104.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Rarity\'s Generosity',
        'image': '105.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Royal Trolling',
        'image': '106.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'The Stare',
        'image': '107.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Winona',
        'image': '108.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Applebuck Season',
        'image': '109.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Cheerilee',
        'image': '10.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Princess Celestia',
        'image': '110.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Princess Luna',
        'image': '111.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Nightmare Moon',
        'image': '112.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Quarray Eel',
        'image': '113.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Spike, the Baby Dragon',
        'image': '114.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Harmonikinesis',
        'image': '115.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Shining Armor',
        'image': '116.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Queen Chrysalis',
        'image': '117.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Mountain Dragon',
        'image': '118.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Gilda',
        'image': '119.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Commander Hurricane',
        'image': '11.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Cutie Mark Crusaders',
        'image': '120.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Zecora',
        'image': '121.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Flim Flam Brothers',
        'image': '122.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Forest Dragon',
        'image': '123.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Twist',
        'image': '124.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Heartstrings',
        'image': '125.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Lyra',
        'image': '126.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Applebloom\'s Loopty-Hoop',
        'image': '127.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'The Elements of Harmony',
        'image': '128.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Friendship Express',
        'image': '129.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Diamond Dogs',
        'image': '12.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Love Poison',
        'image': '130.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Mare-Do-Well\'s Cowl',
        'image': '131.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Scootaloo\'s Scooter',
        'image': '132.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Super Speedy Cider Squeezy 6000',
        'image': '133.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Sweetie Belle\'s Capes',
        'image': '134.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Tom, the Boulder',
        'image': '135.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Victor\'s Reward',
        'image': '136.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Victory',
        'image': '137.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Young Dragon\'s Horde',
        'image': '138.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Bloomberg',
        'image': '139.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Fancy Pants',
        'image': '13.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Books and Branches Library',
        'image': '140.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Canterlot',
        'image': '141.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Carousel Boutique',
        'image': '142.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Cloudsdale',
        'image': '143.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Fluttershy\'s Cottage',
        'image': '144.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Ponyville',
        'image': '145.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Rainbow Dash\'s Cloud House',
        'image': '146.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Sugarcube Corner',
        'image': '147.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Sweet Apple Acres',
        'image': '148.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Plains',
        'image': '149.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Fire of Friendship',
        'image': '14.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Plains',
        'image': '150.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Plains',
        'image': '151.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Island',
        'image': '152.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Island',
        'image': '153.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Island',
        'image': '154.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Swamp',
        'image': '155.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Swamp',
        'image': '156.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Swamp',
        'image': '157.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Mountain',
        'image': '158.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Mountain',
        'image': '159.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Friendship Bubble',
        'image': '15.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Mountain',
        'image': '160.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Forest',
        'image': '161.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Forest',
        'image': '162.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Forest',
        'image': '163.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Fleur de Lis',
        'image': '164.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Parasprite',
        'image': '165.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Horse',
        'image': '166.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Moose Mousse',
        'image': '167.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Friendship Cannon',
        'image': '16.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Horsepower',
        'image': '17.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Little Strongheart',
        'image': '18.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Neck Snap',
        'image': '19.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Doctor Whooves',
        'image': '1.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Power of Love',
        'image': '20.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Princess Mi Amore Cadenza',
        'image': '21.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Rainbow Dash\'s Loyalty',
        'image': '22.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Smart Cookie',
        'image': '23.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Soarin\'',
        'image': '24.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': '#25',
        'image': '25.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Alluring Wings',
        'image': '26.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Checklist',
        'image': '27.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Derpy Hooves',
        'image': '28.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Gala Disappointment',
        'image': '29.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Fluttershy\'s Kindness',
        'image': '2.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Message from the Future',
        'image': '30.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Noteworthy',
        'image': '31.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Orchard of Secrets',
        'image': '32.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Owlowiscious',
        'image': '33.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Pinkie Pie\'s Laughter',
        'image': '34.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Ponification',
        'image': '35.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Princess Platinum',
        'image': '36.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Private Pansy',
        'image': '37.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Rainbow Dash',
        'image': '38.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Recolor Self-Insert',
        'image': '39.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Opalescence',
        'image': '3.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Saphire Shores',
        'image': '40.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Starswirl the Bearded',
        'image': '41.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Steven Magnet',
        'image': '42.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Trixie\'s Boast',
        'image': '43.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Ursa Major',
        'image': '44.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Winter Wrap-Up',
        'image': '45.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Applejack\'s Honesty',
        'image': '46.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Baked Bads',
        'image': '47.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Bog Hydra',
        'image': '48.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Chancellor Puddinghead',
        'image': '49.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Twilight Sparkle',
        'image': '4.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Cranky Doodle Donkey',
        'image': '50.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Cutie Pox',
        'image': '51.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Foreshadowing Nightmare',
        'image': '52.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Gossip',
        'image': '53.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'The Great and Powerful Trixie',
        'image': '54.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Gummy',
        'image': '55.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Gustave le Grand',
        'image': '56.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Hoity Toity',
        'image': '57.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Iron Will',
        'image': '58.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Mayor Mare',
        'image': '59.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Angel Bunny',
        'image': '5.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Parasprite Swarm',
        'image': '60.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Prince Blueblood',
        'image': '61.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Rarity',
        'image': '62.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Schoolfilly Clique',
        'image': '63.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Touch of Discord',
        'image': '64.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Ursa Minor',
        'image': '65.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Windigoes',
        'image': '66.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Bon Bon',
        'image': '67.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Buck',
        'image': '68.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Celestia\'s Pet Bird',
        'image': '69.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Applejack',
        'image': '6.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Philomeena',
        'image': '70.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Charm Dragon',
        'image': '71.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Chief Thunderhooves',
        'image': '72.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Clover the Clever',
        'image': '73.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Daring',
        'image': '74.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Discord',
        'image': '75.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Dragon\'s Nap',
        'image': '76.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Everfree Manticore',
        'image': '77.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Filthy Rich',
        'image': '78.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Mulia Mild',
        'image': '79.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Braeburn',
        'image': '7.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Pee Wee',
        'image': '80.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Pinkie Pie',
        'image': '81.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Reign of Discord',
        'image': '82.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Snips and Snails',
        'image': '83.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Sonic Rainboom',
        'image': '84.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Spitfire',
        'image': '85.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Tank',
        'image': '86.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Twilight Sparkle\'s Magic',
        'image': '87.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Want-it Need-it Spell',
        'image': '88.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Ahuizotl',
        'image': '89.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Caramel',
        'image': '8.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Apple Family Reunion',
        'image': '90.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Big Macintosh',
        'image': '91.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Bound yet Determined',
        'image': '92.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Cloudwalking Spell',
        'image': '93.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Doughnut Joe',
        'image': '94.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Everfree Cockatrice',
        'image': '95.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Everfree Timberwolf',
        'image': '96.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Flower Triplets',
        'image': '97.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Fluttershy',
        'image': '98.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Flying Squirrel',
        'image': '99.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Celestia\'s Light',
        'image': '9.jpg',
        'set': 'Derpibooru 7220',
    },
    {
        'name': 'Applejack, The Skilled',
        'image': 'applejack__the_skilled_mtg_by_alternatepony-d55kb28.jpg',
        'set': 'alternatepony',
        'creator': 'alternatepony'
    },
    {
        'name': 'Celestia, Vanguard Princess',
        'image': 'celestia__vanguard_princess_mtg_by_alternatepony-d55pi2u.jpg',
        'set': 'alternatepony',
        'creator': 'alternatepony'
    },
    {
        'name': 'Derpy Hooves, The Distant',
        'image': 'derpy_human_mtg_by_alternatepony-d548o9j.jpg',
        'set': 'alternatepony',
        'creator': 'alternatepony'
    },
    {
        'name': 'Fluttershy, The Gentle',
        'image': 'fluttershy__the_gentle_mtg_by_alternatepony-d55peqr.jpg',
        'set': 'alternatepony',
        'creator': 'alternatepony'
    },
    {
        'name': 'Luna, Assassin Princess',
        'image': 'luna__assassin_princess_mtg_by_alternatepony-d55pkoz.jpg',
        'set': 'alternatepony',
        'creator': 'alternatepony'
    },
    {
        'name': 'Lyra Heartstrings, The Humanist',
        'image': 'lyra_heartstrings_mtg_by_alternatepony-d53kggn.jpg',
        'set': 'alternatepony',
        'creator': 'alternatepony'
    },
    {
        'name': 'Pinkie Pie, The Playful',
        'image': 'pinkie_pie_the_playful_mtg_by_alternatepony-d54idlq.jpg',
        'set': 'alternatepony',
        'creator': 'alternatepony'
    },
    {
        'name': 'Rainbow Dash, The Honorable',
        'image': 'rainbow_dash__the_honorable_mtg_by_alternatepony-d54m9js.jpg',
        'set': 'alternatepony',
        'creator': 'alternatepony'
    },
    {
        'name': 'Rarity, The Elegant',
        'image': 'rarity__the_elegant_mtg_by_alternatepony-d55kdhp.jpg',
        'set': 'alternatepony',
        'creator': 'alternatepony'
    },
    {
        'name': 'Scootaloo, The Amateur',
        'image': 'scootaloo_amateur_mtg_by_alternatepony-d53iytq.jpg',
        'set': 'alternatepony',
        'creator': 'alternatepony'
    },
    {
        'name': 'Trixie, The Great And Powerful',
        'image': 'trixie_human_mtg_by_alternatepony-d5r5flp.jpg',
        'set': 'alternatepony',
        'creator': 'alternatepony'
    },
    {
        'name': 'Twilight Sparkle, The Wise',
        'image': 'twilight_sparkle_human_mtg_by_alternatepony-d54dcbq.jpg',
        'set': 'alternatepony',
        'creator': 'alternatepony'
    },
    {
        'name': 'Aloe',
        'image': 'aloe_by_aurais-d58g8qb.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Angel',
        'image': 'angel_by_aurais-d58pphc.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Applebloom',
        'image': 'applebloom_by_aurais-d56irzh.png',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Berry Punch',
        'image': 'berry_punch_by_aurais-d58gfg7.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Bloodlust',
        'image': 'bloodlust_by_aurais-d59alfv.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Blooming Fields',
        'image': 'blooming_fields_by_aurais-d58uyp7.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Blossomforth',
        'image': 'blossomforth_by_aurais-d58ppxe.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Bon Bon',
        'image': 'bon_bon_by_aurais-d58pq9j.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Bonds of light',
        'image': 'bonds_of_light_by_aurais-d58pqoj.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Canterlot',
        'image': 'canterlot_by_aurais-d58sl2h.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Celestia\'s blessing',
        'image': 'celestia__s_blessing_by_aurais-d58pr23.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Celestia\'s Command',
        'image': 'celestia__s_command_by_aurais-d58ps11.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Celestia\'s Judgement',
        'image': 'celestia__s_judgement_by_aurais-d58pssy.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Charge Forth!',
        'image': 'charge_forth__by_aurais-d58znm4.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Cloud Kicker',
        'image': 'cloud_kicker_by_aurais-d58h4ij.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Deathwing',
        'image': 'deathwing_by_aurais-d58g70z.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Deep Thought',
        'image': 'deep_thought_by_aurais-d58h4sx.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Derpy Hooves',
        'image': 'derpy_by_aurais-d56it11.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Dinky Doo',
        'image': 'dinky_doo_by_aurais-d58h5d0.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Discord, Avatar of Chaos',
        'image': 'discord__avatar_of_chaos_by_aurais-d57qfu2.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Emotional Breakdown',
        'image': 'emotional_breakdown_by_aurais-d58arbc.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Enchantress\' Path',
        'image': 'enchantress___path_by_aurais-d58xlri.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Featherweight',
        'image': 'featherweight_by_aurais-d58h5tz.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Filthy Rich',
        'image': 'filthy_rich_by_aurais-d58hfrx.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Flim',
        'image': 'flam_and_flim_by_aurais-d58znwf.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Flam',
        'image': 'flim_and_flam_by_aurais-d58zo79.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Golden Harvest',
        'image': 'golden_harvest_by_aurais-d58ptfg.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Granny Smith',
        'image': 'granny_smith_by_aurais-d58zolg.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Harpo\'s lullaby',
        'image': 'harpo__s_lullbay_by_aurais-d58hhen.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Illusory Wings',
        'image': 'illusory_wings_by_aurais-d58hhpo.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Katt Apples',
        'image': 'katt_apples_by_aurais-d591pgq.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Lemon Hearts',
        'image': 'lemon_hearts_by_aurais-d58qji6.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Lightning Bolt, Pony',
        'image': 'lightning_blot__by_aurais-d58hk3y.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Mastermind',
        'image': 'mastermind_by_aurais-d59uhav.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Medley',
        'image': 'medley_by_aurais-d58hklx.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Mind Shift',
        'image': 'mind_shift_by_aurais-d5957hf.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Minuette',
        'image': 'minuette_by_aurais-d581u7k.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Nullify',
        'image': 'nullify_by_aurais-d58hl8h.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Nurse Redheart',
        'image': 'nurse_redheart_by_aurais-d58r0h3.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Octavia',
        'image': 'octavia_by_aurais-d57xggz.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Octavia\'s Waltz',
        'image': 'octavia__s_waltz_by_aurais-d58r0qj.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Owlowiscious',
        'image': 'owlowliscious_by_aurais-d58hlmh.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Parallel Action',
        'image': 'parallel_action_by_aurais-d58htyn.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Phoenix feather',
        'image': 'phoenix_feather_by_aurais-d57xbgd.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Potion of Friendship',
        'image': 'potion_of_friendship_by_aurais-d591qdc.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Prawness Potion',
        'image': 'prawness_potion_by_aurais-d591q2i.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Princess Cadance',
        'image': 'princess_cadance_by_aurais-d592zrt.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Princess Celestia',
        'image': 'princess_celestia__by_aurais-d58p01a.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Princess Luna',
        'image': 'princess_luna_by_aurais-d58zn9g.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Queen Chrysalis',
        'image': 'queen_chrysalis_by_aurais-d57tqe8.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Rainbow Dash',
        'image': 'rainbow_dash_by_aurais-d5918rj.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Rays of Light',
        'image': 'rays_of_light_by_aurais-d58r2xg.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Return to Nature',
        'image': 'return_to_nature_by_aurais-d591pqy.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Reveal The Forbidden',
        'image': 'reveal_the_forbidden_by_aurais-d59aj54.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Ring of Nine Suns',
        'image': 'ring_of_nine_suns_by_aurais-d58s98c.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Roseluck',
        'image': 'roseluck_by_aurais-d58xznj.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Royal Guards',
        'image': 'royal_guards_by_aurais-d58r3ba.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Serpent\'s Poison',
        'image': 'serpent__s_poison_by_aurais-d58xyho.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Silvermane\'s Atoll',
        'image': 'silvermane__s_atoll_by_aurais-d58alxh.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Spirit of Hope',
        'image': 'spirit_of_hope_by_aurais-d590rsw.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'String of Ponies',
        'image': 'string___really_string__yes__string_of_ponies_by_aurais-d58xxyq.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Struggle of Friends',
        'image': 'struggle_of_friends_by_aurais-d58r3qb.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Surreal World',
        'image': 'surreal_world_by_aurais-d59kcne.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Sweety Belle',
        'image': 'sweety_belle_by_aurais-d58r45n.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Tendrils of Goop',
        'image': 'tendrils_of_goop_by_aurais-d58i643.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Thunderclasp',
        'image': 'thunderclasp_by_aurais-d56itg1.png',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Tree Snare',
        'image': 'tree_snare_by_aurais-d58xwyu.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Trixie',
        'image': 'trixie_by_aurais-d58g5zp.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Twilight Exiled',
        'image': 'twilight__by_aurais-d581r8f.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Twilight\'s Barrier',
        'image': 'twilight__s_barrier_by_aurais-d58i6if.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Twist',
        'image': 'twist_by_aurais-d58i6x6.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'United We Stand',
        'image': 'united_we_stand_by_aurais-d58r5t7.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Vanishment',
        'image': 'vanishment_by_aurais-d58i7v8.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Vinyl Scratch',
        'image': 'vinyl_scratch__by_aurais-d5865bg.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Vinyl\'s Remix',
        'image': 'vinyl__s_remix_by_aurais-d58699a.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Winter Wrap Up',
        'image': 'winter_wrap_up__by_aurais-d58xvhv.jpg',
        'set': 'Equestria Disturbed',
        'creator': 'aurais'
    },
    {
        'name': 'Applebloom\'s Browbeat',
        'image': 'applebloom__s_browbeat_by_azndemonlord-d4xk2lx.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Applejack',
        'image': 'applejack_by_azndemonlord-d4iw3se.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Apple Kin',
        'image': 'apple_kin_by_azndemonlord-d4kca76.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Avalanche',
        'image': 'avalanche_by_azndemonlord-d4jnen8.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Ball Bouncing Record',
        'image': 'ball_bouncing_record__ver_3__by_azndemonlord-d4j3nxl.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Big Macintosh',
        'image': 'big_macintosh_by_azndemonlord-d4j2hxr.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Book of Supernaturals',
        'image': 'book_of_supernaturals_by_azndemonlord-d4kca1n.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Cakeface',
        'image': 'cakeface_by_azndemonlord-d4ty44b.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Derpy Hooves',
        'image': 'derpy_hooves_by_azndemonlord-d4j2gp7.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Direct the Stampede',
        'image': 'direct_the_stampede_by_azndemonlord-d4nuzs8.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Disappearing Ink',
        'image': 'dissappearing_ink_by_azndemonlord-d4jc30a.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Don\'t Want',
        'image': 'don__t_want_by_azndemonlord-d4jc34e.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Downpour',
        'image': 'downpour_by_azndemonlord-d4k7e42.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Dragon\'s Lair Map',
        'image': 'dragon__s_lair_map_by_azndemonlord-d4jneq3.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Elements of Harmony',
        'image': 'elements_of_harmony_by_azndemonlord-d4iw2v0.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Fluttershy',
        'image': 'fluttershy_by_azndemonlord-d4iw1h3_1.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Angered Fluttershy',
        'image': 'fluttershy_by_azndemonlord-d4iw1h3_2.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Unbridled Excitement',
        'image': 'gasp_time_for_a_party_by_azndemonlord-d4kcaae.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Giggle at the Ghostie',
        'image': 'giggle_at_the_ghostie_by_azndemonlord-d4lwcm5.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Hedge Twig',
        'image': 'hedge_twig_by_azndemonlord-d4k7ed8.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Hogtied',
        'image': 'hogtied_by_azndemonlord-d4jnalu.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Hoof-Shake Buzzer',
        'image': 'hoof_shake_buzzer_by_azndemonlord-d4izi0g.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Indomitable Focus',
        'image': 'indomitable_focus_by_azndemonlord-d4izm8x.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'I\'ve Got My Eye On You',
        'image': 'i__ve_got_my_eye_on_you_by_azndemonlord-d4kc9h8.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Last Minute Pruning',
        'image': 'last_minute_pruning_by_azndemonlord-d4k7ea4.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Manticore',
        'image': 'manticore_by_azndemonlord-d4nvcoj.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Mark Endowment',
        'image': 'mark_endowment_by_azndemonlord-d4xk28u.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Number 25',
        'image': 'number_25_by_azndemonlord-d4j2ftj.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Parasprite Infestation',
        'image': 'parasprite_by_azndemonlord-d4ty4c5.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Patrol Winds',
        'image': 'patrol_winds_by_azndemonlord-d4ty4gm.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Pinkie Pie',
        'image': 'pinkie_pie_by_azndemonlord-d4iw15s_1.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Pinkamena Diane Pie',
        'image': 'pinkie_pie_by_azndemonlord-d4iw15s_2.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Pony Piper',
        'image': 'pony_piper_by_azndemonlord-d4ty4ku.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Princess Celestia',
        'image': 'princess_celestia_by_azndemonlord-d4izgud.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Rainbow Dash',
        'image': 'rainbow_dash_by_azndemonlord-d4iw0ob.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Rarity',
        'image': 'rarity_by_azndemonlord-d4iw40c.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Red Dragon',
        'image': 'red_dragon_by_azndemonlord-d4jnety.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Ridiculous Outfit',
        'image': 'ridiculous_outfit_by_azndemonlord-d4jneru.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Scary Black Smoke',
        'image': 'scary_black_smoke_by_azndemonlord-d4op3bs.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Shut Up',
        'image': 'shut_up_by_azndemonlord-d4j2flp.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Sneezing Powder',
        'image': 'sneezing_powder_by_azndemonlord-d4jc3aw.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Socialite Spike',
        'image': 'socialite_spike_by_azndemonlord-d4kcain.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Soldier Spike',
        'image': 'soldier_spike_by_azndemonlord-d4kcafx.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Song Birds',
        'image': 'song_birds_by_azndemonlord-d4kcadg.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Spike',
        'image': 'spike_by_azndemonlord-d4iw35l_1.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Spike, the Knight of Dreams',
        'image': 'spike_by_azndemonlord-d4iw35l_2.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Steven Magnet',
        'image': 'steven_magnet_by_azndemonlord-d4lwcsd.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Stolen Song',
        'image': 'stolen_song_by_azndemonlord-d4txw36.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Sugar Lump Rump',
        'image': 'sugar_lump_rump_by_azndemonlord-d4xk2fa.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'The Great and Powerful Trixie',
        'image': 'the_great_and_powerful_trixie_by_azndemonlord-d4iw55x.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'The Headless Horse',
        'image': 'the_headless_horse_by_azndemonlord-d4k7dwa.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'The Horror!',
        'image': 'the_horror__by_azndemonlord-d4txwca.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Tickets to the Gala',
        'image': 'tickets_to_the_gala_by_azndemonlord-d4j2fem.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Trampoline',
        'image': 'trampoline_by_azndemonlord-d4jc2qt.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Mesmerize',
        'image': 'trance_by_azndemonlord-d4j2fo6.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Trance',
        'image': 'trance_by_azndemonlord-d4nveio.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Turn That Frown, Upside Down',
        'image': 'turn_that_frown__upside_down_by_azndemonlord-d4jo2l3.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Twilight Sparkle',
        'image': 'twilight_sparkle_by_azndemonlord-d4iw5kp.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Twilight\'s Sky Viewer',
        'image': 'twilight__s_sky_viewer_by_azndemonlord-d4k7eji.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Wait!',
        'image': 'wait__by_azndemonlord-d4nvf0u.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Zecora',
        'image': 'zecora_by_azndemonlord-d4txw7m.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Zecora\'s Glare',
        'image': 'zecora__s_glare_by_azndemonlord-d4kc9km.png',
        'set': 'MLP:FiM Season 1 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Canterlot Shielding',
        'image': 'canterlot_shielding_by_azndemonlord-d4xsf4m.png',
        'set': 'MLP:FiM Season 2 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Chancellor Puddinghead',
        'image': 'chancellor_puddinghead_by_azndemonlord-d4jjedy.png',
        'set': 'MLP:FiM Season 2 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Commander Hurricane',
        'image': 'commander_hurricane_by_azndemonlord-d4jjecq.png',
        'set': 'MLP:FiM Season 2 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Princess Cadance',
        'image': 'princess_cadance_by_azndemonlord-d4xsfvw.png',
        'set': 'MLP:FiM Season 2 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Princess Platinum',
        'image': 'princess_platinum_by_azndemonlord-d4jgpob.png',
        'set': 'MLP:FiM Season 2 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Queen Chrysalis',
        'image': 'queen_chrysalis_by_azndemonlord-d4xsg24.png',
        'set': 'MLP:FiM Season 2 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Shining Armor',
        'image': 'shining_armor_by_azndemonlord-d4xsffa.png',
        'set': 'MLP:FiM Season 2 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Statue of Discord',
        'image': 'statue_of_discord_by_azndemonlord-d4izft6_1.png',
        'set': 'MLP:FiM Season 2 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Discord, the Spirit of Disharmony and Chaos',
        'image': 'statue_of_discord_by_azndemonlord-d4izft6_2.png',
        'set': 'MLP:FiM Season 2 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Summit of the Tribes',
        'image': 'summit_of_the_tribes_by_azndemonlord-d4jgpib.png',
        'set': 'MLP:FiM Season 2 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'United We Stand',
        'image': 'united_we_stand_by_azndemonlord-d4xsg97.png',
        'set': 'MLP:FiM Season 2 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'William Spikespeare',
        'image': 'william_spikespeare_by_azndemonlord-d4jg9pn.png',
        'set': 'MLP:FiM Season 2 MTG Set',
        'creator': 'AznDemonLord'
    },
    {
        'name': 'Canterlot Guard',
        'image': 'canterlot_guard_by_modernwater-d6wdy94.jpg',
        'set': 'MTG mlp',
        'creator': 'Modernwater'
    },
    {
        'name': 'Filly Derpy',
        'image': 'filly_derpy_by_modernwater-d6yb5ak.jpg',
        'set': 'MTG mlp',
        'creator': 'Modernwater'
    },
    {
        'name': 'Night Guard',
        'image': 'night_guard__mtg_token__by_modernwater-d6whrb4.jpg',
        'set': 'MTG mlp',
        'creator': 'Modernwater'
    },
    {
        'name': 'Pathfinders',
        'image': 'pathfinders_by_modernwater-d6y0py8.jpg',
        'set': 'MTG mlp',
        'creator': 'Modernwater'
    },
    {
        'name': 'Prince Shining Armour',
        'image': 'prince_shining_armour_by_modernwater-d6wpw8j.jpg',
        'set': 'MTG mlp',
        'creator': 'Modernwater'
    },
    {
        'name': 'Princess Cadence',
        'image': 'princess_cadence_by_modernwater-d6wlvk9.jpg',
        'set': 'MTG mlp',
        'creator': 'Modernwater'
    },
    {
        'name': 'Princess Celestia',
        'image': 'princess_celestia__white_deck__by_modernwater-d6wdxnc.jpg',
        'set': 'MTG mlp',
        'creator': 'Modernwater'
    },
    {
        'name': 'Princess Luna',
        'image': 'princess_luna__mtg_white__by_modernwater-d6whn49.jpg',
        'set': 'MTG mlp',
        'creator': 'Modernwater'
    },
    {
        'name': 'Princess Twilight Sparkle',
        'image': 'princess_twilight_sparkle_by_modernwater-d6wy5br.jpg',
        'set': 'MTG mlp',
        'creator': 'Modernwater'
    },
    {
        'name': 'Ability Loss',
        'image': 'Ability Loss.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Absent-Minded Alligator',
        'image': 'Absent-Minded Alligator.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Æther Snap',
        'image': 'Æther Snap.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Alicorn Ascension',
        'image': 'Alicorn Ascension.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Alpha Timberwolf',
        'image': 'Alpha Timberwolf.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Apple Family Reunion',
        'image': 'Apple Family Reunion.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Applejack',
        'image': 'Applejack.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Befriended',
        'image': 'Befriended.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Big Macintosh',
        'image': 'Big Macintosh.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Big McLargehuge',
        'image': 'Big McLargehuge.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Bon Bon',
        'image': 'Bon Bon.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Break of Dawn',
        'image': 'Break of Dawn.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Broken Promises',
        'image': 'Broken Promises.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Burning Rage',
        'image': 'Burning Rage.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Call Friends',
        'image': 'Call Friends.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Carousel Boutique',
        'image': 'Carousel Boutique.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Castle of the Royal Pony Sisters',
        'image': 'Castle of the Royal Pony Sisters.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Celestial Error',
        'image': 'Celestial Error.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Changeling Troopers',
        'image': 'Changeling Troopers.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Cloud Drill',
        'image': 'Cloud Drill.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Cloudsdale',
        'image': 'Cloudsdale.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Cloud-Walking Spell',
        'image': 'Cloud-Walking Spell.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Commemorative Window',
        'image': 'Commemorative Window.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Confiscate',
        'image': 'Confiscate.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Corrupted Trees',
        'image': 'Corrupted Trees.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Corruption',
        'image': 'Corruption.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Cragodile',
        'image': 'Cragodile.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Creepy Cloak',
        'image': 'Creepy Cloak.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Curse of Anger',
        'image': 'Curse of Anger.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Curse of Betrayal',
        'image': 'Curse of Betrayal.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Curse of Cruelty',
        'image': 'Curse of Cruelty.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Curse of Greed',
        'image': 'Curse of Greed.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Curse of Lies',
        'image': 'Curse of Lies.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Curse of Loneliness',
        'image': 'Curse of Loneliness.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Cutie Mark Crusader Cloak',
        'image': 'Cutie Mark Crusader Cloak.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Cutie Mark Crusaders',
        'image': 'Cutie Mark Crusaders.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Cutie Pox',
        'image': 'Cutie Pox.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Derpy Hooves',
        'image': 'Derpy Hooves.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Destiny Transfer',
        'image': 'Destiny Transfer.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Determined Tortoise',
        'image': 'Determined Tortoise.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Diamond Dogs',
        'image': 'Diamond Dogs.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Dig Dogs',
        'image': 'Dig Dogs.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Discordant Glaze',
        'image': 'Discordant Glaze.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Discord\'s Labyrinth',
        'image': 'Discords Labyrinth.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Discord, Spirit of Disharmony',
        'image': 'Discord Spirit of Disharmony.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Doctor Whooves',
        'image': 'Doctor Whooves.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Dragon',
        'image': 'Dragon.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Dragon Roost',
        'image': 'Dragon Roost.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Dragon\'s Hoard',
        'image': 'Dragons Hoard.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Dreamwalk',
        'image': 'Dreamwalk.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Element of Generosity',
        'image': 'Element of Generosity.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Element of Honesty',
        'image': 'Element of Honesty.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Element of Kindness',
        'image': 'Element of Kindness.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Element of Laughter',
        'image': 'Element of Laughter.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Element of Loyalty',
        'image': 'Element of Loyalty.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Element of Magic',
        'image': 'Element of Magic.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Elements of Harmony',
        'image': 'Elements of Harmony.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Eternal Night',
        'image': 'Eternal Night.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Everfree Cockatrice',
        'image': 'Everfree Cockatrice.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Everfree Manticore',
        'image': 'Everfree Manticore.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Fainting Couch',
        'image': 'Fainting Couch.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Fancy Dress',
        'image': 'Fancy Dress.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Fires of Friendship',
        'image': 'Fires of Friendship.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Flam',
        'image': 'Flam.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Flashback Potion',
        'image': 'Flashback Potion.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Flim',
        'image': 'Flim.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Fling',
        'image': 'Fling.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Fluttershy',
        'image': 'Fluttershy.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Fluttershy\'s Cottage',
        'image': 'Fluttershys Cottage.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Flying Contraption',
        'image': 'Flying Contraption.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Forest',
        'image': 'Forest.1.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Forest',
        'image': 'Forest.2.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Forest',
        'image': 'Forest.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Friendship',
        'image': 'Friendship.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Friendship Reports',
        'image': 'Friendship Reports.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Friend to All Living Things',
        'image': 'Friend to All Living Things.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Froggy Bottom Hydra',
        'image': 'Froggy Bottom Hydra.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Giggle at the Ghostly',
        'image': 'Giggle at the Ghostly.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Gilda',
        'image': 'Gilda.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Glimmerwings',
        'image': 'Glimmerwings.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Goat Assistants',
        'image': 'Goat Assistants.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Goat',
        'image': 'Goat.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Golden Oaks Library',
        'image': 'Golden Oaks Library.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Herd Dog',
        'image': 'Herd Dog.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Hungry for Knowledge',
        'image': 'Hungry for Knowledge.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Ill Philomena',
        'image': 'Ill Philomena_1.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Philomena Radiant',
        'image': 'Ill Philomena_2.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Illusion',
        'image': 'Illusion.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Incidental Unicorn #2',
        'image': 'Incidental Unicorn 2.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Inexplicable Seat Belt',
        'image': 'Inexplicable Seat Belt.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Island',
        'image': 'Island.1.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Island',
        'image': 'Island.2.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Island',
        'image': 'Island.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'It\'s a Doozy',
        'image': 'Its a Doozy.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'King Sombra',
        'image': 'King Sombra.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Leafing the Dream',
        'image': 'Leafing the Dream.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Leeroy Wingkins',
        'image': 'Leeroy Wingkins.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Lightning Bolt',
        'image': 'Lightning Bolt.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Lightning Dust',
        'image': 'Lightning Dust.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Love Poison',
        'image': 'Love Poison.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Magical Mustache',
        'image': 'Magical Mustache.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Magical Mystery Cure',
        'image': 'Magical Mystery Cure.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Magic Amok',
        'image': 'Magic Amok.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Mare-do-well Costume',
        'image': 'Mare-do-well Costume.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Mayor Mare',
        'image': 'Mayor Mare.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Memory Lane',
        'image': 'Memory Lane.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Messenger Flame',
        'image': 'Messenger Flame.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Mind Control',
        'image': 'Mind Control.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Mistaken Identity',
        'image': 'Mistaken Identity.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Motivational Minotaur',
        'image': 'Motivational Minotaur.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Mountain',
        'image': 'Mountain.1.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Mountain',
        'image': 'Mountain.2.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Mountain',
        'image': 'Mountain.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Mysterious Goo',
        'image': 'Mysterious Goo.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Mysterious Plague',
        'image': 'Mysterious Plague.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Night Guards',
        'image': 'Night Guards.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Nightmare Thorn',
        'image': 'Nightmare Thorn.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Night-Time Scholar',
        'image': 'Night-Time Scholar.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Noteworthy',
        'image': 'Noteworthy.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Obsessive Sorting',
        'image': 'Obsessive Sorting.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Omnipresence',
        'image': 'Omnipresence.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Over-Assertive',
        'image': 'Over-Assertive.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Overprotection',
        'image': 'Overprotection.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Parasprite',
        'image': 'Parasprite.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Parasprite Parade',
        'image': 'Parasprite Parade.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Pegasus Pony Citizen',
        'image': 'Pegasus Pony Citizen.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Pernicious Feline',
        'image': 'Pernicious Feline.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Petrification',
        'image': 'Petrification.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Phoenix Flare',
        'image': 'Phoenix Flare.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Pinkie Pie',
        'image': 'Pinkie Pie_1.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Pinkamena Diane Pie',
        'image': 'Pinkie Pie_2.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Pinkie Promise',
        'image': 'Pinkie Promise.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Pinkie Sense',
        'image': 'Pinkie Sense.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Plains',
        'image': 'Plains.1.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Plains',
        'image': 'Plains.2.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Plains',
        'image': 'Plains.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Plunder Seeds',
        'image': 'Plunder Seeds.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Poison Joke',
        'image': 'Poison Joke.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Pony Citizen',
        'image': 'Pony Citizen.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Power of Love',
        'image': 'Power of Love.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Prince Blueblood',
        'image': 'Prince Blueblood.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Princess Cadence',
        'image': 'Princess Cadence.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Princess Celestia',
        'image': 'Princess Celestia.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Princess Luna',
        'image': 'Princess Luna_1.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Nightmare Moon',
        'image': 'Princess Luna_2.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Queen Chrysalis',
        'image': 'Queen Chrysalis.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Quest for the Keys',
        'image': 'Quest for the Keys.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Rainbow Dash',
        'image': 'Rainbow Dash.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Rainbow \'s Pegapult',
        'image': 'Rainbows Pegapult.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Rarity',
        'image': 'Rarity.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Razorfang Dragon',
        'image': 'Razorfang Dragon.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Return from Banishment',
        'image': 'Return from Banishment.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Righteous Anger',
        'image': 'Righteous Anger.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Rise from the Ashes',
        'image': 'Rise from the Ashes.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Royal Guards',
        'image': 'Royal Guards.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Shaky Cliff',
        'image': 'Shaky Cliff.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Shining Armor',
        'image': 'Shining Armor.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Silence',
        'image': 'Silence.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Sleep Deprivation',
        'image': 'Sleep Deprivation.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Sleeping Dragon',
        'image': 'Sleeping Dragon.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Smarty Pants',
        'image': 'Smarty Pants.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Snake Den',
        'image': 'Snake Den.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Snake',
        'image': 'Snake.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Sonic Rainboom',
        'image': 'Sonic Rainboom.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Spike, Number One Assistant',
        'image': 'Spike Number One Assistant_1.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Spike, Greed-Grown Dragon',
        'image': 'Spike Number One Assistant_2.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Sporespitter',
        'image': 'Sporespitter.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Stage Fright',
        'image': 'Stage Fright.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Stealth Suit',
        'image': 'Stealth Suit.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Steven Magnet',
        'image': 'Steven Magnet.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Strangle Thorns',
        'image': 'Strangle Thorns.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Sudden Snowfall',
        'image': 'Sudden Snowfall.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Sugar Cube Corner',
        'image': 'Sugar Cube Corner.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Super Speedy Cider Squeeze 6000',
        'image': 'Super Speedy Cider Squeezy 6000.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Surprise Party',
        'image': 'Surprise Party.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Swamp',
        'image': 'Swamp.1.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Swamp',
        'image': 'Swamp.2.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Swamp',
        'image': 'Swamp.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Sweet Apple Acres',
        'image': 'Sweet Apple Acres.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Teleportation',
        'image': 'Teleportation.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'The Alicorn Amulet',
        'image': 'The Alicorn Amulet.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'The Crystal Empire',
        'image': 'The Crystal Empire.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'The Great and Powerful Trixie',
        'image': 'The Great and Powerful Trixie.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'The Mirror Pool',
        'image': 'The Mirror Pool.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'The Shadowbolts',
        'image': 'The Shadowbolts.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'The Tree of Harmony',
        'image': 'The Tree of Harmony.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'The Wonderbolts',
        'image': 'The Wonderbolts.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Thorn Clouds',
        'image': 'Thorn Clouds.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Timberwolf',
        'image': 'Timberwolf.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Time to Heal',
        'image': 'Time to Heal.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Time Travel',
        'image': 'Time Travel.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Together!',
        'image': 'Together.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Tom Dan',
        'image': 'Tom Dan.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Touch of Discord',
        'image': 'Touch of Discord.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Travel Itinerary',
        'image': 'Travel Itinerary.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Twilight Sparkle',
        'image': 'Twilight Sparkle.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Twinkling Balloon',
        'image': 'Twinkling Balloon.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Unicorn Levitation',
        'image': 'Unicorn Levitation.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Unicorn Pony Citizen',
        'image': 'Unicorn Pony Citizen.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Ursa Major',
        'image': 'Ursa Major.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Ursa Minor',
        'image': 'Ursa Minor.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Vexing Bunny',
        'image': 'Vexing Bunny.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Violent Flies',
        'image': 'Violent Flies.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Want It, Need It',
        'image': 'Want It Need It.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Weaponized Pastries',
        'image': 'Weaponized Pastries.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Windigo',
        'image': 'Windigo.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Wing Break',
        'image': 'Wing Break.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Winter\'s Night',
        'image': 'Winters Night.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Winter Wrap Up',
        'image': 'Winter Wrap Up.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'World Enchantments',
        'image': 'World Enchantments.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'World-Healing Wave',
        'image': 'World-Healing Wave.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'World of Chaos',
        'image': 'World of Chaos.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Zap Apple Orchard',
        'image': 'Zap Apple Orchard.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Zecora',
        'image': 'Zecora.jpg',
        'set': 'Elements of Harmony',
        'creator': 'Shadic-X-Hedgehog'
    },
    {
        'name': 'Angel Bunny',
        'image': 'angel_bunny_by_shirlendra-d4ai3js.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Angered Wraith',
        'image': 'angered_wraith_by_shirlendra-d4abgke.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Banish',
        'image': 'banish_by_shirlendra-d4aeqtu.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Buffalo Stampede',
        'image': 'buffalo_stampede_by_shirlendra-d4abh19.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Bulge',
        'image': 'bulge_by_shirlendra-d4amm06.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Bunny Mob',
        'image': 'bunny_mob_by_shirlendra-d4a8g5o.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'CandleLight',
        'image': 'candle_light_by_shirlendra-d4abgfm.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Cauldron',
        'image': 'cauldron_by_shirlendra-d4a8gj9.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Celestia\'s Decree',
        'image': 'celestia__s_decree_by_shirlendra-d4ai3ui.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Celestia, Solar Princess',
        'image': 'celestia__solar_princess_by_shirlendra-d4a8icv.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Cheerilee',
        'image': 'cheerile_by_shirlendra-d4ammxj.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Cutie Mark Crusader Clubhouse',
        'image': 'cmc_clubhouse_by_shirlendra-d4aeo23.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Cutie Mark Crusader Cape',
        'image': 'cutie_mark_crusader_cape_by_shirlendra-d4a8gp7.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Defend the realm',
        'image': 'defend_the_realm_by_shirlendra-d4ai3wt.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Doctor Whooves',
        'image': 'doctor_whooves_by_shirlendra-d4ai44h.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Dress Design',
        'image': 'dress_design_by_shirlendra-d4b9x5q.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Elements of Harmony',
        'image': 'elements_of_harmony_by_shirlendra-d4ai47y.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Equestrian Elite Guard',
        'image': 'equestian_elite_guard_by_shirlendra-d4aj2h2.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Pinkie\'s Flying Machine',
        'image': 'flying_machine_by_shirlendra-d4a8k8z.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Gala Dress',
        'image': 'gala_dress_1_by_shirlendra-d4a8h58.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Gala Dress',
        'image': 'gala_dress_2_by_shirlendra-d4a8h7r.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Gala Dress',
        'image': 'gala_dress_3_by_shirlendra-d4a8hah.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Gala Dress',
        'image': 'gala_dress_4_by_shirlendra-d4a8het.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Gala Dress',
        'image': 'gala_dress_5_by_shirlendra-d4a8hi8.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Gummy',
        'image': 'gummy_by_shirlendra-d4a5985.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Hex',
        'image': 'hex_by_shirlendra-d4aeljy.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Intimidate',
        'image': 'intimidate_by_shirlendra-d4ai3zk.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Lost Friends',
        'image': 'lost_friends_by_shirlendra-d4aiant.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Luna\'s Decree',
        'image': 'luna__s_decree_by_shirlendra-d4ai3rs.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Stunlock',
        'image': 'mlp_mrg__stunlock_by_shirlendra-d4bd68g.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Angry Bear',
        'image': 'mlp_mtg__angry_bear_by_shirlendra-d4cxbwp.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Annihilation',
        'image': 'mlp_mtg__annihilation_by_shirlendra-d4cxntu.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Apple Bloom',
        'image': 'mlp_mtg__apple_bloom_by_shirlendra-d4a8lya.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'AppleJack, Element of Honesty',
        'image': 'mlp_mtg__applejack_trans_by_shirlendra-d4dxmad_1.png',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Applejack, The leader',
        'image': 'mlp_mtg__applejack_trans_by_shirlendra-d4dxmad_2.png',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Appleloosa Gentlepony',
        'image': 'mlp_mtg__appleloosa_gentlepony_by_shirlendra-d4abgry.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Berry Punch',
        'image': 'mlp_mtg__berry_punch_by_shirlendra-d4dg4u7.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Big Macintosh',
        'image': 'mlp_mtg__big_macintosh_by_shirlendra-d4aighk.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Birthday party',
        'image': 'mlp_mtg__birthday_party_by_shirlendra-d4aw0c5.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Blinky Pie',
        'image': 'mlp_mtg__blinky_pie_by_shirlendra-d4bpq8k.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Bon Bon',
        'image': 'mlp_mtg__bon_bon_by_shirlendra-d4bpx0l.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Braeburn',
        'image': 'mlp_mtg__braeburn_by_shirlendra-d4abgaf.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Broken Dreams',
        'image': 'mlp_mtg__broken_dreams_by_shirlendra-d4aznvd.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Bubble shield',
        'image': 'mlp_mtg__bubble_shield_by_shirlendra-d4aznrt.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Bunny Stampede',
        'image': 'mlp_mtg__bunny_stampede_by_shirlendra-d4ao5cr.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Burning Drink',
        'image': 'mlp_mtg__burning_drink_by_shirlendra-d4amrag.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Burning Pony',
        'image': 'mlp_mtg__burning_pony_by_shirlendra-d4a8gfs.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Call to Hooves',
        'image': 'mlp_mtg__call_to_hooves_by_shirlendra-d4amn1h.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Carrot Green',
        'image': 'mlp_mtg__carrot_green_by_shirlendra-d4ch58p.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Celestia\'s Cleansing',
        'image': 'mlp_mtg__celestia__s_cleansing_by_shirlendra-d4acz50.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'CMC Map',
        'image': 'mlp_mtg__cmc_map_by_shirlendra-d4c6xlc.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Cute Bee\'s',
        'image': 'mlp_mtg_cute_bee__s_by_shirlendra-d4cfhtl.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Cutie Mark Crusaders',
        'image': 'mlp_mtg__cutie_mark_crusaders_by_shirlendra-d4a8gur.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Dark Ascension',
        'image': 'mlp_mtg__dark_ascension_by_shirlendra-d4dm78y.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Dark Cocoon',
        'image': 'mlp_mtg__dark_cocoon_by_shirlendra-d6kouhv.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Dark Specter',
        'image': 'mlp_mtg__dark_specter_by_shirlendra-d4dm7fx.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Derpy Hooves',
        'image': 'mlp_mtg__derpy_hooves_by_shirlendra-d4aicod.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Discord',
        'image': 'mlp_mtg__discord_by_shirlendra-d4cfhwb.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Drag',
        'image': 'mlp_mtg__drag_by_shirlendra-d4grl73.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Drench',
        'image': 'mlp_mtg__drench_by_shirlendra-d4aznk3.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Elder Ponies',
        'image': 'mlp_mtg__elder_ponies_by_shirlendra-d4hd8kk.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Equestrian Airship',
        'image': 'mlp_mtg__equestrian_airship_by_shirlendra-d4i5wom.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Equestrian Nurse',
        'image': 'mlp_mtg__equestrian_nurse_by_shirlendra-d4abghx.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Eye Sparkle',
        'image': 'mlp_mtg__eye_sparkle_by_shirlendra-d4ai7gn.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Fluttershy, Element of Kindness',
        'image': 'mlp_mtg__fluttershy_by_shirlendra-d4a592g.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Fluttershy, Element of Kindness',
        'image': 'mlp_mtg__fluttershy_trans_by_shirlendra-d4drozj_1.png',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Flutterbrute',
        'image': 'mlp_mtg__fluttershy_trans_by_shirlendra-d4drozj_2.png',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Frog Relocation',
        'image': 'mlp_mtg__frog_relocation_by_shirlendra-d4bw7qs.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Gala Dress',
        'image': 'mlp_mtg__gala_dress_f_by_shirlendra-d4bdhi0.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Gem Cart',
        'image': 'mlp_mtg__gem_cart_by_shirlendra-d4bd6wp.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Gilda',
        'image': 'mlp_mtg__gilda_by_shirlendra-d4abgya.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Grand Galloping Gala',
        'image': 'mlp_mtg__grand_galloping_gala_by_shirlendra-d4aikwq.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Hoity Toity, Fashion Designer',
        'image': 'mlp_mtg__hoity_toity_by_shirlendra-d4a8jez.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Hover Form',
        'image': 'mlp_mtg__hover_form_by_shirlendra-d4ch1j4.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Influential Unicorns',
        'image': 'mlp_mtg__influential_unicorns_by_shirlendra-d4i6214.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Inky Pie',
        'image': 'mlp_mtg__inky_pie_by_shirlendra-d4bpq6a.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Insane Mare',
        'image': 'mlp_mtg__insane_mare_by_shirlendra-d4cxev2.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Insane Mare',
        'image': 'mlp_mtg__insane_mare_by_shirlendra-d6kpso2.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Inspire',
        'image': 'mlp_mtg__inspire_by_shirlendra-d4azni0.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Letter',
        'image': 'mlp_mtg__letter_by_shirlendra-d4amm71.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Listen In',
        'image': 'mlp_mtg__listen_in_by_shirlendra-d4cxkxi.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Luna, Dreamwalker',
        'image': 'mlp_mtg__luna__dreamwalker_by_shirlendra-d6kfmbq.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Luna, Lunar Princess',
        'image': 'mlp_mtg__luna__lunar_princess_by_shirlendra-d4a8i8t.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Madame Leflour',
        'image': 'mlp_mtg__madame_leflour_by_shirlendra-d4cejpg.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Magic Show',
        'image': 'mlp_mtg__magic_show_by_shirlendra-d4cgz5p.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Make Some Friends',
        'image': 'mlp_mtg__make_some_friends_by_shirlendra-d4c2vxa.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Mare-Do-Well',
        'image': 'mlp_mtg__mare_do_well_by_shirlendra-d4hdkqo.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Meaningful Gift',
        'image': 'mlp_mtg__meaningful_gift_by_shirlendra-d4amp80.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Mental Slip',
        'image': 'mlp_mtg__mental_slip_by_shirlendra-d4cxi31.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Mirror Pool',
        'image': 'mlp_mtg__mirror_pool_by_shirlendra-d6kqf0e.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Nightmare Critter',
        'image': 'mlp_mtg__nightmare_critter_by_shirlendra-d4grk05.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Nightmare Moon',
        'image': 'mlp_mtg__nightmare_moon_by_shirlendra-d4a8i3b.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Opalescence',
        'image': 'mlp_mtg__opalescence_by_shirlendra-d4abg2y.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Parasprite',
        'image': 'mlp_mtg__parasprite_by_shirlendra-d4a8ill.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Parental Figures',
        'image': 'mlp_mtg__parental_figures_v_2_by_shirlendra-d4bwd41.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Party Trap',
        'image': 'mlp_mtg__party_trap_by_shirlendra-d4a8jyt.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Pegasus Royal Guard',
        'image': 'mlp_mtg__pegasus_royal_guard_by_shirlendra-d4a8gxs.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Pegasus Statue',
        'image': 'mlp_mtg__pegasus_statue_by_shirlendra-d4bdbey.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Pie Barrage',
        'image': 'mlp_mtg__pie_barrage_by_shirlendra-d4c00g9.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Pinkie Pie, Element of Laughter',
        'image': 'mlp_mtg__pinky_pinkamena_trans_by_shirlendra-d4bkzj4_1.png',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Pinkamena Diane Pie',
        'image': 'mlp_mtg__pinky_pinkamena_trans_by_shirlendra-d4bkzj4_2.png',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Pinkie\'s Polka',
        'image': 'mlp_mtg__pinky__s_polka_by_shirlendra-d4a8jqe.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Pip',
        'image': 'mlp_mtg__pip_by_shirlendra-d4dm7ce.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Pony Auctioneer',
        'image': 'mlp_mtg__pony_auctioneer_by_shirlendra-d4i5uxx.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Pony Filly',
        'image': 'mlp_mtg__pony_filly_by_shirlendra-d4hdaip.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Pony Joe',
        'image': 'mlp_mtg__pony_joe_by_shirlendra-d4bdy8k.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Pony Party',
        'image': 'mlp_mtg__pony_party_by_shirlendra-d4aiimf.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Unicorn Porter',
        'image': 'mlp_mtg__pony_porter_by_shirlendra-d4i5xyr.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Pony Sisters',
        'image': 'mlp_mtg__pony_sisters_by_shirlendra-d4ampae.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Ponyville Dam',
        'image': 'mlp_mtg__ponyville_dam_by_shirlendra-d4hdcn8.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Prove It',
        'image': 'mlp_mtg__prove_it_by_shirlendra-d4c2xlc.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Quest for the Cutie Mark',
        'image': 'mlp_mtg__quest_for_the_mark_by_shirlendra-d4ao5sb.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Rainbow Dash, Element of Loyalty',
        'image': 'mlp_mtg__rainbow_dash_trans_by_shirlendra-d4dn1m6_1.png',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Shadow Dash',
        'image': 'mlp_mtg__rainbow_dash_trans_by_shirlendra-d4dn1m6_2.png',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Rainbow\'s Sunglasses',
        'image': 'mlp_mtg__rainbow__s_sunglasses_by_shirlendra-d4cxdzc.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Rampaging Dragon',
        'image': 'mlp_mtg__rampaging_dragon_by_shirlendra-d4cfhr3.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Rarity, Element of Generosity',
        'image': 'mlp_mtg__rarity_trans_by_shirlendra-d4dxmg2_1.png',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Rarity, The Lady',
        'image': 'mlp_mtg__rarity_trans_by_shirlendra-d4dxmg2_2.png',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Reduce to ash',
        'image': 'mlp_mtg__reduce_to_ash_by_shirlendra-d4amrdn.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Sadness',
        'image': 'mlp_mtg__sadness_by_shirlendra-d4bdflc.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Sandwich',
        'image': 'mlp_mtg__sandwich_by_shirlendra-d4blg1q.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Scientific Testing',
        'image': 'mlp_mtg__scientific_testing_by_shirlendra-d4aeryr.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Scootaloo',
        'image': 'mlp_mtg__scootaloo_by_shirlendra-d4a8k5g.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Screwball',
        'image': 'mlp_mtg__screwball_by_shirlendra-d4aznlx.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Secrets // Lies',
        'image': 'mlp_mtg__secrets_and_lies_by_shirlendra-d4bprsl_r.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'ShadowBolts',
        'image': 'mlp_mtg__shadowbolts_by_shirlendra-d4b0ac0.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Shadow Foals',
        'image': 'mlp_mtg__shadow_foals_by_shirlendra-d4cxcp6.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Short Story',
        'image': 'mlp_mtg__short_story_by_shirlendra-d4ao4en.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Shush',
        'image': 'mlp_mtg__shush_by_shirlendra-d4c33ts.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Sickness',
        'image': 'mlp_mtg__sickness_by_shirlendra-d4amryi.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Smartypants',
        'image': 'mlp_mtg__smartypants_by_shirlendra-d4cyc6m.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Smokey Fog',
        'image': 'mlp_mtg__smokey_fog_by_shirlendra-d4dm7j5.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Snap',
        'image': 'mlp_mtg__snap_by_shirlendra-d4cxbdp.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Spike\'s Bowtie',
        'image': 'mlp_mtg__spikes_bowtie_by_shirlendra-d4bdas1.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Staredown',
        'image': 'mlp_mtg__staredown_by_shirlendra-d4cxjv4.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Starswirl, The Bearded',
        'image': 'mlp_mtg__starswirl_the_bearded_by_shirlendra-d4dlpko.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Sudden Party',
        'image': 'mlp_mtg__sudden_party_by_shirlendra-d4ao4c9.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Sunrise',
        'image': 'mlp_mtg__sunrise_by_shirlendra-d4aellj.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Sunset Shimmer',
        'image': 'mlp_mtg__sunset_shimmer_by_shirlendra-d6kov2o.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'The Swarm',
        'image': 'mlp_mtg__swarm_by_shirlendra-d4a8ipp.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Sweetie Belle',
        'image': 'mlp_mtg__sweetie_belle_by_shirlendra-d4a8k1b.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Take a letter',
        'image': 'mlp_mtg__take_a_letter_by_shirlendra-d4amlt0.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'The Grin',
        'image': 'mlp_mtg__the_grin_by_shirlendra-d4cxfo6.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Cupcake',
        'image': 'mlp_mtg__token_cupcake_by_shirlendra-d4dg4zc.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Trip and Fall',
        'image': 'mlp_mtg__trip_and_fall_by_shirlendra-d4bw8ak.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Trixie\'s Mirror',
        'image': 'mlp_mtg__trixie__s_mirror_by_shirlendra-d4c36w2.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Twilight\'s Telescope',
        'image': 'mlp__mtg__twilight__s_telescope_by_shirlendra-d4bdab5.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Twilight Sparkle, Element of Magic',
        'image': 'mlp_mtg__twilight_trans_by_shirlendra-d4dxmlw_1.png',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Twilight Sparkle, The Insane',
        'image': 'mlp_mtg__twilight_trans_by_shirlendra-d4dxmlw_2.png',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Unicorn Shade',
        'image': 'mlp_mtg__unicorn_shade_by_shirlendra-d4dm76h.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Zecora',
        'image': 'mlp_mtg__zecora_by_shirlendra-d4a8ity.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Pinky Sense',
        'image': 'mtg_mlp__pinkie_sense_by_shirlendra-d4ba14g.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Pony Herd',
        'image': 'mtg_mlp__pony_herd_v2_0_by_shirlendra-d4bzvmu.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Obvious Answer',
        'image': 'obvious_answer_by_shirlendra-d7dqece.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Octavia',
        'image': 'octavia_by_shirlendra-d4aesnu.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Owlowiscious',
        'image': 'owlowiscious_by_shirlendra-d4ai3os.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Philomena',
        'image': 'philomena_by_shirlendra-d4ai3no.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Photo Finish',
        'image': 'photo_finish_by_shirlendra-d4aj0hn.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Pinkamena\'s Tools',
        'image': 'pinkamena__s_tools_by_shirlendra-d4ad2oa.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Pony',
        'image': 'pony_by_shirlendra-d4aimdr.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Ponyville Library',
        'image': 'ponyville_library_by_shirlendra-d4aen6z.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Prince Blueblood',
        'image': 'prince_blueblood_by_shirlendra-d4aie11.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Prior Warning',
        'image': 'prior_warning_by_shirlendra-d4ai3m2.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Question',
        'image': 'question_by_shirlendra-d4b9w5r.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Rabbit Dens',
        'image': 'rabit_dens_by_shirlendra-d4aencf.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Rarity\'s Boutique',
        'image': 'rarity__s_boutique_by_shirlendra-d4aenad.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Rarity\'s Sewing Machine',
        'image': 'rarity__s_sowing_machine_by_shirlendra-d4b9yrm.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Schoolhouse',
        'image': 'schoolhouse_by_shirlendra-d4aenbb.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Sugarcube Corner',
        'image': 'sugercube_corner_by_shirlendra-d4ajk06.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Surprise Party',
        'image': 'suprise_party_by_shirlendra-d4aeq93.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'The Great and Powerful Trixie',
        'image': 'the_great_and_powerful_trixie_by_shirlendra-d4a8jmn.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'The Stare',
        'image': 'the_stare_by_shirlendra-d4ai3kt.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Tom',
        'image': 'tom_by_shirlendra-d4aznov.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Twitchy Tail // Ear Flop',
        'image': 'tt_fe_by_shirlendra-d4a8ixy_r.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Turn to stone',
        'image': 'turn_to_stone_by_shirlendra-d4a8jhz.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Unearthly Call',
        'image': 'unearthly_call_by_shirlendra-d4ai3if.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Unicorn Royal Guard',
        'image': 'unicorn_royal_guard_by_shirlendra-d4aj2os.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Zecora\'s Home',
        'image': 'zecora__s_home_by_shirlendra-d4aen88.jpg',
        'set': 'MLP-MTG',
        'creator': 'Shirlendra'
    },
    {
        'name': 'Acceptance',
        'image': 'acceptance_by_manasparks-d5e2t8s.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Alicorn Destiny',
        'image': 'alicorn_destiny_by_manasparks-d5vbjgr.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Alpha Timberwolf',
        'image': 'alpha_timberwolf_by_manasparks-d5qh5qx.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Amazed',
        'image': 'amazed_by_manasparks-d5ear7k.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Amethyst Coating',
        'image': 'amethyst_coating_by_manasparks-d5e2v99.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Amnausea',
        'image': 'amnausea_by_manasparks-d5kqfu4.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Angel Bunny',
        'image': 'angel_bunny_by_manasparks-d5ebxzt.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Anger',
        'image': 'anger_by_manasparks-d5e2sik.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Apple Bloom',
        'image': 'apple_bloom_by_manasparks-d5e2mmi.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Applebuck Season',
        'image': 'applebuck_season_by_manasparks-d6d8krg.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Apple Family',
        'image': 'apple_family_by_manasparks-d5e5miz.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Apple Family Plow',
        'image': 'apple_family_plow_by_manasparks-d6lbkgp.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Apple Family Values',
        'image': 'apple_family_values_by_manasparks-d5e328c.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Applejack',
        'image': 'applejack_by_manasparks-d5duaoq.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Applejack\'s Dress',
        'image': 'applejack__s_dress_by_manasparks-d5e6jsf.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Appleloosa',
        'image': 'appleloosa_by_manasparks-d5e7e0d.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Apple Stand',
        'image': 'apple_stand_by_manasparks-d5e5m99.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Illusion',
        'image': 'apple_token_1_by_manasparks-d5g7en2.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Illusion',
        'image': 'apple_token_2_by_manasparks-d5g7ezs.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Avalanche Zone',
        'image': 'avalanche_zone_by_manasparks-d69dlks.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Baked Bads',
        'image': 'baked_bads_by_manasparks-d5efyte.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Bargaining',
        'image': 'bargaining_by_manasparks-d5e2sv9.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Big Macintosh',
        'image': 'big_macintosh_by_manasparks-d5dx9n6.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Bird',
        'image': 'bird_by_manasparks-d6d7s00.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Bird Migration',
        'image': 'bird_migration_by_manasparks-d6d7qfd.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Bite Size',
        'image': 'bite_size_by_manasparks-d5emivp.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Blair Coy Dance',
        'image': 'blair_coy_dance_by_manasparks-d5exprc.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Blue Screen',
        'image': 'blue_screen_derpy_by_manasparks-d6lbdzs.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Brohoof',
        'image': 'brohoof_by_manasparks-d5g20hb.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Brony Fan Base',
        'image': 'brony_fan_base_by_manasparks-d5g243a.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Caesium Oxide',
        'image': 'caesium_oxide_promo_by_manasparks-d5k585r.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Canterlot',
        'image': 'canterlot_by_manasparks-d5e728j.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Carousel Boutique',
        'image': 'carousel_boutique_by_manasparks-d5e7h0c.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Carrot Top',
        'image': 'carrot_top_by_manasparks-d5e7fg9.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Cautious Cockatrice',
        'image': 'cautious_cockatrice_by_manasparks-d5e6eet.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Cave Dragon',
        'image': 'cave_dragon_by_manasparks-d6d8j1a.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Chicken Boo',
        'image': 'chicken_boo_by_manasparks-d5mtsws.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Chicken Run',
        'image': 'chicken_run_by_manasparks-d5nosyw.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Chrysalis, God of Clones',
        'image': 'chrysalis_god_of_clones_by_manasparks-d7adryb.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Cloudform',
        'image': 'cloudform_by_manasparks-d5iyptp.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Cloudscape Artist',
        'image': 'cloudkicker__the_weathermare_by_manasparks-d5o9xya.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Cloud Nap',
        'image': 'cloud_nap_by_manasparks-d5hzd8a.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Cloudsdale',
        'image': 'cloudsdale_by_manasparks-d5e7efk.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Cloudwalking',
        'image': 'cloudwalking_by_manasparks-d6d8nk7.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'CMC Initiation',
        'image': 'cmc_initiation_by_manasparks-d5mwy3a.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'CMC\'s Embrace',
        'image': 'cmc__s_embrace_by_manasparks-d5m73c1.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Coconut',
        'image': 'coconut_by_manasparks-d5ebzij.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Conjured Wings',
        'image': 'conjured_wings_by_manasparks-d5ebzlu.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Cranky Doodle Donkey',
        'image': 'cranky_doodle_donkey_by_manasparks-d5ec4p5.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Cruel Ultimatum',
        'image': 'cruel_ultimatum_by_manasparks-d5j3vcy.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Crystal Librarian',
        'image': 'crystal_librarian_by_manasparks-d5lgmm7.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Crystal Sheep',
        'image': 'crystal_sheep_by_manasparks-d5lgmco.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Curtain Call',
        'image': 'curtain_call_promo_by_manasparks-d5k56fd.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Cutie Mark Crusade',
        'image': 'cutie_mark_crusade_by_manasparks-d5mbmet.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Dangerous Mission Outfit',
        'image': 'dangerous_mission_outfit_by_manasparks-d5mvf1c.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Deceptive Cadance',
        'image': 'deceptive_cadance___queen_chrysalis_by_manasparks-d76vdel_1.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Chrysalis, Changeling Queen',
        'image': 'deceptive_cadance___queen_chrysalis_by_manasparks-d76vdel_2.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Denial',
        'image': 'denial_by_manasparks-d5e2sd7.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Depression',
        'image': 'depression_by_manasparks-d5e2sol.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Derpy Bolt',
        'image': 'derpy_bolt_by_manasparks-d5e6xac.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Derpy Hooves',
        'image': 'derpy_hooves_by_manasparks-d5e6x5c.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Diamond Coating',
        'image': 'diamond_coating_by_manasparks-d5e2uhb.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Diamond Dogs',
        'image': 'diamond_dogs_by_manasparks-d5ebzbm.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Dinky Hooves',
        'image': 'dinky_hooves_by_manasparks-d5e7fwo.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Disappearing Act',
        'image': 'disappearing_act_done_as_custom_card_by_manasparks-d5pja6x.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Discord, God of Chaos',
        'image': 'discord_god_of_chaos_by_manasparks-d77fr94.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Discord\'s Labyrinth',
        'image': 'discord__s_labyrinth_by_manasparks-d5eaxw6.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Discord Paradox',
        'image': 'discord__s_paradox_by_manasparks-d5qq3rd.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Discord, Spirit of Chaos',
        'image': 'discord__spirit_of_chaos_by_manasparks-d5eaypq.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Discord\'s Realm',
        'image': 'discord__s_realm_by_manasparks-d5eaywv.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Discord\'s Statue',
        'image': 'discord__s_statue_by_manasparks-d5eax36.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Doctor Whooves',
        'image': 'doctor_whooves_by_manasparks-d5e7g6c.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Dream Screams',
        'image': 'dream_screams_by_manasparks-d5et7w6.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Dr\. Fluttershy\'s Care',
        'image': 'dr__fluttershys_care_by_manasparks-d6bg3ht.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Earth Pony',
        'image': 'earth_pony_token_by_manasparks-d5gi3m6.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Element of Generosity',
        'image': 'element_of_generosity_by_manasparks-d5e5bdx.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Element of Honesty',
        'image': 'element_of_honesty_by_manasparks-d5e59ft.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Element of Kindness',
        'image': 'element_of_kindness_by_manasparks-d5e5ats.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Element of Laughter',
        'image': 'element_of_laughter_by_manasparks-d5e5b1b.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Element of Loyalty',
        'image': 'element_of_loyalty_by_manasparks-d5e5cjl.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Element of Magic',
        'image': 'element_of_magic_by_manasparks-d5e5ct2.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Emblem of Discord',
        'image': 'emblem_of_discord_by_manasparks-d5eaz4j.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Emerald Coating',
        'image': 'emerald_coating_by_manasparks-d5e2yti.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Equestria',
        'image': 'equestria_by_manasparks-d5ec5aj.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Everfree Forest',
        'image': 'everfree_forest_by_manasparks-d5e7e8w.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Face Off',
        'image': 'face_off_by_manasparks-d5n5420.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Faithful // Strong',
        'image': 'faithful_and_strong_by_manasparks-d5e8yga_r.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Family Reunion RSVPs',
        'image': 'family_reunion_rsvps_by_manasparks-d5oz3n3.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Featherweight',
        'image': 'featherweight_by_manasparks-d5ebzqy.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Flight Training',
        'image': 'flight_training_by_manasparks-d5ebzxr.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Fluffle Puff',
        'image': 'fluffle_puff_by_manasparks-d76vaf9.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Fluttershy Batfriend',
        'image': 'fluttershy_batfriend_by_manasparks-d6zxisz_1.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Flutterbat',
        'image': 'fluttershy_batfriend_by_manasparks-d6zxisz_2.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Fluttershy',
        'image': 'fluttershy_by_manasparks-d5dubwg.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Fluttershy\'s Dress',
        'image': 'fluttershy_s_dress_by_manasparks-d5e6k1c.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Future Twilight',
        'image': 'future_twilight_by_manasparks-d5e66bn.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Gatling Fun',
        'image': 'gatling_fun_by_manasparks-d5lfm3v.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Gilda',
        'image': 'gilda_by_manasparks-d5e656q.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Granny Smith',
        'image': 'granny_smith_by_manasparks-d5e65tc.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Grip of Despair',
        'image': 'grip_of_despair_by_manasparks-d6bq8qu.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Gummy',
        'image': 'gummy_by_manasparks-d5ebxy3.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Guy-ra, Anthropologist',
        'image': 'guy_ra_anthropologist_by_manasparks-d5q9404.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Harmony',
        'image': 'harmony_by_manasparks-d5e6ckx.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Harmony Elemental',
        'image': 'harmony_elemental_by_manasparks-d5mavk7.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Ignorance // Want',
        'image': 'ignorance_and_want_by_manasparks-d5eba64_r.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Insult // Injury',
        'image': 'insult_to_injury_by_manasparks-d5ebcap_r.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'King Sombra',
        'image': 'king_sombra_by_manasparks-d5kqcx5.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Lies // Slander',
        'image': 'lies_and_slander_by_manasparks-d5eb7o1_r.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Lightning Dust',
        'image': 'lightning_dust_by_manasparks-d5o5y0n.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Lord Lexicon',
        'image': 'lord_lexicon_by_manasparks-d5fehr9.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Lunar Banishment',
        'image': 'lunar_banishment_by_manasparks-d5mbj9h.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Lunar Base',
        'image': 'lunar_base_by_manasparks-d5et8nl.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Lunar Inception',
        'image': 'lunar_inception_by_manasparks-d5np0gm.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Bat',
        'image': 'luna__s_bat_token_by_manasparks-d5g7git.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Emblem Princess Luna',
        'image': 'luna_s_emblem_by_manasparks-d5euasb.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Spider',
        'image': 'luna__s_spider_token_by_manasparks-d5g7g50.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Lyra Heartstrings',
        'image': 'lyra_hearstrings_by_manasparks-d5e7hq1.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Mana Sparks',
        'image': 'mana_sparks_by_manasparks-d5n9a68.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Mandatory Participation',
        'image': 'mandatory_participation_by_manasparks-d5earkj.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Marie Annette',
        'image': 'marie_annette_by_manasparks-d5eb2ub.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Mirror Pool',
        'image': 'mirror_pool_by_manasparks-d5lg8or.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Moonrise',
        'image': 'moonrise_by_manasparks-d5mu20j.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Muffin Bazooka',
        'image': 'muffin_bazooka_by_manasparks-d5e7glj.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Muffin Button',
        'image': 'muffin_button_by_manasparks-d5e6wz6.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Nightmare Moon',
        'image': 'nightmare_moon_and_princess_luna_by_manasparks-d6aiwiq_1.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Princess Luna',
        'image': 'nightmare_moon_and_princess_luna_by_manasparks-d6aiwiq_2.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Nightmare Moon',
        'image': 'nightmare_moon_by_manasparks-d5eheg3.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Caesium Oxide',
        'image': 'nivix_guildmage_ponified_by_wolf_walrus_by_manasparks-d5jm12g.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Opalescence',
        'image': 'opalescence_by_manasparks-d5ec0pn.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Optimism',
        'image': 'optimism_by_manasparks-d5l23uu.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Owlowiscious',
        'image': 'owlowiscious_by_manasparks-d5ec061.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Parasprite Blight',
        'image': 'parasprite_blight_by_manasparks-d69o012.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Pegasister Pair',
        'image': 'pegasister_pair_by_manasparks-d5no0nj.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Pegasus Pony',
        'image': 'pegasus_pony_by_manasparks-d5gi7uf.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Pega Twister',
        'image': 'pega_twister_by_manasparks-d5o9yud.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Persuasive Offer',
        'image': 'persuasive_offer_by_manasparks-d5mv81i.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Petrification',
        'image': 'petrification_by_manasparks-d5e6dyc.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Philomena, Molting',
        'image': 'philomena_molting___philomena_reborn_by_manasparks-d6bg22q_1.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Philomena, Reborn',
        'image': 'philomena_molting___philomena_reborn_by_manasparks-d6bg22q_2.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Phoenix Down',
        'image': 'phoenix_down_by_manasparks-d6bg364.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Photo Finish',
        'image': 'photo_finish_by_manasparks-d5e6hkw.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Photoplasm Plant',
        'image': 'photoplasm_plant_by_manasparks-d5ohkyi.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Photo Spectrum',
        'image': 'photo_spectrum_by_manasparks-d7b0uan.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Pinkamena Diane Pie',
        'image': 'pinkamena_diane_pie_by_manasparks-d5e6h7p.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Pinkie Fry',
        'image': 'pinkie_fry_by_manasparks-d5lf9en.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Pinkie Pie',
        'image': 'pinkie_pie_by_manasparks-d5dub1d.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Pinkie Pie\'s Dress',
        'image': 'pinkie_pie__s_dress_by_manasparks-d5e6iq4.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Pinkie Pie\'s Perfect Plan',
        'image': 'pinkie_pie_s_perfect_plan_by_manasparks-d5prtr0.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Pinkie Polka',
        'image': 'pinkie_polka_by_manasparks-d69obbk.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Pinkie\'s Invitation',
        'image': 'pinkies_invitation_by_manasparks-d6bpxoo.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Poison Joke',
        'image': 'poison_joke_by_manasparks-d5eberv.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Political Party',
        'image': 'political_party_by_manasparks-d5n1wso.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Polly Morph',
        'image': 'polly_morph_by_manasparks-d5e2u0i.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Pomp // Circumstance',
        'image': 'pomp_and_circumstance_by_manasparks-d5e7anw_r.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Power of Love',
        'image': 'power_of_love_by_manasparks-d5rnmda.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Power Seal',
        'image': 'power_seal_by_manasparks-d5lgkjx.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Pride // Prejudice',
        'image': 'pride_and_predjudice_by_manasparks-d5ebdcp_r.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Princess Cadance',
        'image': 'princess_cadance_by_manasparks-d5vbllb.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Princess Celestia',
        'image': 'princess_celestia_by_manasparks-d5eu4bw.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Princess Luna',
        'image': 'princess_luna_by_manasparks-d5ehk4h.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Prince Webster Morphling',
        'image': 'prince_webster_morphling_by_manasparks-d7ay1w1.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Prism Spectacles',
        'image': 'prism_spectacles_card_by_manasparks-d5fkhb2.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Prism Wings',
        'image': 'prism_wings_by_manasparks-d5ohl36.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Quick Coaching',
        'image': 'quick_coaching_by_manasparks-d6a3vwt.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Rainbow Dash',
        'image': 'rainbow_dash_by_manasparks-d5dub5b.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Rainbow Factory',
        'image': 'rainbow_factory_by_manasparks-d5e8x4x.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Raise Barn',
        'image': 'raise_barn_by_manasparks-d5p7en8.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Rarity',
        'image': 'rarity_by_manasparks-d5duaio.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Rarity\'s Dress',
        'image': 'rarity__s_dress_by_manasparks-d5e6mm4.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Rarity\'s Seduction',
        'image': 'rarity__s_seduction_by_manasparks-d5k5aua.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'River\'s Grasp',
        'image': 'river__s_grasp_by_manasparks-d5njr7n.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Curtain Call',
        'image': 'rix_maadi_ponified_by_wolf_walrus_by_manasparks-d5k567p.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Royal Canterlot Voice',
        'image': 'royal_canterlot_voice_by_manasparks-d5mv9bb.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Rubber Chicken',
        'image': 'rubber_chicken_by_manasparks-d69dop3.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Ruby Coating',
        'image': 'ruby_coating_by_manasparks-d5e2z2t.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Running of the Leaves',
        'image': 'running_of_the_leaves_by_manasparks-d6a5nsr.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Sapphire Coating',
        'image': 'sapphire_coating_by_manasparks-d5e2umz.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Scootaloo',
        'image': 'scootaloo_by_manasparks-d5e2mqy.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Scorn // Ridicule',
        'image': 'scorn_and_ridicule_by_manasparks-d5eb8md_r.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Screw Ball',
        'image': 'screw_ball_by_manasparks-d5eb06a.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Seapony Lyra',
        'image': 'seapony_lyra_by_manasparks-d5k6w2q.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Seed of Betrayal',
        'image': 'seed_of_betrayal_by_manasparks-d5m6zc9.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Singing Telegram',
        'image': 'singing_telegram_by_manasparks-d6bpxxk.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Sisterhooves Social',
        'image': 'sisterhood_social_by_manasparks-d5klrwa.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Smile Smile Smile!',
        'image': 'smile_smile_smile_by_manasparks-d5ebey3.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Smiling',
        'image': 'smiling_by_manasparks-d5lg7ot.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Snips and Snails',
        'image': 'snips_and_snails_by_manasparks-d5ec4wd.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Snoring Dragon',
        'image': 'snoring_dragon_by_manasparks-d69drnn.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Sparkler',
        'image': 'sparkler_by_manasparks-d5e7fmn.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Spike, Twilight\'s Assistant',
        'image': 'spike__twilight__s_assistant_by_manasparks-d5e350z.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Spitefilly',
        'image': 'spitefilly_by_manasparks-d5m5q4r.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Stampeding Cows',
        'image': 'stampeding_cows_by_manasparks-d5efyjd.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Stampeding Rabbits',
        'image': 'stampeding_rabbits_by_manasparks-d5efyo3.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Sunshine Clique',
        'image': 'sunshine_clique_by_manasparks-d7agxsk.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Survive // Prosper',
        'image': 'survive_and_prosper_by_manasparks-d5e79xi_r.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Sweet // Sour',
        'image': 'sweet_and_sour_by_manasparks-d5e7bji_r.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Sweet Apple Acres',
        'image': 'sweet_apple_acres_by_manasparks-d5e7e4t.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Sweetie Belle',
        'image': 'sweetie_belle_by_manasparks-d5e2mwr.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Tank',
        'image': 'tank_by_manasparks-d5ec1zx.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Tardis Core',
        'image': 'tardis_core_by_manasparks-d5e7gb3.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'The Great and Powerful Trixie',
        'image': 'the_great_and_powerful_trixie_by_manasparks-d5e7be1.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'This Day // Aria',
        'image': 'this_day_aria_by_manasparks-d5ebfqs_r.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Timberwolf Pack',
        'image': 'timberwolf_pack_by_manasparks-d5pql8a.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'The Great and Powerful Trixie?',
        'image': 'trixie_edit_by_manasparks-d5e7cs9.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'True // False',
        'image': 'true_or_false_by_manasparks-d5e7b70_r.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Turn to Swag',
        'image': 'turn_to_swag_by_manasparks-d5gfe54.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Twilight Sparkle\'s Dress',
        'image': 'twilight__s_dress_by_manasparks-d5e6lw7.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Twilight Sparkle',
        'image': 'twilight_sparkle_by_manasparks-d599bdv.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Twilight Time',
        'image': 'twilight_time_by_manasparks-d77z0kx.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Twist',
        'image': 'twist_by_manasparks-d5e64wn.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Tyrant\'s Dome',
        'image': 'tyrant__s_dome_by_manasparks-d5mvcja.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Ultra Mega Timberwolf',
        'image': 'ultra_mega_timberwolf_by_manasparks-d5prjgu.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Unicorn Pony',
        'image': 'unicorn_token_by_manasparks-d5gi3tm.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Vainling',
        'image': 'vainling_by_manasparks-d5q0kl8.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Vinyl Scratch',
        'image': 'vinyl_scratch_by_manasparks-d5eblox.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Wax Wayne',
        'image': 'wax_wayne_by_manasparks-d5emo0m.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Weak // Helpless',
        'image': 'weak_and_helpless_by_manasparks-d5ebdxz_r.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Webster Book',
        'image': 'webster_book_by_manasparks-d5e2tn5.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Welcome Wagon',
        'image': 'welcome_wagon_by_manasparks-d5ec4mg.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Will O\' Wisp',
        'image': 'will_o__wisp_by_manasparks-d5emj4j.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Windigoes',
        'image': 'windigoes_by_manasparks-d5ec4ck.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Winona',
        'image': 'winona_by_manasparks-d5ebxvi.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Winter Wrap-Up',
        'image': 'winter_wrap_up_by_manasparks-d5klrm0.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Wonderbolt Synchronization',
        'image': 'wonderbolt_synchronization_by_manasparks-d5o9wkq.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Wonderbolt Trumpeter',
        'image': 'wonderbolt_trumpeter_by_manasparks-d5o9vf3.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Zameck Guildmage',
        'image': 'zameck_guildmage_ponified_by_manasparks-d5qq23m.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Zap Apple Overgrowth',
        'image': 'zap_apple_overgrowth_by_manasparks-d6lbp0o.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Zecora, the Balanced',
        'image': 'zecora__the_balanced_by_manasparks-d5e8zcp.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Zombie Pony',
        'image': 'zombie_pony_by_manasparks-d5e6yc6.jpg',
        'set': 'My Little Multiverse: Knowledge is Magic',
        'creator': 'ManaSparks'
    },
    {
        'name': 'Rakdos Guildpony',
        'cost': 'BR',
        'supertype': 'Creature',
        'subtype': 'Pony Warrior',
        'text': 'Unleash\n\nWhenever Rakdos Guildpony or another Pony, Pegasus, or Unicorn you control dies, Rakdos Guildpony deals 1 damage to each opponent.',
        'flavorText': '"A guild is like a herd. We\'ll mow you down before you can even blink."',
        'pt': '1/1',
        'set': 'The Implicit Neighs',
        'creator': 'FanOfMostEverything'
    },
    {
        'name': 'Pinkie, Pony of Pandemonium',
        'cost': '1BR',
        'supertype': 'Legendary Creature',
        'subtype': 'Pony Shaman',
        'text': 'Unleash\n\n(br)(br)(br), T: Other creatures you control get +X/+X until end of turn and attack this turn if able, where X is Pinkie, Pony of Pandemonium\'s power. Activate this ability only during your turn, before attackers are declared.',
        'flavorText': 'She wants you to have the time of your death.',
        'pt': '2/1',
        'set': 'The Implicit Neighs',
        'creator': 'FanOfMostEverything'
    },
    {
        'name': 'Boros Guildpony',
        'cost': 'RW',
        'supertype': 'Creature',
        'subtype': 'Pegasus Soldier',
        'text': 'Flying\n\nWhenever another Pony, Pegasus, or Unicorn you control attacks, Boros Guildpony gets +1/+0 until end of turn.',
        'flavorText': '"A guild is like a herd. You fight better when a dozen friends have your back."',
        'pt': '1/1',
        'set': 'The Implicit Neighs',
        'creator': 'FanOfMostEverything'
    },
    {
        'name': 'Rainbow Dash, the Spearhead',
        'cost': '3RW',
        'supertype': 'Legendary Creature',
        'subtype': 'Pegasus Soldier',
        'text': 'Flying, haste\n\nBattalion — Whenever Rainbow Dash, the Spearhead and at least two other creatures attack, attacking creatures gain hexproof and intimidate until end of turn.',
        'flavorText': 'Her battle cry routs the unrighteous and their magics alike.',
        'pt': '3/2',
        'set': 'The Implicit Neighs',
        'creator': 'FanOfMostEverything'
    },
    {
        'name': 'Azorius Guildpony',
        'cost': 'WU',
        'supertype': 'Creature',
        'subtype': 'Unicorn Wizard',
        'text': 'Whenever one or more Ponies, Pegasi, and/or Unicorns you control become the target or targets of a spell or ability an opponent controls, counter that spell or ability unless its controller pays 1.',
        'flavorText': '"A guild is like a herd. We protect one another from the chaos that lurks beyond us."',
        'pt': '1/2',
        'set': 'The Implicit Neighs',
        'creator': 'FanOfMostEverything'
    },
    {
        'name': 'Shining Armor, Lyev Elite',
        'cost': '4WU',
        'supertype': 'Legendary Creature',
        'subtype': 'Unicorn Soldier',
        'text': 'Hexproof, vigilance\n\nWhenever a permanent an opponent controls deals damage to you, detain that permanent at the beginning of your next upkeep.',
        'flavorText': '"The law does not act immediately. Time must be taken to ensure justice is served. If the guilty think that delay means that they have escaped unpunished, they are sorely mistaken."',
        'pt': '2/5',
        'set': 'The Implicit Neighs',
        'creator': 'FanOfMostEverything'
    },
    {
        'name': 'Izzet Guildpony',
        'cost': 'UR',
        'supertype': 'Creature',
        'subtype': 'Unicorn Wizard',
        'text': 'Whenever you cast an instant or sorcery spell, untap target Pony, Pegasus, or Unicorn you control.',
        'flavorText': '"A guild is like a herd. Plenty of peer review available the moment you ask."',
        'pt': '2/1',
        'set': 'The Implicit Neighs',
        'creator': 'FanOfMostEverything'
    },
    {
        'name': 'Twilight Sparkle, Izzet Prodigy',
        'cost': '3UR',
        'supertype': 'Legendary Creature',
        'subtype': 'Unicorn Wizard',
        'text': 'Overload costs you pay cost 1 less for each Wizard you control.\n\nX: Copy target instant or sorcery spell you control with converted mana cost X. You may choose new targets for the copy.',
        'flavorText': '"Don\'t be impressed. I am but a flickering candle compared to the brilliance of the Firemind."',
        'pt': '1/3',
        'set': 'The Implicit Neighs',
        'creator': 'FanOfMostEverything'
    },
    {
        'name': 'Gruul Guildpony',
        'cost': 'RG',
        'supertype': 'Creature',
        'subtype': 'Pony Warrior',
        'text': 'Whenever a Pony, Pegasus, or Unicorn you control deals combat damage to an opponent, untap target land you control.',
        'flavorText': '"A guild is like a herd. Together we thrive where alone we would die."',
        'pt': '2/2',
        'set': 'The Implicit Neighs',
        'creator': 'FanOfMostEverything'
    },
    {
        'name': 'Screw Loose, Wolf with Hooves',
        'cost': '1RG',
        'supertype': 'Legendary Creature',
        'subtype': 'Pony',
        'text': 'Whenever Screw Loose, Wolf with Hooves attacks, destroy target artifact defending player controls.\n\nX, Discard a red or green creature card with converted mana cost X or less: Until end of turn, Screw Loose gets +Y/+Z and gains the discarded card\'s abilities, where Y is that card\'s power and Z is its toughness. Activate this ability only if Screw Loose is attacking.',
        'pt': '2/2',
        'set': 'The Implicit Neighs',
        'creator': 'FanOfMostEverything'
    },
    {
        'name': 'Simic Guildpony',
        'cost': 'GU',
        'supertype': 'Creature',
        'subtype': 'Unicorn Pegasus Wizard',
        'text': 'Flying\n\nIf one or more +1/+1 counters would be placed on a Pony, Pegasus, or Unicorn creature you control, that many plus one +1/+1 counters are put on it instead.',
        'flavorText': '"A guild is like a herd. Countless strengths brought together by singular purpose."',
        'pt': '0/1',
        'set': 'The Implicit Neighs',
        'creator': 'FanOfMostEverything'
    },
    {
        'name': 'Lyra, Genetic Engineer',
        'cost': '2GU',
        'supertype': 'Legendary Creature',
        'subtype': 'Unicorn Human',
        'text': 'Creatures you control have evolve. (Whenever a creature enters the battlefield under your control, put a +1/+1 counter on each creature you control with less power or toughness than that creature. If a creature has multiple instances of evolve, each triggers seperately.)',
        'flavorText': '"The rest of the Combine calls me a radical, but no one born with thumbs could ever understand my motives."',
        'pt': '1/1',
        'set': 'The Implicit Neighs',
        'creator': 'FanOfMostEverything'
    },
    {
        'name': 'Dimir Guildpony',
        'cost': 'UB',
        'supertype': 'Creature',
        'subtype': 'Pony Rogue',
        'text': 'Whenever another Pony, Pegasus, or Unicorn enters the battlefield under your control, look at the top card of your library. You may put that card on the bottom of your library or into your graveyard.',
        'flavorText': '"A guild is like a herd. Don\'t assume you can see every member."',
        'pt': '1/2',
        'set': 'The Implicit Neighs',
        'creator': 'FanOfMostEverything'
    },
    {
        'name': 'Chrysalis, Information Gatherer',
        'cost': '4UB',
        'supertype': 'Legendary Creature',
        'subtype': 'Shapeshifter Rogue',
        'text': 'Flying, hexproof\n\nWhenever Chrysalis, Information Gatherer deals combat damage to a player, that player reveals his or her hand. You may exile an instant or sorcery card from that hand encoded onto Chrysalis. If that card doesn\'t have cipher, it gains cipher. (Whenever Chrysalis deals combat damage to a player, its controller may cast a copy of that card without paying its mana cost.)',
        'pt': '2/4',
        'set': 'The Implicit Neighs',
        'creator': 'FanOfMostEverything'
    },
    {
        'name': 'Golgari Guildpony',
        'cost': 'BG',
        'supertype': 'Creature',
        'subtype': 'Pony Shaman',
        'text': 'Whenever a Pony, Pegasus, or Unicorn card is put into your graveyard from anywhere, you gain 1 life.',
        'flavorText': '"A guild is like a herd. We do not forget our fallen."',
        'pt': '2/2',
        'set': 'The Implicit Neighs',
        'creator': 'FanOfMostEverything'
    },
    {
        'name': 'Applejack, Golgari Granger',
        'cost': '3BG',
        'supertype': 'Legendary Creature',
        'subtype': 'Pony Druid',
        'text': 'Creature cards in your graveyard get +1/+0.\n\nT, Exile a creature card from your graveyard: Add X mana in any combination of B and/or G to your mana pool, where X is the exiled card\'s power.',
        'flavorText': 'Sunken Apple Acres is always hiring.',
        'pt': '3/3',
        'set': 'The Implicit Neighs',
        'creator': 'FanOfMostEverything'
    },
    {
        'name': 'Selesnya Guildpony',
        'cost': 'GW',
        'supertype': 'Creature',
        'subtype': 'Pony Shaman',
        'text': 'Whenever another nontoken Pony, Pegasus, or Unicorn enters the battlefield under your control, put a 0/1 green Plant creature token onto the battlefield.',
        'flavorText': '"A guild is like a herd. United, we not only strive to make the world a better place, we truly can."',
        'pt': '2/2',
        'set': 'The Implicit Neighs',
        'creator': 'FanOfMostEverything'
    },
    {
        'name': 'Fluttershy, Saint of the Meek',
        'cost': '3GW',
        'supertype': 'Legendary Creature',
        'subtype': 'Pegasus Cleric',
        'text': 'Defender, flying, protection from creatures\n\nOther creatures you control with power 2 or less have hexproof.',
        'flavorText': '"All creatures great and small comprise the Worldsoul. What some forget is that there\'s much more small than great."',
        'pt': '0/5',
        'set': 'The Implicit Neighs',
        'creator': 'FanOfMostEverything'
    },
    {
        'name': 'Orzhov Guildpony',
        'cost': 'WB',
        'supertype': 'Creature',
        'subtype': 'Unicorn Cleric',
        'text': 'Whenever a source an opponent controls deals damage to one or more Ponies, Pegasi, and/or Unicorns you control, that player loses 1 life.',
        'flavorText': '"A guild is like a herd. The lines of enemy and ally are clearly drawn for all to see."',
        'pt': '1/2',
        'set': 'The Implicit Neighs',
        'creator': 'FanOfMostEverything'
    },
    {
        'name': 'Rarity, Syndicate Diva',
        'cost': '2WB',
        'supertype': 'Legendary Creature',
        'subtype': 'Unicorn Advisor',
        'text': 'Extort\n\nRarity, Syndicate Diva has protection from converted mana cost X or less, where X is your life total minus your starting life total.',
        'flavorText': '"I appreciate the finer things in life: jewels, rare fabrics, souls..."',
        'pt': '2/3',
        'set': 'The Implicit Neighs',
        'creator': 'FanOfMostEverything'
    },
    {
        'name': 'Celestia, World Lantern',
        'cost': 'RGWU',
        'supertype': 'Legendary Creature',
        'subtype': 'Avatar',
        'text': 'Alicorn (This card is a Pony Pegasus Unicorn.)\n\nFlying\n\nWhenever Celestia, World Lantern attacks, tap all lands defending player controls and untap all lands you control.',
        'flavorText': 'When she awoke, she outshone the sun to remind it of its old mistress.',
        'pt': '2/2',
        'set': 'The Implicit Neighs',
        'creator': 'FanOfMostEverything'
    },
    {
        'name': 'Luna, Dream Walker',
        'cost': 'UBRG',
        'supertype': 'Legendary Creature',
        'subtype': 'Avatar',
        'text': 'Alicorn (This card is a Pony Pegasus Unicorn.)\n\nFlying\n\nWhenever another player draws a card, you may draw a card unless that player puts a card from his or her hand on the bottom of his or her library.',
        'flavorText': 'When she awoke, her dreams sought out new minds to host them.',
        'pt': '2/2',
        'set': 'The Implicit Neighs',
        'creator': 'FanOfMostEverything'
    },
    {
        'name': 'Discord',
        'cost': '3BRG',
        'supertype': 'Planeswalker',
        'subtype': 'Discord',
        'text': '+2: Discard up to two cards at random, then draw that many cards.\n\n-2: Target player chooses a nonland, non-Discord permanent he or she controls at random and sacrifices it.\n\n-7: You get an emblem with "Whenever a spell or ability you don\'t control is put on the stack, reselect its targets at random."',
        'loyalty': '4',
        'set': 'The Implicit Neighs',
        'creator': 'FanOfMostEverything'
    },
    {
        'name': 'Spike, Budding Dracogenius',
        'cost': 'UR',
        'supertype': 'Legendary Creature',
        'subtype': 'Dragon Wizard',
        'text': 'Whenever you draw a card, you may put a +1/+1 counter on Spike, Budding Dracogenius.\n\nXUR, T: Spike deals X damage divided as you choose among any number of target creatures, where X is Spike\'s power.',
        'flavorText': '"In time, he will be the only being on Ravnica worthy of succeeding me. In time."\n\n—Niv-Mizzet',
        'pt': '1/1',
        'set': 'The Implicit Neighs',
        'creator': 'FanOfMostEverything'
    },
    {
        'name': 'Fluttershy, Pegasus Exuberant',
        'set': 'Shards of Friendship',
        'creator': 'FanOfMostEverything',
        'cost': 'RGW',
        'supertype': 'Legendary Creature',
        'subtype': 'Pegasus Shaman',
        'text': 'Flying, protection from creatures\n\nWhenever Fluttershy, Pegasus Exuberant attacks, target attacking creature with power 5 or greater gains flying until end\n\nof turn.\n\n',
        'flavorText': 'She shares the joy of flight with those least likely to experience it.',
        'pt': '1/3',
    },
    {
        'name': 'Applejack, Hero of Valeron',
        'set': 'Shards of Friendship',
        'creator': 'FanOfMostEverything',
        'cost': '1GW',
        'supertype': 'Legendary Creature',
        'subtype': 'Pony Druid',
        'text': '1: You may put a land card in your hand onto the battlefield. Activate this ability only if an opponent controls more\n\nlands than you and only any time you could cast a sorcery.',
        'flavorText': '"I will do more than defend this land. I will keep it worth defending."',
        'pt': '2/3',
    },
    {
        'name': 'Twilight, Seeker of Carmot',
        'set': 'Shards of Friendship',
        'creator': 'FanOfMostEverything',
        'cost': '2UR',
        'supertype': 'Legendary Artifact Creature',
        'subtype': 'Unicorn Wizard',
        'text': 'T: Draw a card, then discard a card.\n\nWhenever you cast an artifact spell, untap Twilight.\n\nWhenever you cast a multicolored spell, untap Twilight.',
        'flavorText': '"Crucius left us with an incredible riddle. I am close to solving it. I have to be."',
        'pt': '2/2',
    },
    {
        'name': 'Rarity, Ethercaste Accessorizer',
        'set': 'Shards of Friendship',
        'creator': 'FanOfMostEverything',
        'cost': '3WU',
        'supertype': 'Legendary Artifact Creature',
        'subtype': 'Unicorn',
        'text': 'Exalted\n\nOther artifacts you control have exalted.',
        'flavorText': '"A sigil goes with anything. Especially another sigil."',
        'pt': '0/3',
    },
    {
        'name': 'Rainbow Dash, Terror of Jund',
        'set': 'Shards of Friendship',
        'creator': 'FanOfMostEverything',
        'cost': '4RW',
        'supertype': 'Legendary Creature',
        'subtype': 'Pegasus Warrior',
        'text': 'Flying, double strike, protection from Dragons\n\nYou have protection from Dragons.',
        'flavorText': '"Apex predator? Yeah, sure, keep telling yourself that."',
        'pt': '2/3',
    },
    {
        'name': 'Pinkie Pie, Shardhopper',
        'set': 'Shards of Friendship',
        'creator': 'FanOfMostEverything',
        'cost': '6',
        'supertype': '(WUBRG) Planeswalker',
        'subtype': 'Pinkie',
        'text': 'Sunburst (This enters the battlefield with a loyalty counter on her for each color of mana spent to cast her.)\n\n+1: Up to one target creature gets +1/+1 for each of its colors until end of turn.\n\n-2: Put target nonland permanent that\'s one or fewer colors on top of its owner\'s library.\n\n-8: For each color, search your library for a card of that color. Reveal those cards and put them into your hand. Then\n\nshuffle your library.',
    },
    {
        'name': 'Celebratory Ultimatum',
        'set': 'Shards of Friendship',
        'creator': 'FanOfMostEverything',
        'cost': '2WUBRG',
        'supertype': 'Sorcery',
        'text': 'Reveal your hand and the top five cards of your library. For each color, you may put a permanent card of that color\n\nrevealed this way onto the battlefield. Each permanent put onto the battlefield this way gains haste and "At the\n\nbeginning of the end step, this permanent\'s owner shuffles it into his or her library." Put the other cards revealed\n\nfrom your library on the bottom of your library in any order.',
        'flavorText': '"Every party needs guests."\n—Pinkie Pie',
    },
    {
        'name': 'Quickshift',
        'set': 'Oops, I Accidentally Changelings',
        'creator': 'FanOfMostEverything',
        'cost': '1U',
        'supertype': 'Instant',
        'text': 'Exile target creature you control, then return that card to the battlefield under your control. If a creature with a different name than the exiled card enters the battlefield this way, draw a card.',
        'flavorText': '"Every face outlives its usefulness in time. Always have another one prepared."\n—Smug Superiority, identity juggler',
    },
    {
        'name': 'Changeling Emulator',
        'set': 'Oops, I Accidentally Changelings',
        'creator': 'FanOfMostEverything',
        'cost': '1UU',
        'supertype': 'Creature',
        'subtype': 'Shapeshifter',
        'text': 'Kicker 2\n\nYou may have Changeling Emulator enter the battlefield as a copy of any creature on the battlefield an opponent controls, except it gains "When this creature enters the battlefield, if it was kicked, exchange control of it and target creature with the same name."',
        'pt': '0/0',
    },
    {
        'name': 'Identity Juggler',
        'set': 'Oops, I Accidentally Changelings',
        'creator': 'FanOfMostEverything',
        'cost': '1UU',
        'supertype': 'Creature',
        'subtype': 'Shapeshifter',
        'text': '1UU: Identity Juggler becomes a copy of target creature and gains this ability.',
        'flavorText': '"The world is my closet, and every creature therein is an outfit."',
        'pt': '0/1',
    },
    {
        'name': 'Mirrorcast',
        'set': 'Oops, I Accidentally Changelings',
        'creator': 'FanOfMostEverything',
        'cost': '1UU',
        'supertype': 'Instant',
        'text': 'Kicker 3\n\nCopy target instant or sorcery spell. If Mirrorcast was kicked, counter that spell. You may choose new targets for the copy.',
        'flavorText': '"Every thinking creature finds imitation easier than creation. It\'s just exaggerated in our case."\n—Queen Chrysalis',
    },
    {
        'name': 'Borrowed Passion',
        'set': 'Oops, I Accidentally Changelings',
        'creator': 'FanOfMostEverything',
        'cost': '2U',
        'supertype': 'Enchantment',
        'text': 'Whenever an opponent casts a red spell, you may draw a card.\n\nA blood-boiling rage is as inspiring to changelings as a masterfully crafted work of art.',
    },
    {
        'name': 'Chitin Cloaker',
        'set': 'Oops, I Accidentally Changelings',
        'creator': 'FanOfMostEverything',
        'cost': '2U',
        'supertype': 'Creature',
        'subtype': 'Shapeshifter Rogue',
        'text': 'B: Chitin Cloaker gains intimidate until end of turn.\n\nAny changeling can look like something else. Few can look like nothing at all.',
        'pt': '2/2',
    },
    {
        'name': 'Changeling Egg',
        'set': 'Oops, I Accidentally Changelings',
        'creator': 'FanOfMostEverything',
        'cost': '2U',
        'supertype': 'Creature',
        'subtype': 'Shapeshifter',
        'text': 'Defender\n\nWhen Changeling Egg dies, put a token that\'s a copy of target creature onto the battlefield.',
        'flavorText': '"They are our future, and like any future, their form is unknowable until their time comes."\n—Queen Chrysalis',
        'pt': '0/3',
    },
    {
        'name': 'Chrysalis\'s Courtiers',
        'set': 'Oops, I Accidentally Changelings',
        'creator': 'FanOfMostEverything',
        'cost': '2UU',
        'supertype': 'Creature',
        'subtype': 'Shapeshifter Advisor',
        'text': 'Whenever another creature enters the battlefield under your control, draw a card if that creature has the same name as another nontoken creature.\n\nShapeshifting is both art form and competition in Chrysalis\'s court, with status and praise accorded to the most accurate imitators.',
        'pt': '2/4',
    },
    {
        'name': 'Adaptive Changeling',
        'set': 'Oops, I Accidentally Changelings',
        'creator': 'FanOfMostEverything',
        'cost': '3U',
        'supertype': 'Creature',
        'subtype': 'Shapeshifter',
        'text': '1: Adaptive Changeling gets +1/-1 until end of turn.\n\n1: Adaptive Changeling gets -1/+1 until end of turn.\n\nChangelings are always ready to redefine themselves as the situation merits.',
        'pt': '2/3',
    },
    {
        'name': 'Nectarpod',
        'set': 'Oops, I Accidentally Changelings',
        'creator': 'FanOfMostEverything',
        'cost': '3U',
        'supertype': 'Enchantment',
        'subtype': 'Aura',
        'text': 'Enchant creature\n\nEnchanted creature doesn\'t untap during its controller\'s untap step.\n\n2B: Enchanted creature\'s controller loses 1 life.',
        'flavorText': '"It was not in any way, shape, or form enjoyable."\n—Princess Celestia',
    },
    {
        'name': 'Changeling Futurist',
        'set': 'Oops, I Accidentally Changelings',
        'creator': 'FanOfMostEverything',
        'cost': '3UU',
        'supertype': 'Creature',
        'subtype': 'Shapeshifter',
        'text': 'As Changeling Futurist enters the battlefield, you may reveal a creature card from your hand. If you do, Changeling Futurist enters the battlefield as a copy of that card.\n\nShe takes the shape of things to come.',
        'pt': '0/0',
    },
    {
        'name': 'Innocuous Infiltrator',
        'set': 'Oops, I Accidentally Changelings',
        'creator': 'FanOfMostEverything',
        'cost': '3UU',
        'supertype': 'Creature',
        'subtype': 'Shapeshifter',
        'text': 'You may have Innocuous Infiltrator enter the battlefield as a copy of any creature on the battlefield, except it gains "As long as this creature has the same name as another creature, this creature has hexproof."',
        'flavorText': '"The animators aren\'t as lazy as you think they are."\n—Pinkie Pie, Bearer of Laughter',
        'pt': '0/0',
    },
    {
        'name': 'Voice of the Swarm',
        'set': 'Oops, I Accidentally Changelings',
        'creator': 'FanOfMostEverything',
        'cost': '3UU',
        'supertype': 'Sorcery',
        'text': 'Draw a card for each creature you control, then discard a card for each distinct name among those creatures. (Any number of creatures with the same name have one distinct name among them.)\n\nBefore thought, before individuality, there was the Swarm.',
    },
    {
        'name': 'Memory Molder',
        'set': 'Oops, I Accidentally Changelings',
        'creator': 'FanOfMostEverything',
        'cost': '4U',
        'supertype': 'Creature',
        'subtype': 'Shapeshifter Wizard',
        'text': 'Flying\n\nWhenever Memory Molder deals combat damage to a player, fateseal X, where X is the damage dealt this way. (To fateseal X, look at the top X cards of an opponent\'s library, then put any number of them on the bottom of that player\'s library and the rest on top in any order.)',
        'pt': '2/2',
    },
    {
        'name': 'Taste of Suffering',
        'set': 'Oops, I Accidentally Changelings',
        'creator': 'FanOfMostEverything',
        'cost': 'BB',
        'supertype': 'Enchantment',
        'text': 'Whenever an opponent loses life, you gain 1 life.',
        'flavorText': '"Pain and fear aren\'t nearly as filling as love, but they do in a pinch."\n—Smug Superiority, identity juggler',
    },
    {
        'name': 'Amophage Mentor',
        'set': 'Oops, I Accidentally Changelings',
        'creator': 'FanOfMostEverything',
        'cost': '1B',
        'supertype': 'Creature',
        'subtype': 'Shapeshifter Wizard',
        'text': '1B: Target creature you control gains lifelink until end of turn.',
        'flavorText': '"You were not hatched knowing how to feed. You could eke out an existence, sipping at affection given to you like a beggar\'s alms. I will teach you your birthright as a drone of the Swarm."',
        'pt': '2/1',
    },
    {
        'name': 'Siege Diver',
        'set': 'Oops, I Accidentally Changelings',
        'creator': 'FanOfMostEverything',
        'cost': '1BB',
        'supertype': 'Creature',
        'subtype': 'Shapeshifter Soldier',
        'text': 'Flying, haste\n\n1U: Return Siege Diver to its owner\'s hand.\n\nMost changelings turn into other ponies. Military changelings turn into versions of themselves capable of surviving multiple mile-high dives into cobblestones.',
        'pt': '2/1',
    },
    {
        'name': 'Changeling Insinuator',
        'set': 'Oops, I Accidentally Changelings',
        'creator': 'FanOfMostEverything',
        'cost': '2B',
        'supertype': 'Creature',
        'subtype': 'Shapeshifter Rogue',
        'text': '(2u)(2u)(2u): Exchange control of Changeling Insinuator and target creature.',
        'flavorText': '"What do you mean you don\'t recognize me? I\'ve been working here for years."',
        'pt': '2/2',
    },
    {
        'name': 'Love Siphon',
        'set': 'Oops, I Accidentally Changelings',
        'creator': 'FanOfMostEverything',
        'cost': '2B',
        'supertype': 'Enchantment',
        'subtype': 'Aura',
        'text': 'Enchant creature\n\nEnchanted creature gets -1/-1.\n\nAt the beginning of the upkeep of enchanted creature\'s controller, you gain 1 life and that player loses 1 life.',
    },
    {
        'name': 'Changeling Hatchery',
        'set': 'Oops, I Accidentally Changelings',
        'creator': 'FanOfMostEverything',
        'cost': '2BB',
        'supertype': 'Enchantment',
        'text': '2BB: Put X 1/1 black Shapeshifter creature tokens onto the battlefield, where X is the life target opponent has lost this turn.\n\nLike any parasite, changelings feed best on a weakened host.',
    },
    {
        'name': 'Malice Gorger',
        'set': 'Oops, I Accidentally Changelings',
        'creator': 'FanOfMostEverything',
        'cost': '2BB',
        'supertype': 'Creature',
        'subtype': 'Shapeshifter',
        'text': 'Intimidate\n\nB: Malice Gorger gets +1/+1 until end of turn.\n\nChangelings can feed any emotion, but darker feelings lead to addiction, irrationality, and eventual degeneration to a mindless beast.',
        'pt': '1/1',
    },
    {
        'name': 'Eater of Last Thoughts',
        'set': 'Oops, I Accidentally Changelings',
        'creator': 'FanOfMostEverything',
        'cost': '3B',
        'supertype': 'Creature',
        'subtype': 'Shapeshifter',
        'text': 'Flying\n\nWhenever a white creature dies, put a +1/+1 counter on Eater of Last Thoughts.',
        'flavorText': '"Ponies always think of others in their final moments. All the love and hope they felt and would feel comes out of them in one delicious burst."',
        'pt': '2/2',
    },
    {
        'name': 'Changeling Desecrator',
        'set': 'Oops, I Accidentally Changelings',
        'creator': 'FanOfMostEverything',
        'cost': '3BB',
        'supertype': 'Creature',
        'subtype': 'Shapeshifter',
        'text': '1B: Exile target creature card from an opponent\'s graveyard. Changeling Desecrator gains that card\'s abilities until end of turn.\n\nDegenerate changelings find themselves willing to do anything if it will heighten the shock and disgust their victims feel.',
        'pt': '3/3',
    },
    {
        'name': 'Changeling Psychovore',
        'set': 'Oops, I Accidentally Changelings',
        'creator': 'FanOfMostEverything',
        'cost': 'UB',
        'supertype': 'Creature',
        'subtype': 'Shapeshifter Wizard',
        'text': 'Flying\n\nWhenever Changeling Psychovore deals combat damage to a player, you may draw a card. If you do, you lose 1 life.\n\nAdvancing from draining emotions to draining thoughts is a long, dangerous process, but well worth the effort.',
        'pt': '2/1',
    },
    {
        'name': 'Changeling Thrall',
        'set': 'Oops, I Accidentally Changelings',
        'creator': 'FanOfMostEverything',
        'cost': '1UB',
        'supertype': 'Enchantment',
        'subtype': 'Aura',
        'text': 'Enchant creature\n\nYou control enchanted creature.\n\nEnchanted creature\'s power is 0.',
        'flavorText': '"Thralls are a big responsibility, my children. You have to feed them, speak for them, wipe off the drool…"\n—Queen Chrysalis',
    },
    {
        'name': 'Hive Tactician',
        'set': 'Oops, I Accidentally Changelings',
        'creator': 'FanOfMostEverything',
        'cost': '2UB',
        'supertype': 'Creature',
        'subtype': 'Shapeshifter Soldier',
        'text': '1U: Target creature you control becomes the color of your choice until end of turn.\n\n1B: Target creature you control gains intimidate until end of turn.\n\nMuch of changeling military strategy boils down to what form to take when.',
        'pt': '3/3',
    },
    {
        'name': 'Changeling Historian',
        'set': 'Oops, I Accidentally Changelings',
        'creator': 'FanOfMostEverything',
        'cost': '3(ub)(ub)',
        'supertype': 'Creature',
        'subtype': 'Shapeshifter',
        'text': 'You may have Changeling Historian enter the battlefield as a copy of any creature card in a graveyard.',
        'flavorText': '"We study history for the same reasons as anypony: we wish to better understand those who came before us."',
        'pt': '0/0',
    },
    {
        'name': 'Identity Theft',
        'set': 'Oops, I Accidentally Changelings',
        'creator': 'FanOfMostEverything',
        'cost': '3UBB',
        'supertype': 'Sorcery',
        'text': 'Destroy target creature. Put a token that\'s a copy of that creature onto the battlefield.',
        'flavorText': '"The \'long-lost twin\' story can work only so many times."\n—Smug Superiority, identity juggler',
    },
    {
        'name': 'Myxine, Parasitic Siren',
        'set': 'Oops, I Accidentally Changelings',
        'creator': 'FanOfMostEverything',
        'cost': '4UU',
        'supertype': 'Legendary Creature',
        'subtype': 'Shapeshifter',
        'text': 'Flying, islandwalk\n\nWhenever a creature deals combat damage to you, tap that creature. As long as that creature remains tapped, it doesn\'t untap during its controller\'s untap step and has "At the beginning of your upkeep, you may pay 3. If you do, untap this creature."',
        'flavorText': '"Won\'t you stay for a while?"',
        'pt': '3/4',
    },
    {
        'name': 'Ambrosia, Playful Sadist',
        'set': 'Oops, I Accidentally Changelings',
        'creator': 'FanOfMostEverything',
        'cost': '4BB',
        'supertype': 'Legendary Creature',
        'subtype': 'Shapeshifter',
        'text': 'Flying, lifelink\n\nBB: Ambrosia, Playful Sadist deals 1 damage to each creature that was dealt damage this turn.',
        'flavorText': '"Oh, you look like you\'re going to be fun!"',
        'pt': '3/4',
    },
    {
        'name': 'Calliphora, Nekropolis Queen',
        'set': 'Oops, I Accidentally Changelings',
        'creator': 'FanOfMostEverything',
        'cost': '4BB',
        'supertype': 'Legendary Creature',
        'subtype': 'Shapeshifter',
        'text': 'Flying, deathtouch\n\nWhenever a non-Shapeshifter creature dies, put a 1/1 black Shapeshifter creature token onto the battlefield.',
        'flavorText': '"I have returned for you, my love. Will you not follow me home?"',
        'pt': '3/4',
    },
    {
        'name': 'Miasma, Apex Scavenger',
        'set': 'Oops, I Accidentally Changelings',
        'creator': 'FanOfMostEverything',
        'cost': '4BB',
        'supertype': 'Legendary Creature',
        'subtype': 'Shapeshifter',
        'text': 'Flying\n\nWhenever a creature you control regenerates, put a +1/+1 counter on that creature.\n\n2B, Exile a creature card from your graveyard: Regenerate each creature you control.',
        'flavorText': '"I am a queen and will be accorded the respect I am due. ...You gonna eat that?"',
        'pt': '3/3',
    },
];