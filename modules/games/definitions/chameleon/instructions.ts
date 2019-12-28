import { ChameleonInstructions } from "./_types";

const chameleonInstructions: ChameleonInstructions = {
  startTurn: { line: ["Select", "a", "bishops", "or", "knights", "to move"] },
  selectunit: { line: ["Select where to move", { unitat: "selectunit" }] },
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
            ],
          },
          {
            line: [
              { text: "move" },
              { unitat: "selectunit" },
              "to",
              "selectmovetarget",
            ],
          },
        ],
      },
      {
        if: [
          {
            and: [
              { anyat: ["knights", "selectunit"] },
              {
                same: [
                  { read: ["board", "selectunit", "colour"] },
                  { read: ["board", "selectmovetarget", "colour"] },
                ],
              },
            ],
          },
          {
            line: [
              ", turning it into a",
              { unittype: ["bishops", ["player"]] },
            ],
          },
        ],
      },
      {
        if: [
          {
            and: [
              { anyat: ["bishops", "selectunit"] },
              {
                different: [
                  { read: ["board", "selectunit", "colour"] },
                  { read: ["board", "selectmovetarget", "colour"] },
                ],
              },
            ],
          },
          {
            line: [
              ", turning it into a",
              { unittype: ["knights", ["player"]] },
            ],
          },
        ],
      },
    ],
  },
};

export default chameleonInstructions;
