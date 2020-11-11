import { JesonmorDefinition } from "./_types";

const jesonmorInstructions: JesonmorDefinition["instructions"] = {
  startTurn: { line: ["Go!"] },
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

export default jesonmorInstructions;
