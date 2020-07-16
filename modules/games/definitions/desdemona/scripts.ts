import { DesdemonaDefinition } from "./_types";

const desdemonaScripts: DesdemonaDefinition["scripts"] = [
  {
    desc: "basic",
    lines: [
      { commands: ["b2", "d4", "move", "endTurn"] },
      { commands: ["b6", "c5", "move", "c3", "fire", "endTurn"] },
      { commands: ["f2", "c2", "move", "c4", "fire", "endTurn"] },
      { commands: ["c5", "d5", "move", "b3", "fire", "endTurn"] },
    ],
  },
];

export default desdemonaScripts;
