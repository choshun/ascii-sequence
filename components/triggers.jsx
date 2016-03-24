import React from 'react'
import {connect} from 'react-redux'

import NewTrigger from './NewTrigger'
import {addTrigger} from '../actions'
import {deleteTrigger} from '../actions'

const Triggers = ({triggers, dispatch}) => (
  <div>
    <h1>it begins ╰(✿˙ᗜ˙)੭━☆゜.*･｡✲</h1>
    <NewTrigger onChange = {e => {
      if(e.keyCode == 13) {
        dispatch(addTrigger(e.target.value));
        e.target.value = '';
      }
    }}/>
    {triggers.map((trigger, index) => <p onClick={
      e => dispatch(deleteTrigger(index))
    } key={trigger}>{trigger}</p>)}
  </div>
)

function mapStateToProps(triggers) {
  return {
    triggers
  }
}

export default connect(mapStateToProps)(Triggers)