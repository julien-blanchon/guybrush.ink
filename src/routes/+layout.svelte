<script lang="ts">
	import '../shiki.css';
	import '../mathjax.css';
	import '../app.css';
	import '../gfm.css';
	import '../zoom.css';
	import '@shikijs/twoslash/style-rich.css';

	import { ModeWatcher } from 'mode-watcher';
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { prefersReducedMotion } from 'svelte/motion';
	import { fly } from 'svelte/transition';
	import type { ClassValue } from 'svelte/elements';
	import type { Picture } from 'vite-imagetools';
	import type { SvelteComponent } from 'svelte';
	import { onMount } from 'svelte';
	import { sfx } from '$lib/audio';

	let { data, children } = $props();

	let metaTags = $derived(deepMerge(data.baseMetaTags, page.data.pageMetaTags));

	// Image handling logic
	const imageModules = import.meta.glob<SvelteComponent<Picture>>(
		'$lib/assets/background/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}',
		{
			eager: true,
			query: {
				enhanced: true,
				w: '640;768;1024;1280',
				format: 'webp',
				picture: true,
				quality: 80
			}
		}
	);

	type ImagePairs = Record<
		string,
		{ light: SvelteComponent<Picture>; dark: SvelteComponent<Picture> }
	>;

	type MaybeImagePairs = Record<
		string,
		{ light?: SvelteComponent<Picture>; dark?: SvelteComponent<Picture> }
	>;

	const imagePairs = Object.entries(imageModules).reduce((acc, [path, module]) => {
		const match = path.match(/(.+?)(_dark)?\.(avif|gif|heif|jpeg|jpg|png|tiff|webp|svg)$/);
		if (!match) return acc;

		const [, baseName, isDark] = match;
		const key = isDark ? 'dark' : 'light';

		if (!acc[baseName]) acc[baseName] = {} as ImagePairs[string];
		acc[baseName][key] = module;

		return acc;
	}, {} as MaybeImagePairs);

	// Ensure that all entries have both `light` and `dark`, filtering incomplete ones
	const completeImagePairs: ImagePairs = Object.fromEntries(
		Object.entries(imagePairs).filter(([_, value]) => value.light && value.dark)
	) as ImagePairs;

	const numberOfPairs = Object.keys(completeImagePairs).length;
	const randomPair = Math.floor(Math.random() * numberOfPairs);
	const selectedPair = Object.values(completeImagePairs)[randomPair];

	type NavBarItem = {
		label: string;
		href: string;
		icon?: ClassValue;
		className?: ClassValue;
		disabled?: boolean;
	};

	const navBarItems: NavBarItem[] = [
		{
			label: 'Home',
			href: '/',
			className: '!mr-auto'
		},
		{ label: 'Photos', href: '/photos', disabled: true },
		{ label: 'Projects', href: '/projects' },
		{ label: 'Blog', href: '/blog' }
	];

	let currPage = $state<string>(page.url.pathname);
	let prevPage = $state<string>('');

	beforeNavigate((navigation) => {
		if (navigation.to?.url.pathname) {
			prevPage = currPage;
			currPage = navigation.to.url.pathname;
		}
	});

	function transition(path: string, out: boolean) {
		const cleanPath = path.replace(/\/$/, '');
		const cleanPrevPath = prevPage.replace(/\/$/, '');

		let currDepth = cleanPath.split('/').length;
		let prevDepth = cleanPrevPath.split('/').length;

		const currParent = '/' + cleanPath.split('/')[1];
		const prevParent = '/' + cleanPrevPath.split('/')[1];

		let currParentIdx = navBarItems.findIndex((page) => page.href === currParent);
		let prevParentIdx = navBarItems.findIndex((page) => page.href === prevParent);

		if (path === '/') {
			currParentIdx = prevParentIdx;
			currDepth = 1;
		}
		if (prevPage === '/') {
			prevParentIdx = currParentIdx;
			prevDepth = 1;
		}

		let xDiff = currParentIdx - prevParentIdx;
		let yDiff = currDepth - prevDepth;

		if (out) {
			xDiff *= -1;
			yDiff *= -1;
		}
		if (prefersReducedMotion.current) {
			xDiff *= 0;
			yDiff *= 0;
		}

		if (yDiff !== 0) {
			// duration is 300 if yDiff is 0 else 0 to disable the transition
			// return {
			// 	duration: 0
			// };
			return {
				duration: 300,
				opacity: 0.0,
				delay: out ? 0 : 100,
				x: '0vh',
				y: `${Math.abs(yDiff) * 100}vh`
			};
		}

		return {
			duration: 300,
			opacity: 0.0,
			delay: out ? 0 : 100,
			x: `${xDiff * 100}vh`,
			y: '0vh'
		};
	}

	import { music } from '$lib/audio';
	import { soundEffect } from '$lib/runes/soundSwitch.svelte';

	onMount(() => {
		const handler = () => {
			if (soundEffect.enabled) {
				music.play();
			}
			window.removeEventListener('pointerdown', handler);
		};

		window.addEventListener('pointerdown', handler, { once: true });
	});

	import { onNavigate } from '$app/navigation';
	import { deepMerge, MetaTags } from 'svelte-meta-tags';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<!-- Preload header background images -->
<svelte:head>
	{#if selectedPair}
		<link
			rel="preload"
			as="image"
			href={selectedPair.light.default.img.src}
			type="image/webp"
			media="(prefers-color-scheme: light)"
			fetchpriority="high"
		/>
		<link
			rel="preload"
			as="image"
			href={selectedPair.dark.default.img.src}
			type="image/webp"
			media="(prefers-color-scheme: dark)"
			fetchpriority="high"
		/>
	{/if}
</svelte:head>

<svelte:window on:click={() => sfx.click()} />

<MetaTags {...metaTags} />
<ModeWatcher disableTransitions={true} track={false} defaultMode="light" />

<div class="bg-coffee-100 noise relative min-h-screen dark:bg-gray-900">
	<!-- Main Content - Always centered, independent of sidebar -->
	<main id="main-content" class="z-20 mx-auto w-full max-w-4xl px-4 pt-0 pb-10 sm:px-6 lg:px-8">
		<!-- Header Section -->
		<Header {navBarItems} {selectedPair} />

		<!-- Main Content (centered) -->
		<div class="animate-in fade-in slide-in-from-bottom duration-700">
			{#key page.url.pathname}
				<div
					class="noise_filter border-coffee-300 relative overflow-hidden rounded-lg border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
					in:fly={transition(page.url.pathname, false)}
					out:fly={transition(page.url.pathname, true)}
					aria-live="polite"
				>
					<!-- Main Content -->
					<div class="p-6">
						<div
							class="min-h-[50svh] min-w-0 text-base leading-relaxed tracking-normal antialiased"
						>
							{@render children?.()}
						</div>
					</div>

					<!-- Footer -->
					<Footer />
				</div>
			{/key}
		</div>
	</main>
	<!-- If blog Table of Contents Sidebar on the right -->
	{#if page.url.pathname.includes('/blog/')}
		<aside
			id="sidebar"
			aria-label="Table of contents sidebar"
			class="pointer-events-none fixed top-0 right-0 z-20 flex h-screen items-center p-4"
		>
			<!-- ... -->
		</aside>
	{/if}
</div>
