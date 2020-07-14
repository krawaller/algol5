import { EuclidDefinition } from "./_types";

const euclidScripts: EuclidDefinition["scripts"] = [
  {
    desc: "basic",
    lines: [
      { commands: ["d1", "g1", "move", "endTurn"] },
      { commands: ["e8", "b8", "move", "endTurn"] },
      { commands: ["c1", "f1", "move", "endTurn"] },
      { commands: ["f8", "c8", "move", "endTurn"] },
      { commands: ["b1", "e1", "move", "endTurn"] },
      { commands: ["g8", "d8", "move", "endTurn"] },
      { commands: ["a1", "d1", "move", "endTurn"] },
      { commands: ["h8", "g8", "move", "endTurn"] },
      { commands: ["a4", "a8", "move", "endTurn"] },
      { commands: ["h5", "h1", "move", "endTurn"] },
      { commands: ["d2", "h2", "move", "endTurn"] },
      { commands: ["e7", "a7", "move", "endTurn"] },
      { commands: ["e1", "e4", "move", "endTurn"] },
      { commands: ["g8", "d8", "move", "endTurn"] },
      { commands: ["d1", "h5", "move", "endTurn"] },
      { commands: ["g5", "g3", "move", "endTurn"] },
      { commands: ["c2", "e2", "move", "endTurn"] },
      { commands: ["a7", "a4", "move", "endTurn"] },
    ],
  },
];

export default euclidScripts;
