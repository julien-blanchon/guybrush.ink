<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['ol'] & {
		children: Snippet;
	};

	let { children, class: className, ...props }: Props = $props();
</script>

<ol
	{...props}
	class={[
		'my-6 ml-4 list-decimal space-y-2 text-gray-700 dark:text-gray-300',
		'marker:font-medium marker:text-gray-500 dark:marker:text-gray-400',
		className
	]}
>
	{@render children()}
</ol>
