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
      runGenerators: ["findspawntargets", "findcapturetargets"],
      link: {
        playercase: [
          { ifelse: [["isFirstTurn"], "endTurn", "selectfiretarget"] },
          "selectfiretarget",
        ],
      },
    },
    fire: {
      applyEffects: [
        { spawnat: ["selectfiretarget", "stones"] },
        { adoptin: ["victims"] },
      ],
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
      runGenerator: {
        if: [{ anyat: ["capturespot", "selectfiretarget"] }, "findvictims"],
      },
      link: "fire",
    },
  },
};

export default partisansFlow;
