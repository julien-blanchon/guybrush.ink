import { browser } from '$app/environment';

let themeMusic: HTMLAudioElement | null = null;
let isMuted = false;

if (browser) {
	themeMusic = new Audio('/audio/monkey_island.nsf.mp3');
	themeMusic.loop = true;
	themeMusic.volume = 0.1;
	themeMusic.preload = 'auto';
}

export const music = {
	play: () => {
		if (!browser || !themeMusic || isMuted) return;
		themeMusic.play().catch((err) => console.warn('Music play failed:', err));
	},
	pause: () => {
		if (!browser || !themeMusic) return;
		themeMusic.pause();
	},
	toggle: () => {
		if (!browser || !themeMusic) return;
		if (themeMusic.paused) {
			music.play();
		} else {
			music.pause();
		}
	},
	setVolume: (v: number) => {
		if (!browser || !themeMusic) return;
		themeMusic.volume = Math.min(1, Math.max(0, v));
	},
	isPlaying: () => {
		if (!browser || !themeMusic) return false;
		return !themeMusic.paused;
	},
	mute: () => {
		isMuted = true;
		music.pause();
	},
	unmute: () => {
		isMuted = false;
		music.play();
	}
};
