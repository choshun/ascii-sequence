export function addEvent(event) {
  return {
    type: 'addEvent',
    event
  };
}

export function deleteEvent(event) {
  return {
    type: 'deleteEvent',
    event
  };
}

export function addLayer(layer) {
  return {
    type: 'addLayer',
    layer
  };
}

export function selectStyle(eventKey) {
  return {
    type: 'selectStyle',
    eventKey
  };
}