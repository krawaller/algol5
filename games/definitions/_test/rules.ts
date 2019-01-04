import {Definition} from '../../types';
import { _testArtifactLayer, _testCommand, _testGenerator, _testLayer, _testMark, _testUnit } from './_types';

const _testRules: Definition<_testArtifactLayer, _testCommand, _testGenerator, _testLayer, _testMark, _testUnit> = {
  startTurn: {
    link: "selectunit"
  },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerators: ["stepsfirst", "blocksfirst", "defaultfirst", "noblock"],
      link: "selectmark"
    },
    selectmark: {
      from: ["union", "marks", "blocks"],
      link: "endturn"
    }
  },
  commands: {}
};

export default _testRules;
