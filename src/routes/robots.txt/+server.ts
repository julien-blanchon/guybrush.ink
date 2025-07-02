import { siteConfig } from '$lib/site/config';

export const prerender = true;

export function GET() {
    const robots = `User-agent: *\nAllow: /\nSitemap: ${siteConfig.absolute('/sitemap.xml')}\n`;

    return new Response(robots, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8'
        }
    });
} 