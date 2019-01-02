import {Definition} from '../../types';
import { OrthokonUnit, OrthokonArtifactLayer, OrthokonLayer, OrthokonGenerator, OrthokonMark, OrthokonCommand } from './_types';

const orthokonRules: Definition<OrthokonUnit, OrthokonArtifactLayer, OrthokonLayer, OrthokonGenerator, OrthokonMark, OrthokonCommand> = {
  startTurn: {
    link: "selectunit"
  },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerator: "findmovetargets",
      link: "selectmovetarget"
    },
    selectmovetarget: {
      from: "movetargets",
      runGenerator: "findvictims",
      link: "move"
    }
  },
  commands: {
    move: {
      applyEffects: [
        ["moveat", "selectunit", "selectmovetarget"],
        ["setin", "victims", "owner", ["currentplayer"]]
      ],
      link: "endturn"
    }
  },
  generators: {
    findvictims: {
      type: "neighbour",
      start: "selectmovetarget",
      dirs: [1, 3, 5, 7],
      ifover: "oppunits",
      draw: {
        neighbours: {
          tolayer: "victims"
        }
      }
    },
    findmovetargets: {
      type: "walker",
      start: "selectunit",
      dirs: [1, 2, 3, 4, 5, 6, 7, 8],
      blocks: "units",
      draw: {
        last: {
          tolayer: "movetargets"
        }
      }
    }
  }
};

export default orthokonRules;
