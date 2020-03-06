import { KickrunDefinition } from "./_types";

const kickrunFlow: KickrunDefinition["flow"] = {
  startTurn: { link: "selectunit" },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerator: "findmovetargets",
      link: "selectmovetarget"
    },
    selectmovetarget: { from: "movetargets", link: "move" }
  },
  commands: {
    move: {
      applyEffect: { stompat: ["selectunit", "selectmovetarget"] },
      link: "endTurn"
    }
  },
  endGame: {
    infiltration: {
      condition: { overlaps: ["myrunners", "oppcorners"] },
      show: { intersect: ["myrunners", "oppcorners"] }
    }
  }
};

export default kickrunFlow;
