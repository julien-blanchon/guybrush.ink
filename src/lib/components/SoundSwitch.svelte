<script lang="ts">
	import { Button } from 'bits-ui';
	import { soundEffect } from '$lib/runes/soundSwitch.svelte';
	import { sfx, music } from '$lib/audio';
	import { cubicOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
</script>

<!-- Sound Effect Toggle -->
<Button.Root
	onclick={(event: MouseEvent) => {
		// Don't play the click sound when the switch is clicked
		event.preventDefault();
		soundEffect.enabled = !soundEffect.enabled;
		sfx.pop();
		if (soundEffect.enabled) {
			music.play();
		} else {
			music.pause();
		}
	}}
	role="switch"
	aria-label="Sound Switch"
	aria-checked={soundEffect.enabled}
	class="relative inline-flex size-6 cursor-pointer rounded-full"
>
	{#if soundEffect.enabled}
		<div
			class="absolute inline-flex h-full w-full items-center justify-center"
			transition:scale={{
				delay: 100,
				duration: 200,
				start: 0.7,
				easing: cubicOut
			}}
		>
			<span class="icon-[lucide--volume-2] size-6" aria-label="Volume"></span>
		</div>
	{:else}
		<div
			class="absolute inline-flex h-full w-full items-center justify-center"
			transition:scale={{
				delay: 100,
				duration: 200,
				start: 0.7,
				easing: cubicOut
			}}
		>
			<span class="icon-[lucide--volume-x] size-6" aria-label="Mute"></span>
		</div>
	{/if}
</Button.Root>
