import { KickrunInstructions } from "./_types";

const kickrunInstructions: KickrunInstructions = {
  startTurn: { line: ["Select", "which unit to move"] },
  selectunit: {
    line: [
      "Select",
      "where to move your",
      "selectunit",
      { ifelse: [{ anyat: ["runners", "selectunit"] }, "bishop", "pawn"] }
    ]
  },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to",
      {
        ifelse: [
          { anyat: ["runners", "selectunit"] },
          {
            line: [
              "slide your bishop from",
              "selectunit",
              "to",
              "selectmovetarget"
            ]
          },
          {
            line: [
              "move your pawn from",
              "selectunit",
              "to",
              "selectmovetarget",
              {
                if: [
                  { anyat: ["units", "selectmovetarget"] },
                  "and capture the enemy there"
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};

export default kickrunInstructions;
