require('./event.scss');

import React, { Component } from 'react';
import classNames from 'classnames';
import { selectStyle } from '../actions';
import { connect } from 'react-redux';

class Event extends Component {
  constructor(props) {
    super(props);
  }

  getClassNames(eventKey, activeKey) {
    let classObject = {};
    classObject[eventKey] = true;
    classObject['is-active'] = (eventKey === activeKey) ? true : false;

    return classNames(classObject);
  }

  render() {
    return (
      <li className={this.getClassNames(this.props.eventData.key, this.props.styleManager.get('active').key)}
          onClick={(event) => {
            this.props.dispatch(selectStyle(this.props.eventData));
          }}></li>
    );
  }
}

export default connect()(Event);