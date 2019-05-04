import { TransetInstructions } from './_types';

const transetInstructions: TransetInstructions = {
  startTurn: {
    line: ["Select", "pinets", ",", "piokers", "or", "piases", "to move"]
  },
  selectunit: {
    line: [
      "Select",
      {
        orlist: [
          {
            if: [
              { notempty: "movetargets" },
              { line: ["where to move", { unitat: "selectunit" }] }
            ]
          },
          {
            if: [
              { markavailable: "selectswapunit" },
              {
                line: ["another unit to swap", { unitat: "selectunit" }, "with"]
              }
            ]
          }
        ]
      }
    ]
  },
  selectmovetarget: {
    ifelse: [
      {
        and: [
          { anyat: ["units", "selectmovetarget"] },
          { noneat: ["oppbase", "selectmovetarget"] }
        ]
      },
      {
        line: [
          "Select",
          "where",
          { unitat: "selectmovetarget" },
          "should end up"
        ]
      },
      {
        line: [
          "Press",
          "move",
          "to make",
          { unitat: "selectunit" },
          "go to",
          "selectmovetarget"
        ]
      }
    ]
  },
  selectdeportdestination: {
    line: [
      "Press",
      "move",
      "to make",
      { unitat: "selectunit" },
      "go to",
      "selectmovetarget",
      "and deport",
      { unitat: "selectmovetarget" },
      "to",
      "selectdeportdestination"
    ]
  },
  selectswapunit: {
    line: [
      "Select",
      "a neighbouring square for",
      { unitat: "selectunit" },
      "to step to.",
      { unitat: "selectswapunit" },
      "will step in the opposite direction"
    ]
  },
  selectswap1target: {
    line: [
      "Press",
      "swap",
      "to step",
      { unitat: "selectunit" },
      "to",
      "selectswap1target",
      "and",
      { unitat: "selectswapunit" },
      "to",
      { pos: { onlyin: "swap2step" } }
    ]
  }
};

export default transetInstructions;
