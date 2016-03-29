import _ from 'lodash';
import React from 'react';
import Layer from '../components/Layer.jsx';

import { connect } from 'react-redux';
import { addLayer } from '../actions';

/** 
 * containers do all the data transformations
 * via mapStateToProps, all children should
 * not have transformation logic, ie stateless
 * no mapStateToProps
**/

function createLayersFromEvents(layers, events) {
  let eventsObject = events.toObject(),
      uniqueLayers = _.uniq(_.map(eventsObject, 'layer')),
      layersAndEvents = [];

  // Makes a key for each event.
  _.each(eventsObject, (item, index) => {
    item.key = item.layer + item.time;
  });

  // Creates new object of Layers with events for ui.
  _.each(uniqueLayers, (item, index) => {
    layersAndEvents.push(_.filter(eventsObject, {layer: index}));
  });

  return layersAndEvents;
}

const Grid = ({ layers, test, dispatch }) => (
  <section>
    Grid!!

    <p>{test}</p>

    <ul>
      {
        layers.map(function(layer, index) {
          return <Layer key={index} data={layer} />;
        })
      }
    </ul>

  </section>
);

function mapStateToProps(store) {
  return {
    'layers': createLayersFromEvents(store.layers, store.events)
  };
}

export default connect(mapStateToProps)(Grid);