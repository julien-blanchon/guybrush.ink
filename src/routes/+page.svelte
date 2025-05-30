<script lang="ts">
	import { onMount } from 'svelte';
	import FAQ from '$lib/components/FAQ.svelte';
	import Hover from '$lib/components/ui/hover/hover.svelte';
	import { Collapsible } from 'bits-ui';
	import { slide } from 'svelte/transition';
	import TravelMap from '$lib/components/travel/TravelMap.svelte';
	import { LocationSchema, type Location } from '$lib/types/location';
	import P from '$lib/components/markdown/p.svelte';

	// State for copy notification
	let isCopied = $state(false);

	// Function to copy citation to clipboard
	function copyToClipboard() {
		const citation = `@misc{Guybrush.ink2025,
    title = {Guybrush.ink},
    url = {https://guybrush.ink},
    author = {Julien Blanchon},
    year = {2025},
    note = {Accessed on Month Day, Year}
}`;
		navigator.clipboard.writeText(citation);

		// Show notification
		isCopied = true;

		// Hide notification after 2 seconds
		setTimeout(() => {
			isCopied = false;
		}, 2000);
	}

	let currentDate = $state<string | undefined>(undefined);

	onMount(() => {
		currentDate = new Date().toLocaleDateString('en-GB', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	});

	let location: Location | undefined = $state(undefined);
	function decodeBase64Utf8(base64: string): string {
		const binary = atob(base64);
		const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
		return new TextDecoder().decode(bytes);
	}

	onMount(async () => {
		try {
			const res = await fetch(
				'https://cloudflare-dns.com/dns-query?name=location.guybrush.ink&type=TXT',
				{ headers: { Accept: 'application/dns-json' } }
			);

			const data = await res.json();

			const record = data.Answer?.find((r: any) => r.type === 16)?.data as string;

			if (!record) {
				location = undefined;
				return;
			}

			// Clean surrounding quotes if present (some providers wrap it)
			const base64 = record.replace(/^"|"$/g, '').replace(/\\"/g, '"').trim();

			// Decode Base64 and parse JSON
			let decoded;
			try {
				decoded = atob(base64);
			} catch (err) {
				console.log('Failed to decode Base64', err);
				return;
			}

			let json;
			// Try Base64 → JSON
			try {
				json = JSON.parse(decoded);
			} catch (_) {
				// Fallback if it's raw JSON
				json = JSON.parse(base64);
			}
			console.log(json);

			// Validate with Zod
			const result = LocationSchema.safeParse(json);
			console.log(result);

			if (result.success) {
				location = result.data;
			} else {
				console.warn('Validation error:', result.error.format());
				location = undefined;
			}
		} catch (err) {
			console.error('Error fetching location:', err);
			location = undefined;
		}
	});
</script>

<div class="text-gray-700 dark:text-gray-300">
	<!-- About This Writings Section -->
	<section class="mb-8" aria-labelledby="about-writings-heading">
		<h2
			id="about-writings-heading"
			class="mb-4 font-serif text-3xl font-bold text-gray-900 dark:text-white"
		>
			About me
		</h2>
		<p class="mb-4 text-base leading-relaxed tracking-normal">
			Hi, I'm <strong>Julien Blanchon</strong> — a researcher, builder, and occasional open-source advocate.
			This blog is my digital garden where I share thoughts, experiments, and lessons from my journeys.
			Feel free to comment, suggest topics, or steal my code on GitHub — I’d love to hear your thoughts
			and collaborate.
		</p>

		<!-- Interests Section -->
		<section class="mb-8" aria-labelledby="interests-heading">
			<h2
				id="interests-heading"
				class="mb-4 font-serif text-3xl font-bold text-gray-900 dark:text-white"
			>
				Interests
			</h2>
			<FAQ
				firstLetter="F"
				items={[
					{
						title: 'Diffusion Models',
						content: '...'
					},
					{
						title: 'Efficient ControlNet',
						content: '...'
					},
					{
						title: 'Audio2Audio Models',
						content: '...'
					},
					{
						title: 'Deep Learning Photonics applied to Spectrometry',
						// https://gitlab.com/wiechapeter/torchgdm
						content: '...'
					},
					{
						title: 'Predictive Markets',
						content: '...'
					}
				]}
			/>
		</section>

		<!-- Let's chat Section -->
		<section class="mb-8" aria-labelledby="lets-chat-heading">
			<h2
				id="lets-chat-heading"
				class="mb-4 font-serif text-3xl font-bold text-gray-900 dark:text-white"
			>
				Let's chat
			</h2>
			<div
				class="mb-6 rounded-md border border-gray-200 bg-white/95 p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800/95"
			>
				<p>
					I <span aria-label="love" class="text-rose-600 dark:text-rose-400">❤&#xFE0E</span> collaborating
					and connecting with other ! Do get in touch if you are working in any of the areas above, or
					if you have ideas that you think I might be interested in.
				</p>
				<p>
					Feel free to reach out
					<a
						href="https://x.com/JulienBlanchon"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Twitter"><span class="icon-[lucide--twitter] size-4 align-middle"></span></a
					>, it's the place I'm most active. ... or come grab
					<Hover
						aspectRatio={16 / 9}
						maxWidth={800}
						delta={25}
						delay={100}
						duration={200}
						width={400}
					>
						{#snippet hover()}
							<enhanced:img
								src="$lib/assets/station_f.webp"
								alt="Station F"
								class="h-full w-full rounded-md object-cover"
								sizes="(min-width: 640px) 384px, 100vw"
								loading="lazy"
								aria-hidden="true"
							/>
						{/snippet}
						{#snippet button()}
							<a
								href="https://maps.app.goo.gl/15XmnrqDAdAvCET29"
								target="_blank"
								rel="noopener noreferrer"
								class="text-blue-700 underline underline-offset-2">a coffee</a
							>
						{/snippet}
					</Hover>
					in real life.
				</p>
			</div>
		</section>

		<!-- Side-quests Section -->
		<section class="mb-8" aria-labelledby="side-quests-heading">
			<h2
				id="side-quests-heading"
				class="mb-4 font-serif text-3xl font-bold text-gray-900 dark:text-white"
			>
				Side-Quests & Things I Like
			</h2>
			<div
				class="rounded-md border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				<ol class="list-disc space-y-3 pl-6 text-base leading-relaxed">
					<li>
						<strong>Running & Swimming</strong> - I like indoor swimming in the winter and outdoor running
						in the summer.
					</li>
					<li>
						<strong>YouTube Documentaries</strong> - I'm a huge fan of YouTube documentaries.
					</li>
					<li>
						<strong>Hackathons</strong> - I love hackathons. If you see one coming, and want to team
						up, hit me up !
					</li>
				</ol>
			</div>
		</section>

		<!-- Travel Section -->
		<section class="mb-8" aria-labelledby="travel-heading">
			<h2
				id="travel-heading"
				class="mb-4 font-serif text-3xl font-bold text-gray-900 dark:text-white"
			>
				Travel
			</h2>
			<div
				class="mb-6 rounded-md border border-gray-200 bg-white/95 p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800/95"
			>
				<p>
					I like to travel a lot, especially in big cities. Here is a nice visual record of my
					adventures around the world.
				</p>
				<TravelMap bind:location />
			</div>
		</section>

		<!-- Collapsible Citation Section -->
		<Collapsible.Root class="group -mb-4 flex w-full flex-col justify-center ">
			<Collapsible.Trigger
				class="flex cursor-pointer items-center justify-center"
				aria-label="Show easter egg"
			>
				<span
					class="icon-[pixelarticons--chevron-down] size-10 duration-300 [transform-style:preserve-3d] group-data-[state=open]:[transform:rotateX(180deg)]
					"
					aria-hidden="true"
				></span>
			</Collapsible.Trigger>
			<Collapsible.Content forceMount>
				{#snippet child({ props, open })}
					{#if open}
						<div {...props} transition:slide>
							<h2
								id="citation-heading"
								class="mb-4 font-serif text-3xl font-bold text-gray-900 dark:text-white"
							>
								Citation
							</h2>
							<div
								class="group relative mb-4 overflow-hidden rounded-md border border-gray-200 shadow-sm dark:border-gray-700"
								data-is-copied={isCopied}
							>
								<div
									class="flex items-center justify-between border-b border-gray-200 bg-gray-100 px-4 py-2 dark:border-gray-700 dark:bg-gray-800"
								>
									<div class="text-sm font-medium text-gray-700 dark:text-gray-300">
										BibTeX Citation
									</div>
									<button
										onclick={copyToClipboard}
										aria-label="Copy citation"
										class="cursor-pointer text-blue-600 transition-colors group-data-[is-copied=true]:text-green-600! hover:text-blue-800 dark:text-blue-400 dark:group-data-[is-copied=true]:text-green-400! dark:hover:text-blue-300"
									>
										<span
											class="icon-[pixelarticons--copy] group-data-[is-copied=true]:icon-[pixelarticons--check] h-4! w-4!"
										></span>
									</button>
								</div>
								<pre
									class="m-0 overflow-auto bg-white p-4 font-mono text-sm text-gray-800 dark:bg-gray-900 dark:text-gray-300">@misc&#123;Guybrush.ink2025,
    title = &#123;Guybrush.ink&#125;,
    url = &#123;https://guybrush.ink&#125;,
    author = &#123;Julien Blanchon&#125;,
    year = &#123;2025&#125;,
    note = &#123;Accessed on {currentDate}&#125;
&#125;</pre>
							</div>
						</div>
					{/if}
				{/snippet}
			</Collapsible.Content>
		</Collapsible.Root>
	</section>
</div>
