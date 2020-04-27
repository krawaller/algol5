import { ScatterDefinition } from "./_types";

const scatterFlow: ScatterDefinition["flow"] = {
  startTurn: {
    link: "selectunit",
  },
  endGame: {
    scatter: {
      condition: {
        valinlist: [
          { gridin: ["binary", "myunits"] },
          510,
          509,
          507,
          503,
          495,
          479,
          447,
          383,
          255,
        ],
      },
      show: "myunits",
    },
  },
  commands: {
    move: {
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
      link: "move",
    },
  },
};

export default scatterFlow;
