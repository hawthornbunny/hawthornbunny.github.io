window.onload = initialize;

var global = {
    'canvas': undefined,
    'canvasContext': undefined,
    'elements': [],
    'elementIds': [
        'canvas',
    ],
};

function initialize() {
    for (var i=0; i < global.elementIds.length; i++) {
        global.elements[global.elementIds[i]] = document.querySelector(
            '#'+global.elementIds[i]
        );
    }

    global.canvasContext = global.elements.canvas.getContext('2d');
    global.terminalRenderer = new TerminalRenderer();
    global.terminal = new TerminalSimulator(52, 20);

    // Alias the terminal `receive` method, just to make this a bit more
    // readable.
    var r = function (text) {
        global.terminal.receive(text);
    };

    r("Booting device\x1bD030.\x1bD030.\x1bD030.\x1bD030 OK.\x1bD060\n");
    r("Initializing system\x1bD030.\x1bD030.\x1bD030.\x1bD030 OK.\x1bD060\n");
    r("\x1bR");
    r("### Welcome to bunnyOS v1.0.0 ###\n");
    r("      \"It's almost usable!\"\n");
    r("\n");
    r("――――――――――――――――――――――――――――――――――――――――――――――――――――");
    r("\n");
    r("Loading apocalyptic wasteland: \x1bD030■■■■■■■■■■■■■■■■\n");
    r("Loading terrifying monsters:   \x1bD030■■■■■■■■■■■■■■■■\n");
    r("Loading cute fillies:          \x1bD030■■■■■■■■■■■■■■■■\n");
    r("\n");
    r("All resources loaded.\x1bD060\n");
    r("\n");
    r("――――――――――――――――――――――――――――――――――――――――――――――――――――");
    r("\n");
    r("*** INCOMING MESSAGE ***\x1bD060\n");
    r("\n");
    r("Dear Princess Celestia,\x1bD060\n");
    r("\n");
    r("Today I wrote a simple terminal simulator in\n");
    r("Javascript, as a technology demonstration for my\n");
    r("friend Cold Spike.\x1bD060\n");
    r("\n");
    r("                                   Yours sincerely,\n");
    r("                                   hawthornbunny\x1bD120\n");
    r("\n");
    r("PS. It's really hot, could you turn the sun down a\n");
    r("bit? Thanks.\x1bD120\n");
    r("\n");
    r("*** END OF LINE ***");

    draw();
}

function draw() {
    global.canvasContext.fillStyle = 'rgb(0, 32, 0)';
    global.canvasContext.fillRect(
        0,
        0,
        global.elements.canvas.width,
        global.elements.canvas.height
    );

    global.terminalRenderer.render(
        global.terminal,
        global.canvasContext,
        0,
        0,
        global.elements.canvas.width,
        global.elements.canvas.height
    );

    global.terminal.step();
    window.requestAnimationFrame(draw);
}

/**
 * Simulator for a simple terminal. The terminal consists of 2 main components:
 *
 * - A text buffer which holds text that is ready to be printed
 * - A display, which is a rectangular grid of characters.
 *
 * To simulate a "realistic" terminal, the terminal does not print all
 * characters as soon as it receives them; instead, it simulates a printing
 * delay for each character. The `step` method is used to advance the terminal's
 * clock and should be called continuously.
 *
 * Note that the terminal simulator only simulates the information and timing
 * of a terminal; it does not render any graphics.
 *
 * @param int cols
 * @param int rows
 */
