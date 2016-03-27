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

export function addLayer(layer) {
  return {
    type: 'addLayer',
    layer
  };
}