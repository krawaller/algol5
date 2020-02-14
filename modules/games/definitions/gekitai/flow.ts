import { GekitaiFlow } from "./_types";

const gekitaiFlow: GekitaiFlow = {
  endGame: {
    allout: {
      condition: { same: [{ sizeof: "myunits" }, 8] },
    },
    suicide: {
      condition: { notempty: "loseline" },
      show: "loseline",
      who: ["otherplayer"],
    },
    winline: {
      condition: { notempty: "winline" },
      show: "winline",
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
