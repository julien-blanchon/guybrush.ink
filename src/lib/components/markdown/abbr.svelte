<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import Hover from '$lib/components/ui/hover/hover.svelte';

	type Props = SvelteHTMLElements['abbr'] & {
		children: Snippet;
		title?: string;
	};

	let { children, title, ...props }: Props = $props();
</script>

<Hover maxWidth={800} delta={25} delay={100} duration={200} width={400}>
	{#snippet hover()}
		<div class="h-full w-full rounded-md bg-white p-3 shadow-md dark:bg-gray-800">
			{title}
		</div>
	{/snippet}
	{#snippet button()}
		<abbr {...props} {title} class="pointer-events-none cursor-help text-gray-500"
			>{@render children()}</abbr
		>
	{/snippet}
</Hover>
