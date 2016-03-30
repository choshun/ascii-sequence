require('./event.scss');

import React from 'react';
import { deleteEvent } from '../actions';
import { connect } from 'react-redux';

var styleBlock = document.createElement('style');
document.head.appendChild(styleBlock);

// See README
function addStyleToHead(className, css) {
  styleBlock.innerHTML = styleBlock.innerHTML + `.${className} ${css}\n`;
}

const Event = ({data, css, dispatch}) => (
  <li className={data.key} onClick={(event) => {
  		console.log('remove??!!', deleteEvent);
      dispatch(deleteEvent(data.key));
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