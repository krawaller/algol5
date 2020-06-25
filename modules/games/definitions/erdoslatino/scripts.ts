import { ErdoslatinoDefinition } from "./_types";

const erdoslatinoScripts: ErdoslatinoDefinition["scripts"] = [
  {
    desc: "basic",
    lines: [
      { commands: ["c3", "place1", "endTurn"] },
      { commands: ["c4", "place4", "endTurn"] },
      { commands: ["c5", "place5", "endTurn"] },
      { commands: ["b3", "place4", "endTurn"] },
      { commands: ["b5", "place1", "endTurn"] },
      { commands: ["b2", "place5", "endTurn"] },
      { commands: ["b1", "place3", "endTurn"] },
      { commands: ["d4", "place2", "endTurn"] },
      { commands: ["d5", "place3", "endTurn"] },
      { commands: ["d2", "place1", "endTurn"] },
    ],
  },
  {
    desc: "starvation",
    lines: [
      { commands: ["c3", "place3", "endTurn"] },
      { commands: ["c4", "place4", "endTurn"] },
      { commands: ["c5", "place1", "endTurn"] },
      { commands: ["c1", "place5", "endTurn"] },
      { commands: ["d5", "place5", "endTurn"] },
      { commands: ["d1", "place4", "endTurn"] },
      { commands: ["d4", "place3", "endTurn"] },
      { commands: ["b5", "place4", "endTurn"] },
      { commands: ["d3", "place1", "endTurn"] },
      { commands: ["b4", "place2", "endTurn"] },
      { commands: ["a1", "place3", "endTurn"] },
      { commands: ["a2", "place2", "endTurn"] },
      { commands: ["b1", "place1", "endTurn"] },
      { commands: ["a4", "place1", "endTurn"] },
      { commands: ["b3", "place5", "endTurn"] },
      { commands: ["e2", "place3", "endTurn"] },
      { commands: ["a3", "place4", "endTurn"] },
      { commands: ["e3", "place2", "endTurn"] },
      { commands: ["e4", "place5", "endTurn"] },
    ],
  },
];

export default erdoslatinoScripts;
