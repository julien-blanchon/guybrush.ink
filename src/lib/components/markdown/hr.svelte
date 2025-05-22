<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['hr'];

	let { class: className, ...props }: Props = $props();
</script>

<hr
	class={[
		'my-12 h-px border-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-700',
		'opacity-80',
		className
	]}
	{...props}
/>
