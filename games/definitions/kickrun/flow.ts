import {Flow} from '../../types';
import { KickrunArtifactLayer, KickrunCommand, KickrunGenerator, KickrunLayer, KickrunMark, KickrunUnit } from './_types';

const kickrunFlow: Flow<KickrunArtifactLayer, KickrunCommand, KickrunGenerator, KickrunLayer, KickrunMark, KickrunUnit> = {
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
      link: "move"
    }
  },
  commands: {
    move: {
      applyEffect: ["stompat", "selectunit", "selectmovetarget"],
      link: "endturn"
    }
  },
  endGame: {
    infiltration: {
      condition: ["overlaps", "myrunners", "oppcorners"],
      show: ["intersect", "myrunners", "oppcorners"]
    }
  }
};

export default kickrunFlow;
