import { StoogesDefinition } from "./_types";

const stoogesInstructions: StoogesDefinition["instructions"] = {
  startTurn: {
    line: [
      "Select",
      { unittype: ["doubles", ["player"]] },
      "to move",
      {
        ifelse: [
          { truthy: { battlevar: "doubleswap" } },
          { line: [". You cannot swap this turn."] },
          {
            line: [
              "or",
              { unittype: ["singles", 12] },
              "to swap",
              {
                if: [
                  { truthypos: { battlepos: "lastswap" } },
                  {
                    line: [
                      "(except",
                      { unitat: { battlepos: "lastswap" } },
                      "which swapped last turn)",
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
  selectsingle: {
    line: [
      "Press",
      "swap",
      "to turn",
      { unitat: "selectsingle" },
      "into",
      {
        unittype: [
          "singles",
          {
            ifelse: [
              { anyat: ["myunits", "selectsingle"] },
              ["otherplayer"],
              ["player"],
            ],
          },
        ],
      },
    ],
  },
  selectdouble: {
    line: [
      "Select a",
      { unittype: ["singles", ["player"]] },
      "for",
      { unitat: "selectdouble" },
      "to move to",
    ],
  },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to make",
      { unitat: "selectdouble" },
      "go to",
      "selectmovetarget",
    ],
  },
};

export default stoogesInstructions;
