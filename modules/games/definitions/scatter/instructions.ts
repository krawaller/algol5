import { ScatterDefinition } from "./_types";

const scatterInstructions: ScatterDefinition["instructions"] = {
  startTurn: {
    line: ["Select", "pawns", "to move"],
  },
  selectunit: {
    line: ["Select where to move", { unitat: "selectunit" }],
  },
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

export default scatterInstructions;
