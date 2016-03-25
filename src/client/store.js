import {combineReducers, createStore} from 'redux';
import triggers from './reducers/triggers';
import layer from './reducers/layer';

let reducers = combineReducers({
  triggers,
  layer
});

export default createStore(reducers);