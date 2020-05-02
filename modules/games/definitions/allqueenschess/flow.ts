import { AllqueenschessDefinition } from "./_types";

const allqueenschessFlow: AllqueenschessDefinition["flow"] = {
  startTurn: {
    link: "selectunit",
  },
  endGame: {
    winline: {
      condition: { notempty: "winline" },
      show: "winline",
    },
  },
  commands: {
    move: {
      applyEffect: { moveat: ["selectunit", "selectmovetarget"] },
      runGenerator: "findwinline",
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

export default allqueenschessFlow;
