/** 
 * Controls time! :0
**/
import React from 'react';

import { connect } from 'react-redux';

class TransportUtils {
  /**
   * @constructor Scheduler
   *
   * @param {Object} cube cube object to schedule
   */
  constructor() {
    this.isPlaying = false;
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

  /**
   * Scheduler for sequence of events in sequence.js.
   */
  schedule() {
    var eventKey,
        trigger; // single event

    trigger = this.sequence[this.index];
    this.eventTime = trigger.time;

    // If the event time is less than now and a look ahead time window
    if (this.eventTime < (this.context.currentTime +
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

    if (this.play) {
      window.setTimeout(() => {
        this.schedule();
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

  test() {
    console.log('alrighty, got in there!!!');
  }

  mapStateToProps(store) {
    console.log('it worked for transport?');
    return {
      store
    };
  }
}

const transportUtils = new TransportUtils();

const Transport = ({ layers, gridCSS }) => (
  <section className={'scene'}>
    Transport!!!
    // TODO: make into component, set transport.play to !play
    <button class="play">play</button>
  </section>
);

export default connect(transportUtils.mapStateToProps)(Transport);