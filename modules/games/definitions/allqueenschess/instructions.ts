import { AllqueenschessDefinition } from "./_types";

const allqueenschessInstructions: AllqueenschessDefinition["instructions"] = {
  startTurn: { line: ["Select which", "queens", "to move"] },
  selectunit: { line: ["Select where to move", { unitat: "selectunit" }] },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to move",
      { unitat: "selectunit" },
      "to",
      "selectmovetarget",
    ],
  },
};

export default allqueenschessInstructions;
