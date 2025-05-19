<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['hr'];

	let { ...props }: Props = $props();
</script>

<hr {...props} />
