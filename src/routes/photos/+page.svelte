<script lang="ts">
	type ImageData = {
		src: string;
		alt: string;
	};
	const images: ImageData[] = [
		{ src: 'https://picsum.photos/id/1015/800/600', alt: 'Photo 1' },
		{ src: 'https://picsum.photos/id/1016/800/800', alt: 'Photo 2' },
		{ src: 'https://picsum.photos/id/1018/800/600', alt: 'Photo 3' },
		{ src: 'https://picsum.photos/id/1020/800/600', alt: 'Photo 4' },
		{ src: 'https://picsum.photos/id/1024/800/600', alt: 'Photo 5' },
		{ src: 'https://picsum.photos/id/1025/800/600', alt: 'Photo 6' },
		{ src: 'https://picsum.photos/id/1027/800/600', alt: 'Photo 7' },
		{ src: 'https://picsum.photos/id/1031/800/600', alt: 'Photo 8' },
		{ src: 'https://picsum.photos/id/1032/800/600', alt: 'Photo 9' },
		{ src: 'https://picsum.photos/id/1033/800/600', alt: 'Photo 10' },
		{ src: 'https://picsum.photos/id/1035/800/600', alt: 'Photo 11' },
		{ src: 'https://picsum.photos/id/1036/800/600', alt: 'Photo 12' },
		{ src: 'https://picsum.photos/id/1037/800/600', alt: 'Photo 13' },
		{ src: 'https://picsum.photos/id/1038/800/600', alt: 'Photo 14' },
		{ src: 'https://picsum.photos/id/1039/800/600', alt: 'Photo 15' },
		{ src: 'https://picsum.photos/id/1040/800/600', alt: 'Photo 16' }
	];
</script>

<div class="columns-2 gap-4 space-y-4 sm:columns-2 md:columns-3 lg:columns-4">
	{#each images as image}
		<img
			src={image.src}
			alt={image.alt}
			class={[
				'mb-4 aspect-[4/3] w-full rounded-lg object-cover',
				'transition-transform duration-300 ease-in-out hover:scale-105'
			]}
			loading="lazy"
		/>
	{/each}
</div>
