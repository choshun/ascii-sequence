import React from 'react';
import { connect } from 'react-redux';

const Layer = ({layer, dispatch}) => (
  <div>
    {console.log(layer)}
    {layer.layer.map((layer, index) => <p onClick={(event) => {
      console.log('boop', layer);
    }}
    key={layer}>adads{layer}</p>)}
  </div>
);

function mapStateToProps(layer) {
  console.log('layer?', layer);
  return {
    layer
  }
}

export default connect(mapStateToProps)(Layer)