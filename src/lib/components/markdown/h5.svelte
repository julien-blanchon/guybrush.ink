<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['h5'] & {
		children: Snippet;
	};

	let { children, class: className, ...props }: Props = $props();
</script>

<h5
	class={[
		'group/title',
		'mt-6 mb-2 scroll-m-20 text-lg font-medium text-gray-900 dark:text-white',
		'leading-snug',
		'relative before:mr-2 before:text-sm before:text-gray-400 before:content-["#####"] dark:before:text-gray-500',
		className
	]}
	{...props}
>
	{@render children()}
</h5>
