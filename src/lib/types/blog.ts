import { z } from 'zod';

export const postSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
	slug: z.string(),
	date: z.string(),
	categories: z.array(z.string()),
	published: z.boolean().default(true),
});

export type Post = z.infer<typeof postSchema>;
