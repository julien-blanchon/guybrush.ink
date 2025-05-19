<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['button'] & {
		class?: string;
		text: string;
		language: string;
	};

	let { text, class: className, language, ...props }: Props = $props();
	let copied = $state(false);
	let timeout: ReturnType<typeof setTimeout> | null = null;

	function handleCopy() {
		navigator.clipboard.writeText(text).then(() => {
			copied = true;
			if (timeout) clearTimeout(timeout);
			timeout = setTimeout(() => (copied = false), 1200);
		});
	}

	onMount(() => {
		return () => {
			if (timeout) clearTimeout(timeout);
		};
	});
</script>

<div class={['absolute top-3 right-3 flex items-center justify-center']}>
	<!-- Copy button on hover -->
	<button
		type="button"
		class={[
			'absolute top-0 right-0 z-10',
			'flex h-8 w-8 cursor-copy items-center justify-center shadow-sm',
			'rounded-md border border-gray-300 bg-gray-200 p-1.5 text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400',
			'hover:border-gray-400 hover:bg-gray-300 hover:text-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 dark:hover:text-gray-300',
			'transition-opacity duration-300 ease-in-out',
			'opacity-0 group-hover:opacity-100'
		]}
		data-copied={copied}
		data-code={text}
		onclick={handleCopy}
		{...props}
	>
		{#if copied}
			<span class="icon-[lucide--check] size-4 text-emerald-500 dark:text-emerald-400" in:fade
			></span>
		{:else}
			<span class="icon-[lucide--clipboard] size-4 text-stone-600 dark:text-gray-400" in:fade
			></span>
		{/if}
	</button>

	<!-- Language badge on not hover -->
	<span
		class={[
			'absolute top-0 right-0 z-0 cursor-default',
			'text-sm text-gray-500 dark:text-gray-400',
			'transition-opacity duration-300 ease-in-out',
			'opacity-100 group-hover:opacity-0'
		]}>{language}</span
	>
</div>
