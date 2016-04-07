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

export function updateEventData(event) {
  return {
    type: 'updateEventData',
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

export function setPlay(play) {
  return {
    type: 'setPlay',
    play
  };
}

export function setTime(time) {
  return {
    type: 'setTime',
    time
  };
}
