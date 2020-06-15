import { TobitoDefinition } from "./_types";

const tobitoScripts: TobitoDefinition["scripts"] = [
  {
    desc: "basic",
    lines: [
      { commands: ["a3", "b2", "move", "endTurn"] },
      { commands: ["e1", "d2", "move", "endTurn"] },
      { commands: ["a1", "c3", "move", "endTurn"] },
      { commands: ["d2", "c1", "move", "endTurn"] },
      { commands: ["a2", "c2", "move", "endTurn"] },
      { commands: ["c1", "a3", "move", "b2", "a1", "relocate", "endTurn"] },
      { commands: ["c2", "d1", "move", "endTurn"] },
      { commands: ["e3", "d3", "move", "endTurn"] },
      { commands: ["c3", "e3", "move", "d3", "c1", "relocate", "endTurn"] },
      { commands: ["e2", "d2", "move", "endTurn"] },
      { commands: ["a1", "b2", "move", "endTurn"] },
      { commands: ["d2", "e1", "move", "endTurn"] },
      { commands: ["d1", "e2", "move", "endTurn"] },
      { commands: ["e1", "d1", "move", "endTurn"] },
      { commands: ["b2", "c3", "move", "endTurn"] },
      { commands: ["d1", "b1", "move", "endTurn"] },
      { commands: ["c3", "d2", "move", "endTurn"] },
      { commands: ["c1", "a1", "move", "endTurn"] },
      { commands: ["d2", "e1", "move", "endTurn"] },
    ],
  },
];

export default tobitoScripts;
