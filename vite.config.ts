import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { enhancedImages } from '@sveltejs/enhanced-img';

export default defineConfig({
	plugins: [tailwindcss(), enhancedImages(), sveltekit()],
	server: {
		fs: { allow: ['..'] }
	}
	// define: {
	// 	'import.meta.env.PUBLIC_GIT_COMMIT_HASH': JSON.stringify(gitHash)
	// }
});
