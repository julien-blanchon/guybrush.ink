<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['pre'] & {
		children: Snippet;
	};

	let { children, ...props }: Props = $props();
</script>

<pre {...props}>{@render children()}</pre>
