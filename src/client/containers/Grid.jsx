/** 
 * This is responsible for the event UI.
 * You can add, select, and remove events.
**/
import React from 'react';
import Layer from '../components/Layer.jsx';

import { uniq, map, each, filter } from 'lodash';
import { connect } from 'react-redux';

function createLayersFromEvents(layers, events) {
  let eventsObject = events.toObject(),
      uniqueLayers = _.uniq(_.map(eventsObject, 'layer')),
      layersAndEvents = [];

  // Creates new object of Layers with events for ui.
  _.each(uniqueLayers, (item, index) => {
    layersAndEvents.push(_.filter(eventsObject, {layer: index}));
  });

  return layersAndEvents;
}

function createGridCSS(events) {
  let eventsObject = events.toObject(),
      position = '',
      key = '',
      cssObject = {};

  _.each(eventsObject, (item) => {
    position = item.time * 100 + '%';
    key = item.key;
    cssObject[key] = `{ left: ${position} }`;
  });

  return cssObject;
}

const Grid = ({ layers, gridCSS }) => (
  <section className={'grid'}>
    Grid!!

    <ul className={'layers'}>
      {layers.map((layer, index) => {
          return <Layer key={index} data={layer} layer={index} css={gridCSS} />;
        })}
    </ul>

  </section>
);

function mapStateToProps(store) {
  return {
    'layers': createLayersFromEvents(store.layers, store.events),
    'gridCSS': createGridCSS(store.events)
  };
}

export default connect(mapStateToProps)(Grid);