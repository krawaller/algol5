import { DesdemonaDefinition } from "./_types";

const desdemonaInstructions: DesdemonaDefinition["instructions"] = {
  startTurn: { line: ["Select", "amazons", "to move"] },
  selectunit: { line: ["Select where to move", { unitat: "selectunit" }] },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to move",
      { unitat: "selectunit" },
      "to",
      "selectmovetarget",
    ],
  },
  selectcapturer: {
    line: [
      "Select where to move",
      { unitat: "selectcapturer" },
      "to make a free capture",
    ],
  },
  selectcapturestart: {
    line: [
      "Press",
      "move",
      "to move",
      { unitat: "selectcapturer" },
      "to",
      "selectcapturestart",
    ],
  },
  move: {
    ifrulesetelse: [
      "pie",
      {
        playercase: [
          {
            ifelse: [
              ["isFirstTurn"],
              {
                line: [
                  { text: "Press " },
                  "endTurn",
                  {
                    text: ` to submit your moves and hand over to `,
                  },
                  ["otherplayer"],
                  {
                    text: `(you don't get to fire the first turn)`,
                  },
                ],
              },
              {
                line: [
                  "Select where to fire with",
                  { unitat: { turnpos: "movedto" } },
                ],
              },
            ],
          },
          {
            line: [
              "Select where to fire with",
              { unitat: { turnpos: "movedto" } },
            ],
          },
        ],
      },
      {
        line: ["Select where to fire with", { unitat: { turnpos: "movedto" } }],
      },
    ],
  },
  selectfiretarget: {
    line: [
      "Press",
      "fire",
      "to spawn",
      { unittypepos: ["stones", ["player"], "selectfiretarget"] },
      {
        if: [
          { notempty: "victims" },
          { line: ["and capture", { unitlist: "victims" }] },
        ],
      },
    ],
  },
  fire: {
    ifelse: [
      { and: [{ notempty: "capturers" }, { isempty: "oppmovers" }] },
      {
        line: [
          "Since your opponent is blocked you get to make a free capture move! Select",
          "amazons",
          "to make it with",
        ],
      },
      {
        line: [
          { text: "Press " },
          "endTurn",
          {
            text: ` to submit your moves and hand over to `,
          },
          ["otherplayer"],
        ],
      },
    ],
  },
};

export default desdemonaInstructions;
