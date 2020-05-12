import { CrossingsDefinition } from "./_types";

const crossingsScripts: CrossingsDefinition["scripts"] = [
  {
    desc: "basic",
    lines: [
      { commands: ["d1", "d2", "d4", "march", "endTurn"] },
      { commands: ["f8", "f7", "f5", "march", "endTurn"] },
      { commands: ["b1", "d3", "f5", "march", "endTurn"] },
      { commands: ["c8", "d7", "f5", "march", "endTurn"] },
      { commands: ["g1", "f2", "e3", "march", "endTurn"] },
    ],
  },
];

export default crossingsScripts;
