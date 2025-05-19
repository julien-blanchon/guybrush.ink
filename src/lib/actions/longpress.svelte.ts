import type { Action } from 'svelte/action';

export const longpress: Action<
	HTMLDivElement,
	{ duration: number },
	{
		onlongpress: (e: CustomEvent) => void;
	}
> = (node, parameters) => {
	let timer: number;

	function startTimer() {
		timer = window.setTimeout(() => {
			node.dispatchEvent(new CustomEvent('longpress'));
		}, parameters.duration);
	}

	function clearTimer() {
		clearTimeout(timer);
	}

	// Use $effect to handle updates and cleanup
	$effect(() => {
		node.addEventListener('mousedown', startTimer, { passive: true });
		node.addEventListener('mouseup', clearTimer, { passive: true });
		node.addEventListener('mouseleave', clearTimer, { passive: true }); // Ensure cancel on leaving

		// Mobile events
		node.addEventListener('touchstart', startTimer, { passive: true });
		node.addEventListener('touchend', clearTimer, { passive: true });
		node.addEventListener('touchcancel', clearTimer, { passive: true });

		return () => {
			node.removeEventListener('mousedown', startTimer);
			node.removeEventListener('mouseup', clearTimer);
			node.removeEventListener('mouseleave', clearTimer);
			node.removeEventListener('touchstart', startTimer);
			node.removeEventListener('touchend', clearTimer);
			node.removeEventListener('touchcancel', clearTimer);
			clearTimer();
		};
	});

	return {};
};
