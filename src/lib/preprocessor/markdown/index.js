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
import { rehypeMarkdownComponents } from './plugins.js';
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
	transformerRenderWhitespace,

} from '@shikijs/transformers';
import { transformerColorizedBrackets } from '@shikijs/colorized-brackets';
import { visit } from 'unist-util-visit';
/**
 * Parses a meta string to extract the wrap setting.
 * Example: 'nowrap'
 *
 * @param {string | undefined | null} meta - The meta string from the code block.
 * @returns {boolean | null} - True if wrap is enabled, false if disabled, or null if not present.
 */
function parseMetaWrapString(meta) {
	if (!meta) return null;
	const match = meta.match(/nowrap/);
	if (!match) return null;
	return true;
}

const wrapSymbol = Symbol("nowrap");

/**
 * Shiki transformer that adds a class to the <pre> element depending on nowrap in the meta string.
 * 
 * @param {{
*   wrapClass?: string,
*   noWrapClass?: string
* }} [options={}] - Optional class names for wrap/nowrap.
* @returns {{
*   name: string,
*   pre(node: import('hast').Element): import('hast').Element | void
* }} Transformer object compatible with Shiki.
*/
// @ts-ignore
function transformerMetaWrap({ noWrapClass = "nowrap" } = {}) {
  return {
    name: "@shikijs/transformers:meta-wrap",
	/**
     * @this {import('@shikijs/core').ShikiTransformerContext}
     * @param {import('hast').Element} node - The <pre> node.
     * @returns {import('hast').Element | void}
     */
    pre(node) {
      if (!this.options.meta?.__raw) return;

      const meta = this.meta;
      // @ts-ignore
      meta[wrapSymbol] ??= parseMetaWrapString(this.options.meta.__raw);
      // @ts-ignore
      const wrapDisabled = meta[wrapSymbol];

      if (wrapDisabled) {
        this.addClassToHast(node, noWrapClass);
      }

      return node;
    }
  };
}


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
	keepBackground: false,
	// Disable inline code blocks
	bypassInlineCode: true,
	transformers: [
		transformerNotationDiff(),
		transformerNotationFocus(),
		transformerMetaHighlight(),
		transformerMetaWordHighlight(),
		transformerColorizedBrackets(),
		transformerRenderWhitespace(),
		// transformerCopyButton(),
		transformerCompactLineOptions(),
		transformerNotationHighlight(),
		transformerNotationWordHighlight(),
		transformerNotationErrorLevel(),
		transformerNotationMap(),
		transformerMetaWrap()
	]
};

function rehypeHandleMetadata() {
	// Add typing as JSDoc
	/**
	 * @param {import('unist').Node} tree
	 */
	return async (tree) => {
		visit(tree, (node) => {
			// @ts-ignore
			if (node?.type === 'element' && node?.tagName === 'figure') {
				// @ts-ignore
				if (!('data-rehype-pretty-code-figure' in node.properties)) {
					return;
				}
				// @ts-ignore
				const titleElement = node.children[0];
				// @ts-ignore
				const preElement = node.children.at(-1);

				if (
					preElement.tagName !== 'pre' ||
					!('data-rehype-pretty-code-title' in titleElement.properties)
				) {
					return;
				}

				// const codeElement = preElement.children.find((child) => child.tagName === 'code');

				// if (codeElement) {
				// 	processCustomCodeBlockHighlights(codeElement.children);
				// }

				if (titleElement.children.length > 0 && 'value' in titleElement.children[0]) {
					preElement.properties['title'] = titleElement.children[0].value;
					// @ts-ignore
					preElement.properties['language'] = node.children[0].properties['data-language'];
					// @ts-ignore
					node.children.shift();
				}
			}
		});
	};
}

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
	.use(remarkRehype, { allowDangerousHtml: true, math: true, clobberPrefix: 'footnote-', footnoteBackContent: "↩\u{FE0E}" })
	.use([[rehypePrettyCode, rehypePrettyCodeOptions], rehypeHandleMetadata])
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
						'icon-[lucide--hash] size-4 pl-6 hidden group-hover/title:inline-block '
				}
			}
		],
		rehypeAccessibleEmojis
	])
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
