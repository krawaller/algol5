import {Definition} from '../../types';
import { _testUnit, _testArtifactLayer, _testLayer, _testGenerator, _testMark, _testCommand } from './_types';

const _testRules: Definition<_testUnit, _testArtifactLayer, _testLayer, _testGenerator, _testMark, _testCommand> = {
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
  commands: {},
  generators: {
    stepsfirst: {
      type: "walker",
      dirs: [1, 5],
      starts: ["intersect", "mystepsfirsts", ["single", ["mark", "selectunit"]]],
      steps: "steps",
      testblocksbeforesteps: false,
      blocks: "units",
      draw: {
        steps: {
          tolayer: "marks"
        },
        block: {
          tolayer: "blocks"
        }
      }
    },
    blocksfirst: {
      type: "walker",
      dirs: [1, 5],
      starts: ["intersect", "myblocksfirsts", ["single", ["mark", "selectunit"]]],
      steps: "steps",
      testblocksbeforesteps: true,
      blocks: "units",
      draw: {
        steps: {
          tolayer: "marks"
        },
        block: {
          tolayer: "blocks"
        }
      }
    },
    defaultfirst: {
      type: "walker",
      dirs: [1, 5],
      starts: ["intersect", "mydefaultfirsts", ["single", ["mark", "selectunit"]]],
      steps: "steps",
      blocks: "units",
      draw: {
        steps: {
          tolayer: "marks"
        },
        block: {
          tolayer: "blocks"
        }
      }
    },
    noblock: {
      type: "walker",
      dirs: [1, 5],
      starts: ["intersect", "mynoblocks", ["single", ["mark", "selectunit"]]],
      steps: "steps",
      blocks: "units",
      draw: {
        steps: {
          tolayer: "marks"
        }
      }
    }
  }
};

export default _testRules;
