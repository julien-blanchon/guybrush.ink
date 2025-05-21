import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { postSchema, type Post } from '$lib/types/blog';

export async function getPosts() {
	try {
		let posts: Post[] = [];
		const postsPath = path.resolve('src/posts');
		const entries = await fs.readdir(postsPath, { withFileTypes: true });
		const folders = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);

		for (const folder of folders) {
			const markdownFilePath = path.join(postsPath, folder, 'README.md');
			try {
				// Check if README.md exists
				await fs.access(markdownFilePath);

				// Read and parse README.md
				const markdownContent = await fs.readFile(markdownFilePath, 'utf-8');
				const { data } = matter(markdownContent);

				const result = postSchema.safeParse(data);
				if (result.success) {
					posts.push(result.data);
				} else {
					console.warn(`Invalid frontmatter in ${markdownFilePath}:\n`, result.error.format());
				}
			} catch {
				continue;
			}
		}
		posts = posts.toSorted((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime());
		posts = posts.filter((post) => post.published);
		return posts;
	} catch (e) {
		throw new Error('Could not parse Markdown files, ' + e);
	}
}
