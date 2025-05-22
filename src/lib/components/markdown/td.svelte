<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['td'] & {
		children: Snippet;
	};

	let { children, class: className, ...props }: Props = $props();
</script>

<td
	{...props}
	class={[
		'px-6 py-4 text-sm text-gray-700 dark:text-gray-300',
		'border-b border-gray-100 dark:border-gray-800',
		'group-last/tr:border-0',
		className
	]}>{@render children()}</td
>
