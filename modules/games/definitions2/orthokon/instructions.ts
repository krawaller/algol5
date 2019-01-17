import { OrthokonInstructions } from "./_types";

const orthokonInstructions: OrthokonInstructions = {
  startTurn: { line: ["Select which", "pawn", "to move"] },
  selectunit: { line: ["Select where to move the", "selectunit", "pawn"] },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to move the",
      "selectunit",
      "pawn",
      "to",
      "selectmovetarget",
      {
        if: [
          { notempty: "victims" },
          {
            line: [
              "and take over",
              {
                pluralize: [
                  { sizeof: "victims" },
                  { line: ["enemy", "pawn"] },
                  { line: ["enemy", "pawns"] }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};

export default orthokonInstructions;
