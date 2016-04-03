/**
 * @class Utils
 * @author choshun.snyder@gmail.com (Choshun Snyder)
 */
class Utils {
  /**
   * @constructor Utils
   */
  constructor() {
    this.context;
  }

  getContext() {
    return this.context;
  }
  // should init immediately
  createContext() {
    if (this.context === undefined) {
      var contextClass = window.AudioContext ||
          window.webkitAudioContext ||
          window.mozAudioContext || window.oAudioContext ||
          window.msAudioContext;

      if (contextClass) {
        this.context = new contextClass();
      }
    }
  }
};

export default Utils;