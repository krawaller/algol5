import { TunnelerDefinition } from "./_types";

const tunnelerFlow: TunnelerDefinition["flow"] = {
  endGame: {
    regicide: {
      condition: { lessthan: [{ sizeof: "oppforemen" }, 2] },
      show: { single: "selectmovetarget" },
    },
  },
  startTurn: {
    link: "selectunit",
  },
  commands: {
    move: {
      applyEffect: { stompat: ["selectunit", "selectmovetarget"] },
      link: "endTurn",
    },
  },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerator: "findmovetargets",
      link: "selectmovetarget",
    },
    selectmovetarget: {
      from: "movetargets",
      runGenerator: "find2x2squares",
      link: {
        if: [
          {
            not: {
              or: [
                {
                  bitcontains: [
                    { read: ["bitsum", "selectmovetarget", "bit"] },
                    7,
                  ],
                },
                {
                  bitcontains: [
                    { read: ["bitsum", "selectmovetarget", "bit"] },
                    28,
                  ],
                },
                {
                  bitcontains: [
                    { read: ["bitsum", "selectmovetarget", "bit"] },
                    112,
                  ],
                },
                {
                  bitcontains: [
                    { read: ["bitsum", "selectmovetarget", "bit"] },
                    193,
                  ],
                },
              ],
            },
          },
          "move",
        ],
      },
    },
  },
};

export default tunnelerFlow;
