<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['ul'] & {
		children: Snippet;
	};

	let { children, ...props }: Props = $props();
</script>

<ul {...props}>{@render children()}</ul>
