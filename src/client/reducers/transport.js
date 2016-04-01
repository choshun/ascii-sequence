import Immutable from 'immutable';

let initialTransport = {
  'play': true, // Should be playing.
  'start': 0, // Start of loop play as fraction of total time.
  'end': 1,	// End of loop play as fraction of total time.
  'time': 30 // Total loop time in seconds.
};

export default (state = Immutable.Map(initialTransport), action) => {
  switch(action.type) {
    default:
      return state;
  }
}