<script lang="ts">
	import contrastChecker from '$lib/utils/contrastChecker';
	import { onMount, tick, type Snippet } from 'svelte';
	type Props = {
		type?: string;
		design: string;
		children: Snippet;
		onclick: () => void;
		'data-colorcheck': boolean;
	};
	export const { design, children, onclick }: Props = $props();
	function handleMouseEnter(elm: HTMLElement) {
		if (elm) {
			contrastChecker(elm);
		}
	}

	function handleMouseLeave(elm: HTMLElement) {
		if (elm) {
			contrastChecker(elm);
		}
	}
	let elm: HTMLElement | undefined = undefined;
	onMount(async () => {
		await tick();
		if (elm) {
			contrastChecker(elm);
		}
	});
</script>

<button
	class={design}
	tabindex="0"
	bind:this={elm}
	{onclick}
	onmouseenter={(event) => handleMouseEnter(event.currentTarget)}
	onmouseleave={(event) => handleMouseLeave(event.currentTarget )}
	>{@render (children as Snippet)()}</button
>

<style>
	button {
		/* private color contains --item-color that is passed in from props and fallback - the main color */
		/* current fallback is se to neutral color but i can be set eg. to --hsl-primary that is passed from app.css*/
		/* --_private-color: var(--item-color, var(--hsl-primary)); */

		--_private-color: var(--item-color, var(--hsl-primary));
		cursor: pointer;
		/* color: color-mix(in oklab, hsl(var(--_private-color)), white 80%); */
		background: color-mix(in oklab, hsl(var(--_private-color)), white 3%);
		padding: 0.7rem 1.1rem; /* default size */
		border: none;
		border-radius: 0.25rem;
		font-size: var(--xs);
		letter-spacing: 0.02rem;
		text-transform: uppercase;
		font-family: var(--fw-bold);
		transition: all 0.1s ease-in-out;

		&:hover {
			background: color-mix(in oklab, hsl(var(--_private-color)), black 50%);
			color: color-mix(in oklab, hsl(var(--_private-color)), white 90%);
		}

		&:focus,
		&:focus-visible {
			outline: 1px solid hsl(var(--_private-color));
			outline-offset: 2px;
			outline-width: 2px;
		}

		&.outline {
			border: 1px solid color-mix(in oklab, hsl(var(--_private-color)), white 30%);
			color: color-mix(in oklab, hsl(var(--_private-color)), black 10%);
			background: transparent;
			&:hover {
				background: color-mix(in oklab, hsl(var(--_private-color)), white 80%);
				color: color-mix(in oklab, hsl(var(--_private-color)), black 30%);
			}
		}
		/* TODO: delete or add variant classes for different sizes */
		/* &.lg {
			font-size: var(--md);
			letter-spacing: -0.02rem;
			padding: 1.2rem 3.2rem;
		} */
		/* &.sm {
			padding: 0.6rem .9rem;
			font-size: var(--xxs);
		} */
		/* there are 3 sizes at this moment - xs, md, default*/

		/* TODO: unified sizes for all buttons and badges - xs, md & default*/
		&.md {
			font-size: var(--xxs);
			letter-spacing: -0.02rem;
			padding: 0.55rem 0.9rem;
		}
		&.xs {
			padding: 0.25rem 0.5rem;
			font-size: var(--mini);
		}
		&.block {
			display: block;
			width: 100%;
		}
		&.rounded {
			border-radius: 0.5rem;
		}

		&.pill {
			border-radius: 100px;
		}
	}

	/* Colors - can be used in Global app.css instead of here*/
	.primary {
		--item-color: var(--hsl-primary);
	}

	.secondary {
		--item-color: var(--hsl-secondary);
	}
	.red {
		--item-color: var(--hsl-red);
	}

	.orange {
		--item-color: var(--hsl-orange);
	}

	.yellow {
		--item-color: var(--hsl-gold);
	}

	.green {
		--item-color: var(--hsl-green);
	}
	.blue {
		--item-color: var(--hsl-blue);
	}

	.purple {
		--item-color: var(--hsl-purple);
	}

	.cyan {
		--item-color: var(--hsl-cyan);
	}

	.pink {
		--item-color: var(--hsl-pink);
	}

	.platinum {
		--item-color: var(--hsl-platinum);
	}

	.steel {
		--item-color: var(--hsl-steel);
	}

	.black {
		/* background: hsl(203, 50%, 47%); */
		--item-color: var(--hsl-black-matte);
	}
</style>
