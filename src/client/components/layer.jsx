import React from 'react';
import Event from './Event.jsx';
import { connect } from 'react-redux';
import { addLayer } from '../actions';

const Layer = ({ onClick, data }) => (
  <li>
    <ul>
      {
        data.map(function(event, index) {
          return <Event key={index} data={event} />;
        })
      }
    </ul>
  </li>
);

export default Layer;