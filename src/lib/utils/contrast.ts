/**
 * Adjusts the font color of an HTML element based on its background color.
 * @param element - The HTML element whose font color needs to be adjusted.
 */
export default function adjustFontColor(elm: HTMLElement) {
	if (!elm) return;
	// get elm:hover styles

	async function changeColor() {
		//  set time
		const time = 100;

		//  wait for color change and take new color
		await new Promise((resolve) => setTimeout(resolve, time));
	
		// 2. set transition time
		elm.style.setProperty('--_transitionTime', time + 'ms');

		// 3. get backgroundcolor
		const bgColor = getComputedStyle(elm).backgroundColor.match(/\d+(?:\.\d+)?/g) || [];
		
		// if bgColor.length !== 3 eg. transparent stop process and return
		if (bgColor.length !== 3) {
			return;
		}

		// 4. convert oklab to rgb
		const bgRgb = oklabToRgb(bgColor.map(Number));
		// const ftRgb = oklabToRgb(fontColor.map(Number));

		// 5. get luminance
		const bgLuminance = getLuminance(bgRgb).toFixed(3);
		// const ftLuminance = getLuminance(ftRgb).toFixed(3);

		// 4. calculate contrast ratio
		const ratio =
			(+bgLuminance > 0.03928
				? ((+bgLuminance + 0.055) / 1.055) ** 2.4
				: +bgLuminance / 100 / 12.92) * 10;
		if (ratio >= 4.5) {
			elm.style.color = 'color-mix(in oklab, hsl(var(--_private-color)) 45%, hsl(0, 0%, 0%) )';
			elm.style.transition =
				'background-color var(--_transitionTime) ease-in-out, color var(--_transitionTime) linear';
		} else {
			elm.style.color = 'color-mix(in oklab, hsl(var(--_private-color)) 5% , hsl(0, 0%, 100%) )';
			elm.style.transition =
				'background-color var(--_transitionTime) ease-in-out, color var(--_transitionTime) linear';
		}
		//  add event listeners
		elm.addEventListener('mouseenter', changeColor);
		elm.addEventListener('mouseleave', changeColor);
	}

	changeColor();
}

/**
 * Converts an OKLab color string to RGB color object.
 * @param oklabArray - The OKLab color array .
 * @returns An object with RGB color values.
 * @throws {Error} If the input is not a valid OKLab color string or if the OKLab color values are invalid.
 */
function oklabToRgb(oklabArray: number[]) {
	console.log('🚀 ~ oklabToRgb ~ oklabArray:', oklabArray);

	// Check if the color is in OKLab format

	// if oklabArray.length !== 3 stop process and return
	// if (oklabArray.length !== 3) {
	// 	return;
	// }

	if (oklabArray.length !== 3) {
		throw new Error('Invalid OKLab color: Expected 3 values');
	}

	// okLab values should be within specific ranges
	const [okl, oka, okb] = oklabArray;

	// Check if the OKLab values are valid
	if (typeof okl !== 'number' || typeof oka !== 'number' || typeof okb !== 'number') {
		throw new Error('Invalid oklab color values');
	}

	if (okl < 0 || okl > 1 || oka < -0.4 || oka > 0.4 || okb < -0.4 || okb > 0.4) {
		throw new Error('Invalid OKLab color: Values out of expected range');
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
