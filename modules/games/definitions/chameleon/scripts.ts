import { ChameleonScripts } from "./_types";

const chameleonScripts: ChameleonScripts = {
  basic: [
    { commands: ["a1", "a2", "move", "endTurn"] },
    { commands: ["c5", "e4", "move", "endTurn"] }
  ],
  testStarvation: [
    { commands: ["a1", "b3", "move", "endTurn"] },
    { commands: ["b5", "d4", "move", "endTurn"] },
    { commands: ["b3", "a5", "move", "endTurn"], endedBy: "persistentInvader" }
  ]
};

export default chameleonScripts;
