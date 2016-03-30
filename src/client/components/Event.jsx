require('./event.scss');

import React from 'react';
import { connect } from 'react-redux';
import { addEvent , deleteEvent } from '../actions';

var styleBlock = document.createElement('style');
document.head.appendChild(styleBlock);

// See README
function addStyleToHead(className, css) {
  styleBlock.innerHTML = styleBlock.innerHTML + `.${className} ${css}\n`;
}

const Event = ({data, css, dispatch}) => (
  <li className={data.key}>
    { addStyleToHead(data.key, css) }
    {data.key}
    {css}
  </li>
);

export default Event;