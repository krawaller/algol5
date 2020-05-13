import { BreakthroughDefinition } from "./_types";

const breakthroughScripts: BreakthroughDefinition["scripts"] = [
  {
    desc: "basic",
    lines: [
      { commands: ["b2", "c3", "move", "endTurn"] },
      { commands: ["d7", "d6", "move", "endTurn"] },
      { commands: ["d2", "d3", "move", "endTurn"] },
      { commands: ["c7", "c6", "move", "endTurn"] },
    ],
  },
];

export default breakthroughScripts;
