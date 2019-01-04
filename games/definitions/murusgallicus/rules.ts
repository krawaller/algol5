import {Definition} from '../../types';
import { MurusgallicusArtifactLayer, MurusgallicusCommand, MurusgallicusGenerator, MurusgallicusLayer, MurusgallicusMark, MurusgallicusUnit } from './_types';

const murusgallicusRules: Definition<MurusgallicusArtifactLayer, MurusgallicusCommand, MurusgallicusGenerator, MurusgallicusLayer, MurusgallicusMark, MurusgallicusUnit> = {
  startTurn: {
    link: "selecttower"
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
      runGenerators: ["findmoveresults"],
      link: "move"
    },
    selectkill: {
      from: "killtargets",
      link: "kill"
    }
  },
  commands: {
    move: {
      applyEffects: [
        ["killat", "selecttower"],
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
        ["killat", "selectkill"]
      ],
      link: "endturn"
    }
  },
  generators: {
    findmovetargets: {
      type: "walker",
      dirs: [1, 2, 3, 4, 5, 6, 7, 8],
      blocks: ["union", "oppunits", "mytowers"],
      start: "selecttower",
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
          tolayer: ["ifelse", ["anyat", "myunits", "selectmove"], "madetowers", "madewalls"]
        },
        neighbours: {
          tolayer: ["ifelse", ["anyat", "myunits", ["target"]], "madetowers", "madewalls"]
        }
      }
    },
    findkilltargets: {
      type: "neighbour",
      start: "selecttower",
      dirs: [1, 2, 3, 4, 5, 6, 7, 8],
      ifover: "oppwalls",
      draw: {
        neighbours: {
          tolayer: "killtargets"
        }
      }
    }
  }
};

export default murusgallicusRules;
