<template>
  <section class="scheduler">
    Scheduler!!! :D
    {{ schedule }}
  </section>
</template>

<script>
  import store from '../vuex/store';
  import Css from '../destinations/css.js';

  /**
   * @class Scheduler
   * A sequencer using audio context for timing.
   */
  class Scheduler {
    /**
     * @constructor Scheduler
     * @param {Object} cube cube object to schedule
     */
    constructor() {
      /**
       * Destination callback class.
       * @type {Class}
       */
      this.destination = new Css();

      /**
       * Interval to try and refire schedule.
       * @type {Number} in ms
       */
      this.lookahead = 30;

      /**
       * Time to look ahead in sequence to schedule.
       * @type {Number} in sec (audio context is in seconds)
       */
      this.scheduleAheadTime = 0.1;

      /**
       * Index of scheduled events.
       * @type {Number}
       */
      this.index = 0;

      /**
       * Loop time.
       * @type {Number}
       */
      this.measureTime = 0;
    }

    /**
     * Scheduler for sequence of events. Fires a destination
     * based on event time in store "events".
     * It's a scheduler, so there's a lookahead and all that other good stuff:
     * http://www.html5rocks.com/en/tutorials/audio/scheduling/
     */
    schedule(sequence, transport) {
      if (transport.playing) {
        let nextEvent = sequence[this.index],
            eventTime = nextEvent.time * transport.time;


        console.log('time', eventTime + this.measureTime);

        // See article above.
        if ((eventTime + this.measureTime + ((transport.paused % transport.time) - transport.time)) < (transport.context.currentTime +
          this.scheduleAheadTime)) {

          let transportTime = parseFloat(transport.time),
              length = sequence.length;

          // console.log('length', length, this.index, sequence[this.index].time);

          this.index = ((this.index + 1) % length);
          let newMeasure = ((this.index - 1) === length);

          // TODO: keep track of where we paused and played

          // Fires event callback.
          this.destination[nextEvent.callback](nextEvent, newMeasure);
          // console.log('fire');

          if (this.index === 0) {
            this.measureTime = (((Math.floor((transport.context.currentTime +
                this.scheduleAheadTime) / transportTime)) * transportTime) + transportTime);
            // console.log('new');
          }
        }

        // Never not polling.
        window.setTimeout(() => {
          this.schedule(sequence, transport);
        }, this.lookahead);
      }
    }
  }

  // TODO: maybe put constructor in data
  const schedulerClass = new Scheduler();

  export default {
    store,
    vuex: {
      getters: {
        // For whatever reason using lodash made store.sequence sync horribly when I used _.sort
        schedule: store => schedulerClass.schedule(store.sequence.sort((a, b) => {
              return a.time - b.time;
            }), store.transport)
      }
    }
  }
</script>