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
              { line: ["soldiers", "to advance"] }
            ]
          },
          { if: [{ notempty: "mykings" }, { line: ["kings", "to retreat"] }] }
        ]
      }
    ]
  },
  selectunit: {
    ifelse: [
      { anyat: ["mykings", "selectunit"] },
      {
        line: [
          "Select",
          "a square closer to home to move",
          { unitat: "selectunit" },
          "to"
        ]
      },
      {
        line: [
          "Select",
          "a square closer to the enemy base to move",
          { unitat: "selectunit" },
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
      { ifelse: [{ anyat: ["mykings", "selectunit"] }, "retreat", "advance"] },
      { unitat: "selectunit" },
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
          { line: [", killing", { unitat: "selectmovetarget" }] }
        ]
      }
    ]
  }
};

export default uglyduckInstructions;
