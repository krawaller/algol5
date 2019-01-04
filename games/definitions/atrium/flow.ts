import {Flow} from '../../types';
import { AtriumArtifactLayer, AtriumCommand, AtriumGenerator, AtriumLayer, AtriumMark, AtriumUnit } from './_types';

const atriumFlow: Flow<AtriumArtifactLayer, AtriumCommand, AtriumGenerator, AtriumLayer, AtriumMark, AtriumUnit> = {
  endGame: {
    madewinline: {
      condition: ["notempty", "winline"],
      show: "winline"
    }
  },
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
      applyEffect: ["moveat", "selectunit", "selectmovetarget"],
      runGenerator: "findwinlines",
      link: "endturn"
    }
  }
};

export default atriumFlow;
