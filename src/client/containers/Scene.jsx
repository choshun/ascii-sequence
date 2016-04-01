/** 
 * ASCII art!
**/
import React from 'react';

import { connect } from 'react-redux';

const Scene = ({ layers, gridCSS }) => (
  <section className={'scene'}>
    Scene!!!
  </section>
);

function mapStateToProps(store) {
  return {
    store
  };
}

export default connect(mapStateToProps)(Scene);