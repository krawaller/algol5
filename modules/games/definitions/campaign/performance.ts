import { CampaignDefinition } from "./_types";

const campaignPerformance: CampaignDefinition["performance"] = {
  canAlwaysEnd: {
    selectdeploytarget: true,
    selectjumptarget: true,
  },
  massiveTree: {},
  noEndGameCheck: ["deploy"],
};

export default campaignPerformance;
