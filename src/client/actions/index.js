export function addEvent(trigger) {
  return {
    type: 'addEvent',
    trigger
  };
}

export function deleteEvent(index) {
  return {
    type: 'deleteEvent',
    index
  };
}

export function addLayer(layer) {
  return {
    type: 'addLayer',
    layer
  };
}