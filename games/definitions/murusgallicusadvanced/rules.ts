import {Definition} from '../../types';
import { MurusgallicusadvancedTerrain, MurusgallicusadvancedUnit } from './_types';

const murusgallicusadvancedRules: Definition<MurusgallicusadvancedTerrain, MurusgallicusadvancedUnit> = {
  startTurn: {
    links: ["selecttower", "selectcatapult"]
  },
  endGame: {
    infiltration: {
      condition: ["overlaps", "myunits", "opphomerow"],
      show: ["intersect", "myunits", "opphomerow"]
    }
  },
  marks: {
    selecttower: {
      from: "mytowers",
      runGenerators: ["findmovetargets", "findkilltargets"],
      links: ["selectmove", "selectkill"]
    },
    selectmove: {
      from: "movetargets",
      runGenerator: "findmoveresults",
      link: "move"
    },
    selectkill: {
      from: "killtargets",
      links: ["kill", ["if", ["anyat", "oppcatapults", "selectkill"], "sacrifice"]]
    },
    selectcatapult: {
      from: "mycatapults",
      runGenerator: "findfiretargets",
      link: "selectfire"
    },
    selectfire: {
      from: "firetargets",
      link: "fire"
    }
  },
  commands: {
    move: {
      applyEffects: [
        ["killat", "selecttower"],
        ["forposin", "madecatapults", ["setat", ["target"], "group", "catapults"]],
        ["forposin", "madetowers", ["setat", ["target"], "group", "towers"]],
        ["forposin", "madewalls", ["spawn", ["target"], "walls", ["player"], {
          from: ["pos", "selecttower"]
        }]]
      ],
      link: "endturn"
    },
    kill: {
      applyEffects: [
        ["setat", "selecttower", "group", "walls"],
        ["ifelse", ["anyat", "oppcatapults", "selectkill"],
          ["setat", "selectkill", "group", "towers"],
          ["killat", "selectkill"]
        ]
      ],
      link: "endturn"
    },
    sacrifice: {
      applyEffects: [
        ["setat", "selectkill", "group", "walls"],
        ["killat", "selecttower"]
      ],
      link: "endturn"
    },
    fire: {
      applyEffects: [
        ["ifelse", ["anyat", "oppwalls", "selectfire"],
          ["killat", "selectfire"],
          ["ifelse", ["anyat", "oppunits", "selectfire"],
            ["setat", "selectfire", "group", ["ifelse", ["anyat", "oppcatapults", "selectfire"], "towers", "walls"]],
            ["spawn", "selectfire", "walls", ["player"], {
              from: ["pos", "selectcatapult"]
            }]
          ]
        ],
        ["setat", "selectcatapult", "group", "towers"]
      ],
      link: "endturn"
    }
  },
  generators: {
    findfiretargets: {
      type: "walker",
      start: "selectcatapult",
      dirs: ["playercase", [7, 8, 1, 2, 3],
        [3, 4, 5, 6, 7]
      ],
      max: 3,
      draw: {
        steps: {
          condition: ["and", ["morethan", ["step"], 1],
            ["noneat", "myunits", ["target"]]
          ],
          tolayer: "firetargets"
        }
      }
    },
    findmovetargets: {
      type: "walker",
      blocks: ["union", "oppunits", "mycatapults"],
      start: "selecttower",
      dirs: [1, 2, 3, 4, 5, 6, 7, 8],
      max: 2,
      draw: {
        steps: {
          condition: ["and", ["same", ["walklength"], 2],
            ["same", ["step"], 2]
          ],
          tolayer: "movetargets",
          include: {
            dir: ["dir"]
          }
        }
      }
    },
    findmoveresults: {
      type: "neighbour",
      dir: ["reldir", 5, ["read", "movetargets", "selectmove", "dir"]],
      start: "selectmove",
      draw: {
        start: {
          tolayer: ["ifelse", ["anyat", "myunits", "selectmove"],
            ["ifelse", ["anyat", "mytowers", "selectmove"], "madecatapults", "madetowers"], "madewalls"
          ]
        },
        neighbours: {
          tolayer: ["ifelse", ["anyat", "myunits", ["target"]],
            ["ifelse", ["anyat", "mytowers", ["target"]], "madecatapults", "madetowers"], "madewalls"
          ]
        }
      }
    },
    findkilltargets: {
      type: "neighbour",
      start: "selecttower",
      dirs: [1, 2, 3, 4, 5, 6, 7, 8],
      ifover: ["union", "oppcatapults", "oppwalls"],
      draw: {
        neighbours: {
          tolayer: "killtargets"
        }
      }
    }
  }
};

export default murusgallicusadvancedRules;
