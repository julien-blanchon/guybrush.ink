<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import { page } from '$app/state';

	const routes = [
		{
			title: 'Home',
			description: 'Guybrush.ink - Julien Blanchon Blog Posts',
			image:
				'https://guybrush.ink/social.png?title=Guybrush.ink&description=AI Research for Real-World Applications',
			url: 'https://guybrush.ink/',
			twitter: {
				cardType: 'summary_large_image',
				image:
					'https://guybrush.ink/social.png?title=Guybrush.ink&description=AI Research for Real-World Applications',
				imageAlt: 'Guybrush.ink',
				site: '@JulienBlanchon',
				creator: '@JulienBlanchon'
			}
		}
	];

	// Function to get the route metadata based on the current URL pathname
	const getRouteMeta = (pathname: string) => {
		return routes.find((route) => route.url.endsWith(pathname)) || {};
	};

	let currentMeta: any = $derived(getRouteMeta(page.url.pathname));
</script>

<MetaTags
	title={`${currentMeta.title} | Guybrush.ink`}
	description={currentMeta.description}
	canonical={currentMeta.url}
	openGraph={{
		url: currentMeta.url,
		title: currentMeta.title,
		description: currentMeta.description,
		images: [
			{
				url: currentMeta.image,
				width: 800,
				height: 600,
				alt: 'Og Image Alt'
			}
		],
		siteName: 'Guybrush.ink'
	}}
	twitter={{
		creator: currentMeta.twitter?.creator || '@JulienBlanchon',
		site: currentMeta.twitter?.site || '@JulienBlanchon',
		cardType: currentMeta.twitter?.cardType || 'summary_large_image',
		title: `${currentMeta.twitter?.title || currentMeta.title} | Guybrush.ink`,
		description: currentMeta.twitter?.description || currentMeta.description,
		image: currentMeta.twitter?.image || currentMeta.image,
		imageAlt: currentMeta.twitter?.imageAlt || 'Twitter image alt'
	}}
/>
