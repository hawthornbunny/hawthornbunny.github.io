/*******************************************************************************
 * Color conversion functions
 ******************************************************************************/

/**
 * Convert RGB components (expressed as floats from 0 to 1) to HSL components.
 * Adapted from
 * <https://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/>
 *
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @return {number[]}
 */
function rgbToHsl(r, g, b)
{
    const rgb = [r, g, b];
    const sortedRgb = rgb.toSorted();
    const min = sortedRgb[0];
    const max = sortedRgb[2];
    const isMax = rgb.map(component => component === max);

    // Calculate luminance (the average between the min and max RGB component
    // values). The source seems to indicate that luminance and lightness are
    // the same thing, although I couldn't find anything that actually confirms
    // this to be true. For now, I will assume luminance is the same as
    // lightness.
    const luminance = (min + max) / 2;

    // Calculate saturation. There are two different formulae for this, which
    // depend on whether the luminance is below or above 0.5.
    let saturation = 0;
    if (luminance < 0.5) {
        saturation = (max - min) / (max + min);
    } else {
        saturation = (max - min) / (2 - max - min);
    }

    // Calculate hue. There are 3 different formulae for this, which depend on
    // which of the RGB components was the largest.
    let hue = 0;
    if (isMax[0]) {
        // If red was the largest component
        hue = (g - b) / (max - min);
    } else if (isMax[1]) {
        // If green was the largest component
        hue = 2 + ((b - r) / (max - min));
    } else if (isMax[2]) {
        // If blue was the largest component
        hue = 4 + ((r - g) / (max - min));
    }

    // The resulting hue value needs to be multiplied by 60 to get it as a point
    // between 0 and 360 on the hue circle.
    hue *= 60

    // It can also end up negative, in which case add 360. I don't know why this
    // part is so convoluted.
    if (hue < 0) {
        hue += 360;
    }

    // Finally we want it as a value from 0 to 1:
    hue = hue / 360;

    return [hue, saturation, luminance];
}

/**
 * Given a 6-digit hexadecimal color code, return a 3-tuple containing the RGB
 * components in decimal form (0 to 255). A leading # character is permitted.
 *
 * @param {string} hexColor
 * @return {number[]}
 */
function decomposeHexColor(hexColor)
{
    if (hexColor.charAt(0) === "#") {
        hexColor = hexColor.substring(1);
    }

    if (hexColor.length !== 6) {
        throw new Error(`Cannot decompose hex color code ${hexColor}; color code must consist of 6 hexadecimal digits`);
    }

    const rgbComponents = [];
    for (let i = 0; i < 6; i += 2) {
        const hexComponent = hexColor.substring(i, i+2);
        const rgbComponent = parseInt(hexComponent, 16);

        if (isNaN(rgbComponent)) {
            throw new Error(`Cannot decompose hex color code ${hexColor}; hex component ${hexComponent} is invalid`);
        }

        rgbComponents.push(rgbComponent);
    }

    return rgbComponents;
}

