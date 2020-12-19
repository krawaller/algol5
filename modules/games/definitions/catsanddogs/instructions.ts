import { CatsanddogsDefinition } from "./_types";

const catsanddogsInstructions: CatsanddogsDefinition["instructions"] = {
  startTurn: { line: ["Go you noob, haha just kidding, but go!"] },
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
