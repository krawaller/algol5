import { KingsvalleyDefinition } from "./_types";

const kingsvalleyFlow: KingsvalleyDefinition["flow"] = {
  endGame: {
    kinghome: {
      condition: { overlaps: ["mykings", "goal"] },
      show: { intersect: ["mykings", "goal"] },
      prio: 1,
    },
    trappedenemy: {
      condition: { notempty: "enemytrappedkings" },
      show: "enemytrappedkings",
      prio: 2,
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
      runGenerator: "findtrappedkings",
      link: "endTurn",
    },
  },
  marks: {
    selectunit: {
      from: { ifelse: [{ same: [["turn"], 1] }, "mysoldiers", "myunits"] },
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
