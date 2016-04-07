import Immutable from 'immutable';
import Utils from '../utils/utils.js';

const utils = new Utils();
utils.createContext();

let initialTransport = {
  'play': true, // Should be playing.
  'start': 0, // Start of loop play as fraction of total time.
  'end': 1,	// End of loop play as fraction of total time.
  'time': 5, // Total loop time in seconds.
  'context': utils.getContext() // Audio context that keeps time.
};

export default (state = Immutable.Map(initialTransport), action) => {
  switch(action.type) {
  	case 'setPlay':
      return state.set('play', action.play);
    case 'setTime':
      return state.set('time', action.time);
    default:
      return state;
  }
}