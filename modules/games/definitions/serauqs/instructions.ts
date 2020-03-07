import { SerauqsDefinition } from "./_types";

const serauqsInstructions: SerauqsDefinition["instructions"] = {
  startTurn: {
    ifelse: [
      { morethan: [["turn"], 1] },
      { line: ["Select", "which", "soldiers", "or", "wild", "to move"] },
      { line: ["Select", "which", "soldiers", "to promote to", "wild"] }
    ]
  },
  selectunit: {
    ifelse: [
      { morethan: [["turn"], 1] },
      {
        line: [
          "Select",
          "where to move",
          { unitat: "selectunit" },
          {
            if: [
              { anyat: ["wild", "selectunit"] },
              "(remember that it matches for your opponent too!)"
            ]
          }
        ]
      },
      {
        line: [
          "Press",
          "promote",
          "to turn",
          { unitat: "selectunit" },
          "into",
          "wild",
          ", making it match for your opponent too"
        ]
      }
    ]
  },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to make",
      { unitat: "selectunit" },
      "go to",
      "selectmovetarget"
    ]
  }
};

export default serauqsInstructions;
