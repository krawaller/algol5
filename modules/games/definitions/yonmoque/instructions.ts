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
                  6,
                  {
                    firsttruthy: [
                      { battlevar: { playercase: ["plr1drop", "plr2drop"] } },
                      0,
                    ],
                  },
                ],
              },
              {
                line: [
                  "an empty square to drop",
                  {
                    ifelse: [
                      {
                        same: [
                          5,
                          {
                            battlevar: { playercase: ["plr1drop", "plr2drop"] },
                          },
                        ],
                      },
                      "your last remaining off-board unit",
                      {
                        line: [
                          "one of your",
                          {
                            value: {
                              minus: [
                                6,
                                {
                                  firsttruthy: [
                                    {
                                      battlevar: {
                                        playercase: ["plr1drop", "plr2drop"],
                                      },
                                    },
                                    0,
                                  ],
                                },
                              ],
                            },
                          },
                          "off-board units",
                        ],
                      },
                    ],
                  },
                ],
              },
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
      "to spawn",
      {
        unittypepos: [
          {
            ifelse: [
              { anyat: ["mybase", "selectdroptarget"] },
              "bishops",
              "pawns",
            ],
          },
          ["player"],
          "selectdroptarget",
        ],
      },
    ],
  },
  selectunit: { line: ["Now select where to move", { unitat: "selectunit" }] },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to",
      {
        andlist: [
          {
            line: [
              { text: "move" },
              { unitat: "selectunit" },
              "to",
              "selectmovetarget",
            ],
          },
          {
            if: [
              {
                and: [
                  { anyat: ["mybishops", "selectunit"] },
                  { noneat: ["mybase", "selectmovetarget"] },
                ],
              },
              { line: ["demote it to a", "pawns"] },
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
          {
            if: [
              { notempty: "conversions" },
              { line: ["take over", { unitlist: "conversions" }] },
            ],
          },
        ],
      },
    ],
  },
};

export default yonmoqueInstructions;
