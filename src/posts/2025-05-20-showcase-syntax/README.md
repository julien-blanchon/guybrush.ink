---
title: Showcase syntax
description: A showcase of the syntax for the markdown interpreter.
slug: 2025-01-01-showcase-syntax
date: '2025-01-01'
published: true
categories:
  - markdown
---

# 🧪 Markdown Syntax Showcase

This post demonstrates all supported features of the markdown interpreter.

---

## 💬 Basics

Emoji: 🤗 🧠
Inline code: `npm run dev`
Math block:

$$
x^2 + 2x + 1 = (x + 1)^2
$$

Inline math: \$E = mc^2\$
Abbreviation: HTML

*[HTML]: HyperText Markup Language


---

## 📦 Code Blocks

### With title, caption, and line numbers

```ts title="calc.ts" caption="Simple calculation" showLineNumbers
function calc() {
	const a = 1;
	const b = 2;
	return a + b;
}
```

### With highlight, inserted, and deleted lines

```js title="highlighted.js" {2,4} ins={5} del={6}
function greet() {
	console.log('Hello');
}
console.log('New feature'); // inserted
console.log('Old code');    // deleted
```

### With regex and label highlights

```js /hello/#greeting /world/#planet
const msg = 'hello world';
console.log(msg);
```

```ts
// [!code word:Hello]
const message = 'Hello World';
console.log(message); // prints Hello World
```

```js /Hello/
const msg = 'Hello World';
console.log(msg);
console.log(msg); // prints Hello World
```

```math
\nabla \cdot \mathbf{E} = \frac{\rho}{\varepsilon_0}
```

```ts
console.log('hewwo'); // [!code --]
console.log('hello'); // [!code ++]
console.log('goodbye');
```

```ts
console.log('Not focused');
console.log('Focused'); // [!code focus]
console.log('Not focused');
```

```ts
console.log('Not highlighted');
console.log('Highlighted'); // [!code highlight]
console.log('Not highlighted');
```

```js showLineNumbers
const x = 0;

const x = 0;
const x = 0;
```

```bash withOutput
> pwd

/usr/home/boba-tan/programming
```

```js /age/#v /name/#v /setAge/#s /setName/#s /50/#i /"Taylor"/#i
const [age, setAge] = useState(50);
const [name, setName] = useState('Taylor');
```

```js {1-5, 12-14, 21-24}
// All this boilerplate setup code will be collapsed
import { someBoilerplateEngine } from '@example/some-boilerplate';
import { evenMoreBoilerplate } from '@example/even-more-boilerplate';

const engine = someBoilerplateEngine(evenMoreBoilerplate());

// This part of the code will be visible by default
engine.doSomething(1, 2, 3, calcFn);

function calcFn() {
	// You can have multiple collapsed sections
	const a = 1;
	const b = 2;
	const c = a + b;

	// This will remain visible
	console.log(`Calculation result: ${a} + ${b} = ${c}`);
	return c;
}

// All this code until the end of the block will be collapsed again
engine.closeConnection();
engine.freeMemory();
engine.shutdown({ reason: 'End of example boilerplate code' });
```

```js wrap
// Example with hangingIndent=2 and preserveIndent=false
function getLongString() {
	return 'This is a very long string that will most probably not fit into the available space unless the container is extremely wide';
}
function heavilyIndentedCode() {
	return 'Even though this long line starts with a lot of indentation, its wrapped parts will only be indented by 2 columns due to the combination of hangingIndent=2 and preserveIndent=false';
}
```

```diff lang="js"
  function thisIsJavaScript() {
    // This entire block gets highlighted as JavaScript,
    // and we can still add diff markers to it!
-   console.log('Old code to be removed')
+   console.log('New and shiny code!')
  }
```

> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.

### With diff

```diff
+ added line
- removed line
 unchanged line
```

### With frame and wrapping options

```bash frame="none"
echo "No frame here"
```

```js wrap preserveIndent
function longLine() {
	return 'This is a long string that should wrap with preserved indentation.';
}
```

---

## 📑 Callouts and Blockquotes

> This is a simple blockquote.
> Check the [microtask queue](https://developer.mozilla.org/en-US/docs/Web/API/Window/queueMicrotask).

> \[!NOTE]
> This is a note.

> \[!WARNING]- Collapsible warning
> Be cautious with async side effects!

---

## 📁 Details and Containers

<details>
  <summary>Click to expand</summary>
  This is hidden content revealed on click.
</details>

---

## ✅ Task List

* [x] Emoji support
* [x] Code titles + captions
* [x] Math (inline + block)
* [x] Regex & diff highlighting
* [x] Callouts + collapsible sections
* [x] Containers
* [x] `<abbr>`, `<details>`, and `<video>`

