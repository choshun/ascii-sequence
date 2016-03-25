import Immutable from 'immutable';

var layer = Immutable.Map({
  'poop': 'wap',
  'test': 'no'
});

var layer1 = Immutable.Map({
  'is': 45,
  'the': '34435543'
});

var sqnc = [layer, layer1];

export default (state = Immutable.List(sqnc), action) => {
  switch(action.type) {
    default:
      return state;
  }
}