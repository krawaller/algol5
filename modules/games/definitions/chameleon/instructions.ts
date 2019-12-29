import { ChameleonInstructions } from "./_types";

const chameleonInstructions: ChameleonInstructions = {
  startTurn: {
    line: [
      "Select",
      "a",
      "bishops",
      "or",
      "knights",
      {
        ifelse: [
          { isempty: { intersect: ["oppunits", "mybase"] } },
          "to move",
          {
            line: [
              "that can reach the",
              { unitat: { onlyin: { intersect: ["oppunits", "mybase"] } } },
              "invader",
            ],
          },
        ],
      },
    ],
  },
  selectunit: {
    ifelse: [
      { isempty: { intersect: ["oppunits", "mybase"] } },
      { line: ["Select where to move", { unitat: "selectunit" }] },
      {
        line: [
          "Now",
          { unitat: "selectunit" },
          "must expel the",
          { unitat: { onlyin: { intersect: ["oppunits", "mybase"] } } },
          "invader",
        ],
      },
    ],
  },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to",
      {
        ifelse: [
          { anyat: ["units", "selectmovetarget"] },
          {
            line: [
              "make",
              { unitat: "selectunit" },
              "stomp",
              { unitat: "selectmovetarget" },
              {
                if: [
                  { anyat: ["mybase", "selectmovetarget"] },
                  ", expelling the invader",
                ],
              },
              {
                if: [
                  { anyat: ["oppbase", "selectmovetarget"] },
                  "in her own base",
                ],
              },
            ],
          },
          {
            line: [
              { text: "move" },
              { unitat: "selectunit" },
              {
                ifelse: [
                  { anyat: ["oppbase", "selectmovetarget"] },
                  "to invade the opponent base at",
                  "to",
                ],
              },
              "selectmovetarget",
            ],
          },
        ],
      },
      {
        if: [
          {
            anyat: ["morph", "selectmovetarget"],
          },
          {
            line: [
              ", turning it into a",
              {
                ifelse: [
                  { anyat: ["knights", "selectunit"] },
                  { unittype: ["bishops", ["player"]] },
                  { unittype: ["knights", ["player"]] },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

export default chameleonInstructions;
