import { TunnelerDefinition } from "./_types";

const tunnelerInstructions: TunnelerDefinition["instructions"] = {
  startTurn: {
    line: [
      "Select",
      { unittype: ["foremen", ["player"]] },
      "or",
      { unittype: ["tunnelers", ["player"]] },
      "to move",
    ],
  },
  selectunit: {
    line: ["Select", "where to move", { unitat: "selectunit" }],
  },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to move",
      { unitat: "selectunit" },
      "to",
      {
        ifelse: [
          { anyat: ["rocks", "selectmovetarget"] },
          { line: ["dig", { unitat: "selectmovetarget" }] },
          {
            ifelse: [
              { anyat: ["oppunits", "selectmovetarget"] },
              { line: ["capture", { unitat: "selectmovetarget" }] },
              "selectmovetarget",
            ],
          },
        ],
      },
    ],
  },
};

export default tunnelerInstructions;
