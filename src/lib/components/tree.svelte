<script lang="ts">
	import { type TableOfContentsItem, type TableOfContentsElements, melt } from '@melt-ui/svelte';
	import Tree from './tree.svelte';
	import { crossfade, slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	interface Props {
		tree: TableOfContentsItem[];
		activeHeadingIdxs: number[];
		item: TableOfContentsElements['item'];
		level?: number;
	}

	let { tree, activeHeadingIdxs, item, level = 1 }: Props = $props();

	type HeadingState = 'active' | 'read' | 'unread';

	function getState(index: number): HeadingState {
		// If the heading is active, return 'active'
		if (activeHeadingIdxs.includes(index)) return 'active';
		// If the heading is before the first active heading, return 'read'
		if (index < activeHeadingIdxs[0]) return 'read';
		// Otherwise, return 'unread'
		return 'unread';
	}

	function isFullyRead(heading: TableOfContentsItem): boolean {
		// If the heading is read and all its children are read, return true
		return getState(heading.index) === 'read' && (heading.children?.every(isFullyRead) ?? true);
	}

	function isExpanded(heading: TableOfContentsItem): boolean {
		const state = getState(heading.index);
		// If the heading is active, return true
		if (state === 'active') return true;
		// If the heading has an active child, return true
		if (heading.children?.some((c) => getState(c.index) === 'active')) return true;
		// If the heading is read and all its children are read, return false
		if (isFullyRead(heading)) return false;
		// return heading.children?.some((c) => getState(c.index) !== 'read') ?? true;
		// Otherwise, return true
		return true;
	}

	interface IconDatabaseItem {
		closed: string;
		open: string;
	}

	const iconDatabase = {
		1: {
			unread: 'icon-[pixelarticons--file-plus]',
			read: 'icon-[pixelarticons--file]',
			active: 'icon-[pixelarticons--file-alt]'
		},
		2: {
			unread: {
				expanded: 'icon-[heroicons--folder-open]',
				collapsed: 'icon-[heroicons--folder]'
			},
			read: {
				expanded: 'icon-[heroicons--folder-open]',
				collapsed: 'icon-[heroicons--folder]'
			},
			active: {
				expanded: 'icon-[heroicons--folder-open]',
				collapsed: 'icon-[heroicons--folder]'
			}
		}
	};

	function getIcon(heading: TableOfContentsItem): string {
		const state = getState(heading.index);
		const level = heading.children?.length ? 2 : 1;
		if (level === 1) {
			return iconDatabase[level][state];
		}
		return iconDatabase[level][state][isExpanded(heading) ? 'expanded' : 'collapsed'];
	}

	const colorDatabase = {
		unread: 'text-gray-400 dark:text-gray-500',
		read: 'text-emerald-500 dark:text-emerald-400',
		active: 'text-blue-500 dark:text-blue-400'
	};

	function getColor(heading: TableOfContentsItem): string {
		const state = getState(heading.index);
		return colorDatabase[state];
	}

	const [send, receive] = crossfade({
		duration: 500,
		easing: quintOut
	});
</script>

<ul
	class="m-0 list-none border-l-2 border-gray-700/30 dark:border-gray-600"
	transition:slide={{ duration: 300 }}
	data-is-first-level={level === 1}
	style:--level={level}
	style:margin-left={`calc(var(--level) * 0.25rem)`}
>
	{#each tree as heading (heading.id)}
		{@const state = getState(heading.index)}
		{@const expanded = isExpanded(heading)}
		{@const hasChildren = heading.children?.length}

		<li
			class="group"
			data-level={level}
			data-state={state}
			data-expanded={expanded}
			data-has-children={!!heading.children?.length}
		>
			<a
				href={`#${heading.id}`}
				aria-label={`${heading.id} - ${heading.node.innerHTML}`}
				use:melt={$item(heading.id)}
				class={[
					'relative flex items-center gap-2 rounded px-1 py-0.5 text-sm no-underline outline-none',
					'duration-500',
					'hover:bg-gray-100 hover:pl-2 focus-visible:bg-gray-100 dark:hover:bg-gray-800 dark:focus-visible:bg-gray-800'
				]}
			>
				<!-- Icon -->
				<span
					class={[
						'size-4 shrink-0 transition-transform duration-500 group-hover:scale-110',
						getIcon(heading),
						getColor(heading)
					]}
				>
				</span>
				<!-- Title -->
				<span class={['flex-1 truncate py-0.5 duration-500', getColor(heading)]}>
					{@html heading.node.innerHTML}
				</span>

				<!-- Chevron for expandable sections -->
				{#if hasChildren}
					<span
						class={[
							'size-3.5 transform transition-transform duration-300 ease-in-out',
							'icon-[pixelarticons--chevron-down]',
							'group-data-[expanded=true]:rotate-0',
							getColor(heading),
							expanded ? 'rotate-0' : '-rotate-90'
						]}
					>
					</span>
				{:else}
					<!-- Status indicators for leaf nodes -->
					{#if state === 'read'}
						<span
							class={[
								'icon-[heroicons--check-circle-solid] size-3.5 transition-opacity duration-300',
								getColor(heading)
							]}
						>
						</span>
					{:else if state === 'active'}
						<span
							class={[
								'icon-[heroicons--arrow-right-circle-solid] size-3.5 transition-opacity duration-300',
								getColor(heading)
							]}
						>
						</span>
					{:else if state === 'unread'}
						<span
							class={[
								'icon-[heroicons--circle-stack] size-3.5 transition-opacity duration-300',
								getColor(heading)
							]}
						>
						</span>
					{/if}
				{/if}

				<!-- Presence element -->
				{#if state === 'active'}
					<span
						class={[
							'absolute inset-0 z-10 -ml-0.5 ',
							'bg-blue-500/5 dark:bg-blue-400/5',
							'border-l-2 border-blue-500 dark:border-blue-400'
						]}
						in:receive={{ key: 'active' }}
						out:send={{ key: 'active' }}
					>
					</span>
				{:else if state === 'read'}
					<span
						class={[
							'absolute inset-0 z-10 -ml-0.5 ',
							'border-l-2 border-emerald-500 dark:border-emerald-400'
						]}
					>
					</span>
				{/if}
			</a>

			{#if heading.children?.length && expanded}
				<div class="overflow-hidden">
					<Tree tree={heading.children} {activeHeadingIdxs} {item} level={level + 1} />
				</div>
			{/if}
		</li>
	{/each}
</ul>
