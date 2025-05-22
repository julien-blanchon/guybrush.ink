<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['code'] & {
		children: Snippet;
	};

	let { children, class: className, ...props }: Props = $props();

	const isCodeblock = $derived(props['data-language'] !== undefined);
</script>

{#if isCodeblock}
	<code {...props} class={[className]}>{@render children()}</code>
{:else}
	<code
		{...props}
		class={[
			'relative rounded-md bg-gray-100 px-[0.4em] py-[0.2em] font-mono text-[0.9em] font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300',
			'before:hidden after:hidden',
			'border border-gray-200 dark:border-gray-700',
			className
		]}
	>
		{@render children()}
	</code>
{/if}
