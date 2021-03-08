import { DaoDefinition } from "./_types";

const daoFlow: DaoDefinition["flow"] = {
  endGame: {
    occupycorners: {
      condition: {
        same: [4, { sizeof: { intersect: ["myunits", "corners"] } }],
      },
      show: "corners",
    },
    madeline: {
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

export default daoFlow;
