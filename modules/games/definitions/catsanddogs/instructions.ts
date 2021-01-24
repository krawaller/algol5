import { CatsanddogsDefinition } from "./_types";

const catsanddogsInstructions: CatsanddogsDefinition["instructions"] = {
  startTurn: { line: ["Go ahead and play!"] },
  "selectdeploytarget": {
    line: [
      "Press",
      "deploy",
      "to spawn",
      { unittypepos: ["animals", ['player'], "selectdeploytarget"] }
    ]
  },
};

export default catsanddogsInstructions;
