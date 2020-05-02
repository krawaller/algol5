import { AllqueenschessDefinition } from "./_types";

const allqueenschessScripts: AllqueenschessDefinition["scripts"] = [
  {
    desc: "basic",
    lines: [
      { commands: ["e1", "c3", "move", "endTurn"] },
      { commands: ["b1", "b3", "move", "endTurn"] },
      { commands: ["d5", "c4", "move", "endTurn"] },
      { commands: ["e5", "d5", "move", "endTurn"] },
    ],
  },
];

export default allqueenschessScripts;
