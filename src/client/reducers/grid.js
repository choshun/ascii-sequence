import Immutable from 'immutable';

let mock = [
  {
    'layer': 1,
    'time': .75,
    'callback': 'addStyle',
    'data': '.layer2 { blob: of css};'
  },
  {
    'layer': 2,
    'time': .545,
    'callback': 'addStyle',
    'data': '.layer2 { blob: of css};'
  },
  {
    'layer': 1,
    'time': 0,
    'callback': 'addStyle',
    'data': '.layer2 { blob: of css};'
  }
];

let mock1 = [
  'sup',
  'guy'
];

export default (state = Immutable.List(mock), action) => {
  switch(action.type) {
    case 'addLayer':
      console.log('pushed?', action.layer);
      return state.push(action.layer);
    default:
      return state;
  }
}