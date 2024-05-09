/*******************************************************************************
 * A set of miscellaneous useful functions for automating or shortening common
 * JavaScript operations.
 ******************************************************************************/

/**
 * Shortcut for `document.querySelector`.
 *
 * @param {string} selector
 * @return {Element}
 */
const query = function query(selector)
{
    return document.querySelector(selector);
};

/**
 * Append multiple children to an element.
 *
 * @param {Element} element
 * @param {...Element} children
 * @return {Element}
 */
const append = function append(element, ...children)
{
    for (const child of children) {
        element.appendChild(child);
    }

    return element;
};

/**
 * Delete all children from the given element, leaving it empty.
 *
 * @param {Element} element
 */
const empty = function empty(element)
{
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
};

/**
 * Shortcut for `document.createElement`.
 */
const create = function create(tag, className)
{
    const element = document.createElement(tag);

    if (className !== undefined) {
        element.className = className;
    }

    return element;
};

/**
 * Set properties on an object.
 *
 * @param {Object} object
 * @param {Object} props
 */
const setProps = function setProps(object, props)
{
    for (const propName in props) {
        object[propName] = props[propName];
    }
};

/**
 * Return true if the given array contains the given value.
 *
 * @param {Array} array
 * @param {mixed} value
 * @return {boolean}
 */
const contains = function contains(array, value)
{
    return array.indexOf(value) !== -1;
};

/**
 * Throw an error if the condition fails, with an optional message.
 *
 * @param {boolean} condition
 * @param {string} message
 * @throws {Error}
 */
const assert = function assert(condition, message)
{
    if (!condition) {
        if (message) {
            throw new Error(`Assertion failed: ` + message);
        } else {
            throw new Error(`Assertion failed`);
        }
    }
};
