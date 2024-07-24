export default function contrastChecker(element: HTMLElement) {
  console.log(element);

  if (!element) return; // add null check to prevent error

  // TODO: check alpha chanel to prevent color adjusting as layer under btn or other elements wll cause false results
  // The alpha channel has to be 1 to be able calculate correct contrast value.
  const backgroundColor = getComputedStyle(element).getPropertyValue("background-color");
  console.log("🚀 ~ contrastChecker ~ backgroundColor:", backgroundColor);
  if (!backgroundColor) return;

  // @ts-expect-error: Typescript can not infer correct types from RegEx match
  const [lightness] = backgroundColor.match(/\d+(\.\d+)?/g).map(Number);
  // console.log("🚀 ~ contrastChecker ~ lightness:", lightness)
  // math floor 3decimals
  const l = Number(lightness.toFixed(3));
  // console.log("🚀 ~ contrastChecker ~ l:", l)
  const ratio = (l > 0.03928 ? ((l + 0.055) / 1.055) ** 2.4 : l / 100 / 12.92) * 10;
  console.log("🚀 ~ adjustFontColor ~ ratio:", ratio);
  if (ratio >= 4.5) {
    element.style.color = "color-mix(in oklab, hsl(var(--_private-color)), white 80%)";
  } else {
    element.style.color = "color-mix(in oklab, hsl(var(--_private-color)), black 80%)";
  }
  // }
}
