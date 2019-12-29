import { ChameleonFlow } from "./_types";

const chameleonFlow: ChameleonFlow = {
  endGame: {
    persistantInvader: {
      condition: { overlaps: ["oppunits", "mybase"] },
      who: ["otherplayer"],
      show: { intersect: ["oppunits", "mybase"] },
    },
    loneInvader: {
      condition: {
        and: [
          { same: [{ sizeof: "myunits" }, 1] },
          { overlaps: ["myunits", "oppbase"] },
        ],
      },
      show: { intersect: ["myunits", "oppbase"] },
    },
  },
  startTurn: {
    link: "selectunit",
  },
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
                    "knights",
                  ],
                },
              ],
            },
          ],
        },
        { stompat: ["selectunit", "selectmovetarget"] },
      ],
      link: {
        if: [{ isempty: { intersect: ["oppunits", "mybase"] } }, "endTurn"],
      },
    },
  },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerators: [
        "findsteptargets",
        { if: [{ anyat: ["knights", "selectunit"] }, "findknighttargets"] },
        { if: [{ anyat: ["bishops", "selectunit"] }, "findbishoptargets"] },
      ],
      link: "selectmovetarget",
    },
    selectmovetarget: {
      from: { union: ["movetarget", "morph"] },
      link: "move",
    },
  },
};

export default chameleonFlow;
