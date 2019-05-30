import { DaggersInstructions } from './_types';

const daggersInstructions: DaggersInstructions = {
  startTurn: { line: ["Select", "a", "daggers", "or", "crowns", "to move"] },
  selectunit: {
    line: [
      "Select",
      {
        ifelse: [
          { anyat: ["mycrowns", "selectunit"] },
          {
            line: [
              "an empty neighbour to move",
              { unitat: "selectunit" },
              "to",
            ],
          },
          { line: ["where to slide", { unitat: "selectunit" }] },
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
          { anyat: ["mycrowns", "selectunit"] },
          "go",
          {
            line: [
              "slide",
              {
                ifelse: [
                  { higher: ["selectmovetarget", "selectunit"] },
                  "uphill",
                  {
                    if: [
                      { higher: ["selectunit", "selectmovetarget"] },
                      "downhill",
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        ifelse: [
          { anyat: ["units", "selectmovetarget"] },
          { line: ["and kill", { unitat: "selectmovetarget" }] },
          { line: ["to", "selectmovetarget"] },
        ],
      },
    ],
  },
};

export default daggersInstructions;
