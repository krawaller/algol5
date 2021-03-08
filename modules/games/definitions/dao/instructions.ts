import { DaoDefinition } from "./_types";

const daoInstructions: DaoDefinition["instructions"] = {
  startTurn: { line: ["Select", "soldiers", "to move"] },
  selectunit: { line: ["Select where to move", { unitat: "selectunit" }] },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to make",
      { unitat: "selectunit" },
      "slide to",
      "selectmovetarget",
    ],
  },
};

export default daoInstructions;
