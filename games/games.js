
  module.exports = {
    amazon: (
  function() {
    var game = {};
    var connections = {
      "a1": {
        "1": "a2",
        "2": "b2",
        "3": "b1"
      },
      "a10": {
        "3": "b10",
        "4": "b9",
        "5": "a9"
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
        "1": "a8",
        "2": "b8",
        "3": "b7",
        "4": "b6",
        "5": "a6"
      },
      "a8": {
        "1": "a9",
        "2": "b9",
        "3": "b8",
        "4": "b7",
        "5": "a7"
      },
      "a9": {
        "1": "a10",
        "2": "b10",
        "3": "b9",
        "4": "b8",
        "5": "a8"
      },
      "b1": {
        "1": "b2",
        "2": "c2",
        "3": "c1",
        "7": "a1",
        "8": "a2"
      },
      "b10": {
        "3": "c10",
        "4": "c9",
        "5": "b9",
        "6": "a9",
        "7": "a10"
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
        "1": "b8",
        "2": "c8",
        "3": "c7",
        "4": "c6",
        "5": "b6",
        "6": "a6",
        "7": "a7",
        "8": "a8"
      },
      "b8": {
        "1": "b9",
        "2": "c9",
        "3": "c8",
        "4": "c7",
        "5": "b7",
        "6": "a7",
        "7": "a8",
        "8": "a9"
      },
      "b9": {
        "1": "b10",
        "2": "c10",
        "3": "c9",
        "4": "c8",
        "5": "b8",
        "6": "a8",
        "7": "a9",
        "8": "a10"
      },
      "c1": {
        "1": "c2",
        "2": "d2",
        "3": "d1",
        "7": "b1",
        "8": "b2"
      },
      "c10": {
        "3": "d10",
        "4": "d9",
        "5": "c9",
        "6": "b9",
        "7": "b10"
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
        "1": "c8",
        "2": "d8",
        "3": "d7",
        "4": "d6",
        "5": "c6",
        "6": "b6",
        "7": "b7",
        "8": "b8"
      },
      "c8": {
        "1": "c9",
        "2": "d9",
        "3": "d8",
        "4": "d7",
        "5": "c7",
        "6": "b7",
        "7": "b8",
        "8": "b9"
      },
      "c9": {
        "1": "c10",
        "2": "d10",
        "3": "d9",
        "4": "d8",
        "5": "c8",
        "6": "b8",
        "7": "b9",
        "8": "b10"
      },
      "d1": {
        "1": "d2",
        "2": "e2",
        "3": "e1",
        "7": "c1",
        "8": "c2"
      },
      "d10": {
        "3": "e10",
        "4": "e9",
        "5": "d9",
        "6": "c9",
        "7": "c10"
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
        "1": "d8",
        "2": "e8",
        "3": "e7",
        "4": "e6",
        "5": "d6",
        "6": "c6",
        "7": "c7",
        "8": "c8"
      },
      "d8": {
        "1": "d9",
        "2": "e9",
        "3": "e8",
        "4": "e7",
        "5": "d7",
        "6": "c7",
        "7": "c8",
        "8": "c9"
      },
      "d9": {
        "1": "d10",
        "2": "e10",
        "3": "e9",
        "4": "e8",
        "5": "d8",
        "6": "c8",
        "7": "c9",
        "8": "c10"
      },
      "e1": {
        "1": "e2",
        "2": "f2",
        "3": "f1",
        "7": "d1",
        "8": "d2"
      },
      "e10": {
        "3": "f10",
        "4": "f9",
        "5": "e9",
        "6": "d9",
        "7": "d10"
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
        "1": "e8",
        "2": "f8",
        "3": "f7",
        "4": "f6",
        "5": "e6",
        "6": "d6",
        "7": "d7",
        "8": "d8"
      },
      "e8": {
        "1": "e9",
        "2": "f9",
        "3": "f8",
        "4": "f7",
        "5": "e7",
        "6": "d7",
        "7": "d8",
        "8": "d9"
      },
      "e9": {
        "1": "e10",
        "2": "f10",
        "3": "f9",
        "4": "f8",
        "5": "e8",
        "6": "d8",
        "7": "d9",
        "8": "d10"
      },
      "f1": {
        "1": "f2",
        "2": "g2",
        "3": "g1",
        "7": "e1",
        "8": "e2"
      },
      "f10": {
        "3": "g10",
        "4": "g9",
        "5": "f9",
        "6": "e9",
        "7": "e10"
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
        "1": "f8",
        "2": "g8",
        "3": "g7",
        "4": "g6",
        "5": "f6",
        "6": "e6",
        "7": "e7",
        "8": "e8"
      },
      "f8": {
        "1": "f9",
        "2": "g9",
        "3": "g8",
        "4": "g7",
        "5": "f7",
        "6": "e7",
        "7": "e8",
        "8": "e9"
      },
      "f9": {
        "1": "f10",
        "2": "g10",
        "3": "g9",
        "4": "g8",
        "5": "f8",
        "6": "e8",
        "7": "e9",
        "8": "e10"
      },
      "g1": {
        "1": "g2",
        "2": "h2",
        "3": "h1",
        "7": "f1",
        "8": "f2"
      },
      "g10": {
        "3": "h10",
        "4": "h9",
        "5": "g9",
        "6": "f9",
        "7": "f10"
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
        "1": "g8",
        "2": "h8",
        "3": "h7",
        "4": "h6",
        "5": "g6",
        "6": "f6",
        "7": "f7",
        "8": "f8"
      },
      "g8": {
        "1": "g9",
        "2": "h9",
        "3": "h8",
        "4": "h7",
        "5": "g7",
        "6": "f7",
        "7": "f8",
        "8": "f9"
      },
      "g9": {
        "1": "g10",
        "2": "h10",
        "3": "h9",
        "4": "h8",
        "5": "g8",
        "6": "f8",
        "7": "f9",
        "8": "f10"
      },
      "h1": {
        "1": "h2",
        "2": "i2",
        "3": "i1",
        "7": "g1",
        "8": "g2"
      },
      "h10": {
        "3": "i10",
        "4": "i9",
        "5": "h9",
        "6": "g9",
        "7": "g10"
      },
      "h2": {
        "1": "h3",
        "2": "i3",
        "3": "i2",
        "4": "i1",
        "5": "h1",
        "6": "g1",
        "7": "g2",
        "8": "g3"
      },
      "h3": {
        "1": "h4",
        "2": "i4",
        "3": "i3",
        "4": "i2",
        "5": "h2",
        "6": "g2",
        "7": "g3",
        "8": "g4"
      },
      "h4": {
        "1": "h5",
        "2": "i5",
        "3": "i4",
        "4": "i3",
        "5": "h3",
        "6": "g3",
        "7": "g4",
        "8": "g5"
      },
      "h5": {
        "1": "h6",
        "2": "i6",
        "3": "i5",
        "4": "i4",
        "5": "h4",
        "6": "g4",
        "7": "g5",
        "8": "g6"
      },
      "h6": {
        "1": "h7",
        "2": "i7",
        "3": "i6",
        "4": "i5",
        "5": "h5",
        "6": "g5",
        "7": "g6",
        "8": "g7"
      },
      "h7": {
        "1": "h8",
        "2": "i8",
        "3": "i7",
        "4": "i6",
        "5": "h6",
        "6": "g6",
        "7": "g7",
        "8": "g8"
      },
      "h8": {
        "1": "h9",
        "2": "i9",
        "3": "i8",
        "4": "i7",
        "5": "h7",
        "6": "g7",
        "7": "g8",
        "8": "g9"
      },
      "h9": {
        "1": "h10",
        "2": "i10",
        "3": "i9",
        "4": "i8",
        "5": "h8",
        "6": "g8",
        "7": "g9",
        "8": "g10"
      },
      "i1": {
        "1": "i2",
        "2": "j2",
        "3": "j1",
        "7": "h1",
        "8": "h2"
      },
      "i10": {
        "3": "j10",
        "4": "j9",
        "5": "i9",
        "6": "h9",
        "7": "h10"
      },
      "i2": {
        "1": "i3",
        "2": "j3",
        "3": "j2",
        "4": "j1",
        "5": "i1",
        "6": "h1",
        "7": "h2",
        "8": "h3"
      },
      "i3": {
        "1": "i4",
        "2": "j4",
        "3": "j3",
        "4": "j2",
        "5": "i2",
        "6": "h2",
        "7": "h3",
        "8": "h4"
      },
      "i4": {
        "1": "i5",
        "2": "j5",
        "3": "j4",
        "4": "j3",
        "5": "i3",
        "6": "h3",
        "7": "h4",
        "8": "h5"
      },
      "i5": {
        "1": "i6",
        "2": "j6",
        "3": "j5",
        "4": "j4",
        "5": "i4",
        "6": "h4",
        "7": "h5",
        "8": "h6"
      },
      "i6": {
        "1": "i7",
        "2": "j7",
        "3": "j6",
        "4": "j5",
        "5": "i5",
        "6": "h5",
        "7": "h6",
        "8": "h7"
      },
      "i7": {
        "1": "i8",
        "2": "j8",
        "3": "j7",
        "4": "j6",
        "5": "i6",
        "6": "h6",
        "7": "h7",
        "8": "h8"
      },
      "i8": {
        "1": "i9",
        "2": "j9",
        "3": "j8",
        "4": "j7",
        "5": "i7",
        "6": "h7",
        "7": "h8",
        "8": "h9"
      },
      "i9": {
        "1": "i10",
        "2": "j10",
        "3": "j9",
        "4": "j8",
        "5": "i8",
        "6": "h8",
        "7": "h9",
        "8": "h10"
      },
      "j1": {
        "1": "j2",
        "7": "i1",
        "8": "i2"
      },
      "j10": {
        "5": "j9",
        "6": "i9",
        "7": "i10"
      },
      "j2": {
        "1": "j3",
        "5": "j1",
        "6": "i1",
        "7": "i2",
        "8": "i3"
      },
      "j3": {
        "1": "j4",
        "5": "j2",
        "6": "i2",
        "7": "i3",
        "8": "i4"
      },
      "j4": {
        "1": "j5",
        "5": "j3",
        "6": "i3",
        "7": "i4",
        "8": "i5"
      },
      "j5": {
        "1": "j6",
        "5": "j4",
        "6": "i4",
        "7": "i5",
        "8": "i6"
      },
      "j6": {
        "1": "j7",
        "5": "j5",
        "6": "i5",
        "7": "i6",
        "8": "i7"
      },
      "j7": {
        "1": "j8",
        "5": "j6",
        "6": "i6",
        "7": "i7",
        "8": "i8"
      },
      "j8": {
        "1": "j9",
        "5": "j7",
        "6": "i7",
        "7": "i8",
        "8": "i9"
      },
      "j9": {
        "1": "j10",
        "5": "j8",
        "6": "i8",
        "7": "i9",
        "8": "i10"
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
        "a10": {
          "colour": "light",
          "pos": "a10",
          "x": 1,
          "y": 10
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
        "a8": {
          "colour": "light",
          "pos": "a8",
          "x": 1,
          "y": 8
        },
        "a9": {
          "colour": "dark",
          "pos": "a9",
          "x": 1,
          "y": 9
        },
        "b1": {
          "colour": "light",
          "pos": "b1",
          "x": 2,
          "y": 1
        },
        "b10": {
          "colour": "dark",
          "pos": "b10",
          "x": 2,
          "y": 10
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
        "b8": {
          "colour": "dark",
          "pos": "b8",
          "x": 2,
          "y": 8
        },
        "b9": {
          "colour": "light",
          "pos": "b9",
          "x": 2,
          "y": 9
        },
        "c1": {
          "colour": "dark",
          "pos": "c1",
          "x": 3,
          "y": 1
        },
        "c10": {
          "colour": "light",
          "pos": "c10",
          "x": 3,
          "y": 10
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
        "c8": {
          "colour": "light",
          "pos": "c8",
          "x": 3,
          "y": 8
        },
        "c9": {
          "colour": "dark",
          "pos": "c9",
          "x": 3,
          "y": 9
        },
        "d1": {
          "colour": "light",
          "pos": "d1",
          "x": 4,
          "y": 1
        },
        "d10": {
          "colour": "dark",
          "pos": "d10",
          "x": 4,
          "y": 10
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
        "d8": {
          "colour": "dark",
          "pos": "d8",
          "x": 4,
          "y": 8
        },
        "d9": {
          "colour": "light",
          "pos": "d9",
          "x": 4,
          "y": 9
        },
        "e1": {
          "colour": "dark",
          "pos": "e1",
          "x": 5,
          "y": 1
        },
        "e10": {
          "colour": "light",
          "pos": "e10",
          "x": 5,
          "y": 10
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
        "e8": {
          "colour": "light",
          "pos": "e8",
          "x": 5,
          "y": 8
        },
        "e9": {
          "colour": "dark",
          "pos": "e9",
          "x": 5,
          "y": 9
        },
        "f1": {
          "colour": "light",
          "pos": "f1",
          "x": 6,
          "y": 1
        },
        "f10": {
          "colour": "dark",
          "pos": "f10",
          "x": 6,
          "y": 10
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
        "f8": {
          "colour": "dark",
          "pos": "f8",
          "x": 6,
          "y": 8
        },
        "f9": {
          "colour": "light",
          "pos": "f9",
          "x": 6,
          "y": 9
        },
        "g1": {
          "colour": "dark",
          "pos": "g1",
          "x": 7,
          "y": 1
        },
        "g10": {
          "colour": "light",
          "pos": "g10",
          "x": 7,
          "y": 10
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
        "g8": {
          "colour": "light",
          "pos": "g8",
          "x": 7,
          "y": 8
        },
        "g9": {
          "colour": "dark",
          "pos": "g9",
          "x": 7,
          "y": 9
        },
        "h1": {
          "colour": "light",
          "pos": "h1",
          "x": 8,
          "y": 1
        },
        "h10": {
          "colour": "dark",
          "pos": "h10",
          "x": 8,
          "y": 10
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
        },
        "h8": {
          "colour": "dark",
          "pos": "h8",
          "x": 8,
          "y": 8
        },
        "h9": {
          "colour": "light",
          "pos": "h9",
          "x": 8,
          "y": 9
        },
        "i1": {
          "colour": "dark",
          "pos": "i1",
          "x": 9,
          "y": 1
        },
        "i10": {
          "colour": "light",
          "pos": "i10",
          "x": 9,
          "y": 10
        },
        "i2": {
          "colour": "light",
          "pos": "i2",
          "x": 9,
          "y": 2
        },
        "i3": {
          "colour": "dark",
          "pos": "i3",
          "x": 9,
          "y": 3
        },
        "i4": {
          "colour": "light",
          "pos": "i4",
          "x": 9,
          "y": 4
        },
        "i5": {
          "colour": "dark",
          "pos": "i5",
          "x": 9,
          "y": 5
        },
        "i6": {
          "colour": "light",
          "pos": "i6",
          "x": 9,
          "y": 6
        },
        "i7": {
          "colour": "dark",
          "pos": "i7",
          "x": 9,
          "y": 7
        },
        "i8": {
          "colour": "light",
          "pos": "i8",
          "x": 9,
          "y": 8
        },
        "i9": {
          "colour": "dark",
          "pos": "i9",
          "x": 9,
          "y": 9
        },
        "j1": {
          "colour": "light",
          "pos": "j1",
          "x": 10,
          "y": 1
        },
        "j10": {
          "colour": "dark",
          "pos": "j10",
          "x": 10,
          "y": 10
        },
        "j2": {
          "colour": "dark",
          "pos": "j2",
          "x": 10,
          "y": 2
        },
        "j3": {
          "colour": "light",
          "pos": "j3",
          "x": 10,
          "y": 3
        },
        "j4": {
          "colour": "dark",
          "pos": "j4",
          "x": 10,
          "y": 4
        },
        "j5": {
          "colour": "light",
          "pos": "j5",
          "x": 10,
          "y": 5
        },
        "j6": {
          "colour": "dark",
          "pos": "j6",
          "x": 10,
          "y": 6
        },
        "j7": {
          "colour": "light",
          "pos": "j7",
          "x": 10,
          "y": 7
        },
        "j8": {
          "colour": "dark",
          "pos": "j8",
          "x": 10,
          "y": 8
        },
        "j9": {
          "colour": "light",
          "pos": "j9",
          "x": 10,
          "y": 9
        }
      },
      "light": {
        "a10": {
          "colour": "light",
          "pos": "a10",
          "x": 1,
          "y": 10
        },
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
        "a8": {
          "colour": "light",
          "pos": "a8",
          "x": 1,
          "y": 8
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
        "b9": {
          "colour": "light",
          "pos": "b9",
          "x": 2,
          "y": 9
        },
        "c10": {
          "colour": "light",
          "pos": "c10",
          "x": 3,
          "y": 10
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
        "c8": {
          "colour": "light",
          "pos": "c8",
          "x": 3,
          "y": 8
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
        "d9": {
          "colour": "light",
          "pos": "d9",
          "x": 4,
          "y": 9
        },
        "e10": {
          "colour": "light",
          "pos": "e10",
          "x": 5,
          "y": 10
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
        "e8": {
          "colour": "light",
          "pos": "e8",
          "x": 5,
          "y": 8
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
        "f9": {
          "colour": "light",
          "pos": "f9",
          "x": 6,
          "y": 9
        },
        "g10": {
          "colour": "light",
          "pos": "g10",
          "x": 7,
          "y": 10
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
        "g8": {
          "colour": "light",
          "pos": "g8",
          "x": 7,
          "y": 8
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
        },
        "h9": {
          "colour": "light",
          "pos": "h9",
          "x": 8,
          "y": 9
        },
        "i10": {
          "colour": "light",
          "pos": "i10",
          "x": 9,
          "y": 10
        },
        "i2": {
          "colour": "light",
          "pos": "i2",
          "x": 9,
          "y": 2
        },
        "i4": {
          "colour": "light",
          "pos": "i4",
          "x": 9,
          "y": 4
        },
        "i6": {
          "colour": "light",
          "pos": "i6",
          "x": 9,
          "y": 6
        },
        "i8": {
          "colour": "light",
          "pos": "i8",
          "x": 9,
          "y": 8
        },
        "j1": {
          "colour": "light",
          "pos": "j1",
          "x": 10,
          "y": 1
        },
        "j3": {
          "colour": "light",
          "pos": "j3",
          "x": 10,
          "y": 3
        },
        "j5": {
          "colour": "light",
          "pos": "j5",
          "x": 10,
          "y": 5
        },
        "j7": {
          "colour": "light",
          "pos": "j7",
          "x": 10,
          "y": 7
        },
        "j9": {
          "colour": "light",
          "pos": "j9",
          "x": 10,
          "y": 9
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
        "a9": {
          "colour": "dark",
          "pos": "a9",
          "x": 1,
          "y": 9
        },
        "b10": {
          "colour": "dark",
          "pos": "b10",
          "x": 2,
          "y": 10
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
        "b8": {
          "colour": "dark",
          "pos": "b8",
          "x": 2,
          "y": 8
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
        "c9": {
          "colour": "dark",
          "pos": "c9",
          "x": 3,
          "y": 9
        },
        "d10": {
          "colour": "dark",
          "pos": "d10",
          "x": 4,
          "y": 10
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
        "d8": {
          "colour": "dark",
          "pos": "d8",
          "x": 4,
          "y": 8
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
        "e9": {
          "colour": "dark",
          "pos": "e9",
          "x": 5,
          "y": 9
        },
        "f10": {
          "colour": "dark",
          "pos": "f10",
          "x": 6,
          "y": 10
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
        "f8": {
          "colour": "dark",
          "pos": "f8",
          "x": 6,
          "y": 8
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
        "g9": {
          "colour": "dark",
          "pos": "g9",
          "x": 7,
          "y": 9
        },
        "h10": {
          "colour": "dark",
          "pos": "h10",
          "x": 8,
          "y": 10
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
        },
        "h8": {
          "colour": "dark",
          "pos": "h8",
          "x": 8,
          "y": 8
        },
        "i1": {
          "colour": "dark",
          "pos": "i1",
          "x": 9,
          "y": 1
        },
        "i3": {
          "colour": "dark",
          "pos": "i3",
          "x": 9,
          "y": 3
        },
        "i5": {
          "colour": "dark",
          "pos": "i5",
          "x": 9,
          "y": 5
        },
        "i7": {
          "colour": "dark",
          "pos": "i7",
          "x": 9,
          "y": 7
        },
        "i9": {
          "colour": "dark",
          "pos": "i9",
          "x": 9,
          "y": 9
        },
        "j10": {
          "colour": "dark",
          "pos": "j10",
          "x": 10,
          "y": 10
        },
        "j2": {
          "colour": "dark",
          "pos": "j2",
          "x": 10,
          "y": 2
        },
        "j4": {
          "colour": "dark",
          "pos": "j4",
          "x": 10,
          "y": 4
        },
        "j6": {
          "colour": "dark",
          "pos": "j6",
          "x": 10,
          "y": 6
        },
        "j8": {
          "colour": "dark",
          "pos": "j8",
          "x": 10,
          "y": 8
        }
      }
    };
    var TERRAIN = {};
    (function() {
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
      game.selectunit1 =
        function(turn, step, markpos) {
          var ARTIFACTS = {
            targets: Object.assign({}, step.ARTIFACTS.targets)
          };
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = Object.assign({}, step.MARKS, {
            selectunit: markpos
          });
          var STARTPOS = MARKS['selectunit'];
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var STOPREASON = "";
            var nextpos = "";
            var POS = STARTPOS;
            var BLOCKS = UNITLAYERS.units;
            while (!(STOPREASON = (!(nextpos = connections[POS][allwalkerdirs[walkerdirnbr]]) ? "outofbounds" : BLOCKS[nextpos] ? "hitblock" : null))) {
              walkedsquares.push(POS = nextpos);
              ARTIFACTS['targets'][POS] = {};
            }
            var WALKLENGTH = walkedsquares.length;
          }
          var newstepid = step.stepid + '-' + markpos;
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            stepid: newstepid,
            path: step.path.concat(markpos)
          });
          turn.links[newstepid] = {};
          var linkedpositions = Object.keys(ARTIFACTS.targets);
          var nbrofpositions = linkedpositions.length;
          for (var linknbr = 0; linknbr < nbrofpositions; linknbr++) {
            turn.links[newstepid][linkedpositions[linknbr]] = 'selectmovetarget1';
          }
          return newstep;
        };
      game.selectmovetarget1 =
        function(turn, step, markpos) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = Object.assign({}, step.MARKS, {
            selectmovetarget: markpos
          });
          var newstepid = step.stepid + '-' + markpos;
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            MARKS: MARKS,
            stepid: newstepid,
            path: step.path.concat(markpos)
          });
          turn.links[newstepid] = {};
          turn.links[newstepid].move = 'move1';
          return newstep;
        };
      game.selectfiretarget1 =
        function(turn, step, markpos) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = Object.assign({}, step.MARKS, {
            selectfiretarget: markpos
          });
          var newstepid = step.stepid + '-' + markpos;
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            MARKS: MARKS,
            stepid: newstepid,
            path: step.path.concat(markpos)
          });
          turn.links[newstepid] = {};
          turn.links[newstepid].fire = 'fire1';
          return newstep;
        };
      game.move1 =
        function(turn, step) {
          var ARTIFACTS = {
            targets: Object.assign({}, step.ARTIFACTS.targets)
          };
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var UNITLAYERS = step.UNITLAYERS;
          var TURNVARS = Object.assign({}, step.TURNVARS);
          var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'pos': MARKS['selectmovetarget']
            });
          }
          TURNVARS['movedto'] = MARKS['selectmovetarget'];
          MARKS = {};
          UNITLAYERS = {
            "queens": {},
            "myqueens": {},
            "oppqueens": {},
            "neutralqueens": {},
            "fires": {},
            "myfires": {},
            "oppfires": {},
            "neutralfires": {},
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
            "targets": {}
          };
          var STARTPOS = TURNVARS['movedto'];
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var STOPREASON = "";
            var nextpos = "";
            var POS = STARTPOS;
            var BLOCKS = UNITLAYERS.units;
            while (!(STOPREASON = (!(nextpos = connections[POS][allwalkerdirs[walkerdirnbr]]) ? "outofbounds" : BLOCKS[nextpos] ? "hitblock" : null))) {
              walkedsquares.push(POS = nextpos);
              ARTIFACTS['targets'][POS] = {};
            }
            var WALKLENGTH = walkedsquares.length;
          }
          var newstepid = step.stepid + '-' + 'move';
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            stepid: newstepid,
            path: step.path.concat('move')
          });
          turn.links[newstepid] = {};
          var linkedpositions = Object.keys(ARTIFACTS.targets);
          var nbrofpositions = linkedpositions.length;
          for (var linknbr = 0; linknbr < nbrofpositions; linknbr++) {
            turn.links[newstepid][linkedpositions[linknbr]] = 'selectfiretarget1';
          }
          return newstep;
        };
      game.fire1 =
        function(turn, step) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var clones = step.clones;
          var UNITLAYERS = step.UNITLAYERS;
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: MARKS['selectfiretarget'],
            id: newunitid,
            group: 'fires',
            owner: 0
          };
          MARKS = {};
          UNITLAYERS = {
            "queens": {},
            "myqueens": {},
            "oppqueens": {},
            "neutralqueens": {},
            "fires": {},
            "myfires": {},
            "oppfires": {},
            "neutralfires": {},
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
            "targets": {}
          };
          var newstepid = step.stepid + '-' + 'fire';
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            stepid: newstepid,
            path: step.path.concat('fire'),
            clones: clones
          });
          turn.links[newstepid] = {};
          turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
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
            "targets": {}
          };
          var UNITDATA = step.UNITDATA;
          var TURNVARS = step.TURNVARS;
          var UNITLAYERS = {
            "queens": {},
            "myqueens": {},
            "oppqueens": {},
            "neutralqueens": {},
            "fires": {},
            "myfires": {},
            "oppfires": {},
            "neutralfires": {},
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
            clones: step.clones,
            path: []
          };
          var linkedpositions = Object.keys(UNITLAYERS.myunits);
          var nbrofpositions = linkedpositions.length;
          for (var linknbr = 0; linknbr < nbrofpositions; linknbr++) {
            turn.links.root[linkedpositions[linknbr]] = 'selectunit1';
          }
          return turn;
        };
    })();
    (function() {
      var ownernames = ["neutral", "opp", "my"];
      var player = 2;
      var otherplayer = 1;
      game.selectunit2 =
        function(turn, step, markpos) {
          var ARTIFACTS = {
            targets: Object.assign({}, step.ARTIFACTS.targets)
          };
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = Object.assign({}, step.MARKS, {
            selectunit: markpos
          });
          var STARTPOS = MARKS['selectunit'];
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var STOPREASON = "";
            var nextpos = "";
            var POS = STARTPOS;
            var BLOCKS = UNITLAYERS.units;
            while (!(STOPREASON = (!(nextpos = connections[POS][allwalkerdirs[walkerdirnbr]]) ? "outofbounds" : BLOCKS[nextpos] ? "hitblock" : null))) {
              walkedsquares.push(POS = nextpos);
              ARTIFACTS['targets'][POS] = {};
            }
            var WALKLENGTH = walkedsquares.length;
          }
          var newstepid = step.stepid + '-' + markpos;
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            stepid: newstepid,
            path: step.path.concat(markpos)
          });
          turn.links[newstepid] = {};
          var linkedpositions = Object.keys(ARTIFACTS.targets);
          var nbrofpositions = linkedpositions.length;
          for (var linknbr = 0; linknbr < nbrofpositions; linknbr++) {
            turn.links[newstepid][linkedpositions[linknbr]] = 'selectmovetarget2';
          }
          return newstep;
        };
      game.selectmovetarget2 =
        function(turn, step, markpos) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = Object.assign({}, step.MARKS, {
            selectmovetarget: markpos
          });
          var newstepid = step.stepid + '-' + markpos;
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            MARKS: MARKS,
            stepid: newstepid,
            path: step.path.concat(markpos)
          });
          turn.links[newstepid] = {};
          turn.links[newstepid].move = 'move2';
          return newstep;
        };
      game.selectfiretarget2 =
        function(turn, step, markpos) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = Object.assign({}, step.MARKS, {
            selectfiretarget: markpos
          });
          var newstepid = step.stepid + '-' + markpos;
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            MARKS: MARKS,
            stepid: newstepid,
            path: step.path.concat(markpos)
          });
          turn.links[newstepid] = {};
          turn.links[newstepid].fire = 'fire2';
          return newstep;
        };
      game.move2 =
        function(turn, step) {
          var ARTIFACTS = {
            targets: Object.assign({}, step.ARTIFACTS.targets)
          };
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var UNITLAYERS = step.UNITLAYERS;
          var TURNVARS = Object.assign({}, step.TURNVARS);
          var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'pos': MARKS['selectmovetarget']
            });
          }
          TURNVARS['movedto'] = MARKS['selectmovetarget'];
          MARKS = {};
          UNITLAYERS = {
            "queens": {},
            "myqueens": {},
            "oppqueens": {},
            "neutralqueens": {},
            "fires": {},
            "myfires": {},
            "oppfires": {},
            "neutralfires": {},
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
            "targets": {}
          };
          var STARTPOS = TURNVARS['movedto'];
          var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
          for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
            var walkedsquares = [];
            var STOPREASON = "";
            var nextpos = "";
            var POS = STARTPOS;
            var BLOCKS = UNITLAYERS.units;
            while (!(STOPREASON = (!(nextpos = connections[POS][allwalkerdirs[walkerdirnbr]]) ? "outofbounds" : BLOCKS[nextpos] ? "hitblock" : null))) {
              walkedsquares.push(POS = nextpos);
              ARTIFACTS['targets'][POS] = {};
            }
            var WALKLENGTH = walkedsquares.length;
          }
          var newstepid = step.stepid + '-' + 'move';
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            stepid: newstepid,
            path: step.path.concat('move')
          });
          turn.links[newstepid] = {};
          var linkedpositions = Object.keys(ARTIFACTS.targets);
          var nbrofpositions = linkedpositions.length;
          for (var linknbr = 0; linknbr < nbrofpositions; linknbr++) {
            turn.links[newstepid][linkedpositions[linknbr]] = 'selectfiretarget2';
          }
          return newstep;
        };
      game.fire2 =
        function(turn, step) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var clones = step.clones;
          var UNITLAYERS = step.UNITLAYERS;
          var newunitid = 'spawn' + (clones++);
          UNITDATA[newunitid] = {
            pos: MARKS['selectfiretarget'],
            id: newunitid,
            group: 'fires',
            owner: 0
          };
          MARKS = {};
          UNITLAYERS = {
            "queens": {},
            "myqueens": {},
            "oppqueens": {},
            "neutralqueens": {},
            "fires": {},
            "myfires": {},
            "oppfires": {},
            "neutralfires": {},
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
            "targets": {}
          };
          var newstepid = step.stepid + '-' + 'fire';
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            stepid: newstepid,
            path: step.path.concat('fire'),
            clones: clones
          });
          turn.links[newstepid] = {};
          turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
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
            "targets": {}
          };
          var UNITDATA = step.UNITDATA;
          var TURNVARS = step.TURNVARS;
          var UNITLAYERS = {
            "queens": {},
            "myqueens": {},
            "oppqueens": {},
            "neutralqueens": {},
            "fires": {},
            "myfires": {},
            "oppfires": {},
            "neutralfires": {},
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
            clones: step.clones,
            path: []
          };
          var linkedpositions = Object.keys(UNITLAYERS.myunits);
          var nbrofpositions = linkedpositions.length;
          for (var linknbr = 0; linknbr < nbrofpositions; linknbr++) {
            turn.links.root[linkedpositions[linknbr]] = 'selectunit2';
          }
          return turn;
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
              "pos": "d10",
              "id": "unit1",
              "group": "queens",
              "owner": 1
            },
            "unit2": {
              "pos": "g10",
              "id": "unit2",
              "group": "queens",
              "owner": 1
            },
            "unit3": {
              "pos": "a7",
              "id": "unit3",
              "group": "queens",
              "owner": 1
            },
            "unit4": {
              "pos": "j7",
              "id": "unit4",
              "group": "queens",
              "owner": 1
            },
            "unit5": {
              "pos": "a4",
              "id": "unit5",
              "group": "queens",
              "owner": 2
            },
            "unit6": {
              "pos": "d1",
              "id": "unit6",
              "group": "queens",
              "owner": 2
            },
            "unit7": {
              "pos": "g1",
              "id": "unit7",
              "group": "queens",
              "owner": 2
            },
            "unit8": {
              "pos": "j4",
              "id": "unit8",
              "group": "queens",
              "owner": 2
            }
          },
          TURNVARS: {},
          clones: 0
        };
        return game.start1(turnseed, stepseed);
      };
    game.commands = {
      "move": 1,
      "fire": 1
    };
    game.graphics = {
      "icons": {
        "queens": "queens",
        "fires": "pawns"
      }
    };
    game.board = {
      "height": 10,
      "width": 10
    };
    return game;
  }
)(), daggers: (
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
        "1": "a8",
        "2": "b8",
        "3": "b7",
        "4": "b6",
        "5": "a6"
      },
      "a8": {
        "3": "b8",
        "4": "b7",
        "5": "a7"
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
        "1": "b8",
        "2": "c8",
        "3": "c7",
        "4": "c6",
        "5": "b6",
        "6": "a6",
        "7": "a7",
        "8": "a8"
      },
      "b8": {
        "3": "c8",
        "4": "c7",
        "5": "b7",
        "6": "a7",
        "7": "a8"
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
        "1": "c8",
        "2": "d8",
        "3": "d7",
        "4": "d6",
        "5": "c6",
        "6": "b6",
        "7": "b7",
        "8": "b8"
      },
      "c8": {
        "3": "d8",
        "4": "d7",
        "5": "c7",
        "6": "b7",
        "7": "b8"
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
        "1": "d8",
        "2": "e8",
        "3": "e7",
        "4": "e6",
        "5": "d6",
        "6": "c6",
        "7": "c7",
        "8": "c8"
      },
      "d8": {
        "3": "e8",
        "4": "e7",
        "5": "d7",
        "6": "c7",
        "7": "c8"
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
        "1": "e8",
        "2": "f8",
        "3": "f7",
        "4": "f6",
        "5": "e6",
        "6": "d6",
        "7": "d7",
        "8": "d8"
      },
      "e8": {
        "3": "f8",
        "4": "f7",
        "5": "e7",
        "6": "d7",
        "7": "d8"
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
        "1": "f8",
        "2": "g8",
        "3": "g7",
        "4": "g6",
        "5": "f6",
        "6": "e6",
        "7": "e7",
        "8": "e8"
      },
      "f8": {
        "3": "g8",
        "4": "g7",
        "5": "f7",
        "6": "e7",
        "7": "e8"
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
        "1": "g8",
        "2": "h8",
        "3": "h7",
        "4": "h6",
        "5": "g6",
        "6": "f6",
        "7": "f7",
        "8": "f8"
      },
      "g8": {
        "3": "h8",
        "4": "h7",
        "5": "g7",
        "6": "f7",
        "7": "f8"
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
        "1": "h8",
        "5": "h6",
        "6": "g6",
        "7": "g7",
        "8": "g8"
      },
      "h8": {
        "5": "h7",
        "6": "g7",
        "7": "g8"
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
        "a8": {
          "colour": "light",
          "pos": "a8",
          "x": 1,
          "y": 8
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
        "b8": {
          "colour": "dark",
          "pos": "b8",
          "x": 2,
          "y": 8
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
        "c8": {
          "colour": "light",
          "pos": "c8",
          "x": 3,
          "y": 8
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
        "d8": {
          "colour": "dark",
          "pos": "d8",
          "x": 4,
          "y": 8
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
        "e8": {
          "colour": "light",
          "pos": "e8",
          "x": 5,
          "y": 8
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
        "f8": {
          "colour": "dark",
          "pos": "f8",
          "x": 6,
          "y": 8
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
        "g8": {
          "colour": "light",
          "pos": "g8",
          "x": 7,
          "y": 8
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
        },
        "h8": {
          "colour": "dark",
          "pos": "h8",
          "x": 8,
          "y": 8
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
        "a8": {
          "colour": "light",
          "pos": "a8",
          "x": 1,
          "y": 8
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
        "c8": {
          "colour": "light",
          "pos": "c8",
          "x": 3,
          "y": 8
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
        "e8": {
          "colour": "light",
          "pos": "e8",
          "x": 5,
          "y": 8
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
        "g8": {
          "colour": "light",
          "pos": "g8",
          "x": 7,
          "y": 8
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
        "b8": {
          "colour": "dark",
          "pos": "b8",
          "x": 2,
          "y": 8
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
        "d8": {
          "colour": "dark",
          "pos": "d8",
          "x": 4,
          "y": 8
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
        "f8": {
          "colour": "dark",
          "pos": "f8",
          "x": 6,
          "y": 8
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
        },
        "h8": {
          "colour": "dark",
          "pos": "h8",
          "x": 8,
          "y": 8
        }
      }
    };
    (function() {
      var TERRAIN = {
        "bases": {
          "a8": {
            "pos": "a8",
            "owner": 1
          },
          "b8": {
            "pos": "b8",
            "owner": 1
          },
          "c8": {
            "pos": "c8",
            "owner": 1
          },
          "d8": {
            "pos": "d8",
            "owner": 1
          },
          "e8": {
            "pos": "e8",
            "owner": 1
          },
          "f8": {
            "pos": "f8",
            "owner": 1
          },
          "g8": {
            "pos": "g8",
            "owner": 1
          },
          "h8": {
            "pos": "h8",
            "owner": 1
          },
          "a1": {
            "pos": "a1",
            "owner": 2
          },
          "b1": {
            "pos": "b1",
            "owner": 2
          },
          "c1": {
            "pos": "c1",
            "owner": 2
          },
          "d1": {
            "pos": "d1",
            "owner": 2
          },
          "e1": {
            "pos": "e1",
            "owner": 2
          },
          "f1": {
            "pos": "f1",
            "owner": 2
          },
          "g1": {
            "pos": "g1",
            "owner": 2
          },
          "h1": {
            "pos": "h1",
            "owner": 2
          }
        },
        "mybases": {
          "a8": {
            "pos": "a8",
            "owner": 1
          },
          "b8": {
            "pos": "b8",
            "owner": 1
          },
          "c8": {
            "pos": "c8",
            "owner": 1
          },
          "d8": {
            "pos": "d8",
            "owner": 1
          },
          "e8": {
            "pos": "e8",
            "owner": 1
          },
          "f8": {
            "pos": "f8",
            "owner": 1
          },
          "g8": {
            "pos": "g8",
            "owner": 1
          },
          "h8": {
            "pos": "h8",
            "owner": 1
          }
        },
        "oppbases": {
          "a1": {
            "pos": "a1",
            "owner": 2
          },
          "b1": {
            "pos": "b1",
            "owner": 2
          },
          "c1": {
            "pos": "c1",
            "owner": 2
          },
          "d1": {
            "pos": "d1",
            "owner": 2
          },
          "e1": {
            "pos": "e1",
            "owner": 2
          },
          "f1": {
            "pos": "f1",
            "owner": 2
          },
          "g1": {
            "pos": "g1",
            "owner": 2
          },
          "h1": {
            "pos": "h1",
            "owner": 2
          }
        }
      };
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
      game.selectunit1 =
        function(turn, step, markpos) {
          var ARTIFACTS = {
            killtarget: Object.assign({}, step.ARTIFACTS.killtarget),
            movetarget: Object.assign({}, step.ARTIFACTS.movetarget)
          };
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = Object.assign({}, step.MARKS, {
            selectunit: markpos
          });
          if (!!(UNITLAYERS.mycrowns[MARKS['selectunit']])) {
            var STARTPOS = MARKS['selectunit'];
            var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
            var startconnections = connections[STARTPOS];
            for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
              var POS = startconnections[neighbourdirs[dirnbr]];
              if (POS) {
                if (!(UNITLAYERS.myunits[POS])) {
                  ARTIFACTS[(!!(UNITLAYERS.oppunits[POS]) ? 'killtarget' : 'movetarget')][POS] = {};
                }
              }
            } 
          } else {
            var STARTPOS = MARKS['selectunit'];
            var allwalkerdirs = [8, 1, 2, 4, 5, 6];
            for (var walkerdirnbr = 0; walkerdirnbr < 6; walkerdirnbr++) {
              var DIR = allwalkerdirs[walkerdirnbr];
              var walkedsquares = [];
              var STOPREASON = "";
              var nextpos = "";
              var MAX = (([8, 1, 2].indexOf(DIR) !== -1) ? 1 : 8);
              var POS = STARTPOS;
              var BLOCKS = UNITLAYERS.units;
              var LENGTH = 0;
              while (!(STOPREASON = (LENGTH === MAX ? "reachedmax" : !(nextpos = connections[POS][DIR]) ? "outofbounds" : BLOCKS[nextpos] ? "hitblock" : null))) {
                walkedsquares.push(POS = nextpos);
                LENGTH++;
                ARTIFACTS['movetarget'][POS] = {};
              }
              var WALKLENGTH = walkedsquares.length;
              if (STOPREASON === "hitblock") {
                POS = nextpos;
                if ((!(UNITLAYERS.myunits[POS]) && !(([1, 5].indexOf(DIR) !== -1) && !!(UNITLAYERS.oppdaggers[POS])))) {
                  ARTIFACTS['movetarget'][POS] = {};
                }
              }
            }
          }
          var newstepid = step.stepid + '-' + markpos;
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            stepid: newstepid,
            path: step.path.concat(markpos)
          });
          turn.links[newstepid] = {};
          var linkedpositions = Object.keys(ARTIFACTS.movetarget);
          var nbrofpositions = linkedpositions.length;
          for (var linknbr = 0; linknbr < nbrofpositions; linknbr++) {
            turn.links[newstepid][linkedpositions[linknbr]] = 'selectmovetarget1';
          }
          return newstep;
        };
      game.selectmovetarget1 =
        function(turn, step, markpos) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = Object.assign({}, step.MARKS, {
            selectmovetarget: markpos
          });
          var newstepid = step.stepid + '-' + markpos;
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            MARKS: MARKS,
            stepid: newstepid,
            path: step.path.concat(markpos)
          });
          turn.links[newstepid] = {};
          turn.links[newstepid].move = 'move1';
          return newstep;
        };
      game.move1 =
        function(turn, step) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var UNITLAYERS = step.UNITLAYERS;
          delete UNITDATA[(UNITLAYERS.units[MARKS['selectmovetarget']]  || {}).id];
          var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'pos': MARKS['selectmovetarget']
            });
          }
          MARKS = {};
          UNITLAYERS = {
            "crowns": {},
            "mycrowns": {},
            "oppcrowns": {},
            "neutralcrowns": {},
            "daggers": {},
            "mydaggers": {},
            "oppdaggers": {},
            "neutraldaggers": {},
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
            "killtarget": {},
            "movetarget": {}
          };
          var newstepid = step.stepid + '-' + 'move';
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            stepid: newstepid,
            path: step.path.concat('move')
          });
          turn.links[newstepid] = {};
          if (Object.keys(
              (function() {
                var ret = {},
                  s0 = UNITLAYERS.mycrowns,
                  s1 = TERRAIN.oppbases;
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
          } else
          if ((Object.keys(UNITLAYERS.oppcrowns).length === 1)) {
            var winner = 1;
            var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'kingkill';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
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
            "killtarget": {},
            "movetarget": {}
          };
          var UNITDATA = step.UNITDATA;
          var UNITLAYERS = {
            "crowns": {},
            "mycrowns": {},
            "oppcrowns": {},
            "neutralcrowns": {},
            "daggers": {},
            "mydaggers": {},
            "oppdaggers": {},
            "neutraldaggers": {},
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
            path: []
          };
          var linkedpositions = Object.keys(UNITLAYERS.myunits);
          var nbrofpositions = linkedpositions.length;
          for (var linknbr = 0; linknbr < nbrofpositions; linknbr++) {
            turn.links.root[linkedpositions[linknbr]] = 'selectunit1';
          }
          return turn;
        };
    })();
    (function() {
      var TERRAIN = {
        "bases": {
          "a8": {
            "pos": "a8",
            "owner": 1
          },
          "b8": {
            "pos": "b8",
            "owner": 1
          },
          "c8": {
            "pos": "c8",
            "owner": 1
          },
          "d8": {
            "pos": "d8",
            "owner": 1
          },
          "e8": {
            "pos": "e8",
            "owner": 1
          },
          "f8": {
            "pos": "f8",
            "owner": 1
          },
          "g8": {
            "pos": "g8",
            "owner": 1
          },
          "h8": {
            "pos": "h8",
            "owner": 1
          },
          "a1": {
            "pos": "a1",
            "owner": 2
          },
          "b1": {
            "pos": "b1",
            "owner": 2
          },
          "c1": {
            "pos": "c1",
            "owner": 2
          },
          "d1": {
            "pos": "d1",
            "owner": 2
          },
          "e1": {
            "pos": "e1",
            "owner": 2
          },
          "f1": {
            "pos": "f1",
            "owner": 2
          },
          "g1": {
            "pos": "g1",
            "owner": 2
          },
          "h1": {
            "pos": "h1",
            "owner": 2
          }
        },
        "oppbases": {
          "a8": {
            "pos": "a8",
            "owner": 1
          },
          "b8": {
            "pos": "b8",
            "owner": 1
          },
          "c8": {
            "pos": "c8",
            "owner": 1
          },
          "d8": {
            "pos": "d8",
            "owner": 1
          },
          "e8": {
            "pos": "e8",
            "owner": 1
          },
          "f8": {
            "pos": "f8",
            "owner": 1
          },
          "g8": {
            "pos": "g8",
            "owner": 1
          },
          "h8": {
            "pos": "h8",
            "owner": 1
          }
        },
        "mybases": {
          "a1": {
            "pos": "a1",
            "owner": 2
          },
          "b1": {
            "pos": "b1",
            "owner": 2
          },
          "c1": {
            "pos": "c1",
            "owner": 2
          },
          "d1": {
            "pos": "d1",
            "owner": 2
          },
          "e1": {
            "pos": "e1",
            "owner": 2
          },
          "f1": {
            "pos": "f1",
            "owner": 2
          },
          "g1": {
            "pos": "g1",
            "owner": 2
          },
          "h1": {
            "pos": "h1",
            "owner": 2
          }
        }
      };
      var ownernames = ["neutral", "opp", "my"];
      var player = 2;
      var otherplayer = 1;
      game.selectunit2 =
        function(turn, step, markpos) {
          var ARTIFACTS = {
            killtarget: Object.assign({}, step.ARTIFACTS.killtarget),
            movetarget: Object.assign({}, step.ARTIFACTS.movetarget)
          };
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = Object.assign({}, step.MARKS, {
            selectunit: markpos
          });
          if (!!(UNITLAYERS.mycrowns[MARKS['selectunit']])) {
            var STARTPOS = MARKS['selectunit'];
            var neighbourdirs = [1, 2, 3, 4, 5, 6, 7, 8];
            var startconnections = connections[STARTPOS];
            for (var dirnbr = 0; dirnbr < 8; dirnbr++) {
              var POS = startconnections[neighbourdirs[dirnbr]];
              if (POS) {
                if (!(UNITLAYERS.myunits[POS])) {
                  ARTIFACTS[(!!(UNITLAYERS.oppunits[POS]) ? 'killtarget' : 'movetarget')][POS] = {};
                }
              }
            } 
          } else {
            var STARTPOS = MARKS['selectunit'];
            var allwalkerdirs = [8, 1, 2, 4, 5, 6];
            for (var walkerdirnbr = 0; walkerdirnbr < 6; walkerdirnbr++) {
              var DIR = allwalkerdirs[walkerdirnbr];
              var walkedsquares = [];
              var STOPREASON = "";
              var nextpos = "";
              var MAX = (([8, 1, 2].indexOf(DIR) !== -1) ? 1 : 8);
              var POS = STARTPOS;
              var BLOCKS = UNITLAYERS.units;
              var LENGTH = 0;
              while (!(STOPREASON = (LENGTH === MAX ? "reachedmax" : !(nextpos = connections[POS][DIR]) ? "outofbounds" : BLOCKS[nextpos] ? "hitblock" : null))) {
                walkedsquares.push(POS = nextpos);
                LENGTH++;
                ARTIFACTS['movetarget'][POS] = {};
              }
              var WALKLENGTH = walkedsquares.length;
              if (STOPREASON === "hitblock") {
                POS = nextpos;
                if ((!(UNITLAYERS.myunits[POS]) && !(([1, 5].indexOf(DIR) !== -1) && !!(UNITLAYERS.oppdaggers[POS])))) {
                  ARTIFACTS['movetarget'][POS] = {};
                }
              }
            }
          }
          var newstepid = step.stepid + '-' + markpos;
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            stepid: newstepid,
            path: step.path.concat(markpos)
          });
          turn.links[newstepid] = {};
          var linkedpositions = Object.keys(ARTIFACTS.movetarget);
          var nbrofpositions = linkedpositions.length;
          for (var linknbr = 0; linknbr < nbrofpositions; linknbr++) {
            turn.links[newstepid][linkedpositions[linknbr]] = 'selectmovetarget2';
          }
          return newstep;
        };
      game.selectmovetarget2 =
        function(turn, step, markpos) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = Object.assign({}, step.MARKS, {
            selectmovetarget: markpos
          });
          var newstepid = step.stepid + '-' + markpos;
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            MARKS: MARKS,
            stepid: newstepid,
            path: step.path.concat(markpos)
          });
          turn.links[newstepid] = {};
          turn.links[newstepid].move = 'move2';
          return newstep;
        };
      game.move2 =
        function(turn, step) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var UNITLAYERS = step.UNITLAYERS;
          delete UNITDATA[(UNITLAYERS.units[MARKS['selectmovetarget']]  || {}).id];
          var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'pos': MARKS['selectmovetarget']
            });
          }
          MARKS = {};
          UNITLAYERS = {
            "crowns": {},
            "mycrowns": {},
            "oppcrowns": {},
            "neutralcrowns": {},
            "daggers": {},
            "mydaggers": {},
            "oppdaggers": {},
            "neutraldaggers": {},
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
            "killtarget": {},
            "movetarget": {}
          };
          var newstepid = step.stepid + '-' + 'move';
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            stepid: newstepid,
            path: step.path.concat('move')
          });
          turn.links[newstepid] = {};
          if (Object.keys(
              (function() {
                var ret = {},
                  s0 = UNITLAYERS.mycrowns,
                  s1 = TERRAIN.oppbases;
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
          } else
          if ((Object.keys(UNITLAYERS.oppcrowns).length === 1)) {
            var winner = 2;
            var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'kingkill';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
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
            "killtarget": {},
            "movetarget": {}
          };
          var UNITDATA = step.UNITDATA;
          var UNITLAYERS = {
            "crowns": {},
            "mycrowns": {},
            "oppcrowns": {},
            "neutralcrowns": {},
            "daggers": {},
            "mydaggers": {},
            "oppdaggers": {},
            "neutraldaggers": {},
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
            path: []
          };
          var linkedpositions = Object.keys(UNITLAYERS.myunits);
          var nbrofpositions = linkedpositions.length;
          for (var linknbr = 0; linknbr < nbrofpositions; linknbr++) {
            turn.links.root[linkedpositions[linknbr]] = 'selectunit2';
          }
          return turn;
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
              "pos": "d8",
              "id": "unit1",
              "group": "crowns",
              "owner": 1
            },
            "unit2": {
              "pos": "e8",
              "id": "unit2",
              "group": "crowns",
              "owner": 1
            },
            "unit3": {
              "pos": "c1",
              "id": "unit3",
              "group": "crowns",
              "owner": 2
            },
            "unit4": {
              "pos": "f1",
              "id": "unit4",
              "group": "crowns",
              "owner": 2
            },
            "unit5": {
              "pos": "c7",
              "id": "unit5",
              "group": "daggers",
              "owner": 1
            },
            "unit6": {
              "pos": "d7",
              "id": "unit6",
              "group": "daggers",
              "owner": 1
            },
            "unit7": {
              "pos": "e7",
              "id": "unit7",
              "group": "daggers",
              "owner": 1
            },
            "unit8": {
              "pos": "f7",
              "id": "unit8",
              "group": "daggers",
              "owner": 1
            },
            "unit9": {
              "pos": "c3",
              "id": "unit9",
              "group": "daggers",
              "owner": 2
            },
            "unit10": {
              "pos": "f3",
              "id": "unit10",
              "group": "daggers",
              "owner": 2
            },
            "unit11": {
              "pos": "b2",
              "id": "unit11",
              "group": "daggers",
              "owner": 2
            },
            "unit12": {
              "pos": "c2",
              "id": "unit12",
              "group": "daggers",
              "owner": 2
            },
            "unit13": {
              "pos": "d2",
              "id": "unit13",
              "group": "daggers",
              "owner": 2
            },
            "unit14": {
              "pos": "e2",
              "id": "unit14",
              "group": "daggers",
              "owner": 2
            },
            "unit15": {
              "pos": "f2",
              "id": "unit15",
              "group": "daggers",
              "owner": 2
            },
            "unit16": {
              "pos": "g2",
              "id": "unit16",
              "group": "daggers",
              "owner": 2
            }
          }
        };
        return game.start1(turnseed, stepseed);
      };
    game.commands = {
      "move": 1
    };
    game.graphics = {
      "tiles": {
        "bases": "playercolour"
      },
      "icons": {
        "daggers": "bishops",
        "crowns": "kings"
      }
    };
    game.board = {
      "height": 8,
      "width": 8,
      "terrain": {
        "bases": {
          "1": [
            ["rect", "a8", "h8"]
          ],
          "2": [
            ["rect", "a1", "h1"]
          ]
        }
      }
    };
    return game;
  }
)(), krieg: (
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
        "3": "b4",
        "4": "b3",
        "5": "a3"
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
        "3": "c4",
        "4": "c3",
        "5": "b3",
        "6": "a3",
        "7": "a4"
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
        "3": "d4",
        "4": "d3",
        "5": "c3",
        "6": "b3",
        "7": "b4"
      },
      "d1": {
        "1": "d2",
        "7": "c1",
        "8": "c2"
      },
      "d2": {
        "1": "d3",
        "5": "d1",
        "6": "c1",
        "7": "c2",
        "8": "c3"
      },
      "d3": {
        "1": "d4",
        "5": "d2",
        "6": "c2",
        "7": "c3",
        "8": "c4"
      },
      "d4": {
        "5": "d3",
        "6": "c3",
        "7": "c4"
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
        }
      }
    };
    (function() {
      var TERRAIN = {
        "southeast": {
          "a4": {
            "pos": "a4"
          },
          "c2": {
            "pos": "c2"
          }
        },
        "northwest": {
          "b3": {
            "pos": "b3"
          },
          "d1": {
            "pos": "d1"
          }
        },
        "corners": {
          "a4": {
            "pos": "a4",
            "owner": 1
          },
          "d1": {
            "pos": "d1",
            "owner": 2
          }
        },
        "mycorners": {
          "a4": {
            "pos": "a4",
            "owner": 1
          }
        },
        "oppcorners": {
          "d1": {
            "pos": "d1",
            "owner": 2
          }
        },
        "bases": {
          "b4": {
            "pos": "b4",
            "owner": 1
          },
          "a3": {
            "pos": "a3",
            "owner": 1
          },
          "b3": {
            "pos": "b3",
            "owner": 1
          },
          "c2": {
            "pos": "c2",
            "owner": 2
          },
          "d2": {
            "pos": "d2",
            "owner": 2
          },
          "c1": {
            "pos": "c1",
            "owner": 2
          }
        },
        "mybases": {
          "b4": {
            "pos": "b4",
            "owner": 1
          },
          "a3": {
            "pos": "a3",
            "owner": 1
          },
          "b3": {
            "pos": "b3",
            "owner": 1
          }
        },
        "oppbases": {
          "c2": {
            "pos": "c2",
            "owner": 2
          },
          "d2": {
            "pos": "d2",
            "owner": 2
          },
          "c1": {
            "pos": "c1",
            "owner": 2
          }
        }
      };
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
      game.selectunit1 =
        function(turn, step, markpos) {
          var ARTIFACTS = {
            movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
          };
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = Object.assign({}, step.MARKS, {
            selectunit: markpos
          });
          var STARTPOS = MARKS['selectunit'];
          var neighbourdirs = (!!(TERRAIN.southeast[STARTPOS]) ? [1, 3, 4, 5, 7] : (!!(TERRAIN.northwest[STARTPOS]) ? [1, 3, 5, 7, 8] : [1, 3, 5, 7]));
          var nbrofneighbourdirs = neighbourdirs.length;
          var startconnections = connections[STARTPOS];
          for (var dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
            var POS = startconnections[neighbourdirs[dirnbr]];
            if (POS && !UNITLAYERS.units[POS]) {
              ARTIFACTS['movetargets'][POS] = {};
            }
          } 
          var newstepid = step.stepid + '-' + markpos;
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            stepid: newstepid,
            path: step.path.concat(markpos)
          });
          turn.links[newstepid] = {};
          var linkedpositions = Object.keys(ARTIFACTS.movetargets);
          var nbrofpositions = linkedpositions.length;
          for (var linknbr = 0; linknbr < nbrofpositions; linknbr++) {
            turn.links[newstepid][linkedpositions[linknbr]] = 'selectmove1';
          }
          return newstep;
        };
      game.selectmove1 =
        function(turn, step, markpos) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = Object.assign({}, step.MARKS, {
            selectmove: markpos
          });
          var newstepid = step.stepid + '-' + markpos;
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            MARKS: MARKS,
            stepid: newstepid,
            path: step.path.concat(markpos)
          });
          turn.links[newstepid] = {};
          turn.links[newstepid].move = 'move1';
          return newstep;
        };
      game.move1 =
        function(turn, step) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var UNITLAYERS = step.UNITLAYERS;
          var LOOPID;
          for (var POS in UNITLAYERS.myfrozens) {
            LOOPID = UNITLAYERS.myfrozens[POS].id
            UNITDATA[LOOPID] = Object.assign({}, UNITDATA[LOOPID], {
              'group': 'notfrozens'
            });
          }
          var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'group': 'frozens'
            });
          }
          var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'pos': MARKS['selectmove']
            });
          }
          MARKS = {};
          UNITLAYERS = {
            "notfrozens": {},
            "mynotfrozens": {},
            "oppnotfrozens": {},
            "neutralnotfrozens": {},
            "frozens": {},
            "myfrozens": {},
            "oppfrozens": {},
            "neutralfrozens": {},
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
            "movetargets": {}
          };
          var newstepid = step.stepid + '-' + 'move';
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            stepid: newstepid,
            path: step.path.concat('move')
          });
          turn.links[newstepid] = {};
          if (Object.keys(
              (function() {
                var ret = {},
                  s0 = TERRAIN.oppcorners,
                  s1 = UNITLAYERS.myunits;
                for (var key in s0) {
                  if (s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }()) ||  {}).length !== 0) {
            var winner = 1;
            var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'cornerinfiltration';
          } else
          if ((Object.keys(
              (function() {
                var ret = {},
                  s0 = TERRAIN.oppbases,
                  s1 = UNITLAYERS.myunits;
                for (var key in s0) {
                  if (s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }())).length === 2)) {
            var winner = 1;
            var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'occupation';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
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
            "movetargets": {}
          };
          var UNITDATA = step.UNITDATA;
          var UNITLAYERS = {
            "notfrozens": {},
            "mynotfrozens": {},
            "oppnotfrozens": {},
            "neutralnotfrozens": {},
            "frozens": {},
            "myfrozens": {},
            "oppfrozens": {},
            "neutralfrozens": {},
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
            path: []
          };
          var linkedpositions = Object.keys(UNITLAYERS.mynotfrozens);
          var nbrofpositions = linkedpositions.length;
          for (var linknbr = 0; linknbr < nbrofpositions; linknbr++) {
            turn.links.root[linkedpositions[linknbr]] = 'selectunit1';
          }
          return turn;
        };
    })();
    (function() {
      var TERRAIN = {
        "southeast": {
          "a4": {
            "pos": "a4"
          },
          "c2": {
            "pos": "c2"
          }
        },
        "northwest": {
          "b3": {
            "pos": "b3"
          },
          "d1": {
            "pos": "d1"
          }
        },
        "corners": {
          "a4": {
            "pos": "a4",
            "owner": 1
          },
          "d1": {
            "pos": "d1",
            "owner": 2
          }
        },
        "oppcorners": {
          "a4": {
            "pos": "a4",
            "owner": 1
          }
        },
        "mycorners": {
          "d1": {
            "pos": "d1",
            "owner": 2
          }
        },
        "bases": {
          "b4": {
            "pos": "b4",
            "owner": 1
          },
          "a3": {
            "pos": "a3",
            "owner": 1
          },
          "b3": {
            "pos": "b3",
            "owner": 1
          },
          "c2": {
            "pos": "c2",
            "owner": 2
          },
          "d2": {
            "pos": "d2",
            "owner": 2
          },
          "c1": {
            "pos": "c1",
            "owner": 2
          }
        },
        "oppbases": {
          "b4": {
            "pos": "b4",
            "owner": 1
          },
          "a3": {
            "pos": "a3",
            "owner": 1
          },
          "b3": {
            "pos": "b3",
            "owner": 1
          }
        },
        "mybases": {
          "c2": {
            "pos": "c2",
            "owner": 2
          },
          "d2": {
            "pos": "d2",
            "owner": 2
          },
          "c1": {
            "pos": "c1",
            "owner": 2
          }
        }
      };
      var ownernames = ["neutral", "opp", "my"];
      var player = 2;
      var otherplayer = 1;
      game.selectunit2 =
        function(turn, step, markpos) {
          var ARTIFACTS = {
            movetargets: Object.assign({}, step.ARTIFACTS.movetargets)
          };
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = Object.assign({}, step.MARKS, {
            selectunit: markpos
          });
          var STARTPOS = MARKS['selectunit'];
          var neighbourdirs = (!!(TERRAIN.southeast[STARTPOS]) ? [1, 3, 4, 5, 7] : (!!(TERRAIN.northwest[STARTPOS]) ? [1, 3, 5, 7, 8] : [1, 3, 5, 7]));
          var nbrofneighbourdirs = neighbourdirs.length;
          var startconnections = connections[STARTPOS];
          for (var dirnbr = 0; dirnbr < nbrofneighbourdirs; dirnbr++) {
            var POS = startconnections[neighbourdirs[dirnbr]];
            if (POS && !UNITLAYERS.units[POS]) {
              ARTIFACTS['movetargets'][POS] = {};
            }
          } 
          var newstepid = step.stepid + '-' + markpos;
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            stepid: newstepid,
            path: step.path.concat(markpos)
          });
          turn.links[newstepid] = {};
          var linkedpositions = Object.keys(ARTIFACTS.movetargets);
          var nbrofpositions = linkedpositions.length;
          for (var linknbr = 0; linknbr < nbrofpositions; linknbr++) {
            turn.links[newstepid][linkedpositions[linknbr]] = 'selectmove2';
          }
          return newstep;
        };
      game.selectmove2 =
        function(turn, step, markpos) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = Object.assign({}, step.MARKS, {
            selectmove: markpos
          });
          var newstepid = step.stepid + '-' + markpos;
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            MARKS: MARKS,
            stepid: newstepid,
            path: step.path.concat(markpos)
          });
          turn.links[newstepid] = {};
          turn.links[newstepid].move = 'move2';
          return newstep;
        };
      game.move2 =
        function(turn, step) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {});
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var UNITLAYERS = step.UNITLAYERS;
          var LOOPID;
          for (var POS in UNITLAYERS.myfrozens) {
            LOOPID = UNITLAYERS.myfrozens[POS].id
            UNITDATA[LOOPID] = Object.assign({}, UNITDATA[LOOPID], {
              'group': 'notfrozens'
            });
          }
          var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'group': 'frozens'
            });
          }
          var unitid = (UNITLAYERS.units[MARKS['selectunit']]  || {}).id;
          if (unitid) {
            UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
              'pos': MARKS['selectmove']
            });
          }
          MARKS = {};
          UNITLAYERS = {
            "notfrozens": {},
            "mynotfrozens": {},
            "oppnotfrozens": {},
            "neutralnotfrozens": {},
            "frozens": {},
            "myfrozens": {},
            "oppfrozens": {},
            "neutralfrozens": {},
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
            "movetargets": {}
          };
          var newstepid = step.stepid + '-' + 'move';
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            stepid: newstepid,
            path: step.path.concat('move')
          });
          turn.links[newstepid] = {};
          if (Object.keys(
              (function() {
                var ret = {},
                  s0 = TERRAIN.oppcorners,
                  s1 = UNITLAYERS.myunits;
                for (var key in s0) {
                  if (s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }()) ||  {}).length !== 0) {
            var winner = 2;
            var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'cornerinfiltration';
          } else
          if ((Object.keys(
              (function() {
                var ret = {},
                  s0 = TERRAIN.oppbases,
                  s1 = UNITLAYERS.myunits;
                for (var key in s0) {
                  if (s1[key]) {
                    ret[key] = s0[key];
                  }
                }
                return ret;
              }())).length === 2)) {
            var winner = 2;
            var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'occupation';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
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
            "movetargets": {}
          };
          var UNITDATA = step.UNITDATA;
          var UNITLAYERS = {
            "notfrozens": {},
            "mynotfrozens": {},
            "oppnotfrozens": {},
            "neutralnotfrozens": {},
            "frozens": {},
            "myfrozens": {},
            "oppfrozens": {},
            "neutralfrozens": {},
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
            path: []
          };
          var linkedpositions = Object.keys(UNITLAYERS.mynotfrozens);
          var nbrofpositions = linkedpositions.length;
          for (var linknbr = 0; linknbr < nbrofpositions; linknbr++) {
            turn.links.root[linkedpositions[linknbr]] = 'selectunit2';
          }
          return turn;
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
              "pos": "a4",
              "id": "unit1",
              "group": "notfrozens",
              "owner": 1
            },
            "unit2": {
              "pos": "b4",
              "id": "unit2",
              "group": "notfrozens",
              "owner": 1
            },
            "unit3": {
              "pos": "a3",
              "id": "unit3",
              "group": "notfrozens",
              "owner": 1
            },
            "unit4": {
              "pos": "b3",
              "id": "unit4",
              "group": "notfrozens",
              "owner": 1
            },
            "unit5": {
              "pos": "c2",
              "id": "unit5",
              "group": "notfrozens",
              "owner": 2
            },
            "unit6": {
              "pos": "c1",
              "id": "unit6",
              "group": "notfrozens",
              "owner": 2
            },
            "unit7": {
              "pos": "d2",
              "id": "unit7",
              "group": "notfrozens",
              "owner": 2
            },
            "unit8": {
              "pos": "d1",
              "id": "unit8",
              "group": "notfrozens",
              "owner": 2
            }
          }
        };
        return game.start1(turnseed, stepseed);
      };
    game.commands = {
      "move": 1
    };
    game.graphics = {
      "tiles": {
        "corners": "playercolour",
        "bases": "castle"
      },
      "icons": {
        "notfrozens": "knights",
        "frozens": "rooks"
      }
    };
    game.board = {
      "width": 4,
      "height": 4,
      "terrain": {
        "southeast": ["a4", "c2"],
        "northwest": ["b3", "d1"],
        "corners": {
          "1": ["a4"],
          "2": ["d1"]
        },
        "bases": {
          "1": ["b4", "a3", "b3"],
          "2": ["c2", "d2", "c1"]
        }
      }
    };
    return game;
  }
)(), snijpunt: (
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
        "3": "b6",
        "4": "b5",
        "5": "a5"
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
        "3": "c6",
        "4": "c5",
        "5": "b5",
        "6": "a5",
        "7": "a6"
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
        "3": "d6",
        "4": "d5",
        "5": "c5",
        "6": "b5",
        "7": "b6"
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
        "3": "e6",
        "4": "e5",
        "5": "d5",
        "6": "c5",
        "7": "c6"
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
        "3": "f6",
        "4": "f5",
        "5": "e5",
        "6": "d5",
        "7": "d6"
      },
      "f1": {
        "1": "f2",
        "7": "e1",
        "8": "e2"
      },
      "f2": {
        "1": "f3",
        "5": "f1",
        "6": "e1",
        "7": "e2",
        "8": "e3"
      },
      "f3": {
        "1": "f4",
        "5": "f2",
        "6": "e2",
        "7": "e3",
        "8": "e4"
      },
      "f4": {
        "1": "f5",
        "5": "f3",
        "6": "e3",
        "7": "e4",
        "8": "e5"
      },
      "f5": {
        "1": "f6",
        "5": "f4",
        "6": "e4",
        "7": "e5",
        "8": "e6"
      },
      "f6": {
        "5": "f5",
        "6": "e5",
        "7": "e6"
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
        }
      }
    };
    (function() {
      var TERRAIN = {
        "zone": {
          "b6": {
            "pos": "b6",
            "owner": 1
          },
          "c6": {
            "pos": "c6",
            "owner": 1
          },
          "d6": {
            "pos": "d6",
            "owner": 1
          },
          "e6": {
            "pos": "e6",
            "owner": 1
          },
          "f6": {
            "pos": "f6",
            "owner": 1
          },
          "a1": {
            "pos": "a1",
            "owner": 2
          },
          "a2": {
            "pos": "a2",
            "owner": 2
          },
          "a3": {
            "pos": "a3",
            "owner": 2
          },
          "a4": {
            "pos": "a4",
            "owner": 2
          },
          "a5": {
            "pos": "a5",
            "owner": 2
          }
        },
        "myzone": {
          "b6": {
            "pos": "b6",
            "owner": 1
          },
          "c6": {
            "pos": "c6",
            "owner": 1
          },
          "d6": {
            "pos": "d6",
            "owner": 1
          },
          "e6": {
            "pos": "e6",
            "owner": 1
          },
          "f6": {
            "pos": "f6",
            "owner": 1
          }
        },
        "oppzone": {
          "a1": {
            "pos": "a1",
            "owner": 2
          },
          "a2": {
            "pos": "a2",
            "owner": 2
          },
          "a3": {
            "pos": "a3",
            "owner": 2
          },
          "a4": {
            "pos": "a4",
            "owner": 2
          },
          "a5": {
            "pos": "a5",
            "owner": 2
          }
        },
        "corner": {
          "a6": {
            "pos": "a6"
          }
        }
      };
      var ownernames = ["neutral", "my", "opp"];
      var player = 1;
      var otherplayer = 2;
      game.selecttarget1 =
        function(turn, step, markpos) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
            intersection: Object.assign({}, step.ARTIFACTS.intersection)
          });
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = Object.assign({}, step.MARKS, {
            selecttarget: markpos
          });
          var STARTPOS = MARKS['selecttarget'];
          var DIR = 5;
          var walkedsquares = [];
          var STOPREASON = "";
          var nextpos = "";
          var POS = STARTPOS;
          while (!(STOPREASON = (!(nextpos = connections[POS][5]) ? "outofbounds" : null))) {
            walkedsquares.push(POS = nextpos);
            if (ARTIFACTS.enemyline[POS]) {
              ARTIFACTS['intersection'][POS] = {};
            }
          }
          var WALKLENGTH = walkedsquares.length;
          var newstepid = step.stepid + '-' + markpos;
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            stepid: newstepid,
            path: step.path.concat(markpos)
          });
          turn.links[newstepid] = {};
          turn.links[newstepid].snipe = 'snipe1';
          return newstep;
        };
      game.snipe1 =
        function(turn, step) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
            winline: Object.assign({}, step.ARTIFACTS.winline),
            loseline: Object.assign({}, step.ARTIFACTS.loseline)
          });
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var clones = step.clones;
          var UNITLAYERS = step.UNITLAYERS;
          if (Object.keys(UNITLAYERS.mysniper ||  {}).length === 0) {
            var newunitid = 'spawn' + (clones++);
            UNITDATA[newunitid] = {
              pos: MARKS['selecttarget'],
              id: newunitid,
              group: 'sniper',
              owner: player
            };
          } else {
            var unitid = (UNITLAYERS.units[Object.keys(UNITLAYERS.mysniper)[0]]  || {}).id;
            if (unitid) {
              UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
                'pos': MARKS['selecttarget']
              });
            }
          }
          if (Object.keys(UNITLAYERS.oppsniper ||  {}).length !== 0) {
            if (!!(UNITLAYERS.units[Object.keys(ARTIFACTS.intersection)[0]])) {
              var unitid = (UNITLAYERS.units[Object.keys(ARTIFACTS.intersection)[0]]  || {}).id;
              if (unitid) {
                UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
                  'owner': (((UNITLAYERS.units[Object.keys(ARTIFACTS.intersection)[0]] || {})['owner'] === 2) ? 1 : 2)
                });
              }
            } else {
              var newunitid = 'spawn' + (clones++);
              UNITDATA[newunitid] = {
                pos: Object.keys(ARTIFACTS.intersection)[0],
                id: newunitid,
                group: 'soldiers',
                owner: player
              };
            }
          }
          MARKS = {};
          UNITLAYERS = {
            "sniper": {},
            "mysniper": {},
            "oppsniper": {},
            "neutralsniper": {},
            "soldiers": {},
            "mysoldiers": {},
            "oppsoldiers": {},
            "neutralsoldiers": {},
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
            "winline": {},
            "loseline": {},
            "intersection": {},
            "enemyline": {},
            "potentialempties": {},
            "mandatory": {}
          };
          var walkstarts = UNITLAYERS.soldiers;
          for (var STARTPOS in walkstarts) {
            var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
            for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
              var walkedsquares = [];
              var STOPREASON = "";
              var nextpos = "";
              var POS = STARTPOS;
              var allowedsteps = (!!(UNITLAYERS.mysoldiers[STARTPOS]) ? UNITLAYERS.mysoldiers : UNITLAYERS.oppsoldiers);
              while (!(STOPREASON = (!(nextpos = connections[POS][allwalkerdirs[walkerdirnbr]]) ? "outofbounds" : !allowedsteps[nextpos] ? "nomoresteps" : null))) {
                walkedsquares.push(POS = nextpos);
              }
              var WALKLENGTH = walkedsquares.length;
              if ((WALKLENGTH > 2)) {
                ARTIFACTS[(!!(UNITLAYERS.mysoldiers[STARTPOS]) ? 'winline' : 'loseline')][POS] = {};
              }
            }
          }
          var newstepid = step.stepid + '-' + 'snipe';
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            stepid: newstepid,
            path: step.path.concat('snipe'),
            clones: clones
          });
          turn.links[newstepid] = {};
          if (Object.keys(ARTIFACTS.winline ||  {}).length !== 0) {
            var winner = 1;
            var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'madeline';
          } else
          if (Object.keys(ARTIFACTS.loseline ||  {}).length !== 0) {
            var winner = 2;
            var result = winner === 1 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'madeoppline';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
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
            "winline": {},
            "loseline": {},
            "intersection": {},
            "enemyline": {},
            "potentialempties": {},
            "mandatory": {}
          };
          var UNITDATA = step.UNITDATA;
          var UNITLAYERS = {
            "sniper": {},
            "mysniper": {},
            "oppsniper": {},
            "neutralsniper": {},
            "soldiers": {},
            "mysoldiers": {},
            "oppsoldiers": {},
            "neutralsoldiers": {},
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
          if (Object.keys(UNITLAYERS.oppsniper ||  {}).length !== 0) {
            var STARTPOS = Object.keys(UNITLAYERS.oppsniper)[0];
            var DIR = 3;
            var walkedsquares = [];
            var STOPREASON = "";
            var nextpos = "";
            var POS = STARTPOS;
            while (!(STOPREASON = (!(nextpos = connections[POS][3]) ? "outofbounds" : null))) {
              walkedsquares.push(POS = nextpos);
              if (!UNITLAYERS.units[POS]) {
                ARTIFACTS['potentialempties'][POS] = {};
              }
              ARTIFACTS['enemyline'][POS] = {};
            }
            var WALKLENGTH = walkedsquares.length;
            var walkstarts = ARTIFACTS.potentialempties;
            for (var STARTPOS in walkstarts) {
              var DIR = 1;
              var walkedsquares = [];
              var STOPREASON = "";
              var nextpos = "";
              var POS = STARTPOS;
              while (!(STOPREASON = (!(nextpos = connections[POS][1]) ? "outofbounds" : null))) {
                walkedsquares.push(POS = nextpos);
              }
              var WALKLENGTH = walkedsquares.length;
              if (!UNITLAYERS.sniper[walkedsquares[WALKLENGTH - 1]]) {
                ARTIFACTS['mandatory'][walkedsquares[WALKLENGTH - 1]] = {};
              }
            }
          }
          var newstep = turn.steps.root = {
            ARTIFACTS: ARTIFACTS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            MARKS: MARKS,
            stepid: 'root',
            clones: step.clones,
            path: []
          };
          var linkedpositions = Object.keys((Object.keys(ARTIFACTS.mandatory ||  {}).length === 0 ?
            (function() {
              var ret = {},
                s0 = TERRAIN.myzone,
                s1 = UNITLAYERS.sniper;
              for (var key in s0) {
                if (!s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) : ARTIFACTS.mandatory));
          var nbrofpositions = linkedpositions.length;
          for (var linknbr = 0; linknbr < nbrofpositions; linknbr++) {
            turn.links.root[linkedpositions[linknbr]] = 'selecttarget1';
          }
          return turn;
        };
    })();
    (function() {
      var TERRAIN = {
        "zone": {
          "b6": {
            "pos": "b6",
            "owner": 1
          },
          "c6": {
            "pos": "c6",
            "owner": 1
          },
          "d6": {
            "pos": "d6",
            "owner": 1
          },
          "e6": {
            "pos": "e6",
            "owner": 1
          },
          "f6": {
            "pos": "f6",
            "owner": 1
          },
          "a1": {
            "pos": "a1",
            "owner": 2
          },
          "a2": {
            "pos": "a2",
            "owner": 2
          },
          "a3": {
            "pos": "a3",
            "owner": 2
          },
          "a4": {
            "pos": "a4",
            "owner": 2
          },
          "a5": {
            "pos": "a5",
            "owner": 2
          }
        },
        "oppzone": {
          "b6": {
            "pos": "b6",
            "owner": 1
          },
          "c6": {
            "pos": "c6",
            "owner": 1
          },
          "d6": {
            "pos": "d6",
            "owner": 1
          },
          "e6": {
            "pos": "e6",
            "owner": 1
          },
          "f6": {
            "pos": "f6",
            "owner": 1
          }
        },
        "myzone": {
          "a1": {
            "pos": "a1",
            "owner": 2
          },
          "a2": {
            "pos": "a2",
            "owner": 2
          },
          "a3": {
            "pos": "a3",
            "owner": 2
          },
          "a4": {
            "pos": "a4",
            "owner": 2
          },
          "a5": {
            "pos": "a5",
            "owner": 2
          }
        },
        "corner": {
          "a6": {
            "pos": "a6"
          }
        }
      };
      var ownernames = ["neutral", "opp", "my"];
      var player = 2;
      var otherplayer = 1;
      game.selecttarget2 =
        function(turn, step, markpos) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
            intersection: Object.assign({}, step.ARTIFACTS.intersection)
          });
          var UNITLAYERS = step.UNITLAYERS;
          var MARKS = Object.assign({}, step.MARKS, {
            selecttarget: markpos
          });
          var STARTPOS = MARKS['selecttarget'];
          var DIR = 3;
          var walkedsquares = [];
          var STOPREASON = "";
          var nextpos = "";
          var POS = STARTPOS;
          while (!(STOPREASON = (!(nextpos = connections[POS][3]) ? "outofbounds" : null))) {
            walkedsquares.push(POS = nextpos);
            if (ARTIFACTS.enemyline[POS]) {
              ARTIFACTS['intersection'][POS] = {};
            }
          }
          var WALKLENGTH = walkedsquares.length;
          var newstepid = step.stepid + '-' + markpos;
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            stepid: newstepid,
            path: step.path.concat(markpos)
          });
          turn.links[newstepid] = {};
          turn.links[newstepid].snipe = 'snipe2';
          return newstep;
        };
      game.snipe2 =
        function(turn, step) {
          var ARTIFACTS = Object.assign({}, step.ARTIFACTS, {
            winline: Object.assign({}, step.ARTIFACTS.winline),
            loseline: Object.assign({}, step.ARTIFACTS.loseline)
          });
          var MARKS = step.MARKS;
          var UNITDATA = Object.assign({}, step.UNITDATA);
          var clones = step.clones;
          var UNITLAYERS = step.UNITLAYERS;
          if (Object.keys(UNITLAYERS.mysniper ||  {}).length === 0) {
            var newunitid = 'spawn' + (clones++);
            UNITDATA[newunitid] = {
              pos: MARKS['selecttarget'],
              id: newunitid,
              group: 'sniper',
              owner: player
            };
          } else {
            var unitid = (UNITLAYERS.units[Object.keys(UNITLAYERS.mysniper)[0]]  || {}).id;
            if (unitid) {
              UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
                'pos': MARKS['selecttarget']
              });
            }
          }
          if (Object.keys(UNITLAYERS.oppsniper ||  {}).length !== 0) {
            if (!!(UNITLAYERS.units[Object.keys(ARTIFACTS.intersection)[0]])) {
              var unitid = (UNITLAYERS.units[Object.keys(ARTIFACTS.intersection)[0]]  || {}).id;
              if (unitid) {
                UNITDATA[unitid] = Object.assign({}, UNITDATA[unitid], {
                  'owner': (((UNITLAYERS.units[Object.keys(ARTIFACTS.intersection)[0]] || {})['owner'] === 2) ? 1 : 2)
                });
              }
            } else {
              var newunitid = 'spawn' + (clones++);
              UNITDATA[newunitid] = {
                pos: Object.keys(ARTIFACTS.intersection)[0],
                id: newunitid,
                group: 'soldiers',
                owner: player
              };
            }
          }
          MARKS = {};
          UNITLAYERS = {
            "sniper": {},
            "mysniper": {},
            "oppsniper": {},
            "neutralsniper": {},
            "soldiers": {},
            "mysoldiers": {},
            "oppsoldiers": {},
            "neutralsoldiers": {},
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
            "winline": {},
            "loseline": {},
            "intersection": {},
            "enemyline": {},
            "potentialempties": {},
            "mandatory": {}
          };
          var walkstarts = UNITLAYERS.soldiers;
          for (var STARTPOS in walkstarts) {
            var allwalkerdirs = [1, 2, 3, 4, 5, 6, 7, 8];
            for (var walkerdirnbr = 0; walkerdirnbr < 8; walkerdirnbr++) {
              var walkedsquares = [];
              var STOPREASON = "";
              var nextpos = "";
              var POS = STARTPOS;
              var allowedsteps = (!!(UNITLAYERS.mysoldiers[STARTPOS]) ? UNITLAYERS.mysoldiers : UNITLAYERS.oppsoldiers);
              while (!(STOPREASON = (!(nextpos = connections[POS][allwalkerdirs[walkerdirnbr]]) ? "outofbounds" : !allowedsteps[nextpos] ? "nomoresteps" : null))) {
                walkedsquares.push(POS = nextpos);
              }
              var WALKLENGTH = walkedsquares.length;
              if ((WALKLENGTH > 2)) {
                ARTIFACTS[(!!(UNITLAYERS.mysoldiers[STARTPOS]) ? 'winline' : 'loseline')][POS] = {};
              }
            }
          }
          var newstepid = step.stepid + '-' + 'snipe';
          var newstep = turn.steps[newstepid] = Object.assign({}, step, {
            ARTIFACTS: ARTIFACTS,
            MARKS: MARKS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            stepid: newstepid,
            path: step.path.concat('snipe'),
            clones: clones
          });
          turn.links[newstepid] = {};
          if (Object.keys(ARTIFACTS.winline ||  {}).length !== 0) {
            var winner = 2;
            var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'madeline';
          } else
          if (Object.keys(ARTIFACTS.loseline ||  {}).length !== 0) {
            var winner = 1;
            var result = winner === 2 ? 'win' : winner ? 'lose' : 'draw';
            turn.links[newstepid][result] = 'madeoppline';
          } else turn.links[newstepid].endturn = "start" + otherplayer;
          return newstep;
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
            "winline": {},
            "loseline": {},
            "intersection": {},
            "enemyline": {},
            "potentialempties": {},
            "mandatory": {}
          };
          var UNITDATA = step.UNITDATA;
          var UNITLAYERS = {
            "sniper": {},
            "mysniper": {},
            "oppsniper": {},
            "neutralsniper": {},
            "soldiers": {},
            "mysoldiers": {},
            "oppsoldiers": {},
            "neutralsoldiers": {},
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
          if (Object.keys(UNITLAYERS.oppsniper ||  {}).length !== 0) {
            var STARTPOS = Object.keys(UNITLAYERS.oppsniper)[0];
            var DIR = 5;
            var walkedsquares = [];
            var STOPREASON = "";
            var nextpos = "";
            var POS = STARTPOS;
            while (!(STOPREASON = (!(nextpos = connections[POS][5]) ? "outofbounds" : null))) {
              walkedsquares.push(POS = nextpos);
              if (!UNITLAYERS.units[POS]) {
                ARTIFACTS['potentialempties'][POS] = {};
              }
              ARTIFACTS['enemyline'][POS] = {};
            }
            var WALKLENGTH = walkedsquares.length;
            var walkstarts = ARTIFACTS.potentialempties;
            for (var STARTPOS in walkstarts) {
              var DIR = 7;
              var walkedsquares = [];
              var STOPREASON = "";
              var nextpos = "";
              var POS = STARTPOS;
              while (!(STOPREASON = (!(nextpos = connections[POS][7]) ? "outofbounds" : null))) {
                walkedsquares.push(POS = nextpos);
              }
              var WALKLENGTH = walkedsquares.length;
              if (!UNITLAYERS.sniper[walkedsquares[WALKLENGTH - 1]]) {
                ARTIFACTS['mandatory'][walkedsquares[WALKLENGTH - 1]] = {};
              }
            }
          }
          var newstep = turn.steps.root = {
            ARTIFACTS: ARTIFACTS,
            UNITDATA: UNITDATA,
            UNITLAYERS: UNITLAYERS,
            MARKS: MARKS,
            stepid: 'root',
            clones: step.clones,
            path: []
          };
          var linkedpositions = Object.keys((Object.keys(ARTIFACTS.mandatory ||  {}).length === 0 ?
            (function() {
              var ret = {},
                s0 = TERRAIN.myzone,
                s1 = UNITLAYERS.sniper;
              for (var key in s0) {
                if (!s1[key]) {
                  ret[key] = s0[key];
                }
              }
              return ret;
            }()) : ARTIFACTS.mandatory));
          var nbrofpositions = linkedpositions.length;
          for (var linknbr = 0; linknbr < nbrofpositions; linknbr++) {
            turn.links.root[linkedpositions[linknbr]] = 'selecttarget2';
          }
          return turn;
        };
    })();
    game.newGame =
      function() {
        var turnseed = {
          turn: 0
        };
        var stepseed = {
          UNITDATA: {}
          ,
          clones: 0
        };
        return game.start1(turnseed, stepseed);
      };
    game.commands = {
      "snipe": 1
    };
    game.graphics = {
      "icons": {
        "soldiers": "pawns",
        "sniper": "kings"
      },
      "tiles": {
        "zone": "grass",
        "corner": "castle"
      }
    };
    game.board = {
      "height": 6,
      "width": 6,
      "terrain": {
        "zone": {
          "1": [
            ["rect", "b6", "f6", 5]
          ],
          "2": [
            ["rect", "a1", "a5", 3]
          ]
        },
        "corner": ["a6"]
      }
    };
    return game;
  }
)()
  };
