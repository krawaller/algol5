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
      "to",
      {
        ifelse: [
          { anyat: ["rocks", "selectmovetarget"] },
          {
            line: [
              "make",
              { unitat: "selectunit" },
              "dig",
              { unitat: "selectmovetarget" },
            ],
          },
          {
            ifelse: [
              { anyat: ["oppunits", "selectmovetarget"] },
              {
                line: [
                  "make",
                  { unitat: "selectunit" },
                  "capture",
                  { unitat: "selectmovetarget" },
                ],
              },
              {
                line: [
                  { text: "move" },
                  { unitat: "selectunit" },
                  "to",
                  "selectmovetarget",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

export default tunnelerInstructions;
