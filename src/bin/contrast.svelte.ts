/**
 * Adjusts the font color of an HTML element based on its background color.
 * @param element - The HTML element whose font color needs to be adjusted.
 */
export default function adjustFontColor(elm: HTMLElement) {
	if (!elm) return;

	async function changeColor() {
		//  wait for color change and take new color
		await new Promise((resolve) => setTimeout(resolve, 100));

		//  get new color
		const bgColor = getComputedStyle(elm).backgroundColor.match(/\d+(?:\.\d+)?/g) || [];

		// 2. convert oklab to rgb
		const bgRgb = oklabToRgb(bgColor.map(Number));
		// const ftRgb = oklabToRgb(fontColor.map(Number));
		
		const bgLuminance = getLuminance(bgRgb).toFixed(3);
		// const ftLuminance = getLuminance(ftRgb).toFixed(3);

		// 4. get contrast ratio
		const ratio =
			(+bgLuminance > 0.03928
				? ((+bgLuminance + 0.055) / 1.055) ** 2.4
				: +bgLuminance / 100 / 12.92) * 10;
		console.log('🚀 ~ adjustFontColor ~ ratio2:', ratio);
		if (ratio >= 4.5) {
			elm.style.color = 'color-mix(in oklab, hsl(var(--_private-color)), hsl(0, 0%, 0%) 75%)';
		} else {
			elm.style.color = 'color-mix(in oklab, hsl(var(--_private-color)) , hsl(0, 0%, 100%) 95%)';
		}
		elm.addEventListener('mouseenter', changeColor);
		elm.addEventListener('mouseleave', changeColor);
	}

	// 3.get luminance
	changeColor();
}

/**
 * Converts an OKLab color string to RGB color object.
 * @param oklabArray - The OKLab color array .
 * @returns An object with RGB color values.
 * @throws {Error} If the input is not a valid OKLab color string or if the OKLab color values are invalid.
 */
function oklabToRgb(oklabArray: number[]) {
	// console.log('🚀 ~ oklabToRgb ~ oklabArray:', oklabArray);
	// Check if the the color is in rgb or oklab

	const [okl, oka, okb] = oklabArray;
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

	return {
		r: Math.round(toSrgb(r) * 255),
		g: Math.round(toSrgb(g) * 255),
		b: Math.round(toSrgb(b) * 255)
	};
}

function getLuminance(rgb: { r: number; g: number; b: number }) {
	const R = rgb.r / 255;
	const G = rgb.g / 255;
	const B = rgb.b / 255;

	const luminance = 0.2126 * R + 0.7152 * G + 0.0722 * B;
	return luminance;
}

// function getContrastRatio(l1: number, l2: number) {
// 	// console.log(l1, l2);

// 	let y1 = Math.max(l1, l2);
// 	let y2 = Math.min(l1, l2);
// 	// console.log(y1, y2);

// 	if (y2 > y1) {
// 		[y1, y2] = [y2, y1];
// 	}
// 	return (y1 + 0.05) / (y2 + 0.05);
// }
