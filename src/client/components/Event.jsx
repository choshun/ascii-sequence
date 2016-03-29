import React from 'react';
import { connect } from 'react-redux';
import { addEvent , deleteEvent } from '../actions';

// triggers is store
const Event = ({data, dispatch}) => (
  <li data-class={data.key}>
    oh hai?!?!
    {console.log('eventdata?', data)}
    {data.key}
  </li>
);

export default Event;