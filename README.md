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

NOTES:
All components must be capital cased. ie <MyComponent />, file-name MyComponent.jsx
If you don't, IT WON'T RENDER.

SUPER BIG
What Components Should Have State?
Most of your components should simply take some data from props and render it. However, sometimes you need to respond to user input, a server request or the passage of time. For this you use state.

Try to keep as many of your components as possible stateless. By doing this you'll isolate the state to its most logical place and minimize redundancy, making it easier to reason about your application.

A common pattern is to create several stateless components that just render data, and have a stateful component above them in the hierarchy that passes its state to its children via props. The stateful component encapsulates all of the interaction logic, while the stateless components take care of rendering data in a declarative way.

http://facebook.github.io/react/docs/multiple-components.html
The key should always be supplied directly to the components in the array, not to the container HTML child of each component in the array