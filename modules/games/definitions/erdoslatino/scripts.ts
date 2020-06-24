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
];

export default erdoslatinoScripts;
