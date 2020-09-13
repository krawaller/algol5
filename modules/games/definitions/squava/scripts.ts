import { SquavaDefinition } from "./_types";

const squavaScripts: SquavaDefinition["scripts"] = [
  {
    desc: "basic",
    lines: [
      { commands: ["c4", "drop", "endTurn"] },
      { commands: ["c3", "drop", "endTurn"] },
      { commands: ["b5", "drop", "endTurn"] },
      { commands: ["d4", "drop", "endTurn"] },
      { commands: ["e2", "drop", "endTurn"] },
      { commands: ["d3", "drop", "endTurn"] },
      { commands: ["b4", "drop", "endTurn"] },
      { commands: ["a1", "drop", "endTurn"] },
      { commands: ["b2", "drop", "endTurn"] },
      { commands: ["b3", "drop", "endTurn"] },
    ],
  },
];

export default squavaScripts;
