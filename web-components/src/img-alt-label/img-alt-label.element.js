const sheet = new CSSStyleSheet();
sheet.replaceSync(`
  :host {
    display: inline-block;
    position: relative;
  }
  button {
    position: absolute;
    text-transform: uppercase;
    background: var(--alt-button-background, buttonface);
    color: var(--alt-button-color, buttontext);
    border: var(--alt-button-border, 1px solid);
    border-radius: var(--alt-button-border-radius, 0);
    padding: var(--alt-button-padding, 2px 6px);
    margin: var(--alt-button-margin, 0);
    font-size: var(--alt-button-font-size, inherit);
    cursor: pointer;
    anchor-name: --alt-button;
  }
  [popover] {
    position: fixed;
    position-anchor: --alt-button;
    margin: 0;
    background: var(--alt-popover-background, canvas);
    color: var(--alt-popover-color, canvastext);
    border: var(--alt-popover-border, 1px solid);
    border-radius: var(--alt-popover-border-radius, 0);
    padding: var(--alt-popover-padding, 4px 8px);
    font-size: var(--alt-popover-font-size, inherit);
    max-width: var(--alt-popover-max-width, 300px);
  }
  :host(:not([position])) button,
  :host([position="bottom-left"]) button {
    bottom: 10px;
    left: 5px;
  }
  :host(:not([position])) [popover],
  :host([position="bottom-left"]) [popover] {
    position-area: top right;
  }
  :host([position="bottom-right"]) button {
    bottom: 10px;
    right: 5px;
  }
  :host([position="bottom-right"]) [popover] {
    position-area: top left;
  }
  :host([position="top-left"]) button {
    top: 10px;
    left: 5px;
  }
  :host([position="top-left"]) [popover] {
    position-area: bottom right;
  }
  :host([position="top-right"]) button {
    top: 10px;
    right: 5px;
  }
  :host([position="top-right"]) [popover] {
    position-area: bottom left;
  }
`);

class ImgAltLabelElement extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.adoptedStyleSheets = [sheet];

    const slot = document.createElement("slot");
    shadow.appendChild(slot);

    const img = this.querySelector("img");
    if (!img) return;

    const altText = img.getAttribute("alt");
    if (!altText) return;

    const popover = document.createElement("div");
    popover.role = "tooltip";
    popover.popover = "auto";
    popover.innerText = altText;
    shadow.appendChild(popover);

    const button = document.createElement("button");
    button.type = "button";
    button.innerText = "Alt";
    button.setAttribute("aria-label", "Show image description");
    button.popoverTargetElement = popover;
    shadow.appendChild(button);
  }
}

customElements.define("img-alt-label", ImgAltLabelElement);
