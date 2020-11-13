import { JesonmorDefinition } from "./_types";

const jesonmorFlow: JesonmorDefinition["flow"] = {
  endGame: {
    tookcenter: {
      condition: { overlaps: ["center", "units"] },
      whenStarvation: true
    }
  },
  startTurn: { link: "selectunit" },
  commands: {
    move: {
      applyEffects: [
        { stompat: ["selectunit", "selectmovetarget"]},
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
