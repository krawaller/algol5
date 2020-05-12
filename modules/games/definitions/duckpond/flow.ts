import { DuckpondDefinition } from "./_types";

const duckpondFlow: DuckpondDefinition["flow"] = {
  endGame: {
    winline: {
      condition: { notempty: "winline" },
      show: "winline",
    },
  },
  startTurn: {
    link: "selectunit",
  },
  commands: {
    move: {
      applyEffect: { moveat: ["selectunit", "selectmovetarget"] },
      runGenerator: "findwinlines",
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

export default duckpondFlow;
