/** 
 * Responsible for the concept of time :0
**/
import React, { Component } from 'react';
import PlayButton from '../components/PlayButton.jsx';
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

        <PlayButton transport={ this.props.transport } 
                    dispatch={ this.props.dispatch } />

        // TODO: make time editor thingy
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