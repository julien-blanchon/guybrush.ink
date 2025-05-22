<script lang="ts">
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();

	function formatDate(date: Date) {
		return date.toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>Writings | Guybrush.ink</title>
	<meta name="description" content="Read the latest articles and updates from Guybrush.ink." />
</svelte:head>

<section aria-labelledby="blog-title" class="blog-list">
	<h1 id="blog-title" class="mb-2 text-3xl font-bold">Writings</h1>
	<p class="mb-6 text-gray-600 dark:text-gray-400">
		Here you can find all my articles and thoughts
	</p>

	{#if data.posts.length === 0}
		<p class="text-gray-500">No posts found.</p>
	{:else}
		<ul class="flex flex-col space-y-6">
			{#each data.posts as post, i (post.slug)}
				<a
					class="rounded-md border border-gray-200 bg-white p-5 shadow-sm duration-200 focus-within:ring-2 focus-within:ring-blue-400 hover:bg-blue-50 hover:shadow-lg active:scale-[0.98] dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
					href={`/writings/${post.slug}`}
				>
					<div class="mb-2 flex flex-col gap-2">
						<h2 class="font-serif text-lg font-semibold text-gray-800 dark:text-gray-200">
							<!-- style={`--view-transition-name: title-${post.slug?.toLowerCase().replace(/ /g, '-')}`} -->
							<span class="capitalize hover:underline focus:underline">{post.title}</span>
						</h2>
						<div class="flex flex-wrap items-center gap-2">
							{#if post.categories && post.categories.length}
								{#each post.categories as category}
									<span
										class="rounded bg-blue-50 px-2 py-0.5 text-xs font-medium tracking-wide text-blue-700 capitalize dark:bg-blue-900/30 dark:text-blue-300"
										>{category}</span
									>
								{/each}
							{/if}
							<time
								datetime={post.date}
								class="text-sm tracking-normal text-gray-500 dark:text-gray-400"
								>{formatDate(new Date(post.date))}</time
							>
						</div>
					</div>
					{#if post.description}
						<p class="text-base leading-relaxed tracking-normal text-gray-700 dark:text-gray-300">
							{post.description}
						</p>
					{/if}
				</a>
			{/each}
		</ul>
	{/if}
</section>
