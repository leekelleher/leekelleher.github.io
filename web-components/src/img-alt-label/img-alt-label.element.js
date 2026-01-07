class ImgAltLabelElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(`
      :host {
            position: relative;
      }

      button {
        position: absolute;
        bottom: 10px;
        left: 5px;
        text-transform: uppercase;
      }
    `);

    const shadow = this.attachShadow({ mode: "open" });
    shadow.adoptedStyleSheets = [sheet];

    const slot = document.createElement("slot");
    shadow.appendChild(slot);

    const elements = slot.assignedElements();
    if (!elements) return;

    const img = elements.find((element) => element.tagName === "IMG");
    if (!img) return;

    const altText = img.getAttribute("alt") || img.getAttribute("title");
    if (!altText) return;

    const label = document.createElement("label");
    label.popover = 'hint';
    label.innerText = altText;
    shadow.appendChild(label);

    const button = document.createElement("button");
    button.type = "button";
    button.innerText = "Alt";
    button.popoverTargetElement = label;
    shadow.appendChild(button);
  }
}

customElements.define("img-alt-label", ImgAltLabelElement);
