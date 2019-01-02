import {Definition} from '../../types';
import { AmazonsUnit, AmazonsArtifactLayer, AmazonsLayer, AmazonsGenerator, AmazonsMark, AmazonsCommand } from './_types';

const amazonsRules: Definition<AmazonsUnit, AmazonsArtifactLayer, AmazonsLayer, AmazonsGenerator, AmazonsMark, AmazonsCommand> = {
  startTurn: {
    link: "selectunit"
  },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerator: "findtargets",
      link: "selectmovetarget"
    },
    selectmovetarget: {
      nodeadends: true,
      from: "targets",
      link: "move"
    },
    selectfiretarget: {
      from: "targets",
      link: "fire"
    }
  },
  commands: {
    move: {
      applyEffects: [
        ["moveat", "selectunit", "selectmovetarget"],
        ["setturnpos", "movedto", "selectmovetarget"]
      ],
      runGenerator: "findtargets",
      link: "selectfiretarget"
    },
    fire: {
      applyEffect: ["spawn", "selectfiretarget", "fires", 0, {
        from: ["turnpos", "movedto"]
      }],
      link: "endturn"
    }
  },
  generators: {
    findtargets: {
      type: "walker",
      dirs: [1, 2, 3, 4, 5, 6, 7, 8],
      start: ["actionor", "selectunit", "selectunit", ["turnpos", "movedto"]],
      blocks: "units",
      draw: {
        steps: {
          tolayer: "targets"
        }
      }
    }
  }
};

export default amazonsRules;
