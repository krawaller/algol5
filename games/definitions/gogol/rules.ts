import {Definition} from '../../types';
import { GogolTerrain, GogolUnit } from './_types';

const gogolRules: Definition<GogolTerrain, GogolUnit> = {
  startTurn: {
    runGenerators: ["findforbiddenkingspots", "findforbiddensoldierspots"],
    link: ["ifelse", ["morethan", ["turn"], 2], "selectunit", "selectkingdeploy"]
  },
  marks: {
    selectkingdeploy: {
      from: ["subtract", "board", ["union", "units", "nokings"]],
      link: "deploy"
    },
    selectunit: {
      from: "myunits",
      runGenerators: ["findkingwalktargets", "findadjacentenemies", "findjumptargets"],
      links: ["selectmovetarget", "selectjumptarget"]
    },
    selectmovetarget: {
      from: ["ifelse", ["anyat", "mykings", "selectunit"], "kingwalk", ["subtract", "board", ["union", "units", ["union", "nosoldiers", "jumptargets"]]]],
      link: "move"
    },
    selectjumptarget: {
      from: "jumptargets",
      runGenerator: "findsplashed",
      link: "jump"
    }
  },
  commands: {
    deploy: {
      applyEffect: ["spawn", "selectkingdeploy", "kings"],
      link: "endturn"
    },
    move: {
      applyEffect: ["moveat", "selectunit", "selectmovetarget"],
      link: "endturn"
    },
    jump: {
      applyEffects: [
        ["killat", ["onlyin", "splashed"]],
        ["moveat", "selectunit", "selectjumptarget"]
      ],
      link: "endturn"
    }
  },
  endGame: {
    infiltration: {
      condition: ["overlaps", "mykings", "opphomerow"]
    },
    kingkill: {
      condition: ["and", ["morethan", ["turn"], 2],
        ["isempty", "oppkings"]
      ]
    }
  },
  generators: {
    findforbiddenkingspots: {
      type: "neighbour",
      starts: ["intersect", "edges", "mysoldiers"],
      dirs: ["ifelse", ["anyat", "homerow", ["start"]],
        ["list", [1, 3, 5, 7]],
        ["list", [1, 5]]
      ],
      draw: {
        neighbours: {
          tolayer: "nokings"
        }
      }
    },
    findforbiddensoldierspots: {
      type: "neighbour",
      dirs: [1, 3, 5, 7],
      starts: "mykings",
      condition: ["or", ["anyat", "homerow", ["target"]],
        ["and", ["anyat", "edges", ["start"]],
          ["anyat", "edges", ["target"]]
        ]
      ],
      draw: {
        neighbours: {
          tolayer: "nosoldiers"
        }
      }
    },
    findkingwalktargets: {
      type: "walker",
      starts: ["union", "mykings", "selectunit"],
      dirs: [1, 2, 3, 4, 5, 6, 7, 8],
      blocks: "units",
      draw: {
        steps: {
          unlessover: "nokings",
          tolayer: "kingwalk"
        }
      }
    },
    findadjacentenemies: {
      type: "neighbour",
      start: "selectunit",
      dirs: [1, 2, 3, 4, 5, 6, 7, 8],
      ifover: "oppunits",
      draw: {
        neighbours: {
          tolayer: "adjacentenemies",
          include: {
            dir: ["dir"]
          }
        }
      }
    },
    findsplashed: {
      type: "filter",
      layer: "willdie",
      matching: {
        dir: ["is", ["read", "jumptargets", "selectjumptarget", "dir"]]
      },
      tolayer: "splashed"
    },
    findjumptargets: {
      type: "neighbour",
      starts: "adjacentenemies",
      dir: ["reldir", 1, ["read", "adjacentenemies", ["start"], "dir"]],
      unlessover: ["union", "units", ["ifelse", ["anyat", "mykings", "selectunit"], "nokings", "nosoldiers"]],
      draw: {
        start: {
          condition: ["truthy", ["neighbourcount"]],
          tolayer: "willdie",
          include: {
            dir: ["dir"]
          }
        },
        neighbours: {
          tolayer: "jumptargets",
          include: {
            dir: ["dir"]
          }
        }
      }
    }
  }
};

export default gogolRules;
