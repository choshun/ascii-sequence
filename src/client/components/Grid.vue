<style scoped lang="sass">
	/*.grid,
  .time-indicator {
    left: 10%;
    width: 90%;
  }*/

  .grid {
    bottom: 1em;
    overflow: visible;
		position: fixed;
    z-index: 2;
	}

  .time-indicator {
    bottom: 0;
    height: 22em;
    position: fixed;
    margin-top: -20px;
    width: 100%;
  }

  .is-selecting {
    width: 1px;
  }

  #selector.is-selecting {
    border: 1px solid #00ff9f;
    background-color: rgba(0, 255, 159, 0.2);
    position: fixed;
    z-index: -1;


  }
</style>

<template>
  <section class="grid">
    <canvas id="time-indicator" @mousedown="updateStart($event)" @mousemove="updateDuration($event)" @mouseup="updateTimeOffset($event), resetLoop($event)" class="time-indicator"></canvas>

    <section id="selector"></section>
    <ul class="layers" @mousedown="startSelector($event)", @mousemove="moveSelector($event)" @mouseup="moveSelect($event)">
      <layer v-for="layer in layers" :layer="$index" :element="layer.element" :layer-with-events="layersWithEvents[$index]" id="layer-{{$index}}"></layer>
    </ul>
  </section>
</template>

