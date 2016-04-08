/** 
 * Responsible for the concept of time :0
**/
import React, { Component } from 'react';
import PlayButton from '../components/PlayButton.jsx';
import TransportTime from '../components/TransportTime.jsx';
import { connect } from 'react-redux';

class Transport extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className={'scene'}>
        Transport!!!
        <PlayButton
            transport={ this.props.transport } 
            dispatch={ this.props.dispatch } />

        <TransportTime
            transport={ this.props.transport } 
            dispatch={ this.props.dispatch } />
      </section>
    );
  }
}

function mapStateToProps(store) {
  return {
    transport: store.transport,
    dispatch: store.dispatch
  };
}

export default connect(mapStateToProps)(Transport);