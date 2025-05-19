<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['blockquote'] & {
		children: Snippet;
	};

	let { children, ...props }: Props = $props();
</script>

<!-- <blockquote class="relative p-4">
	<span
		class="icon-[tabler--quote] absolute -start-3 -top-3 size-16 rotate-180 text-base rtl:rotate-0"
	></span>

	<div class="relative z-1">
		<p class="text-lg">
			<em>
				{@render children()}
			</em>
		</p>
	</div>
</blockquote> -->
<blockquote
	{...props}
	class={[
		'first-letter:text-base-content mb-12 text-justify text-pretty first-letter:float-left first-letter:me-3 first-letter:text-5xl first-letter:font-bold first-line:tracking-widest first-line:uppercase'
	]}
>
	{@render children()}
</blockquote>
