# PyTwoslash

A command-line tool that converts Python code into a [Shiki Twoslash](https:// .netlify.app/) compatible format. It uses the Language Server Protocol (LSP) to extract rich information about Python code such as hover details, type information, and documentation.

## Features

- Extracts hover information from Python code
- Uses the Microsoft multilspy package to interact with the Python Language Server
- Outputs a JSON file compatible with Shiki Twoslash for enhanced code blocks on websites
- Allows you to add rich hover information to your Python code examples on the web

## Requirements

- Python 3.7+
- A Python project/virtualenv with the code to analyze (needed for proper LSP context)
- The multilspy package (automatically included in requirements.txt)

## Installation

```bash
# Clone the repository (or download the py_ .py file)
git clone https://github.com/yourusername/py- .git
cd py-

# Install dependencies
pip install -r requirements.txt
```

## Usage

```bash
python py_ .py <file_path> <project_path> [options]
```

### Arguments

- `file_path`: Path to the Python file you want to process
- `project_path`: Path to the Python project/virtualenv directory (provides context for LSP)

### Options

- `-o, --output`: Path to the output JSON file (default: "resolvedNodes.json")
- `-v, --verbose`: Enable verbose output for debugging

### Example

```bash
# Process a file in the current project
python py_ .py ./my_module.py ./project_root -o hover_data.json -v
```

## Output Format

The tool generates a JSON file compatible with Shiki Twoslash. Each entry in the JSON represents a symbol in your Python code with hover information:

```json
[
  {
    "type": "hover",
    "text": "def factorial(n: int) -> int",
    "docs": "Calculate the factorial of n recursively.",
    "tags": [],
    "start": 125,
    "length": 9,
    "target": "factorial",
    "line": 5,
    "character": 4
  },
  ...
]
```

## Integration with Web Pages

To use the output with Shiki Twoslash on your website:

1. Generate the JSON file using PyTwoslash
2. Use the Shiki Twoslash library in your website project
3. Load the JSON file as the hover data for your code blocks

Example integration with a basic HTML page:

```html
<script>
	// Load your generated JSON file
	fetch('hover_data.json')
		.then((response) => response.json())
		.then((data) => {
			// Configure Shiki with Twoslash
			const highlighter = shiki.getHighlighter({
				theme: 'github-dark',
				langs: ['python']
			});

			// Use the data as resolvedNodes with transformerTwoslash
			const code = document.querySelector('pre code');
			highlighter.codeToHtml(code.textContent, {
				lang: 'python',
				transformers: [transformerTwoslash({ resolvedNodes: data })]
			});
		});
</script>
```

## License

MIT
