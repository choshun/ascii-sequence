import Immutable from 'immutable';

export default (state = Immutable.List(['Code More!']), action) => {
  switch(action.type) {
    case 'addTodo':
      return state.push(action.todo);
    case 'deleteTodo':
      return state.splice(action.index, 1);
    default:
      return state;
  }
}