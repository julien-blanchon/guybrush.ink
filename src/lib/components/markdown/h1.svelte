<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['h1'] & {
		children: Snippet;
	};

	let { children, class: className, ...props }: Props = $props();
</script>

<h1
	class={[
		'group/title',
		'mt-14 mb-6 scroll-m-20 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white',
		'border-b-2 border-gray-200 pb-2 dark:border-gray-700',
		'leading-tight',
		'relative before:mr-2 before:text-gray-400 before:content-["#"] dark:before:text-gray-500',
		className
	]}
	{...props}
>
	{@render children()}
</h1>
