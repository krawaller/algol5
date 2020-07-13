import { BombardmentDefinition } from "./_types";

const bombardmentScripts: BombardmentDefinition["scripts"] = [
  {
    desc: "basic",
    lines: [
      { commands: ["c2", "d3", "move", "endTurn"] },
      { commands: ["d7", "d6", "move", "endTurn"] },
      { commands: ["d3", "e4", "move", "endTurn"] },
      { commands: ["f7", "f6", "move", "endTurn"] },
      { commands: ["e4", "e5", "move", "endTurn"] },
      { commands: ["d6", "detonate", "endTurn"] },
    ],
  },
];

export default bombardmentScripts;
