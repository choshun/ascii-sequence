import React from 'react';
import Layer from './Layer.jsx';
import { connect } from 'react-redux';
import { addLayer } from '../actions';

let layer = {
  'layer': 2,
  'time': .2353,
  'callback': 'addStyle1',
  'data2': '.layer2 { blob: of css};'
};

let layer1 = 'hey there';

const Grid = ({grid, layer, dispatch}) => (
  <section>
    Grid!!
    {console.log('grid?', grid.triggers, grid.grid)}
    
    <Layer onClick={(e) => {dispatch(addLayer(layer))}} />

    { /*setTimeout(() => {
      dispatch(addLayer(layer));
      console.log('layer', layer);
    }, 1000)*/};

    {console.log('layer?', grid, layer)}

    <ul>
      {grid.grid.map(function(layer) {
        console.log('layer?', layer.callback);
        return <li key={layer.time}>{layer.callback}</li>;
      })}
    </ul>

  </section>
);

function mapStateToProps(grid) {
  return {
    grid: {
      grid: [{
        'time': 0,
        'callback': 'test'
      },
      {
        'time': 2,
        'callback': 'test1'
      }]
    },
    'layer': 'hello'
  };
}

export default connect(mapStateToProps)(Grid);