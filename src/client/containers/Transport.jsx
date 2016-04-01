/** 
 * Controls time! :0
**/
import React from 'react';
import { connect } from 'react-redux';

class TransportUtils {
  mapStateToProps(store) {
    console.log('it worked for transport?');
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
    <button className={'play'}>play</button>
  </section>
);

export default connect(transportUtils.mapStateToProps)(Transport);