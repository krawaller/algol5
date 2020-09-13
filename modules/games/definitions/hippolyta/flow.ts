import { HippolytaDefinition } from "./_types";

const hippolytaFlow: HippolytaDefinition["flow"] = {
  startTurn: {
    link: "selectunit",
  },
  commands: {
    fire: {
      applyEffect: { killat: "selecttarget" },
      link: "endTurn",
    },
  },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerator: "findtargets",
      link: "selecttarget",
    },
    selecttarget: {
      from: "targets",
      link: "fire",
    },
  },
};

export default hippolytaFlow;
