import { getPosts } from '$lib/server/posts';
import { siteConfig } from '$lib/site/config';

// Ensure the file is prerendered so adapter-static outputs a physical sitemap.xml
export const prerender = true;

interface UrlEntry {
    loc: string;
    lastmod?: string;
    changefreq?: string;
    priority?: string;
}

/**
 * Generate the XML for the provided URLs.
 */
function generateXml(urls: UrlEntry[]): string {
    const urlset = urls
        .map(({ loc, lastmod, changefreq, priority }) => {
            return `    <url>\n        <loc>${loc}</loc>${lastmod ? `\n        <lastmod>${lastmod}</lastmod>` : ''}${
                changefreq ? `\n        <changefreq>${changefreq}</changefreq>` : ''
            }${priority ? `\n        <priority>${priority}</priority>` : ''}\n    </url>`;
        })
        .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlset}\n</urlset>`;
}

export async function GET() {
    // Core pages that are always present on the site
    const staticPages: UrlEntry[] = [
        '/',
        '/photos',
        '/projects',
        '/writings',
        '/readings'
    ].map((path) => ({
        loc: siteConfig.absolute(path),
        changefreq: 'weekly',
        priority: '0.7',
        lastmod: new Date().toISOString()
    }));

    // Blog posts (writings) pulled from our markdown front-matter
    const posts = await getPosts();
    const postPages: UrlEntry[] = posts.map((post) => ({
        loc: siteConfig.absolute(`/writings/${post.slug}`),
        lastmod: post.lastmod ?? post.date,
        changefreq: 'monthly',
        priority: '0.9'
    }));

    const xml = generateXml([...staticPages, ...postPages]);

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8'
        }
    });
} 