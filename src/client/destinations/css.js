// Add trainsition delay from schedule
// Clear at new loop
// Concept of persistent css (per layer or grid/scene(bg)), maybe initial state?
class Css {
  constructor() {
    this.styleBlock = document.createElement('style');
  }

  init() {
    document.head.appendChild(this.styleBlock);
  }

  createClass(event) {
    // TODO: make scene a constant
    return `.scene .${event.key} {\n${event.data}\n}`;
  }

  addStyle(event) {
    // TODO: clear out old stuff in style tag if possible (new loop?)
    this.styleBlock.innerHTML = this.styleBlock.innerHTML + `${this.createClass(event)}\n`;
  }
}

export default Css;