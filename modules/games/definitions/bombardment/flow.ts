import { BombardmentDefinition } from "./_types";

const bombardmentFlow: BombardmentDefinition["flow"] = {
  endGame: {
    infiltration: {
      condition: { overlaps: ["myunits", "oppbase"] },
      show: { single: "selectmovetarget" },
    },
    armageddon: {
      unlessAction: "move",
      condition: { or: [{ isempty: "oppunits" }, { isempty: "myunits" }] },
      who: {
        ifelse: [
          { isempty: "units" },
          0,
          { ifelse: [{ isempty: "oppunits" }, ["player"], ["otherplayer"]] },
        ],
      },
      show: "units",
    },
  },
  startTurn: {
    link: "selectunit",
  },
  commands: {
    detonate: {
      applyEffect: { killin: "boomtargets" },
      link: "endTurn",
    },
    move: {
      applyEffect: { moveat: ["selectunit", "selectmovetarget"] },
      link: "endTurn",
    },
  },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerator: "findmoveandboomtargets",
      links: ["selectmovetarget", "detonate"],
    },
    selectmovetarget: {
      from: "movetargets",
      link: "move",
    },
  },
};

export default bombardmentFlow;
