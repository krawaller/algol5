import { DuckpondDefinition } from "./_types";

const duckpondScripts: DuckpondDefinition["scripts"] = [
  {
    desc: "basic",
    lines: [
      { commands: ["b1", "c2", "move", "endTurn"] },
      { commands: ["a4", "c4", "move", "endTurn"] },
      { commands: ["e4", "d3", "move", "endTurn"] },
      { commands: ["d1", "b3", "move", "endTurn"] },
      { commands: ["a2", "b2", "move", "endTurn"] },
    ],
  },
];

export default duckpondScripts;
