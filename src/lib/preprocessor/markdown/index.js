import matter from 'gray-matter';
import { unified } from 'unified';
import toMarkdownAST from 'remark-parse';
import remarkRehype from 'remark-rehype';
import toHtmlString from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import { remarkImageAttributes } from './remarkImageAttributes.js';
import remarkDirective from 'remark-directive';
import rehypeSlug from 'rehype-slug';
import remarkAbbr from '@richardtowers/remark-abbr';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { rehypeCopyCode, rehypeMarkdownComponents, transformerCopyButton } from './plugins.js';
import remarkMath from 'remark-math';
// import rehypeKatex from 'rehype-katex'
import rehypeMathjax from 'rehype-mathjax/chtml';
import { remarkImageDirective } from './remark-image-directive.js';
import remarkGemoji from 'remark-gemoji';
import remarkSectionize from 'remark-sectionize';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import rehypeVideo from 'rehype-video';
import rehypeCallouts from 'rehype-callouts';
import rehypePrettyCode from 'rehype-pretty-code';
import {
	transformerNotationDiff,
	transformerNotationFocus,
	transformerMetaHighlight,
	transformerCompactLineOptions,
	transformerMetaWordHighlight,
	transformerNotationErrorLevel,
	transformerNotationHighlight,
	transformerNotationMap,
	transformerNotationWordHighlight,
	transformerRenderWhitespace
} from '@shikijs/transformers';
import { transformerColorizedBrackets } from '@shikijs/colorized-brackets';

/** @type {import('rehype-pretty-code').Options} */
const rehypePrettyCodeOptions = {
	theme: {
		dark: 'slack-dark',
		light: 'github-light'
	},
	defaultLang: {
		block: 'plaintext',
		inline: 'python'
	},
	transformers: [
		transformerNotationDiff(),
		transformerNotationFocus(),
		transformerMetaHighlight(),
		transformerMetaWordHighlight(),
		transformerColorizedBrackets(),
		transformerRenderWhitespace(),
		transformerCopyButton(),
		transformerCompactLineOptions(),
		transformerNotationHighlight(),
		transformerNotationWordHighlight(),
		transformerNotationErrorLevel(),
		transformerNotationMap()
	],
	onVisitTitle(node) {
		const lang = node?.properties?.['data-language'] || 'plaintext';
		if (!node.properties) return;

		/** @type {string | undefined} */
		let icon_class;
		switch (lang) {
			case 'python':
			case 'py':
				icon_class = 'icon-[vscode-icons--file-type-python]';
				break;
			case 'javascript':
			case 'js':
				icon_class = 'icon-[vscode-icons--file-type-js]';
				break;
			case 'typescript':
			case 'ts':
				icon_class = 'icon-[vscode-icons--file-type-typescript]';
				break;
			case 'rust':
			case 'rs':
				icon_class = 'icon-[vscode-icons--file-type-rust]';
				break;
			case 'bash':
			case 'sh':
			case 'shell':
				icon_class = 'icon-[vscode-icons--file-type-shell]';
				break;
			case 'markdown':
			case 'md':
				icon_class = 'icon-[vscode-icons--file-type-markdown]';
				break;
			case 'html':
				icon_class = 'icon-[vscode-icons--file-type-html]';
				break;
			case 'css':
				icon_class = 'icon-[vscode-icons--file-type-css]';
				break;
			case 'json':
				icon_class = 'icon-[vscode-icons--file-type-json]';
				break;
			case 'yaml':
			case 'yml':
				icon_class = 'icon-[vscode-icons--file-type-yaml]';
				break;
			case 'toml':
				icon_class = 'icon-[vscode-icons--file-type-toml]';
				break;
			default:
				return;
		}

		node.children.unshift({
			type: 'element',
			tagName: 'div',
			properties: {
				className: ['size-5', 'pr-2', icon_class]
			},
			children: []
		});
	}
};

/**
 * Unified Markdown processor with all plugins.
 */
