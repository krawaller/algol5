import { TowersDefinition } from "./_types";

const towersInstructions: TowersDefinition["instructions"] = {
  startTurn: { line: ["Select", "pieces", "to move"]},
  selectunit: { line: ["Select", "where to move", { unitat: "selectunit" }] },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to move",
      { unitat: "selectunit" },
      "to",
      "selectmovetarget"
    ],
  }
};

export default towersInstructions;
