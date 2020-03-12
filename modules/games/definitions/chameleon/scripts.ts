import { ChameleonDefinition } from "./_types";

const chameleonScripts: ChameleonDefinition["scripts"] = [
  {
    desc: "basic",
    lines: [
      { commands: ["a1", "a2", "move", "endTurn"] },
      { commands: ["c5", "e4", "move", "endTurn"] },
    ],
  },
  {
    desc: "starvation",
    lines: [
      { commands: ["a1", "b3", "move", "endTurn"] },
      { commands: ["b5", "d4", "move", "endTurn"] },
      {
        commands: ["b3", "a5", "move", "endTurn"],
        endedBy: "persistentInvader",
      },
    ],
  },
];

export default chameleonScripts;
