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
  }
};

export default murusgallicusRules;
