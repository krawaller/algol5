import { UisgeDefinition } from "./_types";

const uisgeScripts: UisgeDefinition["scripts"] = [
  {
    desc: "basic",
    lines: [
      { commands: ["e2", "c2", "jump", "endTurn"] },
      { commands: ["d5", "b5", "jump", "endTurn"] },
      { commands: ["d3", "b3", "jump", "endTurn"] },
      { commands: ["e4", "e2", "jump", "endTurn"] },
      { commands: ["f3", "d3", "jump", "endTurn"] },
      { commands: ["c5", "a5", "jump", "endTurn"] },
      { commands: ["c3", "a3", "jump", "endTurn"] },
      { commands: ["e2", "f3", "step", "endTurn"] },
      { commands: ["d2", "b2", "jump", "endTurn"] },
      { commands: ["d4", "d2", "jump", "endTurn"] },
      { commands: ["b2", "c3", "step", "endTurn"] },
      { commands: ["c4", "a4", "jump", "endTurn"] },
      { commands: ["d3", "e2", "step", "endTurn"] },
      { commands: ["b4", "b2", "jump", "endTurn"] },
    ],
  },
];

export default uisgeScripts;
