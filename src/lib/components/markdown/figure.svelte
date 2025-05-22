<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['figure'] & {
		children: Snippet;
	};

	let { children, class: className, ...props }: Props = $props();
</script>

<figure class={['my-8', 'max-w-full', className]} {...props}>
	{@render children()}
</figure>
