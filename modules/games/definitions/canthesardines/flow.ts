import { CanthesardinesDefinition } from "./_types";

const canthesardinesFlow: CanthesardinesDefinition["flow"] = {
  endGame: {
    closedcan: {
      condition: { isempty: { subtract: ["canedge", "units"] } },
      who: {
        compareSets: [
          { intersect: ["can", { playercase: ["myunits", "oppunits"] }] },
          { intersect: ["can", { playercase: ["oppunits", "myunits"] }] },
        ],
      },
      show: {
        indexlist: [
          {
            compareSets: [
              { intersect: ["can", "myunits"] },
              { intersect: ["can", "oppunits"] },
            ],
          },
          ["empty"],
          { intersect: ["can", "myunits"] },
          { intersect: ["can", "oppunits"] },
        ],
      },
    },
  },
  startTurn: {
    link: "selectunit",
  },
  commands: {
    move: {
      applyEffect: { moveat: ["selectunit", "selectmovetarget"] },
      link: "endTurn",
    },
  },
  marks: {
    selectunit: {
      from: { subtract: ["myunits", "can"] },
      runGenerator: "findmovetargets",
      link: "selectmovetarget",
    },
    selectmovetarget: {
      from: "movetargets",
      link: "move",
    },
  },
};

export default canthesardinesFlow;
