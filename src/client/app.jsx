require('./app.scss');

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Grid from './containers/Grid.jsx';
import StyleManager from './containers/StyleManager.jsx';
import Scheduler from './containers/Scheduler.jsx';
import Transport from './containers/Transport.jsx';
import Scene from './containers/Scene.jsx';

let app = document.getElementById('app');

render(
  <Provider store={store}>
    <section className="containers-wrapper">
    	{/* UI to edit events sequence. */}
      <Grid />

      {/* UI to edit selected event. */}
      <StyleManager />

      {/* Schedules events. */}
      <Scheduler />

      {/* Controls playback of scheduler. */}
      <Transport />

      {/* Destination of events. */}
      <Scene />
    </section>
  </Provider>,
  app
);