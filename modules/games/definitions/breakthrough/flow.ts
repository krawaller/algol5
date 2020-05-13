import { BreakthroughDefinition } from "./_types";

const breakthroughFlow: BreakthroughDefinition["flow"] = {
  endGame: {
    invasion: {
      condition: { overlaps: ["myunits", "oppbase"] },
      show: { intersect: ["myunits", "oppbase"] },
    },
  },
  startTurn: {
    link: "selectunit",
  },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerator: "findmovetargets",
      link: "selectmovetarget",
    },
    selectmovetarget: { from: "movetargets", link: "move" },
  },
  commands: {
    move: {
      applyEffects: [{ stompat: ["selectunit", "selectmovetarget"] }],
      link: "endTurn",
    },
  },
};

export default breakthroughFlow;
