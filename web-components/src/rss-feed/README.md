# `<rss-feed>`

A web component that fetches and displays RSS feed content.

> **Note:** This component is currently a work in progress.

## Usage

```html
<script type="module" src="rss-feed.element.js"></script>

<template id="my-feed-item">
  <!-- Item template goes here -->
</template>

<rss-feed src="https://example.com/feed.xml"></rss-feed>
```

## Attributes

| Attribute | Description |
|-----------|-------------|
| `src` | URL of the RSS feed to fetch |

## Events

| Event | Description |
|-------|-------------|
| `ready` | Fired when the feed has been fetched and rendered |

## CSS State

The component uses [ElementInternals](https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals) to expose custom state:

```css
/* Style the component when feed is loaded */
rss-feed:state(--ready) {
  opacity: 1;
}

/* Style while loading */
rss-feed:not(:state(--ready)) {
  opacity: 0.5;
}
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `isReady` | `boolean` | Returns `true` when the feed has loaded |

## Example

```html
<rss-feed src="https://example.com/feed.xml"></rss-feed>

<script type="module">
  import './rss-feed.element.js';

  const feed = document.querySelector('rss-feed');
  feed.addEventListener('ready', () => {
    console.log('Feed loaded!');
  });
</script>
```

## Browser Support

Requires support for:
- ES modules
- `fetch` API
- `ElementInternals` with custom states (Chrome 90+, Firefox 126+, Safari 17.4+)
