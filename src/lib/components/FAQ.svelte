<script lang="ts">
	import { Accordion } from 'bits-ui';
	type Item = {
		title: string;
		content: string;
	};
	type Props = {
		items: Item[];
		firstLetter?: string;
	};

	const { items, firstLetter = 'Q' }: Props = $props();
</script>

<div
	class="mx-auto max-w-3xl rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
>
	<Accordion.Root class="w-full space-y-4" type="multiple">
		{#each items as item, index (index)}
			<Accordion.Item
				value={index.toString()}
				class="group border-gray-100 pb-2 not-last:border-b dark:border-gray-700"
			>
				<Accordion.Header>
					<Accordion.Trigger
						class="group flex w-full items-center justify-between text-left text-gray-900 hover:cursor-pointer dark:text-gray-100"
					>
						<h3 class="text-sm font-medium tracking-wide">
							<span class="mr-1 font-serif font-semibold">{firstLetter}{index + 1}:</span>
							<span class="font-medium tracking-normal">{item.title}</span>
						</h3>
						<span
							class="icon-[lucide--plus] h-4 w-4 transition-transform ease-in-out group-data-[state=open]:rotate-[225deg]"
						></span>
					</Accordion.Trigger>
				</Accordion.Header>
				<Accordion.Content
					class="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down relative overflow-hidden text-gray-600 dark:text-gray-400"
				>
					<p
						class="mt-2 ml-1 border-l-2 border-gray-200 pt-3 pl-4 text-sm leading-relaxed tracking-wide dark:border-gray-600"
					>
						<span class="font-normal">{item.content}</span>
					</p>
				</Accordion.Content>
			</Accordion.Item>
		{/each}
	</Accordion.Root>
</div>
