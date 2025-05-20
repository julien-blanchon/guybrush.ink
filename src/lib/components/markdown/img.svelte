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
	<figure>
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
					'mx-auto block max-w-full rounded-lg drop-shadow-md transition-[filter,scale] duration-300 ease-in-out will-change-transform hover:scale-105 hover:drop-shadow-xl',
					isExcalidrawSvg ? 'invert-0 dark:invert' : '',
					className
				]}
				{...props}
			/>
		</Zoom>
		<figcaption class="flex flex-col items-center justify-center gap-2">
			<span class="text-sm text-gray-600 italic dark:text-gray-400">
				{alt}
			</span>
			{#if isExcalidrawSvg}
				<a
					class="inline-flex items-center gap-1 text-xs text-gray-600 italic underline dark:text-gray-400"
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
			'mx-auto block max-w-full transition-transform duration-300 ease-in-out hover:scale-105',
			className
		]}
		{...props}
	/>
{/if}
