import {Flow} from '../../types';
import { AmazonsArtifactLayer, AmazonsCommand, AmazonsGenerator, AmazonsLayer, AmazonsMark, AmazonsUnit } from './_types';

const amazonsFlow: Flow<AmazonsArtifactLayer, AmazonsCommand, AmazonsGenerator, AmazonsLayer, AmazonsMark, AmazonsUnit> = {
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
  }
};

export default amazonsFlow;
