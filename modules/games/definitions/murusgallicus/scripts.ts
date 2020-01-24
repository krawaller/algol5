import { MurusgallicusScripts } from "./_types";

const murusgallicusScripts: MurusgallicusScripts = {
  basic: [
    { commands: [], include: ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"] },
    { commands: ["a1"], include: ["a3", "c3"] },
    {
      commands: ["c3", "move", "endTurn"],
      include: ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"]
    },
    { commands: ["a7"], include: ["a5", "c5"] },
    {
      commands: ["c5", "move", "endTurn"],
      include: ["b1", "c1", "d1", "e1", "f1", "g1", "h1"]
    },
    { commands: ["c1"], include: ["a3", "c3", "e3"] },
    {
      commands: ["c3", "move", "endTurn"],
      include: ["b7", "c7", "d7", "e7", "f7", "g7", "h7"]
    },
    { commands: ["b7"], include: ["b5", "d5"] },
    {
      commands: ["b5", "move", "endTurn"],
      include: ["b1", "c3", "d1", "e1", "f1", "g1", "h1"]
    },
    { commands: ["c3"], include: ["a1", "a3", "a5", "c1", "e3", "e5"] },
    {
      commands: ["e5", "move", "endTurn"],
      include: ["b6", "c7", "d7", "e7", "f7", "g7", "h7"]
    },
    { commands: ["d7"], include: ["b5", "d5", "f5"] },
    {
      commands: ["f5", "move", "endTurn"],
      include: ["b1", "d1", "e1", "f1", "g1", "h1"]
    },
    { commands: ["d1"], include: ["b3", "d3", "f3"] },
    {
      commands: ["d3", "move", "endTurn"],
      include: ["b6", "c7", "e7", "f7", "g7", "h7"]
    },
    {
      commands: ["f7", "d5", "move", "endTurn"],
      include: ["b1", "e1", "f1", "g1", "h1"]
    },
    {
      commands: ["b1", "d3", "move", "endTurn"],
      include: ["b6", "c7", "e6", "e7", "g7", "h7"]
    },
    { commands: ["e6"], include: ["c4", "c6", "e5", "g4", "g6"] },
    {
      commands: ["e5", "crush", "endTurn"],
      include: ["c2", "d3", "e1", "f1", "g1", "h1"]
    }
  ]
};

export default murusgallicusScripts;
