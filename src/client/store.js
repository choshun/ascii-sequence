import Vue from 'vue';
import Revue from 'revue';
import { combineReducers, createStore } from 'redux';
import actions from './actions';
import layers from './reducers/layers';
import events from './reducers/events';
import styleManager from './reducers/style-manager';
import transport from './reducers/transport';

const reducers = combineReducers({
  layers,
  events,
  styleManager,
  transport
});

const reduxStore = createStore(reducers);
const store = new Revue(Vue, reduxStore, actions);

export default store;