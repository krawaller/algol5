import { SquavaDefinition } from "./_types";

const squavaFlow: SquavaDefinition["flow"] = {
  endGame: {
    winline: {
      condition: { notempty: "winline" },
      show: "winline",
    },
    loseline: {
      condition: { notempty: "loseline" },
      show: "loseline",
      who: ["otherplayer"],
    },
    fullboard: {
      condition: ["true"],
      whenStarvation: true,
      who: 0,
    },
  },
  startTurn: {
    links: ["selectspace", { ifplayer: [2, { if: [["isFirstTurn"], "pie"] }] }],
  },
  commands: {
    drop: {
      applyEffect: { spawnat: ["selectspace", "markers"] },
      runGenerators: ["findlinebeginnings", "findendlines"],
      link: "endTurn",
    },
    pie: {
      applyEffect: { adoptin: ["oppunits"] },
      link: "endTurn",
    },
  },
  marks: {
    selectspace: {
      from: { subtract: ["board", "units"] },
      link: "drop",
    },
  },
};

export default squavaFlow;
