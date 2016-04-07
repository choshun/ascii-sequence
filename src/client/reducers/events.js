import Immutable from 'immutable';

let sqnc = [
  {
    'layer': 1,
    'time': 0.25,
    'callback': 'addStyle',
    'class': '.layer-1',
    'data': 'basdlob: of css;\nleft: 100px',
    'key': 'event-10-25'
  },
  {
    'layer': 0,
    'time': 0.75,
    'callback': 'addStyle',
    'class': '.layer-0',
    'data': 'blob: of css;\nleft: 200px',
    'key': 'event-00-75'
  },
  {
    'layer': 1,
    'time': 0.55,
    'callback': 'addStyle',
    'class': '.layer-1',
    'data': 'basdlob: of css;\nleft: 300px',
    'key': 'event-10-55'
  },
  {
    'layer': 0,
    'time': 0,
    'callback': 'addStyle',
    'class': '.layer-0',
    'data': 'assdlob: of css;\nleft: 50px',
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