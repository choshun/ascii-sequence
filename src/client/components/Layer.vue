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
    <span class="element">{{ element }}</span>

    <ul>
      <event v-for="event in layers[layer]" track-by="$index" :event="event" ></event>
    </ul>
  </li>
</template>

<script>
  import store from '../vuex/store';
  import Event from './Event.vue';
  import { clone, uniq, map, each, filter } from 'lodash';

  export default {
    store,
    data () {
      return {
        styleBlock: undefined
      }
    },
    props: ['layer', 'element'],
    vuex: {
      getters: {
        sequence: store => store.sequence,
        layers: store => {
          let eventsObject = _.clone(store.sequence),
            uniqueLayers = _.uniq(_.map(eventsObject, 'layer')),
            layersAndEvents = [];

          // Creates new object of Layers with events for ui.
          _.each(uniqueLayers, (item, index) => {
            layersAndEvents.push(_.filter(eventsObject, { layer: index }));
          });

          return layersAndEvents;
        }
      },
      actions: {
        addEventAction: ({ dispatch }, newEvent) => {
          dispatch('ADD_EVENT', newEvent);
          dispatch('SET_SELECTED_EVENTS', [newEvent]);
          // Make new event active.
          dispatch('SET_ACTIVE_STYLE', newEvent.key);
        }
      }
    },
    methods: {
      addEvent (event, layer) {
        if (!event.target.classList.contains('event')) {
          let leftOffset = event.pageX / window.innerWidth,
              newEvent = this.createEvent(leftOffset, layer),
              left = this.createPosition(newEvent.time),
              css = this.createCSS('left', left);

          this.addEventAction(newEvent);

          this.addGridStyleToHead(newEvent.key, css);
        }
      },
      createEvent (leftOffset, layer) {
        return {
          'layer': layer,
          'time': leftOffset,
          'callback': 'addStyle',
          'class': `.layer-${layer}`,
          'data': 'new data: of css;\nleft: 50px',
          'key': this.createKey(leftOffset, layer),
          'selected': true
        };
      },
      createPosition (time) {
        return time * 100 + '%';
      },
      createCSS(property, value) {
        return `{ ${property}: ${value} }`;
      },
      createKey (leftOffset, layer) {
        return `event-${layer}${leftOffset}`.replace(/\./g, '-');
      },
      getInitEventCSS (events) {
        _.each(events, (item, index) => {
          let left = this.createPosition(item.time),
              key = item.key,
              css = this.createCSS('left', left);

          this.addGridStyleToHead(key, css);
        });
      },

      addGridStyleToHead(key, css) {
        // TODO: make .grid a constant
        this.styleBlock.innerHTML += `.grid #${key} ${css}\n`;
      }
    },
    ready () {
      this.styleBlock = document.getElementById('grid-css');
      this.getInitEventCSS(this.sequence);
    },
    components: {
      Event
    }
  }
</script>