import { ShoveoffInstructions } from './_types';

const shoveoffInstructions: ShoveoffInstructions = {
  startTurn: {
    line: [
      "Select",
      "where to shove in",
      {
        ifelse: [
          { same: [{ sizeof: "myunits" }, 7] },
          { line: ["your last off-board", "soldiers"] },
          {
            ifelse: [
              { same: [{ sizeof: "myunits" }, 8] },
              { line: ["a", { unittype: ["soldiers", 0] }] },
              {
                line: [
                  "one of your",
                  { value: { minus: [8, { sizeof: "myunits" }] } },
                  { line: ["remaining off-board", "soldiers"] }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  selectpushpoint: {
    line: [
      "Press",
      {
        orlist: [
          { if: [{ notempty: "spawnsouth" }, "south"] },
          { if: [{ notempty: "spawnnorth" }, "north"] },
          { if: [{ notempty: "spawnwest" }, "west"] },
          { if: [{ notempty: "spawneast" }, "east"] }
        ]
      },
      "to shove in that direction and make room for the new unit at",
      "selectpushpoint"
    ]
  }
};

export default shoveoffInstructions;
