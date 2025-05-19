<script lang="ts">
	import 'svelte-medium-image-zoom/dist/styles.css';
	import Zoom from 'svelte-medium-image-zoom';
	import { resolvePostImage } from '$lib/utils';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { dev } from '$app/environment';
	import { page } from '$app/state';

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
		<figcaption
			class="flex flex-col gap-2 text-center text-sm text-gray-600 italic dark:text-gray-400"
		>
			{alt}
			{#if isExcalidrawSvg}
				<a
					class="group text-xs text-gray-600 italic dark:text-gray-400"
					href={`https://excalidraw.com/#url=${page.url.origin}${resolvedSrc}`}
					target="_blank"
				>
					Edit on <span class="font-bold">Excalidraw</span>
					<span class="icon-[tabler--external-link] align-middle opacity-0 group-hover:opacity-100"
					></span>
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
