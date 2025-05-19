import { error } from '@sveltejs/kit';
import type { Post } from '$lib/types/blog';

export async function load({ fetch }) {
	try {
		const posts = await fetch('/api/posts');
		if (!posts.ok) {
			throw new Error('Failed to fetch posts');
		}
		const data = (await posts.json()) as Post[];
		const publishedPosts = data;
		return { posts: publishedPosts};
	} catch (e) {
		error(404, (e as Error).message);
	}
}
