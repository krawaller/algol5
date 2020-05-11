import { CrossingsDefinition } from "./_types";

const crossingsInstructions: CrossingsDefinition["instructions"] = {
  startTurn: {
    line: [
      {
        if: [
          { morethan: [{ sizeof: "opptowers" }, { sizeof: "mytowers" }] },
          { line: ["You must create a", "towers", "this turn!"] },
        ],
      },
      "Select",
      "soldiers",
      "to step with or to be tail of phalanx",
    ],
  },
  selecttail: {
    line: [
      "Select",
      "where to step with",
      { unitat: "selecttail" },
      "or a head for the phalanx",
    ],
  },
  selecthead: {
    line: ["Select", "where to march to"],
  },
  selectmarchtarget: {
    line: [
      "Press",
      "march",
      "to move",
      { unitlist: "phalanx" },
      {
        ifelse: [
          { anyat: ["oppbase", "selectmarchtarget"] },
          {
            line: [
              "into the opponent base",
              {
                ifelse: [
                  { anyat: ["oppsoldiers", "selectmarchtarget"] },
                  { line: [", kill", { unitat: "selectmarchtarget" }] },
                  { line: ["at", "selectmarchtarget"] },
                ],
              },
              "and turn the phalanx head into",
              "towers",
            ],
          },
          {
            ifelse: [
              { anyat: ["oppsoldiers", "selectmarchtarget"] },
              { line: ["to kill", { unitat: "selectmarchtarget" }] },
              { line: ["towards", "selectmarchtarget"] },
            ],
          },
        ],
      },
    ],
  },
  selectsteptarget: {
    line: [
      "Press",
      "step",
      "to move",
      { unitat: "selecttail" },
      {
        ifelse: [
          { anyat: ["oppbase", "selectsteptarget"] },
          {
            line: [
              "into the opponent base at",
              "selectsteptarget",
              "and turn it into",
              "towers",
            ],
          },
          { line: ["to", "selectsteptarget"] },
        ],
      },
    ],
  },
};

export default crossingsInstructions;
