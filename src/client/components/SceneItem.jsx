require('./scene-item.scss');

import React, { Component } from 'react';
import classNames from 'classnames';
import { selectStyle } from '../actions';

class SceneItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <figure className={this.props.class}>{this.props.element}</figure>
    );
  }
}

export default SceneItem;