---
title: Showcase syntax
description: A showcase of the syntax for the markdown interpreter.
slug: 2025-05-20-showcase-syntax
date: '2025-05-20'
published: true
categories:
  - markdown
---

## Side Effects In Svelte


<!-- Add some emoji -->
:wave:

🤗
<!-- Math example -->
$$
x^2
$$

```js collapse={1-5, 12-14, 21-24}
// All this boilerplate setup code will be collapsed
import { someBoilerplateEngine } from '@example/some-boilerplate'
import { evenMoreBoilerplate } from '@example/even-more-boilerplate'

const engine = someBoilerplateEngine(evenMoreBoilerplate())

// This part of the code will be visible by default
engine.doSomething(1, 2, 3, calcFn)

function calcFn() {
  // You can have multiple collapsed sections
  const a = 1
  const b = 2
  const c = a + b

  // This will remain visible
  console.log(`Calculation result: ${a} + ${b} = ${c}`)
  return c
}

// All this code until the end of the block will be collapsed again
engine.closeConnection()
engine.freeMemory()
engine.shutdown({ reason: 'End of example boilerplate code' })
```

If you want to do a side effect in Svelte like fetching data or logging a reactive value to the console when it updates, you can use the `$effect` rune:

```svelte
<script lang="ts">
  let count = $state(0)

  $effect(() => {
    console.log(count)
  })
</script>
```

If you return a function from `$effect`, it will be called before the effect re-runs and before it's destroyed:

```svelte
<script lang="ts">
  let count = $state(0)

  $effect(() => {
    console.log(count)
    return = () => console.log('cleanup')
  })
</script>
```

