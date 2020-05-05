import { SpeedsoccolotDefinition } from "./_types";

const speedsoccolotFlow: SpeedsoccolotDefinition["flow"] = {
  endGame: {
    goal: {
      condition: { overlaps: ["oppbase", "ball"] },
      show: "ball",
    },
    owngoal: {
      condition: { overlaps: ["mybase", "ball"] },
      show: "ball",
      who: ["otherplayer"],
    },
  },
  startTurn: {
    link: "selectunit",
  },
  commands: {
    run: {
      applyEffect: { moveat: ["selectunit", "selectruntarget"] },
      link: "endTurn",
    },
    dribble: {
      applyEffects: [
        { moveat: ["selectunit", "selectruntarget"] },
        { moveat: [{ onlyin: "ball" }, { onlyin: "dribbletarget" }] },
      ],
      link: "endTurn",
    },
    kick: {
      applyEffect: { moveat: [{ onlyin: "ball" }, "selectkicktarget"] },
      link: "endTurn",
    },
  },
  marks: {
    selectunit: {
      from: "myplayers",
      runGenerators: ["findplayeroptions", "findkicktargets"],
      links: ["selectruntarget", "selectkicktarget"],
    },
    selectruntarget: {
      from: "runtargets",
      runGenerator: "finddribbletarget",
      links: [
        { if: [{ noneat: ["ball", "selectruntarget"] }, "run"] },
        { if: [{ notempty: "dribbletarget" }, "dribble"] },
      ],
    },
    selectkicktarget: {
      from: "kicktargets",
      link: "kick",
    },
  },
};

export default speedsoccolotFlow;
