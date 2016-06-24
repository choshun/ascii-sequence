<template>
  <section class="scheduler">
    Scheduler!!! :D
    {{ schedule }}
  </section>
</template>

<script>
  import store from '../vuex/store';
  import Css from '../destinations/css.js';
  import { clone, cloneDeep, findIndex, slice, forEach } from 'lodash';

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
      this.lookahead = 200;

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

      this.newMeasure = false;
      this.checkNewMeasure = false;

      this.oldContextTime = 0;
      this.fire = true;

      this.effectiveTime = 0;
    }

    /**
     * Scheduler for sequence of events. Fires a destination
     * based on event time in store "events".
     * It's a scheduler, so there's a lookahead and all that other good stuff:
     * http://www.html5rocks.com/en/tutorials/audio/scheduling/
     */

    // TODO: SO something happens after I play/pause after last event, that fixes the wobbly if I pause play super quick. Maybe on each event fire do that so it eventually fixes itself
    // TODO: when I change time make it so the time indicator doesn't change, might shed light on how it fixes itself only on new measure.

    schedule(sequence, transport) {
      if (transport.playing) {

        // !TODO: Prolly mentioned this before, but this shouldn't care about pause/pause time either. 
        // !TODO: Anywhere "SUBLOOP" is found should again be obfustated by a getter. I really shouldn't care if it's a sub loop, whole loop, whole song etc.
        // !TODO: Put as little as possible in the schedule poll. Hopefully refactor of effective to just be the value will help.
        this.effectiveTime = (transport.context.currentTime - transport.paused);

        // SUBLOOP: start
        let nextEvent = sequence[this.index],
            eventTime = nextEvent.time * transport.time,
            // SUBLOOP: this.oldContextTime vs newEvent, needs to mod at 2.5 (5 * .5) to fire this.newMeasure = true
            contextTime = (this.effectiveTime % transport.effectiveTransportTime);

        // console.log('duration?', transport.effectiveTransportTime);

        // This will fire after mod happens, so I know it's a new measure. When I pause old time falls out of sync, so I subtract paused to match effective time.
        if (!transport.playing) {
          this.oldContextTime -= transport.paused;
        }
        
        if (this.checkNewMeasure && contextTime < (this.oldContextTime)) {
          // Set add measure time after mod 0;
          this.newMeasure = true;
          this.fire = true;
        }

        console.log('fire!', eventTime + this.measureTime, transport.context.currentTime +
        this.scheduleAheadTime);

        // SUBLOOP
        // if (this.newMeasure) {
        //   this.measureTime = (((Math.floor(((transport.context.currentTime) +
        //       this.scheduleAheadTime) / transport.effectiveTransportTime)) * transport.effectiveTransportTime));

        //   // console.log('NEW!!!!!', this.measureTime);
        // }

        // See article above.
        // TODO: document this better
        // If event time plus elapsed time, plus paused time mod time (to keep measure elapsed time matched with context time - might be fixed using effective time somehow?), is less than the current time with a look ahead.
        if (this.fire && (eventTime + this.measureTime + ((transport.paused % transport.time))) < ((transport.context.currentTime +
          this.scheduleAheadTime))) {

          let length = sequence.length;

          // Fires event callback.
          this.destination[nextEvent.callback](nextEvent, reset);

          // SUBLOOP: only one event after .5, so last is second to last event
          this.index = ((this.index + 1) % length);
          let reset = ((this.index - 1) === length);

          // At last event in loop, stop firing events, and check when mod currentTime mods to zero.
          if (this.index === 0) {
            this.checkNewMeasure = true;
            this.fire = false;
          }

          // If we're at a new currentTime mod zero, add to measure time.
          // Take currentTime divided by measure time and floor it to get number of measures. Ie time floor(23(s) / 5) = 4 elapsed measures, * 5 to get 20s to add at start of a loop to keep loop events with context.currentTime.

          // SUBLOOP
          if (this.newMeasure) {
            this.measureTime = (((Math.floor(((transport.context.currentTime) +
                this.scheduleAheadTime) / transport.effectiveTransportTime)) * transport.effectiveTransportTime));

            // console.log('NEW!!!!!', this.measureTime);
            this.newMeasure = false;
            this.checkNewMeasure = false;
          }
        }

        // SUBLOOP
        this.oldContextTime = transport.context.currentTime % transport.effectiveTransportTime;

        // Never not polling.
        window.setTimeout(() => {
          this.schedule(sequence, transport);
        }, this.lookahead);
      }
    }

    getsequenceLength(sequence, duration) {
      return _.findIndex(sequence, (sequence) => {
        return sequence.time >= duration;
      });
    }

    getsequenceStart(sequence, start) {
      return _.findIndex(sequence, (sequence) => {
        // console.log(sequence.time, '>', start, sequence.time > start);
        return sequence.time >= start;
      });
    }

    offsetEventStarts(sequence, start) {
      // console.log('before offset?', sequence, start);

      let offsetSequence = [];
      _.forEach(_.cloneDeep(sequence), (event) => {
        // console.log('time before', event.time);
        event.time -= start;
        // console.log('time after', event.time);
        offsetSequence.push(event);
      });

      // console.log('offset?', offsetSequence);
      return offsetSequence;
    }
  }

  // TODO: maybe put constructor in data
  const schedulerClass = new Scheduler();

  export default {
    store,
    vuex: {
      getters: {
        test: store => {
          return store.transport.time;
        },
        // TODO: schedule should return truncated version, ie if start and duration are 0.1 and 0.5, only return event between with changed event times

        // rules, 
        // sequence is only the filtered by duration sequence
        // sequence event times are augmented by start
        // context.currentTime is never fucked with
        // only transport computed times, ie time = efectiveTime, 
        // measureTime, is realTime and accounts for %, transport.pause etc

        // For whatever reason using lodash made store.sequence sync horribly when I used _.sort
        schedule: store => {
          let transport = store.transport,
              sequence = _.cloneDeep(store.sequence);



          // Prep transport.
          let effectiveTransport = transport;
          effectiveTransport.effectiveTransportTime = (transport.time * transport.duration);

          // Prep sequence.
          let sortedSequence = sequence.sort((a, b) => {
            return a.time - b.time;
          });

          // Need sequence to be sorted to get correct index of first and last.
          let checkLastIndex = schedulerClass.getsequenceLength(sequence, (transport.duration + transport.start));
          // console.log('last index', checkLastIndex);

          let lastIndex = (checkLastIndex !== -1) ? checkLastIndex : sequence.length;

          let firstIndex = schedulerClass.getsequenceStart(sequence, (transport.start));
          // console.log('first?', firstIndex);

          // console.log('sortedSequence');
          // console.table(sortedSequence);

          let slicedSequence = _.slice(sortedSequence, firstIndex, lastIndex);
          // console.log('slicedSequence');
          // console.table(slicedSequence);

          let offsetSequence = schedulerClass.offsetEventStarts(slicedSequence, transport.start);
          // console.log('offsetSequence');
          // console.table(offsetSequence);


          // console.log(sequence, effectiveSequence);

          // console.log('last index time?', lastIndex, 'passed time', (transport.duration + transport.start));

          // console.log('first index time?', firstIndex, 'passed time', (transport.start));

          schedulerClass.schedule(offsetSequence, transport);
        }
        // TODO:, make pauseTime a contructor and do adding pause time logic in getter

    
      }
    },

    init: () => {
      // console.log('init', store.dispatch);

      // store.watch('sequence', () => {
      //   console.log('watch');
      // });
    },

    created: () => {
      // https://github.com/vuejs/vuex/blob/master/examples/shopping-cart/components/ProductList.vue
      // if "this" worked I'd be so happy

      console.log('this?!?!?', this);
    },

    methods: {

      // schedule: (sequence, transport) => {
      //   console.log('sequence?', sequence, transport.context.currentTime);

      //   console.log('access to schedule?', this);
      // }
    }
  }
</script>