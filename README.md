so helpful:
http://reactjsnews.com/your-first-redux-app

redux:
https://egghead.io/series/getting-started-with-redux
http://redux.js.org/docs/introduction/Ecosystem.html

react/jsx:
https://facebook.github.io/react/docs/multiple-components.html

immutable:
https://facebook.github.io/immutable-js/

q's. 
how do I combine stores/have more than just todo's in the store, ie layers, triggers, grid etc/
A. combineReducer. Once this is done the store will have two children, change data parsing accordingly.

When I reduce, I may need to add more than one thing, hw do I pass more than one var to the item from the element?
A. you can only pass state and action, but action can be an object, so pass as objects.

How to I have nested components? putting layer in trigger isn't doing anything.
https://facebook.github.io/react/docs/multiple-components.html