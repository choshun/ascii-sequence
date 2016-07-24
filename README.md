- Go to desired folder.
- $ git clone https://github.com/choshun/ascii-sequence
- $ npm install
- $ npm run
- $ npm run watch
- Go to localhost:1337.

This is an app using Vue for component rendering, and Vuex for page state management. It's a sequencer!
- https://vuejs.org/guide/
- http://vuex.vuejs.org/en/tutorial.html

Grid.vue is responsible for getting layers.

Layer.vue responsible for getting events/adding events.

Event.vue responsible for choosing event data.

Transport.vue is responsible for tempo play/pause.

Scene.vue is responsible for sequence to destination playback (the result of the sequencer).

StyleManager.vue is responsible for changing event data.

Scheduler.vue (based off http://www.html5rocks.com/en/tutorials/audio/scheduling/) is responsible for firing events in state.sequence.

/destinations/*.js is fired from scheduler, and executes scheduled callbacks with sequencer event data (in our case css).

NOTES/thoughts on vue:

It's pretty great.

Remember to have functions be function () {} and not function: () => {}, or else that method won't have access to "this".

NOTES/thoughts on vuex:

All getters have no access to "this", as it should. Getters only retrieve stuff from store, all actions only dipatch stuff to store, and should have params prepped by methods in component.

TODO:
- Scheduler
	- get transition delay to work as per scheduler
- Grid
	- get click not triggering new event if something is selected
	- get moving/dragging event
	- get moving/dragging events
	- get copying event working
	- get copying events working
	- get select via layer working
	- get shift add event to selected working
	- get shift add events to selected working

- styleManager
	- get sass renderer to work in style-manager
	- have a sense of preserved base classes
	- trigger css classes in events
	- have sass vars
- backend
	- save
	- have some sense of persistence, do a call based on url to python store
- measures
	- be able to switch between measures with a small matrix thing... like a groove box
	- quantize selection and events
	- measures can have unique times
	- have an exported final version of switching between blocks of sequences

- not so important, but could do
	- localstorage
	- service workers for offline

DONE
- get webpack to work with app.scss
made everything a .vue, including app for better or worse. sass-loader was not happy with .vue loader
- Scheduler
	- get it working with multiple events and layers
- Transport
	- get canvas time indicator working
	- get subloop working
	- get tempo working
- Grid
	- get subloop ui working
	- get selected event working
	- get selected events working
	- get delete working
	- get delete selected events working

IDEAS:
- have left side ascii element animate by iteself based on layer
- have the url be the thing that indicates what the acii art is
- be able to save, makes a new version /:)/2 is the generation, this is turn can make a tree that you can click through.