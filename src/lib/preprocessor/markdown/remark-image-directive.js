// remark-image-directive.js
import { visit } from 'unist-util-visit';

export function remarkImageDirective() {
	// @ts-ignore
	return (tree) => {
		visit(tree, (node, index, parent) => {
			// @ts-ignore
			return node.type === 'textDirective' && node.name === 'img';
		}, (node) => {
			console.log('node', node);
			const data = node.data || (node.data = {});
			const hast = {
				type: 'element',
				tagName: 'img',
				properties: {
					src: node.attributes?.src,
					alt: node.attributes?.alt || '',
					...node.attributes
				}
			};
			data.hName = hast.tagName;
			data.hProperties = hast.properties;
		});
	};
}
