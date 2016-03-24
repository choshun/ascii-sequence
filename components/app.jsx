import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from '../store';
import Triggers from './triggers';

let reactElement = document.getElementById('app');

render(
  <Provider store={store}>
    <Triggers />
  </Provider>,
  reactElement
);