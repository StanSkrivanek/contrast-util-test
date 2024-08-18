// OPtion 1
// take lightness from font (ftl)and background (bgl) color 
// Math.max(ftl)- Math.min(bgl) > 4.5 ? white : black

// 1. get background color
// 2. get font color
// 3. get lightness from background color
// 4. get ratio from contrast

// TODO: get color of background (L1) and color of fonts (L2) and check the contrast ratio

// const oklabColor = { l: 0.5, a: 0.1, b: 0.2 };
// const rgbFromOklab = oklabToRgb(oklabColor);
// console.log('RGB from OKLab:', rgbFromOklab);

// const l = Math.min(bgl, ftl) - Math.max(bgl, ftl);
// console.log("🚀 ~ contrastChecker ~ MIN:", Math.min(bgl, ftl))
// console.log("🚀 ~ contrastChecker ~ MAX:", Math.max(bgl, ftl))
// console.log('🚀 ~ contrastChecker ~ l:', l);
// const ratio = Math.max(bgl, ftl) / Math.min(bgl, ftl);

// OPtion 2
// take lightness from background (bgl) color 
// if bgl > 4.5 ? white : black




// export default function adjustFontColor(element: HTMLElement | null): void {
// 	if (!element) return;

// 	const backgroundColor = getComputedStyle(element).getPropertyValue('background-color');

// 	// @ts-expect-error: Typescript can not infer correct types from RegEx match
// 	const [lightness] = backgroundColor.match(/\d+(\.\d+)?/g).map(Number);
// 	console.log("🚀 ~ adjustFontColor ~ lightness:", lightness);
// 	const ratio =
// 		(lightness > 0.03928
// 			? ((lightness + 0.055) / 1.055) ** 2.4
// 			: lightness / 100 / 12.92) * 10;
// 	console.log("🚀 ~ adjustFontColor ~ ratio:", ratio);
// 	if (ratio <= 4.5) {
// 		element.style.color =
// 			"color-mix(in oklab, hsl(var(--_private-color)), white 100%)";
// 	} else {
// 		element.style.color =
// 			"color-mix(in oklab, hsl(var(--_private-color)), black 55%)";
// 	}
//
// }




// 	if (!element) return; // add null check to prevent error

// 	const backgroundColor = getComputedStyle(element).getPropertyValue(
// 		"background-color"
// 	);
// 	console.log(backgroundColor);
// 	// @ts-expect-error: Typescript can not infer correct types from RegEx match
// 	const [lightness] = backgroundColor.match(/\d+(\.\d+)?/g).map(Number);
// 	console.log("🚀 ~ adjustFontColor ~ lightness:", lightness);
// 	const ratio =
// 		(lightness > 0.03928
// 			? ((lightness + 0.055) / 1.055) ** 2.4
// 			: lightness / 100 / 12.92) * 10;
// 	console.log("🚀 ~ adjustFontColor ~ ratio:", ratio);
// 	if (ratio <= 4.5) {
// 		element.style.color =
// 			"color-mix(in oklab, hsl(var(--_private-color)), white 100%)";
// 	} else {
// 		element.style.color =
// 			"color-mix(in oklab, hsl(var(--_private-color)), black 55%)";
// 		// 		change % value to lower on black to change HUE for text eg. `black 55%`
// 	}
// }

// export default function contrastChecker(element: HTMLElement | null): void {
// 	console.log("🚀 ~ contrastChecker ~ element:", element)
// 	if (!element) return;

// 	try {
// 		const backgroundColor = getComputedStyle(element).getPropertyValue('background-color');
// 		// console.log(" contrastChecker ~ backgroundColor:", backgroundColor);
// 		if (!backgroundColor) return;

// 		const color = parseColor(backgroundColor);
// 		// console.log(" contrastChecker ~ color:", color);
// 		if (!color) return;

// 		const lch = rgbToLch(color);
// 		const lightness = lch[0];
// 		const ratio = calculateContrastRatio(lightness);

// 		if (ratio >= 4.5) {
// 			element.style.color = 'white';
// 		} else {
// 			element.style.color = 'black';
// 		}
// 	} catch (error) {
// 		console.error('contrastChecker error:', error);
// 	}
// }

