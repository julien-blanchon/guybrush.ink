import { error, json } from '@sveltejs/kit';
import { getPosts } from '$lib/server/posts';

export const prerender = true;

export async function GET() {
	try {
		const posts = await getPosts();
		return json(posts);
	} catch (e) {
		console.error('Failed to load posts, ' + e);
		error(404, 'Failed to load posts, ' + e);
	}
}
