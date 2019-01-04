import {Flow} from '../../types';
import { UglyduckArtifactLayer, UglyduckCommand, UglyduckGenerator, UglyduckLayer, UglyduckMark, UglyduckUnit } from './_types';

const uglyduckFlow: Flow<UglyduckArtifactLayer, UglyduckCommand, UglyduckGenerator, UglyduckLayer, UglyduckMark, UglyduckUnit> = {
  startTurn: {
    link: "selectunit"
  },
  endGame: {
    swanhome: {
      condition: ["overlaps", "mykings", "myhomerow"],
      show: ["intersect", "mykings", "myhomerow"]
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
      link: "move"
    }
  },
  commands: {
    move: {
      applyEffects: [
        ["if", ["anyat", "opphomerow", "selectmovetarget"],
          ["setat", "selectunit", "group", "kings"]
        ],
        ["stompat", "selectunit", "selectmovetarget"]
      ],
      link: "endturn"
    }
  }
};

export default uglyduckFlow;
