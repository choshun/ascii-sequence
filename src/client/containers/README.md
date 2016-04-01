Containers do all the data transformations
via mapStateToProps, all children should
not have transformation logic, ie stateless
no mapStateToProps.

grid
/**
 * UI to edit sequence. Reads/writes to sequence store "events".
*/

style manager
/**
 * UI to edit selected event in sequence. Reads/writes to event
 * store "event".
*/

scheduler
/**
 * Consumes sequence and schedules events. Reads sequence store
 * "events"
*/

scene 
/**
 * Event output. In this case the scene contains
 * ASCII art controlled by css. 
 * Reads/writes nothing in app state.
 * How it's updated: Scheduler schedules an event based
 * on the sequence, that event fires a callback destination 
 * (in this case css), the destination changes the scene.
*/


// not sure how else to do this,
// the output is the the head tag.
// decided to pass it to event, so react can manage changing only what changes
instead of constantly injecting the whole thing in a head tag.
/*
  I want {
    'layer': 0,
    'time': 0.75,
    'callback': 'addStyle',
    'data': '.layer2 { blob: of css};',
    'key': 'event-00.75'
  }

  to
  .event-00.75 {
    left: 75%;
  }

*/



  /*
    have an id that's layer+time

    ideal output:

    from 
    [
      {
        'index': 0,
        'element': ':'
      },
      {
        'index': 1,
        'element': ')'
      },
    ]

    and
    [
      {
        'layer': 0,
        'time': .75,
        'callback': 'addStyle',
        'data': '.layer2 { blob: of css};'
      },
      {
        'layer': 1,
        'time': .545,
        'callback': 'addStyle',
        'data': '.layer2 { blob: of css};'
      },
      {
        'layer': 0,
        'time': 0,
        'callback': 'addStyle',
        'data': '.layer2 { blob: of css};'
      }
    ];

    we get (order not important)
    [
      [
        {
          'key': '0.75',
          'time': .75,
          'callback': 'addStyle',
          'data': '.layer2 { blob: of css};'
        },
        {
          'key': '0.0',
          'callback': 'addStyle',
          'data': '.layer2 { blob: of css};'
        }
      ],
      [
        {
          'key': 1.545,
          'time': .545,
          'callback': 'addStyle',
          'data': '.layer2 { blob: of css};'
        }
      ]
    ]
  */