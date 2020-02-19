import { MomentumInstructions } from "./_types";

const momentumInstructions: MomentumInstructions = {
  startTurn: {
    line: [
      "Select where to drop",
      {
        ifelse: [
          { same: [{ sizeof: "myunits" }, 7] },
          { line: ["your last remaining unit"] },
          {
            line: [
              "one of your",
              { value: { minus: [8, { sizeof: "myunits" }] } },
              "remaining units",
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
