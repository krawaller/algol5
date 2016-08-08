(
  function() {
    var game = {};
    var connections = {
      "a1": {
        "1": "a2",
        "2": "b2",
        "3": "b1"
      },
      "a2": {
        "1": "a3",
        "2": "b3",
        "3": "b2",
        "4": "b1",
        "5": "a1"
      },
      "a3": {
        "1": "a4",
        "2": "b4",
        "3": "b3",
        "4": "b2",
        "5": "a2"
      },
      "a4": {
        "1": "a5",
        "2": "b5",
        "3": "b4",
        "4": "b3",
        "5": "a3"
      },
      "a5": {
        "1": "a6",
        "2": "b6",
        "3": "b5",
        "4": "b4",
        "5": "a4"
      },
      "a6": {
        "1": "a7",
        "2": "b7",
        "3": "b6",
        "4": "b5",
        "5": "a5"
      },
      "a7": {
        "3": "b7",
        "4": "b6",
        "5": "a6"
      },
      "b1": {
        "1": "b2",
        "2": "c2",
        "3": "c1",
        "7": "a1",
        "8": "a2"
      },
      "b2": {
        "1": "b3",
        "2": "c3",
        "3": "c2",
        "4": "c1",
        "5": "b1",
        "6": "a1",
        "7": "a2",
        "8": "a3"
      },
      "b3": {
        "1": "b4",
        "2": "c4",
        "3": "c3",
        "4": "c2",
        "5": "b2",
        "6": "a2",
        "7": "a3",
        "8": "a4"
      },
      "b4": {
        "1": "b5",
        "2": "c5",
        "3": "c4",
        "4": "c3",
        "5": "b3",
        "6": "a3",
        "7": "a4",
        "8": "a5"
      },
      "b5": {
        "1": "b6",
        "2": "c6",
        "3": "c5",
        "4": "c4",
        "5": "b4",
        "6": "a4",
        "7": "a5",
        "8": "a6"
      },
      "b6": {
        "1": "b7",
        "2": "c7",
        "3": "c6",
        "4": "c5",
        "5": "b5",
        "6": "a5",
        "7": "a6",
        "8": "a7"
      },
      "b7": {
        "3": "c7",
        "4": "c6",
        "5": "b6",
        "6": "a6",
        "7": "a7"
      },
      "c1": {
        "1": "c2",
        "2": "d2",
        "3": "d1",
        "7": "b1",
        "8": "b2"
      },
      "c2": {
        "1": "c3",
        "2": "d3",
        "3": "d2",
        "4": "d1",
        "5": "c1",
        "6": "b1",
        "7": "b2",
        "8": "b3"
      },
      "c3": {
        "1": "c4",
        "2": "d4",
        "3": "d3",
        "4": "d2",
        "5": "c2",
        "6": "b2",
        "7": "b3",
        "8": "b4"
      },
      "c4": {
        "1": "c5",
        "2": "d5",
        "3": "d4",
        "4": "d3",
        "5": "c3",
        "6": "b3",
        "7": "b4",
        "8": "b5"
      },
      "c5": {
        "1": "c6",
        "2": "d6",
        "3": "d5",
        "4": "d4",
        "5": "c4",
        "6": "b4",
        "7": "b5",
        "8": "b6"
      },
      "c6": {
        "1": "c7",
        "2": "d7",
        "3": "d6",
        "4": "d5",
        "5": "c5",
        "6": "b5",
        "7": "b6",
        "8": "b7"
      },
      "c7": {
        "3": "d7",
        "4": "d6",
        "5": "c6",
        "6": "b6",
        "7": "b7"
      },
      "d1": {
        "1": "d2",
        "2": "e2",
        "3": "e1",
        "7": "c1",
        "8": "c2"
      },
      "d2": {
        "1": "d3",
        "2": "e3",
        "3": "e2",
        "4": "e1",
        "5": "d1",
        "6": "c1",
        "7": "c2",
        "8": "c3"
      },
      "d3": {
        "1": "d4",
        "2": "e4",
        "3": "e3",
        "4": "e2",
        "5": "d2",
        "6": "c2",
        "7": "c3",
        "8": "c4"
      },
      "d4": {
        "1": "d5",
        "2": "e5",
        "3": "e4",
        "4": "e3",
        "5": "d3",
        "6": "c3",
        "7": "c4",
        "8": "c5"
      },
      "d5": {
        "1": "d6",
        "2": "e6",
        "3": "e5",
        "4": "e4",
        "5": "d4",
        "6": "c4",
        "7": "c5",
        "8": "c6"
      },
      "d6": {
        "1": "d7",
        "2": "e7",
        "3": "e6",
        "4": "e5",
        "5": "d5",
        "6": "c5",
        "7": "c6",
        "8": "c7"
      },
      "d7": {
        "3": "e7",
        "4": "e6",
        "5": "d6",
        "6": "c6",
        "7": "c7"
      },
      "e1": {
        "1": "e2",
        "2": "f2",
        "3": "f1",
        "7": "d1",
        "8": "d2"
      },
      "e2": {
        "1": "e3",
        "2": "f3",
        "3": "f2",
        "4": "f1",
        "5": "e1",
        "6": "d1",
        "7": "d2",
        "8": "d3"
      },
      "e3": {
        "1": "e4",
        "2": "f4",
        "3": "f3",
        "4": "f2",
        "5": "e2",
        "6": "d2",
        "7": "d3",
        "8": "d4"
      },
      "e4": {
        "1": "e5",
        "2": "f5",
        "3": "f4",
        "4": "f3",
        "5": "e3",
        "6": "d3",
        "7": "d4",
        "8": "d5"
      },
      "e5": {
        "1": "e6",
        "2": "f6",
        "3": "f5",
        "4": "f4",
        "5": "e4",
        "6": "d4",
        "7": "d5",
        "8": "d6"
      },
      "e6": {
        "1": "e7",
        "2": "f7",
        "3": "f6",
        "4": "f5",
        "5": "e5",
        "6": "d5",
        "7": "d6",
        "8": "d7"
      },
      "e7": {
        "3": "f7",
        "4": "f6",
        "5": "e6",
        "6": "d6",
        "7": "d7"
      },
      "f1": {
        "1": "f2",
        "2": "g2",
        "3": "g1",
        "7": "e1",
        "8": "e2"
      },
      "f2": {
        "1": "f3",
        "2": "g3",
        "3": "g2",
        "4": "g1",
        "5": "f1",
        "6": "e1",
        "7": "e2",
        "8": "e3"
      },
      "f3": {
        "1": "f4",
        "2": "g4",
        "3": "g3",
        "4": "g2",
        "5": "f2",
        "6": "e2",
        "7": "e3",
        "8": "e4"
      },
      "f4": {
        "1": "f5",
        "2": "g5",
        "3": "g4",
        "4": "g3",
        "5": "f3",
        "6": "e3",
        "7": "e4",
        "8": "e5"
      },
      "f5": {
        "1": "f6",
        "2": "g6",
        "3": "g5",
        "4": "g4",
        "5": "f4",
        "6": "e4",
        "7": "e5",
        "8": "e6"
      },
      "f6": {
        "1": "f7",
        "2": "g7",
        "3": "g6",
        "4": "g5",
        "5": "f5",
        "6": "e5",
        "7": "e6",
        "8": "e7"
      },
      "f7": {
        "3": "g7",
        "4": "g6",
        "5": "f6",
        "6": "e6",
        "7": "e7"
      },
      "g1": {
        "1": "g2",
        "2": "h2",
        "3": "h1",
        "7": "f1",
        "8": "f2"
      },
      "g2": {
        "1": "g3",
        "2": "h3",
        "3": "h2",
        "4": "h1",
        "5": "g1",
        "6": "f1",
        "7": "f2",
        "8": "f3"
      },
      "g3": {
        "1": "g4",
        "2": "h4",
        "3": "h3",
        "4": "h2",
        "5": "g2",
        "6": "f2",
        "7": "f3",
        "8": "f4"
      },
      "g4": {
        "1": "g5",
        "2": "h5",
        "3": "h4",
        "4": "h3",
        "5": "g3",
        "6": "f3",
        "7": "f4",
        "8": "f5"
      },
      "g5": {
        "1": "g6",
        "2": "h6",
        "3": "h5",
        "4": "h4",
        "5": "g4",
        "6": "f4",
        "7": "f5",
        "8": "f6"
      },
      "g6": {
        "1": "g7",
        "2": "h7",
        "3": "h6",
        "4": "h5",
        "5": "g5",
        "6": "f5",
        "7": "f6",
        "8": "f7"
      },
      "g7": {
        "3": "h7",
        "4": "h6",
        "5": "g6",
        "6": "f6",
        "7": "f7"
      },
      "h1": {
        "1": "h2",
        "7": "g1",
        "8": "g2"
      },
      "h2": {
        "1": "h3",
        "5": "h1",
        "6": "g1",
        "7": "g2",
        "8": "g3"
      },
      "h3": {
        "1": "h4",
        "5": "h2",
        "6": "g2",
        "7": "g3",
        "8": "g4"
      },
      "h4": {
        "1": "h5",
        "5": "h3",
        "6": "g3",
        "7": "g4",
        "8": "g5"
      },
      "h5": {
        "1": "h6",
        "5": "h4",
        "6": "g4",
        "7": "g5",
        "8": "g6"
      },
      "h6": {
        "1": "h7",
        "5": "h5",
        "6": "g5",
        "7": "g6",
        "8": "g7"
      },
      "h7": {
        "5": "h6",
        "6": "g6",
        "7": "g7"
      }
    };
    var BOARD = {
      "board": {
        "a1": {
          "colour": "dark",
          "pos": "a1",
          "x": 1,
          "y": 1
        },
        "a2": {
          "colour": "light",
          "pos": "a2",
          "x": 1,
          "y": 2
        },
        "a3": {
          "colour": "dark",
          "pos": "a3",
          "x": 1,
          "y": 3
        },
        "a4": {
          "colour": "light",
          "pos": "a4",
          "x": 1,
          "y": 4
        },
        "a5": {
          "colour": "dark",
          "pos": "a5",
          "x": 1,
          "y": 5
        },
        "a6": {
          "colour": "light",
          "pos": "a6",
          "x": 1,
          "y": 6
        },
        "a7": {
          "colour": "dark",
          "pos": "a7",
          "x": 1,
          "y": 7
        },
        "b1": {
          "colour": "light",
          "pos": "b1",
          "x": 2,
          "y": 1
        },
        "b2": {
          "colour": "dark",
          "pos": "b2",
          "x": 2,
          "y": 2
        },
        "b3": {
          "colour": "light",
          "pos": "b3",
          "x": 2,
          "y": 3
        },
        "b4": {
          "colour": "dark",
          "pos": "b4",
          "x": 2,
          "y": 4
        },
        "b5": {
          "colour": "light",
          "pos": "b5",
          "x": 2,
          "y": 5
        },
        "b6": {
          "colour": "dark",
          "pos": "b6",
          "x": 2,
          "y": 6
        },
        "b7": {
          "colour": "light",
          "pos": "b7",
          "x": 2,
          "y": 7
        },
        "c1": {
          "colour": "dark",
          "pos": "c1",
          "x": 3,
          "y": 1
        },
        "c2": {
          "colour": "light",
          "pos": "c2",
          "x": 3,
          "y": 2
        },
        "c3": {
          "colour": "dark",
          "pos": "c3",
          "x": 3,
          "y": 3
        },
        "c4": {
          "colour": "light",
          "pos": "c4",
          "x": 3,
          "y": 4
        },
        "c5": {
          "colour": "dark",
          "pos": "c5",
          "x": 3,
          "y": 5
        },
        "c6": {
          "colour": "light",
          "pos": "c6",
          "x": 3,
          "y": 6
        },
        "c7": {
          "colour": "dark",
          "pos": "c7",
          "x": 3,
          "y": 7
        },
        "d1": {
          "colour": "light",
          "pos": "d1",
          "x": 4,
          "y": 1
        },
        "d2": {
          "colour": "dark",
          "pos": "d2",
          "x": 4,
          "y": 2
        },
        "d3": {
          "colour": "light",
          "pos": "d3",
          "x": 4,
          "y": 3
        },
        "d4": {
          "colour": "dark",
          "pos": "d4",
          "x": 4,
          "y": 4
        },
        "d5": {
          "colour": "light",
          "pos": "d5",
          "x": 4,
          "y": 5
        },
        "d6": {
          "colour": "dark",
          "pos": "d6",
          "x": 4,
          "y": 6
        },
        "d7": {
          "colour": "light",
          "pos": "d7",
          "x": 4,
          "y": 7
        },
        "e1": {
          "colour": "dark",
          "pos": "e1",
          "x": 5,
          "y": 1
        },
        "e2": {
          "colour": "light",
          "pos": "e2",
          "x": 5,
          "y": 2
        },
        "e3": {
          "colour": "dark",
          "pos": "e3",
          "x": 5,
          "y": 3
        },
        "e4": {
          "colour": "light",
          "pos": "e4",
          "x": 5,
          "y": 4
        },
        "e5": {
          "colour": "dark",
          "pos": "e5",
          "x": 5,
          "y": 5
        },
        "e6": {
          "colour": "light",
          "pos": "e6",
          "x": 5,
          "y": 6
        },
        "e7": {
          "colour": "dark",
          "pos": "e7",
          "x": 5,
          "y": 7
        },
        "f1": {
          "colour": "light",
          "pos": "f1",
          "x": 6,
          "y": 1
        },
        "f2": {
          "colour": "dark",
          "pos": "f2",
          "x": 6,
          "y": 2
        },
        "f3": {
          "colour": "light",
          "pos": "f3",
          "x": 6,
          "y": 3
        },
        "f4": {
          "colour": "dark",
          "pos": "f4",
          "x": 6,
          "y": 4
        },
        "f5": {
          "colour": "light",
          "pos": "f5",
          "x": 6,
          "y": 5
        },
        "f6": {
          "colour": "dark",
          "pos": "f6",
          "x": 6,
          "y": 6
        },
        "f7": {
          "colour": "light",
          "pos": "f7",
          "x": 6,
          "y": 7
        },
        "g1": {
          "colour": "dark",
          "pos": "g1",
          "x": 7,
          "y": 1
        },
        "g2": {
          "colour": "light",
          "pos": "g2",
          "x": 7,
          "y": 2
        },
        "g3": {
          "colour": "dark",
          "pos": "g3",
          "x": 7,
          "y": 3
        },
        "g4": {
          "colour": "light",
          "pos": "g4",
          "x": 7,
          "y": 4
        },
        "g5": {
          "colour": "dark",
          "pos": "g5",
          "x": 7,
          "y": 5
        },
        "g6": {
          "colour": "light",
          "pos": "g6",
          "x": 7,
          "y": 6
        },
        "g7": {
          "colour": "dark",
          "pos": "g7",
          "x": 7,
          "y": 7
        },
        "h1": {
          "colour": "light",
          "pos": "h1",
          "x": 8,
          "y": 1
        },
        "h2": {
          "colour": "dark",
          "pos": "h2",
          "x": 8,
          "y": 2
        },
        "h3": {
          "colour": "light",
          "pos": "h3",
          "x": 8,
          "y": 3
        },
        "h4": {
          "colour": "dark",
          "pos": "h4",
          "x": 8,
          "y": 4
        },
        "h5": {
          "colour": "light",
          "pos": "h5",
          "x": 8,
          "y": 5
        },
        "h6": {
          "colour": "dark",
          "pos": "h6",
          "x": 8,
          "y": 6
        },
        "h7": {
          "colour": "light",
          "pos": "h7",
          "x": 8,
          "y": 7
        }
      },
      "light": {
        "a2": {
          "colour": "light",
          "pos": "a2",
          "x": 1,
          "y": 2
        },
        "a4": {
          "colour": "light",
          "pos": "a4",
          "x": 1,
          "y": 4
        },
        "a6": {
          "colour": "light",
          "pos": "a6",
          "x": 1,
          "y": 6
        },
        "b1": {
          "colour": "light",
          "pos": "b1",
          "x": 2,
          "y": 1
        },
        "b3": {
          "colour": "light",
          "pos": "b3",
          "x": 2,
          "y": 3
        },
        "b5": {
          "colour": "light",
          "pos": "b5",
          "x": 2,
          "y": 5
        },
        "b7": {
          "colour": "light",
          "pos": "b7",
          "x": 2,
          "y": 7
        },
        "c2": {
          "colour": "light",
          "pos": "c2",
          "x": 3,
          "y": 2
        },
        "c4": {
          "colour": "light",
          "pos": "c4",
          "x": 3,
          "y": 4
        },
        "c6": {
          "colour": "light",
          "pos": "c6",
          "x": 3,
          "y": 6
        },
        "d1": {
          "colour": "light",
          "pos": "d1",
          "x": 4,
          "y": 1
        },
        "d3": {
          "colour": "light",
          "pos": "d3",
          "x": 4,
          "y": 3
        },
        "d5": {
          "colour": "light",
          "pos": "d5",
          "x": 4,
          "y": 5
        },
        "d7": {
          "colour": "light",
          "pos": "d7",
          "x": 4,
          "y": 7
        },
        "e2": {
          "colour": "light",
          "pos": "e2",
          "x": 5,
          "y": 2
        },
        "e4": {
          "colour": "light",
          "pos": "e4",
          "x": 5,
          "y": 4
        },
        "e6": {
          "colour": "light",
          "pos": "e6",
          "x": 5,
          "y": 6
        },
        "f1": {
          "colour": "light",
          "pos": "f1",
          "x": 6,
          "y": 1
        },
        "f3": {
          "colour": "light",
          "pos": "f3",
          "x": 6,
          "y": 3
        },
        "f5": {
          "colour": "light",
          "pos": "f5",
          "x": 6,
          "y": 5
        },
        "f7": {
          "colour": "light",
          "pos": "f7",
          "x": 6,
          "y": 7
        },
        "g2": {
          "colour": "light",
          "pos": "g2",
          "x": 7,
          "y": 2
        },
        "g4": {
          "colour": "light",
          "pos": "g4",
          "x": 7,
          "y": 4
        },
        "g6": {
          "colour": "light",
          "pos": "g6",
          "x": 7,
          "y": 6
        },
        "h1": {
          "colour": "light",
          "pos": "h1",
          "x": 8,
          "y": 1
        },
        "h3": {
          "colour": "light",
          "pos": "h3",
          "x": 8,
          "y": 3
        },
        "h5": {
          "colour": "light",
          "pos": "h5",
          "x": 8,
          "y": 5
        },
        "h7": {
          "colour": "light",
          "pos": "h7",
          "x": 8,
          "y": 7
        }
      },
      "dark": {
        "a1": {
          "colour": "dark",
          "pos": "a1",
          "x": 1,
          "y": 1
        },
        "a3": {
          "colour": "dark",
          "pos": "a3",
          "x": 1,
          "y": 3
        },
        "a5": {
          "colour": "dark",
          "pos": "a5",
          "x": 1,
          "y": 5
        },
        "a7": {
          "colour": "dark",
          "pos": "a7",
          "x": 1,
          "y": 7
        },
        "b2": {
          "colour": "dark",
          "pos": "b2",
          "x": 2,
          "y": 2
        },
        "b4": {
          "colour": "dark",
          "pos": "b4",
          "x": 2,
          "y": 4
        },
        "b6": {
          "colour": "dark",
          "pos": "b6",
          "x": 2,
          "y": 6
        },
        "c1": {
          "colour": "dark",
          "pos": "c1",
          "x": 3,
          "y": 1
        },
        "c3": {
          "colour": "dark",
          "pos": "c3",
          "x": 3,
          "y": 3
        },
        "c5": {
          "colour": "dark",
          "pos": "c5",
          "x": 3,
          "y": 5
        },
        "c7": {
          "colour": "dark",
          "pos": "c7",
          "x": 3,
          "y": 7
        },
        "d2": {
          "colour": "dark",
          "pos": "d2",
          "x": 4,
          "y": 2
        },
        "d4": {
          "colour": "dark",
          "pos": "d4",
          "x": 4,
          "y": 4
        },
        "d6": {
          "colour": "dark",
          "pos": "d6",
          "x": 4,
          "y": 6
        },
        "e1": {
          "colour": "dark",
          "pos": "e1",
          "x": 5,
          "y": 1
        },
        "e3": {
          "colour": "dark",
          "pos": "e3",
          "x": 5,
          "y": 3
        },
        "e5": {
          "colour": "dark",
          "pos": "e5",
          "x": 5,
          "y": 5
        },
        "e7": {
          "colour": "dark",
          "pos": "e7",
          "x": 5,
          "y": 7
        },
        "f2": {
          "colour": "dark",
          "pos": "f2",
          "x": 6,
          "y": 2
        },
        "f4": {
          "colour": "dark",
          "pos": "f4",
          "x": 6,
          "y": 4
        },
        "f6": {
          "colour": "dark",
          "pos": "f6",
          "x": 6,
          "y": 6
        },
        "g1": {
          "colour": "dark",
          "pos": "g1",
          "x": 7,
          "y": 1
        },
        "g3": {
          "colour": "dark",
          "pos": "g3",
          "x": 7,
          "y": 3
        },
        "g5": {
          "colour": "dark",
          "pos": "g5",
          "x": 7,
          "y": 5
        },
        "g7": {
          "colour": "dark",
          "pos": "g7",
          "x": 7,
          "y": 7
        },
        "h2": {
          "colour": "dark",
          "pos": "h2",
          "x": 8,
          "y": 2
        },
        "h4": {
          "colour": "dark",
          "pos": "h4",
          "x": 8,
          "y": 4
        },
        "h6": {
          "colour": "dark",
          "pos": "h6",
          "x": 8,
          "y": 6
        }
      }
    };
    var relativedirs = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    (function() {
      var TERRAIN = {
        "homerow": {
          "a1": {
            "pos": "a1",
            "owner": 1
          },
          "b1": {
            "pos": "b1",
            "owner": 1
          },
          "c1": {
            "pos": "c1",
            "owner": 1
          },
          "d1": {
            "pos": "d1",
            "owner": 1
          },
          "e1": {
            "pos": "e1",
            "owner": 1
          },
          "f1": {
            "pos": "f1",
            "owner": 1
          },
          "g1": {
            "pos": "g1",
            "owner": 1
          },
          "h1": {
            "pos": "h1",
            "owner": 1
          },
          "a7": {
            "pos": "a7",
            "owner": 2
          },
          "b7": {
            "pos": "b7",
            "owner": 2
          },
          "c7": {
            "pos": "c7",
            "owner": 2
          },
          "d7": {
            "pos": "d7",
            "owner": 2
          },
          "e7": {
            "pos": "e7",
            "owner": 2
          },
          "f7": {
            "pos": "f7",
            "owner": 2
          },
          "g7": {
            "pos": "g7",
            "owner": 2
          },
          "h7": {
            "pos": "h7",
            "owner": 2
          }
        },
        "myhomerow": {
          "a1": {
            "pos": "a1",
            "owner": 1
          },
          "b1": {
            "pos": "b1",
            "owner": 1
          },
          "c1": {
            "pos": "c1",
            "owner": 1
          },
          "d1": {
            "pos": "d1",
            "owner": 1
          },
          "e1": {
            "pos": "e1",
            "owner": 1
          },
          "f1": {
            "pos": "f1",
            "owner": 1
          },
          "g1": {
            "pos": "g1",
            "owner": 1
          },
          "h1": {
            "pos": "h1",
            "owner": 1
          }
        },
        "opphomerow": {
          "a7": {
            "pos": "a7",
            "owner": 2
          },
          "b7": {
            "pos": "b7",
            "owner": 2
          },
          "c7": {
            "pos": "c7",
            "owner": 2
          },
          "d7": {
            "pos": "d7",
            "owner": 2
          },
          "e7": {
            "pos": "e7",
            "owner": 2
          },
          "f7": {
            "pos": "f7",
            "owner": 2
          },
          "g7": {
            "pos": "g7",
            "owner": 2
          },
          "h7": {
            "pos": "h7",
            "owner": 2
          }
        }
      };
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
      game.selecttower1 =
        function(turn, step, markpos) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
            movetargets: Object.assign({}, step.ARTIFACTS.movetargets),
            killtargets: Object.assign({}, step.ARTIFACTS.killtargets)
          });
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = {
            selecttower: markpos
          };
          var BLOCKS =
            (function() {
              var k, ret = {},
                s0 = UNITLAYERS.oppunits,
                s1 = UNITLAYERS.mycatapults;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }());
          var STARTPOS = MARKS['selecttower'];
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var DIR = allwalkerdirs[walkerdirnbr];
            var walkedsquares = [];
            var MAX = 2;
            var POS = STARTPOS;
            var LENGTH = 0;
            while (LENGTH < MAX && (POS = connections[POS][DIR]) && !BLOCKS[POS]) {
              walkedsquares.push(POS);
              LENGTH++;
            }
            var WALKLENGTH = walkedsquares.length;
            var STEP = 0;
            for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
              POS = walkedsquares[walkstepper];
              STEP++;
              if (((WALKLENGTH === 2) && (STEP === 2))) {
                ARTIFACTS['movetargets'][POS] = {
                  dir: DIR
                };
              }
            }
          }
          var STARTPOS = MARKS['selecttower'];
          var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          var startconnections = connections[STARTPOS];
          for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
            var POS = startconnections[neighbourdirs[dirnbr]];
            if (POS &&
              (function() {
                var k, ret = {},
                  s0 = UNITLAYERS.oppcatapults,
                  s1 = UNITLAYERS.oppwalls;
                for (k in s0) {
                  ret[k] = 1;
                }
                for (k in s1) {
                  ret[k] = 1;
                }
                return ret;
              }())[POS]) {
              ARTIFACTS['killtargets'][POS] = {};
            }
          } 
          var newstepid = step.stepid + '-' + markpos;
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            stepid: newstepid,
            path: step.path.concat(markpos),
            name: 'selecttower'
          });
          turn.links[newstepid] = {};
          var newlinks = turn.links[newstepid];
          for (var linkpos in ARTIFACTS.movetargets) {
            newlinks[linkpos] = 'selectmove1';
          }
          var newlinks = turn.links[newstepid];
          for (var linkpos in ARTIFACTS.killtargets) {
            newlinks[linkpos] = 'selectkill1';
          }
          return newstep;
        };
      game.selecttower1instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.selectmove1 =
        function(turn, step, markpos) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
            madecatapults: Object.assign({}, step.ARTIFACTS.madecatapults),
            madetowers: Object.assign({}, step.ARTIFACTS.madetowers),
            madewalls: Object.assign({}, step.ARTIFACTS.madewalls)
          });
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = {
            selectmove: markpos,
            selecttower: step.MARKS.selecttower
          };
          var STARTPOS = MARKS['selectmove'];
          var POS = connections[STARTPOS][relativedirs[(ARTIFACTS.movetargets[MARKS['selectmove']] || {})['dir'] - 2 + 5]];
          if (POS) {
            ARTIFACTS[(!!(UNITLAYERS.myunits[POS]) ? (!!(UNITLAYERS.mytowers[POS]) ? 'madecatapults' : 'madetowers') : 'madewalls')][POS] = {};
          }
          ARTIFACTS[(!!(UNITLAYERS.myunits[MARKS['selectmove']]) ? (!!(UNITLAYERS.mytowers[MARKS['selectmove']]) ? 'madecatapults' : 'madetowers') : 'madewalls')][STARTPOS] = {};
          var newstepid = step.stepid + '-' + markpos;
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            stepid: newstepid,
            path: step.path.concat(markpos),
            name: 'selectmove'
          });
          turn.links[newstepid] = {};
          turn.links[newstepid].move = 'move1';
          return newstep;
        };
      game.selectmove1instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.selectkill1 =
        function(turn, step, markpos) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = {
            selectkill: markpos,
            selecttower: step.MARKS.selecttower
          };
          var newstepid = step.stepid + '-' + markpos;
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            MARKS: MARKS,
            stepid: newstepid,
            path: step.path.concat(markpos),
            name: 'selectkill'
          });
          turn.links[newstepid] = {};
          turn.links[newstepid].kill = 'kill1';
          if (!!(UNITLAYERS.oppcatapults[MARKS['selectkill']])) {
            turn.links[newstepid].sacrifice = 'sacrifice1';
          }
          return newstep;
        };
      game.selectkill1instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.selectcatapult1 =
        function(turn, step, markpos) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
            firetargets: Object.assign({}, step.ARTIFACTS.firetargets)
          });
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = {
            selectcatapult: markpos
          };
          var STARTPOS = MARKS['selectcatapult'];
          var allwalkerdirs = [7, 8, 1, 2, 3];
          for (var walkerdirnbr = 0; walkerdirnbr < 5; walkerdirnbr++) {
            var MAX = 3;
            var POS = STARTPOS;
            var LENGTH = 0;
            var STEP = 0;
            while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]])) {
              LENGTH++;
              STEP++;
              if (((STEP > 1) && !(UNITLAYERS.myunits[POS]))) {
                ARTIFACTS['firetargets'][POS] = {};
              }
            }
          }
          var newstepid = step.stepid + '-' + markpos;
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            stepid: newstepid,
            path: step.path.concat(markpos),
            name: 'selectcatapult'
          });
          turn.links[newstepid] = {};
          var newlinks = turn.links[newstepid];
          for (var linkpos in ARTIFACTS.firetargets) {
            newlinks[linkpos] = 'selectfire1';
          }
          return newstep;
        };
      game.selectcatapult1instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.selectfire1 =
        function(turn, step, markpos) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = {
            selectfire: markpos,
            selectcatapult: step.MARKS.selectcatapult
          };
          var newstepid = step.stepid + '-' + markpos;
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            MARKS: MARKS,
            stepid: newstepid,
            path: step.path.concat(markpos),
            name: 'selectfire'
          });
          turn.links[newstepid] = {};
          turn.links[newstepid].fire = 'fire1';
          return newstep;
        };
      game.selectfire1instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.move1 =
        function(turn, step) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var clones = step.clones;
          var UNITLAYERS = step.UNITLAYERS;
          delete UNITDATA[(UNITLAYERS.units[MARKS['selecttower']]  || {}).id];
          for (var POS in ARTIFACTS.madecatapults) {
            var unitid = (UNITLAYERS.units[POS]  || {}).id;
            if (unitid) {
              UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
                'group': 'catapults'
              });
            }
          }
          for (var POS in ARTIFACTS.madetowers) {
            var unitid = (UNITLAYERS.units[POS]  || {}).id;
            if (unitid) {
              UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
                'group': 'towers'
              });
            }
          }
          for (var POS in ARTIFACTS.madewalls) {
            var newunitid = 'spawn' + (clones++);
            UNITDATA[newunitid] = {
              pos: POS,
              id: newunitid,
              group: 'walls',
              owner: 1,
              from: MARKS['selecttower']
            };
          }
          MARKS = {};
          UNITLAYERS = {
            "towers": {},
            "mytowers": {},
            "opptowers": {},
            "neutraltowers": {},
            "catapults": {},
            "mycatapults": {},
            "oppcatapults": {},
            "neutralcatapults": {},
            "walls": {},
            "mywalls": {},
            "oppwalls": {},
            "neutralwalls": {},
            "units": {},
            "myunits": {},
            "oppunits": {},
            "neutralunits": {}
          };
          for (var unitid in UNITDATA) {
            var currentunit = UNITDATA[unitid]
            var unitgroup = currentunit.group;
            var unitpos = currentunit.pos;
            var owner = ownernames[currentunit.owner]
            UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
          }
          ARTIFACTS = {
            "firetargets": {},
            "movetargets": {},
            "madecatapults": {},
            "madetowers": {},
            "madewalls": {},
            "killtargets": {}
          };
          var newstepid = step.stepid + '-' + 'move';
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            stepid: newstepid,
            name: 'move',
            path: step.path.concat('move'),
            clones: clones
          });
          turn.links[newstepid] = {};
          if (Object.keys(
              (function() {
                var ret = {},
                  s0 = UNITLAYERS.myunits,
                  s1 = TERRAIN.opphomerow;
                for (var key in s0) {
                  if (s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }()) ||  {}).length !== 0) {
            var winner = 1;
            var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'infiltration';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.move1instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.kill1 =
        function(turn, step) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var UNITLAYERS = step.UNITLAYERS;
          var unitid = (UNITLAYERS.units[MARKS['selecttower']]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'group': 'walls'
            });
          }
          if (!!(UNITLAYERS.oppcatapults[MARKS['selectkill']])) {
            var unitid = (UNITLAYERS.units[MARKS['selectkill']]  || {}).id;
            if (unitid) {
              UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
                'group': 'towers'
              });
            }
          } else {
            delete UNITDATA[(UNITLAYERS.units[MARKS['selectkill']]  || {}).id];
          }
          MARKS = {};
          UNITLAYERS = {
            "towers": {},
            "mytowers": {},
            "opptowers": {},
            "neutraltowers": {},
            "catapults": {},
            "mycatapults": {},
            "oppcatapults": {},
            "neutralcatapults": {},
            "walls": {},
            "mywalls": {},
            "oppwalls": {},
            "neutralwalls": {},
            "units": {},
            "myunits": {},
            "oppunits": {},
            "neutralunits": {}
          };
          for (var unitid in UNITDATA) {
            var currentunit = UNITDATA[unitid]
            var unitgroup = currentunit.group;
            var unitpos = currentunit.pos;
            var owner = ownernames[currentunit.owner]
            UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
          }
          ARTIFACTS = {
            "firetargets": {},
            "movetargets": {},
            "madecatapults": {},
            "madetowers": {},
            "madewalls": {},
            "killtargets": {}
          };
          var newstepid = step.stepid + '-' + 'kill';
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            stepid: newstepid,
            name: 'kill',
            path: step.path.concat('kill')
          });
          turn.links[newstepid] = {};
          if (Object.keys(
              (function() {
                var ret = {},
                  s0 = UNITLAYERS.myunits,
                  s1 = TERRAIN.opphomerow;
                for (var key in s0) {
                  if (s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }()) ||  {}).length !== 0) {
            var winner = 1;
            var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'infiltration';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.kill1instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.sacrifice1 =
        function(turn, step) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var UNITLAYERS = step.UNITLAYERS;
          var unitid = (UNITLAYERS.units[MARKS['selectkill']]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'group': 'walls'
            });
          }
          delete UNITDATA[(UNITLAYERS.units[MARKS['selecttower']]  || {}).id];
          MARKS = {};
          UNITLAYERS = {
            "towers": {},
            "mytowers": {},
            "opptowers": {},
            "neutraltowers": {},
            "catapults": {},
            "mycatapults": {},
            "oppcatapults": {},
            "neutralcatapults": {},
            "walls": {},
            "mywalls": {},
            "oppwalls": {},
            "neutralwalls": {},
            "units": {},
            "myunits": {},
            "oppunits": {},
            "neutralunits": {}
          };
          for (var unitid in UNITDATA) {
            var currentunit = UNITDATA[unitid]
            var unitgroup = currentunit.group;
            var unitpos = currentunit.pos;
            var owner = ownernames[currentunit.owner]
            UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
          }
          ARTIFACTS = {
            "firetargets": {},
            "movetargets": {},
            "madecatapults": {},
            "madetowers": {},
            "madewalls": {},
            "killtargets": {}
          };
          var newstepid = step.stepid + '-' + 'sacrifice';
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            stepid: newstepid,
            name: 'sacrifice',
            path: step.path.concat('sacrifice')
          });
          turn.links[newstepid] = {};
          if (Object.keys(
              (function() {
                var ret = {},
                  s0 = UNITLAYERS.myunits,
                  s1 = TERRAIN.opphomerow;
                for (var key in s0) {
                  if (s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }()) ||  {}).length !== 0) {
            var winner = 1;
            var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'infiltration';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.sacrifice1instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.fire1 =
        function(turn, step) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var clones = step.clones;
          var UNITLAYERS = step.UNITLAYERS;
          if (!!(UNITLAYERS.oppwalls[MARKS['selectfire']])) {
            delete UNITDATA[(UNITLAYERS.units[MARKS['selectfire']]  || {}).id];
          } else {
            if (!!(UNITLAYERS.oppunits[MARKS['selectfire']])) {
              var unitid = (UNITLAYERS.units[MARKS['selectfire']]  || {}).id;
              if (unitid) {
                UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
                  'group': (!!(UNITLAYERS.oppcatapults[MARKS['selectfire']]) ? 'towers' : 'walls')
                });
              }
            } else {
              var newunitid = 'spawn' + (clones++);
              UNITDATA[newunitid] = {
                pos: MARKS['selectfire'],
                id: newunitid,
                group: 'walls',
                owner: 1,
                from: MARKS['selectcatapult']
              };
            }
          }
          var unitid = (UNITLAYERS.units[MARKS['selectcatapult']]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'group': 'towers'
            });
          }
          MARKS = {};
          UNITLAYERS = {
            "towers": {},
            "mytowers": {},
            "opptowers": {},
            "neutraltowers": {},
            "catapults": {},
            "mycatapults": {},
            "oppcatapults": {},
            "neutralcatapults": {},
            "walls": {},
            "mywalls": {},
            "oppwalls": {},
            "neutralwalls": {},
            "units": {},
            "myunits": {},
            "oppunits": {},
            "neutralunits": {}
          };
          for (var unitid in UNITDATA) {
            var currentunit = UNITDATA[unitid]
            var unitgroup = currentunit.group;
            var unitpos = currentunit.pos;
            var owner = ownernames[currentunit.owner]
            UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
          }
          ARTIFACTS = {
            "firetargets": {},
            "movetargets": {},
            "madecatapults": {},
            "madetowers": {},
            "madewalls": {},
            "killtargets": {}
          };
          var newstepid = step.stepid + '-' + 'fire';
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            stepid: newstepid,
            name: 'fire',
            path: step.path.concat('fire'),
            clones: clones
          });
          turn.links[newstepid] = {};
          if (Object.keys(
              (function() {
                var ret = {},
                  s0 = UNITLAYERS.myunits,
                  s1 = TERRAIN.opphomerow;
                for (var key in s0) {
                  if (s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }()) ||  {}).length !== 0) {
            var winner = 1;
            var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'infiltration';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.fire1instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.start1 =
        function(turn, step) {
          var turn = {
            steps: {},
            player: player,
            turn: turn.turn + 1,
            links: {
              root: {}
            }
          };
          var MARKS = {};
          var ARTIFACTS = {
            "firetargets": {},
            "movetargets": {},
            "madecatapults": {},
            "madetowers": {},
            "madewalls": {},
            "killtargets": {}
          };
          var UNITDATA = step.UNITDATA;
          var UNITLAYERS = {
            "towers": {},
            "mytowers": {},
            "opptowers": {},
            "neutraltowers": {},
            "catapults": {},
            "mycatapults": {},
            "oppcatapults": {},
            "neutralcatapults": {},
            "walls": {},
            "mywalls": {},
            "oppwalls": {},
            "neutralwalls": {},
            "units": {},
            "myunits": {},
            "oppunits": {},
            "neutralunits": {}
          };
          for (var unitid in UNITDATA) {
            var currentunit = UNITDATA[unitid]
            var unitgroup = currentunit.group;
            var unitpos = currentunit.pos;
            var owner = ownernames[currentunit.owner]
            UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
          }
          var newstep = turn.steps.root = {
            ARTIFACTS: ARTIFACTS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            MARKS: MARKS,
            stepid: 'root',
            name: 'start',
            clones: step.clones,
            path: []
          };
          var newlinks = turn.links.root;
          for (var linkpos in UNITLAYERS.mytowers) {
            newlinks[linkpos] = 'selecttower1';
          }
          var newlinks = turn.links.root;
          for (var linkpos in UNITLAYERS.mycatapults) {
            newlinks[linkpos] = 'selectcatapult1';
          }
          return turn;
        };
      game.start1instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
    })();
    (function() {
      var TERRAIN = {
        "homerow": {
          "a1": {
            "pos": "a1",
            "owner": 1
          },
          "b1": {
            "pos": "b1",
            "owner": 1
          },
          "c1": {
            "pos": "c1",
            "owner": 1
          },
          "d1": {
            "pos": "d1",
            "owner": 1
          },
          "e1": {
            "pos": "e1",
            "owner": 1
          },
          "f1": {
            "pos": "f1",
            "owner": 1
          },
          "g1": {
            "pos": "g1",
            "owner": 1
          },
          "h1": {
            "pos": "h1",
            "owner": 1
          },
          "a7": {
            "pos": "a7",
            "owner": 2
          },
          "b7": {
            "pos": "b7",
            "owner": 2
          },
          "c7": {
            "pos": "c7",
            "owner": 2
          },
          "d7": {
            "pos": "d7",
            "owner": 2
          },
          "e7": {
            "pos": "e7",
            "owner": 2
          },
          "f7": {
            "pos": "f7",
            "owner": 2
          },
          "g7": {
            "pos": "g7",
            "owner": 2
          },
          "h7": {
            "pos": "h7",
            "owner": 2
          }
        },
        "opphomerow": {
          "a1": {
            "pos": "a1",
            "owner": 1
          },
          "b1": {
            "pos": "b1",
            "owner": 1
          },
          "c1": {
            "pos": "c1",
            "owner": 1
          },
          "d1": {
            "pos": "d1",
            "owner": 1
          },
          "e1": {
            "pos": "e1",
            "owner": 1
          },
          "f1": {
            "pos": "f1",
            "owner": 1
          },
          "g1": {
            "pos": "g1",
            "owner": 1
          },
          "h1": {
            "pos": "h1",
            "owner": 1
          }
        },
        "myhomerow": {
          "a7": {
            "pos": "a7",
            "owner": 2
          },
          "b7": {
            "pos": "b7",
            "owner": 2
          },
          "c7": {
            "pos": "c7",
            "owner": 2
          },
          "d7": {
            "pos": "d7",
            "owner": 2
          },
          "e7": {
            "pos": "e7",
            "owner": 2
          },
          "f7": {
            "pos": "f7",
            "owner": 2
          },
          "g7": {
            "pos": "g7",
            "owner": 2
          },
          "h7": {
            "pos": "h7",
            "owner": 2
          }
        }
      };
      var ownernames = ["neutral", "opp", "my"];
      var player = 2;
      var otherplayer = 1;
      game.selecttower2 =
        function(turn, step, markpos) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
            movetargets: Object.assign({}, step.ARTIFACTS.movetargets),
            killtargets: Object.assign({}, step.ARTIFACTS.killtargets)
          });
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = {
            selecttower: markpos
          };
          var BLOCKS =
            (function() {
              var k, ret = {},
                s0 = UNITLAYERS.oppunits,
                s1 = UNITLAYERS.mycatapults;
              for (k in s0) {
                ret[k] = 1;
              }
              for (k in s1) {
                ret[k] = 1;
              }
              return ret;
            }());
          var STARTPOS = MARKS['selecttower'];
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var DIR = allwalkerdirs[walkerdirnbr];
            var walkedsquares = [];
            var MAX = 2;
            var POS = STARTPOS;
            var LENGTH = 0;
            while (LENGTH < MAX && (POS = connections[POS][DIR]) && !BLOCKS[POS]) {
              walkedsquares.push(POS);
              LENGTH++;
            }
            var WALKLENGTH = walkedsquares.length;
            var STEP = 0;
            for (var walkstepper = 0; walkstepper < WALKLENGTH; walkstepper++) {
              POS = walkedsquares[walkstepper];
              STEP++;
              if (((WALKLENGTH === 2) && (STEP === 2))) {
                ARTIFACTS['movetargets'][POS] = {
                  dir: DIR
                };
              }
            }
          }
          var STARTPOS = MARKS['selecttower'];
          var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          var startconnections = connections[STARTPOS];
          for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
            var POS = startconnections[neighbourdirs[dirnbr]];
            if (POS &&
              (function() {
                var k, ret = {},
                  s0 = UNITLAYERS.oppcatapults,
                  s1 = UNITLAYERS.oppwalls;
                for (k in s0) {
                  ret[k] = 1;
                }
                for (k in s1) {
                  ret[k] = 1;
                }
                return ret;
              }())[POS]) {
              ARTIFACTS['killtargets'][POS] = {};
            }
          } 
          var newstepid = step.stepid + '-' + markpos;
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            stepid: newstepid,
            path: step.path.concat(markpos),
            name: 'selecttower'
          });
          turn.links[newstepid] = {};
          var newlinks = turn.links[newstepid];
          for (var linkpos in ARTIFACTS.movetargets) {
            newlinks[linkpos] = 'selectmove2';
          }
          var newlinks = turn.links[newstepid];
          for (var linkpos in ARTIFACTS.killtargets) {
            newlinks[linkpos] = 'selectkill2';
          }
          return newstep;
        };
      game.selecttower2instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.selectmove2 =
        function(turn, step, markpos) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
            madecatapults: Object.assign({}, step.ARTIFACTS.madecatapults),
            madetowers: Object.assign({}, step.ARTIFACTS.madetowers),
            madewalls: Object.assign({}, step.ARTIFACTS.madewalls)
          });
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = {
            selectmove: markpos,
            selecttower: step.MARKS.selecttower
          };
          var STARTPOS = MARKS['selectmove'];
          var POS = connections[STARTPOS][relativedirs[(ARTIFACTS.movetargets[MARKS['selectmove']] || {})['dir'] - 2 + 5]];
          if (POS) {
            ARTIFACTS[(!!(UNITLAYERS.myunits[POS]) ? (!!(UNITLAYERS.mytowers[POS]) ? 'madecatapults' : 'madetowers') : 'madewalls')][POS] = {};
          }
          ARTIFACTS[(!!(UNITLAYERS.myunits[MARKS['selectmove']]) ? (!!(UNITLAYERS.mytowers[MARKS['selectmove']]) ? 'madecatapults' : 'madetowers') : 'madewalls')][STARTPOS] = {};
          var newstepid = step.stepid + '-' + markpos;
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            stepid: newstepid,
            path: step.path.concat(markpos),
            name: 'selectmove'
          });
          turn.links[newstepid] = {};
          turn.links[newstepid].move = 'move2';
          return newstep;
        };
      game.selectmove2instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.selectkill2 =
        function(turn, step, markpos) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = {
            selectkill: markpos,
            selecttower: step.MARKS.selecttower
          };
          var newstepid = step.stepid + '-' + markpos;
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            MARKS: MARKS,
            stepid: newstepid,
            path: step.path.concat(markpos),
            name: 'selectkill'
          });
          turn.links[newstepid] = {};
          turn.links[newstepid].kill = 'kill2';
          if (!!(UNITLAYERS.oppcatapults[MARKS['selectkill']])) {
            turn.links[newstepid].sacrifice = 'sacrifice2';
          }
          return newstep;
        };
      game.selectkill2instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.selectcatapult2 =
        function(turn, step, markpos) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
            firetargets: Object.assign({}, step.ARTIFACTS.firetargets)
          });
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = {
            selectcatapult: markpos
          };
          var STARTPOS = MARKS['selectcatapult'];
          var allwalkerdirs = [3, 4, 5, 6, 7];
          for (var walkerdirnbr = 0; walkerdirnbr < 5; walkerdirnbr++) {
            var MAX = 3;
            var POS = STARTPOS;
            var LENGTH = 0;
            var STEP = 0;
            while (LENGTH < MAX && (POS = connections[POS][allwalkerdirs[walkerdirnbr]])) {
              LENGTH++;
              STEP++;
              if (((STEP > 1) && !(UNITLAYERS.myunits[POS]))) {
                ARTIFACTS['firetargets'][POS] = {};
              }
            }
          }
          var newstepid = step.stepid + '-' + markpos;
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            stepid: newstepid,
            path: step.path.concat(markpos),
            name: 'selectcatapult'
          });
          turn.links[newstepid] = {};
          var newlinks = turn.links[newstepid];
          for (var linkpos in ARTIFACTS.firetargets) {
            newlinks[linkpos] = 'selectfire2';
          }
          return newstep;
        };
      game.selectcatapult2instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.selectfire2 =
        function(turn, step, markpos) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = {
            selectfire: markpos,
            selectcatapult: step.MARKS.selectcatapult
          };
          var newstepid = step.stepid + '-' + markpos;
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            MARKS: MARKS,
            stepid: newstepid,
            path: step.path.concat(markpos),
            name: 'selectfire'
          });
          turn.links[newstepid] = {};
          turn.links[newstepid].fire = 'fire2';
          return newstep;
        };
      game.selectfire2instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.move2 =
        function(turn, step) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var clones = step.clones;
          var UNITLAYERS = step.UNITLAYERS;
          delete UNITDATA[(UNITLAYERS.units[MARKS['selecttower']]  || {}).id];
          for (var POS in ARTIFACTS.madecatapults) {
            var unitid = (UNITLAYERS.units[POS]  || {}).id;
            if (unitid) {
              UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
                'group': 'catapults'
              });
            }
          }
          for (var POS in ARTIFACTS.madetowers) {
            var unitid = (UNITLAYERS.units[POS]  || {}).id;
            if (unitid) {
              UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
                'group': 'towers'
              });
            }
          }
          for (var POS in ARTIFACTS.madewalls) {
            var newunitid = 'spawn' + (clones++);
            UNITDATA[newunitid] = {
              pos: POS,
              id: newunitid,
              group: 'walls',
              owner: 2,
              from: MARKS['selecttower']
            };
          }
          MARKS = {};
          UNITLAYERS = {
            "towers": {},
            "mytowers": {},
            "opptowers": {},
            "neutraltowers": {},
            "catapults": {},
            "mycatapults": {},
            "oppcatapults": {},
            "neutralcatapults": {},
            "walls": {},
            "mywalls": {},
            "oppwalls": {},
            "neutralwalls": {},
            "units": {},
            "myunits": {},
            "oppunits": {},
            "neutralunits": {}
          };
          for (var unitid in UNITDATA) {
            var currentunit = UNITDATA[unitid]
            var unitgroup = currentunit.group;
            var unitpos = currentunit.pos;
            var owner = ownernames[currentunit.owner]
            UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
          }
          ARTIFACTS = {
            "firetargets": {},
            "movetargets": {},
            "madecatapults": {},
            "madetowers": {},
            "madewalls": {},
            "killtargets": {}
          };
          var newstepid = step.stepid + '-' + 'move';
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            stepid: newstepid,
            name: 'move',
            path: step.path.concat('move'),
            clones: clones
          });
          turn.links[newstepid] = {};
          if (Object.keys(
              (function() {
                var ret = {},
                  s0 = UNITLAYERS.myunits,
                  s1 = TERRAIN.opphomerow;
                for (var key in s0) {
                  if (s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }()) ||  {}).length !== 0) {
            var winner = 2;
            var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'infiltration';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.move2instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.kill2 =
        function(turn, step) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var UNITLAYERS = step.UNITLAYERS;
          var unitid = (UNITLAYERS.units[MARKS['selecttower']]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'group': 'walls'
            });
          }
          if (!!(UNITLAYERS.oppcatapults[MARKS['selectkill']])) {
            var unitid = (UNITLAYERS.units[MARKS['selectkill']]  || {}).id;
            if (unitid) {
              UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
                'group': 'towers'
              });
            }
          } else {
            delete UNITDATA[(UNITLAYERS.units[MARKS['selectkill']]  || {}).id];
          }
          MARKS = {};
          UNITLAYERS = {
            "towers": {},
            "mytowers": {},
            "opptowers": {},
            "neutraltowers": {},
            "catapults": {},
            "mycatapults": {},
            "oppcatapults": {},
            "neutralcatapults": {},
            "walls": {},
            "mywalls": {},
            "oppwalls": {},
            "neutralwalls": {},
            "units": {},
            "myunits": {},
            "oppunits": {},
            "neutralunits": {}
          };
          for (var unitid in UNITDATA) {
            var currentunit = UNITDATA[unitid]
            var unitgroup = currentunit.group;
            var unitpos = currentunit.pos;
            var owner = ownernames[currentunit.owner]
            UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
          }
          ARTIFACTS = {
            "firetargets": {},
            "movetargets": {},
            "madecatapults": {},
            "madetowers": {},
            "madewalls": {},
            "killtargets": {}
          };
          var newstepid = step.stepid + '-' + 'kill';
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            stepid: newstepid,
            name: 'kill',
            path: step.path.concat('kill')
          });
          turn.links[newstepid] = {};
          if (Object.keys(
              (function() {
                var ret = {},
                  s0 = UNITLAYERS.myunits,
                  s1 = TERRAIN.opphomerow;
                for (var key in s0) {
                  if (s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }()) ||  {}).length !== 0) {
            var winner = 2;
            var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'infiltration';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.kill2instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.sacrifice2 =
        function(turn, step) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var UNITLAYERS = step.UNITLAYERS;
          var unitid = (UNITLAYERS.units[MARKS['selectkill']]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'group': 'walls'
            });
          }
          delete UNITDATA[(UNITLAYERS.units[MARKS['selecttower']]  || {}).id];
          MARKS = {};
          UNITLAYERS = {
            "towers": {},
            "mytowers": {},
            "opptowers": {},
            "neutraltowers": {},
            "catapults": {},
            "mycatapults": {},
            "oppcatapults": {},
            "neutralcatapults": {},
            "walls": {},
            "mywalls": {},
            "oppwalls": {},
            "neutralwalls": {},
            "units": {},
            "myunits": {},
            "oppunits": {},
            "neutralunits": {}
          };
          for (var unitid in UNITDATA) {
            var currentunit = UNITDATA[unitid]
            var unitgroup = currentunit.group;
            var unitpos = currentunit.pos;
            var owner = ownernames[currentunit.owner]
            UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
          }
          ARTIFACTS = {
            "firetargets": {},
            "movetargets": {},
            "madecatapults": {},
            "madetowers": {},
            "madewalls": {},
            "killtargets": {}
          };
          var newstepid = step.stepid + '-' + 'sacrifice';
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            stepid: newstepid,
            name: 'sacrifice',
            path: step.path.concat('sacrifice')
          });
          turn.links[newstepid] = {};
          if (Object.keys(
              (function() {
                var ret = {},
                  s0 = UNITLAYERS.myunits,
                  s1 = TERRAIN.opphomerow;
                for (var key in s0) {
                  if (s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }()) ||  {}).length !== 0) {
            var winner = 2;
            var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'infiltration';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.sacrifice2instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.fire2 =
        function(turn, step) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var clones = step.clones;
          var UNITLAYERS = step.UNITLAYERS;
          if (!!(UNITLAYERS.oppwalls[MARKS['selectfire']])) {
            delete UNITDATA[(UNITLAYERS.units[MARKS['selectfire']]  || {}).id];
          } else {
            if (!!(UNITLAYERS.oppunits[MARKS['selectfire']])) {
              var unitid = (UNITLAYERS.units[MARKS['selectfire']]  || {}).id;
              if (unitid) {
                UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
                  'group': (!!(UNITLAYERS.oppcatapults[MARKS['selectfire']]) ? 'towers' : 'walls')
                });
              }
            } else {
              var newunitid = 'spawn' + (clones++);
              UNITDATA[newunitid] = {
                pos: MARKS['selectfire'],
                id: newunitid,
                group: 'walls',
                owner: 2,
                from: MARKS['selectcatapult']
              };
            }
          }
          var unitid = (UNITLAYERS.units[MARKS['selectcatapult']]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'group': 'towers'
            });
          }
          MARKS = {};
          UNITLAYERS = {
            "towers": {},
            "mytowers": {},
            "opptowers": {},
            "neutraltowers": {},
            "catapults": {},
            "mycatapults": {},
            "oppcatapults": {},
            "neutralcatapults": {},
            "walls": {},
            "mywalls": {},
            "oppwalls": {},
            "neutralwalls": {},
            "units": {},
            "myunits": {},
            "oppunits": {},
            "neutralunits": {}
          };
          for (var unitid in UNITDATA) {
            var currentunit = UNITDATA[unitid]
            var unitgroup = currentunit.group;
            var unitpos = currentunit.pos;
            var owner = ownernames[currentunit.owner]
            UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
          }
          ARTIFACTS = {
            "firetargets": {},
            "movetargets": {},
            "madecatapults": {},
            "madetowers": {},
            "madewalls": {},
            "killtargets": {}
          };
          var newstepid = step.stepid + '-' + 'fire';
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            stepid: newstepid,
            name: 'fire',
            path: step.path.concat('fire'),
            clones: clones
          });
          turn.links[newstepid] = {};
          if (Object.keys(
              (function() {
                var ret = {},
                  s0 = UNITLAYERS.myunits,
                  s1 = TERRAIN.opphomerow;
                for (var key in s0) {
                  if (s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }()) ||  {}).length !== 0) {
            var winner = 2;
            var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'infiltration';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
        };
      game.fire2instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
      game.start2 =
        function(turn, step) {
          var turn = {
            steps: {},
            player: player,
            turn: turn.turn + 1,
            links: {
              root: {}
            }
          };
          var MARKS = {};
          var ARTIFACTS = {
            "firetargets": {},
            "movetargets": {},
            "madecatapults": {},
            "madetowers": {},
            "madewalls": {},
            "killtargets": {}
          };
          var UNITDATA = step.UNITDATA;
          var UNITLAYERS = {
            "towers": {},
            "mytowers": {},
            "opptowers": {},
            "neutraltowers": {},
            "catapults": {},
            "mycatapults": {},
            "oppcatapults": {},
            "neutralcatapults": {},
            "walls": {},
            "mywalls": {},
            "oppwalls": {},
            "neutralwalls": {},
            "units": {},
            "myunits": {},
            "oppunits": {},
            "neutralunits": {}
          };
          for (var unitid in UNITDATA) {
            var currentunit = UNITDATA[unitid]
            var unitgroup = currentunit.group;
            var unitpos = currentunit.pos;
            var owner = ownernames[currentunit.owner]
            UNITLAYERS.units[unitpos] = UNITLAYERS[unitgroup][unitpos] = UNITLAYERS[owner + unitgroup][unitpos] = UNITLAYERS[owner + 'units'][unitpos] = currentunit;
          }
          var newstep = turn.steps.root = {
            ARTIFACTS: ARTIFACTS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            MARKS: MARKS,
            stepid: 'root',
            name: 'start',
            clones: step.clones,
            path: []
          };
          var newlinks = turn.links.root;
          for (var linkpos in UNITLAYERS.mytowers) {
            newlinks[linkpos] = 'selecttower2';
          }
          var newlinks = turn.links.root;
          for (var linkpos in UNITLAYERS.mycatapults) {
            newlinks[linkpos] = 'selectcatapult2';
          }
          return turn;
        };
      game.start2instruction =
        function(step) {
          var MARKS = step.MARKS;
          var ARTIFACTS = step.ARTIFACTS;
          var UNITLAYERS = step.UNITLAYERS;
          var UNITDATA = step.UNITDATA;
          return ''
        };
    })();
    game.newGame =
      function() {
        var turnseed = {
          turn: 0
        };
        var stepseed = {
          UNITDATA: {
            "unit1": {
              "pos": "a1",
              "id": "unit1",
              "group": "towers",
              "owner": 1
            },
            "unit2": {
              "pos": "b1",
              "id": "unit2",
              "group": "towers",
              "owner": 1
            },
            "unit3": {
              "pos": "c1",
              "id": "unit3",
              "group": "towers",
              "owner": 1
            },
            "unit4": {
              "pos": "d1",
              "id": "unit4",
              "group": "towers",
              "owner": 1
            },
            "unit5": {
              "pos": "e1",
              "id": "unit5",
              "group": "towers",
              "owner": 1
            },
            "unit6": {
              "pos": "f1",
              "id": "unit6",
              "group": "towers",
              "owner": 1
            },
            "unit7": {
              "pos": "g1",
              "id": "unit7",
              "group": "towers",
              "owner": 1
            },
            "unit8": {
              "pos": "h1",
              "id": "unit8",
              "group": "towers",
              "owner": 1
            },
            "unit9": {
              "pos": "a7",
              "id": "unit9",
              "group": "towers",
              "owner": 2
            },
            "unit10": {
              "pos": "b7",
              "id": "unit10",
              "group": "towers",
              "owner": 2
            },
            "unit11": {
              "pos": "c7",
              "id": "unit11",
              "group": "towers",
              "owner": 2
            },
            "unit12": {
              "pos": "d7",
              "id": "unit12",
              "group": "towers",
              "owner": 2
            },
            "unit13": {
              "pos": "e7",
              "id": "unit13",
              "group": "towers",
              "owner": 2
            },
            "unit14": {
              "pos": "f7",
              "id": "unit14",
              "group": "towers",
              "owner": 2
            },
            "unit15": {
              "pos": "g7",
              "id": "unit15",
              "group": "towers",
              "owner": 2
            },
            "unit16": {
              "pos": "h7",
              "id": "unit16",
              "group": "towers",
              "owner": 2
            }
          }
          ,
          clones: 0
        };
        return game.start1(turnseed, stepseed);
      };
    game.commands = {
      "move": 1,
      "kill": 1,
      "sacrifice": 1,
      "fire": 1
    };
    game.graphics = {
      "tiles": {
        "homerow": "playercolour"
      },
      "icons": {
        "towers": "rooks",
        "walls": "pawns",
        "catapults": "queens"
      }
    };
    game.board = {
      "height": 7,
      "width": 8,
      "terrain": {
        "homerow": {
          "1": [
            ["rect", "a1", "h1"]
          ],
          "2": [
            ["rect", "a7", "h7"]
          ]
        }
      }
    };
    return game;
  }
)()