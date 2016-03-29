import React from 'react';
import { connect } from 'react-redux';
import { addLayer } from '../actions';

let layer = {
  'layer': 2,
  'time': .2353,
  'callback': 'addStyle1',
  'data2': '.layer2 { blob: of css};'
};

const Layer = ({ onClick, data }) => (
  <div onClick={onClick} data={data}>
    {data.element}
  </div>
);

export default Layer;