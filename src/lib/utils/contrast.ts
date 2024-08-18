/**
 * Adjusts the font color of an HTML element based on its background color.
 * @param element - The HTML element whose font color needs to be adjusted.
 */
export default function adjustFontColor(element: HTMLElement): void {
	if (!element) return;

	const backgroundColor: RegExpMatchArray | [] =
		getComputedStyle(element).backgroundColor.match(/\d+(?:\.\d+)?/g) || [];
	const fontColor: RegExpMatchArray | [] =
		getComputedStyle(element).color.match(/\d+(?:\.\d+)?/g) || [];

	const backgroundLuminosity = backgroundColor.map(Number)[0];
	const fontLuminosity = fontColor.map(Number)[0];

	const contrastRatio = getContrastRatio(backgroundLuminosity, fontLuminosity);

	const fontColorResult =
		contrastRatio >= 4.5
			? 'color-mix(in oklch, hsl(var(--_private-color)), black 90%)'
			: 'color-mix(in oklch, hsl(var(--_private-color)), white 95%)';

	// element.style.color = 'black';
	element.style.color = fontColorResult;
}

function getContrastRatio(l1: number, l2: number) {
	// console.log(l1, l2);

	let y1 = Math.max(l1, l2);
	let y2 = Math.min(l1, l2);
	// console.log(y1, y2);

	if (y2 > y1) {
		[y1, y2] = [y2, y1];
	}
	return +((y1 - y2) * 10).toFixed(2);
}
// export default function adjustFontColor(element: HTMLElement) {

// }
