import React from 'react';
import Layer from '../components/Layer.jsx';
import { connect } from 'react-redux';
import { addLayer } from '../actions';

/** 
 * containers do all the data transformations
 * via mapStateToProps, all children should
 * not have transformation logic, ie stateless.
**/

const Grid = ({ layers, test, dispatch }) => (
  <section>
    Grid!!

    <p>{test}</p>

    <ul>
      {
        layers.map(function(layer, index) {
          return <Layer key={layer.index} data={layer} />;
        })
      }
    </ul>

  </section>
);

function mapStateToProps(store) {
  return {
    'layers': store.layers,
    'test': 'sup'
  };
}

export default connect(mapStateToProps)(Grid);