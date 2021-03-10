import { OutwitDefinition } from "./_types";

const outwitFlow: OutwitDefinition["flow"] = {
  endGame: {
    infiltration: {
      condition: {
        same: [
          { sizeof: "mybase" },
          { sizeof: { intersect: ["mybase", "myunits"] } },
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
      from: { subtract: ["myunits", "mybase"] },
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
