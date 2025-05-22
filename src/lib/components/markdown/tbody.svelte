<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['tbody'] & {
		children?: Snippet;
	};

	let { children, class: className, ...props }: Props = $props();
</script>

<tbody
	{...props}
	class={[
		'divide-y divide-gray-100 dark:divide-gray-800',
		'bg-white dark:bg-gray-800/90',
		className
	]}>{@render children?.()}</tbody
>
