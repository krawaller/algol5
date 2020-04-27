import { ScatterDefinition } from "./_types";

const scatterInstructions: ScatterDefinition["instructions"] = {
  startTurn: {
    line: [
      "Select",
      "pawns",
      "to move, or shift all",
      { unittype: ["nobles", 0] },
      {
        orlist: [
          { if: [{ cmndavailable: "north" }, "north"] },
          { if: [{ cmndavailable: "south" }, "south"] },
          { if: [{ cmndavailable: "east" }, "east"] },
          { if: [{ cmndavailable: "west" }, "west"] },
        ],
      },
      {
        if: [
          { truthy: { battlevar: "noshift" } },
          {
            line: [
              "(we cannot shift back",
              { value: { battlevar: "noshift" } },
              "this turn)",
            ],
          },
        ],
      },
      ".",
    ],
  },
  selectunit: {
    line: ["Select where to move", { unitat: "selectunit" }],
  },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to move",
      { unitat: "selectunit" },
      "to",
      "selectmovetarget",
    ],
  },
};

export default scatterInstructions;
