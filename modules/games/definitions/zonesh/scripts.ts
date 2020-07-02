import { ZoneshDefinition } from "./_types";

const zoneshScripts: ZoneshDefinition["scripts"] = [
  {
    desc: "basic",
    lines: [
      { commands: ["d1", "e1", "move", "endTurn"] },
      { commands: ["c6", "c5", "move", "endTurn"] },
      { commands: ["b3", "c3", "move", "endTurn"] },
      { commands: ["e4", "e3", "move", "endTurn"] },
      { commands: ["c1", "d1", "move", "endTurn"] },
      { commands: ["d6", "c6", "move", "endTurn"] },
      { commands: ["a4", "a5", "move", "endTurn"] },
      { commands: ["e5", "e4", "move", "endTurn"] },
      { commands: ["d1", "d2", "move", "endTurn"] },
      { commands: ["f5", "e5", "move", "endTurn"] },
      { commands: ["d2", "e3", "move", "endTurn"] },
      { commands: ["e4", "e3", "move", "endTurn"] },
      { commands: ["b2", "b3", "move", "endTurn"] },
      { commands: ["e5", "e4", "move", "endTurn"] },
    ],
  },
];

export default zoneshScripts;
