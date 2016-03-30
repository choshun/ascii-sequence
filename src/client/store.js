import { combineReducers, createStore } from 'redux';
import layers from './reducers/layers';
import events from './reducers/events';
import styleManager from './reducers/style-manager';

let reducers = combineReducers({
  layers,
  events,
  styleManager
});

export default createStore(reducers);