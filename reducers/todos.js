import Immutable from 'immutable';

export default (state = Immutable.List(['Code More!']), action) => {
  switch(action.type) {
    case 'addTrigger':
      console.log(action, state);
      return state.push(action.trigger);
    case 'deleteTrigger':
      console.log(action, state);
      return state.splice(action.index, 1);
    default:
      return state;
  }
}