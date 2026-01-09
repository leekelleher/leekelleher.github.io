# `<tri-state-toggle>`

A web component that creates a button cycling through three states. Each click advances to the next state, wrapping back to the first after the third.

## Usage

```html
<script type="module" src="tri-state-toggle.element.js"></script>

<tri-state-toggle>
  <span slot="primary">Off</span>
  <span slot="secondary">Auto</span>
  <span slot="tertiary">On</span>
</tri-state-toggle>
```

## Slots

| Slot | Description |
|------|-------------|
| `primary` | Content shown in the first state (default) |
| `secondary` | Content shown in the second state |
| `tertiary` | Content shown in the third state |

## Attributes

| Attribute | Description |
|-----------|-------------|
| `primary` | Custom value for the first state |
| `secondary` | Custom value for the second state  |
| `tertiary` | Custom value for the third state |
| `value` | Gets or sets the current state value |

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `value` | `string` | The current state value |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `change` | `{ value: string }` | Fired when the state changes |

## Examples

### Basic usage

```html
<tri-state-toggle>
  <span slot="primary">Light</span>
  <span slot="secondary">Dark</span>
  <span slot="tertiary">System</span>
</tri-state-toggle>
```

### Custom values

```html
<tri-state-toggle primary="light" secondary="dark" tertiary="system" value="system">
  <span slot="primary">Light</span>
  <span slot="secondary">Dark</span>
  <span slot="tertiary">System</span>
</tri-state-toggle>
```

### With icons

```html
<tri-state-toggle primary="asc" secondary="desc" tertiary="none">
  <span slot="primary">&#9650;</span>
  <span slot="secondary">&#9660;</span>
  <span slot="tertiary">&#9644;</span>
</tri-state-toggle>
```

### Listening for changes

```javascript
const toggle = document.querySelector('tri-state-toggle');

toggle.addEventListener('change', (e) => {
  console.log('New value:', e.detail.value);
});
```

### Setting value programmatically

```javascript
const toggle = document.querySelector('tri-state-toggle');
toggle.value = 'dark';
```

## Styling

The component renders as an `inline-block` and exposes minimal styling. The button has no default background or border, allowing full customization:

```css
tri-state-toggle button {
  padding: 8px 16px;
  background: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

tri-state-toggle button:hover {
  background: #e0e0e0;
}
```

## Browser Support

Requires ES modules and Shadow DOM support. Works in all modern browsers.
