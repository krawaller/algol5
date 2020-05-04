import { AmbivalenteDefinition } from "./_types";

const ambivalenteFlow: AmbivalenteDefinition["flow"] = {
  startTurn: {
    link: "selectdroptarget",
  },
  endGame: {
    filledboard: {
      condition: { same: [{ sizeof: "units" }, 36] },
      who: {
        ifelse: [
          { morethan: [{ sizeof: "myunits" }, { sizeof: "oppunits" }] },
          ["player"],
          {
            ifelse: [
              { morethan: [{ sizeof: "oppunits" }, { sizeof: "myunits" }] },
              ["otherplayer"],
              0,
            ],
          },
        ],
      },
      show: {
        ifelse: [
          { morethan: [{ sizeof: "myunits" }, { sizeof: "oppunits" }] },
          "myunits",
          {
            ifelse: [
              { morethan: [{ sizeof: "oppunits" }, { sizeof: "myunits" }] },
              "oppunits",
              ["empty"],
            ],
          },
        ],
      },
    },
  },
  commands: {
    drop: {
      applyEffects: [
        { spawnat: ["selectdroptarget", "pawns"] },
        { adoptin: ["victims", 0] },
      ],
      link: "endTurn",
    },
  },
  marks: {
    selectdroptarget: {
      from: { subtract: ["board", "units"] },
      runGenerators: [
        "findtouchedfoes",
        "findintrusionvictims",
        "findcustodianvictims",
        {
          if: [
            { anyat: ["corners", "selectdroptarget"] },
            "findcornerintrusionvictims",
          ],
        },
        "findcornercustodianvictims",
      ],
      link: "drop",
    },
  },
};

export default ambivalenteFlow;
