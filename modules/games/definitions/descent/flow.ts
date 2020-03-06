import { DescentDefinition } from "./_types";

const descentFlow: DescentDefinition["flow"] = {
  endGame: {
    madeline: { condition: { notempty: "winline" }, show: "winline" }
  },
  startTurn: { link: "selectunit" },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerator: "findmovetargets",
      link: "selectmovetarget"
    },
    selectmovetarget: { from: "movetargets", link: "move" },
    selectdigtarget: { from: "digtargets", link: "dig" }
  },
  commands: {
    move: {
      runGenerator: "finddigtargets",
      applyEffects: [
        { setturnpos: ["movedto", "selectmovetarget"] },
        {
          setturnvar: ["heightfrom", { read: ["units", "selectunit", "group"] }]
        },
        {
          setturnvar: [
            "heightto",
            { read: ["units", "selectmovetarget", "group"] }
          ]
        },
        { morphat: ["selectunit", { turnvar: "heightto" }] },
        { killat: "selectmovetarget" },
        { moveat: ["selectunit", "selectmovetarget"] },
        { spawnat: ["selectunit", { turnvar: "heightfrom" }, 0] }
      ],
      link: "selectdigtarget"
    },
    dig: {
      applyEffect: {
        morphat: [
          "selectdigtarget",
          {
            ifelse: [
              { anyat: ["lvl3", "selectdigtarget"] },
              "lvl2",
              {
                ifelse: [{ anyat: ["lvl2", "selectdigtarget"] }, "lvl1", "lvl0"]
              }
            ]
          }
        ]
      },
      runGenerator: "findwinlines",
      link: "endTurn"
    }
  }
};

export default descentFlow;
