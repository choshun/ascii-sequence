/** 
 * Scedules events from store "events". Read only!!!!.
**/
import React from 'react';
import Css from '../destinations/css.js';
import { connect } from 'react-redux';
import { clone, sortBy } from 'lodash';

/**
 * @class Scheduler
 * A sequencer using audio context for timing.
 * @author choshun.snyder@gmail.com (Choshun Snyder)
 */
class SchedulerUtils {
  /**
   * @constructor Scheduler
   * @param {Object} cube cube object to schedule
   */
  constructor() {

    this.sequence;

    this.transport;

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
    this.measureTime = 0;
  }

  init(sequence, transport) {
    this.setSequence(sequence);
    this.setTransport(transport);
    this.context = this.transport.context;
    this.destination.init();
  }

  // Converts Immutable object to array sorted by time.
  setSequence(sequence) {
    this.sequence = _.sortBy(_.clone(sequence.toArray()), 'time');
  }

  setTransport(transport) {
    this.transport = _.clone(transport.toObject());
  }

  /**
   * Scheduler for sequence of events. Fires a destination
   * based on event time in store "events". Ideally this is destination agnostic,
   * this same scheduler should be able to trigger anything, css, canvas, web audio etc.
   * solely based on event data.
   * It's a scheduler, so there's a lookahead and all that other good stuff:
   * http://www.html5rocks.com/en/tutorials/audio/scheduling/
   */

  // TODO: BUG: if I put an event really far right of the grid, current measure time skips
  // to the next measure.
  schedule() {
    let nextEvent,
        eventTime,
        newMeasure;

    if (this.sequence && this.transport) {
      nextEvent = this.sequence[this.index];
      eventTime = nextEvent.time * this.transport.time;

      // See article above.
      if ((eventTime + this.measureTime) < (this.context.currentTime +
        this.scheduleAheadTime)) {
        this.index = ((this.index + 1) % this.sequence.length);
        newMeasure = (this.index === 0);

        // Fires event callback.
        this.destination[nextEvent.callback](nextEvent, newMeasure);

        // Reset event loop to current time.
        if (newMeasure) {
          this.measureTime = (((Math.floor((this.context.currentTime + this.scheduleAheadTime) / this.transport.time)) * this.transport.time) + this.transport.time);
        }
      }
    }

    this.cycle();
  }

  cycle() {
    // Never not polling.
    window.setTimeout(() => {
      if (this.transport && this.transport.play === true) {
        this.schedule();
      }
    }, this.lookahead);
  }

  mapStateToProps(store) {
    return {
      sequence: store.events,
      transport: store.transport
    };
  }
}

const schedulerUtils = new SchedulerUtils();
// Starts scheduling once, not every time sequence/transport changes.
schedulerUtils.schedule();

const Scheduler = ({ sequence, transport }) => (
  <section className={'scheduler'}>
    Scheduler!!!

    // TODO: this fires every time store changes, only set sequence and transport here.
    { schedulerUtils.init(sequence, transport) }
  </section>
);

export default connect(schedulerUtils.mapStateToProps)(Scheduler);