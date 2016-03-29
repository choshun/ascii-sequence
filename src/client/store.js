import { combineReducers, createStore } from 'redux';
import layers from './reducers/layers';
import events from './reducers/events';

let reducers = combineReducers({
  layers,
  events
});

export default createStore(reducers);