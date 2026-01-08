# `<img-alt-label>`

A web component that wraps an `<img>` element and displays an "ALT" button overlay. When clicked, a tooltip popover shows the image's alt text.

## Usage

```html
<script type="module" src="img-alt-label.element.js"></script>

<img-alt-label>
  <img src="photo.jpg" alt="A description of the image." />
</img-alt-label>
```

The component reads the `alt` attribute (or `title` as fallback) from the contained `<img>` element.

## Configuration

### `position` attribute

Controls which corner the ALT button appears in. The tooltip automatically positions itself on the opposite side.

| Value | Button position | Tooltip position |
|-------|-----------------|------------------|
| _(default)_ | bottom-left | above, right-aligned |
| `bottom-left` | bottom-left | above, right-aligned |
| `bottom-right` | bottom-right | above, left-aligned |
| `top-left` | top-left | below, right-aligned |
| `top-right` | top-right | below, left-aligned |

```html
<img-alt-label position="top-right">
  <img src="photo.jpg" alt="A description of the image." />
</img-alt-label>
```

## CSS Custom Properties

### Button styling

| Variable | Default | Description |
|----------|---------|-------------|
| `--alt-button-background` | `buttonface` | Background color |
| `--alt-button-color` | `buttontext` | Text color |
| `--alt-button-border` | `1px solid` | Border shorthand |
| `--alt-button-border-radius` | `0` | Border radius |
| `--alt-button-padding` | `2px 6px` | Padding |
| `--alt-button-margin` | `0` | Margin |
| `--alt-button-font-size` | `inherit` | Font size |

### Tooltip/popover styling

| Variable | Default | Description |
|----------|---------|-------------|
| `--alt-popover-background` | `canvas` | Background color |
| `--alt-popover-color` | `canvastext` | Text color |
| `--alt-popover-border` | `1px solid` | Border shorthand |
| `--alt-popover-border-radius` | `0` | Border radius |
| `--alt-popover-padding` | `4px 8px` | Padding |
| `--alt-popover-font-size` | `inherit` | Font size |
| `--alt-popover-max-width` | `300px` | Maximum width |

### Example

```css
img-alt-label {
  /* Button */
  --alt-button-background: #000;
  --alt-button-color: #fff;
  --alt-button-border: none;
  --alt-button-border-radius: 4px;
  --alt-button-padding: 4px 8px;
  --alt-button-font-size: 12px;

  /* Tooltip */
  --alt-popover-background: #333;
  --alt-popover-color: #fff;
  --alt-popover-border: none;
  --alt-popover-border-radius: 4px;
  --alt-popover-padding: 8px 12px;
}
```

## Browser Support

- **Popover API**: Chrome 114+, Edge 114+, Safari 17+, Firefox 125+
- **CSS Anchor Positioning**: Chrome 125+, Edge 125+. Not yet supported in Firefox or Safari.

In browsers without CSS Anchor Positioning support, the tooltip will display in its default centered position.
