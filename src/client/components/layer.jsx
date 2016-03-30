require('./layer.scss');

import React from 'react';
import Event from './Event.jsx';
import { addEvent } from '../actions';
import { connect } from 'react-redux';

const Layer = ({ data, css, layer, dispatch }) => (
  <li className={'layer'} onClick={(event) => {
      if (event.target.classList.contains('layer')) {
        let leftOffset = event.pageX / window.innerWidth;

        dispatch(addEvent({
          leftOffset,
          layer
        }));
      }
    }}>
    <ul className={'events'}>
      {
        data.map((event, index) => {
          return <Event key={event.key} data={event} css={css[event.key]} />;
        })
      }
    </ul>
  </li>
);

function mapStateToProps(store) {
  return {
    store
  }
}

export default connect(mapStateToProps)(Layer);