import { SpeedsoccolotDefinition } from "./_types";

const speedsoccolotScripts: SpeedsoccolotDefinition["scripts"] = [
  {
    desc: "basic",
    lines: [
      { commands: ["d2", "d3", "run", "endTurn"] },
      { commands: ["b6", "c5", "run", "endTurn"] },
      { commands: ["d3", "e3", "dribble", "endTurn"] },
      { commands: ["f6", "f5", "run", "endTurn"] },
      { commands: ["e3", "d2", "dribble", "endTurn"] },
      { commands: ["c5", "c4", "run", "endTurn"] },
      { commands: ["d2", "d1", "dribble", "endTurn"] },
      { commands: ["c4", "c3", "run", "endTurn"] },
      { commands: ["e2", "f3", "dribble", "endTurn"] },
      { commands: ["c3", "d3", "run", "endTurn"] },
      { commands: ["f2", "a7", "kick", "endTurn"] },
    ],
  },
];

export default speedsoccolotScripts;
