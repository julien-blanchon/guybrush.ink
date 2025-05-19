import { z } from 'zod';

export const LocationSchema = z.object({
	city: z.string(),
	latitude: z.number(),
	longitude: z.number(),
	color: z.string().optional(),
	textColor: z.string().optional()
});

export type Location = z.infer<typeof LocationSchema>;
