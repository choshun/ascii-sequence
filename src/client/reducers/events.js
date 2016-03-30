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
    'time': .55,
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
    case 'addEvent':
      let eventState = {
        'callback': 'addStyle',
        'data': '.layer2 { blob: of css};'
      };
      eventState.layer = action.event.layer;
      eventState.time = action.event.leftOffset;

      return state.push(eventState);
    case 'deleteEvent':
      console.log('delete reducer?!?!', action);
      // return state.delete(action.index);
      break;
    default:
      return state;
  }
}