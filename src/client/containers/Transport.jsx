/** 
 * Controls time! :0
**/
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Transport extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className={'scene'}>
        Transport!!!
        // TODO: make into component, set transport.play to !play
        // TODO: make sure context doesn't reset very time transport is changed,
        // if it does, see if it matters (maybe it doesn't?)
        <button className={'play'}>play button yo</button>
      </section>
    );
  }
}

function mapStateToProps(store) {
  return {
    store
  };
}

export default connect(Transport.mapStateToProps)(Transport);