import { OrthokonDefinition } from "./_types";

const orthokonScripts: OrthokonDefinition["scripts"] = [
  {
    desc: "demo",
    lines: [
      { commands: ["c1", "c3", "slide", "endTurn"] },
      { commands: ["b4", "b2", "slide", "endTurn"] },
      { commands: ["c3", "c1", "slide", "endTurn"] },
      { commands: ["a4", "b4", "slide", "endTurn"] },
      { commands: ["a1", "a4", "slide", "endTurn"] },
      { commands: ["b2", "a1", "slide", "endTurn"] },
      { commands: ["d1", "d3", "slide", "endTurn"] },
      { commands: ["a1", "c3", "slide", "endTurn"] },
      { commands: ["a4", "a1", "slide", "endTurn"] },
      { commands: ["d3", "d1", "slide", "endTurn"] },
      { commands: ["d4", "d2", "slide", "endTurn"] },
      { commands: ["c1", "c2", "slide", "endTurn"] },
      { commands: ["d1", "c1", "slide", "endTurn"] },
      { commands: ["c3", "b2", "slide", "endTurn"] },
      { commands: ["b4", "c3", "slide", "endTurn"] },
      { commands: ["d2", "d4", "slide", "endTurn"] },
      { commands: ["c2", "d3", "slide", "endTurn"] },
      { commands: ["b1", "c2", "slide", "endTurn"] },
      { commands: ["a1", "b1", "slide", "endTurn"] },
      { commands: ["c4", "a2", "slide", "endTurn"] },
      { commands: ["c1", "d2", "slide", "endTurn"] },
      { commands: ["b2", "c1", "slide", "endTurn"] },
      { commands: ["d2", "d1", "slide", "endTurn"] },
      { commands: ["a2", "a1", "slide", "endTurn"] },
      { commands: ["d1", "d2", "slide", "endTurn"] },
      { commands: ["a1", "b2", "slide", "endTurn"] },
      { commands: ["d3", "c4", "slide", "endTurn"] },
      { commands: ["c2", "d3", "slide", "endTurn"] },
      { commands: ["c1", "c2", "slide", "endTurn"] },
      { commands: ["b1", "a2", "slide", "endTurn"] },
      { commands: ["c4", "b3", "slide", "endTurn"] },
      { commands: ["a2", "b1", "slide", "endTurn"] },
      { commands: ["d2", "d1", "slide", "endTurn"] },
      { commands: ["b1", "c1", "slide", "endTurn"] },
      { commands: ["c3", "d2", "slide", "endTurn"] },
      { commands: ["d4", "c3", "slide", "endTurn"], endedIn: "win" },
    ],
  },
  {
    desc: "basic",
    lines: [
      { commands: [], include: ["a1", "b1", "c1", "d1"] },
      { commands: ["a1"], include: ["a3", "c3"] },
      { commands: ["c3", "slide", "endTurn"], include: ["a4", "b4", "d4"] },
      {
        commands: ["d4", "d2", "slide", "endTurn"],
        include: ["b1", "c1", "c3", "c4"],
      },
      { commands: ["b1"], include: ["a1", "a2", "b3", "d3"] },
    ],
  },
];

export default orthokonScripts;
