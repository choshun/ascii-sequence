import React from 'react';
import { connect } from 'react-redux';
import { addLayer } from '../actions';

let layer = {
  'layer': 2,
  'time': .2353,
  'callback': 'addStyle1',
  'data2': '.layer2 { blob: of css};'
};

const Layer = ({ onClick, data, triggers }) => (
  <div onClick={onClick} data={data}>
    {console.log('triggers?', triggers)}
    {data.element}
  </div>
);

function mapStateToProps(store) {
  console.log('GRID', store);

  return {
    'triggers': store.layers
  };
}

export default connect(mapStateToProps)(Layer);