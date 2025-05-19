// @ts-nocheck
import { visit } from 'unist-util-visit';

// Matches optional {key=value ...} after an image
const ATTR_REGEX = /\{\s*([^\}]+)\s*\}$/;

export function remarkImageAttributes() {
	return (tree) => {
		visit(tree, 'image', (node, index, parent) => {
			const alt = node.alt || '';
			const match = ATTR_REGEX.exec(alt);
			if (match) {
				// Extract key=value pairs
				const attrs = match[1].trim().split(/\s+/);
				const props = {};

				for (const pair of attrs) {
					const [key, value] = pair.split('=');
					if (key && value) {
						props[key] = value.replace(/^['"]|['"]$/g, ''); // remove quotes
					}
				}

				// Update alt text (remove the {...} part)
				node.alt = alt.replace(ATTR_REGEX, '').trim();

				// Attach attributes for rehype to convert to HTML
				node.data = {
					hProperties: {
						...(node.data?.hProperties || {}),
						...props
					}
				};
			}
		});
	};
}
