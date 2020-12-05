import { MonkeyqueenDefinition } from "./_types";

const monkeyqueenInstructions: MonkeyqueenDefinition["instructions"] = {
  startTurn: {
    line: [
      {
        ifelse: [
          { same: [{ battlevar: "plr1life" }, { battlevar: "plr2life" }] },
          {
            line: [
              { unitat: { onlyin: "myqueens" } },
              "and",
              { unitat: { onlyin: "oppqueens" } },
              "both have strength",
              { value: { battlevar: "plr1life" } },
            ],
          },
          {
            line: [
              { unitat: { onlyin: "myqueens" } },
              "has strength",
              {
                value: { battlevar: { playercase: ["plr1life", "plr2life"] } },
              },
              " and ",
              { unitat: { onlyin: "oppqueens" } },
              "has",
              {
                value: { battlevar: { playercase: ["plr2life", "plr1life"] } },
              },
            ],
          },
        ],
      },
      ". Select unit to act with",
      {
        ifplayer: [
          2,
          {
            if: [
              ["isFirstTurn"],
              { line: [", or press", "pie", "to swap with opponent"] },
            ],
          },
        ],
      },
    ],
  },
  selectunit: {
    line: [
      "Select where to move",
      { unitat: "selectunit" },
      {
        if: [
          { anyat: ["babies", "selectunit"] },
          {
            line: [
              "(must kill enemy or move closer to",
              { unitlist: "oppqueens" },
              ")",
            ],
          },
        ],
      },
    ],
  },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to make",
      { unitat: "selectunit" },
      {
        ifelse: [
          { anyat: ["units", "selectmovetarget"] },
          {
            line: ["go kill", { unitat: "selectmovetarget" }],
          },
          {
            line: [
              "go to",
              "selectmovetarget",
              {
                if: [
                  { anyat: ["myqueens", "selectunit"] },
                  {
                    line: [
                      "and spawn",
                      {
                        unittypepos: ["babies", ["player"], "selectunit"],
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
};

export default monkeyqueenInstructions;
