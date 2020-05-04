import { AmbivalenteDefinition } from "./_types";

const ambivalenteScripts: AmbivalenteDefinition["scripts"] = [
  {
    desc: "basic",
    lines: [
      { commands: ["a3", "drop", "endTurn"] },
      { commands: ["b3", "drop", "endTurn"] },
      { commands: ["e4", "drop", "endTurn"] },
      { commands: ["c2", "drop", "endTurn"] },
      { commands: ["a6", "drop", "endTurn"] },
      { commands: ["c4", "drop", "endTurn"] },
      { commands: ["c3", "drop", "endTurn"] },
    ],
  },
];

export default ambivalenteScripts;
