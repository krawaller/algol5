import { GowiththefloeFlow } from "./_types";

const gowiththefloeFlow: GowiththefloeFlow = {
  startTurn: { link: "selectunit" },
  endGame: {
    safeseal: {
      condition: { different: [{ sizeof: "canmove" }, { sizeof: "seals" }] },
      show: { subtract: ["seals", "canmove"] },
      who: 1
    },
    sealseaten: { condition: { isempty: "seals" }, who: 2, prio: 1 }
  },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerators: [
        "findmovetargets",
        "findjumptargets",
        { ifplayer: [2, "findeattargets"] }
      ],
      links: [
        "selectmovetarget",
        "selectjumptarget",
        { ifplayer: [2, "selecteattarget"] }
      ]
    },
    selectmovetarget: {
      from: "movetargets",
      runGenerator: "findcracks",
      link: "move"
    },
    selectjumptarget: { from: "jumptargets", link: "jump" },
    selecteattarget: { from: "eattargets", link: "eat" }
  },
  commands: {
    move: {
      applyEffects: [
        { moveat: ["selectunit", "selectmovetarget"] },
        { spawnin: ["cracks", "holes", 0] }
      ],
      runGenerator: "findsealsmoves",
      link: "endTurn"
    },
    jump: {
      applyEffects: [
        { moveat: ["selectunit", "selectjumptarget"] },
        { spawnat: ["selectunit", "holes", 0] }
      ],
      runGenerator: "findsealsmoves",
      link: "endTurn"
    },
    eat: {
      applyEffects: [{ killat: "selectunit" }, { killat: "selecteattarget" }],
      runGenerator: "findsealsmoves",
      link: "endTurn"
    }
  }
};

export default gowiththefloeFlow;
