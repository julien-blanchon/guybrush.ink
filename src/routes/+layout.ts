import type { MetaTagsProps } from 'svelte-meta-tags';

export const prerender = true;
export const ssr = false;

export const load = ({ url }) => {
    const baseMetaTags = Object.freeze({
        title: 'Guybrush.ink',
        titleTemplate: '%s | Guybrush.ink',
        robots: 'index, follow',
        description: 'Guybrush.ink - Julien Blanchon Blog Posts',
        canonical: new URL(url.pathname, url.origin).href,
        twitter: {
            card: 'summary_large_image',
            site: '@JulienBlanchon',
            creator: '@JulienBlanchon',
            title: 'Guybrush.ink',
            description: 'Guybrush.ink - Julien Blanchon Blog Posts',
            images: [
                {
                    url: 'https://guybrush.ink/og-image.webp',
                    alt: 'Guybrush.ink',
                    width: 1280,
                    height: 720,
                    secureUrl: 'https://guybrush.ink/og-image.webp',
                    type: 'image/webp'
                }
            ]
        },
        openGraph: {
            type: 'website',
            url: new URL(url.pathname, url.origin).href,
            locale: 'en_IE',
            title: 'Guybrush.ink',
            description: 'Guybrush.ink - Julien Blanchon Blog Posts',
            siteName: 'Guybrush.ink',
            profile: {
                firstName: 'Julien',
                lastName: 'Blanchon',
                username: 'JulienBlanchon',
                gender: 'male'
            },
            images: [
                {
                    url: 'https://guybrush.ink/og-image.webp',
                    alt: 'Guybrush.ink',
                    width: 1280,
                    height: 720,
                    secureUrl: 'https://guybrush.ink/og-image.webp',
                    type: 'image/webp'
                }
            ]
        },
        keywords: ['Guybrush.ink', 'Julien Blanchon', 'Blog', 'Posts', 'AI', 'Research', 'Computer Vision', 'Diffusion Models', '3D Reconstruction'],
    }) satisfies MetaTagsProps;
    return {
        baseMetaTags
    };
};