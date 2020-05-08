import { AtaxxDefinition } from "./_types";

const ataxxScripts: AtaxxDefinition["scripts"] = [
  {
    desc: "basic",
    lines: [
      { commands: ["a7", "b6", "split", "endTurn"] },
      { commands: ["g7", "e5", "jump", "endTurn"] },
      { commands: ["g1", "f2", "split", "endTurn"] },
      { commands: ["e5", "f6", "split", "endTurn"] },
      { commands: ["b6", "d6", "jump", "endTurn"] },
      { commands: ["f6", "e6", "split", "endTurn"] },
      { commands: ["f2", "e2", "split", "endTurn"] },
      { commands: ["e5", "f3", "jump", "endTurn"] },
      { commands: ["g1", "e3", "jump", "endTurn"] },
      { commands: ["f6", "g4", "jump", "endTurn"] },
      { commands: ["f2", "g3", "split", "endTurn"] },
      { commands: ["d6", "f4", "jump", "endTurn"] },
      { commands: ["f2", "e4", "jump", "endTurn"] },
    ],
  },
];

export default ataxxScripts;
