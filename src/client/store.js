import { combineReducers, createStore } from 'redux';
import grid from './reducers/grid';
import triggers from './reducers/triggers';

let reducers = combineReducers({
  grid,
  triggers
});

export default createStore(reducers);