import { DescentFlow } from "./_types";

const descentFlow: DescentFlow = {
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
        ifelse: [
          { anyat: ["pawns", "selectdigtarget"] },
          { killat: "selectdigtarget" },
          {
            morphat: [
              "selectdigtarget",
              {
                ifelse: [
                  { anyat: ["knights", "selectdigtarget"] },
                  "pawns",
                  "knights"
                ]
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
