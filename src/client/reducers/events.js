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
      return state.push(action.event);
    case 'updateEventData':
      return state.update(action.event.index, (item) => {
        item.data = action.event.data;
        return item;
      });
    case 'deleteEvent':
      return state.delete(action.index);
    default:
      return state;
  }
}