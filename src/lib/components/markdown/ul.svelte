<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['ul'] & {
		children: Snippet;
	};

	let { children, class: className, ...props }: Props = $props();
</script>

<ul
	{...props}
	class={[
		'my-1 ml-4 list-disc space-y-2 text-gray-700 dark:text-gray-300',
		'marker:text-gray-500 dark:marker:text-gray-400',
		className
	]}
>
	{@render children()}
</ul>
