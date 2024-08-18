/**
 * Adjusts the font color of an HTML element based on its background color.
 * @param element - The HTML element whose font color needs to be adjusted.
 */
export default function adjustFontColor(element: HTMLElement) {
	if (!element) return;
	// 1. teg elements background color
	const bgColor = getComputedStyle(element).backgroundColor.match(/\d+(?:\.\d+)?/g) || [];
	// console.log("🚀 ~ adjustFontColor ~ bgColor:", bgColor)
	const fontColor = getComputedStyle(element).color.match(/\d+(?:\.\d+)?/g) || [];
	// 2. convert to number array
	const bgClrVal: number[] = bgColor.map(Number);
	const ftClrVal: number[] = fontColor.map(Number);

	// console.log('🚀 ~ adjustFontColor ~ bgColor:', bgClrVal);
	// console.log('🚀 ~ adjustFontColor ~ fontColor:', ftClrVal);

	// 3. convert oklab to rgb
	const bgRGB = getLuminance(oklabToRgb(bgClrVal));
	const ftRGB = getLuminance(oklabToRgb(ftClrVal));
	console.log('🚀 ~ adjustFontColor ~ bgRGB:', bgRGB);
	console.log('🚀 ~ adjustFontColor ~ ftRGB:', ftRGB);

	const ratio = getContrastRatio(bgRGB, ftRGB);
	console.log('🚀 ~ adjustFontColor ~ ratio:', ratio);

	if (ratio >= 4.5) {
		element.style.color = 'white';
	} else {
		element.style.color = 'black';
	}
}

/**
 * Converts an OKLab color string to RGB color object.
 * @param oklabArray - The OKLab color array .
 * @returns An object with RGB color values.
 * @throws {Error} If the input is not a valid OKLab color string or if the OKLab color values are invalid.
 */
function oklabToRgb(oklabArray: number[]) {
	// Check if the the color is in rgb or oklab

	const [okl, oka, okb] = oklabArray.map(Number);
	// console.log("🚀 ~ oklabToRgb ~ [okl, oka, okb]:", [okl, oka, okb])

	// Check if the OKLab values are valid
	if (typeof okl !== 'number' || typeof oka !== 'number' || typeof okb !== 'number') {
		throw new Error('Invalid oklab color values');
	}

	// Convert OKLab to linear RGB
	const l_ = okl + 0.3963377774 * oka + 0.2158037573 * okb;
	const m_ = okl - 0.1055613458 * oka - 0.0638541728 * okb;
	const s_ = okl - 0.0894841775 * oka - 1.291485548 * okb;

	const l3 = Math.pow(l_, 3);
	const m3 = Math.pow(m_, 3);
	const s3 = Math.pow(s_, 3);

	const r = 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
	const g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
	const b = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3;

	// Convert linear RGB to sRGB
	const toSrgb = (c: number) => {
		if (typeof c !== 'number' || c < 0) {
			throw new Error('Invalid color value');
		}

		return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(Math.max(c, 0), 1 / 2.4) - 0.055;
	};
	// console.log(Math.round(toSrgb(r) * 255), Math.round(toSrgb(g) * 255), Math.round(toSrgb(b) * 255));

	return {
		r: Math.round(toSrgb(r) * 255),
		g: Math.round(toSrgb(g) * 255),
		b: Math.round(toSrgb(b) * 255)
	};
}

/**
 * Parses an OKLab color string and returns an object with the OKLab components.
 *
 * @param {string} oklabString - The OKLab color string to parse, expected in the format 'oklab(L A B)'.
 * @returns {object} An object containing the OKLab components: { okl: number, oka: number, okb: number }.
 * @throws {Error} Throws an error if the input string is not in the valid OKLab format.
 */
// function parseOklabString(oklabString: string) {
// 	// Use a regular expression to extract the numbers
// 	const regex = /oklab\(([^)]+)\)/;
// 	const match = oklabString.match(regex);

// 	if (match) {
// 		// Split the matched string by spaces to get individual number strings
// 		const numbers = match[1].split(' ').map(Number);

// 		// Create an object with the extracted numbers
// 		const oklabObject = {
// 			okl: numbers[0],
// 			oka: numbers[1],
// 			okb: numbers[2]
// 		};

