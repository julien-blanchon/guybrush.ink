import type { EntryGenerator } from './$types';
import { getPosts } from '$lib/server/posts';

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