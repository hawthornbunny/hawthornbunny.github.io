$(document).ready(
    function() {
        // ----------------------------------------------------------------
        // Global variables
        // ----------------------------------------------------------------

        var MUFFIN_ELEMENT = $('#muffin');
        var COUNTER_ELEMENT = $('#counter');
        var COUNTER_TEXT_ELEMENT = $('#counterText');

        var CURRENT_MUFFINS = 0;
        var BANKED_MUFFINS = 0;
        var BOUGHT_SHOP_ITEMS = [];
        var UPDATE_INTERVAL_DURATION = 100;
        var UPDATE_INTERVAL = undefined; // will be defined during initialization

        var SHOP_ELEMENT = $('#shop');
        var SHOP_ITEM_DEFINITIONS = undefined; // will be defined during initialization, after object definitions have been declared
        var SHOP_ITEM_ELEMENTS = undefined; // will be defined during initialization, after SHOP_ITEM_DEFINITIONS have been declared

        // ----------------------------------------------------------------
        // Objects
        // ----------------------------------------------------------------

        function ShopItemDefinition(id, name, cost, mps) {
            this.id = id;
            this.name = name;
            this.cost = cost;
            this.mps = mps; // muffins produced per second
        }

        /**
         * A shop item is something that can be bought (to produce more muffins).
         * mps is muffins per second.
         * Every update, the ShopItem's mps will be put into a muffin production variable.
         * The number of whole muffins it has produced since last update will then be added to the muffin count.
         */
        function ShopItem(id) {
            this.id = id;
            this.quantity = 0;
            this.muffinProduction = 0;

            this.increaseQuantity = function(number) {
                this.quantity += number;
            }

            this.produceMuffins = function(muffinProductionAmount) {
                var wholeMuffinsProduced = 0;
                this.muffinProduction += muffinProductionAmount;
                console.log(this.muffinProduction);
                if (this.muffinProduction >= 1) {
                    wholeMuffinsProduced = Math.floor(this.muffinProduction);
                    this.muffinProduction -= wholeMuffinsProduced;
                }
                return wholeMuffinsProduced;
            }
        }

        // ----------------------------------------------------------------
        // Functions
        // ----------------------------------------------------------------

        /**
         * The main loop that runs at a regular interval to update the muffin count and trigger events when appropriate.
         * Putting this first because it's the most important.
         */
        var update = function() {
            // Trigger a refresh of the shop items, to update their progress bars and to see if any have
            // become available since last update
            refreshShopItems();

            // Check every shop item that the player has bought.
            for (var shopItemId in BOUGHT_SHOP_ITEMS) {
                var boughtShopItem = BOUGHT_SHOP_ITEMS[shopItemId];
                var shopItemDefinition = SHOP_ITEM_DEFINITIONS[shopItemId];
                var muffinsProduced = 0;  

                muffinsProduced += boughtShopItem.produceMuffins(boughtShopItem.quantity * shopItemDefinition.mps * (UPDATE_INTERVAL_DURATION / 1000));

                if (muffinsProduced > 0) {
                    increaseMuffins(muffinsProduced);
                }
            }
        }

        /**
         * Buys one shop item and updates the muffin count accordingly.
         */
        var buyShopItem = function(shopItemId) {
            var shopItemDefinition = SHOP_ITEM_DEFINITIONS[shopItemId];
            if (CURRENT_MUFFINS >= shopItemDefinition.cost) {
                if (BOUGHT_SHOP_ITEMS[shopItemId] === undefined) {
                    BOUGHT_SHOP_ITEMS[shopItemId] = new ShopItem(shopItemId);
                }

                decreaseMuffins(shopItemDefinition.cost);
                BOUGHT_SHOP_ITEMS[shopItemId].increaseQuantity(1);
            }
            return false;
        }

        /**
         * Decrease the muffin count. This automatically updates the counter.
         */
        var decreaseMuffins = function(numberOfMuffins) {
            CURRENT_MUFFINS -= numberOfMuffins;
            COUNTER_TEXT_ELEMENT.html(CURRENT_MUFFINS+' '+'muffins'); 
            COUNTER_TEXT_ELEMENT.addClass('flashing decrease');
        }

        /** 
         * Adapted function from David Walsh: http://davidwalsh.name/css-animation-callback
         *
         * Different browsers use different names for CSS animation events, and even worse,
         * some browsers support more than one of them.
         *
         * This function uses a clever trick to definitively pick one event name which should work
         * for whichever browser is running it.
         *
         * @param vanillaName string The vanilla JavaScript name of the event (eg. "animationstart")
         */
        var getBrowserAnimationEvent = function(vanillaName) {
            // Create a dummy element
            var dummyElement = document.createElement("dummyElement");

            // Create a dictionary of animation event names
            var animationEvents = {
                "animationstart": {
                    "animation":        "animationstart",
                    "OAnimation":       "oAnimationStart",
                    "MozAnimation":     "animationstart",
                    "MSAnimation":      "MSAnimationStart",
                    "WebkitAnimation":  "webkitAnimationStart"
                },
                "animationend": {
                    "animation":        "animationend",
                    "OAnimation":       "oAnimationEnd",
                    "MozAnimation":     "animationend",
                    "MSAnimation":      "MSAnimationEnd",
                    "WebkitAnimation":  "webkitAnimationEnd"
                },
                "animationinterval": {
                    "animation":        "animationinterval",
                    "OAnimation":       "oAnimationInterval",
                    "MozAnimation":     "animationinterval",
                    "MSAnimation":      "MSAnimationInterval",
                    "WebkitAnimation":  "webkitAnimationInterval"
                }
            }

            var animationEventDictionary = animationEvents[vanillaName];

            // Test the dummy element for the existence of each kind of animation, and take the first one which exists.
            for (var animationEventName in animationEventDictionary) {
                if (dummyElement.style[animationEventName] !== undefined) {
                    return animationEventDictionary[animationEventName];
                }
            }

            return undefined;
        }

        /**
         * Increase the muffin count. This automatically updates the counter.
         * Any muffins added this way also get added to BANKED_MUFFINS, which tracks the total number of muffins ever produced.
         */
        var increaseMuffins = function(numberOfMuffins) {
            CURRENT_MUFFINS += numberOfMuffins;
            BANKED_MUFFINS += numberOfMuffins;
            COUNTER_TEXT_ELEMENT.html(CURRENT_MUFFINS+' '+'muffins'); 
            COUNTER_TEXT_ELEMENT.addClass('flashing increase');
        }

        var refreshShopItems = function() {
            for (var shopItemId in SHOP_ITEM_ELEMENTS) {
                var shopItem = SHOP_ITEM_DEFINITIONS[shopItemId];
                var shopItemElement = SHOP_ITEM_ELEMENTS[shopItemId];
                var shopItemProgressBarElement = $(shopItemElement.find('.shopItemProgressBar')[0]);

                var shopItemProgressBarCoefficient = CURRENT_MUFFINS / shopItem.cost;
                var shopItemProgressBarScaleXCoefficient = shopItemProgressBarCoefficient;
                var shopItemProgressBarTranslateXPercentage = -50 + ((shopItemProgressBarCoefficient * 100) / 2);
                var shopItemProgressBarBackgroundColorR = Math.floor(255 - (255 * shopItemProgressBarCoefficient));
                var shopItemProgressBarBackgroundColorG = Math.floor(255 - (255 * shopItemProgressBarCoefficient));
                var shopItemProgressBarBackgroundColorB = Math.floor(255 - (255 * shopItemProgressBarCoefficient));

                if (CURRENT_MUFFINS < shopItem.cost) {
                    shopItemElement.addClass('unavailable');
                    shopItemProgressBarElement.show();
                    shopItemProgressBarCoefficient = CURRENT_MUFFINS / shopItem.cost;
                    shopItemProgressBarScaleXCoefficient = shopItemProgressBarCoefficient;
                    shopItemProgressBarTranslateXPercentage = -50 + ((shopItemProgressBarCoefficient * 100) / 2);
                    shopItemProgressBarBackgroundColorR = Math.floor(255 - (255 * shopItemProgressBarCoefficient));
                    shopItemProgressBarBackgroundColorG = Math.floor(255 - (255 * shopItemProgressBarCoefficient));
                    shopItemProgressBarBackgroundColorB = Math.floor(255 - (255 * shopItemProgressBarCoefficient));
                    //var shopItemProgressBarBackgroundColorR = Math.floor(255 - (255 * shopItemProgressBarCoefficient));
                    //var shopItemProgressBarBackgroundColorG = Math.floor(255 * shopItemProgressBarCoefficient);
                    //var shopItemProgressBarBackgroundColorB = Math.floor(64 * shopItemProgressBarCoefficient);
                }
                else {
                    shopItemElement.removeClass('unavailable');
                    //shopItemProgressBarElement.hide();
                    shopItemProgressBarCoefficient = CURRENT_MUFFINS / shopItem.cost;
                    shopItemProgressBarScaleXCoefficient = 1;
                    shopItemProgressBarTranslateXPercentage = 0;
                    shopItemProgressBarBackgroundColorR = 255;
                    shopItemProgressBarBackgroundColorG = 255;
                    shopItemProgressBarBackgroundColorB = 255;
                }
                shopItemProgressBarElement.css('transform', 'translateX('+shopItemProgressBarTranslateXPercentage+'%) scaleX('+shopItemProgressBarScaleXCoefficient+')');
                shopItemProgressBarElement.css('background-color', 'rgb('+shopItemProgressBarBackgroundColorR+','+shopItemProgressBarBackgroundColorG+','+shopItemProgressBarBackgroundColorB+')');
            }
        }

        // ----------------------------------------------------------------
        // Event handlers
        // ----------------------------------------------------------------
        MUFFIN_ELEMENT.bind(
            'click',
            function (e) {
                increaseMuffins(1);
                MUFFIN_ELEMENT.addClass('clicked');
                var clickPulseHtml = '';
                clickPulseHtml = '<div class="clickPulse"></div>';
                var clickPulseElement = $(clickPulseHtml);
                var mouseX = e.pageX;
                var mouseY = e.pageY;
                clickPulseElement.css('transform', 'translate('+mouseX+'px,'+mouseY+'px)');
                MUFFIN_ELEMENT.append(clickPulseElement);
            }
        );
        MUFFIN_ELEMENT.bind(
            getBrowserAnimationEvent('animationend'),
            function (animationEvent) {
                if (animationEvent.originalEvent.animationName == 'muffin-clicked') {
                    MUFFIN_ELEMENT.removeClass('clicked');
                }
                if (animationEvent.originalEvent.animationName == 'click-pulse') {
                    var clickPulseElement = animationEvent.originalEvent.target;
                    $(clickPulseElement).remove();
                }
            }
        );

        COUNTER_TEXT_ELEMENT.bind(
            getBrowserAnimationEvent('animationend'),
            function (animationEvent) {
                if (animationEvent.originalEvent.animationName == 'counter-text-flashing-decrease') {
                    COUNTER_TEXT_ELEMENT.removeClass('flashing decrease');
                }
                if (animationEvent.originalEvent.animationName == 'counter-text-flashing-increase') {
                    COUNTER_TEXT_ELEMENT.removeClass('flashing increase');
                }
            }
        );

        // ----------------------------------------------------------------
        // Initialization
        // ----------------------------------------------------------------
        UPDATE_INTERVAL = setInterval(update, UPDATE_INTERVAL_DURATION);

        // Set data for the shop items
        //  id                                            id                  name                  cost    mps
        SHOP_ITEM_DEFINITIONS = {
            'fillyScout':       new ShopItemDefinition(   'fillyScout',      'Filly scout',         10,     0.1),
            'babyDragon':       new ShopItemDefinition(   'babyDragon',      'Baby dragon',         20,     0.2),
            'apprenticeBaker':  new ShopItemDefinition(   'apprenticeBaker', 'Apprentice baker',    40,     0.4),
            'masterBaker':      new ShopItemDefinition(   'masterBaker',     'Master baker',        80,     0.8)
        };

        // Create the shop item elements
        SHOP_ITEM_ELEMENTS = {};

        for (var shopItemId in SHOP_ITEM_DEFINITIONS) {
            var shopItem = SHOP_ITEM_DEFINITIONS[shopItemId];
            var shopItemHtml = '';
            var showShopItemProgressBar = false;
            if (CURRENT_MUFFINS <= shopItem.cost) {
                var shopItemProgressBarCoefficient = CURRENT_MUFFINS / shopItem.cost;
                var showShopItemProgressBar = true;
            }

            shopItemHtml += '<div id="'+shopItem.id+'" class="shopItem unavailable">\n';
            shopItemHtml += '    '+shopItem.name+': '+shopItem.cost+'\n';
            shopItemHtml += '    <div class="shopItemProgressBar">&nbsp;</div>\n';
            shopItemHtml += '    </div>\n';
            shopItemHtml += '</div>\n';

            var shopItemElement = $(shopItemHtml);
            SHOP_ITEM_ELEMENTS[shopItemId] = shopItemElement;
        }

        // Add the shop item elements to the DOM
        for (var shopItemId in SHOP_ITEM_ELEMENTS) {
            var shopItemElement = SHOP_ITEM_ELEMENTS[shopItemId];
            SHOP_ELEMENT.append(shopItemElement);
        }

        // Add shop item event handlers
        for (var shopItemId in SHOP_ITEM_ELEMENTS) {
            var shopItemElement = SHOP_ITEM_ELEMENTS[shopItemId];
            shopItemElement.bind(
                'click',
                function(e) {
                    buyShopItem(this.id);
                }
            );
        }
    
    }
);
