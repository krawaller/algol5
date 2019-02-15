import { TransetInstructions } from './_types';

const transetInstructions: TransetInstructions = {
  startTurn: { line: ["Select a unit to", "move"] },
  selectunit: {
    line: [
      "Select",
      {
        orlist: [
          {
            if: [
              { notempty: "movetargets" },
              {
                line: [
                  "a square to",
                  "move",
                  "the",
                  "selectunit",
                  { nameat: "selectunit" },
                  "to"
                ]
              }
            ]
          },
          {
            if: [
              { markavailable: "selectswapunit" },
              {
                line: [
                  "another unit to swap the",
                  "selectunit",
                  { nameat: "selectunit" },
                  "with"
                ]
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
          "Select where the enemy",
          { nameat: "selectmovetarget" },
          "at",
          "selectmovetarget",
          "should end up"
        ]
      },
      {
        line: [
          "Press",
          "move",
          "to go from",
          "selectunit",
          "to",
          "selectmovetarget"
        ]
      }
    ]
  },
  selectdeportdestination: {
    line: [
      "Press",
      "move",
      "to go from",
      "selectunit",
      "to",
      "selectmovetarget",
      "and deport the enemy to",
      "selectdeportdestination"
    ]
  },
  selectswapunit: {
    line: [
      "Select a neighbouring square for",
      "selectunit",
      "to step to. The",
      "selectswapunit",
      "unit will step in the opposite direction"
    ]
  },
  selectswap1target: {
    line: [
      "Press",
      "swap",
      "to step",
      "selectunit",
      "to",
      "selectswap1target",
      "and step",
      "selectswapunit",
      "in the other direction to",
      { pos: { onlyin: "swap2step" } }
    ]
  }
};

export default transetInstructions;