> Effects run on the [microtask queue](https://developer.mozilla.org/en-US/docs/Web/API/Window/queueMicrotask) when everything else is done.

In the past you would use the legacy `onMount` function to run some code when the component mounts:

[github](https://github.com)<!--rehype:rel=external-->

<video muted controls style="max-height:640px;" src="https://github.com/004.mp4"></video>

> [!NOTE] Oops
> Yes. I did actually put my kid on a Roomba one time. It did not make Ashley very happy.

> [!note] This is a _non-collapsible_ callout
> Some content is displayed directly!

> [!WARNING]- This is a **collapsible** callout
> Some content shown after opening!

::: code-group labels=[npm, pnpm, yarn]

```bash
npm install rehype-code-group
```

```bash
pnpm add rehype-code-group
```

```bash
yarn add rehype-code-group
```

:::

:::name[content]
<!-- childf content -->
:::


:::warning[bad shit be happening]
here is some text that will go inside this block
:::

<details>
  <summary>Epcot Center</summary>
  <p>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
</details>
<p>
  https://github.com/004.mp4
</p>

```svelte
<script lang="ts">
  import { onMount, onDestroy } from 'svelte'

  // do something when the component is ready
  $effect(() => {
    console.log('mounted')
    return () => console.log('cleanup')
  })

  // this works the same
  onMount(() => {
    console.log('mounted')
    return () => console.log('cleanup')
  })

  // there's also `onDestroy`
  onDestroy(() => console.log('cleanup'))
</script>
```

The examples look the same but they're not, and you have to be careful with dependencies inside `$effect` and [untrack](https://svelte.dev/docs/svelte/svelte#untrack) values you don't want to track.

## Avoid Async Effects

Let's say you have some asynchronous code, so it would also make sense to mark the function that you pass to `$effect` as `async`:

```svelte
<script lang="ts">
  let count = $state(0)

  $effect(async () => {
    console.log(count)
    return () => console.log('cleanup')
  })
</script>
```

The cleanup function never runs because an async function returns a promise that Svelte doesn't expect and can't resolve for you:

I assume this is probably because having async effects would cause race conditions, so you would need async versions of these runes like `$asyncEffect`.

## Asynchronously Read Values Are Ignored

What's also interesting is that if we read the Svelte docs on [understanding dependencies](https://svelte.dev/docs/svelte/$effect#Understanding-dependencies), it says:

> "Values that are read asynchronously — after an `await` or inside a `setTimeout`, for example — **will not be tracked**.

The values **after** `await` or **inside** `setTimeout` and `then` are not going to be tracked by Svelte:

```svelte
<script lang="ts">
  let count = $state(0)

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  $effect(async () => {
    await sleep(1000)
    console.log(count) // untracked
  })

  $effect(() => {
    sleep(1000).then(() => {
      console.log(count) // untracked
    })
  })

  $effect(() => {
    setTimeout(() => {
      console.log(count) // untracked
    })
  })
</script>
```

If you want to track those values, you could use a poor man's dependency array inside `$effect`:

```ts
$effect(async () => {
  // has to be before `await`
  count
})

$effect(() => {
  // has to be outside `setTimeout` or `then`
  count
})
```

## Awaiting Promises Inside Effects

Instead of passing an async function to `$effect`, you can invoke an async function inside an effect or invoke `then` on the promise:

```svelte
<script lang="ts">
  let count = $state(0)

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  // a) using an async function
  $effect(() => {
    // this can be from anywhere
    async function logCount() {
      await sleep(1000)
      console.log(count)
    }
    // invoke the async function
    logCount()
  })

  // b) using `then`
  $effect(() => {
    sleep(1000).then(() => {
      console.log(count)
    })
  })

  // c) using an immediately invoked function (IIFE)
  $effect(() => {
    (async () {
      await sleep(1000)
      console.log(count)
    })()
  })
</script>
```

That's it! 👍️

Keep in mind, these examples aren't meant to be reactive, but only show how to use async code inside an effect.


Got you — you want it even **richer**, with:
- ✅ emoji 👍
- ✅ checkbox lists (GitHub style) `[x]`, `[ ]`
- ✅ classical codeblocks ```` ``` ```` 
- ✅ *augmented* codeblocks (like adding filename, language hints, etc.)

I’ll update the full Markdown example accordingly below:  
I'll keep it **clean**, **rich**, and **realistic** for your interpreter.

---

# 🚀 Markdown Interpreter

Published on **April 26, 2025**.

---

## ✨ Project Features

This project lets you write ==beautiful documents== with extended Markdown!

Visit [the GitHub repository](https://github.com/remarkjs/remark) to learn more about MDAST.

> "Markdown aims to be as easy-to-read and easy-to-write as is feasible."

---

## ✅ Task List

- [x] Parser initialized
- [x] Custom syntax handled (==highlight==)
- [x] Abbreviation support
- [ ] Live collaborative editing
- [x] Fancy checkboxes ✅

---

## 🔥 Code Examples

### Inline Code

Quickly run `npm run dev` to start the development server.

---

### Basic Code Block

```bash
git clone https://github.com/example/repo.git
cd repo
npm install
```

---

### Augmented Code Block

> Sometimes you want to specify the filename too!

```javascript title="interpreter.ts"
export function highlightSyntax(text: string): string {
  return text.replace(/==(.+?)==/g, '<mark>$1</mark>');
}
```

```python title="md_parser.py"
def parse_abbr(text):
    return re.findall(r'\*\[(.*?)\]: (.*)', text)
```

---

## 📊 Table Example

| Feature          | Supported | Note                         |
|:-----------------|:---------:|:-----------------------------|
| Tables           | ✅         | GitHub flavored Markdown     |
| Highlight syntax | ✅         | Using `==highlight==`         |
| Abbreviations    | ✅         | `*[AST]: Abstract Syntax Tree` |
| Emoji            | ✅         | 😎 🔥 🎯                      |
| Checkboxes       | ✅         | `[x]` and `[ ]`               |
| Details / Summary| ✅         | Expandable sections          |

---

## 📂 Collapsible Section

<details>
  <summary>📖 Click to expand for tips</summary>

  - Use **bold text** for emphasis.
  - Combine 📝 **notes**, `inline code`, and blockquotes for better guides!
  - Always **test** your `[ ]` checkboxes!

</details>

---

## 🖼️ Image Example

![Placeholder Image](https://via.placeholder.com/300x150.png)

---

## 🎯 Headings Showcase

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

---

## 🧹 Horizontal Rules

Three dashes:

---

Three asterisks:

***

Three underscores:

___

---

## ✏️ Abbreviations

This document uses technical abbreviations:

*[MDAST]: Markdown Abstract Syntax Tree  
*[AST]: Abstract Syntax Tree  

Hover on MDAST or AST to see their definitions.

---

# 🎉 Conclusion

You now have a **full**, **realistic**, **modern** Markdown document that hits:

- Text elements (headings, paragraphs, links, images)
- Code blocks (plain, augmented)
- Tables
- Lists (ordered, unordered, checkboxes)
- Horizontal rules
- Blockquotes
- `<mark>` highlights
- `<abbr>` abbreviations
- `<details>` expand/collapse sections
- Emojis for flavor

---

Would you also want a **super-compact** version (20-30 lines) that still uses all these elements?  
It would be 🔥 to create quick snapshot tests for your interpreter.  
Would you like me to prepare that too? 🎯


Look, the moon :new_moon_with_face:

Here’s a family :family_man_man_boy_boy:

Слава Україні!  :ukraine:

🤗
<!-- Math example -->
$$
x^2
$$

```js collapse={1-5, 12-14, 21-24}
// All this boilerplate setup code will be collapsed
import { someBoilerplateEngine } from '@example/some-boilerplate'
import { evenMoreBoilerplate } from '@example/even-more-boilerplate'

// Test with ligature
x != 0
x --> 0

const engine = someBoilerplateEngine(evenMoreBoilerplate())

// This part of the code will be visible by default
engine.doSomething(1, 2, 3, calcFn)

function calcFn() {
  // You can have multiple collapsed sections
  const a = 1
  const b = 2
  const c = a + b

  // This will remain visible
  console.log(`Calculation result: ${a} + ${b} = ${c}`)
  return c
}

// All this code until the end of the block will be collapsed again
engine.closeConnection()
engine.freeMemory()
engine.shutdown({ reason: 'End of example boilerplate code' })
```

If you want to do a side effect in Svelte like fetching data or logging a reactive value to the console when it updates, you can use the `$effect` rune:

```svelte
<script lang="ts">
  let count = $state(0)

  $effect(() => {
    console.log(count)
  })
</script>
```

If you return a function from `$effect`, it will be called before the effect re-runs and before it's destroyed:

```svelte
<script lang="ts">
  let count = $state(0)

  $effect(() => {
    console.log(count)
    return = () => console.log('cleanup')
  })
</script>
```

> Effects run on the [microtask queue](https://developer.mozilla.org/en-US/docs/Web/API/Window/queueMicrotask) when everything else is done.

In the past you would use the legacy `onMount` function to run some code when the component mounts:

[github](https://github.com)<!--rehype:rel=external-->

<video muted controls style="max-height:640px;" src="https://github.com/004.mp4"></video>

> [!NOTE] Oops
> Yes. I did actually put my kid on a Roomba one time. It did not make Ashley very happy.

> [!note] This is a _non-collapsible_ callout
> Some content is displayed directly!

> [!WARNING]- This is a **collapsible** callout
> Some content shown after opening!

::: code-group labels=[npm, pnpm, yarn]

```bash
npm install rehype-code-group
```

```bash
pnpm add rehype-code-group
```

```bash
yarn add rehype-code-group
```

:::

:::name[content]
<!-- childf content -->
:::


:::warning[bad shit be happening]
here is some text that will go inside this block
:::

<details>
  <summary>Epcot Center</summary>
  <p>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
</details>
<p>
  https://github.com/004.mp4
</p>

```svelte
<script lang="ts">
  import { onMount, onDestroy } from 'svelte'

  // do something when the component is ready
  $effect(() => {
    console.log('mounted')
    return () => console.log('cleanup')
  })

  // this works the same
  onMount(() => {
    console.log('mounted')
    return () => console.log('cleanup')
  })

  // there's also `onDestroy`
  onDestroy(() => console.log('cleanup'))
</script>
```

The examples look the same but they're not, and you have to be careful with dependencies inside `$effect` and [untrack](https://svelte.dev/docs/svelte/svelte#untrack) values you don't want to track.

## Avoid Async Effects

Let's say you have some asynchronous code, so it would also make sense to mark the function that you pass to `$effect` as `async`:

```svelte
<script lang="ts">
  let count = $state(0)

  $effect(async () => {
    console.log(count)
    return () => console.log('cleanup')
  })
</script>
```

The cleanup function never runs because an async function returns a promise that Svelte doesn't expect and can't resolve for you:

I assume this is probably because having async effects would cause race conditions, so you would need async versions of these runes like `$asyncEffect`.

## Asynchronously Read Values Are Ignored

What's also interesting is that if we read the Svelte docs on [understanding dependencies](https://svelte.dev/docs/svelte/$effect#Understanding-dependencies), it says:

> "Values that are read asynchronously — after an `await` or inside a `setTimeout`, for example — **will not be tracked**.

The values **after** `await` or **inside** `setTimeout` and `then` are not going to be tracked by Svelte:

```svelte
<script lang="ts">
  let count = $state(0)

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  $effect(async () => {
    await sleep(1000)
    console.log(count) // untracked
  })

  $effect(() => {
    sleep(1000).then(() => {
      console.log(count) // untracked
    })
  })

  $effect(() => {
    setTimeout(() => {
      console.log(count) // untracked
    })
  })
</script>
```

If you want to track those values, you could use a poor man's dependency array inside `$effect`:

```ts
$effect(async () => {
  // has to be before `await`
  count
})

$effect(() => {
  // has to be outside `setTimeout` or `then`
  count
})
```

## Awaiting Promises Inside Effects

Instead of passing an async function to `$effect`, you can invoke an async function inside an effect or invoke `then` on the promise:

```svelte
<script lang="ts">
  let count = $state(0)

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  // a) using an async function
  $effect(() => {
    // this can be from anywhere
    async function logCount() {
      await sleep(1000)
      console.log(count)
    }
    // invoke the async function
    logCount()
  })

  // b) using `then`
  $effect(() => {
    sleep(1000).then(() => {
      console.log(count)
    })
  })

  // c) using an immediately invoked function (IIFE)
  $effect(() => {
    (async () {
      await sleep(1000)
      console.log(count)
    })()
  })
</script>
```

That's it! 👍️

Keep in mind, these examples aren't meant to be reactive, but only show how to use async code inside an effect.


Got you — you want it even **richer**, with:
- ✅ emoji 👍
- ✅ checkbox lists (GitHub style) `[x]`, `[ ]`
- ✅ classical codeblocks ```` ``` ```` 
- ✅ *augmented* codeblocks (like adding filename, language hints, etc.)

I’ll update the full Markdown example accordingly below:  
I'll keep it **clean**, **rich**, and **realistic** for your interpreter.

---

# 🚀 Markdown Interpreter

Published on **April 26, 2025**.

---

## ✨ Project Features

This project lets you write ==beautiful documents== with extended Markdown!

Visit [the GitHub repository](https://github.com/remarkjs/remark) to learn more about MDAST.

> "Markdown aims to be as easy-to-read and easy-to-write as is feasible."

---

## ✅ Task List

- [x] Parser initialized
- [x] Custom syntax handled (`==highlight==`)
- [x] Abbreviation support
- [ ] Live collaborative editing
- [x] Fancy checkboxes ✅

---

## 🔥 Code Examples

### Inline Code

Quickly run `npm run dev` to start the development server.

---

### Basic Code Block

```bash
git clone https://github.com/example/repo.git
cd repo
npm install
```

---

### Augmented Code Block

> Sometimes you want to specify the filename too!

```javascript title="interpreter.ts"
export function highlightSyntax(text: string): string {
  return text.replace(/==(.+?)==/g, '<mark>$1</mark>');
}
```

```python title="md_parser.py"
def parse_abbr(text):
    return re.findall(r'\*\[(.*?)\]: (.*)', text)
```

---

## 📊 Table Example

| Feature          | Supported | Note                         |
|:-----------------|:---------:|:-----------------------------|
| Tables           | ✅         | GitHub flavored Markdown     |
| Highlight syntax | ✅         | Using `==highlight==`         |
| Abbreviations    | ✅         | `*[AST]: Abstract Syntax Tree` |
| Emoji            | ✅         | 😎 🔥 🎯                      |
| Checkboxes       | ✅         | `[x]` and `[ ]`               |
| Details / Summary| ✅         | Expandable sections          |

---

## 📂 Collapsible Section

<details>
  <summary>📖 Click to expand for tips</summary>

  - Use **bold text** for emphasis.
  - Combine 📝 **notes**, `inline code`, and blockquotes for better guides!
  - Always **test** your `[ ]` checkboxes!

</details>

---

## 🖼️ Image Example

![Placeholder Image](https://via.placeholder.com/300x150.png)

---

## 🎯 Headings Showcase

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

---

## 🧹 Horizontal Rules

Three dashes:

---

Three asterisks:

***

Three underscores:

___

---

## ✏️ Abbreviations

This document uses technical abbreviations:

*[MDAST]: Markdown Abstract Syntax Tree  
*[AST]: Abstract Syntax Tree  

Hover on MDAST or AST to see their definitions.

---

# 🗂️ Table of Contents

(To be generated by your `<TOC />` component.)

---

# 🎉 Conclusion

You now have a **full**, **realistic**, **modern** Markdown document that hits:

- Text elements (headings, paragraphs, links, images)
- Code blocks (plain, augmented)
- Tables
- Lists (ordered, unordered, checkboxes)
- Horizontal rules
- Blockquotes
- `<mark>` highlights
- `<abbr>` abbreviations
- `<details>` expand/collapse sections
- Emojis for flavor

---

Would you also want a **super-compact** version (20-30 lines) that still uses all these elements?  
It would be 🔥 to create quick snapshot tests for your interpreter.  
Would you like me to prepare that too? 🎯


```js title="my-test-file.js"
console.log('Title attribute example')
```

```html
<!-- src/content/index.html -->
<div>File name comment example</div>
```


```bash
echo "This terminal frame has no title"
```

```powershell title="PowerShell terminal example"
Write-Output "This one has a title!"
```


```sh frame="none"
echo "Look ma, no frame!"
```

```ps frame="code" title="PowerShell Profile.ps1"
# Without overriding, this would be a terminal frame
function Watch-Tail { Get-Content -Tail 20 -Wait $args }
New-Alias tail Watch-Tail
```

```js {1, 4, 7-8}
// Line 1 - targeted by line number
// Line 2
// Line 3
// Line 4 - targeted by line number
// Line 5
// Line 6
// Line 7 - targeted by range "7-8"
// Line 8 - targeted by range "7-8"
```

```js title="line-markers.js" del={2} ins={3-4} {6}
function demo() {
  console.log('this line is marked as deleted')
  // This line and the next one are marked as inserted
  console.log('this is the second inserted line')

  return 'this line uses the neutral default marker type'
}
```

```jsx {"1":5} del={"2":7-8} ins={"3":10-12}
// labeled-line-markers.jsx
<button
  role="button"
  {...props}
  value={value}
  className={buttonClassName}
  disabled={disabled}
  active={active}
>
  {children &&
    !active &&
    (typeof children === 'string' ? <span>{children}</span> : children)}
</button>
```

```jsx {"1. Provide the value prop here:":5-6} del={"2. Remove the disabled and active states:":8-10} ins={"3. Add this to render the children inside the button:":12-15}
// labeled-line-markers.jsx
<button
  role="button"
  {...props}

  value={value}
  className={buttonClassName}

  disabled={disabled}
  active={active}
>

  {children &&
    !active &&
    (typeof children === 'string' ? <span>{children}</span> : children)}
</button>
```


```diff
+this line will be marked as inserted
-this line will be marked as deleted
this is a regular line
```

```diff
--- a/README.md
+++ b/README.md
@@ -1,3 +1,4 @@
+this is an actual diff file
-all contents will remain unmodified
 no whitespace will be removed either
```

```diff lang="js"
  function thisIsJavaScript() {
    // This entire block gets highlighted as JavaScript,
    // and we can still add diff markers to it!
-   console.log('Old code to be removed')
+   console.log('New and shiny code!')
  }
```


```js "given text"
function demo() {
  // Mark any given text inside lines
  return 'Multiple matches of the given text are supported';
}
```


```ts /ye[sp]/
console.log('The words yes and yep will be marked.')
```


```js "return true;" ins="inserted" del="deleted"
function demo() {
  console.log('These are inserted and deleted marker types');
  // The return statement uses the default marker type
  return true;
}
```


```js
// Example with wrap (default)
function getLongString() {
  return 'This is a very long string that will most probably not fit into the available space unless the container is extremely wide'
}
```

```js nowrap
// Example with nowrap
function getLongString() {
  return 'This is a very long string that will most probably not fit into the available space unless the container is extremely wide'
}
```


```js wrap preserveIndent
// Example with preserveIndent (enabled by default)
function getLongString() {
  return 'This is a very long string that will most probably not fit into the available space unless the container is extremely wide'
}
```

```js wrap preserveIndent=false
// Example with preserveIndent=false
function getLongString() {
  return 'This is a very long string that will most probably not fit into the available space unless the container is extremely wide'
}
```


```js wrap hangingIndent=2
// Example with hangingIndent=2
function getLongString() {
  return 'This is a very long string that will most probably not fit into the available space unless the container is extremely wide'
}
function heavilyIndentedCode() {
          return 'This long line already starts with a lot of indentation, and its wrapped parts will be indented by 2 additional columns due to hangingIndent=2'
}
```

```js wrap hangingIndent=2 preserveIndent=false
// Example with hangingIndent=2 and preserveIndent=false
function getLongString() {
  return 'This is a very long string that will most probably not fit into the available space unless the container is extremely wide'
}
function heavilyIndentedCode() {
          return 'Even though this long line starts with a lot of indentation, its wrapped parts will only be indented by 2 columns due to the combination of hangingIndent=2 and preserveIndent=false'
}
```


```js collapse={1-5, 12-14, 21-24}
// All this boilerplate setup code will be collapsed
import { someBoilerplateEngine } from '@example/some-boilerplate'
import { evenMoreBoilerplate } from '@example/even-more-boilerplate'

const engine = someBoilerplateEngine(evenMoreBoilerplate())

// This part of the code will be visible by default
engine.doSomething(1, 2, 3, calcFn)

function calcFn() {
  // You can have multiple collapsed sections
  const a = 1
  const b = 2
  const c = a + b

  // This will remain visible
  console.log(`Calculation result: ${a} + ${b} = ${c}`)
  return c
}

// All this code until the end of the block will be collapsed again
engine.closeConnection()
engine.freeMemory()
engine.shutdown({ reason: 'End of example boilerplate code' })
```

Here is a code sample:

```bash withOutput
> pwd

/usr/home/boba-tan/programming
```

```js /age/#v /name/#v /setAge/#s /setName/#s /50/#i /"Taylor"/#i
const [age, setAge] = useState(50);
const [name, setName] = useState("Taylor");
```

```js title="This is a title"
const x = 0
```



```js caption="This is a caption"
const x = 0
```

```js showLineNumbers
const x = 0

const x = 0
const x = 0
```

<!-- https://ecosystem.vuejs.press/plugins/markdown/shiki.html#notationhighlight -->

```css :collapsed-lines=10
html {
  margin: 0;
  background: black;
  height: 100%;
}

html {
  margin: 0;
  background: black;
  height: 100%;
}

html {
  margin: 0;
  background: black;
  height: 100%;
}
html {
  margin: 0;
  background: black;
  height: 100%;
}
html {
  margin: 0;
  background: black;
  height: 100%;
}

```

```ts title="foo/baz.js"
console.log('hello')
```

```ts
console.log('hewwo') // [!code --]
console.log('hello') // [!code ++]
console.log('goodbye')
```

```ts
console.log('Not focused')
console.log('Focused') // [!code focus]
console.log('Not focused')
```

```ts
console.log('Not highlighted')
console.log('Highlighted') // [!code highlight]
console.log('Not highlighted')
```


```ts
console.log('No errors or warnings')
console.warn('Warning') // [!code warning]
console.error('Error') // [!code error]
```

```ts
// [!code word:Hello]
const message = 'Hello World'
console.log(message) // prints Hello World
```

```js /Hello/
const msg = 'Hello World'
console.log(msg)
console.log(msg) // prints Hello World
```