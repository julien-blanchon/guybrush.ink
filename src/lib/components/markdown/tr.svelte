<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['tr'] & {
		children: Snippet;
	};

	let { children, ...props }: Props = $props();
</script>

<tr {...props}>{@render children()}</tr>
