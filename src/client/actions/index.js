export function addTrigger(trigger) {
  return {
    type: 'addTrigger',
    trigger
  };
}

export function deleteTrigger(index) {
  return {
    type: 'deleteTrigger',
    index
  };
}