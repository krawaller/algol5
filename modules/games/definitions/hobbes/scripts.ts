import { HobbesDefinition } from "./_types";

const hobbesScripts: HobbesDefinition["scripts"] = [
  {
    desc: "basic",
    lines: [
      { commands: ["d1", "e1", "push", "endTurn"] },
      { commands: ["c4", "c3", "push", "endTurn"] },
      { commands: ["d2", "d3", "push", "endTurn"] },
      { commands: ["b4", "a4", "push", "endTurn"] },
      { commands: ["e4", "move", "d4", "c4", "push", "endTurn"] },
    ],
  },
];

export default hobbesScripts;
