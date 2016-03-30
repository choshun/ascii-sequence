import React from 'react';
import Layer from '../components/Layer.jsx';
import Immutable from 'immutable';

import { filter } from 'lodash';
import { connect } from 'react-redux';

const StyleManager = ({ store, dispatch }) => (
  <section>
    <textarea value={ store.styleManager.get('active').time + store.styleManager.get('active').data }></textarea>
  </section>
);

function mapStateToProps(store) {
  return {
    store
  };
}

export default connect(mapStateToProps)(StyleManager);