// 		return oklabObject;
// 	} else {
// 		throw new Error('Invalid OKLab string format');
// 	}
// }

function getLuminance(rgb: { r: number; g: number; b: number }) {
	const R = rgb.r / 255;
	const G = rgb.g / 255;
	const B = rgb.b / 255;

	const luminance = 0.2126 * R + 0.7152 * G + 0.0722 * B;
	// getContrastRatio(l1, l2);

	return luminance;
}
// TODO: get color of background (L1) and color of fonts (L2) and check the contrast ratio

function getContrastRatio(l1: number, l2: number) {
	console.log('firstColor', l1, 'secondColor', l2);

	const lighter = Math.max(l1, l2);
	const darker = Math.min(l1, l2);
	return (lighter + 0.05) / (darker + 0.05);
}

// getContrastRatio(0.652, 0.179);

// ------------------------------------------------------------------------------
/**
 * Converts an OKLab color string to RGB color object.
 * @param oklabArray - The OKLab color array .
 * @returns An object with RGB color values.
 * @throws {Error} If the input is not a valid OKLab color string or if the OKLab color values are invalid.
 */
// function oklabToRgb(oklabArray: number[]) {
// 	const [okl, oka, okb] = oklabArray.map(Number);

// 	if (typeof okl !== 'number' || typeof oka !== 'number' || typeof okb !== 'number') {
// 		throw new Error('Invalid oklab color values');
// 	}

// 	const l_ = okl + 0.3963377774 * oka + 0.2158037573 * okb;
// 	const m_ = okl - 0.1055613458 * oka - 0.0638541728 * okb;
// 	const s_ = okl - 0.0894841775 * oka - 1.291485548 * okb;

// 	const l3 = Math.pow(l_, 3);
// 	const m3 = Math.pow(m_, 3);
// 	const s3 = Math.pow(s_, 3);

// 	const r = 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
// 	const g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
// 	const b = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3;

// 	const toSrgb = (c: number) => {
// 		if (typeof c !== 'number' || c < 0) {
// 			throw new Error('Invalid color value');
// 		}

// 		return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(Math.max(c, 0), 1 / 2.4) - 0.055;
// 	};

// 	return {
// 		r: Math.round(toSrgb(Math.max(r, 0)) * 255),
// 		g: Math.round(toSrgb(Math.max(g, 0)) * 255),
// 		b: Math.round(toSrgb(Math.max(b, 0)) * 255)
// 	};
// }

/**
 * Parses an OKLab color string and returns an object with the OKLab components.
 *
 * @param {string} oklabString - The OKLab color string to parse, expected in the format 'oklab(L A B)'.
 * @returns {object} An object containing the OKLab components: { okl: number, oka: number, okb: number }.
 * @throws {Error} Throws an error if the input string is not in the valid OKLab format.
 */
// function parseOklabString(oklabString: string) {
// 	// Use a regular expression to extract the numbers
// 	const regex = /oklab\(([^)]+)\)/;
// 	const match = oklabString.match(regex);

// 	if (match) {
// 		// Split the matched string by spaces to get individual number strings
// 		const numbers = match[1].split(' ').map(Number);

// 		// Create an object with the extracted numbers
// 		const oklabObject = {
// 			okl: numbers[0],
// 			oka: numbers[1],
// 			okb: numbers[2]
// 		};

// 		return oklabObject;
// 	} else {
// 		throw new Error('Invalid OKLab string format');
// 	}
// }

// function getLuminance(rgb: { r: number; g: number; b: number }) {
// 	const R = rgb.r / 255;
// 	const G = rgb.g / 255;
// 	const B = rgb.b / 255;

// 	const luminance = 0.2126 * R + 0.7152 * G + 0.0722 * B;
// 	// console.log('🚀 ~ getLuminance ~ luminance:', luminance);
// 	// getContrastRatio(l1, l2);
// 	// if (luminance > 0.179) {
// 	// 	console.log( luminance);
// 	// 	return 'light';
// 	// } else {
// 	// 	console.log( luminance);
// 	// 	return 'dark';
// 	// }
// 	return luminance;
// }