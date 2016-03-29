import Immutable from 'immutable';

let initialLayers = [
  {
    'index': 0,
    'element': ':'
  },
  {
    'index': 1,
    'element': ')'
  },
];

export default (state = Immutable.List(initialLayers), action) => {
  switch(action.type) {
    default:
      return state;
  }
}