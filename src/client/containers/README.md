Containers do all the data transformations
via mapStateToProps, all children should
not have transformation logic, ie stateless
no mapStateToProps.


// TODO: not sure how else to do this,
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