import { browser } from '$app/environment';
import { soundEffect } from '$lib/runes/soundSwitch.svelte';

const audioPaths = {
	blip: '/audio/blip.mp3',
	click: '/audio/click.mp3',
	enable: '/audio/enable.mp3',
	pop: '/audio/pop.mp3',
	toggle: '/audio/toggle.mp3'
};

const SOUND_COOLDOWN = 100; // ms

type SoundName = keyof typeof audioPaths;

const audioPools: Record<SoundName, HTMLAudioElement[]> = {} as any;
const lastPlayed: Record<SoundName, number> = {} as any;

if (browser) {
	for (const name in audioPaths) {
		audioPools[name as SoundName] = Array.from({ length: 5 }, () => {
			const a = new Audio(audioPaths[name as SoundName]);
			a.volume = 0.8;
			a.preload = 'auto';
			return a;
		});
		lastPlayed[name as SoundName] = 0;
	}
}

function playSound(name: SoundName) {
	if (!browser) return;

	const now = Date.now();
	if (now - lastPlayed[name] < SOUND_COOLDOWN) return;

	const pool = audioPools[name];
	const audio = pool.find((a) => a.paused || a.ended);
	if (audio) {
		audio.currentTime = 0;
		audio.play().catch(() => console.error('Audio play failed'));
		lastPlayed[name] = now;
	}
}

export const sfx = {
	blip: () => {
		if (!browser || !soundEffect.enabled) return;
		playSound('blip');
	},
	click: () => {
		if (!browser || !soundEffect.enabled) return;
		playSound('click');
	},
	enable: () => {
		if (!browser || !soundEffect.enabled) return;
		playSound('enable');
	},
	pop: () => {
		if (!browser) return;
		playSound('pop');
	},
	toggle: () => {
		if (!browser || !soundEffect.enabled) return;
		playSound('toggle');
	}
};
