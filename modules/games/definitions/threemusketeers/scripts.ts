import { ThreemusketeersScripts } from "./_types";

const threemusketeersScripts: ThreemusketeersScripts = {
  basic: [
    { commands: [], include: ["a1", "c3", "e5"] },
    { commands: ["c3"], include: ["b3", "c2", "c4", "d3"] },
    { commands: ["c4", "move", "endTurn"], include: ["b3", "c2", "d3"] },
    { commands: ["c2"], include: ["c3"] },
    { commands: ["c3", "move", "endTurn"], include: ["a1", "c4", "e5"] },
    {
      commands: ["c4", "c3", "move", "endTurn"],
      include: ["b2", "b4", "c1", "c5", "d2", "d4"]
    },
    { commands: ["c1", "c2", "move", "endTurn"], include: ["a1", "c3", "e5"] },
    { commands: ["c3"], include: ["b3", "c2", "d3"] }
  ]
};

export default threemusketeersScripts;
