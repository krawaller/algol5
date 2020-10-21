import { RazzledazzleDefinition } from "./_types";

const razzledazzleInstructions: RazzledazzleDefinition["instructions"] = {
  startTurn: {
    ifelse: [
      { and: [{ notempty: "annoyer" }, { notempty: "passtargets" }] },
      {
        line: [
          "Since",
          { unitlist: "annoyer" },
          "is intimidating",
          { unitlist: "mycarriers" },
          "you must",
          "select",
          "a",
          "receivers",
          "to throw to",
        ],
      },
      {
        ifelse: [
          { notempty: "annoyer" },
          {
            line: [
              { unitlist: "annoyer" },
              "intimidates",
              { unitlist: "mycarriers" },
              "but there's no one to pass to, so you may",
              "select",
              "a unit to move with",
            ],
          },
          { line: ["Select", "a unit to act with"] },
        ],
      },
    ],
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
                  "to pass on to",
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
