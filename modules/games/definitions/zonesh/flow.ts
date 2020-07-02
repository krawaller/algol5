import { ZoneshDefinition } from "./_types";

const zoneshFlow: ZoneshDefinition["flow"] = {
  endGame: {
    infiltration: {
      condition: { overlaps: ["oppthrone", "myunits"] },
      show: "oppthrone",
    },
  },
  startTurn: {
    link: "selectunit",
  },
  commands: {
    move: {
      applyEffect: { stompat: ["selectunit", "selectmovetarget"] },
      link: "endTurn",
    },
  },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerator: "findmovetargets",
      link: "selectmovetarget",
    },
    selectmovetarget: {
      from: "movetargets",
      link: "move",
    },
  },
};

export default zoneshFlow;
