import { MarkdownBlock, URLs } from 'https://cdn.jsdelivr.net/npm/md-block@0.0.1/md-block.min.js';

class LiquidMarkdownBlock extends MarkdownBlock {
	constructor() {
		super();
		this._data = {};
		URLs.LiquidJS = 'https://cdn.jsdelivr.net/npm/liquidjs/dist/liquid.browser.min.js';
	}

	static get observedAttributes() {
		return ['data', ...MarkdownBlock.observedAttributes];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		super.attributeChangedCallback(name, oldValue, newValue);

		switch (name) {
			case 'data':
				try {
					this._data = JSON.parse(newValue);
					this.render();
				} catch (e) {
					return console.error(e);
				}
				break;
		}
	}

	connectedCallback() {
		super.connectedCallback();
		this.load();
	}

	async load() {
		await import(URLs.LiquidJS);
		this._engine = new window.liquidjs.Liquid();
		this._tmpl = this._engine.parse(this._mdContent);
		this.render();
	}

	async render() {
		if (!this._engine) return;

		this._mdContent = await this._engine.render(this._tmpl, this._data);

		await super.render();
	}
}

customElements.define('liquid-md-block', LiquidMarkdownBlock);
