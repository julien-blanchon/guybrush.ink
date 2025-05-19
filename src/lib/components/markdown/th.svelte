<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['th'] & {
		children: Snippet;
	};

	let { children, ...props }: Props = $props();
</script>

<th {...props}>{@render children()}</th>
