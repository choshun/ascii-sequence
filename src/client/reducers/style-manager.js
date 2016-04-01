import Immutable from 'immutable';

let selectedState = {
  active: {
    callback: 'addStyle',
    data: '.layer2 { blob: of css};',
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