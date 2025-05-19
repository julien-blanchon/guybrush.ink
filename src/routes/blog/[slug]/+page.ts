import type { EntryGenerator } from './$types';
import { getPosts } from '$lib/site/posts';
import { error } from '@sveltejs/kit';


export async function load({ params: { slug } }) {
	try {
		const module = await import(`../../../../src/posts/${slug}/README.md`);
		return { component: module.default, frontmatter: module.metadata };
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
export const prerender = true;