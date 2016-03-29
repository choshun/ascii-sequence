so helpful:
http://reactjsnews.com/your-first-redux-app

redux:
https://egghead.io/series/getting-started-with-redux
http://redux.js.org/docs/introduction/Ecosystem.html

react/jsx:
https://facebook.github.io/react/docs/multiple-components.html

immutable:
https://facebook.github.io/immutable-js/

good example:
https://github.com/andrewngu/sound-redux/blob/master/scripts/main.js

q's. 
how do I combine stores/have more than just todo's in the store, ie layers, triggers, grid etc/
A. combineReducer. Once this is done the store will have two children, change data parsing accordingly.

When I reduce, I may need to add more than one thing, hw do I pass more than one var to the item from the element?
A. you can only pass state and action, but action can be an object, so pass as objects.

How to I have nested components? putting layer in trigger isn't doing anything.
https://facebook.github.io/react/docs/multiple-components.html
A. Still fuzzy, but IT NEEDS TO BE CAPITOLIZED, or it won't be registered as a component.
I should look more into props, it's looking like store is what's passed everywhere as of now. Maybe function mapStateToProps(grid) should help with my container aspirations (see below "next steps").

NOTES (from docs):
All components must be capital cased. ie <MyComponent />, file-name MyComponent.jsx
If you don't, IT WON'T RENDER.

SUPER BIG
What Components Should Have State?
Most of your components should simply take some data from props and render it. However, sometimes you need to respond to user input, a server request or the passage of time. For this you use state.

Try to keep as many of your components as possible stateless. By doing this you'll isolate the state to its most logical place and minimize redundancy, making it easier to reason about your application.

A common pattern is to create several stateless components that just render data, and have a stateful component above them in the hierarchy that passes its state to its children via props. The stateful component encapsulates all of the interaction logic, while the stateless components take care of rendering data in a declarative way.

http://facebook.github.io/react/docs/multiple-components.html
The key should always be supplied directly to the components in the array, not to the container HTML child of each component in the array

NOTES (from sucking)
If you try to dispatch immediately there'll be an esoteric error cause it can't assign a key or something (mount cycle, kinda like $timeout, digest, and apply). If you set a timeout, it will work but then fire like an interval... I dun get it.

Next steps:

2 models:
Looking like I need a ui model grid -> layers, that populates the ui, the interactions will inform:
A seperate sequence model, a flat sequence array of objects (Immutable.List), that gets ordered by time and consumed by scheduler.

Have a containers folder that transforms stores into immutable stuff that just gets passed to child components, all changes should be done there for all its responsibilities.

* This means mapStateToProps should only be in containers, the rest of the child elements are dumb.

What gets stored or "dispatched" should be the quickest simplest information I'd need for the store before it's transformed by container stuff. IE, for a trigger: time, layer, callback, data. In this case time may need to be futzed with to have an actual time, DON'T DO IT, just add event.positionX, the containers will do what they need to do.

2/28/16
Where should I put the grid css stuff? In grid, if so is there reusable things for injecting css? No, it should be it's own thing thatonly consumes sqc, also including trigger css.