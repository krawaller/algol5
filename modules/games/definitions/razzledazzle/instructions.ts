import { RazzledazzleDefinition } from "./_types";

const razzledazzleInstructions: RazzledazzleDefinition["instructions"] = {
  startTurn: {
    line: ["Select", "a unit to act with"],
  },
  selectmover: {
    line: ["Select", "where to move", { unitat: "selectmover" }],
  },
  selectpasser: {
    line: [
      "Select",
      "a",
      "receivers",
      "for",
      { unitat: "selectpasser" },
      "to pass to",
    ],
  },
  selectpasstarget: {
    line: [
      "Press",
      "pass",
      "to make",
      { unitlist: "mycarriers" },
      "throw to",
      { unitat: "selectpasstarget" },
    ],
  },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to make",
      { unitat: "selectmover" },
      "go to",
      "selectmovetarget",
      {
        if: [
          { anyat: ["resters", "selectmover"] },
          { line: ["and become able to receive passes again"] },
        ],
      },
    ],
  },
  pass: {
    line: [
      {
        orlist: [
          {
            line: [
              "Press",
              "endTurn",
              "to hand over to",
              { player: ["otherplayer"] },
            ],
          },
          {
            if: [
              { notempty: "passtargets" },
              {
                line: [
                  "select",
                  "another",
                  "receivers",
                  "for",
                  { unitlist: "mycarriers" },
                  "to pass to",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

export default razzledazzleInstructions;
