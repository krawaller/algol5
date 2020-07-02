import { ZoneshDefinition } from "./_types";

const zoneshInstructions: ZoneshDefinition["instructions"] = {
  startTurn: { line: ["Select which", "soldiers", "to act with"] },
  selectunit: {
    line: [
      "Select where to move",
      { unitat: "selectunit" },
      {
        if: [
          {
            or: [
              { anyat: ["mybase", "selectunit"] },
              { anyat: ["mythrone", "selectunit"] },
            ],
          },
          "(but only orthogonally since you are in the home base)",
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
            ],
          },
          {
            line: [
              "make",
              { unitat: "selectunit" },
              "move to",
              { unitat: "selectmovetarget" },
            ],
          },
        ],
      },
    ],
  },
};

export default zoneshInstructions;
