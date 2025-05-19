<script lang="ts">
	import katex from 'katex';
	// export let math;
	// export let displayMode = false;

	type Props = {
		math: string;
		displayMode?: boolean;
	};

	const { math, displayMode = false }: Props = $props();

	const options = {
		displayMode: displayMode,
		throwOnError: false
	};

	let katexString = $derived(katex.renderToString(math, options));
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.css"
		integrity="sha384-FkTZUsHjYVyYpU6dse+5AzszY5617FqhnLpcMIIAlLKTbdmeVMO/7K6BrdHWM28V"
		crossorigin="anonymous"
	/>
</svelte:head>

{@html katexString}
