import { KingsvalleyDefinition } from "./_types";

const kingsvalleyFlow: KingsvalleyDefinition["flow"] = {
  endGame: {
    kinghome: {
      condition: { overlaps: ["mykings", "goal"] },
      show: { intersect: ["mykings", "goal"] },
    },
  },
  startTurn: {
    link: "selectunit",
  },
  commands: {
    slide: {
      applyEffect: {
        moveat: ["selectunit", "selectmovetarget"],
      },
      link: "endTurn",
    },
  },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerator: "findmovetargets",
      link: "selectmovetarget",
    },
    selectmovetarget: {
      from: "movetargets",
      link: "slide",
    },
  },
};

export default kingsvalleyFlow;
