<script lang="ts">
	import type { Polygon } from 'geojson';
	import { geoOrthographic, geoCircle } from 'd3-geo';
	import { feature } from 'topojson-client';
	import { Chart, GeoContext, GeoPath, Graticule, Svg, Tooltip, GeoPoint, Text } from 'layerchart';
	import type { GeometryCollection, Topology } from 'topojson-specification';
	import { onMount, onDestroy } from 'svelte';
	import { type Location } from '$lib/types/location';

	type Props = {
		location: Location | undefined;
	};

	const { location = $bindable() }: Props = $props();

	import dataJson from './countries-110m.json';
	const data = dataJson as Topology<{
		countries: GeometryCollection<{ name: string }>;
		land: GeometryCollection;
	}>;
	const countries = feature(data, data.objects.countries);

	const visitedCountriesName = [
		'United States of America',
		'Canada',
		'Spain',
		'France',
		'Germany',
		'Belgium',
		'Netherlands',
		'United Kingdom',
		'Austria'
	];
	const wishlistCountriesName = [
		'Italy',
		'Switzerland',
		'Japan',
		'South Korea',
		'Taiwan',
		'Hong Kong',
		'Mexico',
		'China'
	];

	const currentLocation = $derived(location);

	// Sentinel-2 orbit setup
	const inc = (98.6 * Math.PI) / 180;
	const REVISIT_DAYS = 9;

	type Position = [number, number];
	type Orbit = Position[];
	const orbit: Orbit = Array.from({ length: 361 }, (_, i) => {
		const lon = i - 180;
		const lat = (Math.asin(Math.sin(inc) * Math.sin((lon * Math.PI) / 180)) * 180) / Math.PI;
		return [lon, lat] as Position;
	});
	const offsets = Array.from({ length: REVISIT_DAYS }, (_, k) => (k * 360) / REVISIT_DAYS);
	const orbits: Orbit[] = offsets.map((offset) =>
		orbit.map(([lon, lat]) => [((lon + offset + 540) % 360) - 180, lat] as [number, number])
	);

	let orbitIndex = $state(0);
	let orbitDayIndex = $state(0);
	let orbitFrame = $state(0);
	let wasNearPole = $state(false);
	function tick() {
		const [lon, lat] = orbits[orbitDayIndex][orbitIndex];

		// If near pole, and we're at the beginning of the orbit, switch to next orbit
		const nearPole = Math.abs(lat) > 80;

		if (nearPole && !wasNearPole) {
			orbitDayIndex = (orbitDayIndex + 1) % REVISIT_DAYS;
			wasNearPole = true;
		} else if (!nearPole) {
			wasNearPole = false;
		}

		orbitIndex = (orbitIndex + 1) % orbit.length;
		orbitFrame = requestAnimationFrame(tick);
	}

	onMount(() => {
		tick();
		return () => {
			cancelAnimationFrame(orbitFrame);
		};
	});
</script>

