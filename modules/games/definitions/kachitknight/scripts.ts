import { KachitknightDefinition } from "./_types";

const kachitknightScripts: KachitknightDefinition["scripts"] = [
  {
    desc: "basic",
    lines: [
      { commands: ["c2", "diagonal", "endTurn"] },
      { commands: ["b3", "diagonal", "endTurn"] },
      { commands: ["d3", "orthogonal", "endTurn"] },
      { commands: ["b4", "orthogonal", "endTurn"] },
      { commands: ["d1", "d2", "step", "endTurn"] },
      { commands: ["a2", "orthogonal", "endTurn"] },
      { commands: ["d2", "c3", "orthogonal", "endTurn"] },
      { commands: ["a2", "c2", "orthogonal", "endTurn"] },
      { commands: ["c3", "b4", "diagonal", "endTurn"] },
      { commands: ["a4", "b4", "step", "endTurn"] },
    ],
  },
];

export default kachitknightScripts;
