import { YonmoqueDefinition } from "./_types";

const yonmoqueInstructions: YonmoqueDefinition["instructions"] = {
  startTurn: {
    line: [
      "Select",
      {
        orlist: [
          {
            if: [{ notempty: "myunits" }, { line: ["a unit to move"] }],
          },
          {
            if: [
              {
                morethan: [
                  7,
                  {
                    firsttruthy: [
                      { battlevar: { playercase: ["plr1drop", "plr2drop"] } },
                      0,
                    ],
                  },
                ],
              },
              { line: ["an empty square to drop a unit into"] },
            ],
          },
        ],
      },
    ],
  },
  selectdroptarget: {
    line: [
      "Press",
      "drop",
      "to spawn a",
      {
        unittype: [
          {
            ifelse: [
              { anyat: ["mybase", "selectdroptarget"] },
              "bishops",
              "pawns",
            ],
          },
          ["player"],
        ],
      },
    ],
  },
  selectunit: { line: ["Now select where to move", { unitat: "selectunit" }] },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to move",
      { unitat: "selectunit" },
      "to",
      "selectmovetarget",
      {
        if: [
          {
            and: [
              { anyat: ["mybishops", "selectunit"] },
              { noneat: ["mybase", "selectmovetarget"] },
            ],
          },
          { line: ["and demote it to a", "pawns"] },
        ],
      },
      {
        if: [
          {
            and: [
              { anyat: ["mypawns", "selectunit"] },
              { anyat: ["mybase", "selectmovetarget"] },
            ],
          },
          { line: ["and promote it to a", "bishops"] },
        ],
      },
    ],
  },
};

export default yonmoqueInstructions;
