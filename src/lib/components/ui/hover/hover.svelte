<script lang="ts">
	import { Spring } from 'svelte/motion';
	import { fade, fly, scale } from 'svelte/transition';

	import type { Snippet } from 'svelte';

	type Props = {
		hover: Snippet;
		button: Snippet;
		aspectRatio?: number;
		height?: number;
		width?: number;
		maxWidth?: number;
		delta?: number;
		className?: string;
		delay?: number;
		duration?: number;
	};

	let {
		hover,
		button,
		aspectRatio,
		height,
		width,
		maxWidth = 400,
		delta = 120,
		className,
		delay = 200,
		duration = 200
	}: Props = $props();

	const computedWidth = width || (height && aspectRatio ? height * aspectRatio : undefined);

	let isHover = $state(false);
	let x = new Spring(0, {
		stiffness: 0.1,
		damping: 0.3
	});
	let y = new Spring(0, {
		stiffness: 0.1,
		damping: 0.3
	});

	let linkEffect = (node: HTMLElement) => {
		// Initialize the x and y position
		const initialY = node.getBoundingClientRect().top;
		y.set(initialY + delta);
		const initialX = node.getBoundingClientRect().left;
		x.set(initialX + delta);

		node.addEventListener(
			'mouseenter',
			(e) => {
				y.set(e.clientY + delta);
				x.set(e.clientX + delta);
				isHover = true;
			},
			{ passive: true }
		);
		node.addEventListener(
			'mousemove',
			(e) => {
				const effectiveWidth = computedWidth || maxWidth;
				x.set(e.clientX - effectiveWidth / 2);
				y.set(e.clientY + delta);
			},
			{ passive: true }
		);
		node.addEventListener(
			'mouseleave',
			(e) => {
				isHover = false;
			},
			{ passive: true }
		);
		node.addEventListener(
			'scrollend',
			(e) => {
				isHover = false;
			},
			{ passive: true }
		);
	};
</script>

{#if isHover}
	<div
		class={['bg-muted overflow-hidden rounded-lg object-cover object-center shadow-lg', className]}
		style="position: fixed; top:{y.current}px; left:{x.current}px; z-index: 100; {aspectRatio
			? `aspect-ratio: ${aspectRatio};`
			: ''} {height ? `height: ${height}px;` : ''} {computedWidth
			? `width: ${computedWidth}px;`
			: `max-width: ${maxWidth}px;`}"
		in:scale={{ duration: duration, delay: delay }}
	>
		{@render hover()}
	</div>
{/if}

<!-- <span class="h-max w-max" use:linkEffect> -->
<span class="h-full w-full" use:linkEffect>
	{@render button()}
</span>