function TerminalSimulator(cols, rows) {
    /** @var int cols Number of columns of the terminal display. */
    this.cols = undefined;
    /** @var int rows Number of rows of the terminal display. */
    this.rows = undefined;

    /**
     * @var string[][] display
     *
     * A 2D array of characters that form the display for the terminal (think of
     * it like the terminal's "video memory").
     */
    this.display = undefined;

    /** @var object cursorPos The position of the terminal's cursor. */
    this.cursorPos = {'x': 0, 'y': 0};

    /**
     * @var string buffer
     *
     * A buffer of characters to be printed to the display.
     */
    this.buffer = '';

    /**
     * @var int defaultCharDelay
     *
     * The default delay, in time steps, that the terminal imposes before the
     * next character can be written to the display.
     */
    this.defaultCharDelay = 2;

    /**
     * @var int timeToNextChar
     *
     * The number of time steps remaining until the next character can be
     * printed. (This can be artificially increased, for example by delay escape
     * commands, to introduce pauses into the terminal's output).
     */
    this.timeToNextChar = this.defaultCharDelay;

    /**
     * @var string escapeCharacter
     *
     * If the terminal receives this character, it will process the next
     * characters in the buffer as an escape sequence.
     */
    this.escapeCharacter = '\x1b';

    /**
     * Initialize the terminal display with empty characters.
     *
     * @param int cols
     * @param int rows
     */
    this.initialize = function (cols, rows) {
        this.cols = cols;
        this.rows = rows;
        this.resetDisplay();
    };

    /**
     * Send a text string to the terminal. The terminal will append the string
     * to its buffer, and will print it when it gets around to it.
     *
     * @param string text
     */
    this.receive = function(text) {
        this.buffer += text;
    }

    /**
     * Immediately print a character at the cursor position, and advance the
     * cursor, wrapping to the next line if needed. This doesn't use the buffer;
     * it simply updates the display and moves the cursor appropriately.
     *
     * @param string character
     */
    this.printChar = function(character) {
        // Handle special characters first.
        switch (character) {
            case '\n':
                this.lineFeed();
                return;
                break;
            case '\r':
                this.carriageReturn();
                return;
                break;
        }
        this.displayChar(character, this.cursorPos.x, this.cursorPos.y);
        this.cursorPos.x++;

        if (this.cursorPos.x >= this.cols) {
            if (this.cursorPos.y <= this.rows - 1) {
                this.lineFeed();
            } else {
                this.cursorPos.x = this.cols - 1;
            }
        }
    };

    /**
     * Simulate a line feed (drop the cursor to the next line). We'll implicitly
     * assume that a line feed also triggers a carriage return.
     *
     * If the cursor is at the bottom of the screen, perform a row-by-row shift
     * to move everything up by one line.
     */
    this.lineFeed = function() {
        this.cursorPos.y++;
        this.cursorPos.x = 0;

        if (this.cursorPos.y >= this.rows) {
            this.cursorPos.y--;
            this.shiftUp();
        }
    };

    /**
     * Shift all characters on the display up by 1 line, leaving the bottom line
     * blank.
     */
    this.shiftUp = function() {
        for (var j = 0; j < this.rows - 1; j++) {
            for (var i = 0; i < this.cols; i++) {
                this.display[i][j] = this.display[i][j+1];
            }
        }

        for (var i = 0; i < this.cols; i++) {
            this.display[i][this.rows - 1] = '';
        }
    };

    /**
     * Reset the terminal display,  wiping all characters from the display,
     * clearing all formatting, and returning the cursor to the top of the
     * screen. Note that this doesn't touch the buffer; if there are still
     * characters waiting to be printed, they'll still be printed after the
     * display resets. This is more of a "clear screen" functionality.
     */
    this.resetDisplay = function() {
        this.cursorPos.x = 0;
        this.cursorPos.y = 0;
        this.timeToNextChar = this.defaultCharDelay;
        this.display = [];
        for (var i = 0; i < this.cols; i++) {
            this.display[i] = [];
            for (var j = 0; j < this.rows; j++) {
                this.display[i][j] = '';
            }
        }
    };

    /**
     * Simulate a carriage return. Since our terminal doesn't have any concept
     * of a carriage, this does nothing.
     */
    this.carriageReturn = function() {
    };

    /**
     * Immediately set a character at the given position in the terminal's
     * display. This doesn't use the buffer or the cursor; it simply directly
     * updates the terminal's display memory.
     *
     * @param string character
     * @param int x
     * @param int y
     */
    this.displayChar = function(character, x, y) {
        this.display[x][y] = character;
    };

    /**
     * Handle an escape sequence. Escape sequences begin with the escape
     * character (usually `\x33`) and consist of a 1-character command followed
     * by an optional parameter string.
     *
     * 1st character = the escape character (usually `\x33`)
     * 2nd character = a command specifier
     * 3rd character = a command parameter
     *
     * The simulator recognizes the following escape commands:
     *
     * C: change color; the parameter can be 0-9, where 0 is the default color
     *    and 1-9 are various colors.
     * D: delay; parameter can be 0-9 and represents
     */ 
    this.handleEscapeSequence = function() {
        // Pop the buffer. We expect that the first character will be the escape
        // character (since that's what triggered the terminal to start handling
        // an escape sequence. We'll discard this character for now.
        var escapeCharacter = this.popBuffer();
        if (escapeCharacter != this.escapeCharacter) {
            throw "Invalid escape character encountered while parsing escape"
                + " sequence";
        }

        // Pop the next character from the buffer. We expect this to be the
        // command character.
        var command = this.popBuffer();
        switch (command) {
            // Cnnnnnn: Change color to #nnnnnn.
            case 'C':
                var colorString = this.popBuffer(6);
                break;
            // R: reset (clear) the display.
            case 'R':
                this.resetDisplay();
                break;
            // Dnn: delay the next character print for nnn time steps.
            case 'D':
                var delayString = this.popBuffer(3);
                var delay = parseInt(delayString);
                this.timeToNextChar = delay;
                break;
            default:
                throw "Unrecognized escape command"
        }
    };

    /**
     * Pop a string of characters out of the buffer. If `numberOfChars` is not
     * specified, pop a single character.
     * 
     * @param int numberOfChars
     * @return string
     */
    this.popBuffer = function(numberOfChars) {
        if (!numberOfChars) {
            numberOfChars = 1;
        }
        var poppedString = this.buffer.substring(0, numberOfChars);
        this.buffer = this.buffer.substring(numberOfChars, this.buffer.length);
        return poppedString;
    }

    /**
     * Step forward one time unit in the terminal's simulation, printing
     * characters when appropriate. This should be called continuously.
     */
    this.step = function() {
        if (this.buffer == '') {
            return;
        }

        /**
         * @var string currentChar
         *
         * The char that the terminal is in the process of printing (ie. the
         * oldest character currently in the buffer).
         */
        var currentChar = this.buffer.charAt(0);
        if (currentChar == this.escapeCharacter) {
            // If an escape character is next, we don't bother with printing or
            // imposing an artificial delay; we interpret the escape sequence
            // immediately.
            this.handleEscapeSequence();
            return;
        }

        this.timeToNextChar--;
        if (this.timeToNextChar <= 0) {
            this.printChar(currentChar);
            this.popBuffer();
            this.timeToNextChar = this.defaultCharDelay;
        }
    }

    this.initialize(cols, rows);
}

