import { GekitaiFlow } from "./_types";

const gekitaiFlow: GekitaiFlow = {
  endGame: {
    allout: {
      condition: { same: [{ sizeof: "myunits" }, 8] },
    },
  },
  startTurn: {
    link: "selectdroptarget",
  },
  commands: {
    drop: {
      link: "endTurn",
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
