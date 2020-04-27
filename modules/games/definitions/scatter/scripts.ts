import { ScatterDefinition } from "./_types";

const scatterScripts: ScatterDefinition["scripts"] = [
  {
    desc: "basic",
    lines: [
      { commands: ["d5", "e5", "move", "endTurn"] },
      { commands: ["b4", "b5", "move", "endTurn"] },
      { commands: ["west", "endTurn"] },
      { commands: ["north", "endTurn"] },
      { commands: ["d1", "e1", "move", "endTurn"] },
    ],
  },
];

export default scatterScripts;
