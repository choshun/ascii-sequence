import Vue from 'vue';
import Vuex from 'vuex';

// TODO: Should prolly put this in transport.vue
import Utils from '../utils/utils.js';
const utils = new Utils();
utils.createContext();

Vue.use(Vuex);

const state = {
  sequence: [
	  {
      'layer': 2,
      'time': 0.25,
      'callback': 'addStyle',
      'class': '.layer-2',
      'data': 'basdlob: of css;\nleft: 100px',
      'key': 'event-20-25'
    },
    {
      'layer': 2,
      'time': 0.55,
      'callback': 'addStyle',
      'class': '.layer-2',
      'data': 'basdlob: of css;\nleft: 500px',
      'key': 'event-20-55'
    },
    {
	    'layer': 1,
	    'time': 0.27,
	    'callback': 'addStyle',
	    'class': '.layer-1',
	    'data': 'basdlob: of css;\nleft: 100px;',
	    'key': 'event-10-25'
	  },
	  {
	    'layer': 1,
	    'time': 0.75,
	    'callback': 'addStyle',
	    'class': '.layer-1',
	    'data': 'blob: of css;\nleft: 200px; top: 30px;',
	    'key': 'event-10-75'
	  },
	  {
	    'layer': 1,
	    'time': 0.45,
	    'callback': 'addStyle',
	    'class': '.layer-1',
	    'data': 'basdlob: of css;\nleft: 600px',
	    'key': 'event-10-55'
	  },
	  {
	    'layer': 0,
	    'time': 0,
	    'callback': 'addStyle',
	    'class': '.layer-0',
	    'data': 'assdlob: of css;\nleft: 50px; color: blue;',
	    'key': 'event-00'
	  },
    {
      'layer': 0,
      'time': 0.5,
      'callback': 'addStyle',
      'class': '.layer-0',
      'data': 'assdlob: of css;\nleft: 500px; color: red;',
      'key': 'event-00-5'
    }
	],
  layers: [
    {
      'index': 0,
      'element': ':'
    },
    {
      'index': 1,
      'element': ')'
    },
    {
      'index': 2,
      'element': '>'
    }
  ],
  styleManager: {
    active: [{
      callback: 'addStyle',
      data: 'dummy style, should be gotten from events store\nleft: 50px',
      key: 'event-00-75',
      layer: 0,
      time: 0.75
    }]
  },
  transport: {
    'playing': true, // Should be playing. // TODO: if playing onload = false add to pause time
    'start': 0.10, // Start of loop play as fraction of total time.
    'duration': 1.0, // duration of loop play as fraction of total time.
    'time': 5, // Total loop time in seconds.
    'context': utils.getContext(), // Audio context that keeps time.
    'pauseStart': 0, // "context.currentTime" when sequence paused.
    'paused': 0, // Total time paused.
  }
};

const mutations = {
  // TODO: somehow make transport and scheduler just get a currentTime with a pause, this is confusing and will only get worse with sublooping
  // TODO: this if else is no bueno, make more actions, should only set stuff here.
  TOGGLEPLAY (state) {
    state.transport.playing = !state.transport.playing;

    if (!state.transport.playing) {
      state.transport.pauseStart = state.transport.context.currentTime;
      utils.deleteContext();
      // state.transport.context = '';
      
      state.transport.context = utils.getContext();
    } else {
      console.log('play?');
      utils.createContext();
      state.transport.context = utils.getContext();
      state.transport.paused += state.transport.context.currentTime - state.transport.pauseStart;
    }
  },
  UPDATE_TIME (state, time) {
  	state.transport.time = time;
  },
  UPDATE_START (state, start) {
    state.transport.start = start;
  },
  UPDATE_DURATION (state, duration) {
    state.transport.duration = duration;
  },
  ADD_EVENT (state, newEvent) {
    state.sequence.push(newEvent);
  },
  SET_ACTIVE_STYLE (state, activeKey) {
    state.styleManager.active = state.sequence.filter(event => {
      return event.key === activeKey;
    });
  },
  UPDATE_EVENT_DATA (state, data) {
    // Returns the event which matches the styleManager's active event.
    // see SET_ACTIVE_STYLE to see how active style is set.
    let event = state.sequence.filter(event => {
      return event.key === state.styleManager.active[0].key;
    });

    // Sets that event's data to dispatched event's style data.
    event[0].data = data;
  }
};

export default new Vuex.Store({
  state,
  mutations
});