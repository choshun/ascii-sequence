import Vue from 'vue';
import Vuex from 'vuex';

// TODO: Should prolly put this in transport.vue
import Utils from '../utils/utils.js';
const utils = new Utils();
utils.createContext();

Vue.use(Vuex);

const state = {
  transport: {
  	'playing': true, // Should be playing.
    'start': 0, // Start of loop play as fraction of total time.
    'end': 1, // End of loop play as fraction of total time.
    'time': 5, // Total loop time in seconds.
    'context': utils.getContext() // Audio context that keeps time.
  },
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
	    'layer': 1,
	    'time': 0.25,
	    'callback': 'addStyle',
	    'class': '.layer-1',
	    'data': 'basdlob: of css;\nleft: 100px;',
	    'key': 'event-10-25'
	  },
	  {
	    'layer': 2,
	    'time': 0.75,
	    'callback': 'addStyle',
	    'class': '.layer-2',
	    'data': 'blob: of css;\nleft: 200px; top: 30px;',
	    'key': 'event-00-75'
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
    },
    {
      'layer': 2,
      'time': 0.25,
      'callback': 'addStyle',
      'class': '.layer-2',
      'data': 'basdlob: of css;\nleft: 150px; top: 50px;',
      'key': 'event-10-25'
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
  }
};

const mutations = {
  // A mutation receives the current state as the first argument
  // You can make any modifications you want inside this function
  TOGGLEPLAY (state) {
    state.transport.playing = !state.transport.playing;
  },
  UPDATE_TIME (state, time) {
  	state.transport.time = time;
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