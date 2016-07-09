/**
 * @class Utils
 * @author choshun.snyder@gmail.com (Choshun Snyder)
 */
class Utils {
  /**
   * @constructor Utils
   */
  constructor() {
    // Transport current context.
    this.context;
  }

  togglePlay(state) {
    (state.transport.playing) ? this.context.resume() :
        this.context.suspend();
  }

  getContext() {
    if (this.context === undefined) {
      this.createContext();
    }

    return this.context;
  }

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