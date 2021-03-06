import { TrafficlightsDefinition } from "./_types";

const trafficlightsScripts: TrafficlightsDefinition["scripts"] = [
  {
    desc: "nicegame",
    lines: [
      { commands: ["b2", "deploy", "endTurn"] },
      { commands: ["b2", "promote", "endTurn"] },
      { commands: ["c2", "deploy", "endTurn"] },
      { commands: ["d2", "deploy", "endTurn"] },
      { commands: ["b2", "promote", "endTurn"] },
      { commands: ["c2", "promote", "endTurn"] },
      { commands: ["b1", "deploy", "endTurn"] },
      { commands: ["d2", "promote", "endTurn"] },
      { commands: ["d3", "deploy", "endTurn"] },
      { commands: ["a2", "deploy", "endTurn"] },
      { commands: ["a2", "promote", "endTurn"] },
      { commands: ["a3", "deploy", "endTurn"] },
      { commands: ["a3", "promote", "endTurn"] },
      { commands: ["a3", "promote", "endTurn"] },
      { commands: ["d1", "deploy", "endTurn"] },
      { commands: ["c1", "deploy", "endTurn"] },
    ],
  },
  {
    desc: "quickWin",
    lines: [
      {
        commands: [
          "a1",
          "deploy",
          "endTurn",
          "b1",
          "deploy",
          "endTurn",
          "c1",
          "deploy",
          "endTurn",
        ],
        endedIn: "win",
        endedBy: "madeline",
      },
    ],
  },
  {
    desc: "basic",
    lines: [
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
          "endTurn",
        ],
        endedIn: "win",
      },
    ],
  },
];

export default trafficlightsScripts;