// function parseColor(color: string): [number, number, number] | null {
// 	const match = color.match(/^rgba?\((\d+), (\d+), (\d+)(, (\d+(?:\.\d+)?))?\)$/);
// 	if (match) {
// 		const [_, r, g, b, a] = match;
// 		const alpha = a ? parseFloat(a) : 1;
// 		if (alpha === 1) {
// 			return [parseInt(r), parseInt(g), parseInt(b)];
// 		}
// 	}
// 	return null;
// }

// function rgbToLch([r, g, b]: [number, number, number]): [number, number, number] {
// 	const xyz = [
// 		r * 0.4124 + g * 0.3576 + b * 0.1805,
// 		r * 0.2126 + g * 0.7152 + b * 0.0722,
// 		r * 0.0193 + g * 0.1192 + b * 0.9505
// 	];
// 	const x = xyz[0] / 95.047;
// 	const y = xyz[1] / 100;
// 	const z = xyz[2] / 108.883;
// 	const l = 116 * Math.pow(y, 1 / 3) - 16;
// 	const c = 500 * (Math.pow(x, 1 / 3) - Math.pow(y, 1 / 3));
// 	const h = Math.atan2(z, x) * (180 / Math.PI);
// 	return [l, c, h];
// }

// function calculateContrastRatio(lightness: number): number {
// 	const normalizedLightness = (lightness + 16) / 116;
// 	const srgbWhite = [100, 0, 0];
// 	const srgbWhiteLch = rgbToLch(srgbWhite);
// 	const referenceLightness = srgbWhiteLch[0];
// 	const deltaL = Math.abs(normalizedLightness - referenceLightness);
// 	const luminance =
// 		normalizedLightness <= 0.03928
// 			? normalizedLightness / 12.92
// 			: Math.pow((normalizedLightness + 0.055) / 1.055, 2.4);
// 	const contrastRatio = (luminance + 0.05) / (referenceLightness + 0.05);
// 	return deltaL > 0.05 ? luminance / referenceLightness : contrastRatio;
// }

export default function contrastChecker(elm: HTMLElement) {
	// const element = event.currentTarget as HTMLElement;
	// console.log("🚀 ~ contrastChecker ~ element:", event)
	// if (!element) return;
	// console.log(element);
	// if (!element) return; // add null check to prevent error

	// TODO: check alpha chanel to prevent color adjusting as layer under btn or other elements wll cause false results
	// The alpha channel has to be 1 to be able calculate correct contrast value.
	const bgOklab = getComputedStyle(elm).getPropertyValue('background-color');
	// const fontColor = getComputedStyle(elm).getPropertyValue('color');
	console.log('🚀 ~ contrastChecker ~ BG - FONT:', bgOklab);
	// if (!backgroundColor || !fontColor) return;
oklabToRgb(bgOklab);
	// @ts-expect-error: Typescript can not infer correct types from RegEx match
	// const [bgl] = backgroundColor.match(/\d+(\.\d+)?/g).map(Number);
	// const [ftl] = fontColor.match(/\d+(\.\d+)?/g).map(Number);
	// console.log('🚀 ~ contrastChecker ~ BG-Lightness:', bgl);

	// const ratio = (bgl > 0.03928 ? ((bgl + 0.055) / 1.055) ** 2.4 : bgl / 100 / 12.92) * 10;
	// console.log('🚀 ~ adjustFontColor ~ ratio:', Number(ratio.toFixed(3)));
	// if (ratio >= 4.5) {
	// 	elm.style.color = 'color-mix(in oklab, hsl(var(--_private-color)), black 90%)';
	// } else {
	// 	elm.style.color = 'color-mix(in oklab, hsl(var(--_private-color)), white 90%)';
	// }
	// if (l > 0.55) {
	// 	element.style.color = 'color-mix(in oklab, hsl(var(--_private-color)), white 90%)';
	// } else {
	// 	element.style.color = 'color-mix(in oklab, hsl(var(--_private-color)), black 80%)';
	// }
}


