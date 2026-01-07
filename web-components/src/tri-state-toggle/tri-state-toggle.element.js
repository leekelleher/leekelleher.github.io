class TriStateToggleElement extends HTMLElement {
  static get observedAttributes() {
    return ["primary", "secondary", "tertiary", "value"];
  }

  #currentIndex = 0;

  #slotNames = ["primary", "secondary", "tertiary"];

  #slots = [];

  connectedCallback() {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(`
      :host[hidden] {
        display: none;
      }
      :host:not([hidden]) {
        display: inline-block;
      }
      button {
        cursor: pointer;
        background: none;
        border: none;
        padding: 0;
      }
      slot {
        display: none;
      }
      slot.active {
        display: contents;
      }
    `);

    this.setAttribute("hidden", "");

    const shadow = this.attachShadow({ mode: "open" });
    shadow.adoptedStyleSheets = [sheet];

    const button = document.createElement("button");
    button.type = "button";

    this.#slotNames.forEach((name) => {
      const slot = document.createElement("slot");
      slot.name = name;
      button.appendChild(slot);
      this.#slots.push(slot);
    });

    shadow.appendChild(button);

    const initialValue = this.getAttribute("value");
    if (initialValue) {
      const index = this.#getIndexByValue(initialValue);
      if (index !== -1) {
        this.#currentIndex = index;
      }
    }

    this.#updateActiveSlot();

    button.addEventListener("click", () => {
      this.#currentIndex = (this.#currentIndex + 1) % this.#slotNames.length;
      this.#updateActiveSlot();
      this.#dispatchChangeEvent();
    });

    this.removeAttribute("hidden");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "value" && oldValue !== newValue && this.#slots.length > 0) {
      const index = this.#getIndexByValue(newValue);
      if (index !== -1) {
        this.#currentIndex = index;
        this.#updateActiveSlot();
      }
    }
  }

  get value() {
    return this.#getValueByIndex(this.#currentIndex);
  }

  set value(newValue) {
    const index = this.#getIndexByValue(newValue);
    if (index !== -1) {
      this.#currentIndex = index;
      this.#updateActiveSlot();
      this.setAttribute("value", newValue);
    }
  }

  #getValueByIndex(index) {
    const slotName = this.#slotNames[index];
    return this.getAttribute(slotName) || slotName;
  }

  #getIndexByValue(value) {
    return this.#slotNames.findIndex((name) => {
      const attrValue = this.getAttribute(name) || name;
      return attrValue === value;
    });
  }

  #updateActiveSlot() {
    this.#slots.forEach((slot, index) => {
      slot.classList.toggle("active", index === this.#currentIndex);
    });
  }

  #dispatchChangeEvent() {
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { value: this.value },
        bubbles: true,
      })
    );
  }
}

customElements.define("tri-state-toggle", TriStateToggleElement);
