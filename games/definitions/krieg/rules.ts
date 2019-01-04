import {Definition} from '../../types';
import { KriegArtifactLayer, KriegCommand, KriegGenerator, KriegLayer, KriegMark, KriegUnit } from './_types';

const kriegRules: Definition<KriegArtifactLayer, KriegCommand, KriegGenerator, KriegLayer, KriegMark, KriegUnit> = {
  marks: {
    selectunit: {
      from: "mynotfrozens",
      runGenerator: "findmovetargets",
      link: "selectmove"
    },
    selectmove: {
      from: "movetargets",
      link: "move"
    }
  },
  startTurn: {
    link: "selectunit"
  },
  endGame: {
    cornerinfiltration: {
      condition: ["overlaps", "oppcorners", "myunits"],
      show: ["intersect", "oppcorners", "myunits"]
    },
    occupation: {
      condition: ["same", ["sizeof", ["intersect", "oppbases", "myunits"]], 2],
      show: ["intersect", "oppbases", "myunits"]
    }
  },
  commands: {
    move: {
      applyEffects: [
        ["foridin", "myfrozens", ["setid", ["loopid"], "group", "notfrozens"]],
        ["setat", "selectunit", "group", "frozens"],
        ["moveat", "selectunit", "selectmove"]
      ],
      link: "endturn"
    }
  },
  generators: {
    findmovetargets: {
      type: "neighbour",
      start: "selectunit",
      unlessover: "units",
      dirs: ["ifelse", ["anyat", "southeast", ["start"]],
        [1, 3, 4, 5, 7],
        ["ifelse", ["anyat", "northwest", ["start"]],
          [1, 3, 5, 7, 8],
          [1, 3, 5, 7]
        ]
      ],
      draw: {
        neighbours: {
          tolayer: "movetargets"
        }
      }
    }
  }
};

export default kriegRules;
