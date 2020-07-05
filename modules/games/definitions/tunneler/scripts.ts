import { TunnelerDefinition } from "./_types";

const tunnelerScripts: TunnelerDefinition["scripts"] = [
  {
    desc: "full",
    lines: [
      { commands: ["i2", "i3", "move", "endTurn"] },
      { commands: ["e10", "d10", "move", "endTurn"] },
      { commands: ["g4", "h4", "move", "endTurn"] },
      { commands: ["d10", "d9", "move", "endTurn"] },
      { commands: ["i3", "i4", "move", "endTurn"] },
      { commands: ["e8", "d8", "move", "endTurn"] },
      { commands: ["h4", "h5", "move", "endTurn"] },
      { commands: ["d8", "d7", "move", "endTurn"] },
      { commands: ["g2", "g3", "move", "endTurn"] },
      { commands: ["g10", "g9", "move", "endTurn"] },
      { commands: ["e4", "f4", "move", "endTurn"] },
      { commands: ["g8", "g7", "move", "endTurn"] },
      { commands: ["f4", "f5", "move", "endTurn"] },
      { commands: ["i10", "h10", "move", "endTurn"] },
      { commands: ["e2", "e3", "move", "endTurn"] },
      { commands: ["d7", "d6", "move", "endTurn"] },
      { commands: ["c2", "d2", "move", "endTurn"] },
      { commands: ["d6", "d5", "move", "endTurn"] },
      { commands: ["h5", "h6", "move", "endTurn"] },
      { commands: ["g7", "g6", "move", "endTurn"] },
      { commands: ["h6", "h5", "move", "endTurn"] },
      { commands: ["d5", "d4", "move", "endTurn"] },
      { commands: ["i4", "i3", "move", "endTurn"] },
      { commands: ["d4", "i4", "move", "endTurn"] },
      { commands: ["i3", "j3", "move", "endTurn"] },
      { commands: ["i4", "i3", "move", "endTurn"] },
      { commands: ["j3", "k3", "move", "endTurn"] },
      { commands: ["i3", "k3", "move", "endTurn"] },
    ],
  },
  {
    desc: "basic2",
    lines: [
      { commands: ["i2", "i3", "move", "endTurn"] },
      { commands: ["g10", "g9", "move", "endTurn"] },
      { commands: ["g4", "h4", "move", "endTurn"] },
      { commands: ["i10", "h10", "move", "endTurn"] },
    ],
  },
];

export default tunnelerScripts;
