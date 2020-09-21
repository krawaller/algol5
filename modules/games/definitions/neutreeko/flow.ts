import { NeutreekoDefinition } from "./_types";

const neutreekoFlow: NeutreekoDefinition["flow"] = {
  endGame: {
    winline: {
      condition: { notempty: "winline" },
      show: "winline",
    },
  },
  startTurn: { link: "selectunit" },
  commands: {
    move: {
      applyEffects: [
        { moveat: ["selectunit", "selectmovetarget"] },
      ],
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
  }
};

export default neutreekoFlow;
