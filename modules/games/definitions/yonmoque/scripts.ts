import { YonmoqueDefinition } from "./_types";

const yonmoqueScripts: YonmoqueDefinition["scripts"] = [
  {
    desc: "basic",
    lines: [
      { commands: ["a3", "drop", "endTurn"] },
      { commands: ["c2", "drop", "endTurn"] },
      { commands: ["b3", "drop", "endTurn"] },
      { commands: ["c3", "drop", "endTurn"] },
      { commands: ["a3", "b2", "move", "endTurn"] },
    ],
  },
];

export default yonmoqueScripts;
