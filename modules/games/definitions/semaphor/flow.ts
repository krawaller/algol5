import {Flow} from '../../../types';
import { SemaphorArtifactLayer, SemaphorCommand, SemaphorGenerator, SemaphorLayer, SemaphorMark, SemaphorUnit } from './_types';

const semaphorFlow: Flow<SemaphorArtifactLayer, SemaphorCommand, SemaphorGenerator, SemaphorLayer, SemaphorMark, SemaphorUnit> = {
  startTurn: {
    links: ["selectdeploytarget", "selectunit"]
  },
  endGame: {
    madeline: {
      condition: ["notempty", "line"],
      show: "line"
    }
  },
  marks: {
    selectdeploytarget: {
      from: ["subtract", "board", "units"],
      link: "deploy"
    },
    selectunit: {
      from: ["union", "pawns", "bishops"],
      link: "promote"
    }
  },
  commands: {
    deploy: {
      applyEffect: ["spawn", "selectdeploytarget", "pawns", 0],
      runGenerator: "findlines",
      link: "endturn"
    },
    promote: {
      applyEffect: ["setat", "selectunit", "group", ["ifelse", ["anyat", "pawns", "selectunit"], "bishops", "kings"]],
      runGenerator: "findlines",
      link: "endturn"
    }
  }
};

export default semaphorFlow;
