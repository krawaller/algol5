import { MomentumInstructions } from "./_types";

const momentumInstructions: MomentumInstructions = {
  startTurn: {
    orlist: [
      {
        line: [
          "Select where to drop",
          {
            ifelse: [
              { same: [{ sizeof: "myunits" }, 7] },
              {
                line: [
                  "your last remaining",
                  { unittype: ["stones", ["player"]] },
                ],
              },
              {
                line: [
                  "one of your",
                  { value: { minus: [8, { sizeof: "myunits" }] } },
                  "remaining",
                  { unittype: ["stones", ["player"]] },
                ],
              },
            ],
          },
        ],
      },
      {
        ifplayer: [
          2,
          {
            if: [
              { same: [["turn"], 1] },
              {
                line: [
                  "press",
                  "pie",
                  "to take over",
                  { unitat: { onlyin: "units" } },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  selectdroptarget: {
    line: [
      "Press",
      "drop",
      "to",
      {
        andlist: [
          {
            line: [
              "spawn",
              { unittypepos: ["stones", ["player"], "selectdroptarget"] },
            ],
          },
          {
            if: [
              { notempty: "pushed" },
              { line: ["push", { unitlist: "pushed" }] },
            ],
          },
          {
            if: [
              { notempty: "doomed" },
              { line: ["kill", { unitlist: "doomed" }] },
            ],
          },
        ],
      },
    ],
  },
};

export default momentumInstructions;
