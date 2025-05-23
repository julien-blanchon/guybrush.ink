<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['blockquote'] & {
		children: Snippet;
	};

	let { children, class: className, ...props }: Props = $props();
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
		'border-1 !border-l-4 border-[var(--rc-color-light)] dark:border-[var(--rc-color-dark)]',
		'my-4 rounded-lg  bg-gray-50 px-6 py-5 text-gray-700 dark:bg-gray-900 dark:text-gray-300',
		'shadow-sm',
		'italic',
		'text-base leading-relaxed',
		'relative',
		'before:absolute before:top-0 before:left-1 before:font-serif before:text-4xl before:text-gray-300 before:opacity-30 before:content-["""] dark:before:text-gray-700',
		'after:absolute after:right-3 after:bottom-0 after:font-serif after:text-4xl after:text-gray-300 after:opacity-30 after:content-["""] dark:after:text-gray-700',
		// 'first-of-type:first-letter:text-base-content first-of-type:mb-12 first-of-type:text-justify first-of-type:text-pretty first-of-type:first-letter:float-left first-of-type:first-letter:me-3 first-of-type:first-letter:text-5xl first-of-type:first-letter:font-bold first-of-type:first-line:tracking-widest first-of-type:first-line:uppercase',
		className
	]}
>
	{@render children()}
</blockquote>
