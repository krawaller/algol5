import { AtriumDefinition } from "./_types";

const atriumInstructions: AtriumDefinition["instructions"] = {
  startTurn: { line: ["Select", "a", "king", "or", "queen", "to move"] },
  selectunit: {
    line: [
      "Select",
      "orthogonal neighbour to move",
      { unitat: "selectunit" },
      "to",
      {
        if: [
          { samepos: ["selectunit", { battlepos: "forbiddenpusher" }] },
          {
            line: [
              " (but you cannot push back at",
              { pos: { battlepos: "forbiddenpushtarget" } },
              "this turn)",
            ],
          },
        ],
      },
    ],
  },
  selectmovetarget: {
    ifelse: [
      { isempty: "pushees" },
      {
        line: [
          "Press",
          "move",
          "to walk",
          { unitat: "selectunit" },
          "to",
          "selectmovetarget",
        ],
      },
      {
        line: [
          "Press",
          "move",
          "to make",
          { unitat: "selectunit" },
          "push",
          { unitlist: "pushees" },
        ],
      },
    ],
  },
};

export default atriumInstructions;
