import { ConnectfourDefinition } from "./_types";

const connectfourFlow: ConnectfourDefinition["flow"] = {
  endGame: {
    connectfour: {
      condition: { notempty: "winline" },
      show: "winline",
      prio: 1,
    },
    full: {
      condition: { same: [{ sizeof: "units" }, { sizeof: "board" }] },
      who: 0,
      prio: 2,
    },
  },
  startTurn: {
    runGenerator: "finddroptargets",
    link: "selectdroptarget",
  },
  commands: {
    drop: {
      applyEffect: { spawnat: ["selectdroptarget", "markers"] },
      runGenerator: "findwinline",
      link: "endTurn",
    },
  },
  marks: {
    selectdroptarget: {
      from: "droptargets",
      link: "drop",
    },
  },
};

export default connectfourFlow;
