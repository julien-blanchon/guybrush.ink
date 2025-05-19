import { quintOut } from 'svelte/easing';
import { crossfade } from 'svelte/transition';

export let commandState = $state({
	open: false
});

export const [sendHeader, receiveHeader] = crossfade({
	duration: 500,
	easing: quintOut
});
