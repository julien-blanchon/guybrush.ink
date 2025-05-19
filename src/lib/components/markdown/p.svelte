<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['p'] & {
		children: Snippet;
	};

	let { children, ...props }: Props = $props();
</script>

<p {...props}>{@render children()}</p>
