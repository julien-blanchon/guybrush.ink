<script lang="ts">
	import { onMount } from 'svelte';
	import { mode } from 'mode-watcher';
	import Giscus from '@giscus/svelte';
	import { cubicOut } from 'svelte/easing';
	import Tree from '$lib/components/tree.svelte';
	import { createTableOfContents } from '@melt-ui/svelte';
	import { Portal } from 'bits-ui';

	let { data } = $props();

	const {
		elements: { item },
		states: { activeHeadingIdxs, headingsTree }
	} = createTableOfContents({
		selector: '#article-content',
		exclude: [],
		activeType: 'highest',
		scrollBehaviour: 'smooth',
		scrollOffset: 50
	});

	let isSidebarOpen = $state(false);

	onMount(() => {
		const mediaQuery = window.matchMedia('(min-width: 1024px)');
		isSidebarOpen = mediaQuery.matches;

		// Handle screen size changes
		mediaQuery.addEventListener('change', (e) => {
			if (!e.matches) {
				isSidebarOpen = false;
			}
		});

		return () => {
			mediaQuery.removeEventListener('change', (e) => {
				if (!e.matches) {
					isSidebarOpen = false;
				}
			});
		};
	});

	function toggleSidebar() {
		isSidebarOpen = !isSidebarOpen;
	}

	function flyAndScale(
		node: Element,
		{
			x = 0,
			y = 0,
			duration = 350,
			delay = 0,
			easing = cubicOut,
			start = 0.95
		}: {
			x?: number;
			y?: number;
			duration?: number;
			delay?: number;
			easing?: (t: number) => number;
			start?: number;
		}
	) {
		return {
			css: (t: number, u: number) => {
				const tx = x ? `translateX(${u * x}px)` : '';
				const ty = y ? `translateY(${u * y}px)` : '';
				const s = `scale(${start + (1 - start) * t})`;
				return `transform: ${tx} ${ty} ${s}; opacity: ${t}`;
			},
			duration,
			delay,
			easing
		};
	}

	// Add date formatting
	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	// Category color palette
	const colorPalette = [
		'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-100 dark:border-orange-700',
		'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-100 dark:border-red-700',
		'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-700',
		'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-700',
		'bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-900 dark:text-teal-100 dark:border-teal-700',
		'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-700',
		'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-100 dark:border-purple-700',
		'bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900 dark:text-pink-100 dark:border-pink-700',
		'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700',
		'bg-lime-100 text-lime-800 border-lime-200 dark:bg-lime-900 dark:text-lime-100 dark:border-lime-700',
		'bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900 dark:text-cyan-100 dark:border-cyan-700',
		'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900 dark:text-amber-100 dark:border-amber-700',
		'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200 dark:bg-fuchsia-900 dark:text-fuchsia-100 dark:border-fuchsia-700',
		'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900 dark:text-rose-100 dark:border-rose-700',
		'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900 dark:text-indigo-100 dark:border-indigo-700',
		'bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-900 dark:text-violet-100 dark:border-violet-700',
		'bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900 dark:text-sky-100 dark:border-sky-700',
		'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900 dark:text-emerald-100 dark:border-emerald-700',
		'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700',
		'bg-stone-100 text-stone-800 border-stone-200 dark:bg-stone-900 dark:text-stone-100 dark:border-stone-700'
	];

	// Hash function to pick a color from the palette using DJB2
	function getCategoryColor(category: string) {
		let hash = 5381;
		for (let i = 0; i < category.length; i++) {
			hash = (hash << 5) + hash + category.charCodeAt(i); // hash * 33 + c
		}
		const idx = Math.abs(hash) % colorPalette.length;
		return colorPalette[idx];
	}
</script>

<svelte:head>
	<title>{data.frontmatter.title}</title>

	<meta content={data.frontmatter.description} name="description" />

	<meta content={data.frontmatter.title} property="og:title" />
	<!-- <meta content={image} property="og:image" /> -->
	<!-- <meta content={config.siteUrl} property="og:url" /> -->
	<meta content={data.frontmatter.description} property="og:description" />
	<!-- <meta content={config.siteName} property="og:site_name" /> -->

	<!-- <meta content={config.twitterHandle} name="twitter:creator" /> -->
	<meta content="summary_large_image" name="twitter:card" />
	<meta content={data.frontmatter.title} name="twitter:title" />
	<meta content={data.frontmatter.description} name="twitter:description" />
	<!-- <meta content={image} name="twitter:image" /> -->
</svelte:head>

