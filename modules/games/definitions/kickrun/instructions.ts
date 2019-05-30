import { KickrunInstructions } from './_types';

const kickrunInstructions: KickrunInstructions = {
  startTurn: { line: ["Select", "runners", "or", "sidekickers", "to move"] },
  selectunit: { line: ["Select", "where to move", { unitat: "selectunit" }] },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to",
      {
        ifelse: [
          { anyat: ["runners", "selectunit"] },
          {
            line: ["slide", { unitat: "selectunit" }, "to", "selectmovetarget"],
          },
          {
            line: [
              { text: "move" },
              { unitat: "selectunit" },
              "to",
              {
                ifelse: [
                  { anyat: ["units", "selectmovetarget"] },
                  { line: ["capture", { unitat: "selectmovetarget" }] },
                  "selectmovetarget",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

export default kickrunInstructions;