function oklabToRgb(oklabString : string) {
	// Check if the input is valid
	if (!oklabString || typeof oklabString !== 'string') {
		throw new Error('Invalid OKLab color string');
	}

	const { okl, oka, okb } = parseOklabString(oklabString);
	
	// Check if the OKLab values are valid
	if (typeof okl !== 'number' || typeof oka !== 'number' || typeof okb !== 'number') {
		throw new Error('Invalid OKLab color values');
	}
	// Convert OKLab to linear RGB
	const l_ = okl + 0.3963377774 * oka + 0.2158037573 * okb;
	const m_ = okl - 0.1055613458 * oka - 0.0638541728 * okb;
	const s_ = okl - 0.0894841775 * oka - 1.291485548 * okb;

	// Convert OKLab to linear RGB
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

	return {
		r: Math.round(toSrgb(r) * 255),
		g: Math.round(toSrgb(g) * 255),
		b: Math.round(toSrgb(b) * 255)
	};
}

function parseOklabString(oklabString) {
	// Use a regular expression to extract the numbers
	const regex = /oklab\(([^)]+)\)/;
	const match = oklabString.match(regex);

	if (match) {
		// Split the matched string by spaces to get individual number strings
		const numbers = match[1].split(' ').map(Number);

		// Create an object with the extracted numbers
		const oklabObject = {
			okl: numbers[0],
			oka: numbers[1],
			okb: numbers[2]
		};

		return oklabObject;
	} else {
		throw new Error('Invalid OKLab string format');
	}
}
// Example usage
// const oklabColor = { l: 0.5, a: 0.1, b: 0.2 };
// const rgbFromOklab = oklabToRgb(oklabColor);
// console.log('RGB from OKLab:', rgbFromOklab);

	// math floor 3decimals
	// const l = Math.min(bgl, ftl) - Math.max(bgl, ftl);
	// console.log("🚀 ~ contrastChecker ~ MIN:", Math.min(bgl, ftl))
	// console.log("🚀 ~ contrastChecker ~ MAX:", Math.max(bgl, ftl))
	// console.log('🚀 ~ contrastChecker ~ l:', l);
	// const ratio2 = Math.max(bgl, ftl) / Math.min(bgl, ftl);

// }
// import chroma from 'chroma-js';
// export default function contrastCheckerChroma(element: HTMLElement) {
// 	if (!element) return;

// 	const backgroundColor = getComputedStyle(element).getPropertyValue('background-color') as string;
// 	if (!backgroundColor) return;

// 	const color = chroma(backgroundColor);
// 	if (!color.isValid()) return;

// 	const lightness = color.get('lch.l');
// 	const ratio = chroma.contrast(color, '#FFFFFF') || 0;

// 	if (ratio >= 4.5) {
// 		element.style.color = 'color-mix(in oklab, hsl(var(--_private-color)), white 80%)';
// 	} else {
// 		element.style.color = 'color-mix(in oklab, hsl(var(--_private-color)), black 80%)';
// 	}
// }

// TODO: get color of background (L1) and color of fonts (L2) and check the contrast ratio

// function getContrastRatio(l1: number, l2: number) {
// 	console.log('firstColor', l1, 'secondColor', l2);

// 	const lighter = Math.max(l1, l2);
// 	const darker = Math.min(l1, l2);
// 	return (lighter + 0.05) / (darker + 0.05);
// }

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

// /**
//  * Adjusts the font color of an HTML element based on its background color.
//  * @param element - The HTML element whose font color needs to be adjusted.
//  */
// export default function adjustFontColor(element: HTMLElement): void {
// 	if (!element) return;

// 	const backgroundColor: RegExpMatchArray | [] =
// 		getComputedStyle(element).backgroundColor.match(/\d+(?:\.\d+)?/g) || [];
// 	const fontColor: RegExpMatchArray | [] =
// 		getComputedStyle(element).color.match(/\d+(?:\.\d+)?/g) || [];

// 	const backgroundLuminosity = backgroundColor.map(Number)[0];
// 	const fontLuminosity = fontColor.map(Number)[0];

// 	const contrastRatio = getContrastRatio(backgroundLuminosity, fontLuminosity);

// 	const fontColorResult =
// 		contrastRatio >= 4.5
// 			? 'color-mix(in oklch, hsl(var(--_private-color)), black 90%)'
// 			: 'color-mix(in oklch, hsl(var(--_private-color)), white 95%)';

// 	// element.style.color = 'black';
// 	element.style.color = fontColorResult;
// }
