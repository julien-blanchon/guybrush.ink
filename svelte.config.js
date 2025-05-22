import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sequence, preprocessMeltUI } from '@melt-ui/pp';
import markdown from './src/lib/preprocessor/markdown/index.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: sequence([markdown(), vitePreprocess(), preprocessMeltUI()]),
	kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true,
		}),
		// paths: {
		// 	base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
		// }
		// csp: {
		// 	mode: 'auto', // or 'warn' if you want logs but not enforcement
		// 	directives: {
		// 		'default-src': ["'self'"],
		// 		'script-src': [
		// 			"'self'",
		// 			"'unsafe-inline'",
		// 			'https://cdn.jsdelivr.net',
		// 			'https://va.vercel-scripts.com',
		// 			'https://cdn.jsdelivr.net/npm/mathjax@3',
		// 		],
		// 		'script-src-elem': [
		// 			"'self'",
		// 			"'unsafe-inline'",
		// 			'https://cdn.jsdelivr.net',
		// 			'https://va.vercel-scripts.com',
		// 			'https://cdn.jsdelivr.net/npm/mathjax@3',
		// 		],
		// 		'style-src': [
		// 			"'self'",
		// 			"'unsafe-inline'",
		// 			'https://fonts.googleapis.com',
		// 		],
		// 		'style-src-elem': [
		// 			"'self'",
		// 			"'unsafe-inline'",
		// 			'https://fonts.googleapis.com',
		// 		],
		// 		'font-src': ["'self'", 'https://fonts.gstatic.com', 'https://cdn.jsdelivr.net'],
		// 		'img-src': ["'self'", 'data:'],
		// 		'connect-src': ["'self'"],
		// 	}
		// }
	},
	vitePlugin: {
		inspector: {
			toggleKeyCombo: 'meta-shift',
			showToggleButton: 'always',
			toggleButtonPos: 'bottom-right'
		}
	},
	alias: {
		'@/*': 'src/*',
		'@': 'src'
	},
	compilerOptions: {
		warningFilter: (warning) => {
			const ignore = [
				'a11y_no_noninteractive_tabindex',
				'a11y_incorrect_aria_attribute_type',
				'a11y_incorrect_aria_attribute_type_boolean',
				'a11y_figcaption_parent'
			];
			return !ignore.includes(warning.code);
		}
	}
};

export default config;