<div class="flex h-[500px] flex-col gap-4 pt-10">
	<Chart
		geo={{ projection: geoOrthographic, fitGeojson: countries, applyTransform: ['rotate'] }}
		let:tooltip
		let:projection
	>
		{@const [yaw, pitch, roll] = projection.rotate()}
		<Svg>
			<!-- Earth sphere -->

			<GeoPath geojson={{ type: 'Sphere' }} class="fill-blue-400/30" />

			<!-- Back hemisphere orbits -->
			<GeoContext
				projection={geoOrthographic}
				fitGeojson={countries}
				rotate={{ yaw: yaw + 180, pitch: -pitch, roll: -roll }}
				reflectX
			>
				<Graticule class="stroke-surface-content/5" />
				{#each countries.features as country (country.properties.name)}
					{#if visitedCountriesName.includes(country.properties.name)}
						<GeoPath
							geojson={country}
							class="cursor-pointer fill-green-500/80 stroke-green-700/80 opacity-30"
							{tooltip}
						/>
					{:else if wishlistCountriesName.includes(country.properties.name)}
						<GeoPath
							geojson={country}
							class="cursor-pointer fill-yellow-400/70 stroke-yellow-600/80 opacity-30"
							reflectX
						/>
					{:else}
						<GeoPath
							geojson={country}
							class="cursor-pointer fill-slate-200/60 stroke-slate-400/60 opacity-30"
							reflectX
						/>
					{/if}
				{/each}
			</GeoContext>

			<!-- Front hemisphere orbits and map -->

			<Graticule class="stroke-surface-content/20" />
			{#each countries.features as country (country.properties.name)}
				{#if visitedCountriesName.includes(country.properties.name)}
					<GeoPath
						geojson={country}
						class="z-10 cursor-pointer fill-green-500 stroke-green-700 hover:fill-green-600 hover:stroke-green-800"
						{tooltip}
					/>
				{:else if wishlistCountriesName.includes(country.properties.name)}
					<GeoPath
						geojson={country}
						class="z-10 cursor-pointer fill-yellow-400 stroke-yellow-600 hover:fill-yellow-500 hover:stroke-yellow-700"
						{tooltip}
					/>
				{:else}
					<GeoPath
						geojson={country}
						class="z-10 cursor-pointer fill-slate-200 stroke-slate-400 hover:fill-slate-300 hover:stroke-slate-500"
						reflectX
					/>
				{/if}
			{/each}
			{#each orbits as track (track.join(','))}
				<GeoPath
					geojson={{ type: 'LineString', coordinates: track }}
					class="pointer-events-none z-0 cursor-default stroke-pink-900 stroke-2 opacity-20"
				/>
			{/each}

			<!-- Back hemisphere satellite circle -->
			<GeoContext
				projection={geoOrthographic}
				fitGeojson={countries}
				rotate={{ yaw: yaw + 180, pitch: -pitch, roll: -roll }}
				reflectX
			>
				<GeoPath
					geojson={geoCircle().center(orbits[orbitDayIndex][orbitIndex]).radius(10)()}
					class="pointer-events-none z-0 cursor-default fill-pink-500/40 stroke-pink-500 stroke-2 opacity-20"
				/>
			</GeoContext>

			<!-- Front hemisphere satellite circle -->
			<GeoPath
				geojson={geoCircle().center(orbits[orbitDayIndex][orbitIndex]).radius(10)()}
				class="pointer-events-none z-0 cursor-default fill-pink-500/40 stroke-pink-500 stroke-2"
			/>

			<!-- Current location -->
			{#if currentLocation}
				<GeoPoint lat={currentLocation.latitude} long={currentLocation.longitude}>
					<!-- <Text
						y={-4}
						value={currentLocation.city}
						textAnchor="middle"
						class={[
							'pointer-events-none z-0 cursor-default text-[8px] font-semibold',
							currentLocation.textColor
						].join(' ')}
					/> -->
					<circle r="3" class={['animate-ping fill-red-500']} />
				</GeoPoint>
			{/if}
		</Svg>

		<!-- Tooltip -->
		<Tooltip.Root let:data>
			<Tooltip.Header>{data.properties.name}</Tooltip.Header>
		</Tooltip.Root>
	</Chart>

	<!-- Legend -->
	<div class="mb-4 flex w-full flex-wrap items-center justify-center gap-4">
		<div class="flex items-center gap-2">
			<span class="inline-block aspect-square size-4 rounded border-2 border-green-700 bg-green-500"
			></span>
			<span class="text-sm">Visited</span>
		</div>
		<div class="flex items-center gap-2">
			<span
				class="inline-block aspect-square size-4 rounded border-2 border-yellow-600 bg-yellow-400"
			></span>
			<span class="text-sm">Wishlist</span>
		</div>
		<div class="flex items-center gap-2">
			<span class="inline-block aspect-square size-4 rounded border-2 border-slate-400 bg-slate-200"
			></span>
			<span class="text-sm">Not visited</span>
		</div>
		<div class="flex items-center gap-2">
			<span class="inline-block aspect-square size-4 rounded border-2 border-pink-500 bg-pink-200"
			></span>
			<span class="text-sm">
				Place I can still explore with
				<a
					href="https://apps.sentinel-hub.com/eo-browser/"
					target="_blank"
					rel="noopener noreferrer"
					class="text-blue-500"
				>
					open data
				</a>
			</span>
		</div>
	</div>
</div>
