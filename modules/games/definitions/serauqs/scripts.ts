import { SerauqsScripts } from "./_types";

const serauqsScripts: SerauqsScripts = {
  basic: [
    { commands: [], include: ["a1", "b1", "c1", "d1"] },
    { commands: ["d1"], include: ["promote"] },
    { commands: ["promote", "endTurn"], include: ["a4", "b4", "c4", "d4"] },
    {
      commands: ["a4", "promote", "endTurn"],
      include: ["a1", "b1", "c1", "d1"]
    },
    { commands: ["b1"], include: ["a2", "b2", "c2"] },
    { commands: ["b2"], include: ["move"] },
    { commands: ["move", "endTurn"], include: ["a4", "b4", "c4", "d4"] }
  ]
};

export default serauqsScripts;
