require('./time-indicator.scss');

import React, { Component } from 'react';
import classNames from 'classnames';
import { setPlay } from '../actions';

class TimeIndicator extends Component {
  constructor(props) {
    super(props);
    this.togglePlay = this.togglePlay.bind(this);
  }

  togglePlay() {
    var playing = !this.props.transport.get('play');
    this.props.dispatch(setPlay(playing));
  }

  render() {
    return (
      <section className="time-indicator"></section>
    );
  }
}

export default TimeIndicator;