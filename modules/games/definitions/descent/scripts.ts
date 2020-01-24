import { DescentScripts } from "./_types";

const descentScripts: DescentScripts = {
  basic: [
    { commands: [], include: ["a1", "c4", "d1"] },
    { commands: ["c4"], include: ["b3", "b4", "c3", "d3"] },
    {
      commands: ["b3", "move"],
      include: ["a2", "a3", "b2", "b4", "c2", "c3", "c4"]
    },
    { commands: ["c3", "dig", "endTurn"], include: ["a4", "b1", "d4"] },
    { commands: ["d4"], include: ["c3", "c4", "d3"] },
    { commands: ["d3", "move"], include: ["c2", "c3", "c4", "d2", "d4"] },
    { commands: ["c3", "dig", "endTurn"], include: ["a1", "b3", "d1"] },
    {
      commands: ["a1", "b2", "move"],
      include: ["a1", "a2", "a3", "c1", "c2", "c3"]
    },
    { commands: ["c3", "dig", "endTurn"], include: ["a4", "b1", "d3"] },
    { commands: ["d3"], include: ["c2", "c4", "d2", "d4"] },
    {
      commands: ["d2", "move", "c1", "dig", "endTurn"],
      include: ["b2", "b3", "d1"]
    },
    { commands: ["b2", "c2", "move", "b2", "dig", "endTurn"], endedIn: "win" }
  ]
};

export default descentScripts;
