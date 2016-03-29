/** 
 * This is responsible for adding needed styles (event styles
 * for scheduler, trigger styles for grid).
 * It should be pretty dumb, and just add the styles that are
 * in the events store.
**/

import _ from 'lodash';
import React from 'react';
import Layer from '../components/Layer.jsx';

import { connect } from 'react-redux';
import { addLayer } from '../actions';

const StyleManager = ({ events, dispatch }) => (
  <section>
    boop
    {/*console.log('events', events)*/}

  </section>
);

function mapStateToProps(store) {
  return {
    'events': store.events
  };
}

export default connect(mapStateToProps)(StyleManager);