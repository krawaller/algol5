import { TunnelerDefinition } from "./_types";

const tunnelerScripts: TunnelerDefinition["scripts"] = [
  {
    desc: "basic",
    lines: [
      { commands: ["i2", "i3", "move", "endTurn"] },
      { commands: ["g10", "g9", "move", "endTurn"] },
      { commands: ["g4", "h4", "move", "endTurn"] },
      { commands: ["i10", "h10", "move", "endTurn"] },
    ],
  },
];

export default tunnelerScripts;
