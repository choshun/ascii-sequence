require('./layer.scss');

import React from 'react';
import Event from './Event.jsx';

import { addEvent, selectStyle } from '../actions';
import { connect } from 'react-redux';

function createEvent(leftOffset, layer) {
  return Object.assign({}, {
    'layer': layer,
    'time': leftOffset,
    'callback': 'addStyle',
    'data': 'new data: of css;\nleft: 50px',
    'key': createKey(leftOffset, layer)
  });
}

function createKey(leftOffset, layer) {
  return `event-${layer}${leftOffset}`.replace(/\./g, '-');
}

const Layer = ({ data, css, layer, dispatch }) => (
  <li className={'layer'} onClick={(event) => {
      if (event.target.classList.contains('layer')) {
        let leftOffset = event.pageX / window.innerWidth,
            newEvent = createEvent(leftOffset, layer);

        dispatch(addEvent(newEvent));
        dispatch(selectStyle(newEvent));
      }
    }}>

    <ul className={'events'}>
      { data.map((event, index) => {
        return <Event key={event.key} data={event} css={css[event.key]} />;
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