import React from 'react'
import { connect } from 'react-redux'

import NewTodo from './NewTodo'
import {addTrigger} from '../actions'
import {deleteTrigger} from '../actions'

const Todos = ({todos, dispatch}) => (
  <div>
    <h1>it begins ╰(✿˙ᗜ˙)੭━☆゜.*･｡✲</h1>
    <NewTodo onChange = {e => {
      if(e.keyCode == 13) {
        dispatch(addTrigger(e.target.value));
        e.target.value = '';
      }
    }}/>
    {todos.map((trigger, index) => <p onClick={
      e => dispatch(deleteTrigger(index))
    } key={trigger}>{trigger}</p>)}
  </div>
)

function mapStateToProps(todos) {
  return {
    todos
  }
}

export default connect(mapStateToProps)(Todos)