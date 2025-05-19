<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['h5'] & {
		children: Snippet;
	};

	let { children, class: className, ...props }: Props = $props();
</script>

<h5 class={['group/title', className]} {...props}>{@render children()}</h5>
