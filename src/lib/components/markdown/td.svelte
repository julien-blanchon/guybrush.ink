<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['td'] & {
		children: Snippet;
	};

	let { children, ...props }: Props = $props();
</script>

<td {...props}>{@render children()}</td>
