import { SquavaDefinition } from "./_types";

const squavaInstructions: SquavaDefinition["instructions"] = {
  startTurn: {
    line: [
      "Select where to drop a",
      { unittype: ["markers", ["player"]] },
      {
        ifplayer: [
          2,
          {
            if: [
              ["isFirstTurn"],
              {
                line: [
                  "or invoke",
                  "pie",
                  "to steal",
                  { unitlist: "oppunits" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  selectspace: {
    line: [
      "Press",
      "drop",
      "to place",
      { unittypepos: ["markers", ["player"], "selectspace"] },
    ],
  },
};

export default squavaInstructions;
