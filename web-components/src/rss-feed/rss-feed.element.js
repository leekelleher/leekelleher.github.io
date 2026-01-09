class RssFeedElement extends HTMLElement {
	#controller;
	#internals;
	#limit = Infinity;
	#parser = new DOMParser();
	#process = {
		description: this.#assignDescription.bind(this),
		pubDate: this.#assignPubDate.bind(this),
	};
	#templateId;
	#url;

	static get observedAttributes() {
		return ['limit', 'src', 'template-id'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		switch (name) {
			case 'limit':
				this.#limit = Number(newValue);
				break;
			case 'src':
				this.#url = newValue;
				break;
			case 'template-id':
				this.#templateId = newValue;
				break;
		}
	}

	constructor() {
		super();
		this.style.display = 'contents';
		this.#internals = this.attachInternals();
	}

	get isReady() {
		return this.#internals.states.has('--ready');
	}

	connectedCallback() {
		this.#controller = new AbortController();

		if (this.isReady) {
			this.#ready();
			return;
		}

		fetch(this.#url, { signal: this.#controller.signal }).then(async (response) => {
			const text = await response.text();
			const xml = this.#parser.parseFromString(text, 'text/xml');

			//const title = xml.querySelector('rss > channel > title')?.textContent;
			//const description = xml.querySelector('rss > channel > description')?.textContent;

			const rssItems = xml.querySelectorAll('rss > channel > item');
			if (!rssItems.length) return;

			const items = rssItems.length > this.#limit ? Array.from(rssItems).slice(0, this.#limit) : rssItems;

			let template = this.querySelector('template');

			if (!template && this.#templateId) {
				template = document.getElementById(this.#templateId);
			}

			if (template) {
				items.forEach((item) => {
					const clone = template.content.cloneNode(true);

					// Stores 'link' as it can be used multiple times.
					const link = item.querySelector('link');

					for (const node of item.children) {
						if (!node.tagName) continue;

						const elements = clone.querySelectorAll(`[data-bind='${node.tagName}']`);
						if (!elements.length) continue;

						for (const element of elements) {
							const processNode = this.#process[node.tagName];
							const textContent = processNode ? processNode(node, element) : node.textContent;

							if (link && element.tagName === 'A' && element.hasAttribute('href')) {
								element.href = link.textContent;
							}

							if (textContent) {
								element.textContent = textContent;
							}
							element.removeAttribute('data-bind');
						}
					}

					this.appendChild(clone);
				});
			} else {
				this.#defaultTemplate(items);
			}

			//console.log('data', [title, description, items, template]);
			this.#ready();
		});
	}

	disconnectedCallback() {
		this.#controller.abort();
	}

	#assignDescription(node, element) {
		const html = this.#parser.parseFromString(node.textContent, 'text/html');
		const nodes = html.body.cloneNode(true).childNodes;
		element.replaceWith(...nodes);
		return null;
	}

	#assignPubDate(node, element) {
		const date = new Date(node.textContent);
		if (element.tagName === 'TIME' && element.hasAttribute('datetime')) {
			element.dateTime = date.toISOString();
		}
		return date.toLocaleDateString();
	}

	#defaultTemplate(items) {
		const ul = document.createElement('ul');

		items.forEach((item) => {
			const li = document.createElement('li');
			const anchor = document.createElement('a');

			anchor.text = item.querySelector('title').textContent;
			anchor.href = item.querySelector('link').textContent;
			anchor.target = '_blank';

			li.appendChild(anchor);
			ul.appendChild(li);
		});

		this.appendChild(ul);
	}

	#ready() {
		if (this.isReady) return;
		this.#internals.states.add('--ready');
		this.dispatchEvent(new CustomEvent('ready', { bubbles: true, composed: true }));
	}
}

customElements.define('rss-feed', RssFeedElement);
