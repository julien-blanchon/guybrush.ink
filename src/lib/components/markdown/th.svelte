<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['th'] & {
		children?: Snippet;
	};

	let { children, class: className, ...props }: Props = $props();
</script>

<th
	{...props}
	scope="col"
	class={[
		'px-6 py-3.5 text-start text-xs font-semibold tracking-wider text-gray-600 uppercase dark:text-gray-300',
		'bg-gray-50 dark:bg-gray-800',
		'border-b border-gray-200 dark:border-gray-700',
		className
	]}>{@render children?.()}</th
>
