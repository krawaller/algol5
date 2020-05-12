import { CrossingsDefinition } from "./_types";

const crossingsFlow: CrossingsDefinition["flow"] = {
  endGame: {
    dominance: {
      whenStarvation: true,
      condition: {
        morethan: [{ sizeof: "mytowers" }, { sizeof: "opptowers" }],
      },
      show: "mytowers",
    },
  },
  startTurn: {
    link: "selecttail",
  },
  commands: {
    step: {
      applyEffects: [
        {
          if: [
            { anyat: ["oppbase", "selectsteptarget"] },
            { morphat: ["selecttail", "towers"] },
          ],
        },
        { moveat: ["selecttail", "selectsteptarget"] },
      ],
      link: {
        if: [
          {
            not: {
              lessthan: [{ sizeof: "mytowers" }, { sizeof: "opptowers" }],
            },
          },
          "endTurn",
        ],
      },
    },
    march: {
      applyEffects: [
        {
          if: [
            { anyat: ["units", "selectmarchtarget"] },
            { killat: "selectmarchtarget" },
          ],
        },
        {
          if: [
            { anyat: ["oppbase", "selectmarchtarget"] },
            { morphat: ["selecthead", "towers"] },
          ],
        },
        {
          pushin: [
            "phalanx",
            { read: ["heads", "selecthead", "dir"] },
            { read: ["marchtargets", "selectmarchtarget", "length"] },
          ],
        },
      ],
      link: {
        if: [
          {
            not: {
              lessthan: [{ sizeof: "mytowers" }, { sizeof: "opptowers" }],
            },
          },
          "endTurn",
        ],
      },
    },
  },
  marks: {
    selecttail: {
      from: "mysoldiers",
      runGenerators: ["findsteptargets", "findheads"],
      links: ["selectsteptarget", "selecthead"],
    },
    selecthead: {
      from: "heads",
      runGenerators: ["findphalanx", "findmarchtargets", "findvictims"],
      link: "selectmarchtarget",
    },
    selectmarchtarget: {
      from: "marchtargets",
      link: "march",
    },
    selectsteptarget: {
      from: "steptargets",
      link: "step",
    },
  },
};

export default crossingsFlow;
