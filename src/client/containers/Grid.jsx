/** 
 * This is responsible for the event UI.
 * You can add, select, and remove events.
**/
import React from 'react';
import Layer from '../components/Layer.jsx';
import { uniq, map, each, filter } from 'lodash';
import { addEvent, selectStyle } from '../actions';
import { connect } from 'react-redux';

let styleBlock = document.createElement('style'),
    initialized = false;

document.head.appendChild(styleBlock);

// TODO: get from events, or from a constant
function createEvent(leftOffset, layer) {
  return Object.assign({}, {
    'layer': layer,
    'time': leftOffset,
    'callback': 'addStyle',
    'data': 'new data: of css;\nleft: 50px',
    'key': createKey(leftOffset, layer)
  });
}

function addStyleToHead(className, css) {
  styleBlock.innerHTML = styleBlock.innerHTML + `.${className} ${css}\n`;
}

function createKey(leftOffset, layer) {
  return `event-${layer}${leftOffset}`.replace(/\./g, '-');
}

function createCSS(property, value) {
  return `{ ${property}: ${value} }`;
}

function createPosition(time) {
  console.log('time', time);
  return time * 100 + '%';
}

function layerClick(event, layer, dispatch) {
  if (event.target.classList.contains('layer')) {
    let leftOffset = event.pageX / window.innerWidth,
        newEvent = createEvent(leftOffset, layer),
        left = createPosition(newEvent.time),
        css = createCSS('left', left);

    dispatch(addEvent(newEvent));
    dispatch(selectStyle(newEvent));
    addStyleToHead(newEvent.key, css);
  }
}

function initGridCSS(events) {
  if (!initialized) {
    _.each(events.toObject(), (item, index) => {
        let left = createPosition(item.time),
            key = item.key,
            css = createCSS('left', left);

        addStyleToHead(key, css);

        if (parseInt(index) === (events.size - 1)) {
          initialized = true;
        }
    });
  }
}

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

const Grid = ({ layers, gridCSS }) => (
  <section className={'grid'}>
    Grid!!

    <ul className={'layers'}>
      {layers.map((layer, index) => {
        return <Layer key={index} layerData={layer} layer={index} onClick={layerClick} />;
      })}
    </ul>

  </section>
);

function mapStateToProps(store) {
  return {
    'layers': createLayersFromEvents(store.layers, store.events),
    'gridCSS': initGridCSS(store.events)
  };
}

export default connect(mapStateToProps)(Grid);