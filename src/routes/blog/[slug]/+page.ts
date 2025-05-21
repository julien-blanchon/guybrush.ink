import { error } from '@sveltejs/kit';

export async function load({ params: { slug } }) {
	try {
		const module = await import(`../../../../src/posts/${slug}/README.md`);
		return { component: module.default, frontmatter: module.metadata };
	} catch (e) {
		error(404, `Post does not exist`);
	}
}
