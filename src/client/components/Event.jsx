require('./event.scss');

import React from 'react';
import classNames from 'classnames';
import { deleteEvent, selectStyle } from '../actions';
import { connect } from 'react-redux';

function getClassNames(eventKey, activeKey) {
  let classObject = {};
  classObject[eventKey] = true;
  classObject['is-active'] = (eventKey === activeKey) ? true : false;

  return classNames(classObject);
}

const Event = ({ store, eventData, dispatch}) => (
  <li className={getClassNames(eventData.key, store.styleManager.get('active').key)} onClick={(event) => {
      dispatch(selectStyle(eventData));
    }}>
  </li>
);

function mapStateToProps(store) {
  return {
    store
  }
}

export default connect(mapStateToProps)(Event);