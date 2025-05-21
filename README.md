# Guybrush.ink

My personal blog (guybrush.ink), built with SvelteKit 5, TypeScript, and TailwindCSS.

## Features

- 📝 Markdown-based blogging with advanced formatting
- 🔍 Syntax highlighting with Shiki
- 🧮 Math typesetting with KaTeX
- 🌙 Dark/light mode support
- 📱 Fully responsive design
- 🖼️ Image zoom functionality
- 💬 Comments powered by Giscus
- 🚀 Fast static site generation

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (JavaScript runtime and package manager)
- Node.js 18+ (recommended)

### Installation

```bash
# Clone the repository
git clone julien-blanchon/guybrush.ink
cd guybrush.ink

# Install dependencies
bun install
```

### Development

```bash
# Start the development server
bun run dev

# Open in your browser
# The site will be available at http://localhost:5173
```

### Building for Production

```bash
# Generate a production build
bun run build

# Preview the production build locally
bun run preview
```

### Deployment

The site is configured for static deployment using GitHub Pages:

```bash
# Build and deploy to GitHub Pages
bun run deploy
```

## Project Structure

- `src/` - Source code
  - `routes/` - SvelteKit routes
  - `posts/` - Markdown blog posts
  - `lib/` - Shared components and utilities
- `static/` - Static assets (images, fonts, etc.)
- `build/` - Production build output (generated)

## Adding New Content

### Blog Posts

Create a new directory in `src/posts/` with the format `YYYY-MM-DD-slug` and add an `README.md` file with your content.

Example frontmatter:

```markdown
---
title: Your Post Title
date: 2023-11-01
description: A brief description of your post
slug: your-post-slug
tags: [svelte, typescript, web-development]
---

Your content here...
```

## Technologies

- [SvelteKit 5](https://kit.svelte.dev/) - Web framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS
- [Shiki](https://shiki.style/) - Syntax highlighting
- [Unified/Remark/Rehype](https://unifiedjs.com/) - Markdown processing

## License

See the [LICENSE](LICENSE) file for details.

