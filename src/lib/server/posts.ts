import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { postSchema, type Post } from '$lib/types/blog';
import { spawnSync } from 'node:child_process';

// Simple in-memory cache to avoid work during dev server HMR reloads
let cachedPosts: Post[] | undefined;

function gitLastModified(file: string): string | undefined {
	try {
		const { status, stdout } = spawnSync('git', ['log', '-1', '--format=%cI', file], {
			encoding: 'utf-8'
		});
		if (status === 0) {
			const iso = stdout.trim();
			return iso || undefined;
		}
	} catch {
		// git might be unavailable (e.g. in certain CI containers)
	}
	return undefined;
}

export async function getPosts(forceRefresh = false) {
	// Return memoized result unless explicitly refreshed (or during prod build)
	if (!forceRefresh && cachedPosts && import.meta.env.DEV) return cachedPosts;

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

				// Derive last modification date
				if (!data.lastmod && !import.meta.env.DEV) {
					const gitDate = gitLastModified(markdownFilePath);
					if (gitDate) data.lastmod = gitDate;
				}

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

		// Cache result in dev mode for subsequent calls
		if (import.meta.env.DEV) cachedPosts = posts;
		return posts;
	} catch (e) {
		throw new Error('Could not parse Markdown files, ' + e);
	}
}
