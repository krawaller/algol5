import { CoffeeDefinition } from "./_types";

const coffeeFlow: CoffeeDefinition["flow"] = {
  TODO: "use different unit type for placeholders?",
  endGame: {
    madeline: { condition: { notempty: "winline" }, show: "winline" }
  },
  startTurn: { link: "selectdrop" },
  marks: {
    selectdrop: {
      from: { ifelse: [{ isempty: "neutralunits" }, "board", "neutralunits"] },
      runGenerator: "findgeneratees",
      links: ["uphill", "downhill", "vertical", "horisontal"]
    }
  },
  commands: {
    uphill: {
      applyEffects: [
        { killin: { exceptpos: ["neutralunits", "selectdrop"] } },
        {
          ifelse: [
            { noneat: ["units", "selectdrop"] },
            { spawnat: ["selectdrop", "soldiers", ["player"]] },
            { adoptat: ["selectdrop", ["player"]] }
          ]
        },
        { spawnin: ["uphill", "soldiers", 0] }
      ],
      runGenerator: "findwinlines",
      link: {
        if: [
          { or: [{ notempty: "winline" }, { notempty: "uphill" }] },
          "endTurn"
        ]
      }
    },
    downhill: {
      applyEffects: [
        { killin: { exceptpos: ["neutralunits", "selectdrop"] } },
        {
          ifelse: [
            { noneat: ["units", "selectdrop"] },
            { spawnat: ["selectdrop", "soldiers", ["player"]] },
            { adoptat: ["selectdrop", ["player"]] }
          ]
        },
        { spawnin: ["downhill", "soldiers", 0] }
      ],
      runGenerator: "findwinlines",
      link: {
        if: [
          { or: [{ notempty: "winline" }, { notempty: "downhill" }] },
          "endTurn"
        ]
      }
    },
    horisontal: {
      applyEffects: [
        { killin: { exceptpos: ["neutralunits", "selectdrop"] } },
        {
          ifelse: [
            { noneat: ["units", "selectdrop"] },
            { spawnat: ["selectdrop", "soldiers", ["player"]] },
            { adoptat: ["selectdrop", ["player"]] }
          ]
        },
        { spawnin: ["horisontal", "soldiers", 0] }
      ],
      runGenerator: "findwinlines",
      link: {
        if: [
          { or: [{ notempty: "winline" }, { notempty: "horisontal" }] },
          "endTurn"
        ]
      }
    },
    vertical: {
      applyEffects: [
        { killin: { exceptpos: ["neutralunits", "selectdrop"] } },
        {
          ifelse: [
            { noneat: ["units", "selectdrop"] },
            { spawnat: ["selectdrop", "soldiers", ["player"]] },
            { adoptat: ["selectdrop", ["player"]] }
          ]
        },
        { spawnin: ["vertical", "soldiers", 0] }
      ],
      runGenerator: "findwinlines",
      link: {
        if: [
          { or: [{ notempty: "winline" }, { notempty: "vertical" }] },
          "endTurn"
        ]
      }
    }
  }
};

export default coffeeFlow;
