import { AmbivalenteDefinition } from "./_types";

const ambivalenteInstructions: AmbivalenteDefinition["instructions"] = {
  startTurn: { line: ["Select an empty square to drop a", "pawns"] },
  selectdroptarget: {
    line: [
      "Press",
      "drop",
      "to spawn",
      { unittypepos: ["pawns", ["player"], "selectdroptarget"] },
      {
        if: [
          { notempty: "victims" },
          {
            line: [
              "and turn",
              { unitlist: "victims" },
              "into",
              { unittype: ["pawns", 0] },
            ],
          },
        ],
      },
    ],
  },
};

export default ambivalenteInstructions;
