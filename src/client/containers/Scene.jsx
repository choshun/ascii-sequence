require('./scene.scss');

/** 
 * ASCII art! Where the cool stuff happens.
**/
import React, { Component } from 'react';
import SceneItem from '../components/SceneItem.jsx';
import classNames from 'classnames';
import { connect } from 'react-redux';

class Scene extends Component {
  constructor(props) {
    super(props);
  }

  getClassNames(index) {
    let classObject = {};
    classObject['scene-item'] = true;
    classObject[`layer-${index}`] = true;

    return classNames(classObject);
  }

  render() {
    return (
      <section className={'scene'}>
        Scene!!!
        { this.props.layers.map((layer, index) => {
          return <SceneItem
                    className={ 'scene' }
                    class={ this.getClassNames(index) }
                    element={ layer.element }
                    key={ index } />;
        }) }
      </section>
    );
  }
}

function mapStateToProps(store) {
  return {
    layers: store.layers
  };
}

export default connect(mapStateToProps)(Scene);