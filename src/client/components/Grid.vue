<style scoped lang="sass">
	.grid {
    overflow: visible;
		position: relative;
    margin-bottom: 2em;
	}

  .layers {
    margin-top: 1em;
  }

  .time-indicator {
    background-color: blue;
    height: 110%;
    opacity: .5;
    margin-bottom: 2em;
    position: absolute;
    margin-top: -1em;
    width: 100%;
  }
</style>

<template>
  <section class="grid" id="grid">
    <canvas id="time-indicator" @mousedown="updateTimeIndicator($event)" @mousemove="updateTimeIndicator($event)" @mouseup="updateTimeIndicator($event)" class="time-indicator">{{ upDateTime }}</canvas>

    <ul class="layers">
      <layer @mousemove="updateTimeIndicator($event)" @mouseup="updateTimeIndicator($event)" v-for="layer in layers" :layer="$index" :element="layer.element"></layer>
    </ul>
  </section>
  asdads
<button @click="clearLoop()">CLEAR LOOP</button>
asdads
</template>

<script>
  import store from '../vuex/store';
  import Layer from './Layer.vue';
  import ContextUtils from '../utils/context-utils.js';

  const contextUtils = new ContextUtils();

  class TimeIndicator {
    constructor() {
      this.context;
      this.canvas;
      this.width;
      this.height;
      this.positionPercent = 0;
      this.oldPositionPercent = 0;
      this.position = 0;
      this.eventStart = 0;
    }

    init(transport) {
      // this is gay
      setTimeout(() => {
        this.canvas = document.getElementById('time-indicator');
        this.context = this.canvas.getContext('2d');
        this.width = this.canvas.clientWidth;
        this.height = this.canvas.clientHeight;
        this.canvas.setAttribute('width', this.width);
        this.canvas.setAttribute('height', this.height);
        this.draw(transport);
      }, 0);
    }

    draw(transport) {
      let time = transport.context.currentTime;
      this.context.clearRect(0, 0, this.width, this.height);

      this.drawSubLoop(transport);
      this.drawIndicator(transport);

      // Draw next frame
      requestAnimationFrame(() => this.draw(transport));
    }

    drawSubLoop(transport) {
      this.context.beginPath();
      this.context.rect(parseFloat(transport.start) * this.width, 0,  parseFloat(transport.duration) * this.width, this.height);
      this.context.fillStyle = 'green';
      this.context.fill();
    }

    drawIndicator(transport) {
      this.position = contextUtils.getTranslatedContext(transport, this.width);

      this.context.beginPath();
      this.context.rect(this.position, 0, 2, this.height);
      this.context.fillStyle = 'red';
      this.context.fill();
    }
  }

  var timeIndicatorClass = new TimeIndicator();

  export default {
    store,
    vuex: {
      getters: {
        layers: store => store.layers,
        // this and scheduler seem weird to me
        // maybe a directive?
        // https://vuejs.org/guide/custom-directive.html
        // the main deal is if the directive is bound to fire when context.currentTime changes,
        // I could see it firing waaaay too much,
        // when this way checks the transport value when it can
        upDateTime: store => timeIndicatorClass.init(store.transport),
      },
      actions: {
        updateTimeIndicator: ({ dispatch, state }, event) => {
          let start = 0,
              duration = 0,
              canvas = event.target,
              width = canvas.clientWidth;

          const EDITING_CLASS = '_editing';

          if (event.type === 'mousedown') {
            timeIndicatorClass.eventStart = event.clientX / width;
            event.target.parentNode.classList.add(EDITING_CLASS);
          }


          if (event.type === 'mousemove' && event.target.parentNode.classList.contains(EDITING_CLASS) || event.target.parentNode.parentNode.classList.contains(EDITING_CLASS)) {
            duration = event.clientX / width - timeIndicatorClass.eventStart;

            if (duration > 0.05) {
              dispatch('UPDATE_DURATION', duration);
              dispatch('UPDATE_START', timeIndicatorClass.eventStart);
            }
          }

          if (event.type === 'mouseup') {
            event.target.parentNode.classList.remove(EDITING_CLASS);
            event.target.parentNode.parentNode.classList.remove(EDITING_CLASS);

            if (timeIndicatorClass.eventStart - event.clientX < 0.01) {
              if (event.clientX / width > state.transport.start && event.clientX / width < state.transport.start + state.transport.duration) {
                dispatch('UPDATE_TIME_OFFSET', (event.clientX / width) - contextUtils.getTranslatedContext(state.transport));
              }
            }
          }
        },
        clearLoop: ({ dispatch }) => {
          dispatch('UPDATE_START', 0);
          dispatch('UPDATE_DURATION', 1);
        }
      }
    },
    components: {
      Layer
    }
  }
</script>