<script>
  import store from '../vuex/store';
  import Layer from './Layer.vue';
  import ContextUtils from '../utils/context-utils.js';
  import { clone, uniq, map, each, filter } from 'lodash';

  // TODO: make into component.
  const contextUtils = new ContextUtils();

  export default {
    store,
    data () {
      return {
        context: undefined,
        canvas: undefined,
        width: undefined,
        height: undefined,
        positionPercent: 0,
        position: 0,
        loopStart: 0,
        selectorStartX: 0,
        selectorStartY: 0,
        selectorEndX: 0,
        selectorEndY: 0,
        selectedLayerStart: 0,
        selectedLayerEnd: 0,
        styleBlock: undefined,
        selector: undefined,
        EDITING_CLASS: '_editing',
        IS_SELECTING_CLASS: 'is-selecting'
      }
    },
    vuex: {
      getters: {
        layers: store => store.layers,
        sequence: store => store.sequence,
        transport: store => store.transport,
        layersWithEvents: store => {
          let eventsObject = _.clone(store.sequence),
            uniqueLayers = _.uniq(_.map(eventsObject, 'layer')),
            layersWithEvents = [];

          // Creates new object of Layers with events for ui.
          _.each(uniqueLayers, (item, index) => {
            layersWithEvents.push(_.filter(eventsObject, { layer: index }));
          });

          return layersWithEvents;
        }
      },
      actions: {
        updateTimeIndicator: ({ dispatch }, loopStart, duration) => {
          dispatch('UPDATE_START', loopStart);
          dispatch('UPDATE_DURATION', duration);
        },
        updateTimeOffsetAction: ({dispatch}, offset) => {
          dispatch('UPDATE_TIME_OFFSET', offset);
        },
        resetLoopAction: ({ dispatch }) => {
          dispatch('UPDATE_START', 0);
          dispatch('UPDATE_DURATION', 1);
        },
        selectEvents: ({ dispatch }, events) => {
          dispatch('CLEAR_SELECTED_EVENTS', events);
          dispatch('SET_SELECTED_EVENTS', events);
        }
      }
    },
    methods: {
      updateStart (event) {
        this.loopStart = this.getClientXPercent(event);
        event.target.classList.add(this.EDITING_CLASS);
      },
      updateDuration (event) {
        if (event.target.classList.contains(this.EDITING_CLASS)) {
          let duration = this.getClientXPercent(event) - this.loopStart;

          if (duration > 0.05) {
            this.updateTimeIndicator(this.loopStart, duration);
          }
        }
      },
      updateTimeOffset (event) {
        event.target.classList.remove(this.EDITING_CLASS);

        if (this.loopStart - event.clientX < 0.01) {
          if (this.transport.context) {
            let offset = this.getClientXPercent(event) - contextUtils.getTranslatedContext(this.transport);
            this.updateTimeOffsetAction(offset);
          }
        }
      },
      resetLoop (event) {
        let width = this.width,
            clientX = this.getClientXPercent(event);

        if (event.target.classList.contains('time-indicator') && (clientX < this.transport.start || clientX > this.transport.start + this.transport.duration)) {
          this.resetLoopAction();
        }
      },
      startSelector (event) {
        this.selectorStartX = event.clientX;
        this.selectorStartY = event.clientY;
        this.selectedLayerStart = this.getEventLayer(event);

        this.startLayer = event.target;
        this.styleBlock.innerHTML = 
            `#selector { 
              left: ${this.selectorStartX}px;
              top: ${this.selectorStartY}px 
            }`;
        console.log(this.selectedLayerStart);
        this.selector.classList.add(this.IS_SELECTING_CLASS);
      },
      moveSelector (event) {
        let width = event.clientX - this.selectorStartX,
            height = event.clientY - this.selectorStartY;

        this.styleBlock.innerHTML += 
            `#selector.is-selecting { 
              width: ${width}px;
              height: ${height}px
            }`;

      },
      moveSelect (event) {
        this.selectedLayerEnd = this.getEventLayer(event);
        this.selectorEndX = event.clientX;
        this.selectorEndY = event.clientY;

        let thresholdX = this.selectorEndX / this.width - this.selectorStartX / this.width;

        this.getSelectedEvents(thresholdX);
        this.selector.classList.remove(this.IS_SELECTING_CLASS);
      },
      getClientXPercent (event) {
        return event.clientX / this.width;
      },
      getEventLayer (event) {
        return event.target.getAttribute('id').split('-')[1];
      },
      getSelectedEvents (thresholdX) {
        let selectedEvents = [];

        _.each(this.layersWithEvents, (layer, index) => {
          if (index >= this.selectedLayerStart && index <= this.selectedLayerEnd) {
            _.each(layer, (event, index) => {
              if (event.time >= this.selectorStartX / this.width && event.time <= this.selectorEndX / this.width) {
                selectedEvents.push(event.key);
              }
            });

            if ((this.selectorEndX - this.selectorStartX) > 25) {
              this.selectEvents(selectedEvents);
            }
          }
        });
      },
      draw (transport) {
        let time = transport.context.currentTime;
        this.context.clearRect(0, 0, this.width, this.height);

        this.drawSubLoop(transport);
        this.drawIndicator(transport);
        this.drawLoopManipulator();

        // Draw next frame
        requestAnimationFrame(() => this.draw(transport));
      },
      drawSubLoop (transport) {
        let gradient = this.context.createLinearGradient(50, 0, 50, this.height);
        let topOffset = 0;

        // Gradient;
        gradient.addColorStop(0.3, 'transparent'); 
        gradient.addColorStop(1, '#8ED6FF'); 
        this.context.globalAlpha = 0.15;
        this.context.beginPath();
        this.context.rect(parseFloat(transport.start) * this.width, 0,  parseFloat(transport.duration) * this.width, this.height);

        this.context.fillStyle = gradient;
        this.context.fill();

        // Left line.
        this.context.beginPath();
        this.context.globalAlpha = 1;
        this.context.rect(transport.start * this.width, topOffset, 1, this.height);
        this.context.fillStyle = '#653737';
        this.context.fill();

        // Right line.
        this.context.beginPath();
        this.context.globalAlpha = 1;
        this.context.rect((transport.start + transport.duration) * this.width, topOffset, 1, this.height);
        this.context.fillStyle = '#653737';
        this.context.fill();
      },
      drawIndicator (transport) {
        let gradient = this.context.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.5, '#8ED6FF');
        gradient.addColorStop(1, '#8ED6FF');

        this.position = contextUtils.getTranslatedContext(transport, this.width);

        this.context.globalAlpha = 0.8;
        this.context.beginPath();
        
        this.context.rect(this.position, -16, 2, this.height);
        this.context.fillStyle = gradient;
        
        this.context.fill();
      },
      drawLoopManipulator (transport) {
        // Commented out for now. Region where youcan move indicator/make loops.
        let height = 1000;
        let gradient = this.context.createLinearGradient(0, 0, 0, height);

        gradient.addColorStop(0, '#0AD6FF');
        gradient.addColorStop(1, 'transparent');

        this.context.save();
        this.context.globalAlpha = 0.05;
        this.context.fillStyle = gradient;
        this.context.fillRect(0, 0, this.width, height);
        this.context.restore();
        this.context.fill();
      }
    },
    ready () {
      this.canvas = document.getElementById('time-indicator');
      this.context = this.canvas.getContext('2d');
      this.width = this.canvas.clientWidth;
      this.height = this.canvas.clientHeight;
      this.canvas.setAttribute('width', this.width);
      this.canvas.setAttribute('height', this.height);
      this.draw(this.transport);
      this.styleBlock = document.getElementById('selector-css');
      this.selector = document.getElementById('selector');
    },
    components: {
      Layer
    }
  }
</script>