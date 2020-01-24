import { OrthokonScripts } from "./_types";

const orthokonScripts: OrthokonScripts = {
  demo: [
    { commands: ["c1", "c3", "move", "endTurn"] },
    { commands: ["b4", "b2", "move", "endTurn"] },
    { commands: ["c3", "c1", "move", "endTurn"] },
    { commands: ["a4", "b4", "move", "endTurn"] },
    { commands: ["a1", "a4", "move", "endTurn"] },
    { commands: ["b2", "a1", "move", "endTurn"] },
    { commands: ["d1", "d3", "move", "endTurn"] },
    { commands: ["a1", "c3", "move", "endTurn"] },
    { commands: ["a4", "a1", "move", "endTurn"] },
    { commands: ["d3", "d1", "move", "endTurn"] },
    { commands: ["d4", "d2", "move", "endTurn"] },
    { commands: ["c1", "c2", "move", "endTurn"] },
    { commands: ["d1", "c1", "move", "endTurn"] },
    { commands: ["c3", "b2", "move", "endTurn"] },
    { commands: ["b4", "c3", "move", "endTurn"] },
    { commands: ["d2", "d4", "move", "endTurn"] },
    { commands: ["c2", "d3", "move", "endTurn"] },
    { commands: ["b1", "c2", "move", "endTurn"] },
    { commands: ["a1", "b1", "move", "endTurn"] },
    { commands: ["c4", "a2", "move", "endTurn"] },
    { commands: ["c1", "d2", "move", "endTurn"] },
    { commands: ["b2", "c1", "move", "endTurn"] },
    { commands: ["d2", "d1", "move", "endTurn"] },
    { commands: ["a2", "a1", "move", "endTurn"] },
    { commands: ["d1", "d2", "move", "endTurn"] },
    { commands: ["a1", "b2", "move", "endTurn"] },
    { commands: ["d3", "c4", "move", "endTurn"] },
    { commands: ["c2", "d3", "move", "endTurn"] },
    { commands: ["c1", "c2", "move", "endTurn"] },
    { commands: ["b1", "a2", "move", "endTurn"] },
    { commands: ["c4", "b3", "move", "endTurn"] },
    { commands: ["a2", "b1", "move", "endTurn"] },
    { commands: ["d2", "d1", "move", "endTurn"] },
    { commands: ["b1", "c1", "move", "endTurn"] },
    { commands: ["c3", "d2", "move", "endTurn"] },
    { commands: ["d4", "c3", "move", "endTurn"], endedIn: "win" }
  ],
  basic: [
    { commands: [], include: ["a1", "b1", "c1", "d1"] },
    { commands: ["a1"], include: ["a3", "c3"] },
    { commands: ["c3", "move", "endTurn"], include: ["a4", "b4", "d4"] },
    {
      commands: ["d4", "d2", "move", "endTurn"],
      include: ["b1", "c1", "c3", "c4"]
    },
    { commands: ["b1"], include: ["a1", "a2", "b3", "d3"] }
  ]
};

export default orthokonScripts;
