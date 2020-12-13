import { OutwitDefinition } from "./_types";

const outwitFlow: OutwitDefinition["flow"] = {
  endGame: {
    winline: {
      condition: {
        same: [
          { sizeof: "mycorner" },
          { sizeof: { intersect: ["mycorner", "myunits"] } },
        ],
      },
      show: "myunits",
    },
  },
  startTurn: {
    link: "selectunit",
  },
  marks: {
    selectunit: {
      from: { subtract: ["myunits", "corner"] },
      runGenerator: {
        ifelse: [
          { anyat: ["kings", "selectunit"] },
          "findkingtargets",
          "findsoldiertargets",
        ],
      },
      link: "selectmovetarget",
    },
    selectmovetarget: {
      from: "movetargets",
      link: "move",
    },
  },
  commands: {
    move: {
      applyEffect: { moveat: ["selectunit", "selectmovetarget"] },
      link: "endTurn",
    },
  },
};

export default outwitFlow;
