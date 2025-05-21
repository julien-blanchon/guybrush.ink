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

<div
	class="not-prose mt-5 flex flex-wrap items-center justify-between gap-2 rounded-t-lg border border-gray-200 bg-gray-50 py-1.5 pr-2 pl-4 dark:border-gray-700 dark:bg-gray-900"
>
	<div class="flex items-center gap-4">
		<span class="inline-flex items-center gap-1.5">
			<span class="size-4 rounded-full bg-gray-200 dark:bg-gray-700"></span>
			<span class="size-4 rounded-full bg-gray-200 dark:bg-gray-700"></span>
			<span class="size-4 rounded-full bg-gray-200 dark:bg-gray-700"></span>
		</span>
		<p class="m-0 flex flex-row-reverse items-center justify-between gap-2.5 text-sm font-medium">
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
			class="inline-flex h-7 cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-gray-100 px-3 text-sm font-medium text-gray-900 transition-colors duration-150 hover:bg-gray-200 hover:text-black focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
			onclick={handleCopy}
		>
			{#if copyState}
				<span in:fly={{ y: -4, delay: 50 }} class="inline-flex items-center justify-between gap-2">
					Copied
					<span class="icon-[lucide--check] size-3.5 text-black dark:text-white"></span>
				</span>
			{:else}
				<span in:fly={{ y: 4, delay: 50 }} class="inline-flex items-center justify-between gap-2"
					>Copy <span class="icon-[lucide--copy] size-3.5 text-black dark:text-white"></span></span
				>
			{/if}
		</button>
	</div>
</div>
<div
	class="not-prose mb-3 overflow-scroll rounded-lg rounded-t-none border border-t-0 border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
>
	<pre {...props} class={['not-prose outline-none', className]} bind:this={codeElement}>
		{@render children()}
	</pre>
</div>

<!-- TODO: Credit https://prabhukirankonda.vercel.app in the file -->
