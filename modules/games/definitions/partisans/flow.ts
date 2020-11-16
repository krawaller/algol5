import { PartisansDefinition } from "./_types";

const partisansFlow: PartisansDefinition["flow"] = {
  startTurn: {
    link: "selectunit",
  },
  commands: {
    move: {
      applyEffects: [
        {
          setturnpos: ["movedto", "selectmovetarget"],
        },
        {
          moveat: ["selectunit", "selectmovetarget"],
        },
      ],
      runGenerator: "findfiretargets",
      link: {
        playercase: [
          { ifelse: [["isFirstTurn"], "endTurn", "selectfiretarget"] },
          "selectfiretarget",
        ],
      },
    },
    fire: {
      applyEffect: { spawnat: ["selectfiretarget", "stones"] },

      link: "endTurn",
    },
  },
  marks: {
    selectunit: {
      from: "myamazons",
      runGenerator: "findmovetargets",
      link: "selectmovetarget",
    },
    selectmovetarget: {
      from: "movetargets",
      link: "move",
    },
    selectfiretarget: {
      from: "firetargets",
      link: "fire",
    },
  },
};

export default partisansFlow;
