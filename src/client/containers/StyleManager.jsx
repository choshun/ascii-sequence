import React from 'react';
import { updateEventData, selectStyle } from '../actions';
import { clone, findIndex } from 'lodash';
import { connect } from 'react-redux';

const StyleManager = ({ events, active, dispatch }) => (
  <section>
    <textarea value={ active.data } onChange={(event) => {
      let index = _.findIndex(events.toArray(), {'key': active.key}),
          activeStyle = _.clone(active),
          styleValue = event.target.value;

      activeStyle.data = styleValue;
      dispatch(updateEventData({index, 'data': styleValue}));
      dispatch(selectStyle(activeStyle));
    }}></textarea>
  </section>
);

function mapStateToProps(store) {
  return {
    events: store.events,
    active: store.styleManager.get('active')
  };
}

export default connect(mapStateToProps)(StyleManager);