import { TowersDefinition } from "./_types";

const towersFlow: TowersDefinition["flow"] = {
  endGame: {
    winline: {
      condition: {
        same: [
          { sizeof: "oppbase" },
          { sizeof: { intersect: ["oppbase", "myunits"] } },
        ],
      },
      show: "myunits",
    },
  },
  startTurn: { link: "selectunit" },
  commands: {
    move: {
      applyEffect: { moveat: ["selectunit", "selectmovetarget"] },
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

export default towersFlow;
