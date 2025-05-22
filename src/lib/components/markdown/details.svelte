<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['details'] & {
		children: Snippet;
	};

	let { children, class: className, ...props }: Props = $props();
</script>

<details
	class={[
		'my-6 rounded-lg border border-gray-200 dark:border-gray-700',
		'bg-gray-50 dark:bg-gray-800/50',
		'shadow-sm',
		'group/details',
		className
	]}
	{...props}
>
	{@render children()}
</details>
