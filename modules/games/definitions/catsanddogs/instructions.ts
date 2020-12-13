import { CatsanddogsDefinition } from "./_types";

const catsanddogsInstructions: CatsanddogsDefinition["instructions"] = {
  startTurn: { line: ["Go!"] },
  selectdeploytarget: {
    line: [
      "Press",
      "deploy",
      "to spawn",
      { unittypepos: ["unit", 0, "selectdeploytarget"] }
    ]
  },
};

export default catsanddogsInstructions;
