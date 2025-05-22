<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { fly } from 'svelte/transition';

	type Props = SvelteHTMLElements['pre'] & {
		children: Snippet;
		title?: string;
		language?: string;
	};
	let { children, title, language, class: className, ...props }: Props = $props();

	let codeElement: HTMLElement;
	let copyState = $state(false);
	let lang: string = $state('');

	const handleCopy = () => {
		if (codeElement) {
			navigator.clipboard.writeText(codeElement.innerText ?? '');
			if (title) {
				const extension = title.split('.').pop();
				if (extension && extension in langIcons) {
					// toast.success(ToastCodeTitle, {
					// 	componentProps: {
					// 		title,
					// 		src: langIcons[extension].src,
					// 		className: langIcons[extension].class
					// 	}
					// });
				}
			} else {
				// toast.success('Copied to clipboard');
			}
		}
		copyState = true;
		setTimeout(() => {
			copyState = false;
		}, 1500);
	};

	$effect(() => {
		if (codeElement) {
			const languageAttribute = codeElement.getAttribute('data-language');
			lang = languageAttribute as string;
		}
	});

	const langIcons = {
		js: {
			class: 'size-5 rounded-none border-none icon-[vscode-icons--file-type-js]'
		},
		ts: {
			class: 'size-5 rounded-none border-none icon-[vscode-icons--file-type-typescript]'
		},
		py: {
			class: 'size-5 rounded-none border-none icon-[vscode-icons--file-type-python]'
		},
		svelte: {
			class: 'size-5 rounded-none border-none icon-[vscode-icons--file-type-svelte]'
		},
		md: {
			class: 'size-5 rounded-none border-none icon-[vscode-icons--file-type-markdown]'
		},
		rs: {
			class: 'size-5 rounded-none border-none icon-[vscode-icons--file-type-rust]'
		},
		bash: {
			class: 'size-5 rounded-none border-none icon-[devicon--bash]'
		},
		sh: {
			class: 'size-5 rounded-none border-none icon-[devicon--bash]'
		},
		shell: {
			class: 'size-5 rounded-none border-none icon-[devicon--bash]'
		},
		css: {
			class: 'size-5 rounded-none border-none icon-[vscode-icons--file-type-css]'
		},
		html: {
			class: 'size-5 rounded-none border-none icon-[vscode-icons--file-type-html]'
		},
		toml: {
			class: 'size-5 rounded-none border-none icon-[vscode-icons--file-type-toml]'
		},
		yaml: {
			class: 'size-5 rounded-none border-none icon-[vscode-icons--file-type-yaml]'
		},
		json: {
			class: 'size-5 rounded-none border-none icon-[vscode-icons--file-type-json]'
		}
	};
</script>

<div class="my-8 font-mono">
	<div
		class="flex flex-wrap items-center justify-between gap-2 rounded-t-lg border border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-900"
	>
		<div class="flex items-center gap-4">
			<span class="inline-flex items-center gap-1.5">
				<span class="size-3 rounded-full bg-red-400 dark:bg-red-600"></span>
				<span class="size-3 rounded-full bg-yellow-400 dark:bg-yellow-600"></span>
				<span class="size-3 rounded-full bg-green-400 dark:bg-green-600"></span>
			</span>
			<p
				class="m-0 flex flex-row-reverse items-center justify-between gap-2.5 font-mono text-sm font-bold"
			>
				{#if title}
					<span>{title}</span>
					{@const extension = title.split('.').pop()}
					{#if extension && extension in langIcons && typeof extension === 'string'}
						<span class={langIcons[extension as keyof typeof langIcons].class}></span>
					{:else if lang && lang in langIcons}
						<span class={langIcons[lang as keyof typeof langIcons].class}></span>
					{/if}
				{/if}
			</p>
		</div>
		<div>
			<button
				type="button"
				tabindex="0"
				class="inline-flex h-7 cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-gray-100 px-3 font-mono text-xs font-medium text-gray-700 transition-all duration-150 hover:bg-gray-200 hover:text-black focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
				onclick={handleCopy}
			>
				{#if copyState}
					<span
						in:fly={{ y: -4, delay: 50 }}
						class="inline-flex items-center justify-between gap-2"
					>
						Copied
						<span class="icon-[pixelarticons--check] size-3.5 text-green-500 dark:text-green-400"
						></span>
					</span>
				{:else}
					<span in:fly={{ y: 4, delay: 50 }} class="inline-flex items-center justify-between gap-2"
						>Copy <span class="icon-[pixelarticons--copy] size-3.5 text-gray-700 dark:text-gray-300"
						></span></span
					>
				{/if}
			</button>
		</div>
	</div>
	<div
		class="mb-3 overflow-auto rounded-lg rounded-t-none border border-t-0 border-gray-200 bg-gray-50 shadow-md dark:border-gray-700 dark:bg-gray-900 dark:shadow-gray-900/20"
	>
		<pre
			{...props}
			class={[
				'p-4 text-sm outline-none',
				'scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 dark:scrollbar-track-gray-800 dark:scrollbar-thumb-gray-600',
				className
			]}
			bind:this={codeElement}>
			{@render children()}
		</pre>
	</div>
</div>

<!-- Credit: https://prabhukirankonda.vercel.app -->