function TerminalRenderer() {
    /**
     * Render a simulated terminal to a graphics context, at the given
     * dimensions.
     *
     * @param TerminalSimulator terminal
     * @param CanvasRenderingContext2D context
     * @param int x X-position of the top left corner.
     * @param int y Y-position of the top left corner.
     * @param int width Width of the rendered terminal.
     * @param int height Height of the rendered terminal.
     */
    this.render = function(terminal, context, x, y, width, height) {
        var spacing = {
            'x': width / terminal.cols,
            'y': height / terminal.rows,
        };

        // Draw a rectangular border around the terminal.
        context.strokeStyle = 'rgba(128, 255, 128, 0.5)';
        context.strokeRect(x, y, width, height);

        // Switch to a terminal-style green.
        context.fillStyle = 'rgb(128, 255, 128)';
        context.textBaseline = 'top';
        context.font = (spacing.y) + 'px monospace';

        //context.shadowColor = "rgba(128, 255, 128, 0.5)";
        //context.shadowOffsetX = 0;
        //context.shadowOffsetY = 0;
        //context.shadowBlur = 3;

        for (var i = 0; i < terminal.cols; i++) {
            for (var j = 0; j < terminal.rows; j++) {
                var character = terminal.display[i][j];
                context.fillText(
                    character,
                    x + (i * spacing.x),
                    y + (j * spacing.y)
                );
            }
        }

        // Draw the cursor (a rectangular block that's the same size as a single
        // grid element of the terminal). To make the effect more interesting,
        // we fade the block depending on how close the terminal is to printing
        // the next character.

        var cursorAlpha = terminal.timeToNextChar / terminal.defaultCharDelay;
        if (cursorAlpha > 1) {
            cursorAlpha = 1;
        }
        context.fillStyle
            = 'rgba(128, 255, 128,' + cursorAlpha + ')';
        context.fillRect(
            terminal.cursorPos.x * spacing.x,
            terminal.cursorPos.y * spacing.y,
            spacing.x, spacing.y
        );
    }
}
