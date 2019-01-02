import {Definition} from '../../types';
import { ShoveoffUnit, ShoveoffArtifactLayer, ShoveoffLayer, ShoveoffGenerator, ShoveoffMark, ShoveoffCommand } from './_types';

const shoveoffRules: Definition<ShoveoffUnit, ShoveoffArtifactLayer, ShoveoffLayer, ShoveoffGenerator, ShoveoffMark, ShoveoffCommand> = {
  TODO: "findaffected SHOULD BE AN OFFSET",
  endGame: {
    madeline: {
      condition: ["notempty", "fourinarow"],
      show: "fourinarow"
    }
  },
  startTurn: {
    link: "selectpushpoint"
  },
  marks: {
    selectpushpoint: {
      from: "edge",
      runGenerators: ["findaffected", "findresults"],
      links: [
        ["if", ["notempty", "spawnsouth"], "south"],
        ["if", ["notempty", "spawnnorth"], "north"],
        ["if", ["notempty", "spawnwest"], "west"],
        ["if", ["notempty", "spawneast"], "east"]
      ]
    }
  },
  commands: {
    north: {
      applyEffects: [
        ["killat", ["onlyin", "squishnorth"]],
        ["pushin", "pushnorth", 1, 1],
        ["spawn", ["onlyin", "spawnnorth"], "soldiers", ["ifelse", ["morethan", 8, ["sizeof", "myunits"]],
          ["player"], 0
        ]]
      ],
      runGenerator: "findfourinarow",
      link: "endturn"
    },
    south: {
      applyEffects: [
        ["killat", ["onlyin", "squishsouth"]],
        ["pushin", "pushsouth", 5, 1],
        ["spawn", ["onlyin", "spawnsouth"], "soldiers", ["ifelse", ["morethan", 8, ["sizeof", "myunits"]],
          ["player"], 0
        ]]
      ],
      runGenerator: "findfourinarow",
      link: "endturn"
    },
    east: {
      applyEffects: [
        ["killat", ["onlyin", "squisheast"]],
        ["pushin", "pusheast", 3, 1],
        ["spawn", ["onlyin", "spawneast"], "soldiers", ["ifelse", ["morethan", 8, ["sizeof", "myunits"]],
          ["player"], 0
        ]]
      ],
      runGenerator: "findfourinarow",
      link: "endturn"
    },
    west: {
      applyEffects: [
        ["killat", ["onlyin", "squishwest"]],
        ["pushin", "pushwest", 7, 1],
        ["spawn", ["onlyin", "spawnwest"], "soldiers", ["ifelse", ["morethan", 8, ["sizeof", "myunits"]],
          ["player"], 0
        ]]
      ],
      runGenerator: "findfourinarow",
      link: "endturn"
    }
  },
  generators: {
    findaffected: {
      type: "walker",
      start: "selectpushpoint",
      dirs: [1, 3, 5, 7],
      draw: {
        last: {
          condition: ["same", ["walklength"], 3],
          unlessover: "oppunits",
          tolayer: "targetedgepoints",
          include: {
            dir: ["reldir", ["dir"], 5]
          }
        }
      }
    },
    findresults: {
      type: "walker",
      starts: "targetedgepoints",
      dir: ["read", "targetedgepoints", ["start"], "dir"],
      startasstep: true,
      draw: {
        start: {
          tolayer: ["ifelse", ["same", ["dir"], 1], "squishsouth", ["ifelse", ["same", ["dir"], 3], "squishwest", ["ifelse", ["same", ["dir"], 5], "squishnorth", "squisheast"]]]
        },
        steps: {
          condition: ["different", ["step"], 1],
          tolayer: ["ifelse", ["same", ["dir"], 1], "pushsouth", ["ifelse", ["same", ["dir"], 3], "pushwest", ["ifelse", ["same", ["dir"], 5], "pushnorth", "pusheast"]]]
        },
        last: {
          tolayer: ["ifelse", ["same", ["dir"], 1], "spawnsouth", ["ifelse", ["same", ["dir"], 3], "spawnwest", ["ifelse", ["same", ["dir"], 5], "spawnnorth", "spawneast"]]]
        }
      }
    },
    findfourinarow: {
      type: "walker",
      starts: "myunits",
      steps: "myunits",
      startasstep: true,
      draw: {
        steps: {
          condition: ["same", ["walklength"], 4],
          tolayer: "fourinarow"
        }
      }
    }
  }
};

export default shoveoffRules;
