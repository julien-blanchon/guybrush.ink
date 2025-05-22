<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['h4'] & {
		children: Snippet;
	};

	let { children, class: className, ...props }: Props = $props();
</script>

<h4
	class={[
		'group/title',
		'mt-8 mb-3 scroll-m-20 text-xl font-medium text-gray-900 dark:text-white',
		'leading-snug',
		'relative before:mr-2 before:text-sm before:text-gray-400 before:content-["####"] dark:before:text-gray-500',
		className
	]}
	{...props}
>
	{@render children()}
</h4>
