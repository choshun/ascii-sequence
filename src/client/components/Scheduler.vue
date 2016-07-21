<script>
  import store from '../vuex/store';
  import Css from '../destinations/css.js';
  import ContextUtils from '../utils/context-utils.js';
  import { clone, cloneDeep, findIndex, slice, forEach } from 'lodash';

  // TODO: Put in vue component.
  const contextUtils = new ContextUtils();

  export default {
    store,
    data () {
      return {

        /**
         * Destination callback.
         * @type {Function}
         */
        destination: () => new Css(),

        /**
         * Amount to poll for changes in store.sequence (in ms).
         * @type {Number}
         */
        lookahead: 30,

        /**
         * Amount to look ahead from currentTime 
         * (in percentage of 1 - the total sequence time).
         * @type {Number}
         */
        scheduleAheadTime: 0.01,

        /**
         * Current event scheduled.
         * @type {Number}
         */
        index: 0,

        /**
         * Length of scheduled sequence.
         * @type {Number}
         */
        length: 0,

        /**
         * Flag so the same event isn't fired twice in a row.
         * @type {Number}
         */
        firedEventTime: 0,

        /**
         * Reference to the scheduler timeout, so we can
         * make sure it's cleared if it's reinstantiated by mistake.
         * @type {Function}
         */
        scheduleTimeout: undefined
      }
    },
    vuex: {
      getters: {

        /**
         * Ordered sequence from store.
         * @type {Array}
         */
        sequence: store => {
          return _.cloneDeep(store.sequence.sort((a, b) => {
            return a.time - b.time;
          }));
        },

        /**
         * Transport from store.
         * @type {Object}
         */
        transport: store => store.transport
      }
    },
    methods: {

      /**
       * Schedules events and fires the destination callback.
       */
      schedule () {
        if (this.transport.playing) {
          let time = contextUtils.getTranslatedContext(this.transport);

          this.index = this.getNextIndex(this.sequence, this.transport, time);

          if (this.index !== -1) {
            let nextEvent = this.sequence[this.index];
            let eventTime = nextEvent.time;

            // The infamous article explaining the following:
            // http://www.html5rocks.com/en/tutorials/audio/scheduling/
            if (eventTime !== this.firedEventTime && eventTime < time + this.scheduleAheadTime) {
              this.length = this.sequence.length;

              let reset = (this.index === this.length);
              // Fires event callback.
              this.destination()[nextEvent.callback](nextEvent, reset);

              this.firedEventTime = eventTime;
            }
          }
        }

        this.cycle();
      },

      /**
       * Never not polling.
       */
      cycle () {
        if (this.scheduleTimeout) {
          clearTimeout(this.scheduleTimeout);
        }

        this.scheduleTimeout = window.setTimeout(() => {
          this.schedule();
        }, this.lookahead);
      },

      /**
       * Finds the next event based on transport time.
       * @param {Array} sequence Sequence shared in store.
       * @param {Object} transport Transport object in store.
       * @param {Number} time Current time.
       * @return {Number} Index of next event. 
       */
      getNextIndex (sequence, transport, time) {
        return _.findIndex(sequence, (event) => {
          return event.time + this.scheduleAheadTime > time;
        });
      }
    },
    ready () {
      // Kick off the polling.
      this.schedule(); 
    }
  }
</script>