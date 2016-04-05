/** 
 * ASCII art!
**/
import React, { Component } from 'react';
import { connect } from 'react-redux';


class Scene extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className={'scene'}>
        Scene!!!?
      </section>
    );
  }
}

function mapStateToProps(store) {
  return {
    store
  };
}

export default connect(mapStateToProps)(Scene);