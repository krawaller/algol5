import { ShoveoffDefinition } from "./_types";

const shoveoffScripts: ShoveoffDefinition["scripts"] = {
  basic: [
    {
      commands: [],
      include: [
        "a1",
        "a2",
        "a3",
        "a4",
        "b1",
        "b4",
        "c1",
        "c4",
        "d1",
        "d2",
        "d3",
        "d4"
      ]
    },
    { commands: ["c1"], include: ["north"] },
    {
      commands: ["north", "endTurn"],
      include: [
        "a1",
        "a2",
        "a3",
        "a4",
        "b1",
        "b4",
        "c1",
        "d1",
        "d2",
        "d3",
        "d4"
      ]
    },
    { commands: ["d1"], include: ["north", "west"] },
    {
      commands: ["west", "endTurn"],
      include: [
        "a1",
        "a2",
        "a3",
        "a4",
        "b1",
        "b4",
        "c1",
        "c4",
        "d1",
        "d2",
        "d3",
        "d4"
      ]
    },
    { commands: ["d4"], include: ["west"] },
    {
      commands: ["west", "endTurn"],
      include: [
        "a1",
        "a2",
        "a3",
        "a4",
        "b1",
        "c1",
        "c4",
        "d1",
        "d2",
        "d3",
        "d4"
      ]
    },
    {
      commands: ["b1", "north", "endTurn"],
      include: [
        "a1",
        "a2",
        "a3",
        "a4",
        "b1",
        "c1",
        "c4",
        "d1",
        "d2",
        "d3",
        "d4"
      ]
    },
    {
      commands: ["c4", "south", "endTurn"],
      include: [
        "a1",
        "a2",
        "a3",
        "a4",
        "b1",
        "b4",
        "c4",
        "d1",
        "d2",
        "d3",
        "d4"
      ]
    },
    {
      commands: ["c4", "south", "endTurn"],
      include: ["a1", "a2", "a3", "a4", "b1", "c4", "d1", "d2", "d3", "d4"]
    },
    { commands: ["a1", "north", "endTurn"], endedIn: "win" }
  ]
};

export default shoveoffScripts;
