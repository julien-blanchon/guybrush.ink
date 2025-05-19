<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['table'] & {
		children: Snippet;
	};

	let { children, ...props }: Props = $props();
</script>

<div class="relative overflow-x-auto sm:rounded-lg">
	<table class="w-full text-left text-sm rtl:text-right" {...props}>{@render children()}</table>
</div>