const markdownProcessor = unified()
	.use(toMarkdownAST)
	.use([
		[remarkAbbr, {}],
		remarkMath,
		remarkGfm,
		remarkGemoji,
		remarkImageAttributes,
		remarkSectionize
	])
	.use(remarkDirective)
	.use(remarkImageDirective)
	.use(remarkRehype, { allowDangerousHtml: true, math: true, clobberPrefix: 'footnote-' })
	.use(rehypePrettyCode, rehypePrettyCodeOptions)
	.use([
		[rehypeCallouts, { theme: 'github' }],
		rehypeVideo,
		rehypeSlug,
		[
			rehypeAutolinkHeadings,
			{
				behavior: 'append',
				properties: {
					class:
						'icon-[lucide--hash] size-4 pl-6 hidden group-hover/title:inline-block align-text-bottom'
				}
			}
		],
		rehypeAccessibleEmojis
	])
	.use(rehypeCopyCode)
	// .use(rehypeKatex)
	.use(rehypeMathjax, {
		tex: {
			inlineMath: [
				['$', '$'],
				['\\(', '\\)']
			],
			displayMath: [
				['$$', '$$'],
				['\\[', '\\]']
			]
		},
		chtml: {
			fontURL: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2',
		}
	})
	.use(rehypeMarkdownComponents)
	.use(toHtmlString, { allowDangerousHtml: true });

/**
 * Extracts slug from Markdown file path.
 * @param {string} filename
 * @returns {string}
 */
function getSlug(filename) {
	return filename.split('/').at(-2) ?? '';
}

/**
 * Replaces special Svelte characters and preserves <style> tags safely.
 * @param {string} content
 * @returns {string}
 */
function escapeHtml(content) {
	const blockRegex = /<(style)[^>]*>[\s\S]*?<\/\1>/gi;

	/** @type {{ key: string, content: string }[]} */
	const protectedBlocks = [];
	let index = 0;

	content = content.replace(blockRegex, (match) => {
		const key = `___BLOCK_${index++}___`;
		protectedBlocks.push({ key, content: match });
		return key;
	});

	content = content.replace(/{/g, '&#123;').replace(/}/g, '&#125;');

	for (const { key, content: original } of protectedBlocks) {
		content = content.replace(key, `<div class="svelte-style-block">${original}</div>`);
	}

	return content;
}

/**
 * Extracts and returns frontmatter + cleansed content.
 * @param {string} content
 * @returns {{ markdown: string, meta: string }}
 */
function frontmatter(content) {
	const { content: markdown, data } = matter(content);
	const meta = `
<script context="module">
	export const metadata = ${JSON.stringify(data)}
	import * as Markdown from "$lib/components/markdown"
	import CopyButton from "$lib/components/markdown/copybutton.svelte"
</script>
`;
	return { markdown, meta };
}

/**
 * Full Markdown parser pipeline.
 * @param {string} content
 * @param {string} slug
 * @returns {Promise<string>}
 */
async function parseMarkdown(content, slug) {
	const imageRegex = /!\[([^\]]*)\]\((.*?)\)/g;
	const replacedContent = content.replace(imageRegex, (_, alt, src) => {
		const src_patched = src.replace(/^\.\//, `${slug}/`);
		return `![${alt}](${src_patched})`;
	});

	const parsedMarkdown = await markdownProcessor.process(replacedContent);
	return parsedMarkdown.toString();
}

/**
 * Main Markdown preprocessor plugin for SvelteKit.
 * Converts `.md` files to HTML and injects metadata + components.
 * @returns {{ name: string, markup(params: { content: string, filename: string }): Promise<{ code: string } | undefined> }}
 */
function markdown() {
	return {
		name: 'markdown',
		async markup({ content, filename }) {
			if (filename.endsWith('.md')) {
				const slug = getSlug(filename);
				const { markdown, meta } = frontmatter(content);
				const html = await parseMarkdown(markdown, slug);

				const code = escapeHtml(html);
				return { code: meta + code };
			}
		}
	};
}

export default markdown;
