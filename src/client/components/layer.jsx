import React from 'react';
import Event from './Event.jsx';
import { connect } from 'react-redux';
import { addLayer } from '../actions';

const Layer = ({ onClick, data, css }) => (
  <li>
    <ul>
      {
        data.map((event, index) => {
          return <Event key={event.key} data={event} css={css[event.key]} />;
        })
      }
    </ul>
  </li>
);

export default Layer;