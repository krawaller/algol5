import { KingsvalleyDefinition } from "./_types";

const kingsvalleyScripts: KingsvalleyDefinition["scripts"] = [
  {
    desc: "basic",
    lines: [
      { commands: ["a1", "a4", "slide", "endTurn"] },
      { commands: ["d5", "d2", "slide", "endTurn"] },
    ],
  },
];

export default kingsvalleyScripts;
