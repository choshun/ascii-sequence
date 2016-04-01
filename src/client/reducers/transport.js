import Immutable from 'immutable';

let initialTransport = {
  'play': true,
  'start': 0,
  'end': 1,
  'measure': 0
};

export default (state = Immutable.Map(initialTransport), action) => {
  switch(action.type) {
    default:
      return state;
  }
}