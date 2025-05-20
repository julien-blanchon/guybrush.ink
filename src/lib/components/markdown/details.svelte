<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['details'] & {
		children: Snippet;
	};

	let { children, ...props }: Props = $props();
</script>

<details {...props}>{@render children()}</details>
