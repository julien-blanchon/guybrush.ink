<script lang="ts">
	import { Button } from 'bits-ui';
	import { mode, toggleMode } from 'mode-watcher';
	import { scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { tick } from 'svelte';
	import { browser } from '$app/environment';
	import { prefersReducedMotion } from 'svelte/motion';

	const isDark = $derived(mode.current === 'dark');

	// Function to handle theme toggle with view transition
	async function handleToggle(event: MouseEvent) {
		// Only run in browser environment
		if (!browser) {
			toggleMode();
			return;
		}

		// Check if View Transitions API is supported and reduced motion is not preferred
		const supportsViewTransition = 'startViewTransition' in document;
		const isAppearanceTransition = supportsViewTransition && !prefersReducedMotion.current;

		if (!isAppearanceTransition) {
			// If transitions not supported, just toggle the mode
			toggleMode();
			return;
		}

		// Add a temporary class instead of injecting a <style> tag
		document.documentElement.classList.add('view-transition-enabled');

		// Get click coordinates
		const x = event.clientX;
		const y = event.clientY;

		// Calculate the end radius (distance to furthest corner)
		const endRadius = Math.hypot(
			Math.max(x, window.innerWidth - x),
			Math.max(y, window.innerHeight - y)
		);

		// Store current mode before toggling

		try {
			const transition = document.startViewTransition(async () => {
				toggleMode();
				await tick(); // Wait for DOM update
			});

			// Wait for the transition to be ready
			await transition.ready;

			// Create and apply a custom animation for the transition
			const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];

			// Apply the animation
			document.documentElement.animate(
				{
					clipPath: isDark ? clipPath.toReversed() : clipPath,
					easing: 'ease-out'
				},
				{
					duration: 300,
					easing: 'ease-in',
					pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)'
				}
			);
		} catch (error) {
			console.error('View transition error:', error);
			toggleMode(); // Fallback to regular toggle
		}

		// Remove the class after a delay to avoid flickering
		setTimeout(() => {
			document.documentElement.classList.remove('view-transition-enabled');
		}, 400);
	}

	let audioSwitch: boolean = $state(false);
</script>

<!-- Theme Switch Button -->
<Button.Root
	onclick={handleToggle}
	role="switch"
	aria-label="Light Switch"
	aria-checked={mode.current === 'light'}
	title="Toggle {mode.current === 'dark' ? 'Dark' : 'Light'} Mode"
	class="relative inline-flex size-6 cursor-pointer rounded-full"
>
	{#if mode.current === 'light'}
		<div
			class="absolute inline-flex h-full w-full items-center justify-center"
			transition:scale={{
				delay: 50,
				duration: 200,
				start: 0.7,
				easing: cubicOut
			}}
		>
			<span class="icon-[pixelarticons--moon] size-6" aria-label="Moon"></span>
		</div>
	{:else}
		<div
			class="absolute inline-flex h-full w-full items-center justify-center"
			transition:scale={{
				delay: 50,
				duration: 200,
				start: 0.7,
				easing: cubicOut
			}}
		>
			<span class="icon-[pixelarticons--sun-alt] size-6" aria-label="Sun"></span>
		</div>
	{/if}
</Button.Root>
