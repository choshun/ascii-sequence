import { combineReducers, createStore } from 'redux';
import layers from './reducers/layers';
import triggers from './reducers/triggers';

let reducers = combineReducers({
  layers,
  triggers
});

export default createStore(reducers);