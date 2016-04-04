require('./layer.scss');

import React from 'react';
import Event from './Event.jsx';
import { connect } from 'react-redux';

const Layer = ({ layerData, layer, onClick, dispatch }) => (
  <li className={'layer'} onClick={(event) => { onClick(event, layer, dispatch) }}>
    <ul className={'events'}>
      { layerData.map((event, index) => {
        return <Event key={event.key} eventData={event} />;
      }) }
    </ul>
  </li>
);

function mapStateToProps(store) {
  return {
    store
  }
}

export default connect(mapStateToProps)(Layer);