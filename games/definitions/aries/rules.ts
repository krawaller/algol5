import {Definition} from '../../types';
import { AriesArtifactLayer, AriesCommand, AriesGenerator, AriesLayer, AriesMark, AriesUnit } from './_types';

const ariesRules: Definition<AriesArtifactLayer, AriesCommand, AriesGenerator, AriesLayer, AriesMark, AriesUnit> = {
  startTurn: {
    link: "selectunit"
  },
  endGame: {
    invade: {
      condition: ["overlaps", "oppcorner", "myunits"],
      show: ["intersect", "oppcorner", "myunits"]
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
      runGenerator: ["if", ["anyat", "oppunits", "selectmovetarget"], "findpushresults"],
      link: "move"
    }
  },
  commands: {
    move: {
      applyEffects: [
        ["setbattlevar", "pusheeid", ["idat", "selectmovetarget"]],
        ["setbattlepos", "pushsquare", "selectmovetarget"],
        ["pushin", "beingpushed", ["read", "movetargets", "selectmovetarget", "dir"], 1],
        ["killin", "squished"],
        ["moveat", "selectunit", "selectmovetarget"]
      ],
      link: "endturn"
    }
  }
};

export default ariesRules;
