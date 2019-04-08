import { UglyduckFlow } from './_types';

const uglyduckFlow: UglyduckFlow = {
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
