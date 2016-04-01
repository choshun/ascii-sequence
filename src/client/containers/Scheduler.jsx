/** 
 * Scedules events from store "events". Read only!!!!.
**/
import React from 'react';

import { connect } from 'react-redux';

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
    this.context;

    this.sequence = [];

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
     * Time at which to fire scheduled items.
     * @type {Number} in sec
     */
    this.eventTime = 0;

    /**
     * Whether to keep interval for next scheduled event
     * @type {Boolean}
     */
    this.play = true;
  }

  setSequence(sequence) {
    console.log('set!!!!', sequence);
    this.sequence = sequence;
  }

  getSequence() {
    return this.sequence;
  }

  /**
   * Kicks off timer for animation events.
   */
  startContext() {
    if (this.context === undefined) {
      var contextClass = window.AudioContext ||
          window.webkitAudioContext ||
          window.mozAudioContext || window.oAudioContext ||
          window.msAudioContext;

      if (contextClass) {
        this.context = new contextClass();
      }
    }
  }

  // TODO: so much to do here, but based on transport play and fire destination
  /**
   * Scheduler for sequence of events in sequence.js.
   */
  schedule(transport) {
    var eventKey,
        trigger; // single event

    console.log('transport!8=====D', transport);

    trigger = this.sequence.get(this.index);
    this.eventTime = trigger.time;

    // If the event time is less than now and a look ahead time window
    if (this.time < (this.context.currentTime +
        this.scheduleAheadTime)) {

      // fire callbacks
      for (eventKey in trigger.events) {
        var eventValue = trigger.events[eventKey];
        this[eventKey](eventValue);
      }

      // keep going if there's more scheduled events
      if (this.sequence[this.index + 1] !== undefined) {
        this.index++;
      } else {
        this.play = false;
      }
    }

    if (transport.get('play') === true) {
      window.setTimeout(() => {
        this.schedule(transport);
      }, this.lookahead);
    }
  }

  /**
   * Scheduler for sequence of events in sequence.js.
   *
   * @param {String} theClass space delimited classes I want to add
   */
  setClass(theClass) {
    document.querySelector('.' + theClass.split(' ')[0]).
        setAttribute('class', theClass);
  }

  mapStateToProps(store) {
    return {
      sequence: store.events,
      transport: store.transport
    };
  }
}

const schedulerUtils = new SchedulerUtils();
const Scheduler = ({ sequence, transport }) => (
  <section className={'scheduler'}>
    /* this will refire EVERY TIME SEQUENCE CHANGES :0, so sick */
    Scheduler!!!
    { schedulerUtils.startContext() }
    { schedulerUtils.setSequence(sequence) }
    { schedulerUtils.schedule(transport) }
  </section>
);

export default connect(schedulerUtils.mapStateToProps)(Scheduler);