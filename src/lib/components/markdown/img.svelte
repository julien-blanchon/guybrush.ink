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
</script>

{#if alt}
	<figure>
		<Zoom>
			<img
				{loading}
				{alt}
				src={resolvedSrc}
				class={[
					'mx-auto block max-w-full rounded-lg drop-shadow-md transition-[filter,scale] duration-300 ease-in-out will-change-transform hover:scale-105 hover:drop-shadow-xl',
					className
				]}
				{...props}
			/>
		</Zoom>
		<figcaption class="text-center text-sm text-gray-600 italic dark:text-gray-400">
			{alt}
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
