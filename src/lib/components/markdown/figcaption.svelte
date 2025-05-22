<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['figcaption'] & {
		children: Snippet;
	};

	let { children, class: className, ...props }: Props = $props();
</script>

<figcaption
	class={[
		'mt-2 text-center text-sm text-gray-600 italic dark:text-gray-400',
		'mx-auto max-w-[90%]',
		className
	]}
	{...props}
>
	{@render children()}
</figcaption>
