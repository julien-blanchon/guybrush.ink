<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import Hover from '$lib/components/ui/hover/hover.svelte';

	type Props = SvelteHTMLElements['abbr'] & {
		children: Snippet;
		title?: string;
	};

	let { children, title, class: className, ...props }: Props = $props();
</script>

<Hover maxWidth={800} delta={25} delay={100} duration={200} width={400}>
	{#snippet hover()}
		<div
			class="h-full w-full rounded-md border border-gray-100 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800"
		>
			<p class="text-sm text-gray-700 dark:text-gray-300">{title}</p>
		</div>
	{/snippet}
	{#snippet button()}
		<abbr
			{...props}
			{title}
			class={[
				'pointer-events-none cursor-help',
				'text-gray-900 dark:text-gray-100',
				'border-b border-dashed border-gray-400 dark:border-gray-500',
				'hover:border-gray-600 dark:hover:border-gray-400',
				'transition-colors duration-200',
				className
			]}
		>
			{@render children()}
		</abbr>
	{/snippet}
</Hover>
