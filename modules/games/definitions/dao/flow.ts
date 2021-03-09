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
    madeblock: {
      condition: { notempty: "winblock" },
      show: "winblock",
    },
  },
  startTurn: {
    link: "selectunit",
  },
  commands: {
    move: {
      applyEffect: { moveat: ["selectunit", "selectmovetarget"] },
      runGenerators: ["findwinline", "findwinblock"],
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
