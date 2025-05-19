<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['h6'] & {
		children: Snippet;
	};

	let { children, class: className, ...props }: Props = $props();
</script>

<h6 class={['group/title', className]} {...props}>{@render children()}</h6>
