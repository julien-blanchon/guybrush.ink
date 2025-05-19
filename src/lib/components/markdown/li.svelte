<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['li'] & {
		children?: Snippet;
	};

	let { children, ...props }: Props = $props();
</script>

<li {...props}>{@render children?.()}</li>
