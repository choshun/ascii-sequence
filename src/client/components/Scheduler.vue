<template>
  <section class="scheduler">
    Scheduler!!! :D
    {{ schedule }}
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
            if (this.index !== -1) {
              this.destination[nextEvent.callback](nextEvent, reset);

              this.firedEventTime = eventTime;
            }
          }
        }

        window.setTimeout(() => {
          this.schedule(sequence, transport);
        }, this.lookahead);
      }
    }

    getNextIndex(sequence, transport, time) {
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

        // For whatever reason using lodash made store.sequence sync horribly when I used _.sort
        schedule: store => {
          let transport = store.transport,
              sequence = _.cloneDeep(store.sequence);

          // Prep sequence.
          let sortedSequence = sequence.sort((a, b) => {
            return a.time - b.time;
          });

          schedulerClass.schedule(sortedSequence, transport);
        }
      }
    },

    created: () => {
      // https://github.com/vuejs/vuex/blob/master/examples/shopping-cart/components/ProductList.vue
      // if "this" worked I'd be so happy

      console.log('this?!?!?');
    }
  }
</script>