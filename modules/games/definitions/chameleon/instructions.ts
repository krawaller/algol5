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
