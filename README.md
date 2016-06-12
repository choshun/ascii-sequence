- $ npm install
- $ npm run
- $ npm run watch

Vue
https://vuejs.org/guide/
http://vuex.vuejs.org/en/tutorial.html

Grid responsible for getting layers
Layer responsible for getting events/adding removing events
Event responsible for choosing event data

Transport responsible for tempo play/pause

Scene responsible for sequence to destination playback (the result of the sequencer).

StyleManager responsible for changing event data.

There's no 'this' in the vue export default code so you can't pass store/scope, or properties to methods directly. If anything is dependant on scope put in a getter, and if a method is dependant on scope instead of passing it directly to the method, just dispatch an event - the store has access to store :P, the getter in the component will update the view accordingly.

Computed addresses this kind of... but not really.

Getters fire once onload, then every time the store changes. Getters are love, getters are life.

If you are handling a store, any filtering/native store handling will coerce the store property into an array. So just make all store stuff arrays (ie styleManager.active could just be an object, but we made it an array with one object cause it was borking).


IDEAS:
- have left side ascii element animate by iteself based on layer
- have the url be the thing that indicates what the acii art is
- be able to save, makes a new version /:)/2 is the generation, this is turn can make a tree that you can click through.