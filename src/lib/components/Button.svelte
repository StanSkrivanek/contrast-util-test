<script lang="ts">
	import adjustFontColor from '$lib/utils/contrast';
	import { type Snippet } from 'svelte';
	type Props = {
		type?: string;
		design: string;
		children: Snippet;
		onclick: () => void;
		'data-colorcheck': boolean;
	};
	export const { design, children, onclick }: Props = $props();

	// let btnElm = null as HTMLElement | null;
</script>

<button class={design} tabindex="0" use:adjustFontColor onclick={() => onclick()}
	>{@render (children as Snippet)()}
</button>

<style>
	button {
		/* private color contains --item-color that is passed in from props and fallback - the main color */
		/* current fallback is se to neutral color but i can be set eg. to --hsl-primary that is passed from app.css*/
		/* --_private-color: var(--item-color, var(--hsl-primary)); */

		--_private-color: var(--item-color, var(--hsl-primary));
		cursor: pointer;
		color: color-mix(in oklab, hsl(var(--_private-color)) 25%, hsl(0, 0%, 0%));
		background: color-mix(in oklab, hsl(var(--_private-color)) 90%, hsl(0, 0%, 100%));
		padding: 0.7rem 1.1rem; /* default size */
		border: none;
		border-radius: 0.25rem;
		font-size: var(--xs);
		letter-spacing: 0.02rem;
		text-transform: uppercase;
		font-family: var(--fw-bold);
		will-change: transition;
		&:hover {
			background-color: color-mix(in oklab, hsl(var(--_private-color)) 75%, hsl(0, 0%, 0%) );
		}

		&:focus-visible {
			outline: 1px solid hsl(var(--_private-color));
			outline-offset: 2px;
			outline-width: 2px;
		}

		&.outline {
			border: 1px solid color-mix(in oklab, hsl(var(--_private-color)) 70%, hsl(0, 0%, 100%));
			color: color-mix(in oklab, hsl(var(--_private-color)) 90%, hsl(0, 0%, 0%) );
			background: transparent;
			&:hover {
				background: color-mix(in oklab, hsl(var(--_private-color)) 20%, hsl(0, 0%, 100%));
				color: color-mix(in oklab, hsl(var(--_private-color)) 70%, hsl(0, 0%, 0%) );
			}
		}
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
		/*--item-color: var(--hsl-primary);*/
		--item-color: var(--hsl-black-matte);
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

	.gold {
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
	.white {
		/* --item-color: hsl(203, 50%, 47%); */
		--item-color: var(--hsl-offwhite);
	}
</style>
