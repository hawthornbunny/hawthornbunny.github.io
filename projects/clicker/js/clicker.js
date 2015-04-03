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
        var SHOP_ITEMS = undefined; // will be defined during initialization, after object definitions have been declared
        var SHOP_ITEM_ELEMENTS = undefined; // will be defined during initialization, after SHOP_ITEMS have been declared

        // ----------------------------------------------------------------
        // Objects
        // ----------------------------------------------------------------

        function ShopItem(id, name, cost) {
            this.id = id;
            this.name = name;
            this.cost = cost;
        }

        // ----------------------------------------------------------------
        // Functions
        // ----------------------------------------------------------------

        /**
         * The main loop that runs at a regular interval to update the muffin count and trigger events when appropriate
         */
        var update = function() {
            refreshShopItems();
        }

        var buyShopItem = function(shopItemId) {
            if (BOUGHT_SHOP_ITEMS[shopItemId] === undefined) {
                BOUGHT_SHOP_ITEMS[shopItemId] = 0;
            }
            BOUGHT_SHOP_ITEMS[shopItemId] += 1;
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
         */
        var increaseMuffins = function() {
            CURRENT_MUFFINS++;
            BANKED_MUFFINS++;
            COUNTER_TEXT_ELEMENT.html(CURRENT_MUFFINS+' '+'muffins'); 
            COUNTER_TEXT_ELEMENT.addClass('flashing');
        }

        var refreshShopItems = function() {
            for (var i in SHOP_ITEMS) {
                var shopItem = SHOP_ITEMS[i];
                if (CURRENT_MUFFINS <= shopItem.cost) {
                    var shopItemElement = $('#'+shopItem.id);
                    var shopItemProgressBarCoefficient = CURRENT_MUFFINS / shopItem.cost;
                    var shopItemProgressBarElement = $(shopItemElement.find('.shopItemProgressBar')[0]);
                    var shopItemProgressBarScaleXCoefficient = shopItemProgressBarCoefficient;
                    var shopItemProgressBarTranslateXPercentage = -50 + ((shopItemProgressBarCoefficient * 100) / 2);
                    var shopItemProgressBarBackgroundColorR = Math.floor(255 - (255 * shopItemProgressBarCoefficient));
                    var shopItemProgressBarBackgroundColorG = Math.floor(255 * shopItemProgressBarCoefficient);
                    var shopItemProgressBarBackgroundColorB = Math.floor(64 * shopItemProgressBarCoefficient);
                    shopItemProgressBarElement.css('transform', 'translateX('+shopItemProgressBarTranslateXPercentage+'%) scaleX('+shopItemProgressBarScaleXCoefficient+')');
                    shopItemProgressBarElement.css('background-color', 'rgb('+shopItemProgressBarBackgroundColorR+','+shopItemProgressBarBackgroundColorG+','+shopItemProgressBarBackgroundColorB+')');
                }
            }
        }

        // ----------------------------------------------------------------
        // Event handlers
        // ----------------------------------------------------------------
        MUFFIN_ELEMENT.bind(
            'click',
            function (e) {
                increaseMuffins();
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
                if (animationEvent.originalEvent.animationName == 'counter-text-flashing') {
                    COUNTER_TEXT_ELEMENT.removeClass('flashing');
                }
            }
        );

        // ----------------------------------------------------------------
        // Initialization
        // ----------------------------------------------------------------
        UPDATE_INTERVAL = setInterval(update, UPDATE_INTERVAL_DURATION);

        // Set data for the shop items
        SHOP_ITEMS = {
            'fillyScout':       new ShopItem('fillyScout',      'Filly Scout',      10),
            'apprenticeBaker':  new ShopItem('apprenticeBaker', 'Apprentice baker', 20)
        };

        // Create the shop item elements
        SHOP_ITEM_ELEMENTS = {};

        for (var shopItemId in SHOP_ITEMS) {
            var shopItem = SHOP_ITEMS[shopItemId];
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
