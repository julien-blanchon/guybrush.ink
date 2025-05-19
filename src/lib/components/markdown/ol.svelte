<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['ol'] & {
		children: Snippet;
	};

	let { children, ...props }: Props = $props();
</script>

<ol {...props}>{@render children()}</ol>
