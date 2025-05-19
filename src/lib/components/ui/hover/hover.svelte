<script lang="ts">
	import { Spring } from 'svelte/motion';
	import { fade, fly, scale } from 'svelte/transition';

	import type { Snippet } from 'svelte';

	type Props = {
		hover: Snippet;
		button: Snippet;
		aspectRatio: number;
		height: number;
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
		delta = 25,
		className,
		delay = 200,
		duration = 200
	}: Props = $props();

	const width = height * aspectRatio;

	let isHover = $state(false);
	let x = new Spring(0, {
		stiffness: 0.1,
		damping: 0.3
	});
	let y = new Spring(100, {
		stiffness: 0.1,
		damping: 0.3
	});

	let linkEffect = (node: HTMLElement) => {
		node.addEventListener(
			'mouseenter',
			(e) => {
				y.set(e.clientY - height - delta);
				isHover = true;
			},
			{ passive: true }
		);
		node.addEventListener(
			'mousemove',
			(e) => {
				x.set(e.clientX - width / 2);
				y.set(e.clientY - height - delta);
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
		style="position: fixed; top:{y.current}px; left:{x.current}px; z-index: 100; aspect-ratio: {aspectRatio}; height: {height}px;"
		in:scale={{ duration: duration, delay: delay }}
	>
		{@render hover()}
	</div>
{/if}

<!-- <span class="h-max w-max" use:linkEffect> -->
<span class="h-full w-full" use:linkEffect>
	{@render button()}
</span>
