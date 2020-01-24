import { ChameleonFlow } from "./_types";

const chameleonFlow: ChameleonFlow = {
  endGame: {
    persistentInvader: {
      condition: { anyat: ["oppbase", "selectmovetarget"] },
      show: { single: "selectmovetarget" },
      whenStarvation: true
    },
    loneInvader: {
      condition: {
        and: [
          { same: [{ sizeof: "myunits" }, 1] },
          { anyat: ["oppbase", "selectmovetarget"] }
        ]
      },
      show: { single: "selectmovetarget" }
    }
  },
  startTurn: { runGenerator: "findinvaders", link: "selectunit" },
  commands: {
    move: {
      applyEffects: [
        {
          if: [
            { anyat: ["morph", "selectmovetarget"] },
            {
              morphat: [
                "selectunit",
                {
                  ifelse: [
                    { anyat: ["knights", "selectunit"] },
                    "bishops",
                    "knights"
                  ]
                }
              ]
            }
          ]
        },
        { stompat: ["selectunit", "selectmovetarget"] }
      ],
      link: {
        if: [
          {
            or: [
              { isempty: "invaders" },
              { anyat: ["invaders", "selectmovetarget"] }
            ]
          },
          "endTurn"
        ]
      }
    }
  },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerators: [
        "findsteptargets",
        { if: [{ anyat: ["knights", "selectunit"] }, "findknighttargets"] },
        { if: [{ anyat: ["bishops", "selectunit"] }, "findbishoptargets"] }
      ],
      link: "selectmovetarget"
    },
    selectmovetarget: {
      from: { union: ["movetarget", "morph"] },
      link: "move"
    }
  }
};

export default chameleonFlow;
