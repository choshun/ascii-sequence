import Immutable from 'immutable';

var trigger = Immutable.Map({
  'time': 0,
  'style': 'puppies'
});


var trigger1 = Immutable.Map({
  'test': 999999,
  'bpp': '4'
});

var sqnc = [trigger, trigger1];

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