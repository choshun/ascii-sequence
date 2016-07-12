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
    // TODO: internalize context, don't have it in transport.
    // Need to address instantiating 3 of these utils.
    let ratio = ((transport.context.currentTime % (transport.time * transport.duration)) / transport.time) * modifier;
    let endMod = modifier / (1 / transport.duration),
        startMod = modifier / (1 / transport.start);

    return startMod + ((ratio + (modifier / ( 1 / transport.offset))) % endMod);
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