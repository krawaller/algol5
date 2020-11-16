import { IagoDefinition } from "./_types";

const iagoFlow: IagoDefinition["flow"] = {
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
      runGenerator: "findspawntargets",
      link: {
        playercase: [
          { ifelse: [["isFirstTurn"], "endTurn", "selectfiretarget"] },
          "selectfiretarget",
        ],
      },
    },
    fire: {
      applyEffects: [
        {
          spawnat: ["selectfiretarget", "stones", ["player"]],
        },
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
      runGenerator: "findothellovictims",
      link: "fire",
    },
  },
};

export default iagoFlow;
