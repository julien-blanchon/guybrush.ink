<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['thead'] & {
		children?: Snippet;
	};

	let { children, class: className, ...props }: Props = $props();
</script>

<thead
	{...props}
	class={[
		'bg-gray-50 dark:bg-gray-800',
		'border-b border-gray-200 dark:border-gray-700',
		className
	]}>{@render children?.()}</thead
>
