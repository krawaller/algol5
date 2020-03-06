import { TrafficlightsDefinition } from "./_types";

const trafficlightsInstructions: TrafficlightsDefinition["instructions"] = {
  startTurn: {
    line: [
      "Select",
      {
        orlist: [
          {
            if: [
              { different: [{ sizeof: "units" }, 12] },
              { line: ["empty square to deploy to"] }
            ]
          },
          {
            if: [
              { notempty: { union: ["bishops", "pawns"] } },
              {
                line: [
                  "a",
                  { unittype: ["pawns", 0] },
                  "or",
                  { unittype: ["bishops", 0] },
                  "to promote"
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  selectdeploytarget: {
    line: [
      "Press",
      "deploy",
      "to spawn",
      { unittypepos: ["pawns", 0, "selectdeploytarget"] }
    ]
  },
  selectunit: {
    line: [
      "Press",
      "promote",
      "to turn",
      { unitat: "selectunit" },
      "into",
      {
        ifelse: [
          { anyat: ["pawns", "selectunit"] },
          { unittype: ["bishops", 0] },
          { unittype: ["kings", 0] }
        ]
      }
    ]
  }
};

export default trafficlightsInstructions;
