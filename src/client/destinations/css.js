/** 
 * Invoking this adds/removes styles to the page. Class is event.key (unique 
 * based on layer and time), and style to add is event.data.
 * We clear styles when the loop restarts based on the containers/Scheduler signature (scheduler
 * is the only place to call a destination anywhere in this app).
**/

// TODO: Add trainsition delay from schedule
// TODO: Concept of persistent css (per layer or grid/scene(bg)), maybe initial state?
// TODO: BUG: clear the style tag at the right time (new loop)
class Css {
  constructor() {
    this.styleBlock = document.createElement('style');
  }

  init() {
    document.head.appendChild(this.styleBlock);
  }

  createClass(event) {
    // TODO: make scene a constant
    return `.scene ${event.class} {\n${event.data}\n}`;
  }

  addStyle(event, newMeasure) {
    if (newMeasure) {
      this.styleBlock.innerHTML = '';
    }

    this.styleBlock.innerHTML = this.styleBlock.innerHTML + `${this.createClass(event)}\n`;
  }
}

export default Css;