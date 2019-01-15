import { _testFlow } from './_types';

const _testFlow: _testFlow = {
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

export default _testFlow;
