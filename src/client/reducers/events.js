import Immutable from 'immutable';

let sqnc = [
  {
    'layer': 0,
    'time': 0.75,
    'callback': 'addStyle',
    'data': '.layer2 { basdlob: of css};',
    'key': 'event-00-75'
  },
  {
    'layer': 1,
    'time': 0.55,
    'callback': 'addStyle',
    'data': '.layer2 { blasdob: of css};',
    'key': 'event-10-55'
  },
  {
    'layer': 0,
    'time': 0,
    'callback': 'addStyle',
    'data': '.layer1 { blobasd: of css};',
    'key': 'event-00'
  }
];

export default (state = Immutable.List(sqnc), action) => {
  switch(action.type) {
    case 'addEvent':
      console.log('added action?', action);
      return state.push(action.event);
    case 'deleteEvent':
      console.log('delete reducer?!?!', action);
      // return state.delete(action.index);
      break;
    default:
      return state;
  }
}