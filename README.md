- Go to desired folder.
- $ git clone https://github.com/choshun/ascii-sequence
- $ npm install
- $ npm run
- $ npm run watch
- Go to localhost:1337

This is an app using Vue for component rendering, and Vuex for page state management. It's a sequencer!
https://vuejs.org/guide/
http://vuex.vuejs.org/en/tutorial.html

Grid.vue is responsible for getting layers
Layer.vue responsible for getting events/adding events
Event.vue responsible for choosing event data

Transport.vue is responsible for tempo play/pause

Scene.vue is responsible for sequence to destination playback (the result of the sequencer).

StyleManager.vue is responsible for changing event data.

Scheduler.vue (based off http://www.html5rocks.com/en/tutorials/audio/scheduling/) is responsible for firing events in state.sequence. This may or may not need to be a .vue.

/destinations/*.js is fired from scheduler, and executes scheduled callbacks with sequencer event data (in our case css).

NOTES/thoughts on vue:
There's no 'this' in the vue export default code so you can't pass store/scope, or properties to methods directly. If anything is dependant on scope put in a getter, and if a method is dependant on scope instead of passing it directly to the method, just dispatch an event which executes a mutation in store.js - the store has access to store :P, the getter in the component will update the view accordingly.

Computed properties might address this?

Getters fire once onload, then every time the store changes. Getters are love, getters are life.

If you are handling a store, any filtering/native store handling will coerce the store property into an array. So just make all store stuff arrays (ie styleManager.active could just be an object, but we made it an array with one object cause it was borking if I didn't).

A good example of how vue can work unlike I'd expect (compared to es6 classes, or react extended component classes) is
"isActive"
in Event.vue,
when setting the active state.
Normally "activeStyle" could be passed between a class with a constructor or property, instead I do a getter for active style, then pass THAT to the template, which THEN calls the isActive vue method with the getter'd store property. Same with the prop "event". I can't pass event.key directly to the method, I have to register the prop, then again pass that to the template, which in turn fires the vue method.
It's pretty confusing, but it works! and only references the store, the dom is never really bound to anything, no classList.remove etc. and I guess the getters/actions/methods are shepharded to be more pure (no lateral calls, template as the one source of truth).


IDEAS:
- have left side ascii element animate by iteself based on layer
- have the url be the thing that indicates what the acii art is
- be able to save, makes a new version /:)/2 is the generation, this is turn can make a tree that you can click through.