<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['h2'] & {
		children: Snippet;
	};

	let { children, class: className, ...props }: Props = $props();
</script>

<h2
	class={[
		'group/title',
		'mt-12 mb-4 scroll-m-20 text-3xl font-bold tracking-tight text-gray-900 dark:text-white',
		'leading-tight',
		'border-b border-gray-200 pb-1 dark:border-gray-700',
		'relative before:mr-2 before:text-gray-400 before:content-["##"] dark:before:text-gray-500',
		className
	]}
	{...props}
>
	{@render children()}
</h2>
