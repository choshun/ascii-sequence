/** 
 * Scedules events from store "events". This fires an event destination
 * based on event time vs current time. Read only!!!!.
**/
import React, { Component } from 'react';
import Css from '../destinations/css.js';
import { connect } from 'react-redux';
import { clone, sortBy } from 'lodash';

/**
 * @class Scheduler
 * A sequencer using audio context for timing.
 * @author choshun.snyder@gmail.com (Choshun Snyder)
 */
class Scheduler extends Component {
  /**
   * @constructor Scheduler
   * @param {Object} cube cube object to schedule
   */
  constructor(props) {
    super(props);

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

  componentDidMount() {
    this.destination.init();
    this.schedule();
  }

  /**
   * Scheduler for sequence of events. Fires a destination
   * based on event time in store "events".
   * It's a scheduler, so there's a lookahead and all that other good stuff:
   * http://www.html5rocks.com/en/tutorials/audio/scheduling/
   */

  // TODO: BUG: if I put an event really far right of the grid, current measure time skips
  // to the next measure.
  schedule() {
    let nextEvent = this.props.sequence[this.index],
        eventTime = nextEvent.time * this.props.transport.time;

    // See article above.
    if ((eventTime + this.measureTime) < (this.props.transport.context.currentTime +
      this.scheduleAheadTime)) {

      // TODO: BUG: seems to clear right after last one here,
      // moved to after index change it keeps last event and adds event-00 as second
      // maybe it works? will have to make scene to make sure
      // TODO: may need to poll currenttime :/, or maybe at 0 see if the last event one was the last one in events?
      // TODO; seems to wait a while before it starts scheduling, ~tranportTime
      let newMeasure = (this.index === 0);
      this.index = ((this.index + 1) % this.props.sequence.length);

      // Fires event callback.
      this.destination[nextEvent.callback](nextEvent, newMeasure);

      // Reset event loop to current time.
      if (newMeasure) {
        let transportTime = this.props.transport.time;
        this.measureTime = (((Math.floor((this.props.transport.context.currentTime +
            this.scheduleAheadTime) / transportTime)) * transportTime) + transportTime);
      }
    }

    this.cycle();
  }

  cycle() {
    // Never not polling.
    window.setTimeout(() => {
      this.schedule();
    }, this.lookahead);
  }

  render() {
    return (
      <section className={'scheduler'}>
        Scheduler!!!
      </section>
    );
  }
}

function mapStateToProps(store) {
  return {
    sequence: _.sortBy(_.clone(store.events.toArray()), 'time'),
    transport: _.clone(store.transport.toObject())
  };
}

export default connect(mapStateToProps)(Scheduler);
