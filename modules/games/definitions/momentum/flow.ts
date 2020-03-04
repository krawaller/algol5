import { MomentumFlow } from "./_types";

const momentumFlow: MomentumFlow = {
  endGame: { allout: { condition: { same: [{ sizeof: "myunits" }, 8] } } },
  startTurn: {
    links: [
      "selectdroptarget",
      { ifplayer: [2, { if: [{ same: [["turn"], 1] }, "pie"] }] }
    ]
  },
  commands: {
    pie: {
      applyEffect: { adoptat: [{ onlyin: "oppunits" }, ["player"]] },
      link: "endTurn"
    },
    drop: {
      applyEffects: [
        { spawnat: ["selectdroptarget", "stones"] },
        { killin: "doomed" },
        { pushin: ["pushed", { loopread: "pushdir" }] }
      ],
      link: "endTurn"
    }
  },
  marks: {
    selectdroptarget: {
      from: { subtract: ["board", "units"] },
      runGenerator: "findpusheffects",
      link: "drop"
    }
  }
};

export default momentumFlow;
