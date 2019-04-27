import { UglyduckInstructions } from "./_types";

const uglyduckInstructions: UglyduckInstructions = {
  startTurn: {
    line: [
      "Select",
      {
        orlist: [
          {
            if: [
              { notempty: "mysoldiers" },
              { line: ["a", "soldiers", "to advance"] }
            ]
          },
          {
            if: [{ notempty: "mykings" }, { line: ["a", "king", "to retreat"] }]
          }
        ]
      }
    ]
  },
  selectunit: {
    ifelse: [
      { anyat: ["mykings", "selectunit"] },
      {
        line: ["Select", "a square closer to home to move your", "king", "to"]
      },
      {
        line: [
          "Select",
          "a square closer to the enemy lines to move your",
          "pawn",
          "to"
        ]
      }
    ]
  },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to",
      {
        ifelse: [
          { anyat: ["mykings", "selectunit"] },
          { line: ["retreat your", "king"] },
          { line: ["advance your", "pawn"] }
        ]
      },
      "from",
      "selectunit",
      {
        ifelse: [
          { anyat: ["opphomerow", "selectmovetarget"] },
          { line: ["into the opponent base at", "selectmovetarget"] },
          {
            ifelse: [
              { anyat: ["myhomerow", "selectmovetarget"] },
              { line: ["back home to", "selectmovetarget"] },
              { line: ["to", "selectmovetarget"] }
            ]
          }
        ]
      },
      {
        if: [
          { anyat: ["oppunits", "selectmovetarget"] },
          { line: [", killing the enemy", { unitat: "selectmovetarget" }] }
        ]
      }
    ]
  }
};

export default uglyduckInstructions;
