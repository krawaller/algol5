import { DaggersScripts } from './_types';

const daggersScripts: DaggersScripts = {
  basic: [
    { commands: [], include: ["c7", "d7", "d8", "e7", "e8", "f7"] },
    {
      commands: ["c7"],
      include: [
        "a5",
        "b6",
        "b8",
        "c4",
        "c5",
        "c6",
        "c8",
        "d6",
        "e5",
        "f4",
        "g3",
        "h2",
      ],
    },
    {
      commands: ["g3", "move", "endTurn"],
      include: ["b2", "c1", "c2", "c3", "d2", "e2", "f1", "f2", "f3", "g2"],
    },
    { commands: ["f2"], include: ["e1", "e3", "g1", "g3"] },
    {
      commands: ["e3", "move", "endTurn"],
      include: ["d7", "d8", "e7", "e8", "f7", "g3"],
    },
    { commands: ["g3"], include: ["e1", "f2", "f4", "g4", "h2", "h4"] },
    {
      commands: ["f2", "move", "endTurn"],
      include: ["b2", "c1", "c2", "c3", "d2", "e2", "e3", "f1", "f3", "g2"],
    },
    { commands: ["f1"], include: ["e1", "f2", "g1"] },
  ],
};

export default daggersScripts;
