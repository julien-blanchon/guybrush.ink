<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['h6'] & {
		children: Snippet;
	};

	let { children, class: className, ...props }: Props = $props();
</script>

<h6
	class={[
		'group/title',
		'mt-4 mb-2 scroll-m-20 text-base font-medium text-gray-900 dark:text-white',
		'leading-snug',
		'relative before:mr-2 before:text-xs before:text-gray-400 before:content-["######"] dark:before:text-gray-500',
		className
	]}
	{...props}
>
	{@render children()}
</h6>
