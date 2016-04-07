import React, { Component } from 'react';
import classNames from 'classnames';
import { setTime } from '../actions';
import { connect } from 'react-redux';

class TransportTime extends Component {
  constructor(props) {
    super(props);
    this.changeTime = this.changeTime.bind(this);
  }

  changeTime(event) {
    console.log('value', event.target.value);
    this.props.dispatch(setTime(event.target.value));
  }

  render() {
    return (
      <section class="transport-time">
        <input type="number" value={ this.props.transport.get('time') } onChange={ this.changeTime } /> oh hai
      </section>
    );
  }
}

export default connect()(TransportTime);