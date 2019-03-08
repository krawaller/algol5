import { DaggersInstructions } from './_types';

const daggersInstructions: DaggersInstructions = {
  startTurn: { line: ["Select a", "bishop", "or", "king", "to move"] },
  selectunit: {
    line: ["Select where to move the", "selectunit", { unitat: "selectunit" }]
  },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to go",
      {
        ifelse: [
          { higher: ["selectmovetarget", "selectunit"] },
          "uphill",
          { if: [{ higher: ["selectunit", "selectmovetarget"] }, "downhill"] }
        ]
      },
      "from",
      "selectunit",
      {
        ifelse: [
          { anyat: ["units", "selectmovetarget"] },
          {
            line: [
              "and kill the enemy",
              { unitat: "selectmovetarget" },
              "selectmovetarget"
            ]
          },
          { line: ["to", "selectmovetarget"] }
        ]
      }
    ]
  }
};

export default daggersInstructions;
