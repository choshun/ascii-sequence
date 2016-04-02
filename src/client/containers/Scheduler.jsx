/** 
 * Scedules events from store "events". Read only!!!!.
**/
import React from 'react';
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

  // Converts Immutable object to array sorted by time.
  setSequence(sequence) {
    this.sequence = _.sortBy(_.clone(sequence.toArray()), 'time');
    // console.log('set!!!!', this.sequence);
  }

  setTransport(transport) {
    this.transport = _.clone(transport.toObject());

    this.context = this.transport.context;
    console.log('fuck yeah?', this.context);
    // console.log('set transport!!!!', this.transport);
  }

  // TODO: so much to do here, but based on transport play and fire destination
  /**
   * Scheduler for sequence of events in sequence.js.
   */

  // TODO: BUG: if I put an event really far right of the grid, current measure time skips
  // to the next measure.
  schedule() {
    let nextEvent,
        eventTime;

    if (this.sequence && this.transport) {
      nextEvent = this.sequence[this.index];
      eventTime = nextEvent.time * this.transport.time;
      
      if ((eventTime + this.measureTime) < (this.context.currentTime +
        this.scheduleAheadTime)) {
        console.log('nextEvent?', (eventTime + this.measureTime), (this.context.currentTime +
        this.scheduleAheadTime), nextEvent);

        this.index = ((this.index + 1) % this.sequence.length);

        // TODO: fire callback (rename to destination), with data. 
        if (this.index === 0 ) {
          console.log('\n\n---------NEW MEASURE---------\n\n');
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
// Start scheduling once, not every time sequence/transport changes
schedulerUtils.schedule();

const Scheduler = ({ sequence, transport }) => (
  <section className={'scheduler'}>
    /* this will refire EVERY TIME SEQUENCE CHANGES :0, so sick */
    Scheduler!!!
    { console.log('pls work pls', transport.get('context')) }

    // TODO: make single init, keep setSequence and setTransport, they sexy
    { schedulerUtils.setSequence(sequence) }
    { schedulerUtils.setTransport(transport) }
  </section>
);

export default connect(schedulerUtils.mapStateToProps)(Scheduler);