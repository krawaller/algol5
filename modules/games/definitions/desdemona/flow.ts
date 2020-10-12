import { DesdemonaDefinition } from "./_types";

const desdemonaFlow: DesdemonaDefinition["flow"] = {
  endGame: {
    dominance: {
      who: {
        playercase: [
          { compareSets: ["mystones", "oppstones"] },
          { compareSets: ["oppstones", "mystones"] },
        ],
      },
      show: {
        indexlist: [
          { compareSets: ["mystones", "oppstones"] },
          ["empty"],
          "mystones",
          "oppstones",
        ],
      },
      whenStarvation: true,
      condition: ["true"],
    },
  },
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
        ifrulesetelse: [
          "pie",
          {
            playercase: [
              { ifelse: [["isFirstTurn"], "endTurn", "selectfiretarget"] },
              "selectfiretarget",
            ],
          },
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

export default desdemonaFlow;
