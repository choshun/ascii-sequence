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
     * Loop time verses trnsport current time.
     * @type {Number}
     */
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
      let transportTime = parseFloat(this.props.transport.time),
          length = this.props.sequence.length;

      this.index = ((this.index + 1) % length);
      let newMeasure = ((this.index - 1) === length);

      // TODO: keep track of where we paused and played
      if (this.props.transport.play) {
        // Fires event callback.
        this.destination[nextEvent.callback](nextEvent, newMeasure);
      }

      if (this.index === 0) {
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
        Scheduler!!! :D
      </section>
    );
  }
}

function mapStateToProps(store) {
  return {
    sequence: _.sortBy(_.clone(store.events).toArray(), 'time'),
    transport: _.clone(store.transport).toObject()
  };
}

export default connect(mapStateToProps)(Scheduler);
