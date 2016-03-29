import Immutable from 'immutable';

let sqnc = [
  {
    'layer': 0,
    'time': .75,
    'callback': 'addStyle',
    'data': '.layer2 { blob: of css};'
  },
  {
    'layer': 1,
    'time': .545,
    'callback': 'addStyle',
    'data': '.layer2 { blob: of css};'
  },
  {
    'layer': 0,
    'time': 0,
    'callback': 'addStyle',
    'data': '.layer2 { blob: of css};'
  }
];

export default (state = Immutable.List(sqnc), action) => {
  switch(action.type) {
    case 'addTrigger':
    console.log(action);
      return state.push(action.trigger.test);
    case 'deleteTrigger':
      console.log(action);
      return state.delete(action.index);
    default:
      return state;
  }
}