import { JesonmorDefinition } from "./_types";

const jesonmorFlow: JesonmorDefinition["flow"] = {
  endGame: {
    tookcenter: {
      condition: ["true"],
      whenStarvation: true
    }
  },
  startTurn: { link: "selectunit" },
  commands: {
    move: {
      applyEffects: [
        { moveat: ["selectunit", "selectmovetarget"]},
        { killat: "selectmovetarget" }
      ],
      link: "endTurn"
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
      link: "move",
    }
  }
};

export default jesonmorFlow;
