<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['h3'] & {
		children: Snippet;
	};

	let { children, class: className, ...props }: Props = $props();
</script>

<h3
	class={[
		'group/title',
		'mt-10 mb-3 scroll-m-20 text-2xl font-semibold text-gray-900 dark:text-white',
		'leading-tight',
		'relative before:mr-2 before:text-gray-400 before:content-["###"] dark:before:text-gray-500',
		className
	]}
	{...props}
>
	{@render children()}
</h3>
