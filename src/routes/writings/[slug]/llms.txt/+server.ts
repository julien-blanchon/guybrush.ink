import { error, text } from '@sveltejs/kit';
import type { EntryGenerator } from './$types';
import { getPosts } from '$lib/server/posts';

export const prerender = true;

export async function GET({ params: { slug } }) {
	try {
		const raw = await import(`../../../../../src/posts/${slug}/README.md?raw`);
		return text(raw.default)
	} catch (e) {
		error(404, `Post does not exist`);
	}
}

export const entries: EntryGenerator = async () => {
	const posts = await getPosts();

	return posts.map((post) => {
		if (!post.slug) {
			// this will cause the build to fail with a helpful message
			throw new Error(`⚠️ Found a post with no slug! Post object was: ${JSON.stringify(post)}`);
		}
		return { slug: post.slug };
	});
}
