<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['a'] & {
		children: Snippet;
	};

	let { children, class: className, href, ...props }: Props = $props();

	const ariaHidden = props['aria-hidden'];

	const colorPalette = [
		'text-blue-700 decoration-blue-500/70 hover:text-blue-900 dark:text-blue-500 dark:decoration-blue-600/50 dark:hover:text-blue-400',
		'text-emerald-700 decoration-emerald-500/70 hover:text-emerald-900 dark:text-emerald-500 dark:decoration-emerald-600/50 dark:hover:text-emerald-400',
		'text-violet-700 decoration-violet-500/70 hover:text-violet-900 dark:text-violet-500 dark:decoration-violet-600/50 dark:hover:text-violet-400',
		'text-amber-700 decoration-amber-500/70 hover:text-amber-900 dark:text-amber-500 dark:decoration-amber-600/50 dark:hover:text-amber-400',
		'text-rose-700 decoration-rose-500/70 hover:text-rose-900 dark:text-rose-500 dark:decoration-rose-600/50 dark:hover:text-rose-400',
		'text-teal-700 decoration-teal-500/70 hover:text-teal-900 dark:text-teal-500 dark:decoration-teal-600/50 dark:hover:text-teal-400',
		'text-slate-700 decoration-slate-500/70 hover:text-slate-900 dark:text-slate-400 dark:decoration-slate-500/50 dark:hover:text-slate-300',
		'text-red-700 decoration-red-500/70 hover:text-red-900 dark:text-red-500 dark:decoration-red-600/50 dark:hover:text-red-400',
		'text-sky-700 decoration-sky-500/70 hover:text-sky-900 dark:text-sky-500 dark:decoration-sky-600/50 dark:hover:text-sky-400',
		'text-orange-700 decoration-orange-500/70 hover:text-orange-900 dark:text-orange-500 dark:decoration-orange-600/50 dark:hover:text-orange-400',
		'text-lime-700 decoration-lime-500/70 hover:text-lime-900 dark:text-lime-600 dark:decoration-lime-700/50 dark:hover:text-lime-500',
		'text-stone-700 decoration-stone-500/70 hover:text-stone-900 dark:text-stone-400 dark:decoration-stone-500/50 dark:hover:text-stone-300',
		'text-cyan-700 decoration-cyan-500/70 hover:text-cyan-900 dark:text-cyan-500 dark:decoration-cyan-600/50 dark:hover:text-cyan-400',
		'text-neutral-700 decoration-neutral-500/70 hover:text-neutral-900 dark:text-neutral-400 dark:decoration-neutral-500/50 dark:hover:text-neutral-300',
		'text-indigo-700 decoration-indigo-500/70 hover:text-indigo-900 dark:text-indigo-500 dark:decoration-indigo-600/50 dark:hover:text-indigo-400',
		'text-zinc-700 decoration-zinc-500/70 hover:text-zinc-900 dark:text-zinc-400 dark:decoration-zinc-500/50 dark:hover:text-zinc-300'
	];

	function getColor(text: string) {
		if (!text) return colorPalette[0];

		// Extract domain for better distribution
		let urlPart = text;
		try {
			if (text.includes('://')) {
				const url = new URL(text);
				urlPart = url.hostname + url.pathname.split('/').slice(0, 2).join('/');
			}
		} catch (e) {
			// Use the original text if URL parsing fails
		}

		// FNV-1a hash algorithm
		const FNV_PRIME = 16777619;
		const OFFSET_BASIS = 2166136261;

		let hash = OFFSET_BASIS;
		for (let i = 0; i < urlPart.length; i++) {
			hash ^= urlPart.charCodeAt(i);
			hash = Math.imul(hash, FNV_PRIME);
		}

		return colorPalette[Math.abs(hash) % colorPalette.length];
	}

	const internal = $derived(href && (href.startsWith('/') || href.startsWith('#')));
</script>

{#if ariaHidden}
	<a {...props} class={className} {href}>{@render children()}</a>
{:else if internal}
	<a
		{...props}
		class={[
			'font-medium text-blue-700 dark:text-blue-500',
			'hover:text-blue-900 hover:underline hover:decoration-2 hover:underline-offset-2 dark:hover:text-blue-400',
			'transition-colors duration-200',
			'cursor-pointer focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none focus-visible:ring-2',
			'rounded outline-none',
			className
		]}
		{href}
		aria-current={href === window?.location?.pathname ? 'page' : undefined}
	>
		{@render children()}
	</a>
{:else}
	<a
		{...props}
		class={[
			'font-medium break-keep underline decoration-solid decoration-[1px] underline-offset-2',
			'transition-all duration-200 ease-in-out',
			'hover:decoration-2',
			'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
			'rounded outline-none',
			'after:ml-1 after:inline-block after:rotate-0 after:align-baseline after:transition-transform after:duration-100 after:content-["↗"] hover:after:rotate-45',
			getColor(href ?? ''),
			className
		]}
		target="_blank"
		rel="noopener noreferrer"
		aria-label={`Visit ${href} (opens in a new tab)`}
	>
		{@render children()}
	</a>
{/if}
