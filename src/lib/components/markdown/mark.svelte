<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['mark'] & {
		children: Snippet;
	};

	let { children, class: className, ...props }: Props = $props();
</script>

<mark
	class={[
		'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100',
		'rounded px-1 py-0.5',
		'border-b border-gray-300 dark:border-gray-700',
		className
	]}
	{...props}
>
	{@render children()}
</mark>
