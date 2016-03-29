import React from 'react';
import { connect } from 'react-redux';
import { addEvent , deleteEvent } from '../actions';

// triggers is store
const Event = ({data, dispatch}) => (
  <li>
    oh hai
    {console.log('eventdata?', data)}
    {data.callback}
  </li>
);

export default Event;