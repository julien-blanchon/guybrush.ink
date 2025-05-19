<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['mark'] & {
		children: Snippet;
	};

	let { children, ...props }: Props = $props();
</script>

<mark {...props}>{@render children()}</mark>
