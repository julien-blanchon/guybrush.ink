<script>
	import { Button } from '$lib/components/ui/button';
	import Hover from '$lib/components/ui/hover/hover.svelte';
</script>

<svelte:head>
	<title>Projects - Guybrush.ink</title>
</svelte:head>

<div class="text-gray-700 dark:text-gray-300">
	<section class="projects mb-8" aria-labelledby="projects-heading">
		<h2
			id="projects-heading"
			class="mb-4 font-serif text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
		>
			My Projects
		</h2>
		<p class="text-base leading-relaxed tracking-normal">
			Here is an non exhaustive list of projects I've worked on.
		</p>

		<!-- Arxflix -->
		<section class="mb-10" aria-labelledby="project-arxflix-heading">
			<h3
				id="project-arxflix-heading"
				class="mt-6 mb-2 flex items-center text-xl font-semibold tracking-tight text-gray-800 dark:text-gray-200"
			>
				<span
					class="project-badge mr-2 inline-flex size-7 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
				></span>
				Arxflix
			</h3>
			<p class="mb-4 text-base leading-relaxed tracking-normal">
				Arxflix is my AI Paper Reading Youtube Channel.
			</p>

			<div
				class="mb-6 rounded-md border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				<div class="flex flex-col gap-4 sm:flex-row sm:items-start">
					<div class="flex-1 space-y-4">
						<article>
							<p class="mt-2 text-base leading-relaxed tracking-normal">
								Born at a Paris hackathon in May 2024, ArxFlix is a fully automated video-generation
								agent that transforms academic papers into engaging, two-minute summaries. It parses
								complex text, figures, and equations, scripts a clear narrative, and delivers it all
								with a smooth, human-like voiceover—making videos.
							</p>
						</article>

						<div class="flex flex-wrap gap-2">
							<span
								class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-500/20"
							>
								<span class="icon-[lucide--calendar] mr-1.5 h-3.5 w-3.5"></span>
								2024
							</span>
							<span
								class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset dark:bg-blue-900/20 dark:text-blue-300 dark:ring-blue-500/20"
							>
								<span class="icon-[lucide--map] mr-1.5 h-3.5 w-3.5"></span>
								Hackathon
							</span>
							<span
								class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-500/20"
							>
								<span class="icon-[lucide--brain] mr-1.5 h-3.5 w-3.5"></span>
								Mixtral-8x7B LoRA
							</span>
							<span
								class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-500/20"
							>
								<span class="icon-[lucide--speaker] mr-1.5 h-3.5 w-3.5"></span>
								Text-to-Speech
							</span>
							<span
								class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-500/20"
							>
								<span class="icon-[devicon--react] mr-1.5 h-3.5 w-3.5"></span>
								React
							</span>
						</div>

						<div class="mt-4 flex flex-col gap-2">
							<Button
								variant="outline"
								class={[
									'group inline-flex w-full items-center justify-center rounded-md px-2 py-0.5 text-base font-medium',
									'border-red-300 bg-red-300/50 text-gray-800 transition-colors hover:border-red-400 hover:bg-red-400/50 dark:border-red-700 dark:bg-red-700/30 dark:text-gray-300 dark:hover:border-red-600 dark:hover:bg-red-600/30 '
								]}
							>
								<a
									href="https://www.youtube.com/@Arxflix"
									target="_blank"
									rel="noopener noreferrer"
									class="flex w-full items-center justify-center"
									aria-label="Check the Youtube Channel"
								>
									<span class="icon-[logos--youtube-icon] mr-1 size-6"></span>
									<span class="mx-1">Check the Youtube Channel</span>
									<span
										class="icon-[lucide--external-link] ml-1 size-4 opacity-0 duration-200 group-hover:opacity-100"
									></span>
								</a>
							</Button>
							<Button
								variant="outline"
								class={[
									'group inline-flex w-full items-center justify-center rounded-md px-2 py-0.5 text-base font-medium',
									'border-gray-300 bg-gray-300/50 text-gray-800 transition-colors hover:border-gray-400 hover:bg-gray-400/50 dark:border-gray-700 dark:bg-gray-700/30 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:bg-gray-600/30 '
								]}
							>
								<a
									href="https://github.com/julien-blanchon/arxflix"
									target="_blank"
									rel="noopener noreferrer"
									class="flex w-full items-center justify-center"
									aria-label="Check the Github Repository"
								>
									<span class="icon-[logos--github-icon] mr-1 size-6"></span>
									<span class="mx-1">Check the Github Repository</span>
									<span
										class="icon-[lucide--external-link] ml-1 size-4 opacity-0 duration-200 group-hover:opacity-100"
									></span>
								</a>
							</Button>
						</div>
					</div>

					<div class="w-full sm:w-2/5">
						<figure class="relative flex w-full flex-col items-center">
							<enhanced:img
								src="$lib/assets/projects/arxflix/cover.png"
								alt="Arxflix video interface"
								class="aspect-video w-full rounded border border-gray-200 object-cover dark:border-gray-700"
								sizes="(min-width: 1280px) 384px, (min-width: 768px) 320px, (min-width: 640px) 384px, 100vw"
								loading="lazy"
								width="768"
								height="432"
							/>
							<figcaption
								class="mt-2 text-center text-sm tracking-normal text-gray-600 dark:text-gray-400"
							>
								Fig. 1: Example of arxflix video
							</figcaption>
						</figure>
					</div>
				</div>
			</div>
		</section>

		<!-- Montelimar -->
		<section class="mb-10" aria-labelledby="project-montelimar-heading">
			<h3
				id="project-montelimar-heading"
				class="mt-6 mb-2 flex items-center text-xl font-semibold tracking-tight text-gray-800 dark:text-gray-200"
			>
				<span
					class="project-badge mr-2 inline-flex size-7 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
				></span>
				Montelimar
			</h3>
			<p class="mb-4 text-base leading-relaxed tracking-normal">
				Montelimar: an open-source, on-device OCR toolkit for snipping and copying text—flexible,
				modular, and perfect for non-Latin scripts and LaTeX.
			</p>

			<div
				class="mb-6 rounded-md border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				<div class="flex flex-col gap-4 sm:flex-row sm:items-start">
					<div class="flex-1 space-y-4">
						<article>
							<p class="mt-2 text-base leading-relaxed tracking-normal">
								Montelimar is an open-source, on-device OCR engine and desktop application that lets
								you snip a portion of your screen and copy the recognized text straight to your
								clipboard. It’s designed as a general-purpose, non-opinionated toolkit with a
								flexible, modular architecture—ideal for anyone building custom OCR workflows. My
								goal is for Montelimar to become the go-to framework for next-generation OCR apps,
								especially those targeting non-Latin scripts and LaTeX-formatted content.
							</p>
						</article>

						<div class="flex flex-wrap gap-2">
							<span
								class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-500/20"
							>
								<span class="icon-[lucide--calendar] mr-1.5 h-3.5 w-3.5"></span>
								2024
							</span>
							<span
								class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-500/20"
							>
								<span class="icon-[lucide--candy] mr-1.5 h-3.5 w-3.5"></span>
								Nougat
							</span>
							<span
								class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-500/20"
							>
								<span class="icon-[lucide--camera] mr-1.5 h-3.5 w-3.5"></span>
								OCR
							</span>
							<span
								class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-500/20"
							>
								<span class="icon-[lucide--app-window] mr-1.5 h-3.5 w-3.5"></span>
								Application
							</span>
							<span
								class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-500/20"
							>
								<span class="icon-[devicon--svelte] mr-1.5 h-3.5 w-3.5"></span>
								Svelte
							</span>
							<!-- Rust -->
							<span
								class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-500/20"
							>
								<span class="icon-[devicon--rust] mr-1.5 h-3.5 w-3.5"></span>
								Rust
							</span>
							<!-- MLX -->
							<span
								class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-500/20"
							>
								<span class="icon-[devicon--apple] mr-1.5 h-3.5 w-3.5"></span>
								MLX
							</span>
						</div>

						<div class="mt-4 flex flex-col gap-2">
							<Button
								variant="outline"
								class={[
									'group inline-flex w-full items-center justify-center rounded-md px-2 py-0.5 text-base font-medium',
									'border-gray-300 bg-gray-300/50 text-gray-800 transition-colors hover:border-gray-400 hover:bg-gray-400/50 dark:border-gray-700 dark:bg-gray-700/30 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:bg-gray-600/30 '
								]}
							>
								<a
									href="https://github.com/julien-blanchon/montelimar"
									target="_blank"
									rel="noopener noreferrer"
									class="flex w-full items-center justify-center"
									aria-label="Check the Github Repository"
								>
									<span class="icon-[logos--github-icon] mr-1 size-6"></span>
									<span class="mx-1">Try the demo</span>
									<span
										class="icon-[lucide--external-link] ml-1 size-4 opacity-0 duration-200 group-hover:opacity-100"
									></span>
								</a>
							</Button>
						</div>
					</div>

					<div class="w-full sm:w-2/5">
						<figure class="relative flex w-full flex-col items-center">
							<enhanced:img
								src="$lib/assets/projects/anyfurnish/after.webp"
								alt="Perfectly integrated chair after inpainting"
								class="aspect-video w-full rounded border border-gray-200 object-cover dark:border-gray-700"
								sizes="(min-width: 1280px) 384px, (min-width: 768px) 320px, (min-width: 640px) 384px, 100vw"
								loading="lazy"
								width="768"
								height="432"
							/>
							<figcaption
								class="mt-2 text-center text-sm tracking-normal text-gray-600 dark:text-gray-400"
							>
								Fig. 2: Montelimar interface
							</figcaption>
						</figure>
					</div>
				</div>
			</div>
		</section>

		<!-- PixDiet -->
		<section class="mb-10" aria-labelledby="project-pixdiet-heading">
			<h3
				id="project-pixdiet-heading"
				class="mt-6 mb-2 flex items-center text-xl font-semibold tracking-tight text-gray-800 dark:text-gray-200"
			>
				<span
					class="project-badge mr-2 inline-flex size-7 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
				></span>
				PixDiet
			</h3>
			<p class="mb-4 text-base leading-relaxed tracking-normal">
				A finetune of Pixtral 12B on dietetic data to generate a personalized meal plan based on
				your food preferences and health goals.
			</p>

			<div
				class="mb-6 rounded-md border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				<div class="flex flex-col gap-4 sm:flex-row sm:items-start">
					<div class="flex-1 space-y-4">
						<article>
							<p class="mt-2 text-base leading-relaxed tracking-normal">
								Again a 24h Hackathon project. I finetuned a Pixtral 12B model on dietetic data to
								generate a personalized meal plan based on your food preferences and health goals.
								It was the first finetune of Pixtral model just 24 hours after the open released.
							</p>
						</article>

						<div class="flex flex-wrap gap-2">
							<span
								class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-500/20"
							>
								<span class="icon-[lucide--calendar] mr-1.5 h-3.5 w-3.5"></span>
								2024
							</span>
							<span
								class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset dark:bg-blue-900/20 dark:text-blue-300 dark:ring-blue-500/20"
							>
								<span class="icon-[lucide--map] mr-1.5 h-3.5 w-3.5"></span>
								Hackathon
							</span>
							<span
								class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-500/20"
							>
								<span class="icon-[lucide--brain] mr-1.5 h-3.5 w-3.5"></span>
								Pixtral 12B LoRA
							</span>
						</div>

						<div class="mt-4 flex w-full flex-col gap-2">
							<div class="mt-4 flex w-full flex-col gap-2">
								<Button
									variant="outline"
									class={[
										'group inline-flex w-full items-center justify-center rounded-md px-2 py-0.5 text-base font-medium',
										'border-orange-300 bg-orange-300/50  transition-colors hover:border-orange-400 hover:bg-orange-400/50 dark:border-orange-700 dark:bg-orange-700/30  dark:hover:border-orange-600 dark:hover:bg-orange-600/30 '
									]}
								>
									<a
										href="https://huggingface.co/spaces/blanchon/PixDiet"
										target="_blank"
										rel="noopener noreferrer"
										class="flex w-full items-center justify-center"
										aria-label="Try Pixdiet on Hugging Face"
									>
										<span class="icon-[logos--hugging-face-icon] mr-1 size-6"></span>
										<span class="mx-1">Try the demo</span>
										<span
											class="icon-[lucide--external-link] ml-1 size-4 opacity-0 duration-200 group-hover:opacity-100"
										></span>
									</a>
								</Button>
								<Button
									variant="outline"
									class={[
										'group inline-flex w-full items-center justify-center rounded-md px-2 py-0.5 text-base font-medium',
										'border-orange-300 bg-orange-300/50  transition-colors hover:border-orange-400 hover:bg-orange-400/50 dark:border-orange-700 dark:bg-orange-700/30  dark:hover:border-orange-600 dark:hover:bg-orange-600/30 '
									]}
								>
									<a
										href="https://huggingface.co/blanchon/PixDiet-pixtral-nutrition-v2"
										target="_blank"
										rel="noopener noreferrer"
										class="flex w-full items-center justify-center"
										aria-label="Pixdiet Model"
									>
										<span class="icon-[logos--hugging-face-icon] mr-1 size-6"></span>
										<span class="mx-1">Pixdiet Model</span>
										<span
											class="icon-[lucide--external-link] ml-1 size-4 opacity-0 duration-200 group-hover:opacity-100"
										></span>
									</a>
								</Button>
								<Button
									variant="outline"
									disabled
									class={[
										'group inline-flex w-full items-center justify-center rounded-md px-2 py-0.5 text-base font-medium',
										'border-gray-300 bg-gray-300/50  transition-colors hover:border-gray-400 hover:bg-gray-400/50 dark:border-gray-700 dark:bg-gray-700/30  dark:hover:border-gray-600 dark:hover:bg-gray-600/30 '
									]}
								>
									<div
										class="flex w-full items-center justify-center"
										aria-label="Github Repository"
									>
										<span class="icon-[logos--github-icon] mr-1 size-6"></span>
										<span class="mx-1">Github Repository</span>
										<span
											class="icon-[lucide--external-link] ml-1 size-4 opacity-0 duration-200 group-hover:opacity-100"
										></span>
									</div>
								</Button>
							</div>
						</div>
					</div>

					<div class="w-full sm:w-2/5">
						<figure class="relative flex w-full flex-col items-center">
							<enhanced:img
								src="$lib/assets/projects/pixtral/cover.png"
								alt="PixDiet UI showing generation results"
								class="aspect-video w-full rounded border border-gray-200 object-cover dark:border-gray-700"
								sizes="(min-width: 1280px) 384px, (min-width: 768px) 320px, (min-width: 640px) 384px, 100vw"
								loading="lazy"
								width="768"
								height="432"
							/>
							<figcaption
								class="mt-2 text-center text-sm tracking-normal text-gray-600 dark:text-gray-400"
							>
								Fig. 3: Pixtral before and after finetuning on dietetic data
							</figcaption>
						</figure>
					</div>
				</div>
			</div>
		</section>

		<!-- Local Realtime Voice Agent -->
		<!-- <section class="mb-10" aria-labelledby="project-local-realtime-voice-agent-heading">
			<h3
				id="project-local-realtime-voice-agent-heading"
				class="mt-6 mb-2 flex items-center text-xl font-semibold tracking-tight text-gray-800 dark:text-gray-200"
			>
				<span
					class="project-badge mr-2 inline-flex size-7 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
				></span>
				Local Realtime Voice2Voice Agent
			</h3>
			<p class="mb-4 text-base leading-relaxed tracking-normal">
				A local psychologist voice agent that can run locally on your Macbook.
			</p>

			<div
				class="mb-6 rounded-md border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				<div class="flex flex-col gap-4 sm:flex-row sm:items-start">
					<div class="flex-1 space-y-4">
						<article>
							<p class="mt-2 text-base leading-relaxed tracking-normal">
								A local psychologist voice agent that can run locally on your Macbook.
								Custom finetune of LLama 2 on scrapped psychotherapy videos. Latency is optimized by
								removing the initial ASR part and directly using the audio stream as input of LLM thanks
								to the
								<a
									href="https://github.com/fixie-ai/ultravox"
									target="_blank"
									rel="noopener noreferrer">Ultravox framework</a
								>. TTS was done with F5TTS
							</p>
						</article>

						<div class="flex flex-wrap gap-2">
							<span
								class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-500/20"
							>
								<span class="icon-[lucide--calendar] mr-1.5 h-3.5 w-3.5"></span>
								2024
							</span>
							<span
								class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset dark:bg-blue-900/20 dark:text-blue-300 dark:ring-blue-500/20"
							>
								<span class="icon-[lucide--map] mr-1.5 h-3.5 w-3.5"></span>
								Hackathon
							</span>
							<span
								class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-500/20"
							>
								<span class="icon-[lucide--audio-waveform] mr-1.5 h-3.5 w-3.5"></span>
								Audio LLM
							</span>
							<span
								class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-500/20"
							>
								<span class="icon-[lucide--speech] mr-1.5 h-3.5 w-3.5"></span>
								TTS (Text-to-Speech)
							</span>
							<span
								class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-500/20"
							>
								<span class="icon-[devicon--rust] mr-1.5 h-3.5 w-3.5"></span>
								Rust
							</span>
							<span
								class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-500/20"
							>
								<span class="icon-[devicon--python] mr-1.5 h-3.5 w-3.5"></span>
								Python
							</span>
							<span
								class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-500/20"
							>
								<span class="icon-[devicon--react] mr-1.5 h-3.5 w-3.5"></span>
								React
							</span>
						</div>

						<div class="mt-4 flex flex-col gap-2">
							<Button
								variant="outline"
								class={[
									'group inline-flex w-full items-center justify-center rounded-md px-2 py-0.5 text-base font-medium',
									'border-gray-300 bg-gray-300/50 text-gray-800 transition-colors hover:border-gray-400 hover:bg-gray-400/50 dark:border-gray-700 dark:bg-gray-700/30 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:bg-gray-600/30 '
								]}
								disabled
							>
								<span
									class="flex w-full items-center justify-center"
									aria-label="Check the Github Repository"
								>
									<span class="icon-[logos--github-icon] mr-1 size-6"></span>
									<span class="mx-1">Check the Github Repository</span>
									<span
										class="icon-[lucide--external-link] ml-1 size-4 opacity-0 duration-200 group-hover:opacity-100"
									></span>
								</span>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section> -->

		<!-- Audio Controlled Video Generation -->
		<!-- <section class="mb-10" aria-labelledby="project-audio-controlled-video-generation-heading">
			<h3
				id="project-audio-controlled-video-generation-heading"
				class="mt-6 mb-2 flex items-center text-xl font-semibold tracking-tight text-gray-800 dark:text-gray-200"
			>
				<span
					class="project-badge mr-2 inline-flex size-7 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
				></span>
				Audio Controlled Video Generation
			</h3>
			<p class="mb-4 text-base leading-relaxed tracking-normal">
				A LTXV Controlnet to generate a video matching a given audio track.
			</p>

			<div
				class="mb-6 rounded-md border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				<div class="flex flex-col gap-4 sm:flex-row sm:items-start">
					<div class="flex-1 space-y-4">
						<article>
							<p class="mt-2 text-base leading-relaxed tracking-normal">In Progress...</p>
						</article>

						<div class="flex flex-wrap gap-2">
							<span
								class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-500/20"
							>
								<span class="icon-[lucide--calendar] mr-1.5 h-3.5 w-3.5"></span>
								2025
							</span>
							<span
								class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset dark:bg-blue-900/20 dark:text-blue-300 dark:ring-blue-500/20"
							>
								<span class="icon-[lucide--settings] mr-1.5 h-3.5 w-3.5"></span>
								Video DiT ControlNet
							</span>
							<span
								class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-500/20"
							>
								<span class="icon-[simple-icons--modal] mr-1.5 h-3.5 w-3.5"></span>
								Modal
							</span>
							<span
								class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-500/20"
							>
								<span class="icon-[lucide--video] mr-1.5 h-3.5 w-3.5"></span>
								Video Generation
							</span>
						</div>

						<div class="mt-4 flex w-full flex-col gap-2">
							<div class="mt-4 flex w-full flex-col gap-2"></div>
						</div>
					</div>
				</div>
			</div>
		</section> -->

		<!-- Furniture Inpainting -->
		<section class="mb-10" aria-labelledby="project-furniture-inpainting-heading">
			<h3
				id="project-furniture-inpainting-heading"
				class="mt-6 mb-2 flex items-center text-xl font-semibold tracking-tight text-gray-800 dark:text-gray-200"
			>
				<span
					class="project-badge mr-2 inline-flex size-7 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
				></span>
				Furniture Inpainting
			</h3>
			<p class="mb-4 text-base leading-relaxed tracking-normal">
				Seamlessly blend furniture into images for e-commerce and interior design.
			</p>

			<div
				class="mb-6 rounded-md border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				<div class="flex flex-col gap-4 sm:flex-row sm:items-start">
					<div class="flex-1 space-y-4">
						<article>
							<p class="mt-2 text-base leading-relaxed tracking-normal">
								Custom train a Flux adapter to inpaint a reference furniture (from an image) into a
								scene. The adapter handle by itself the furniture orientation, the lighting and the
								perspective.
							</p>
						</article>

						<div class="flex flex-wrap gap-2">
							<span
								class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset dark:bg-blue-900/20 dark:text-blue-300 dark:ring-blue-500/20"
							>
								<span class="icon-[lucide--calendar] mr-1.5 h-3.5 w-3.5"></span>
								2025
							</span>
							<span
								class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-500/20"
							>
								<span class="icon-[lucide--settings] mr-1.5 h-3.5 w-3.5"></span>
								DiT ControlNet
							</span>
							<span
								class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-500/20"
							>
								<span class="icon-[simple-icons--modal] mr-1.5 h-3.5 w-3.5"></span>
								Modal
							</span>
							<span
								class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-500/20"
							>
								<span class="icon-[ph--steps-fill] mr-1.5 h-3.5 w-3.5"></span>
								Quantization
							</span>
						</div>

						<div class="mt-4 flex w-full flex-col gap-2">
							<Hover aspectRatio={1 / 1} height={400} delta={50}>
								{#snippet hover()}
									<div class="flex aspect-video items-center justify-center">
										<video
											class="object-cover"
											autoplay
											muted
											loop
											playsinline
											aria-label="Furniture inpainting demo video"
										>
											<source src="/projects/anyfurnish/demo.mp4" type="video/mp4" />
											<source src="/projects/anyfurnish/demo.webm" type="video/webm" />
										</video>
									</div>
								{/snippet}
								{#snippet button()}
									<Button
										variant="outline"
										class={[
											'group inline-flex w-full items-center justify-center rounded-md px-2 py-0.5 text-base font-medium',
											'border-gray-300 bg-gray-300/50 text-gray-800 transition-colors hover:border-gray-400 hover:bg-gray-400/50 dark:border-gray-700 dark:bg-gray-700/30 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:bg-gray-600/30 '
										]}
									>
										<a
											href="https://huggingface.co/spaces/MostLikelyAI/FurnitureDemo"
											target="_blank"
											rel="noopener noreferrer"
											class="flex w-full items-center justify-center"
											aria-label="Try the furniture inpainting demo on Hugging Face"
										>
											<span class="icon-[logos--hugging-face-icon] mr-1 size-6"></span>
											<span class="mx-1">Try the demo</span>
											<span
												class="icon-[lucide--external-link] ml-1 size-4 opacity-0 duration-200 group-hover:opacity-100"
											></span>
										</a>
									</Button>
								{/snippet}
							</Hover>
						</div>
					</div>

					<div class="w-full sm:w-2/5">
						<figure class="relative flex w-full flex-col items-center">
							<enhanced:img
								src="$lib/assets/projects/anyfurnish/after.webp"
								alt="Montelimar app interface with recognized text"
								class="aspect-video w-full rounded border border-gray-200 object-cover dark:border-gray-700"
								sizes="(min-width: 1280px) 384px, (min-width: 768px) 320px, (min-width: 640px) 384px, 100vw"
								loading="lazy"
								width="768"
								height="432"
							/>
							<figcaption
								class="mt-2 text-center text-sm tracking-normal text-gray-600 dark:text-gray-400"
							>
								Fig. 4: Automatic furniture inpainting with lighting and perspective adaptation
							</figcaption>
						</figure>
					</div>
				</div>
			</div>
		</section>

		<!-- Virtual Staging -->
		<section class="mb-10" aria-labelledby="project-virtual-staging-heading">
			<h3
				id="project-virtual-staging-heading"
				class="mb-2 flex items-center text-xl font-semibold text-gray-800 dark:text-gray-200"
			>
				<span
					class="project-badge mr-2 inline-flex size-7 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
				></span>
				Virtual Staging
			</h3>
			<p class="mb-4 leading-relaxed">
				Transform empty rooms into fully furnished spaces—no masking required!
			</p>

			<div
				class="mb-6 rounded-md border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				<div class="flex flex-col gap-4 sm:flex-row sm:items-start">
					<div class="flex-1 space-y-4">
						<article>
							<p class="mt-2 text-base">
								A mask-free solution that transforms empty rooms into fully furnished spaces,
								revolutionizing how real estate professionals showcase properties. The adapter take
								care to preserve the original scene as much as possible. By fusing the virtual
								staging pipeline in one single adapter, we can process an image in under 10 seconds.
							</p>
						</article>

						<div class="flex flex-wrap gap-2">
							<span
								class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset dark:bg-blue-900/20 dark:text-blue-300 dark:ring-blue-500/20"
							>
								<span class="icon-[lucide--calendar] mr-1.5 h-3.5 w-3.5"></span>
								2025
							</span>
							<span
								class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-500/20"
							>
								<span class="icon-[lucide--settings] mr-1.5 h-3.5 w-3.5"></span>
								DiT ControlNet
							</span>
							<span
								class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-500/20"
							>
								<span class="icon-[simple-icons--modal] mr-1.5 h-3.5 w-3.5"></span>
								Modal
							</span>
							<span
								class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-500/20"
							>
								<span class="icon-[ph--steps-fill] mr-1.5 h-3.5 w-3.5"></span>
								Quantization
							</span>
						</div>

						<div class="mt-4 flex w-full flex-col gap-2">
							<Hover aspectRatio={1 / 1} height={400} delta={50}>
								{#snippet hover()}
									<div class="flex aspect-video items-center justify-center">
										<video
											class="object-cover"
											autoplay
											muted
											loop
											playsinline
											aria-label="Virtual staging demo video"
										>
											<source src="/projects/virtualstaging/demo.mp4" type="video/mp4" />
											<source src="/projects/virtualstaging/demo.webm" type="video/webm" />
										</video>
									</div>
								{/snippet}
								{#snippet button()}
									<Button
										variant="outline"
										class={[
											'group inline-flex w-full items-center justify-center rounded-md px-2 py-0.5 text-base font-medium',
											'border-gray-300 bg-gray-300/50 text-gray-800 transition-colors hover:border-gray-400 hover:bg-gray-400/50 dark:border-gray-700 dark:bg-gray-700/30 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:bg-gray-600/30 '
										]}
									>
										<a
											href="https://huggingface.co/spaces/MostLikelyAI/StagingDemo"
											target="_blank"
											rel="noopener noreferrer"
											class="flex w-full items-center justify-center"
											aria-label="Try the virtual staging demo on Hugging Face"
										>
											<span class="icon-[logos--hugging-face-icon] mr-1 size-6"></span>
											<span class="mx-1">Try the demo</span>
											<span
												class="icon-[lucide--external-link] ml-1 size-4 opacity-0 duration-200 group-hover:opacity-100"
											></span>
										</a>
									</Button>
								{/snippet}
							</Hover>
						</div>
					</div>

					<div class="w-full sm:w-2/5">
						<figure class="relative flex w-full flex-col items-center">
							<enhanced:img
								src="$lib/assets/projects/virtualstaging/after.webp"
								alt="Room virtually staged with furniture"
								class="aspect-video w-full rounded border border-gray-200 object-cover dark:border-gray-700"
								sizes="(min-width: 1280px) 384px, (min-width: 768px) 320px, (min-width: 640px) 384px, 100vw"
								loading="lazy"
								width="768"
								height="432"
							/>
							<figcaption class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
								Fig. 5: Empty room transformation with automatic furniture placement
							</figcaption>
						</figure>
					</div>
				</div>
			</div>
		</section>

		<!-- Image Decluttering -->
		<section class="mb-6" aria-labelledby="project-image-decluttering-heading">
			<h3
				id="project-image-decluttering-heading"
				class="mb-2 flex items-center text-xl font-semibold text-gray-800 dark:text-gray-200"
			>
				<span
					class="project-badge mr-2 inline-flex size-7 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
				></span>
				Image Decluttering
			</h3>
			<p class="mb-4 leading-relaxed">Remove unwanted objects from interior photos in seconds.</p>

			<div
				class="mb-6 rounded-md border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				<div class="flex flex-col gap-4 sm:flex-row sm:items-start">
					<div class="flex-1 space-y-4">
						<article>
							<p class="mt-2 text-base">
								A mask-free solution, similar to the virtual staging, but for decluttering.
							</p>
						</article>

						<div class="flex flex-wrap gap-2">
							<span
								class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset dark:bg-blue-900/20 dark:text-blue-300 dark:ring-blue-500/20"
							>
								<span class="icon-[lucide--calendar] mr-1.5 h-3.5 w-3.5"></span>
								2025
							</span>
							<span
								class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-500/20"
							>
								<span class="icon-[lucide--settings] mr-1.5 h-3.5 w-3.5"></span>
								DiT ControlNet
							</span>
							<span
								class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-500/20"
							>
								<span class="icon-[simple-icons--modal] mr-1.5 h-3.5 w-3.5"></span>
								Modal
							</span>
							<span
								class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-500/20"
							>
								<span class="icon-[ph--steps-fill] mr-1.5 h-3.5 w-3.5"></span>
								Quantization
							</span>
						</div>

						<div class="mt-4 flex w-full flex-col gap-2">
							<Hover aspectRatio={1 / 1} height={400} delta={50}>
								{#snippet hover()}
									<div class="flex aspect-video items-center justify-center">
										<video
											class="object-cover"
											autoplay
											muted
											loop
											playsinline
											aria-label="Image decluttering demo video"
										>
											<source src="/projects/virtualunstaging/demo.mp4" type="video/mp4" />
											<source src="/projects/virtualunstaging/demo.webm" type="video/webm" />
										</video>
									</div>
								{/snippet}
								{#snippet button()}
									<Button
										variant="outline"
										class={[
											'group inline-flex w-full items-center justify-center rounded-md px-2 py-0.5 text-base font-medium',
											'border-gray-300 bg-gray-300/50 text-gray-800 transition-colors hover:border-gray-400 hover:bg-gray-400/50 dark:border-gray-700 dark:bg-gray-700/30 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:bg-gray-600/30 '
										]}
									>
										<a
											href="https://huggingface.co/spaces/MostLikelyAI/UnstagingDemo"
											target="_blank"
											rel="noopener noreferrer"
											class="flex w-full items-center justify-center"
											aria-label="Try the image decluttering demo on Hugging Face"
										>
											<span class="icon-[logos--hugging-face-icon] mr-1 size-6"></span>
											<span class="mx-1">Try the demo</span>
											<span
												class="icon-[lucide--external-link] ml-1 size-4 opacity-0 duration-200 group-hover:opacity-100"
											></span>
										</a>
									</Button>
								{/snippet}
							</Hover>
						</div>
					</div>

					<div class="w-full sm:w-2/5">
						<figure class="relative flex w-full flex-col items-center">
							<enhanced:img
								src="$lib/assets/projects/virtualunstaging/after.webp"
								alt="Decluttered room after object removal"
								class="aspect-video w-full rounded border border-gray-200 object-cover dark:border-gray-700"
								sizes="(min-width: 1280px) 384px, (min-width: 768px) 320px, (min-width: 640px) 384px, 100vw"
								loading="lazy"
								width="768"
								height="432"
							/>
							<figcaption class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
								Fig. 6: Automatic removal of unwanted objects from interior scenes
							</figcaption>
						</figure>
					</div>
				</div>
			</div>
		</section>

		<!-- Intrinsic Extraction -->
		<!-- <section class="mb-10" aria-labelledby="project-intrinsic-extraction-heading">
			<h3
				id="project-intrinsic-extraction-heading"
				class="mt-6 mb-2 flex items-center text-xl font-semibold tracking-tight text-gray-800 dark:text-gray-200"
			>
				<span
					class="mproject-badge r-2 inline-flex size-7 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
					>10</span
				>
				Intrinsic Extraction
			</h3>
			<p class="mb-4 text-base leading-relaxed tracking-normal">...</p>

			<div
				class="mb-6 rounded-md border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				<div class="flex flex-col gap-4 sm:flex-row sm:items-start">
					<div class="flex-1 space-y-4">
						<article>
							<p class="mt-2 text-base leading-relaxed tracking-normal">...</p>
						</article>

						<div class="flex flex-wrap gap-2">
							<span
								class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-500/20"
							>
								<span class="icon-[lucide--calendar] mr-1.5 h-3.5 w-3.5"></span>
								2025
							</span>
							<span
								class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset dark:bg-blue-900/20 dark:text-blue-300 dark:ring-blue-500/20"
							>
								<span class="icon-[hugeicons--chart-down] mr-1.5 h-3.5 w-3.5"></span>
								Diffusion Models Training
							</span>
						</div>

						<div class="mt-4 flex w-full flex-col gap-2"></div>
					</div>

					<div class="w-full sm:w-2/5">
						<figure class="relative flex w-full flex-col items-center">
							<enhanced:img
								src="$lib/assets/projects/intrinsic-extraction/cover.png"
								alt="Example of intrinsic extraction, here irradiance"
								class="aspect-video w-full rounded border border-gray-200 object-cover dark:border-gray-700"
								sizes="(min-width: 1280px) 384px, (min-width: 768px) 320px, (min-width: 640px) 384px, 100vw"
								loading="lazy"
								width="768"
								height="432"
							/>
							<figcaption
								class="mt-2 text-center text-sm tracking-normal text-gray-600 dark:text-gray-400"
							>
								Fig. 7: Example of intrinsic extraction, here irradiance
							</figcaption>
						</figure>
					</div>
				</div>
			</div>
		</section>
	</section> -->
	</section>
</div>

<!-- twoslash-python -->

<style>
	.projects {
		counter-reset: project-counter;
	}

	.projects > section {
		counter-increment: project-counter;
	}

	.project-badge::before {
		content: counter(project-counter);
	}
</style>
