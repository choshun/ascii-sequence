import { combineReducers, createStore } from 'redux';
import layers from './reducers/layers';
import events from './reducers/events';
import styleManager from './reducers/style-manager';
import transport from './reducers/transport';

let reducers = combineReducers({
  layers,
  events,
  styleManager,
  transport
});

export default createStore(reducers);