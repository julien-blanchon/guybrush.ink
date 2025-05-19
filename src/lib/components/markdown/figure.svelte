<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['figure'] & {
		children: Snippet;
	};

	let { children, ...props }: Props = $props();
</script>

<figure {...props}>{@render children()}</figure>
