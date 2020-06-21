import { HobbesDefinition } from "./_types";

const hobbesScripts: HobbesDefinition["scripts"] = [
  {
    desc: "basic",
    lines: [
      { commands: ["d1", "e1", "push", "endTurn"] },
      { commands: ["c4", "c3", "push", "endTurn"] },
      { commands: ["d2", "d3", "push", "endTurn"] },
      { commands: ["d4", "e4", "push", "endTurn"] },
      { commands: ["c1", "move", "b1", "a1", "push", "endTurn"] },
      { commands: ["d3", "d1", "push", "endTurn"] },
      { commands: ["b2", "b3", "push", "endTurn"] },
      { commands: ["c4", "move", "b4", "a4", "push", "endTurn"] },
      { commands: ["c2", "d2", "push", "endTurn"] },
      { commands: ["b3", "b2", "push", "endTurn"] },
      { commands: ["c3", "c1", "pull", "endTurn"] },
      { commands: ["b2", "b1", "push", "endTurn"] },
      { commands: ["c2", "c5", "push", "endTurn"] },
      { commands: ["c4", "move", "endTurn"] },
    ],
  },
];

export default hobbesScripts;
