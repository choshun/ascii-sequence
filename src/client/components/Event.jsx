require('./event.scss');

import React, { Component } from 'react';
import classNames from 'classnames';
import { selectStyle } from '../actions';

class Event extends Component {
  constructor(props) {
    super(props);
    this.selectStyle = this.selectStyle.bind(this);
  }

  selectStyle() {
    this.props.dispatch(selectStyle(this.props.eventData));
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
          onClick={ this.selectStyle }></li>
    );
  }
}

export default Event;