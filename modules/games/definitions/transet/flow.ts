import { TransetFlow } from "./_types";

const transetFlow: TransetFlow = {
  endGame: {
    infiltration: {
      condition: { overlaps: ["myunits", "oppbase"] },
      show: { intersect: ["myunits", "oppbase"] }
    }
  },
  startTurn: {
    link: "selectunit"
  },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerator: "findmovetargets",
      links: ["selectmovetarget", "selectswapunit"]
    },
    selectmovetarget: {
      from: "movetargets",
      link: {
        ifelse: [
          {
            and: [
              { anyat: ["units", "selectmovetarget"] },
              { noneat: ["oppbase", "selectmovetarget"] }
            ]
          },
          "selectdeportdestination",
          "move"
        ]
      }
    },
    selectdeportdestination: {
      from: { subtract: ["oppbase", "oppunits"] },
      link: "move"
    },
    selectswapunit: {
      from: { subtract: ["myunits", { single: "selectunit" }] },
      runGenerator: "findswap1steps",
      link: "selectswap1target"
    },
    selectswap1target: {
      from: "swap1steps",
      runGenerator: "findswap2step",
      link: { if: [{ notempty: "swap2step" }, "swap"] }
    }
  },
  commands: {
    move: {
      applyEffects: [
        {
          if: [
            { anyat: ["units", "selectmovetarget"] },
            {
              ifelse: [
                { anyat: ["oppbase", "selectmovetarget"] },
                { killat: "selectmovetarget" },
                { moveat: ["selectmovetarget", "selectdeportdestination"] }
              ]
            }
          ]
        },
        { moveat: ["selectunit", "selectmovetarget"] }
      ],
      link: "endturn"
    },
    swap: {
      applyEffects: [
        { moveat: ["selectunit", "selectswap1target"] },
        { moveat: ["selectswapunit", { onlyin: "swap2step" }] }
      ],
      link: "endturn"
    }
  }
};

export default transetFlow;
