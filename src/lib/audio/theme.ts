const themeMusic = new Audio('/audio/monkey_island.nsf.mp3');
themeMusic.loop = true;
themeMusic.volume = 0.1;
themeMusic.preload = 'auto';

let isMuted = false;

export const music = {
	play: () => {
		if (!isMuted) {
			themeMusic.play().catch((err) => console.warn('Music play failed:', err));
		}
	},
	pause: () => {
		themeMusic.pause();
	},
	toggle: () => {
		if (themeMusic.paused) {
			music.play();
		} else {
			music.pause();
		}
	},
	setVolume: (v: number) => {
		themeMusic.volume = Math.min(1, Math.max(0, v));
	},
	isPlaying: () => !themeMusic.paused,
	mute: () => {
		isMuted = true;
		music.pause();
	},
	unmute: () => {
		isMuted = false;
		music.play();
	}
};
