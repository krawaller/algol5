import { SemaphorScripts } from './_types';

const semaphorScripts: SemaphorScripts = {
  basic: [
    {
      commands: [],
      include: [
        "a1",
        "a2",
        "a3",
        "b1",
        "b2",
        "b3",
        "c1",
        "c2",
        "c3",
        "d1",
        "d2",
        "d3",
      ],
    },
    { commands: ["c2"], include: ["deploy"] },
    {
      commands: ["deploy", "endTurn"],
      include: [
        "a1",
        "a2",
        "a3",
        "b1",
        "b2",
        "b3",
        "c1",
        "c2",
        "c3",
        "d1",
        "d2",
        "d3",
      ],
    },
    { commands: ["c2"], include: ["promote"] },
    {
      commands: ["promote", "endTurn", "c2", "promote", "endTurn"],
      include: [
        "a1",
        "a2",
        "a3",
        "b1",
        "b2",
        "b3",
        "c1",
        "c3",
        "d1",
        "d2",
        "d3",
      ],
    },
    {
      commands: [
        "b2",
        "deploy",
        "endTurn",
        "b2",
        "promote",
        "endTurn",
        "b2",
        "promote",
        "endTurn",
      ],
      include: ["a1", "a2", "a3", "b1", "b3", "c1", "c3", "d1", "d2", "d3"],
    },
    {
      commands: [
        "a2",
        "deploy",
        "endTurn",
        "a2",
        "promote",
        "endTurn",
        "a2",
        "promote",
      ],
      include: ["win"],
    },
  ],
};

export default semaphorScripts;
