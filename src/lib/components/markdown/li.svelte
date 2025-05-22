<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['li'] & {
		children?: Snippet;
	};

	let { children, class: className, ...props }: Props = $props();
</script>

<li {...props} class={['py-1 leading-normal', 'pl-1', className]}>
	{@render children?.()}
</li>
