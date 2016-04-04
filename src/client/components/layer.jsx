require('./layer.scss');

import React, { Component } from 'react';
import Event from './Event.jsx';
import { connect } from 'react-redux';

class Layer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className={'layer'} onClick={(event) => { this.props.onClick(event, this.props.layer, this.props.dispatch) }}>
        <ul className={'events'}>
          { this.props.layerData.map((event, index) => {
            return <Event key={event.key} eventData={event} styleManager={this.props.styleManager} />;
          }) }
        </ul>
      </li>
    );
  }
}

export default connect()(Layer);
