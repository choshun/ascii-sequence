import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import Layer from './components/layer.jsx';
import Triggers from './components/triggers.jsx';

let reactElement = document.getElementById('app');

render(
  <Provider store={store}>
    <Triggers />
  </Provider>,
  reactElement
);