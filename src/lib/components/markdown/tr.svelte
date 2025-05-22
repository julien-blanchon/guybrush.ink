<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['tr'] & {
		children: Snippet;
	};

	let { children, class: className, ...props }: Props = $props();
</script>

<tr
	{...props}
	class={[
		'group/tr',
		'hover:bg-gray-50 dark:hover:bg-gray-700/50',
		'transition-colors duration-150',
		className
	]}>{@render children()}</tr
>
