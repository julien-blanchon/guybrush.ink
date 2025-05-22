<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['a'] & {
		children: Snippet;
	};

	let { children, class: className, href, ...props }: Props = $props();

	const ariaHidden = props['aria-hidden'];

	const colorPalette = [
		'decoration-gray-500 hover:text-gray-800 dark:hover:text-gray-200',
		'decoration-gray-500 hover:text-gray-800 dark:hover:text-gray-200',
		'decoration-gray-500 hover:text-gray-800 dark:hover:text-gray-200',
		'decoration-gray-500 hover:text-gray-800 dark:hover:text-gray-200',
		'decoration-gray-500 hover:text-gray-800 dark:hover:text-gray-200',
		'decoration-gray-500 hover:text-gray-800 dark:hover:text-gray-200',
		'decoration-gray-500 hover:text-gray-800 dark:hover:text-gray-200',
		'decoration-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
	];

	// Hash function to pick a color from the palette using DJB2
	function getColor(text: string) {
		let hash = 5381;
		for (let i = 0; i < text.length; i++) {
			hash = (hash << 5) + hash + text.charCodeAt(i); // hash * 33 + c
		}
		const idx = Math.abs(hash) % colorPalette.length;
		return colorPalette[idx];
	}

	const internal = $derived(href && (href.startsWith('/') || href.startsWith('#')));
</script>

{#if ariaHidden}
	<a {...props} class={className} {href}>{@render children()}</a>
{:else if internal}
	<a
		{...props}
		class={[
			'font-medium text-gray-700 dark:text-gray-300',
			'hover:text-gray-900 hover:underline hover:decoration-2 hover:underline-offset-2 dark:hover:text-gray-100',
			'transition-colors duration-200',
			className
		]}
		{href}
	>
		{@render children()}
	</a>
{:else}
	<a
		{...props}
		class={[
			'font-medium break-keep underline decoration-dotted decoration-[1px] underline-offset-2',
			'transition-all duration-200 ease-in-out',
			'hover:decoration-2',
			'after:ml-1 after:inline-block after:rotate-0 after:align-baseline after:transition-transform after:duration-100 after:content-["↗"] hover:after:rotate-45',
			getColor(href ?? ''),
			className
		]}
		target="_blank"
		rel="noopener noreferrer"
	>
		{@render children()}
	</a>
{/if}
