/**
 * Adjusts the font color of an HTML element based on its background color.
 * @param element - The HTML element whose font color needs to be adjusted.
 */
export default function adjustFontColor(element: HTMLElement) {
	if (!element) return;
	// 1. get elements background color
	const bgColor = getComputedStyle(element).backgroundColor.match(/\d+(?:\.\d+)?/g) || [];
	// console.log('🚀 ~ adjustFontColor ~ bgColor:', bgColor); // 1-white 0-black
	const fontColor = getComputedStyle(element).color.match(/\d+(?:\.\d+)?/g) || [];
	// console.log("🚀 ~ adjustFontColor ~ fontColor:", fontColor)

	// 2. convert to number array
	const bgLuminosity: number = bgColor.map(Number)[0] ;
	// console.log("🚀 ~ adjustFontColor ~ bgClrVal:", bgClrVal)
	const ftLuminosity: number = fontColor.map(Number)[0]; ;
	// console.log("🚀 ~ adjustFontColor ~ ftClrVal:", ftClrVal)

	// 3. convert oklab to rgb
	// const bgRGB = oklabToRgb(bgClrVal);
	// const ftRGB = oklabToRgb(ftClrVal);

	// 4. get contrast ratio
	const ratio = getContrastRatio(Math.max(bgLuminosity, 0), Math.max(ftLuminosity, 0));
	// console.log("🚀 ~ adjustFontColor ~ ratio:", ratio)
	
	const fontColorResult = ratio >= 1.94 ? 'white' : 'black'; // Adjust the font color based on the contrast result
	console.log(
		'🚀 ~ adjustFontColor ~ fontColorResult:',
		bgLuminosity,
		ftLuminosity,
		ratio,
		fontColorResult
	);
}

// TODO: get color of background (L1) and color of fonts (L2) and check the contrast ratio

function getContrastRatio(l1: number, l2: number) {
	// console.log(l1, l2);

	let y1 = Math.max(l1, l2);
	let y2 = Math.min(l1, l2);

	if(y2 > y1){
		[y1, y2] = [y2, y1];
	}
	return (y1 + 0.05) / (y2 + 0.05);
}

// getContrastRatio(0.652, 0.179);
