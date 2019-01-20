import { _testGenerators } from './_types';

const _testGenerators: _testGenerators = {
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
};

export default _testGenerators;
