import _ from 'lodash';
import React from 'react';
import Layer from '../components/Layer.jsx';

import { connect } from 'react-redux';
import { addLayer } from '../actions';

const StyleManager = ({ events, dispatch }) => (
  <section>
    {console.log(events)}

  </section>
);

function mapStateToProps(store) {
  return {
    'events': store.events
  };
}

export default connect(mapStateToProps)(StyleManager);