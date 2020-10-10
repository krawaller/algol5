import { SupportDefinition } from "./_types";

const supportInstructions: SupportDefinition["instructions"] = {
  startTurn: { line: ["Select where to insert", "soldiers"] },
  selectedge: {
    ifelse: [
      { anyat: ["mysoldiers", "selectedge"] },
      { line: ["Select where to push"] },
      {
        line: [
          "Press",
          "insert",
          "to spawn",
          { unittypepos: ["soldiers", ["player"], "selectedge"] },
        ],
      },
    ],
  },
  selectpushtarget: {
    line: [
      "Press",
      "insert",
      "to spawn",
      { unittypepos: ["soldiers", ["player"], "selectedge"] },
      "and push",
      { unitlist: "pushees" },
      {
        ifelse: [
          { anyat: ["units", "selectpushtarget"] },
          { line: ["to kill", { unitat: "selectpushtarget" }] },
          { line: ["towards", "selectpushtarget"] },
        ],
      },
    ],
  },
};

export default supportInstructions;
