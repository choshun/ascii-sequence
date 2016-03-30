on why I didn't use style in the Event component
// After much frustration with all keys needing to be unique,
// and it breaking when I passed anythng but a string,
// and failing at parsing the passed string into a unique object with Immutable,
// or JSON.parse (erroring again cause the object didn't
// have a unique key left in {'left': '75%'})... which will ALWAYS not be unique
// I said screw it, every element now appends it's css to the head.
// It may balloon but oh well



I just want to express my deep anger that I have to manually add
a binarynode to node-sass/vendor. How THE FUCK was I supposed to know that.
This will break the second I do npm anything. So angry.