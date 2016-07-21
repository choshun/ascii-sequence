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
</style>

<template>
  <section class="grid">
    <canvas id="time-indicator" @mousedown="updateStart($event)" @mousemove="updateDuration($event)" @mouseup="updateTimeOffset($event), resetLoop($event)" class="time-indicator"></canvas>

    <ul class="layers">
      <layer v-for="layer in layers" :layer="$index" :element="layer.element"></layer>
    </ul>
  </section>
</template>

<script>
  import store from '../vuex/store';
  import Layer from './Layer.vue';
  import ContextUtils from '../utils/context-utils.js';

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
        EDITING_CLASS: '_editing'
      }
    },
    vuex: {
      getters: {
        layers: store => store.layers,
        transport: store => store.transport
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
        }
      }
    },
    methods: {
      updateStart (event) {
        this.loopStart = event.clientX / this.width;
        event.target.classList.add(this.EDITING_CLASS);
      },
      updateDuration (event) {
        if (event.target.classList.contains(this.EDITING_CLASS)) {
          let duration = event.clientX / this.width - this.loopStart;

          if (duration > 0.05) {
            this.updateTimeIndicator(this.loopStart, duration);
          }
        }
      },
      updateTimeOffset (event) {
        event.target.classList.remove(this.EDITING_CLASS);

        if (this.loopStart - event.clientX < 0.01) {
          if (this.transport.context) {
            let offset = event.clientX / this.width - contextUtils.getTranslatedContext(this.transport);
            this.updateTimeOffsetAction(offset);
          }
        }
      },
      resetLoop (event) {
        let width = this.width,
            clientX = event.clientX / width;

        if (event.target.classList.contains('time-indicator') && (clientX < this.transport.start || clientX > this.transport.start + this.transport.duration)) {
          this.resetLoopAction();
        }
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
    },
    ready () {
      this.canvas = document.getElementById('time-indicator');
      this.context = this.canvas.getContext('2d');
      this.width = this.canvas.clientWidth;
      this.height = this.canvas.clientHeight;
      this.canvas.setAttribute('width', this.width);
      this.canvas.setAttribute('height', this.height);
      this.draw(this.transport);
    },
    components: {
      Layer
    }
  }
</script>