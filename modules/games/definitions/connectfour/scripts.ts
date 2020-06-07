import { ConnectfourDefinition } from "./_types";

const connectfourScripts: ConnectfourDefinition["scripts"] = [
  {
    desc: "basic",
    lines: [
      { commands: ["c1", "drop", "endTurn"] },
      { commands: ["c2", "drop", "endTurn"] },
      { commands: ["d1", "drop", "endTurn"] },
      { commands: ["e1", "drop", "endTurn"] },
      { commands: ["d2", "drop", "endTurn"] },
      { commands: ["e2", "drop", "endTurn"] },
      { commands: ["e3", "drop", "endTurn"] },
      { commands: ["b1", "drop", "endTurn"] },
      { commands: ["d3", "drop", "endTurn"] },
    ],
  },
];

export default connectfourScripts;
