<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = SvelteHTMLElements['table'] & {
		children: Snippet;
	};

	let { children, class: className, ...props }: Props = $props();
</script>

<div class="my-8 flex flex-col">
	<div class="-m-1.5 overflow-x-auto">
		<div class="inline-block min-w-full p-1.5 align-middle">
			<div
				class="overflow-hidden rounded-lg border border-gray-200 shadow-md dark:border-gray-700 dark:shadow-gray-900/20"
			>
				<table
					class={[
						'min-w-full divide-y divide-gray-200 dark:divide-gray-700',
						'bg-white dark:bg-gray-800/90',
						'font-sans',
						className
					]}
					{...props}
				>
					{@render children()}
				</table>
			</div>
		</div>
	</div>
</div>
