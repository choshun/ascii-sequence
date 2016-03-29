import React from 'react';
import { connect } from 'react-redux';
import { addEvent , deleteEvent } from '../actions';

// triggers is store
const Event = ({data, css, dispatch}) => (
  <li className={data.key} style={{css}}>
    oh hai?!?!
    asd{css}asd
    {data.key}
  </li>
);

export default Event;