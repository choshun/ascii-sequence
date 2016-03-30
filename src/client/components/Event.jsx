require('./event.scss');

import React from 'react';
import { deleteEvent, selectStyle } from '../actions';
import { connect } from 'react-redux';

var styleBlock = document.createElement('style');
document.head.appendChild(styleBlock);

// See README
function addStyleToHead(className, css) {
  styleBlock.innerHTML = styleBlock.innerHTML + `.${className} ${css}\n`;
}

// TODO: add classNames to project for active stuff
// https://github.com/JedWatson/classnames
const Event = ({data, css, dispatch}) => (
  <li className={data.key} onClick={(event) => {
      // Pass event data we want to change
      dispatch(selectStyle(data));
    }}>

    { addStyleToHead(data.key, css) }
  </li>
);

function mapStateToProps(store) {
  return {
    store
  }
}

export default connect(mapStateToProps)(Event);