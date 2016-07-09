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
    if (this.context === undefined) {
      this.createContext();
    }

    console.log('pause?', this.context.state);

    (state.transport.playing) ? this.context.resume() :
        this.context.suspend();
  }

  getContext() {
    if (this.context === undefined) {
      this.createContext();
    }

    return this.context;
  }

  getTranslatedContext(transport, modifier = 1) {
    if (this.context === undefined) {
      this.createContext();
    }

    // TODO: internalize context, don't have it in transport.
    let ratio = ((transport.context.currentTime % (transport.time * transport.duration)) / transport.time) * modifier;
    let endMod = modifier / ( 1 / transport.duration),
        startMod = modifier / ( 1 / transport.start);

    // console.log('shwa?', startMod + ratio % endMod);    
    return startMod + ratio % endMod;
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