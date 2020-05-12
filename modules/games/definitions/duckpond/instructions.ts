import { DuckpondDefinition } from "./_types";

const duckpondInstructions: DuckpondDefinition["instructions"] = {
  startTurn: { line: ["Select", "ducks", "to move"] },
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

export default duckpondInstructions;
