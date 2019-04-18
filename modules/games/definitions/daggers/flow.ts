import { DaggersFlow } from './_types';

const daggersFlow: DaggersFlow = {
  endGame: {
    infiltration: {
      condition: { overlaps: ["mycrowns", "oppbase"] },
      show: { intersect: ["mycrowns", "oppbase"] }
    },
    regicide: { condition: { same: [{ sizeof: "oppcrowns" }, 1] } }
  },
  startTurn: { link: "selectunit" },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerator: {
        ifelse: [
          { anyat: ["mycrowns", "selectunit"] },
          "findcrowntargets",
          "finddaggertargets"
        ]
      },
      link: "selectmovetarget"
    },
    selectmovetarget: { from: "movetarget", link: "move" }
  },
  commands: {
    move: {
      applyEffect: { stompat: ["selectunit", "selectmovetarget"] },
      link: "endTurn"
    }
  }
};

export default daggersFlow;
