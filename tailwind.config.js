const disabledCss = {
	pre: { backgroundColor: 'transparent', padding: '0' },
	code: { backgroundColor: 'transparent', padding: '0', color: 'inherit' },
	'pre code': { backgroundColor: 'transparent', padding: '0' },
	'code::before': { content: 'none' },
	'code::after': { content: 'none' },
	'blockquote p:first-of-type::before': { content: 'none' },
	'blockquote p:last-of-type::after': { content: 'none' }
};

module.exports = {
	theme: {
		extend: {
			typography: {
				DEFAULT: { css: disabledCss },
				sm: { css: disabledCss },
				lg: { css: disabledCss },
				xl: { css: disabledCss },
				'2xl': { css: disabledCss }
			}
		}
	},
	// content: [
	//     './src/**/*.{html,svelte}',
	//     './node_modules/layerchart/**/*.{svelte,js}'
	// ],
	plugins: [require('@tailwindcss/typography')]
};
