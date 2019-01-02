import {AI} from '../../types';

const murusgallicusAI: AI = {
  terrain: {
    threatrow: {
      "1": [
        ["rect", "a3", "h3"]
      ],
      "2": [
        ["rect", "a5", "h5"]
      ]
    }
  },
  scorings: {
    basic: [
      [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [2, 3, 4, 4, 4, 4, 3, 2],
        [0, 0, 3, 3, 3, 3, 0, 0],
        [0, 0, 2, 2, 2, 2, 0, 0],
        [0, 0, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ], "mirror"
    ]
  },
  generators: {
    findmymoves: {
      type: "walker",
      dirs: [1, 2, 3, 4, 5, 6, 7, 8],
      blocks: ["union", "towers", "oppwalls"],
      starts: "mytowers",
      max: 2,
      draw: {
        steps: {
          condition: ["and", ["same", ["walklength"], 2],
            ["same", ["step"], 2]
          ],
          tolayer: "mymoves"
        }
      }
    },
    findoppmoves: {
      type: "walker",
      dirs: [1, 2, 3, 4, 5, 6, 7, 8],
      blocks: ["union", "towers", "mywalls"],
      starts: "opptowers",
      max: 2,
      draw: {
        steps: {
          condition: ["and", ["same", ["walklength"], 2],
            ["same", ["step"], 2]
          ],
          tolayer: "oppmoves"
        }
      }
    },
    findoppthreats: {
      type: "filter",
      layer: "mythreatrow",
      condition: ["anyat", "oppmoves", ["target"]],
      tolayer: ["ifelse", ["anyat", "oppwalls", ["target"]], "oppheavythreats", "opplightthreats"]
    }
  },
  aspects: {
    mymoves: ["sizeof", "mymoves"],
    mytowerpos: ["score", "mytowers", "mybasic"],
    mywallpos: ["score", "mytowers", "mybasic"],
    oppmoves: ["sizeof", "oppmoves"],
    mytowercount: ["sizeof", "mytowers"],
    oppwinmoves: ["sizeof", ["union", "oppmoves", "myhomerow"]],
    opplightthreats: ["sizeof", "opplightthreats"],
    oppheavythreats: ["sizeof", "oppheavythreats"]
  },
  brains: {
    Steve: {
      generators: ["findoppmoves", "findoppthreats"],
      plus: {
        mytowercount: 2,
        mywallpos: 1,
        mytowerpos: 2
      },
      minus: {
        oppwinmoves: 10000,
        opplightthreats: 20,
        oppheavythreats: 500
      }
    },
    Joe: {
      generators: ["findoppmoves"],
      plus: {
        mytowercount: 2,
        mywallpos: 1,
        mytowerpos: 2
      },
      minus: {
        oppwinmoves: 100
      }
    },
    Clive: {
      generators: ["findmymoves", "findoppmoves"],
      plus: {
        mymoves: 1,
        mytowerpos: 3,
        mywallpos: 1
      },
      minus: {
        oppmoves: 1
      }
    }
  }
};

export default murusgallicusAI;
