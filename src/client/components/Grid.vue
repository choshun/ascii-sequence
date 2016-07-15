<style scoped lang="sass">
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
</style>

<template>
  <section class="grid">
    <canvas id="time-indicator" @mousedown="updateTimeIndicator($event)" @mousemove="updateTimeIndicator($event)" @mouseup="updateTimeIndicator($event)"class="time-indicator">{{ upDateTime }}</canvas>

    <ul class="layers">
      <layer v-for="layer in layers" :layer="$index" :element="layer.element"></layer>
    </ul>
  </section>
  <button @click="clearLoop()">clear</button>

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
      this.drawLoopManipulator();

      // Draw next frame
      requestAnimationFrame(() => this.draw(transport));
    }

    drawSubLoop(transport) {
      let gradient = this.context.createLinearGradient(50, 0, 50, this.height);
      let topOffset = 0;

      gradient.addColorStop(0.3, 'transparent'); 
      gradient.addColorStop(1, '#8ED6FF'); 

      this.context.globalAlpha = 0.15;
      this.context.beginPath();
      this.context.rect(parseFloat(transport.start) * this.width, 0,  parseFloat(transport.duration) * this.width, this.height);
      

      this.context.fillStyle = gradient;
      this.context.fill();

      this.context.beginPath();
      this.context.globalAlpha = 1;
      this.context.rect(transport.start * this.width, topOffset, 1, this.height);
      this.context.fillStyle = '#653737';
      this.context.fill();

      this.context.beginPath();
      this.context.globalAlpha = 1;
      this.context.rect((transport.start + transport.duration) * this.width, topOffset, 1, this.height);
      this.context.fillStyle = '#653737';
      this.context.fill();
    }

    drawIndicator(transport) {
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
      // this.context.restore();
    }

    // Commented out for now. Region where youcan move indicator/make loops.
    drawLoopManipulator() {
      let height = 20;
      let gradient = this.context.createLinearGradient(0, 0, 0, height);

      gradient.addColorStop(0, '#8ED6FF');
      gradient.addColorStop(1, 'transparent');

      this.context.save();
      this.context.globalAlpha = 0.5;
      this.context.fillStyle = gradient;
      // this.context.fillRect(0, 0, this.width, height);
      this.context.restore();
      // this.context.fill();
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
            event.target.classList.add(EDITING_CLASS);
          }

          if (event.type === 'mousemove' && event.target.classList.contains(EDITING_CLASS)) {
            duration = event.clientX / width - timeIndicatorClass.eventStart;

            if (duration > 0.05) {
              dispatch('UPDATE_DURATION', duration);
              dispatch('UPDATE_START', timeIndicatorClass.eventStart);
            }
          }

          if (event.type === 'mouseup') {
            event.target.classList.remove(EDITING_CLASS);

            if (timeIndicatorClass.eventStart - event.clientX < 0.01) {
              if (state.transport.context) {
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