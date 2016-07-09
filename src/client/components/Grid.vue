<style scoped lang="sass">
	.grid {
		position: relative;
	}

  .time-indicator {
    background-color: blue;
    opacity: .5;
    position: absolute;
    width: 100%;
  }
</style>

<template>
  <section class="grid">
    <canvas id="time-indicator" class="time-indicator">{{ upDateTime }}</canvas>

    <ul class="layers">
      <layer v-for="layer in layers" :layer="$index" :element="layer.element"></layer>
    </ul>
  </section>
</template>

<script>
  import store from '../vuex/store';
  import Layer from './Layer.vue';

  class TimeIndicator {
    constructor() {
      this.context;
      this.canvas;
      this.width;
      this.height;
      this.positionPercent = 0;
      this.oldPositionPercent = 0;
      this.position = 0;
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

      if (transport.playing) {
        let endMod = this.width / ( 1 / transport.duration),
            startMod = this.width / ( 1 / transport.start),
            delta;

        this.context.clearRect(0, 0, this.width, this.height);
        
        // Percentage of currentTime vs transport measure time.
        this.positionPercent = ((transport.context.currentTime % (transport.time * transport.duration)) / transport.time) * 100;

        // The amount to change per tick.
        delta = (this.positionPercent - this.oldPositionPercent);

        // Don't progress when transport measure time changes.
        // This fixes a wobble. If I don't have this the position
        // will change drastically because the mod in positionPercent changes;
        // the delta will be really big thus making the indicator jump
        // when we just want it to slightly move faster or slower.
        if (Math.abs(delta) < 1) {
          this.position += ((this.width / 100) * delta);
          this.position %= endMod;
        }

        this.oldPositionPercent = this.positionPercent;

        this.context.beginPath();
        this.context.rect(this.position, 0, 2, this.height);
        this.context.fillStyle = 'red';
        this.context.fill();
      }

      // Draw next frame
      requestAnimationFrame(() => this.draw(transport));
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
      }
    },
    components: {
      Layer
    }
  }
</script>