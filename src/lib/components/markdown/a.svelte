<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import Hover from '../ui/hover/hover.svelte';

	type Props = SvelteHTMLElements['a'] & {
		children: Snippet;
	};

	let { children, class: className, ...props }: Props = $props();

	const ariaHidden = props['aria-hidden'];

	const colorPalette = [
		'decoration-red-500',
		'decoration-orange-500',
		'decoration-amber-500',
		'decoration-yellow-500',
		'decoration-lime-500',
		'decoration-green-500',
		'decoration-emerald-500',
		'decoration-teal-500',
		'decoration-cyan-500',
		'decoration-sky-500',
		'decoration-blue-500',
		'decoration-indigo-500',
		'decoration-violet-500',
		'decoration-purple-500',
		'decoration-fuchsia-500',
		'decoration-pink-500',
		'decoration-rose-500'
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
</script>

{#if ariaHidden}
	<a {...props} class={className}>{@render children()}</a>
{:else if props['href']?.includes('http')}
	<a
		{...props}
		class={[
			'break-keep underline decoration-solid underline-offset-1',
			'after:ml-1 after:inline-block after:rotate-0 after:align-baseline after:transition-transform after:duration-100 after:content-["↗"] hover:after:rotate-45',
			getColor(props['href'] ?? ''),
			className
		]}
		target="_blank"
	>
		{@render children()}
	</a>
{:else}
	<a {...props} class={className}>{@render children()}</a>
{/if}
