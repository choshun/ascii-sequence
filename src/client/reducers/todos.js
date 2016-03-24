import Immutable from 'immutable';

export default (state = Immutable.List(['Code More!']), action) => {
  switch(action.type) {
    case 'addTrigger':
      return state.push(action.trigger);
    case 'deleteTrigger':
      return state.splice(action.index, 1);
    default:
      return state;
  }
}