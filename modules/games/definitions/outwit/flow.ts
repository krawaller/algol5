import { OutwitDefinition } from "./_types";

const outwitFlow: OutwitDefinition["flow"] = {
  startTurn: {
    link: "selectunit",
  },
  marks: {
    selectunit: {
      from: { subtract: ["myunits", "corner"] },
      runGenerator: "findmovetargets",
      link: "selectmovetarget",
    },
    selectmovetarget: {
      from: "movetargets",
      link: "move",
    },
  },
  commands: {
    move: {
      applyEffect: { moveat: ["selectunit", "selectmovetarget"] },
      link: "endTurn",
    },
  },
};

export default outwitFlow;
