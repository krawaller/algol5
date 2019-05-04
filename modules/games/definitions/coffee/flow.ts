import { CoffeeFlow } from "./_types";

const coffeeFlow: CoffeeFlow = {
  TODO:
    "use different unit type for placeholders? Reference oppnent plr properly",
  endTurn: { unless: { nolegal: ["isempty", "markers"] } },
  endGame: {
    madeline: { condition: { notempty: "winline" }, show: "winline" }
  },
  startTurn: { link: "selectdrop" },
  marks: {
    selectdrop: {
      from: { ifelse: [{ isempty: "neutralunits" }, "board", "neutralunits"] },
      runGenerator: "findgeneratees",
      links: [
        { if: [{ notempty: "uphill" }, "uphill"] },
        { if: [{ notempty: "downhill" }, "downhill"] },
        { if: [{ notempty: "vertical" }, "vertical"] },
        { if: [{ notempty: "horisontal" }, "horisontal"] }
      ]
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
      link: "endTurn"
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
      link: "endTurn"
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
      link: "endTurn"
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
      link: "endTurn"
    }
  }
};

export default coffeeFlow;
