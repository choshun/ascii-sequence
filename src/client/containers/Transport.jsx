/** 
 * Controls time! :0
**/
import React from 'react';
import { connect } from 'react-redux';

class TransportUtils {
  mapStateToProps(store) {
    return {
      store
    };
  }
}

const transportUtils = new TransportUtils();

const Transport = ({ layers, gridCSS }) => (
  <section className={'scene'}>
    Transport!!!
    // TODO: make into component, set transport.play to !play
    // TODO: make sure context doesn't reset very time transport is changed,
    // if it does, see if it matters (maybe it doesn't?)
    <button className={'play'}>play</button>
  </section>
);

export default connect(transportUtils.mapStateToProps)(Transport);