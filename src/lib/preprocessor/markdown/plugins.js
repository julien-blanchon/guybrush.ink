// @ts-nocheck
import { visit } from 'unist-util-visit';

export function rehypeCopyCode() {
	function codeTitle(node) {
		if (node.tagName === 'div') {
			// return node.properties.className[0] === 'rehype-code-title'
			if (node.properties?.className?.[0] === 'rehype-code-title') {
				return true;
			}
			return false;
		}
	}

	return (tree) => {
		visit(tree, codeTitle, (node) => {
			if (node.type !== 'element') return;

			const value = node.children[0].type === 'text' ? node.children[0].value : '';

			node.children = [
				{
					type: 'element',
					tagName: 'span',
					children: [{ type: 'text', value }]
				},
				{
					type: 'element',
					tagName: 'button',
					properties: { className: ['copy'] },
					children: [{ type: 'text', value: `Copy` }]
				}
			];
		});
	};
}

export function rehypeMarkdownComponents() {
	return (tree) => {
		visit(tree, 'element', (node) => {
			// Only override standard HTML tags you have components for
			const tags = [
				'h1',
				'h2',
				'h3',
				'h4',
				'h5',
				'h6',
				'ul',
				'ol',
				'li',
				'blockquote',
				'hr',
				'img',
				'table',
				'tr',
				'td',
				'th',
				'details',
				'mark',
				'abbr',
				'a',
				'copybutton',
				'figure'
			];

			if (tags.includes(node.tagName)) {
				node.tagName = `Markdown.${node.tagName}`;
			}
		});
	};
}

export const transformerCopyButton = () => ({
	name: 'copy-button',
	pre(node) {
		// If node.properties.class is an array, add the relative class to the last element
		if (Array.isArray(node.properties.class)) {
			node.properties.class.push('relative');
			node.properties.class.push('shiki_pre');
			node.properties.class.push('group');
		} else if (typeof node.properties.class === 'string') {
			node.properties.class += ' relative shiki_pre group';
		} else {
			node.properties.class = ['relative', 'shiki_pre', 'group'];
		}
		// Add the absolute class to node
		node.children.push({
			type: 'element',
			tagName: 'copybutton',
			properties: {
				type: 'button',
				title: 'Copy to clipboard',
				text: this.source,
				language: this?.options?.lang
			}
		});
	}
});
