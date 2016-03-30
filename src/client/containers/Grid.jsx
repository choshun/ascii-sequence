/** 
 * This is responsible for the event UI.
 * You can add, select, and remove events.
**/

import { uniq, map, each, filter, clone } from 'lodash';
import React from 'react';
import Layer from '../components/Layer.jsx';

import { connect } from 'react-redux';
import { addLayer } from '../actions';



function createLayersFromEvents(layers, events) {
  let eventsObject = events.toObject(),
      uniqueLayers = _.uniq(_.map(eventsObject, 'layer')),
      layersAndEvents = [];

  // Makes a key for each event.
  // TODO: Maybe do this in reducer.
  _.each(eventsObject, (item, index) => {
    item.key = `event-${item.layer}${item.time}`.replace(/\./g, '-');
  });

  // Creates new object of Layers with events for ui.
  _.each(uniqueLayers, (item, index) => {
    layersAndEvents.push(_.filter(eventsObject, {layer: index}));
  });

  return layersAndEvents;
}

function createGridCSS(events) {
  let eventsObject = events.toObject(),
      position = '', // TODO: I hope I don't need this.
      key = '',
      cssObject = {};

  _.each(eventsObject, (item) => {
    position = item.time.toString().split('.').slice(-1) + '%';
    key = item.key;
    cssObject[key] = `{ left: ${position} }`;
  });

  return cssObject;
}

function mapStateToProps(store) {
  return {
    'layers': createLayersFromEvents(store.layers, store.events),
    'gridCSS': createGridCSS(store.events)
  };
}

const Grid = ({ layers, gridCSS, dispatch }) => (
  <section className={'grid'}>
    Grid!!

    <ul className={'layers'}>
      {
        layers.map((layer, index) => {
          return <Layer key={index} data={layer} css={gridCSS} />;
        })
      }
    </ul>

  </section>
);

export default connect(mapStateToProps)(Grid);