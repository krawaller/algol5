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
      from: { ifelse: [{ isempty: "markers" }, "board", "markers"] },
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
        { killin: "markers" },
        { spawnat: ["selectdrop", "soldiers"] },
        { spawnin: ["uphill", "markers", 0] }
      ],
      runGenerator: "findwinlines",
      link: "endTurn"
    },
    downhill: {
      applyEffects: [
        { killin: "markers" },
        { spawnat: ["selectdrop", "soldiers"] },
        { spawnin: ["downhill", "markers", 0] }
      ],
      runGenerator: "findwinlines",
      link: "endTurn"
    },
    horisontal: {
      applyEffects: [
        { killin: "markers" },
        { spawnat: ["selectdrop", "soldiers"] },
        { spawnin: ["horisontal", "markers", 0] }
      ],
      runGenerator: "findwinlines",
      link: "endTurn"
    },
    vertical: {
      applyEffects: [
        { killin: "markers" },
        { spawnat: ["selectdrop", "soldiers"] },
        { spawnin: ["vertical", "markers", 0] }
      ],
      runGenerator: "findwinlines",
      link: "endTurn"
    }
  }
};

export default coffeeFlow;
