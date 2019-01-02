import {Definition} from '../../types';

const threemusketeersRules: Definition = {
  startTurn: {
    link: "selectunit"
  },
  endGame: {
    musketeersinline: {
      condition: ["notempty", "musketeerline"],
      who: 2,
      show: "kings"
    },
    strandedmusketeers: {
      condition: ["same", ["sizeof", "strandedmusketeers"], 3],
      who: 1
    }
  },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerator: "findmovetargets",
      link: "selectmovetarget"
    },
    selectmovetarget: {
      from: "movetargets",
      link: "move"
    }
  },
  commands: {
    move: {
      applyEffect: ["stompat", "selectunit", "selectmovetarget"],
      runGenerators: ["findmusketeerline", ["ifplayer", 2, "findstrandedmusketeers"]],
      link: "endturn"
    }
  },
  generators: {
    findstrandedmusketeers: {
      type: "neighbour",
      dirs: [1, 3, 5, 7],
      starts: "kings",
      ifover: "pawns",
      draw: {
        start: {
          condition: ["falsy", ["neighbourcount"]],
          tolayer: "strandedmusketeers"
        }
      }
    },
    findmusketeerline: {
      type: "walker",
      dirs: [1, 3, 5, 7],
      starts: "kings",
      count: "kings",
      draw: {
        start: {
          condition: ["same", 2, ["totalcount"]],
          tolayer: "musketeerline"
        }
      }
    },
    findmovetargets: {
      type: "neighbour",
      dirs: [1, 3, 5, 7],
      start: "selectunit",
      condition: ["playercase", ["anyat", "oppunits", ["target"]],
        ["noneat", "units", ["target"]]
      ],
      draw: {
        neighbours: {
          tolayer: "movetargets"
        }
      }
    }
  }
};

export default threemusketeersRules;
