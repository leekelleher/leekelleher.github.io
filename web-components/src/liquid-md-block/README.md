# `<liquid-md-block>`

A web component that extends [md-block](https://md-block.verou.me/) to support [LiquidJS](https://liquidjs.com/) templating within Markdown content.

## Usage

```html
<script type="module" src="liquid-md-block.element.js"></script>

<liquid-md-block data='{"name": "World"}'>
  # Hello, {{ name }}!

  Welcome to **Markdown** with Liquid templates.
</liquid-md-block>
```

The component processes Liquid template syntax in your Markdown content, then renders the result as HTML.

## Attributes

| Attribute | Description |
|-----------|-------------|
| `data` | JSON string containing template variables |
| `src` | _(inherited)_ URL to fetch Markdown content from |
| `hmin` | _(inherited)_ Minimum heading level |
| `hlinks` | _(inherited)_ Add anchor links to headings |

## Examples

### Inline content with data

```html
<liquid-md-block data='{"items": ["Apple", "Banana", "Cherry"]}'>
  ## Shopping List

  {% for item in items %}
  - {{ item }}
  {% endfor %}
</liquid-md-block>
```

### Loading from external file

```html
<liquid-md-block src="template.md" data='{"version": "1.0.0"}'></liquid-md-block>
```

### Updating data dynamically

```javascript
const block = document.querySelector('liquid-md-block');
block.setAttribute('data', JSON.stringify({ name: 'Updated' }));
```

## Dependencies

This component loads the following libraries from CDN:

- [md-block](https://cdn.jsdelivr.net/npm/md-block@0.0.1/md-block.min.js) - Markdown rendering
- [LiquidJS](https://cdn.jsdelivr.net/npm/liquidjs/dist/liquid.browser.min.js) - Template processing

## Browser Support

Requires ES modules support. Works in all modern browsers.
