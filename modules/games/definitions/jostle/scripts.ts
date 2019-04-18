import { JostleScripts } from './_types';

const jostleScripts: JostleScripts = {
  basic: [
    {
      commands: [],
      include: [
        "c4",
        "c6",
        "c8",
        "d3",
        "d5",
        "e4",
        "e8",
        "f3",
        "f7",
        "g6",
        "g8",
        "h3",
        "h5",
        "h7"
      ]
    },
    { commands: ["h3"], include: ["h2", "i3"] },
    {
      commands: ["h2", "jostle", "endTurn"],
      include: [
        "c3",
        "c5",
        "c7",
        "d6",
        "d8",
        "e3",
        "e7",
        "f4",
        "f8",
        "g3",
        "g5",
        "h4",
        "h6",
        "h8"
      ]
    },
    { commands: ["g5"], include: ["f5"] },
    {
      commands: ["f5", "jostle", "endTurn"],
      include: [
        "c4",
        "c6",
        "c8",
        "d3",
        "d5",
        "e4",
        "e8",
        "f3",
        "f7",
        "g4",
        "g6",
        "g8",
        "h5",
        "h7"
      ]
    },
    {
      commands: ["c6", "b6", "jostle", "endTurn"],
      include: [
        "c3",
        "c5",
        "c7",
        "d6",
        "d8",
        "e3",
        "e7",
        "f8",
        "g3",
        "h4",
        "h6",
        "h8"
      ]
    },
    {
      commands: ["e7", "e6", "jostle", "endTurn"],
      include: [
        "c4",
        "c8",
        "d3",
        "d5",
        "d7",
        "e4",
        "e8",
        "f3",
        "f7",
        "g4",
        "g6",
        "g8",
        "h5",
        "h7"
      ]
    },
    { commands: ["h5"], include: ["g5", "i5"] },
    {
      commands: ["i5", "jostle", "endTurn"],
      include: [
        "c3",
        "c5",
        "c7",
        "d6",
        "d8",
        "e3",
        "f8",
        "g3",
        "h4",
        "h6",
        "h8"
      ]
    }
  ]
};

export default jostleScripts;
