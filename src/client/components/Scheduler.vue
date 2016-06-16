<template>
  <section class="scheduler">
    Scheduler!!! :D
    {{ schedule }}
  </section>
</template>

<script>
  import store from '../vuex/store';
  import Css from '../destinations/css.js';
  import { findIndex } from 'lodash';

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
        // !TODO: effectiveTime, and effectiveTransportTime, should just be in the getter, or store (prolly getter). This scheduler shouldn't care.
        // !TODO: Prolly mentioned this before, but this shouldn't care about pause/pause time either. 
        // !TODO: Anywhere "SUBLOOP" is found should again be obfustated by a getter. I really shouldn't care if it's a sub loop, whole loop, whole song etc.
        // !TODO: Put as little as possible in the schedule poll. Hopefully refactor of effective to just be the value will help.
        this.effectiveTime = (transport.context.currentTime - transport.paused);
        this.effectiveTransportTime = (transport.time * (transport.duration - transport.start));

        let nextEvent = sequence[this.index],
            eventTime = nextEvent.time * transport.time,
            // SUBLOOP: this.oldContextTime vs newEvent, needs to mod at 2.5 (5 * .5) to fire this.newMeasure = true
            contextTime = (this.effectiveTime % this.effectiveTransportTime);

        // This will fire after mod happens, so I know it's a new measure. When I pause old time falls out of sync, so I subtract paused to match effective time.
        if (!transport.playing) {
          this.oldContextTime -= transport.paused;
        }

        // console.log(this.checkNewMeasure, contextTime, '<', this.oldContextTime, contextTime < (this.oldContextTime));
        if (this.checkNewMeasure && contextTime < (this.oldContextTime)) {
          // Set add measure time after mod 0;
          this.newMeasure = true;
          this.fire = true;
        }

        // See article above.
        // TODO: document this better
        // If event time plus elapsed time, plus paused time mod time (to keep measure elapsed time matched with context time - might be fixed using effective time somehow?), is less than the current time with a look ahead.
        if (this.fire && (eventTime + this.measureTime + ((transport.paused % transport.time))) < ((transport.context.currentTime +
          this.scheduleAheadTime))) {

          let transportTime = parseFloat(transport.time),
              filtered = this.getsequenceLength(sequence, transport.start, (transport.duration - transport.start)),
              length = sequence.length,
              effectiveLength = (filtered === -1) ? sequence.length : filtered;

          // console.log('effective!', effectiveLength);

          // SUBLOOP: only one event after .5, so last is second to last event
          this.index = ((this.index + 1) % (effectiveLength));
          let reset = ((this.index - 1) === effectiveLength);

          // Fires event callback.
          this.destination[nextEvent.callback](nextEvent, reset);

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
                this.scheduleAheadTime) / this.effectiveTransportTime)) * this.effectiveTransportTime));

            console.log('NEW!!!!!', this.measureTime);
            this.newMeasure = false;
            this.checkNewMeasure = false;
          }
        }

        // SUBLOOP
        this.oldContextTime = transport.context.currentTime % this.effectiveTransportTime;

        // Never not polling.
        window.setTimeout(() => {
          this.schedule(sequence, transport);
        }, this.lookahead);
      }
    }

    getsequenceLength(sequence, start, duration) {
      return _.findIndex(sequence, (sequence) => {
        return sequence.time > duration;
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
        schedule: store => schedulerClass.schedule(store.sequence.sort((a, b) => {
              return a.time - b.time;
            }), store.transport)
      }
    }
  }
</script>