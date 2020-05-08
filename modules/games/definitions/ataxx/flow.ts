import { AtaxxDefinition } from "./_types";

const ataxxFlow: AtaxxDefinition["flow"] = {
  startTurn: {
    link: "selectunit",
  },
  endGame: {
    dominance: {
      condition: { same: [{ sizeof: "units" }, 49] },
      who: {
        ifelse: [
          { morethan: [{ sizeof: "myunits" }, 24] },
          ["player"],
          ["otherplayer"],
        ],
      },
    },
  },
  commands: {
    split: {
      applyEffects: [
        { spawnat: ["selectsplittarget", "microbes"] },
        { adoptin: ["assimilated"] },
      ],
      link: "endTurn",
    },
    jump: {
      applyEffects: [
        { moveat: ["selectunit", "selectjumptarget"] },
        { adoptin: ["assimilated"] },
      ],
      link: "endTurn",
    },
  },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerators: ["findjumptargets", "findsplittargets"],
      links: ["selectjumptarget", "selectsplittarget"],
    },
    selectsplittarget: {
      from: "splittargets",
      runGenerator: "findassimilated",
      link: "split",
    },
    selectjumptarget: {
      from: "jumptargets",
      runGenerator: "findassimilated",
      link: "jump",
    },
  },
};

export default ataxxFlow;
