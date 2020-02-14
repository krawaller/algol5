import { GekitaiFlow } from "./_types";

const gekitaiFlow: GekitaiFlow = {
  endGame: {
    allout: {
      condition: { same: [{ sizeof: "myunits" }, 8] },
      prio: 2,
    },
    suicide: {
      condition: { notempty: "loseline" },
      show: "loseline",
      who: ["otherplayer"],
      prio: 1,
    },
    winline: {
      condition: { notempty: "winline" },
      show: "winline",
      prio: 3,
    },
  },
  startTurn: {
    link: "selectdroptarget",
  },
  commands: {
    drop: {
      link: "endTurn",
      runGenerator: "findendline",
      applyEffects: [
        { spawnat: ["selectdroptarget", "markers"] },
        { killin: "death" },
        { pushin: ["push", { loopread: "pushdir" }] },
      ],
    },
  },
  marks: {
    selectdroptarget: {
      from: { subtract: ["board", "units"] },
      runGenerator: "findpushconsequences",
      link: "drop",
    },
  },
};

export default gekitaiFlow;
