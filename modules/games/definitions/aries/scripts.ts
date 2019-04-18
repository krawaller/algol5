import { AriesScripts } from './_types';

const ariesScripts: AriesScripts = {
  basic: [
    { commands: [], include: ["a4", "b4", "c4", "d1", "d2", "d3", "d4"] },
    {
      commands: ["d4"],
      include: ["d5", "d6", "d7", "d8", "e4", "f4", "g4", "h4"]
    },
    {
      commands: ["g4", "move", "endTurn"],
      include: ["e5", "e6", "e7", "e8", "f5", "g5", "h5"]
    },
    {
      commands: ["g5", "g4", "move", "endTurn"],
      include: ["a4", "b4", "c4", "d1", "d2", "d3", "g3"]
    },
    {
      commands: ["c4"],
      include: ["c5", "c6", "c7", "c8", "d4", "e4", "f4", "g4"]
    },
    {
      commands: ["g4", "move", "endTurn"],
      include: ["e5", "e6", "e7", "e8", "f5", "g6", "h4", "h5"]
    }
  ],
  nopushback: [
    {
      commands: [
        "d3",
        "f3",
        "move",
        "endTurn",
        "f5",
        "f3",
        "move",
        "endTurn",
        "f2"
      ],
      exclude: ["f3"]
    }
  ]
};

export default ariesScripts;
