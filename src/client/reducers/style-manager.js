import Immutable from 'immutable';

// TODO: get this from store events
let selectedState = {
  active: {
    callback: 'addStyle',
    data: 'dummy style, should be gotten from events store\nleft: 50px',
    key: 'event-00-75',
    layer: 0,
    time: 0.75
  }
};

export default (state = Immutable.Map(selectedState), action) => {
  switch(action.type) {
    case 'selectStyle':
      return state.set('active', action.eventKey);
    default:
      return state;
  }
}