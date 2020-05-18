import { KachitknightDefinition } from "./_types";

const kachitknightInstructions: KachitknightDefinition["instructions"] = {
  startTurn: {
    line: [
      "Select",
      "unit to act with",
      {
        if: [
          {
            morethan: [
              3,
              {
                firsttruthy: [
                  {
                    battlevar: { playercase: ["plr1knights", "plr2knights"] },
                  },
                  0,
                ],
              },
            ],
          },
          {
            line: [
              "or empty square in your castle to drop",
              {
                ifelse: [
                  {
                    same: [
                      {
                        battlevar: {
                          playercase: ["plr1knights", "plr2knights"],
                        },
                      },
                      2,
                    ],
                  },
                  { line: ["your last knight"] },
                  {
                    line: [
                      "one of your",
                      {
                        value: {
                          minus: [
                            3,
                            {
                              firsttruthy: [
                                {
                                  battlevar: {
                                    playercase: ["plr1knights", "plr2knights"],
                                  },
                                },
                                0,
                              ],
                            },
                          ],
                        },
                      },
                      "remaining knights",
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
  selectunit: {
    line: ["Select", "where to move", { unitat: "selectunit" }],
  },
  selectdroptarget: {
    line: [
      "Press",
      "orthogonal",
      "to drop",
      { unittypepos: ["knightortho", ["player"], "selectdroptarget"] },
      "or",
      "diagonal",
      "to drop",
      { unittypepos: ["knightdiag", ["player"], "selectdroptarget"] },
    ],
  },
  selectmovetarget: {
    ifelse: [
      { anyat: ["leader", "selectunit"] },
      {
        ifelse: [
          { anyat: ["promotion", "selectmovetarget"] },
          {
            line: [
              "Press",
              "orthogonal",
              "to promote",
              { unitat: "selectunit" },
              "to",
              {
                unittypepos: ["leaderortho", ["player"], "selectmovetarget"],
              },
              "or",
              "diagonal",
              "for",
              {
                unittypepos: ["leaderdiag", ["player"], "selectmovetarget"],
              },
            ],
          },
          {
            line: [
              "Press",
              "step",
              "to move",
              { unitat: "selectunit" },
              "to",
              "selectmovetarget",
            ],
          },
        ],
      },
      {
        line: [
          "Press",
          "orthogonal",
          "to move",
          { unitat: "selectunit" },
          "to",
          {
            ifelse: [
              {
                or: [
                  { anyat: ["leaderortho", "selectunit"] },
                  { anyat: ["leaderdiag", "selectunit"] },
                ],
              },
              { unittypepos: ["leaderortho", ["player"], "selectmovetarget"] },
              { unittypepos: ["knightortho", ["player"], "selectmovetarget"] },
            ],
          },
          "or",
          "diagonal",
          "for",
          {
            ifelse: [
              {
                or: [
                  { anyat: ["leaderortho", "selectunit"] },
                  { anyat: ["leaderdiag", "selectunit"] },
                ],
              },
              { unittypepos: ["leaderdiag", ["player"], "selectmovetarget"] },
              { unittypepos: ["knightdiag", ["player"], "selectmovetarget"] },
            ],
          },
        ],
      },
    ],
  },
};

export default kachitknightInstructions;
