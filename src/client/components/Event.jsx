require('./event.scss');

import React from 'react';

import classNames from 'classnames';
import { deleteEvent, selectStyle } from '../actions';
import { connect } from 'react-redux';

var styleBlock = document.createElement('style');
document.head.appendChild(styleBlock);

// See README
function addStyleToHead(className, css) {
  styleBlock.innerHTML = styleBlock.innerHTML + `.${className} ${css}\n`;
}

function getClassNames(eventKey, activeKey) {
  let classObject = {};
  classObject[eventKey] = true;
  classObject['is-active'] = (eventKey === activeKey) ? true : false;

  return classNames(classObject);
}

const Event = ({store, data, css, dispatch}) => (
  <li className={getClassNames(data.key, store.styleManager.get('active').key)} onClick={(event) => {
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