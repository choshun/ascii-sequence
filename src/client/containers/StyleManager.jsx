/** 
 * Manages style data.
**/
import React, { Component } from 'react';
import { updateEventData, selectStyle } from '../actions';
import { clone, findIndex } from 'lodash';
import { connect } from 'react-redux';

class StyleManager extends Component {
  constructor(props) {
    super(props);
    this.onStyleChange = this.onStyleChange.bind(this);
  }

  onStyleChange(event) {
    let index = _.findIndex(_.clone(this.props.events).toArray(), {'key': this.props.active.key}),
        activeStyle = _.clone(this.props.active),
        styleValue = event.target.value;

    activeStyle.data = styleValue;
    this.props.dispatch(updateEventData({index, 'data': styleValue}));
    this.props.dispatch(selectStyle(activeStyle));
  }

  render() {
    return (
      <section className={'style-manager'}>
        <textarea value={ this.props.active.data } onChange={this.onStyleChange}></textarea>
      </section>
    );
  }
}

function mapStateToProps(store) {
  return {
    events: store.events,
    active: store.styleManager.get('active'),
    dispatch: store.dispatch
  };
}

export default connect(mapStateToProps)(StyleManager);
