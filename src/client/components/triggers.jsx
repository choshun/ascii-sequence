import React from 'react';
import {connect} from 'react-redux';

import NewTrigger from './NewTrigger.jsx';
import layer from './layer.jsx';
import {addTrigger} from '../actions';
import {deleteTrigger} from '../actions';

const Triggers = ({triggers, dispatch}) => (
  <div>
    <h1>it begins ╰(✿˙ᗜ˙)੭━☆゜.*･｡✲</h1>
    
    <NewTrigger onChange={e => {
      if (e.keyCode == 13) {
        dispatch(addTrigger({'test': e.target.value, 'king': 'poopmaster'}));
        e.target.value = '';
      }
    }}/>
    {console.log('triggers?', triggers)}
    {triggers.triggers.map((trigger, index) => <p onClick={(event) => {
      dispatch(deleteTrigger(index));
    }}
    key={trigger}>{trigger}</p>)}
    asd<layer />asd
  </div>

);

function mapStateToProps(triggers) {
  return {
    triggers
  }
}

export default connect(mapStateToProps)(Triggers)