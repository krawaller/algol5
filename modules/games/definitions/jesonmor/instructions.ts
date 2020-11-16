import { JesonmorDefinition } from "./_types";

const jesonmorInstructions: JesonmorDefinition["instructions"] = {
  startTurn: {
    ifelse: [
      { anyat: ["units", { onlyin: "center" }] },
      {
        line: [
          "Select",
          "a",
          "horses",
          "to oust",
          { unitat: { onlyin: "center" } },
        ],
      },
      { line: ["Select", "which", "horses", "to act with"] },
    ],
  },
  selectunit: { line: ["Select", "where to move", { unitat: "selectunit" }] },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to make",
      { unitat: "selectunit" },
      {
        ifelse: [
          { anyat: ["units", "selectmovetarget"] },
          { line: ["stomp", { unitat: "selectmovetarget" }] },
          { line: ["go to", "selectmovetarget"] },
        ],
      },
    ],
  },
};

export default jesonmorInstructions;
