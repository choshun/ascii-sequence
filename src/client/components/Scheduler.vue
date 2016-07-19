<template>
  <section class="scheduler">
    {{ getSortedSequence(schedule) }}
  </section>
</template>

<script>
  import store from '../vuex/store';
  import Css from '../destinations/css.js';
  import ContextUtils from '../utils/context-utils.js';
  import { clone, cloneDeep, findIndex, slice, forEach } from 'lodash';

  const contextUtils = new ContextUtils();

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
       * @type {Number} In ms.
       */
      this.lookahead = 30;

      /**
       * Time to look ahead in sequence to schedule.
       * @type {Number} Percent of total sequence.
       */
      this.scheduleAheadTime = 0.01;

      /**
       * Index of scheduled events.
       * @type {Number}
       */
      this.index = 0;

      this.length = 0;

      this.firedEventTime = 0;
    }

    /**
     * Scheduler for sequence of events. Fires a destination
     * based on event time in store "events".
     * It's a scheduler, so there's a lookahead and all that other good stuff:
     * http://www.html5rocks.com/en/tutorials/audio/scheduling/
     */

    schedule(sequence, transport) {
      if (transport.playing) {
        let time = contextUtils.getTranslatedContext(transport);

        this.index = schedulerClass.getNextIndex(sequence, transport, time);

        if (this.index !== -1) {
          let nextEvent = sequence[this.index];
          let eventTime = nextEvent.time;

          if (eventTime !== this.firedEventTime && eventTime < time + this.scheduleAheadTime) {
            this.length = sequence.length;
            let reset = (this.index === this.length);
            // Fires event callback.
            this.destination[nextEvent.callback](nextEvent, reset);

            this.firedEventTime = eventTime;
          }
        }

        if (this.scheduleTimeout) {
          clearTimeout(this.scheduleTimeout);
        }

        this.scheduleTimeout = window.setTimeout(() => {
          this.schedule(sequence, transport);
        }, this.lookahead);
      }
    }

    getNextIndex(sequence, transport, time) {

      // console.log(sequence);
      return _.findIndex(sequence, (event) => {
        return event.time + this.scheduleAheadTime > time;
      });
    }
  }

  // TODO: maybe put constructor in data
  const schedulerClass = new Scheduler();

  export default {
    store,
    vuex: {
      getters: {
        schedule: store => store.schedule
        // For whatever reason using lodash made store.sequence sync horribly when I used _.sort
        // schedule: (store) => {
        //   console.log('fuck', this, store);
        //   schedulerClass.schedule(this.getSortedSequence(_.cloneDeep(store.sequence)), store.transport);
        // }

      }
    },
    methods: {
      getSortedSequence (schedule) {
        console.log('?!?!?!?', this, schedule);
        // return sequence.sort((a, b) => {
        //   return a.time - b.time;
        // });
      },
      test () {
        console.log('tesst');
      }
    }, 
    created () {
      console.log('?', this, this.schedule);
    }
  }
</script>