import { DuploInstructions } from './_types';

const duploInstructions: DuploInstructions = {
  startTurn: {
    ifelse: [
      { morethan: [["turn"], 1] },
      { line: ["Select", "unit to expand from"] },
      {
        line: ["Select", "where to deploy the first of your two initial units"],
      },
    ],
  },
  selectdeploy: {
    line: [
      "Press",
      "deploy",
      "to place your",
      { ifelse: [{ same: [{ sizeof: "myunits" }, 1] }, "second", "first"] },
      "unit at",
      "selectdeploy",
    ],
  },
  deploy: {
    ifelse: [
      { same: [{ sizeof: "myunits" }, 1] },
      {
        line: [
          "Now",
          "select",
          "where to deploy your second and last initial unit",
        ],
      },
      ["defaultEndTurnInstruction"],
    ],
  },
  selectunit: "Now select which square to expand to",
  selecttarget: {
    line: [
      "Press",
      "expand",
      "to expand from",
      "selectunit",
      "to",
      "selecttarget",
      {
        if: [
          { anyat: ["units", "selecttarget"] },
          "and neutralise the enemy there",
        ],
      },
    ],
  },
};

export default duploInstructions;
