import { ChameleonDefinition } from "./_types";

const chameleonInstructions: ChameleonDefinition["instructions"] = {
  startTurn: {
    line: [
      "Select",
      "a",
      "bishops",
      "or",
      "knights",
      {
        ifelse: [
          { isempty: "invaders" },
          "to move",
          {
            line: [
              "that can reach the",
              { unitat: { onlyin: "invaders" } },
              "invader"
            ]
          }
        ]
      }
    ]
  },
  selectunit: {
    ifelse: [
      { isempty: "invaders" },
      { line: ["Select where to move", { unitat: "selectunit" }] },
      {
        line: [
          "Now",
          { unitat: "selectunit" },
          "must expel the",
          { unitat: { onlyin: "invaders" } },
          "invader"
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
                  ", expelling the invader"
                ]
              },
              {
                if: [
                  { anyat: ["oppbase", "selectmovetarget"] },
                  "in her own base"
                ]
              }
            ]
          },
          {
            line: [
              { text: "move" },
              { unitat: "selectunit" },
              {
                ifelse: [
                  { anyat: ["oppbase", "selectmovetarget"] },
                  "to invade the opponent base at",
                  "to"
                ]
              },
              "selectmovetarget"
            ]
          }
        ]
      },
      {
        if: [
          { anyat: ["morph", "selectmovetarget"] },
          {
            line: [
              ", turning it into a",
              {
                ifelse: [
                  { anyat: ["knights", "selectunit"] },
                  { unittype: ["bishops", ["player"]] },
                  { unittype: ["knights", ["player"]] }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};

export default chameleonInstructions;
