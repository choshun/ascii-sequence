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
       * @type {Number} in ms
       */
      this.lookahead = 50;

      /**
       * Time to look ahead in sequence to schedule.
       * @type {Number} in sec (audio context is in seconds)
       */
      this.scheduleAheadTime = 0.05;

      /**
       * Index of scheduled events.
       * @type {Number}
       */
      this.index = 0;

      this.newMeasure = false;
      this.checkNewMeasure = false;

      this.oldContextTime = 0;
      this.fire = true;
      this.measureTime = 0;
      this.length = 0;
      this.oldLength = 0;
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

      let nextEvent = sequence[this.index];

      if (transport.playing && nextEvent) {
        // !TODO: Put as little as possible in the schedule poll. Hopefully refactor of effective to just be the value will help.

        // console.log('from scheduler');
        // console.table(sequence);

        // SUBLOOP: start
        let eventTime = nextEvent.time * transport.time,
            contextTime = transport.context.currentTime % transport.effectiveTransportTime;

        
        if (this.checkNewMeasure && contextTime < this.oldContextTime) {
          // Set add measure time after mod 0;
          this.newMeasure = true;
          this.fire = true;
        }

        // console.log(eventTime + this.measureTime, transport.context.currentTime +
        // this.scheduleAheadTime);



        // See article above.
        // TODO: document this better
        // If event time plus elapsed time, plus paused time mod time (to keep measure elapsed time matched with context time - might be fixed using effective time somehow?), is less than the current time with a look ahead.
        if (this.fire && (eventTime + this.measureTime) < (transport.context.currentTime +
          this.scheduleAheadTime)) {

          this.length = sequence.length;
          let reset = (this.index === this.length);
          // Fires event callback.
          this.destination[nextEvent.callback](nextEvent, reset);

          // this.index = _.findIndex(sequence, (sequence) => {
          //   return sequence.time >= duration;
          // });

          // If length changes cause of subloop, find nextEvent index via value,
          // and reset it. If I don't do this, % index wanders when I make
          // the loop bigger or smaller adding or removing sequence items.

          // let delta = Math.abs(eventTime + this.measureTime) - (transport.context.currentTime + this.scheduleAheadTime);
          


          // need to find index based on current time
          // TODO: put in method.
          let checkNextIndex = (_.findIndex(sequence, (event) => {
              
          // console.log('check index', event.time * transport.effectiveTransportTime, '>', transport.context.currentTime % transport.effectiveTransportTime);


            return (event.time * transport.time) > (transport.context.currentTime % transport.effectiveTransportTime);
          }));

          this.index = (checkNextIndex !== -1) ? checkNextIndex : 0;

          // console.log('index', this.index);

          // if (this.length !== this.oldLength) {
          //   this.index = _.findIndex(sequence, (event) => {
          //     return event.time === nextEvent.time;
          //   }) + 1;
          // } else {
          //   this.index = ((this.index + 1) % this.length);  
          // }

          // At last event in loop, stop firing events, and check when mod currentTime mods to zero.
          // TODO: this doesn't work if first event
          // isn't at 0.
          if (this.index === 0) {
            this.checkNewMeasure = true;
            this.fire = false;
          }

          // SUBLOOP
          if (this.newMeasure) {
            this.measureTime += transport.effectiveTransportTime;

            console.log('NEW!!!!!', this.measureTime, transport.context.currentTime);
            this.newMeasure = false;
            this.checkNewMeasure = false;
          }
        }

        // SUBLOOP
        this.oldContextTime = contextTime;

        this.oldLength = this.length;

        // Never not polling.
        window.setTimeout(() => {
          this.schedule(sequence, transport);
        }, this.lookahead);
      }
    }

    getNextIndex(sequence, transport) {
      // let index = _.findIndex(sequence, (event) => {
      //   return (event.time * transport.time) > ((transport.context.currentTime - transport.start) % transport.effectiveTransportTime);
      // });
      let time = contextUtils.getTranslatedContext(transport);
      
      console.log('position ratio', time);

      let index = _.findIndex(sequence, (event) => {
        return event.time > time;
      });

      index = (index !== -1) ? index : 0;

      console.log('next!', sequence[index].time);

      console.log(index, sequence[index].time);

      return (index !== -1) ? index : 0;
    }

    getsequenceLength(sequence, duration) {
      return _.findIndex(sequence, (event) => {
        return event.time >= duration;
      });
    }

    getsequenceStart(sequence, start) {
      return _.findIndex(sequence, (event) => {
        // console.log(sequence.time, '>', start, sequence.time > start);
        return event.time >= start;
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

        // For whatever reason using lodash made store.sequence sync horribly when I used _.sort
        schedule: store => {
          let transport = store.transport,
              sequence = _.cloneDeep(store.sequence);

          // Prep transport.
          let effectiveTransport = transport;
          transport.effectiveTransportTime = (transport.time * transport.duration);

          // Prep sequence.
          let sortedSequence = sequence.sort((a, b) => {
            return a.time - b.time;
          });

          // Need sequence to be sorted to get correct index of first and last.
          let checkLastIndex = schedulerClass.getsequenceLength(sequence, (transport.duration + transport.start));
          // console.log('last index', checkLastIndex);

          let lastIndex = (checkLastIndex !== -1) ? checkLastIndex : sequence.length;

          let firstIndex = schedulerClass.getsequenceStart(sequence, (transport.start));

          let slicedSequence = _.slice(sortedSequence, firstIndex, lastIndex);

          let offsetSequence = schedulerClass.offsetEventStarts(slicedSequence, transport.start);

          let nextIndex = schedulerClass.getNextIndex(sortedSequence, transport);

          console.log('next index?', nextIndex);

          schedulerClass.schedule(offsetSequence, transport);
        }
      }
    },

    created: () => {
      // https://github.com/vuejs/vuex/blob/master/examples/shopping-cart/components/ProductList.vue
      // if "this" worked I'd be so happy

      console.log('this?!?!?', this);
    }
  }
</script>