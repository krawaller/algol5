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
            {
              and: [
                { anyat: ["knights", "selectunit"] },
                {
                  same: [
                    { read: ["board", "selectunit", "colour"] },
                    { read: ["board", "selectmovetarget", "colour"] },
                  ],
                },
              ],
            },
            { morphat: ["selectunit", "bishops"] },
          ],
        },
        {
          if: [
            {
              and: [
                { anyat: ["bishops", "selectunit"] },
                {
                  different: [
                    { read: ["board", "selectunit", "colour"] },
                    { read: ["board", "selectmovetarget", "colour"] },
                  ],
                },
              ],
            },
            { morphat: ["selectunit", "knights"] },
          ],
        },
        { stompat: ["selectunit", "selectmovetarget"] },
      ],
      link: "endTurn",
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
      from: "movetarget",
      link: "move",
    },
  },
};

export default chameleonFlow;
