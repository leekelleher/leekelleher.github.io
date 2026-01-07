class RssFeedElement extends HTMLElement {
  #controller;
  #internals;
  #url;

  static get observedAttributes() {
    return ["src"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "src":
        try {
          this.#url = newValue;
        } catch (e) {
          return console.error(e);
        }
        break;
    }
  }

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  get isReady() {
    return this.#internals.states.has("--ready");
  }

  connectedCallback() {
    this.#controller = new AbortController();

    if (this.isReady) {
      this.#ready();
      return;
    }

    fetch(this.#url, { signal: this.#controller.signal }).then(
      async (response) => {
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");
        const title = xml.querySelector("rss > channel > title")?.textContent;
        const description = xml.querySelector(
          "rss > channel > description"
        )?.textContent;
        const items = xml.querySelectorAll("rss > channel > item");

        const ul = document.createElement("ul");

        const template = document.getElementById("my-feed-item").content;

        items.forEach((item) => {
          const li = document.createElement("li");
          const anchor = document.createElement("a");

          anchor.text = item.querySelector("title").textContent;
          anchor.href = item.querySelector("link").textContent;
          anchor.target = "_blank";

          li.appendChild(anchor);
          ul.appendChild(li);

          // TODO: [LK] Continue from here, I got stuck offline in the airport.
          ul.appendChild(template.cloneNode(true));
        });

        this.appendChild(ul);

        console.log("data", [title, description, items, template]);
        this.#ready();
      }
    );
  }

  disconnectedCallback() {
    this.#controller.abort();
  }

  #ready() {
    if (this.isReady) return;
    this.#internals.states.add("--ready");
    this.dispatchEvent(
      new CustomEvent("ready", { bubbles: true, composed: true })
    );
  }
}

customElements.define("rss-feed", RssFeedElement);
