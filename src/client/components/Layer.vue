<style scoped lang="sass">
	.layer {
    border-bottom: 1px solid rgb(101, 55, 55);
    // background-color: rgba(193, 66, 66, .3);
    height: 3em;
    margin-top: -0.2em;
    opacity: .7;
    position: relative;
  }

  .element {
    /* color: rgba(0, 255, 159, 0.65); */
    padding-left: 10%;
    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;
  }
</style>

<template>
  <li class="layer" @click="addEvent($event, layer)">
    <!--
      Fires once at init, only way I could figure out passing store to a method that fires on init.
      This bootstraps init store data for event css.
     -->

    <span class="element">{{ element }}</span>
    <!-- {{ element }} -->

    {{ initEventCSS }}
    <ul>
      <event v-for="event in sequence[layer]" track-by="$index" :event="event" ></event>
    </ul>
  </li>
</template>

<script>
  import store from '../vuex/store';
  import Event from './Event.vue';
  import { clone, uniq, map, each, filter } from 'lodash';

  class Layer {
    constructor() {
      this.styleBlock = document.getElementById('grid-css');
      this.initialized = false;
    }

    // TODO: put in getter
    createLayersFromEvents(sequence) {
      let eventsObject = _.clone(sequence),
          uniqueLayers = _.uniq(_.map(eventsObject, 'layer')),
          layersAndEvents = [];

      // Creates new object of Layers with events for ui.
      _.each(uniqueLayers, (item, index) => {
        layersAndEvents.push(_.filter(eventsObject, { layer: index }));
      });

      return layersAndEvents;
    }

    // TODO: put in getter maybe?
    getInitEventCSS(events) {
      if (this.initialized === false) {
        _.each(events, (item, index) => {
          let left = this.createPosition(item.time),
              key = item.key,
              css = this.createCSS('left', left);

          this.addGridStyleToHead(key, css);
        });
      }

      this.initialized = true;
    }

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

    createPosition(time) {
      return time * 100 + '%';
    }

    createCSS(property, value) {
      return `{ ${property}: ${value} }`;
    }

    createKey(leftOffset, layer) {
      return `event-${layer}${leftOffset}`.replace(/\./g, '-');
    }

    addGridStyleToHead(key, css) {
      // TODO: make .grid a constant
      this.styleBlock.innerHTML += `.grid #${key} ${css}\n`;
    }
  }

  // TODO: doesn't seem very vuey, but can't think of a way
  // to easily pass store to helper methods.
  const layerClass = new Layer();

  export default {
    store,
    props: ['layer', 'element'],
    init: () => {
      layerClass.styleBlock = document.getElementById('grid-css');
    },
    vuex: {
      getters: {
        sequence: store => layerClass.createLayersFromEvents(store.sequence),
        initEventCSS: store => layerClass.getInitEventCSS(store.sequence)
      },
      actions: {
        addEvent: ({ dispatch }, event, layer) => {
          if (!event.target.classList.contains('event')) {
            let leftOffset = event.pageX / window.innerWidth,
                newEvent = layerClass.createEvent(leftOffset, layer),
                left = layerClass.createPosition(newEvent.time),
                css = layerClass.createCSS('left', left);

            // Add the prepped event object.
            dispatch('ADD_EVENT', newEvent);

            // Make new event active.
            dispatch('SET_ACTIVE_STYLE', newEvent.key);

            // Add new event css to head.
            layerClass.addGridStyleToHead(newEvent.key, css);
          }
        }
      }
    },
    components: {
      Event
    }
  }
</script>