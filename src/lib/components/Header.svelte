<script lang="ts">
	import { page } from '$app/state';
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import type { ClassValue } from 'svelte/elements';
	import ThemeSwitch from './ThemeSwitch.svelte';
	import Command from './Command.svelte';
	import { commandState, receiveHeader, sendHeader } from '$lib/runes/commandSwitch.svelte';
	import { longpress } from '$lib/actions/longpress.svelte';
	import type { SvelteComponent } from 'svelte';
	import type { Picture } from 'vite-imagetools';
	import SoundSwitch from './SoundSwitch.svelte';

	type NavBarItem = {
		label: string;
		href: string;
		icon?: ClassValue;
		className?: ClassValue;
		disabled?: boolean;
	};

	type ImagePair = {
		light: SvelteComponent<Picture>;
		dark: SvelteComponent<Picture>;
	};

	const { navBarItems, selectedPair }: { navBarItems: NavBarItem[]; selectedPair: ImagePair } =
		$props();

	const [send, receive] = crossfade({
		duration: 500,
		easing: quintOut
	});
</script>

<header
	class="animate-in fade-in zoom-in-0 z-[100] flex h-10 w-full items-center justify-between py-2 duration-700"
>
	<ThemeSwitch />
	<SoundSwitch />
	<Command {selectedPair} />
</header>
<section class="animate-in fade-in zoom-in-0 h-full pb-6 duration-700">
	{#if !commandState.open}
		<div
			class="group/header border-coffee-500 bg-coffee-200 relative z-50 origin-bottom overflow-hidden rounded-lg border p-4 text-pretty shadow-sm duration-300 ease-in-out hover:scale-[1.01] hover:shadow-lg hover:shadow-stone-400 dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-gray-900"
			role="navigation"
			in:receiveHeader={{ key: 'header' }}
			out:sendHeader={{ key: 'header' }}
			use:longpress={{ duration: 500 }}
			onlongpress={() => {
				// commandState.open = true;
			}}
			onmouseenter={() => {
				// commandState.open = false;
			}}
		>
			<!-- Background image with custom mask -->
			<figure
				class="animate-blur-in animate-duration-800 animate-delay-300 animate-once animate-ease-linear absolute inset-0 motion-reduce:animate-none!"
			>
				<div
					class="noise_filter absolute inset-0 z-10 transition-transform duration-300 ease-in-out group-hover/header:scale-110"
				></div>
				<div
					class="via-coffee-200/30 to-coffee-200/95 absolute inset-0 z-20 bg-radial-[at_top_right] from-transparent from-0% via-20% to-80% opacity-100 transition-opacity duration-300 ease-in-out group-hover/header:opacity-50 dark:via-gray-800/30 dark:to-gray-800/95"
				></div>
				{#if selectedPair}
					<enhanced:img
						src={selectedPair.light.default}
						alt="Generated background Light"
						class="block h-full w-full transform-gpu object-cover blur-none duration-300 ease-in-out group-hover/header:scale-110 group-hover/header:blur-2xl dark:hidden"
						sizes="(min-width: 1280px) 1024px, (min-width: 1024px) 900px, (min-width: 768px) 768px, (min-width: 640px) 600px, 100vw"
						fetchpriority="high"
						width="640"
						height="240"
						loading="eager"
						aria-hidden="true"
					/>
					<enhanced:img
						src={selectedPair.dark.default}
						alt="Generated background Dark"
						class="hidden h-full w-full object-cover blur-none transition-transform duration-300 ease-in-out group-hover/header:scale-110 group-hover/header:blur-2xl dark:block"
						fetchpriority="high"
						sizes="(min-width: 1280px) 1024px, (min-width: 1024px) 900px, (min-width: 768px) 768px, (min-width: 640px) 600px, 100vw"
						width="640"
						height="240"
						loading="eager"
						aria-hidden="true"
					/>
				{/if}
			</figure>
			<!-- Content container with relative positioning -->
			<div class="relative z-20">
				<!-- Combined Header and Navigation -->
				<!-- Header Content -->
				<hgroup class="w-full pb-4 text-stone-900 md:w-3/5 dark:text-gray-100">
					<h1
						class="mb-2 font-serif text-4xl font-black tracking-tight text-stone-950 dark:text-white"
					>
						Guybrush.ink
					</h1>
					<p class="mb-2 text-xl font-medium tracking-wide text-stone-800 dark:text-gray-200">
						AI Research for Real-World Applications
					</p>
					<p class="mb-1 text-sm font-medium tracking-normal text-stone-700 dark:text-gray-300">
						Julien Blanchon
						<sup class="text-xs">*</sup>
					</p>
				</hgroup>

				<hr
					class="my-2 shrink-0 bg-stone-900/20 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-[1px] dark:bg-gray-300/20"
					aria-orientation="horizontal"
					data-orientation="horizontal"
				/>
				<nav
					class="w-full"
					aria-label="main"
					data-orientation="horizontal"
					dir="ltr"
					data-navigation-menu
				>
					<ul
						class=" flex list-none items-center justify-evenly text-sm font-medium tracking-wide text-stone-800 dark:text-gray-300"
						data-orientation="horizontal"
					>
						{#each navBarItems as item (item)}
							<li
								data-navigation-menu-item
								data-active={item.href === page.url.pathname}
								data-disabled={item.disabled}
								class={[
									item.className,
									'group relative',
									'flex h-9 items-center justify-center',
									'px-4 transition-colors hover:text-stone-950 dark:hover:text-white',
									'data-[active=true]:text-stone-950 dark:data-[active=true]:text-white',
									'data-disabled:cursor-not-allowed data-disabled:opacity-50'
								]}
							>
								{#snippet content()}
									<!-- Improved active marker with better styling -->
									{#if item.href === page.url.pathname}
										<span
											class="absolute bottom-0 left-1/2 h-0.5 w-1/2 -translate-x-1/2 rounded-t-xs bg-stone-900 dark:bg-gray-300"
											in:receive={{ key: 'block' }}
											out:send={{ key: 'block' }}
										></span>
									{:else}
										<span
											class="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-t-xs bg-stone-800 transition-[width] duration-300 ease-in-out group-hover:w-1/2 group-data-[active=true]:w-0 dark:bg-gray-400"
										></span>
									{/if}
									<div class="relative flex items-center justify-center">
										{#if item.icon}
											<span class={[item.icon, 'h-4 w-4']}></span>
										{:else}
											<span>{item.label}</span>
										{/if}
									</div>
								{/snippet}
								{#if item.disabled}
									<div aria-label={item.label}>{@render content()}</div>
								{:else}
									<a href={item.href} aria-label={item.label}>
										{@render content()}
									</a>
								{/if}
							</li>
						{/each}
					</ul>
				</nav>
			</div>
		</div>
	{/if}
</section>
