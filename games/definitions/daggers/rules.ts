import {Definition} from '../../types';
import { DaggersArtifactLayer, DaggersCommand, DaggersGenerator, DaggersLayer, DaggersMark, DaggersUnit } from './_types';

const daggersRules: Definition<DaggersArtifactLayer, DaggersCommand, DaggersGenerator, DaggersLayer, DaggersMark, DaggersUnit> = {
  endGame: {
    infiltration: {
      condition: ["overlaps", "mycrowns", "oppbase"],
      show: ["intersect", "mycrowns", "oppbase"]
    },
    regicide: {
      condition: ["same", ["sizeof", "oppcrowns"], 1]
    }
  },
  startTurn: {
    link: "selectunit"
  },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerator: ["ifelse", ["anyat", "mycrowns", "selectunit"], "findcrowntargets", "finddaggertargets"],
      link: "selectmovetarget"
    },
    selectmovetarget: {
      from: "movetarget",
      link: "move"
    }
  },
  commands: {
    move: {
      applyEffects: [
        ["stompat", "selectunit", "selectmovetarget"]
      ],
      link: "endturn"
    }
  }
};

export default daggersRules;
