import { AmbivalenteDefinition } from "./_types";

const ambivalenteFlow: AmbivalenteDefinition["flow"] = {
  startTurn: {
    link: "selectdroptarget",
  },
  endGame: {
    filledboard: {
      condition: { same: [{ sizeof: "units" }, 36] },
      who: {
        playercase: [
          { compareSets: ["myunits", "oppunits"] },
          { compareSets: ["oppunits", "myunits"] },
        ],
      },
      show: {
        indexlist: [
          { compareSets: ["myunits", "oppunits"] },
          ["empty"],
          "myunits",
          "oppunits",
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
