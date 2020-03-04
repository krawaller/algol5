import { TrafficlightsFlow } from "./_types";

const trafficlightsFlow: TrafficlightsFlow = {
  startTurn: { links: ["selectdeploytarget", "selectunit"] },
  endGame: { madeline: { condition: { notempty: "line" }, show: "line" } },
  marks: {
    selectdeploytarget: {
      from: { subtract: ["board", "units"] },
      link: "deploy"
    },
    selectunit: { from: { union: ["pawns", "bishops"] }, link: "promote" }
  },
  commands: {
    deploy: {
      applyEffect: { spawnat: ["selectdeploytarget", "pawns", 0] },
      runGenerator: "findlines",
      link: "endTurn"
    },
    promote: {
      applyEffect: {
        morphat: [
          "selectunit",
          { ifelse: [{ anyat: ["pawns", "selectunit"] }, "bishops", "kings"] }
        ]
      },
      runGenerator: "findlines",
      link: "endTurn"
    }
  }
};

export default trafficlightsFlow;
