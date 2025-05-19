<script lang="ts">
	import { Command, Dialog } from 'bits-ui';
	import { Button } from 'bits-ui';
	import { commandState, receiveHeader, sendHeader } from '$lib/runes/commandSwitch.svelte';
	import type { SvelteComponent } from 'svelte';
	import type { Picture } from 'vite-imagetools';
	import { shortcut, type ShortcutEventDetail } from '@svelte-put/shortcut';
	import { onMount } from 'svelte';
	import type { Post } from '$lib/types/blog';

	type ImagePairs = { light: SvelteComponent<Picture>; dark: SvelteComponent<Picture> };

	type Props = {
		selectedPair: ImagePairs;
	};

	let { selectedPair }: Props = $props();
	let posts: Post[] = $state([]);
	let loadingPosts = $state(true);
	let postsError: string | null = $state(null);

	onMount(async () => {
		try {
			const res = await fetch('/api/posts');
			if (!res.ok) throw new Error('Failed to fetch posts');
			const data = (await res.json()) as Post[];
			// posts = data.filter((post) => post.published);
			// posts = [...data, ...data, ...data, ...data, ...data, ...data, ...data];
			posts = data;
		} catch (e) {
			postsError = (e as Error).message;
		} finally {
			loadingPosts = false;
		}
	});

	function wait(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	// Track last toggle time to prevent rapid toggles
	let lastToggleTime = 0;
	const DEBOUNCE_INTERVAL = 500; // ms

	// function handleKeydown(e: KeyboardEvent) {
	// 	if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
	// 		e.preventDefault();

	// 		const now = Date.now();
	// 		// Only toggle if enough time has passed since last toggle
	// 		if (now - lastToggleTime > DEBOUNCE_INTERVAL) {
	// 			commandState.open = !commandState.open;
	// 			lastToggleTime = now;
	// 		}
	// 	}
	// }

	function handleK(detail: ShortcutEventDetail) {
		const now = Date.now();
		// Only toggle if enough time has passed since last toggle
		if (now - lastToggleTime > DEBOUNCE_INTERVAL) {
			commandState.open = !commandState.open;
			lastToggleTime = now;
		}
	}

	function closeCommandPalette() {
		wait(100).then(() => {
			commandState.open = false;
		});
	}

	let scrollState = $state('at-top');
</script>

<!-- <svelte:document onkeydown={handleKeydown} /> -->

<svelte:window
	use:shortcut={{
		trigger: {
			key: 'k',
			modifier: ['ctrl', 'meta'],
			callback: handleK
		}
	}}
/>

<Dialog.Root bind:open={commandState.open}>
	<Dialog.Overlay
		class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/70"
	/>
	<Dialog.Trigger>
		{#snippet child({ props })}
			<Button.Root
				role="switch"
				aria-label="Command Menu"
				data-state={commandState.open ? 'open' : 'closed'}
				aria-checked={commandState.open}
				title="Toggle Command Menu"
				class="group relative inline-flex size-6 cursor-pointer rounded-full"
				{...props}
			>
				<div class="absolute inline-flex h-full w-full items-center justify-center">
					<span
						class="icon-[lucide--command] size-6 transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-90"
						aria-label="Command"
					></span>
				</div>
			</Button.Root>
		{/snippet}
	</Dialog.Trigger>
	<Dialog.Portal>
		<Dialog.Content
			class="fixed top-10 left-[50%] z-50 h-[80svh] w-full max-w-[94%] translate-x-[-50%] outline-hidden md:top-[50%] md:w-full md:translate-y-[-50%] lg:max-w-4xl"
			forceMount
			preventScroll={true}
			onOpenAutoFocus={(e) => {
				e.preventDefault();
				(document.querySelector('input[data-command-input]') as HTMLInputElement)?.focus();
			}}
		>
			{#snippet child({ props, open })}
				{#if open}
					<div {...props} in:receiveHeader={{ key: 'header' }} out:sendHeader={{ key: 'header' }}>
						<Dialog.Title class="sr-only">Command Menu</Dialog.Title>
						<Dialog.Description class="sr-only">
							This is the command menu. Use the arrow keys to navigate and press ⌘K to open the
							search bar.
						</Dialog.Description>
						<div
							class="border-coffee-500 bg-coffee-200 relative z-50 mb-6 h-full origin-top overflow-hidden rounded-lg border p-6 pb-2 text-pretty dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900"
						>
							<!-- Background image with custom mask - same as header -->
							<div class="absolute inset-0">
								<Dialog.Close
									class="absolute top-5 right-5 z-30 flex h-9 w-9 cursor-pointer items-center justify-center rounded-md bg-gray-100/70 text-gray-700 shadow-inner backdrop-blur-sm transition hover:bg-gray-200/70 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:bg-gray-700/30 dark:text-gray-200 dark:shadow-inner dark:hover:bg-gray-600/40"
								>
									<span class="icon-[lucide--x] size-5" aria-hidden="true"></span>
									<span class="sr-only">Close</span>
								</Dialog.Close>

								<div class="noise_filter absolute inset-0 z-10"></div>
								<div
									class="via-coffee-200/30 to-coffee-200/95 absolute inset-0 z-20 bg-radial-[at_top_right] from-transparent from-0% via-20% to-80% opacity-50 dark:via-gray-800/30 dark:to-gray-800/95"
								></div>
								<enhanced:img
									src={selectedPair.light.default}
									alt="Generated background Light"
									class="block h-full w-full object-cover blur-2xl dark:hidden"
									loading="lazy"
									sizes="(min-width: 1280px) 1024px, (min-width: 1024px) 900px, (min-width: 768px) 768px, (min-width: 640px) 600px, 100vw"
									width="640"
									height="240"
									aria-hidden="true"
								/>
								<enhanced:img
									src={selectedPair.dark.default}
									alt="Generated background Dark"
									class="hidden h-full w-full object-cover blur-2xl dark:block"
									loading="lazy"
									sizes="(min-width: 1280px) 1024px, (min-width: 1024px) 900px, (min-width: 768px) 768px, (min-width: 640px) 600px, 100vw"
									width="640"
									height="240"
									aria-hidden="true"
								/>
							</div>

							<!-- Content container with relative positioning -->
							<div class="relative z-20 flex h-full flex-col">
								<!-- Command UI -->
								<div class="w-full pb-6 text-stone-900 dark:text-gray-100">
									<h1
										class="mb-1 font-serif text-4xl font-black tracking-tight text-stone-950 dark:text-white"
									>
										Search
									</h1>
								</div>

								<!-- Command component -->
								<Command.Root
									class="flex h-full w-full flex-col overflow-hidden border-none bg-transparent shadow-none"
								>
									<div class="relative">
										<Command.Input
											class="focus-override h-input w-full truncate rounded-lg border border-stone-200 bg-stone-100/40 px-5 py-4 text-base font-medium tracking-wide text-stone-900 backdrop-blur-sm transition-colors placeholder:text-stone-600/70 focus:bg-stone-100/60 focus:ring-0 focus:outline-hidden dark:bg-gray-700/40 dark:text-gray-100 dark:placeholder:text-gray-400/70 dark:focus:bg-gray-700/60"
											placeholder="Type to search..."
										/>
										<div
											class="absolute top-1/2 right-3 -translate-y-1/2 text-sm text-gray-500 dark:text-gray-400"
										>
											<kbd
												class="hidden rounded-md bg-gray-100 px-2 py-1 font-mono text-xs font-semibold tracking-widest shadow-inner backdrop-blur-sm sm:inline-block dark:bg-gray-700"
											>
												⌘K
											</kbd>
										</div>
									</div>

									<Command.Separator class="my-6 h-px w-full bg-stone-900/10 dark:bg-gray-300/10" />
									<div class="relative max-h-[60svh] flex-1 overflow-hidden">
										<Command.List
											data-scroll-state={scrollState}
											onscroll={(e) => {
												const atTop = e.currentTarget.scrollTop === 0;
												const atBottom =
													Math.ceil(e.currentTarget.scrollTop + e.currentTarget.clientHeight) >=
													e.currentTarget.scrollHeight;
												if (atTop) {
													scrollState = 'at-top';
												} else if (atBottom) {
													scrollState = 'at-bottom';
												} else {
													scrollState = 'middle';
												}
											}}
											class={[
												'h-full overflow-y-auto pr-1',
												'[mask-mode:alpha]',
												'[mask-repeat:no-repeat]',

												// Case 1: middle - fade both ends
												"data-[scroll-state='middle']:[mask-image:linear-gradient(to_bottom,transparent_0%,black_5%,black_95%,transparent_100%)]",

												// Case 2: at bottom - fade top only
												"data-[scroll-state='at-bottom']:[mask-image:linear-gradient(to_bottom,transparent_0%,black_5%,black_100%,black_100%)]",

												// Case 3: at top - fade bottom only
												"data-[scroll-state='at-top']:[mask-image:linear-gradient(to_top,transparent_0%,black_5%,black_100%,black_100%)]"
											]}
										>
											<Command.Viewport>
												<Command.Empty
													class="flex w-full items-center justify-center py-6 text-sm font-medium tracking-wide text-stone-600 dark:text-gray-400"
												>
													No results found.
												</Command.Empty>
												<div
													class="space-y-4 [&_[data-selected]]:border-1 [&_[data-selected]]:border-stone-500"
												>
													<Command.Group>
														<!-- <Command.GroupHeading
															class="px-3 pt-4 pb-2 text-xs text-stone-500 dark:text-gray-400"
														></Command.GroupHeading> -->
														<Command.LinkItem
															href="/"
															class="flex h-12 cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium tracking-wide text-stone-800 outline-hidden select-none disabled:cursor-not-allowed data-disabled:cursor-not-allowed data-disabled:opacity-50 data-selected:bg-stone-300/30 dark:text-gray-300 dark:data-selected:bg-gray-700/30"
															keywords={['home']}
															onclick={closeCommandPalette}
														>
															<span
																class="icon-[lucide--book] size-5 text-stone-600 dark:text-gray-400"
															></span>
															<div class="flex flex-col">
																<span class="font-medium tracking-wide">Home</span>
																<span
																	class="text-xs tracking-wide text-stone-600 dark:text-gray-400"
																	>Get back to the home page</span
																>
															</div>
														</Command.LinkItem>
														<Command.LinkItem
															href="/photos"
															disabled
															class="flex h-12 cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium tracking-wide text-stone-800 outline-hidden select-none disabled:cursor-not-allowed data-disabled:cursor-not-allowed data-disabled:opacity-50 data-selected:bg-stone-300/30 dark:text-gray-300 dark:data-selected:bg-gray-700/30"
															keywords={['photos']}
															onclick={closeCommandPalette}
														>
															<span
																class="icon-[lucide--camera] size-5 text-stone-600 dark:text-gray-400"
															></span>
															<div class="flex flex-col">
																<span class="font-medium tracking-wide">Photos</span>
																<span
																	class="text-xs tracking-wide text-stone-600 dark:text-gray-400"
																	>View my photos</span
																>
															</div>
														</Command.LinkItem>
														<Command.LinkItem
															href="/projects"
															class="flex h-12 cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium tracking-wide text-stone-800 outline-hidden select-none disabled:cursor-not-allowed data-disabled:cursor-not-allowed data-disabled:opacity-50 data-selected:bg-stone-300/30 dark:text-gray-300 dark:data-selected:bg-gray-700/30"
															keywords={['projects']}
															onclick={closeCommandPalette}
														>
															<span
																class="icon-[lucide--microscope] size-5 text-stone-600 dark:text-gray-400"
															></span>
															<div class="flex flex-col">
																<span class="font-medium tracking-wide">Projects</span>
																<span
																	class="text-xs tracking-wide text-stone-600 dark:text-gray-400"
																	>My latest projects</span
																>
															</div>
														</Command.LinkItem>
														<Command.LinkItem
															class="group flex h-12 cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium tracking-wide text-stone-800 outline-hidden select-none data-selected:bg-stone-300/30 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 dark:text-gray-300 dark:data-selected:bg-gray-700/30"
															keywords={['home']}
														>
															<span
																class="icon-[lucide--book-open] size-5 text-stone-600 dark:text-gray-400"
															></span>
															<div class="flex flex-col">
																<span class="font-medium tracking-wide">Blog</span>
																<span
																	class="text-xs tracking-wide text-stone-600 dark:text-gray-400"
																	>Read my blog posts</span
																>
															</div>
														</Command.LinkItem>
													</Command.Group>

													<!-- Blog posts section -->
													<Command.Separator
														class="h-px w-full bg-stone-900/10 dark:bg-gray-300/10"
													/>
													<Command.Group>
														<Command.GroupHeading
															class="px-3 py-1 text-xs text-stone-500 dark:text-gray-400"
														>
															Blog Posts
														</Command.GroupHeading>

														{#if loadingPosts}
															<Command.Loading
																class="flex w-full items-center justify-center py-6 text-sm font-medium tracking-wide text-stone-600 dark:text-gray-400"
															>
																Loading...
															</Command.Loading>
														{:else if postsError}
															<Command.Empty
																class="flex w-full items-center justify-center py-6 text-sm font-medium tracking-wide text-red-600 dark:text-red-400"
															>
																{postsError}
															</Command.Empty>
														{:else if posts.length === 0}
															<Command.Empty
																class="flex w-full items-center justify-center py-6 text-sm font-medium tracking-wide text-stone-600 dark:text-gray-400"
															>
																No blog posts found.
															</Command.Empty>
														{:else}
															<Command.GroupItems>
																{#each posts as post}
																	<Command.LinkItem
																		href={`/blog/${post.slug}`}
																		keywords={post.categories}
																		onclick={closeCommandPalette}
																		value={post.slug}
																		class="flex h-12 cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium tracking-wide text-stone-800 outline-hidden select-none disabled:cursor-not-allowed data-disabled:cursor-not-allowed data-disabled:opacity-50 data-selected:bg-stone-300/30 dark:text-gray-300 dark:data-selected:bg-gray-700/30"
																	>
																		<span
																			class="icon-[lucide--book-open] size-5 text-stone-600 dark:text-gray-400"
																		></span>
																		<div class="flex flex-col">
																			<span class="font-medium tracking-wide">{post.title}</span>
																			<!-- <span
																				class="text-xs tracking-wide text-stone-600 dark:text-gray-400"
																				>{post.description}</span
																			> -->
																		</div>
																	</Command.LinkItem>
																{/each}
															</Command.GroupItems>
														{/if}
													</Command.Group>
												</div>
											</Command.Viewport>
										</Command.List>
									</div>
								</Command.Root>
							</div>
						</div>
					</div>
				{/if}
			{/snippet}
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
