require('./app.scss');

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Grid from './containers/Grid.jsx';
import StyleManager from './containers/StyleManager.jsx';

let app = document.getElementById('app');

// have to make an app component, only one root :(
// then in there style manager, grid, style, scene, etc

render(
  <Provider store={store}>
    <section className="container-wrapper">
      <Grid />
      <StyleManager />
    </section>
  </Provider>,
  app
);