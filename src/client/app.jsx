import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import Triggers from './components/triggers.jsx';

let reactElement = document.getElementById('app');

render(
  <Provider store={store}>
    <Triggers />
  </Provider>,
  reactElement
);

var HelloWorld = React.createClass({
  render: function() {
    return (
      <p>
        Sup, <input type="text" placeholder="Your name here" />!
        It is {this.props.date.toTimeString()}
      </p>
    )
  }
	});

setInterval(function() {
  render(
    <HelloWorld date={new Date()} />, 
    document.getElementById('example')
  );
}, 500);