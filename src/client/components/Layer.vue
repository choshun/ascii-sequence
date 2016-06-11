<style scoped lang="sass">
	.layer {
    border-bottom: 1px solid #000;
    background-color: rgba(193, 66, 66, .3);
    height: 4em;
    opacity: .7;
    position: relative;
  }
</style>

<template>
  <li class="layer">
    <ul>
      {{ layerCSS }}
      <event v-for="event in sequence[layer]" track-by="$index" :event="event" ></event>
    </ul>
  </li>
</template>

<script>
  import store from '../vuex/store';
  import Event from './Event.vue';
  import { getEventsByLayer } from '../vuex/getters';
  import { clone, uniq, map, each, filter } from 'lodash';

  class Layer {
    // TODO: put in getter
    createLayersFromEvents(sequence) {
      let eventsObject = _.clone(sequence),
      uniqueLayers = _.uniq(_.map(eventsObject, 'layer')),
      layersAndEvents = [];

      // Creates new object of Layers with events for ui.
      _.each(uniqueLayers, (item, index) => {
        layersAndEvents.push(_.filter(eventsObject, {layer: index}));
      });

      return layersAndEvents;
    }
  }

  var layer = new Layer();

  export default {
    store,
    props: ['layer', 'sequence'],
    vuex: {
      getters: {
        sequence: store => {
          return layer.createLayersFromEvents(store.sequence);
        }
      }
    },
    components: {
      Event
    }
  }
</script>