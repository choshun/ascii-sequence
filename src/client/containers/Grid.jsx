require('./grid.scss');

/** 
 * This is responsible for the event UI.
 * You can add, select, and remove events.
**/
import React, { Component } from 'react';
import Layer from '../components/Layer.jsx';
import TimeIndicator from '../components/TimeIndicator.jsx';
import { clone, uniq, map, each, filter } from 'lodash';
import { addEvent, selectStyle } from '../actions';
import { connect } from 'react-redux';

class Grid extends Component {
  constructor(props) {
    super(props);
    this.styleBlock = document.createElement('style');
    this.layerClick = this.layerClick.bind(this);
  }

  componentDidMount() {
    document.head.appendChild(this.styleBlock);
    this.initGridCSS(this.props.store.events);
  }

  // TODO: use events store, or make a constant, if store then do Object.assign
  createEvent(leftOffset, layer) {
    return {
      'layer': layer,
      'time': leftOffset,
      'callback': 'addStyle',
      'class': `.layer-${layer}`,
      'data': 'new data: of css;\nleft: 50px',
      'key': this.createKey(leftOffset, layer)
    };
  }

  addGridStyleToHead(className, css) {
    // TODO: make .grid a constant
    this.styleBlock.innerHTML = this.styleBlock.innerHTML + `.grid .${className} ${css}\n`;
  }

  createKey(leftOffset, layer) {
    return `event-${layer}${leftOffset}`.replace(/\./g, '-');
  }

  createPosition(time) {
    return time * 100 + '%';
  }

  createCSS(property, value) {
    return `{ ${property}: ${value} }`;
  }

  initGridCSS(events) {
    _.each(events.toObject(), (item, index) => {
      let left = this.createPosition(item.time),
          key = item.key,
          css = this.createCSS('left', left);

      this.addGridStyleToHead(key, css);
    });
  }

  layerClick(event, layer, dispatch) {
    if (event.target.classList.contains('layer')) {
      let leftOffset = event.pageX / window.innerWidth,
          newEvent = this.createEvent(leftOffset, layer),
          left = this.createPosition(newEvent.time),
          css = this.createCSS('left', left);

      dispatch(addEvent(newEvent));
      dispatch(selectStyle(newEvent));
      this.addGridStyleToHead(newEvent.key, css);
    }
  }

  render() {
    return (
      <section className={'grid'}>
        Grid!!

        { /*TODO: add thingy that shows where we are, canvas cause it can change
        position delta in the fly; */ }
        <TimeIndicator 
            />
        
        <ul className={'layers'}>
          { this.props.layers.map((layer, index) => {
            return <Layer
                      key={ index }
                      layerData={ layer }
                      layer={ index }
                      onClick={ this.layerClick }
                      dispatch={ this.props.dispatch }
                      styleManager={ this.props.store.styleManager } />;
          }) }
        </ul>

      </section>
    );
  }
}

function createLayersFromEvents(layers, events) {
  let eventsObject = _.clone(events).toObject(),
      uniqueLayers = _.uniq(_.map(eventsObject, 'layer')),
      layersAndEvents = [];

  // Creates new object of Layers with events for ui.
  _.each(uniqueLayers, (item, index) => {
    layersAndEvents.push(_.filter(eventsObject, {layer: index}));
  });

  return layersAndEvents;
}

function mapStateToProps(store) {
  return {
    store,
    'transport': store.transport,
    'dispatch': store.dispatch,
    'layers': createLayersFromEvents(store.layers, store.events)
  };
}

export default connect(mapStateToProps)(Grid);
