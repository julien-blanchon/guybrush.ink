<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['h2'] & {
		children: Snippet;
	};

	let { children, class: className, ...props }: Props = $props();
</script>

<h2 class={['group/title', className]} {...props}>
	{@render children()}
</h2>
