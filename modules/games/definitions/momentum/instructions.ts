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
              { value: { sizeof: "myunits" } },
              "remaining units",
            ],
          },
        ],
      },
    ],
  },
  selectdroptarget: {
    line: ["Press", "drop", "to spawn a unit at", "selectdroptarget"],
  },
};

export default momentumInstructions;
