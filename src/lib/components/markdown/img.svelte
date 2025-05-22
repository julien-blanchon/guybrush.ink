<script lang="ts">
	import 'svelte-medium-image-zoom/dist/styles.css';
	import Zoom from 'svelte-medium-image-zoom';
	import { resolvePostImage } from '$lib/utils';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type EnhancedImgAttributes = Omit<SvelteHTMLElements['img'], 'src'> & { src: string };

	// type Props = SvelteHTMLElements['img'];
	type Props = EnhancedImgAttributes;

	let { loading = 'lazy', alt, class: className, src, ...props }: Props = $props();

	const resolvedSrc = resolvePostImage(src);
	const isExcalidrawSvg = src.endsWith('.excalidraw.svg');
</script>

{#if alt}
	<figure class="my-8">
		<Zoom>
			{#snippet zoom_content({ img, button_unzoom, modal_state, handle_unzoom })}
				{@render button_unzoom()}
				<div class={[isExcalidrawSvg ? 'invert-0 dark:invert' : '']}>
					{@render img()}
				</div>
			{/snippet}
			<img
				{loading}
				{alt}
				src={resolvedSrc}
				class={[
					'mx-auto block max-w-full transition-all duration-300 ease-in-out will-change-transform hover:scale-102',
					isExcalidrawSvg ? 'invert-0 dark:invert' : '',
					className
				]}
				{...props}
			/>
		</Zoom>
		<figcaption class="mt-3 flex flex-col items-center justify-center gap-2 text-center">
			<span class="text-sm text-gray-600 italic dark:text-gray-400">
				{alt}
			</span>
			{#if isExcalidrawSvg}
				<a
					class="inline-flex items-center gap-1 text-xs text-gray-600 italic underline transition-colors duration-200 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
					target="_blank"
					href={`https://excalidraw.com/#url=${resolvedSrc}`}
				>
					<span>Edit on</span>
					<span class="icon-[vscode-icons--file-type-excalidraw] align-middle"></span>
				</a>
			{/if}
		</figcaption>
	</figure>
{:else}
	<img
		{loading}
		src={resolvedSrc}
		class={[
			'mx-auto my-4 block max-w-full rounded-lg border border-gray-200 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md dark:border-gray-700',
			className
		]}
		{...props}
	/>
{/if}