<!-- Only use Portal for table of contents -->
<Portal to="#sidebar">
	<section class="pointer-events-auto w-[260px] max-w-full">
		{#if !isSidebarOpen}
			<button
				onclick={toggleSidebar}
				in:flyAndScale={{ x: 260, duration: 350, easing: cubicOut, start: 0.95 }}
				out:flyAndScale={{ x: 260, duration: 350, easing: cubicOut, start: 0.95 }}
				class="fixed right-6 bottom-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/80 shadow-lg ring-1 ring-black/10 backdrop-blur-md duration-200 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 active:bg-gray-100 dark:bg-gray-800/80 dark:hover:bg-gray-700 dark:focus-visible:ring-gray-600 dark:active:bg-gray-900"
				aria-label="Show table of contents"
			>
				<span
					class="icon-[pixelarticons--chevron-left] size-6 text-gray-700 dark:text-gray-200"
					aria-hidden="true"
				></span>
			</button>
		{/if}
		{#if isSidebarOpen}
			<div
				class="border-coffee-500 bg-coffee-200 relative w-full overflow-hidden rounded-lg border shadow-sm dark:border-gray-700 dark:bg-gray-800"
				in:flyAndScale={{
					x: 260,
					delay: 300,
					duration: 350,
					easing: cubicOut,
					start: 0.95
				}}
				out:flyAndScale={{
					x: 260,
					duration: 350,
					easing: cubicOut,
					start: 0.95
				}}
			>
				<div
					class="border-coffee-300 bg-coffee-200/80 sticky top-0 z-10 flex items-center justify-between gap-2 border-b px-4 py-3 backdrop-blur-md dark:border-gray-700 dark:bg-gray-800/80"
				>
					<h2 class="text-xs font-bold tracking-widest text-gray-700 uppercase dark:text-gray-200">
						Table of contents
					</h2>
					<button
						onclick={toggleSidebar}
						class={[
							'flex h-8 w-8 items-center justify-center rounded-full bg-gray-100/80 text-gray-500 duration-200 hover:bg-gray-200',
							'border focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 active:bg-gray-100 dark:bg-gray-800/80 dark:hover:bg-gray-700 dark:focus-visible:ring-gray-600 dark:active:bg-gray-900'
						]}
						aria-label="Hide table of contents"
					>
						<span class="icon-[pixelarticons--chevron-right] size-5" aria-hidden="true"></span>
					</button>
				</div>
				<div class="relative">
					<div
						class="from-coffee-200/80 via-coffee-200/60 pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-gradient-to-b to-transparent dark:from-gray-800/80 dark:via-gray-800/60"
					></div>
					<div
						class="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400/50 hover:scrollbar-thumb-gray-400/70 max-h-[min(400px,70vh)] overflow-y-auto px-2 py-4"
					>
						{#key $headingsTree}
							<Tree tree={$headingsTree} activeHeadingIdxs={$activeHeadingIdxs} {item} level={1} />
						{/key}
					</div>
					<div
						class="from-coffee-200/80 via-coffee-200/60 pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t to-transparent dark:from-gray-800/80 dark:via-gray-800/60"
					></div>
				</div>
			</div>
		{/if}
	</section>
</Portal>

<div id="article-content">
	<div class="mx-auto max-w-3xl">
		<!-- Modern minimalist, left-aligned article header with refined spacing -->
		<header class="mb-6 flex flex-col gap-2 pl-2" aria-label="Article header">
			<h1
				class="mb-1 font-serif text-4xl leading-tight font-extrabold text-pretty text-gray-900 capitalize sm:text-5xl dark:text-white"
			>
				<!-- style={`--view-transition-name: title-${data.frontmatter.title.toLowerCase().replace(/ /g, '-')}`} -->
				{data.frontmatter.title}
			</h1>
			{#if data.frontmatter.subtitle}
				<p class="mb-1 text-base font-normal text-pretty text-gray-500 dark:text-gray-300">
					{data.frontmatter.subtitle}
				</p>
			{/if}
			<p class="mb-1 text-sm font-light text-gray-400" aria-label="Published date">
				Published on <time datetime={data.frontmatter.date}
					>{formatDate(data.frontmatter.date)}</time
				>
				{#if data.frontmatter.lastmod}
					<span>&middot; Last updated: </span>
					<time datetime={data.frontmatter.lastmod}>{formatDate(data.frontmatter.lastmod)}</time>
				{/if}
				<span>&middot; </span>
				<a
					href={`https://github.com/julien-blanchon/guybrush.ink/edit/main/src/posts/${data.frontmatter.slug}/README.md`}
					target="_blank"
					rel="noopener noreferrer"
					class="text-sm text-blue-500 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:text-blue-300 dark:focus-visible:ring-blue-600"
				>
					Edit on Github
				</a>
				<span>&middot; </span>
				<a
					href={`/blog/${data.frontmatter.slug}/llms.txt`}
					target="_blank"
					rel="noopener noreferrer"
					class="text-sm text-blue-500 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:text-blue-300 dark:focus-visible:ring-blue-600"
				>
					llms.txt
				</a>
			</p>
			<div class="mb-2 flex flex-wrap gap-1" aria-label="Categories">
				{#each data.frontmatter.categories as category}
					<span
						class={[
							'inline-block cursor-pointer rounded-full border px-2 py-0.5 text-xs font-medium capitalize transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 dark:focus-visible:ring-gray-600',
							getCategoryColor(category)
						]}
						role="listitem"
						aria-label={`Category: ${category}`}
					>
						&num;{category}
					</span>
				{/each}
			</div>
		</header>
		<article>
			<!-- class="prose prose-base prose-headings:font-serif dark:prose-invert [&>section:nth-child(even)] [&>section:nth-child(odd)] prose-table:overflow-x-scroll prose-table:w-full prose-th:font-sans prose-hr:my-1 prose-figure:mt-0 prose-figure:mb-2 prose-p:my-1 max-w-none pb-32" -->
			<div>
				{@render data.component()}
			</div>
		</article>
		<section>
			<h2 class="sr-only text-2xl font-bold" aria-label="Comments" id="comments-title">Comments</h2>
			<span>
				<Giscus
					id="comments"
					repo="julien-blanchon/guybrush.ink"
					repoId="R_kgDOOoymBQ"
					category="General"
					categoryId="DIC_kwDOOoymBc4CqGTK"
					mapping="title"
					strict="0"
					term="Welcome to @giscus/svelte component!"
					reactionsEnabled="1"
					emitMetadata="0"
					inputPosition="top"
					theme={mode.current === 'dark' ? 'gruvbox_dark' : 'gruvbox_light'}
					lang="en"
					loading="lazy"
				/>
			</span>
		</section>
	</div>
</div>
