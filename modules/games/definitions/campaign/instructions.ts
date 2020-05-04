import { CampaignDefinition } from "./_types";

const campaignInstructions: CampaignDefinition["instructions"] = {
  startTurn: {
    ifelse: [
      ["isFirstTurn"],
      {
        line: [
          "Select where to deploy your",
          { unittype: ["knights", ["player"]] },
        ],
      },
      { line: ["Select where to move", { unitat: { onlyin: "myknights" } }] },
    ],
  },
  selectdeploytarget: {
    line: [
      "Press",
      "deploy",
      "to spawn",
      { unittypepos: ["knights", ["player"], "selectdeploytarget"] },
    ],
  },
  selectjumptarget: {
    line: [
      "Press",
      "jump",
      "to move",
      { unitat: { onlyin: "myknights" } },
      "to",
      "selectjumptarget",
      "and spawn",
      { unittypepos: ["marks", ["player"], { onlyin: "myknights" }] },
    ],
  },
};

export default campaignInstructions;
