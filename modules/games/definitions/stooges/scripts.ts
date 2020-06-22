import { StoogesDefinition } from "./_types";

const stoogesScripts: StoogesDefinition["scripts"] = [
  {
    desc: "basic",
    lines: [
      { commands: ["c4", "swap", "endTurn"] },
      { commands: ["b2", "swap", "endTurn"] },
      { commands: ["a3", "b4", "move", "endTurn"] },
      { commands: ["d2", "swap", "endTurn"] },
      { commands: ["e3", "d4", "move", "endTurn"] },
      { commands: ["c4", "swap", "endTurn"] },
      { commands: ["b4", "c5", "move", "endTurn"] },
      { commands: ["b3", "c4", "move", "endTurn"] },
      { commands: ["e2", "swap", "endTurn"] },
      { commands: ["e3", "swap", "endTurn"] },
      { commands: ["c5", "b4", "move", "endTurn"] },
      { commands: ["f3", "e3", "move", "endTurn"] },
      { commands: ["b3", "swap", "endTurn"] },
      { commands: ["e2", "swap", "endTurn"] },
      { commands: ["b4", "b3", "move", "endTurn"] },
      { commands: ["e3", "e2", "move", "endTurn"] },
    ],
  },
];

export default stoogesScripts;
