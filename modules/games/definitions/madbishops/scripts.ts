import { MadbishopsDefinition } from "./_types";

const madbishopsScripts: MadbishopsDefinition["scripts"] = [
  {
    desc: "basic",
    lines: [
      { commands: ["e5", "f4", "move", "endTurn"] },
      { commands: ["f6", "d4", "move", "endTurn"] },
      { commands: ["f4", "e3", "move", "endTurn"] },
      { commands: ["d2", "c3", "move", "endTurn"] },
      { commands: ["b2", "c3", "move", "endTurn"] },
      { commands: ["d4", "e3", "move", "endTurn"] },
      { commands: ["h6", "g7", "move", "endTurn"] },
      { commands: ["e3", "g5", "move", "endTurn"] },
      { commands: ["f2", "c5", "move", "endTurn"] },
      { commands: ["b4", "c5", "move", "endTurn"] },
      { commands: ["a9", "b8", "move", "endTurn"] },
      { commands: ["c1", "f4", "move", "endTurn"] },
      { commands: ["g7", "i5", "move", "endTurn"] },
    ],
  },
];

export default madbishopsScripts;
