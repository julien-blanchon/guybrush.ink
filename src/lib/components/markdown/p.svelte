<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['p'] & {
		children: Snippet;
	};

	let { children, class: className, ...props }: Props = $props();
</script>

<p
	{...props}
	class={[
		'mb-3 text-base leading-relaxed text-gray-700 last:mb-0 dark:text-gray-300',
		'tracking-normal',
		'text-pretty hyphens-auto',
		className
	]}
>
	{@render children()}
</p>
